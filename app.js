const forms = window.CRUZA2_FORMS;
const config = window.CRUZA2_CONFIG;

const content = document.getElementById("applicationContent");
const sectionKicker = document.getElementById("sectionKicker");
const pageTitle = document.getElementById("pageTitle");
const restartButton = document.getElementById("restartButton");
const progressWrap = document.getElementById("progressWrap");
const progressLabel = document.getElementById("progressLabel");
const progressValue = document.getElementById("progressValue");
const progressBar = document.getElementById("progressBar");
const formActions = document.getElementById("formActions");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const formMessage = document.getElementById("formMessage");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const volumeDown = document.getElementById("volumeDown");
const volumeUp = document.getElementById("volumeUp");
const musicStatus = document.getElementById("musicStatus");

const state = {
  category: null,
  section: 0,
  answers: {},
  submitting: false
};

function apiUrl(path) {
  const base = String(config?.API_BASE_URL || "").trim();

  if (!base || base.includes("TU-WORKER") || base.includes("TU-USUARIO")) {
    throw new Error(
      "La API todavía no está conectada. Despliega el Cloudflare Worker y pega su URL en frontend/config.js."
    );
  }

  return `${base.replace(/\/$/, "")}${path}`;
}

function draftKey() {
  return state.category ? `cruza2_general_draft_${state.category}` : "";
}

function saveDraft() {
  if (!state.category) return;
  localStorage.setItem(draftKey(), JSON.stringify({
    section: state.section,
    answers: state.answers
  }));
}

function loadDraft(category) {
  try {
    return JSON.parse(localStorage.getItem(`cruza2_general_draft_${category}`) || "null");
  } catch {
    return null;
  }
}

function clearDraft() {
  if (state.category) localStorage.removeItem(draftKey());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCategorySelection() {
  state.category = null;
  state.section = 0;
  state.answers = {};
  sectionKicker.textContent = "FORMULARIO GENERAL";
  pageTitle.textContent = "Elige una postulación";
  restartButton.classList.add("hidden");
  progressWrap.classList.add("hidden");
  formActions.classList.add("hidden");

  content.innerHTML = `
    <div class="category-intro">
      <h2>¿A qué área deseas pertenecer?</h2>
      <p>Cada departamento posee preguntas y criterios distintos. Selecciona únicamente el formulario que realmente deseas completar.</p>
      <div class="category-grid">
        ${Object.entries(forms).map(([key, form]) => `
          <button class="category-card" type="button" data-category="${key}">
            <span class="category-icon">${form.icon}</span>
            <div><strong>${escapeHtml(form.shortTitle)}</strong><p>${escapeHtml(form.description)}</p></div>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  content.querySelectorAll(".category-card").forEach((button) => {
    button.addEventListener("click", () => startForm(button.dataset.category));
  });
}

function startForm(category) {
  const draft = loadDraft(category);
  state.category = category;
  state.section = draft?.section ?? 0;
  state.answers = draft?.answers ?? {};
  restartButton.classList.remove("hidden");
  progressWrap.classList.remove("hidden");
  formActions.classList.remove("hidden");
  renderSection();
}

function buildField(field) {
  const value = state.answers[field.id] ?? "";
  const common = `id="field_${field.id}" data-field="${field.id}" ${field.required ? "required" : ""}`;

  let control = "";
  if (field.type === "textarea") {
    control = `<textarea ${common} minlength="${field.minLength || 0}" maxlength="${field.maxLength || 2000}">${escapeHtml(value)}</textarea>`;
  } else if (field.type === "select") {
    control = `<select ${common}><option value="">Selecciona una opción</option>${field.options.map(option => `<option value="${escapeHtml(option)}" ${value === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`;
  } else {
    control = `<input ${common} type="${field.type}" value="${escapeHtml(value)}"
      ${field.min !== undefined ? `min="${field.min}"` : ""}
      ${field.max !== undefined ? `max="${field.max}"` : ""}
      ${field.maxLength ? `maxlength="${field.maxLength}"` : ""}
      ${field.pattern ? `pattern="${field.pattern}"` : ""}>`;
  }

  return `
    <label class="field ${field.type === "textarea" ? "full" : ""}">
      <strong>${escapeHtml(field.label)}</strong>
      ${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ""}
      ${control}
    </label>
  `;
}

function renderSection() {
  const form = forms[state.category];
  const section = form.sections[state.section];
  const percentage = Math.round(((state.section + 1) / form.sections.length) * 100);

  sectionKicker.textContent = form.shortTitle.toUpperCase();
  pageTitle.textContent = form.title;
  progressLabel.textContent = `Sección ${state.section + 1} de ${form.sections.length}`;
  progressValue.textContent = `${percentage}%`;
  progressBar.style.width = `${percentage}%`;

  backButton.textContent = state.section === 0 ? "Volver" : "Atrás";
  nextButton.textContent = state.section === form.sections.length - 1 ? "Enviar solicitud →" : "Siguiente →";
  formMessage.textContent = "";

  content.innerHTML = `
    <div class="section-heading">
      <span class="eyebrow">${escapeHtml(form.shortTitle)} · ${state.section + 1}</span>
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.description)}</p>
    </div>
    <div class="fields-grid">${section.fields.map(buildField).join("")}</div>
  `;

  content.querySelectorAll("[data-field]").forEach((element) => {
    element.addEventListener("input", () => {
      state.answers[element.dataset.field] = element.value;
      saveDraft();
    });
    element.addEventListener("change", () => {
      state.answers[element.dataset.field] = element.value;
      saveDraft();
    });
  });

  content.scrollTop = 0;
}

function validateCurrentSection() {
  const form = forms[state.category];
  const section = form.sections[state.section];

  for (const field of section.fields) {
    const value = String(state.answers[field.id] ?? "").trim();

    if (field.required && !value) {
      return `Completa: ${field.label}`;
    }
    if (field.minLength && value.length < field.minLength) {
      return `${field.label}: escribe al menos ${field.minLength} caracteres.`;
    }
    if (field.pattern && value && !(new RegExp(field.pattern).test(value))) {
      return `${field.label}: el formato no es válido.`;
    }
    if (field.type === "number" && value) {
      const number = Number(value);
      if (field.min !== undefined && number < field.min) return `${field.label}: valor demasiado bajo.`;
      if (field.max !== undefined && number > field.max) return `${field.label}: valor demasiado alto.`;
    }
  }
  return "";
}

async function submitApplication() {
  const form = forms[state.category];
  state.submitting = true;
  nextButton.disabled = true;
  formMessage.textContent = "Enviando solicitud...";

  const answerRows = form.sections.flatMap(section =>
    section.fields.map(field => ({
      section: section.title,
      id: field.id,
      question: field.label,
      answer: state.answers[field.id] ?? ""
    }))
  );

  try {
    const response = await fetch(apiUrl("/api/applications"), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        category: state.category,
        answers: answerRows
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo enviar.");

    clearDraft();
    progressWrap.classList.add("hidden");
    formActions.classList.add("hidden");
    restartButton.classList.add("hidden");
    content.innerHTML = `
      <div class="success-view">
        <div><span>✓</span><h2>Solicitud enviada</h2>
        <p>Tu formulario de ${escapeHtml(form.shortTitle)} fue recibido correctamente. La jefatura correspondiente será la encargada de evaluarlo.</p>
        <small>Solicitud #${data.id}</small></div>
      </div>
    `;
  } catch (error) {
    const isNetworkError =
      error instanceof TypeError ||
      /failed to fetch|networkerror|load failed/i.test(String(error?.message || ""));

    formMessage.textContent = isNetworkError
      ? "No se pudo conectar con la API. Revisa la URL del Worker y su configuración CORS."
      : error.message;

    nextButton.disabled = false;
    state.submitting = false;
  }
}

nextButton.addEventListener("click", async () => {
  if (state.submitting) return;
  const error = validateCurrentSection();
  if (error) {
    formMessage.textContent = error;
    return;
  }

  const form = forms[state.category];
  if (state.section < form.sections.length - 1) {
    state.section++;
    saveDraft();
    renderSection();
  } else {
    await submitApplication();
  }
});

backButton.addEventListener("click", () => {
  if (state.section === 0) {
    renderCategorySelection();
    return;
  }
  state.section--;
  saveDraft();
  renderSection();
});

restartButton.addEventListener("click", () => {
  if (confirm("¿Deseas salir de este formulario? El progreso quedará guardado en este navegador.")) {
    renderCategorySelection();
  }
});

function updateMusic() {
  musicToggle.textContent = backgroundMusic.paused ? "▶" : "Ⅱ";
  musicStatus.textContent = `Música ${Math.round(backgroundMusic.volume * 100)}%`;
}
backgroundMusic.volume = .35;
updateMusic();
musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try { await backgroundMusic.play(); } catch {}
  } else backgroundMusic.pause();
  updateMusic();
});
volumeDown.addEventListener("click", () => { backgroundMusic.volume = Math.max(0, backgroundMusic.volume - .1); updateMusic(); });
volumeUp.addEventListener("click", () => { backgroundMusic.volume = Math.min(1, backgroundMusic.volume + .1); updateMusic(); });
document.addEventListener("pointerdown", async () => {
  if (backgroundMusic.paused) {
    try { await backgroundMusic.play(); } catch {}
    updateMusic();
  }
}, {once:true});

renderCategorySelection();
