const config = window.CRUZA2_CONFIG;
const session = JSON.parse(
  sessionStorage.getItem("cruza2_session") || "null"
);

if (!session?.token) {
  location.replace("access.html");
}

const categoryNames = {
  staff: "Staff",
  police: "Policía",
  mechanic: "Mecánico",
  ems: "911 / EMS"
};

const roleNames = {
  admin: "Administración general",
  staff: "Jefatura de Staff",
  police: "Jefatura Policial",
  mechanic: "Jefatura Mecánica",
  ems: "Jefatura 911 / EMS"
};

const isAdmin = session.role === "admin";

let applications = [];
let users = [];
let activeApplication = null;
let currentTab = "applications";

const applicationsList = document.getElementById("applicationsList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const statsGrid = document.getElementById("statsGrid");
const dialog = document.getElementById("applicationDialog");

document.getElementById("panelRole").textContent = isAdmin
  ? `ADMINISTRACIÓN · ${String(session.username).toUpperCase()}`
  : `JEFATURA · ${categoryNames[session.role]}`;

document.getElementById("panelTitle").textContent = isAdmin
  ? "Administración general"
  : `Postulaciones de ${categoryNames[session.role]}`;

if (isAdmin) {
  document.getElementById("adminTabs").classList.remove("hidden");
} else {
  categoryFilter.value = session.role;
  categoryFilter.disabled = true;
}

function apiUrl(path) {
  const base = String(config?.API_BASE_URL || "").trim();

  if (
    !base
    || base.includes("TU-WORKER")
    || base.includes("TU-USUARIO")
  ) {
    throw new Error(
      "La API todavía no está conectada. Revisa config.js."
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
  if (!value) {
    return "Sin registro";
  }

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
      !query
      || String(app.discord_username || "")
        .toLowerCase()
        .includes(query)
    )
    && (
      categoryFilter.value === "all"
      || app.category === categoryFilter.value
    )
    && (
      statusFilter.value === "all"
      || app.status === statusFilter.value
    )
  );
}

function renderStats() {
  const rows = applications;

  statsGrid.innerHTML = `
    <article class="stat-card">
      <span>Total</span>
      <strong>${rows.length}</strong>
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

function decisionText(app) {
  if (
    !["Aceptado", "Rechazado"].includes(app.status)
    || !app.reviewed_by
  ) {
    return "";
  }

  const action = app.status === "Aceptado"
    ? "Aprobado"
    : "Rechazado";

  return `
    <small class="reviewer-line">
      ${action} por
      <strong>${escapeHtml(app.reviewed_by)}</strong>
      · ${escapeHtml(formatDate(app.reviewed_at))}
    </small>
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
        <small>
          #${app.id} · ${escapeHtml(formatDate(app.submitted_at))}
        </small>
        ${decisionText(app)}
      </div>

      <span class="category-badge">
        ${escapeHtml(categoryNames[app.category])}
      </span>

      <span class="status-badge ${app.status.replace(/\s/g, "-")}">
        ${escapeHtml(app.status)}
      </span>

      <button class="ghost-button open-app"
              data-id="${app.id}"
              type="button">
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
  if (!activeApplication) {
    return;
  }

  document.getElementById("dialogCategory").textContent =
    categoryNames[activeApplication.category].toUpperCase();
  document.getElementById("dialogTitle").textContent =
    activeApplication.discord_username;

  const decisionChip = (
    ["Aceptado", "Rechazado"].includes(activeApplication.status)
    && activeApplication.reviewed_by
  )
    ? `
      <span class="meta-chip decision-chip">
        ${activeApplication.status === "Aceptado" ? "Aprobado" : "Rechazado"}
        por ${escapeHtml(activeApplication.reviewed_by)}
      </span>
      <span class="meta-chip">
        Decisión: ${escapeHtml(formatDate(activeApplication.reviewed_at))}
      </span>
    `
    : "";

  document.getElementById("dialogMeta").innerHTML = `
    <span class="meta-chip">Solicitud #${activeApplication.id}</span>
    <span class="meta-chip">
      ${escapeHtml(formatDate(activeApplication.submitted_at))}
    </span>
    <span class="meta-chip">
      Estado: ${escapeHtml(activeApplication.status)}
    </span>
    ${
      activeApplication.score !== null
        ? `<span class="meta-chip">
             Puntuación: ${activeApplication.score}/100
           </span>`
        : ""
    }
    ${decisionChip}
  `;

  let lastSection = "";
  document.getElementById("dialogAnswers").innerHTML =
    activeApplication.answers.map(row => {
      const heading = row.section !== lastSection
        ? `<div class="eyebrow answer-section">
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

document.getElementById("saveReview").addEventListener(
  "click",
  async () => {
    if (!activeApplication) {
      return;
    }

    const button = document.getElementById("saveReview");
    const scoreValue = document.getElementById("reviewScore").value;

    button.disabled = true;
    button.textContent = "Guardando...";

    try {
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
    } catch (error) {
      alert(error.message);
    } finally {
      button.disabled = false;
      button.textContent = "Guardar evaluación";
    }
  }
);

document.getElementById("closeDialog").addEventListener(
  "click",
  () => dialog.close()
);

searchInput.addEventListener("input", renderApplications);
categoryFilter.addEventListener("change", renderApplications);
statusFilter.addEventListener("change", renderApplications);

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

function userRoleOptions(selectedRole, disabled = false) {
  return Object.entries(roleNames).map(([value, label]) => `
    <option value="${value}"
            ${value === selectedRole ? "selected" : ""}
            ${disabled && value !== selectedRole ? "disabled" : ""}>
      ${escapeHtml(label)}
    </option>
  `).join("");
}

function renderUsers() {
  const list = document.getElementById("usersList");
  const count = document.getElementById("usersCount");
  count.textContent = `${users.length} ${users.length === 1 ? "usuario" : "usuarios"}`;

  if (!users.length) {
    list.innerHTML =
      '<div class="empty-state">No existen cuentas registradas.</div>';
    return;
  }

  list.innerHTML = users.map(user => {
    const isSelf = String(user.username).toLowerCase()
      === String(session.username).toLowerCase();

    return `
      <article class="user-account-card" data-id="${user.id}">
        <header>
          <div>
            <strong>${escapeHtml(user.username)}</strong>
            <small>
              Creada por ${escapeHtml(user.created_by || "Sistema")}
              · ${escapeHtml(formatDate(user.created_at))}
            </small>
          </div>
          <span class="category-badge">
            ${escapeHtml(roleNames[user.role] || user.role)}
          </span>
        </header>

        <div class="user-account-meta">
          <span>
            Último acceso:
            <strong>${escapeHtml(formatDate(user.last_login_at))}</strong>
          </span>
          <span>
            Última modificación:
            <strong>${escapeHtml(user.updated_by || "Sistema")}</strong>
          </span>
        </div>

        <div class="user-account-controls">
          <label>Permiso
            <select class="edit-user-role" ${isSelf ? "disabled" : ""}>
              ${userRoleOptions(user.role, isSelf)}
            </select>
          </label>

          <label>Nueva contraseña
            <input class="edit-user-password"
                   type="password"
                   maxlength="128"
                   autocomplete="new-password"
                   placeholder="Déjala vacía para conservarla">
          </label>

          <button class="button secondary save-user" type="button">
            Guardar cambios
          </button>

          <button class="danger-button delete-user"
                  type="button"
                  ${isSelf ? "disabled" : ""}>
            Eliminar
          </button>
        </div>

        ${
          isSelf
            ? '<p class="self-account-note">Esta es tu sesión actual. Puedes cambiar tu contraseña, pero no tu rol ni eliminarte.</p>'
            : ""
        }
      </article>
    `;
  }).join("");

  document.querySelectorAll(".save-user").forEach(button => {
    button.addEventListener("click", async () => {
      const card = button.closest(".user-account-card");
      const id = Number(card.dataset.id);
      const role = card.querySelector(".edit-user-role").value;
      const password = card.querySelector(".edit-user-password").value;

      button.disabled = true;
      button.textContent = "Guardando...";

      try {
        await api(`/api/users/${id}`, {
          method: "PATCH",
          body: JSON.stringify({role, password})
        });
        await loadUsers();
      } catch (error) {
        alert(error.message);
      } finally {
        button.disabled = false;
        button.textContent = "Guardar cambios";
      }
    });
  });

  document.querySelectorAll(".delete-user").forEach(button => {
    button.addEventListener("click", async () => {
      const card = button.closest(".user-account-card");
      const id = Number(card.dataset.id);
      const user = users.find(item => item.id === id);

      if (!confirm(
        `¿Eliminar definitivamente la cuenta ${user?.username || ""}?`
      )) {
        return;
      }

      button.disabled = true;

      try {
        await api(`/api/users/${id}`, {method: "DELETE"});
        await loadUsers();
      } catch (error) {
        alert(error.message);
        button.disabled = false;
      }
    });
  });
}

async function loadUsers() {
  if (!isAdmin) {
    return;
  }

  const data = await api("/api/users");
  users = data.users;
  renderUsers();
}

document.getElementById("createUserForm")?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const username = document.getElementById("newUsername");
    const password = document.getElementById("newPassword");
    const role = document.getElementById("newRole");
    const message = document.getElementById("userFormMessage");
    const button = document.getElementById("createUserButton");

    button.disabled = true;
    message.textContent = "Creando cuenta...";

    try {
      await api("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: username.value.trim(),
          password: password.value,
          role: role.value
        })
      });

      username.value = "";
      password.value = "";
      message.textContent = "Cuenta creada correctamente.";
      await loadUsers();
    } catch (error) {
      message.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  }
);

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
  document.getElementById("usersView").classList.toggle(
    "hidden",
    tab !== "users"
  );
  statsGrid.classList.toggle("hidden", tab !== "applications");
}

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", async () => {
    const tab = button.dataset.tab;
    activateTab(tab);

    if (tab === "activity") {
      await loadActivity();
    }

    if (tab === "applications") {
      await loadApplications();
    }

    if (tab === "users") {
      await loadUsers();
    }
  });
});

document.getElementById("refreshButton").addEventListener(
  "click",
  async () => {
    if (currentTab === "activity") {
      return loadActivity();
    }

    if (currentTab === "users") {
      return loadUsers();
    }

    return loadApplications();
  }
);

document.getElementById("logoutButton").addEventListener(
  "click",
  async () => {
    try {
      await api("/api/logout", {method: "POST"});
    } catch {}

    sessionStorage.removeItem("cruza2_session");
    location.replace("access.html");
  }
);

loadApplications().catch(error => {
  applicationsList.innerHTML =
    `<div class="empty-state">${escapeHtml(error.message)}</div>`;
});
