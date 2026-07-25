const config = window.CRUZA2_CONFIG;
const session = JSON.parse(sessionStorage.getItem("cruza2_session") || "null");
if (!session?.token) location.replace("access.html");

const categoryNames = {
  staff: "Staff",
  police: "Policía",
  mechanic: "Mecánico",
  ems: "911 / EMS"
};

const isAdmin = session.role === "admin";
const isKaizen =
  isAdmin &&
  (
    session.canApproveIp === true ||
    String(session.username || "").toLowerCase() === "kaizen"
  );

let applications = [];
let activeApplication = null;
let currentTab = "applications";

const applicationsList = document.getElementById("applicationsList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const statsGrid = document.getElementById("statsGrid");
const dialog = document.getElementById("applicationDialog");

document.getElementById("panelRole").textContent = isAdmin
  ? `FUNDADOR · ${String(session.username).toUpperCase()}`
  : `JEFATURA · ${categoryNames[session.role]}`;

document.getElementById("panelTitle").textContent = isAdmin
  ? "Administración general"
  : `Postulaciones de ${categoryNames[session.role]}`;

if (isAdmin) {
  document.getElementById("adminTabs").classList.remove("hidden");

  if (!isKaizen) {
    document.getElementById("ipRequestsTab").classList.add("hidden");
    document.getElementById("bindingsTab").classList.add("hidden");
  }
} else {
  categoryFilter.value = session.role;
  categoryFilter.disabled = true;
}

function apiUrl(path) {
  const base = String(config?.API_BASE_URL || "").trim();

  if (!base || base.includes("TU-WORKER") || base.includes("TU-USUARIO")) {
    throw new Error(
      "La API todavía no está conectada. Despliega el Cloudflare Worker y configura frontend/config.js."
    );
  }

  return `${base.replace(/\/$/, "")}${path}`;
}

async function api(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      ...(options.body ? {"Content-Type": "application/json"} : {}),
      "Authorization": `Bearer ${session.token}`,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    sessionStorage.removeItem("cruza2_session");
    location.replace("access.html");
  }

  if (!response.ok) {
    throw new Error(data.error || "Ocurrió un error.");
  }

  return data;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Fecha desconocida"
    : new Intl.DateTimeFormat("es-DO", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(date);
}

function filtered() {
  const query = searchInput.value.trim().toLowerCase();

  return applications.filter(app =>
    (
      !query ||
      String(app.discord_username || "").toLowerCase().includes(query)
    ) &&
    (
      categoryFilter.value === "all" ||
      app.category === categoryFilter.value
    ) &&
    (
      statusFilter.value === "all" ||
      app.status === statusFilter.value
    )
  );
}

function renderStats() {
  const rows = applications;

  statsGrid.innerHTML = `
    <article class="stat-card">
      <span>Total</span><strong>${rows.length}</strong>
    </article>
    <article class="stat-card">
      <span>Pendientes</span>
      <strong>${rows.filter(x => x.status === "Pendiente").length}</strong>
    </article>
    <article class="stat-card">
      <span>Aceptados</span>
      <strong>${rows.filter(x => x.status === "Aceptado").length}</strong>
    </article>
    <article class="stat-card">
      <span>Rechazados</span>
      <strong>${rows.filter(x => x.status === "Rechazado").length}</strong>
    </article>
  `;
}

function renderApplications() {
  const rows = filtered();
  renderStats();

  if (!rows.length) {
    applicationsList.innerHTML =
      '<div class="empty-state">No hay solicitudes que coincidan con los filtros.</div>';
    return;
  }

  applicationsList.innerHTML = rows.map(app => `
    <article class="application-row">
      <div>
        <strong>${escapeHtml(app.discord_username)}</strong>
        <small>#${app.id} · ${escapeHtml(formatDate(app.submitted_at))}</small>
      </div>
      <span class="category-badge">${escapeHtml(categoryNames[app.category])}</span>
      <span class="status-badge ${app.status.replace(/\s/g, "-")}">
        ${escapeHtml(app.status)}
      </span>
      <button class="ghost-button open-app" data-id="${app.id}" type="button">
        Ver solicitud
      </button>
    </article>
  `).join("");

  document.querySelectorAll(".open-app").forEach(button => {
    button.addEventListener("click", () => {
      openApplication(Number(button.dataset.id));
    });
  });
}

async function loadApplications() {
  const data = await api("/api/applications");
  applications = data.applications;
  renderApplications();
}

function openApplication(id) {
  activeApplication = applications.find(item => item.id === id);
  if (!activeApplication) return;

  document.getElementById("dialogCategory").textContent =
    categoryNames[activeApplication.category].toUpperCase();
  document.getElementById("dialogTitle").textContent =
    activeApplication.discord_username;

  document.getElementById("dialogMeta").innerHTML = `
    <span class="meta-chip">Solicitud #${activeApplication.id}</span>
    <span class="meta-chip">${escapeHtml(formatDate(activeApplication.submitted_at))}</span>
    <span class="meta-chip">Estado: ${escapeHtml(activeApplication.status)}</span>
    ${
      activeApplication.score !== null
        ? `<span class="meta-chip">Puntuación: ${activeApplication.score}/100</span>`
        : ""
    }
  `;

  let lastSection = "";
  document.getElementById("dialogAnswers").innerHTML =
    activeApplication.answers.map(row => {
      const heading = row.section !== lastSection
        ? `<div class="eyebrow" style="margin:18px 0 8px">
             ${escapeHtml(row.section)}
           </div>`
        : "";

      lastSection = row.section;

      return `
        ${heading}
        <article class="answer-card">
          <h3>${escapeHtml(row.question)}</h3>
          <p>${escapeHtml(row.answer)}</p>
        </article>
      `;
    }).join("");

  document.getElementById("reviewStatus").value =
    activeApplication.status;
  document.getElementById("reviewScore").value =
    activeApplication.score ?? "";
  document.getElementById("reviewNotes").value =
    activeApplication.reviewer_notes ?? "";

  dialog.showModal();
}

document.getElementById("saveReview").addEventListener("click", async () => {
  if (!activeApplication) return;

  const scoreValue = document.getElementById("reviewScore").value;

  await api(`/api/applications/${activeApplication.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: document.getElementById("reviewStatus").value,
      score: scoreValue === "" ? null : Number(scoreValue),
      reviewerNotes: document.getElementById("reviewNotes").value
    })
  });

  dialog.close();
  await loadApplications();
});

document.getElementById("closeDialog").addEventListener(
  "click",
  () => dialog.close()
);

searchInput.addEventListener("input", renderApplications);
categoryFilter.addEventListener("change", renderApplications);
statusFilter.addEventListener("change", renderApplications);

document.getElementById("refreshButton").addEventListener("click", async () => {
  if (currentTab === "applications") return loadApplications();
  if (currentTab === "activity") return loadActivity();
  if (currentTab === "ipRequests") return loadIpRequests();
  return loadBindings();
});

document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    await api("/api/logout", {method: "POST"});
  } catch {}

  sessionStorage.removeItem("cruza2_session");
  location.replace("access.html");
});

async function loadActivity() {
  const data = await api("/api/activity");
  const list = document.getElementById("activityList");

  list.innerHTML = data.logs.length
    ? data.logs.map(log => `
        <article class="activity-row">
          <div>
            <strong>${escapeHtml(log.username)}</strong>
            <small>${escapeHtml(log.role)}</small>
          </div>
          <div>
            <strong>${escapeHtml(log.event)}</strong>
            <small>${escapeHtml(formatDate(log.created_at))}</small>
          </div>
          <div>
            <strong>${escapeHtml(log.ip)}</strong>
            <small>IP pública</small>
          </div>
          <div>
            <strong>${escapeHtml(log.details || "")}</strong>
            <small>${escapeHtml(log.user_agent || "")}</small>
          </div>
        </article>
      `).join("")
    : '<div class="empty-state">Todavía no existe actividad registrada.</div>';
}

function bindingTitle(binding) {
  if (binding.kind === "founder") {
    return `Fundador · ${binding.name}`;
  }

  return `Jefatura · ${categoryNames[binding.key] || binding.name}`;
}

async function loadBindings() {
  const data = await api("/api/ip-bindings");
  const list = document.getElementById("bindingsList");

  list.innerHTML = data.bindings.map(binding => `
    <article class="binding-card">
      <span class="category-badge">${escapeHtml(bindingTitle(binding))}</span>
      <code>${escapeHtml(binding.ip || "Sin vincular")}</code>
      <small>
        ${
          binding.bound_at
            ? `Vinculada: ${escapeHtml(formatDate(binding.bound_at))}`
            : "Se vinculará en el primer inicio válido."
        }
      </small>
      ${
        binding.ip
          ? `
            <button
              class="danger-button reset-ip"
              data-kind="${escapeHtml(binding.kind)}"
              data-key="${escapeHtml(binding.key)}"
              data-name="${escapeHtml(binding.name)}"
              type="button"
            >
              Restablecer IP
            </button>
          `
          : ""
      }
    </article>
  `).join("");

  document.querySelectorAll(".reset-ip").forEach(button => {
    button.addEventListener("click", async () => {
      const display =
        button.dataset.kind === "founder"
          ? button.dataset.name
          : categoryNames[button.dataset.key];

      if (!confirm(`¿Restablecer la IP de ${display}?`)) return;

      await api(
        `/api/ip-bindings/${button.dataset.kind}/${button.dataset.key}`,
        {method: "DELETE"}
      );

      await loadBindings();
    });
  });
}

async function loadIpRequests() {
  const data = await api("/api/ip-requests");
  const list = document.getElementById("ipRequestsList");

  if (!data.requests.length) {
    list.innerHTML =
      '<div class="empty-state">No hay solicitudes de nueva IP.</div>';
    return;
  }

  list.innerHTML = data.requests.map(item => `
    <article class="ip-request-card ${item.status === "Pendiente" ? "pending" : ""}">
      <header>
        <div>
          <span class="category-badge">Fundador</span>
          <h3>${escapeHtml(item.founder_username)}</h3>
        </div>
        <span class="status-badge ${escapeHtml(item.status)}">
          ${escapeHtml(item.status)}
        </span>
      </header>

      <div class="ip-request-grid">
        <div>
          <small>IP registrada</small>
          <code>${escapeHtml(item.current_ip || "Sin IP anterior")}</code>
        </div>
        <div>
          <small>Nueva IP solicitada</small>
          <code>${escapeHtml(item.requested_ip)}</code>
        </div>
        <div>
          <small>Fecha</small>
          <strong>${escapeHtml(formatDate(item.requested_at))}</strong>
        </div>
        <div>
          <small>Navegador</small>
          <strong>${escapeHtml(item.user_agent || "Desconocido")}</strong>
        </div>
      </div>

      ${
        item.status === "Pendiente"
          ? `
            <footer class="ip-request-actions">
              <button
                class="danger-button decide-ip"
                data-id="${item.id}"
                data-action="reject"
                type="button"
              >
                Rechazar
              </button>
              <button
                class="button primary decide-ip"
                data-id="${item.id}"
                data-action="approve"
                type="button"
              >
                Aprobar nueva IP
              </button>
            </footer>
          `
          : `
            <footer class="ip-request-decision">
              Procesada por ${escapeHtml(item.decided_by || "—")}
              ${item.decision_note ? ` · ${escapeHtml(item.decision_note)}` : ""}
            </footer>
          `
      }
    </article>
  `).join("");

  document.querySelectorAll(".decide-ip").forEach(button => {
    button.addEventListener("click", async () => {
      const approving = button.dataset.action === "approve";
      const actionText = approving ? "aprobar" : "rechazar";

      if (!confirm(`¿Seguro que deseas ${actionText} esta nueva IP?`)) {
        return;
      }

      const note =
        prompt("Nota opcional para el registro:", "") || "";

      await api(`/api/ip-requests/${button.dataset.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          action: button.dataset.action,
          note
        })
      });

      await loadIpRequests();
      if (approving) await loadBindings();
    });
  });
}

function activateTab(tab) {
  currentTab = tab;

  document.querySelectorAll(".tab-button").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  document.getElementById("applicationsView").classList.toggle(
    "hidden",
    tab !== "applications"
  );
  document.getElementById("activityView").classList.toggle(
    "hidden",
    tab !== "activity"
  );
  document.getElementById("ipRequestsView").classList.toggle(
    "hidden",
    tab !== "ipRequests"
  );
  document.getElementById("bindingsView").classList.toggle(
    "hidden",
    tab !== "bindings"
  );
  statsGrid.classList.toggle("hidden", tab !== "applications");
}

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", async () => {
    const tab = button.dataset.tab;

    if ((tab === "ipRequests" || tab === "bindings") && !isKaizen) {
      return;
    }

    activateTab(tab);

    if (tab === "activity") await loadActivity();
    if (tab === "ipRequests") await loadIpRequests();
    if (tab === "bindings") await loadBindings();
  });
});

loadApplications().catch(error => {
  applicationsList.innerHTML =
    `<div class="empty-state">${escapeHtml(error.message)}</div>`;
});
