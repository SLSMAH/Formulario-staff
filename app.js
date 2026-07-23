const DB_NAME = "cruza2_staff_db";
const DB_VERSION = 1;
const STORE_NAME = "applications";

const questions = [
  {
    id: "q1",
    type: "choice",
    title: "¿Qué significa RK (Revenge Kill) dentro de un servidor de roleplay?",
    helper: "Selecciona la definición más correcta.",
    options: [
      ["a", "Recordar absolutamente todo después de morir."],
      ["b", "Regresar para vengarte de quien te mató o continuar el conflicto usando información previa a tu muerte."],
      ["c", "Matar a un jugador sin utilizar armas."],
      ["d", "Reaparecer en el hospital y comenzar un rol diferente."]
    ]
  },
  {
    id: "q2",
    type: "choice",
    title: "¿Cuál de estas acciones se considera DM (Deathmatch)?",
    helper: "Piensa en la necesidad de una razón y un contexto de rol.",
    options: [
      ["a", "Defenderte durante un robo correctamente iniciado."],
      ["b", "Reducir a una persona después de una amenaza clara."],
      ["c", "Golpear o matar a otro jugador sin motivo ni rol previo."],
      ["d", "Participar en un evento PvP anunciado por administración."]
    ]
  },
  {
    id: "q3",
    type: "choice",
    title: "¿Qué describe mejor el PG (Power Gaming)?",
    helper: "Elige el ejemplo que representa una acción imposible, irreal o forzada.",
    options: [
      ["a", "Realizar acciones imposibles o forzar un resultado sin permitir reacción al otro jugador."],
      ["b", "Hablar fuera de personaje por un chat OOC."],
      ["c", "Usar información vista en Discord."],
      ["d", "Regresar al lugar donde moriste."]
    ]
  },
  {
    id: "q4",
    type: "choice",
    title: "Un amigo te informa por Discord dónde está escondido un enemigo y tú vas directamente al lugar. ¿Qué regla rompes?",
    helper: "La información nunca fue obtenida por tu personaje.",
    options: [
      ["a", "NRE"],
      ["b", "RK"],
      ["c", "CJ"],
      ["d", "MG (Metagaming)"]
    ]
  },
  {
    id: "q5",
    type: "choice",
    title: "Chocas a gran velocidad, el vehículo queda destruido y continúas como si nada hubiera ocurrido. ¿Qué corresponde?",
    helper: "Valora el daño y las consecuencias del accidente.",
    options: [
      ["a", "Es válido porque el juego permite mover el vehículo."],
      ["b", "Debes interpretar el accidente; ignorarlo puede ser PG o falta de rol de entorno."],
      ["c", "Solo es sancionable si hay un policía mirando."],
      ["d", "Es únicamente RK."]
    ]
  },
  {
    id: "q6",
    type: "choice",
    title: "Durante una intervención administrativa, ¿cuál es la conducta correcta?",
    helper: "El staff debe poder revisar la situación con orden.",
    options: [
      ["a", "Continuar el tiroteo hasta que el administrador termine de escribir."],
      ["b", "Insultar al reportado para que admita lo ocurrido."],
      ["c", "Pausar el rol cuando se indique, explicar con calma y aportar pruebas sin mentir."],
      ["d", "Desconectarte para evitar una posible sanción."]
    ]
  },
  {
    id: "q7",
    type: "choice",
    title: "Mueres en un conflicto y, al reaparecer, vuelves inmediatamente con armas para atacar al mismo grupo.",
    helper: "Identifica la infracción principal.",
    options: [
      ["a", "RK"],
      ["b", "NRE"],
      ["c", "Fear RP"],
      ["d", "No existe infracción."]
    ]
  },
  {
    id: "q8",
    type: "choice",
    title: "Un jugador tiene un arma apuntándole y está completamente rodeado, pero saca un fusil y dispara sin valorar su vida.",
    helper: "¿Qué concepto se aplica mejor?",
    options: [
      ["a", "MG"],
      ["b", "CK"],
      ["c", "RK"],
      ["d", "NVL o falta de valoración de vida"]
    ]
  },
  {
    id: "q9",
    type: "choice",
    title: "¿Qué diferencia existe entre IC y OOC?",
    helper: "Selecciona la respuesta que separa correctamente personaje y jugador.",
    options: [
      ["a", "IC es Discord y OOC es el chat local."],
      ["b", "IC pertenece al personaje y al mundo del rol; OOC pertenece al jugador fuera del personaje."],
      ["c", "Son exactamente lo mismo."],
      ["d", "OOC solo puede usarlo el dueño del servidor."]
    ]
  },
  {
    id: "q10",
    type: "choice",
    title: "Un compañero de staff es amigo tuyo y rompe una regla grave. ¿Qué debes hacer?",
    helper: "La imparcialidad es obligatoria dentro del equipo.",
    options: [
      ["a", "Ignorarlo para evitar problemas internos."],
      ["b", "Borrar las pruebas y hablar con él en privado."],
      ["c", "Actuar con imparcialidad, documentar el caso y escalarlo según el protocolo."],
      ["d", "Sancionar al jugador que lo reportó."]
    ]
  },
  {
    id: "q11",
    type: "development",
    title: "Un jugador reporta DM, pero ambas partes cuentan versiones diferentes. ¿Cómo investigarías el caso?",
    helper: "Explica el proceso, las preguntas que harías y qué pruebas considerarías."
  },
  {
    id: "q12",
    type: "development",
    title: "Durante un rol, una persona comienza a insultar OOC y provoca a los demás. ¿Cómo actuarías como staff?",
    helper: "Describe cómo controlarías la situación sin empeorar el conflicto."
  },
  {
    id: "q13",
    type: "development",
    title: "Observas que otro miembro del staff abusa de sus permisos para beneficiar a un amigo. ¿Qué harías?",
    helper: "Valora la evidencia, la jerarquía y la imparcialidad."
  },
  {
    id: "q14",
    type: "development",
    title: "Explica con tus palabras la diferencia entre DM, RK, MG y PG.",
    helper: "Incluye al menos un ejemplo breve para demostrar que comprendes cada concepto."
  },
  {
    id: "q15",
    type: "development",
    title: "Un jugador se desconecta en medio de un robo para evitar perder sus pertenencias. ¿Cómo procederías?",
    helper: "Indica qué revisarías antes de tomar una decisión."
  }
];

const answerKey = {
  q1: "b",
  q2: "c",
  q3: "a",
  q4: "d",
  q5: "b",
  q6: "c",
  q7: "a",
  q8: "d",
  q9: "b",
  q10: "c"
};

const state = {
  step: -1,
  discord: "",
  answers: {},
  sending: false,
  done: false
};

const content = document.getElementById("content");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const nextBtnText = document.getElementById("nextBtnText");
const progressBar = document.getElementById("progressBar");
const progressValue = document.getElementById("progressValue");
const progressLabel = document.getElementById("progressLabel");
const sectionKicker = document.getElementById("sectionKicker");
const sectionTitle = document.getElementById("sectionTitle");
const validationText = document.getElementById("validationText");
const actions = document.querySelector(".actions");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });

        store.createIndex("discord", "discord", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
        store.createIndex("status", "status", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveApplication(application) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(application);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

function calculateScore() {
  let score = 0;
  const maxScore = Object.keys(answerKey).length;

  for (const [questionId, correctAnswer] of Object.entries(answerKey)) {
    if (state.answers[questionId] === correctAnswer) {
      score++;
    }
  }

  return {
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100)
  };
}

function currentProgress() {
  if (state.step < 0) return 0;
  if (state.step >= questions.length) return 100;

  const totalScreens = questions.length + 1;
  return Math.round(((state.step + 1) / totalScreens) * 100);
}

function isCurrentValid() {
  if (state.step === -1) {
    const name = state.discord.trim();
    return name.length >= 2 && name.length <= 50;
  }

  if (state.step >= 0 && state.step < questions.length) {
    const question = questions[state.step];
    const answer = state.answers[question.id];

    if (question.type === "choice") {
      return Boolean(answer);
    }

    return String(answer || "").trim().length >= 20;
  }

  return questions.every((question) => {
    const answer = state.answers[question.id];
    return question.type === "choice"
      ? Boolean(answer)
      : String(answer || "").trim().length >= 20;
  });
}

function updateHeader() {
  const percent = currentProgress();

  progressBar.style.width = `${percent}%`;
  progressValue.textContent = `${percent}%`;

  if (state.step === -1) {
    progressLabel.textContent = "Inicio";
    sectionKicker.textContent = "IDENTIFICACIÓN";
    sectionTitle.textContent = "Formulario para Staff";
    backBtn.disabled = true;
    nextBtnText.textContent = "Comenzar";
    validationText.textContent = isCurrentValid()
      ? "Identidad lista"
      : "Escribe tu nombre de Discord";
    return;
  }

  if (state.step < questions.length) {
    const question = questions[state.step];
    progressLabel.textContent = `Pregunta ${state.step + 1} de ${questions.length}`;
    sectionKicker.textContent = question.type === "choice"
      ? "SELECCIÓN MÚLTIPLE"
      : "DESARROLLO";
    sectionTitle.textContent = "Evaluación de conocimientos";
    backBtn.disabled = false;
    nextBtnText.textContent = state.step === questions.length - 1
      ? "Revisar"
      : "Siguiente";
    if (question.type === "choice") {
      const selectedAnswer = state.answers[question.id];
      validationText.textContent = selectedAnswer
        ? selectedAnswer === answerKey[question.id]
          ? "Respuesta correcta"
          : "Respuesta incorrecta"
        : "Selecciona una respuesta";
    } else {
      validationText.textContent = isCurrentValid()
        ? "Respuesta guardada"
        : "Mínimo 20 caracteres";
    }
    return;
  }

  progressLabel.textContent = "Revisión final";
  sectionKicker.textContent = "CONFIRMACIÓN";
  sectionTitle.textContent = "Enviar solicitud";
  backBtn.disabled = state.sending;
  nextBtnText.textContent = state.sending ? "Guardando..." : "Enviar solicitud";
  validationText.textContent = "Revisa antes de enviar";
}

function renderIntro() {
  content.innerHTML = `
    <div class="view">
      <span class="intro-badge">Bienvenido a la evaluación</span>
      <h2 class="intro-title">Queremos conocer tu criterio, no solamente tu memoria.</h2>
      <p class="intro-copy">
        Responde las preguntas de selección múltiple y desarrolla las situaciones con calma.
        Solo necesitas escribir tu nombre de Discord para que el equipo pueda identificarte.
      </p>

      <div class="notice">
        Esta versión funciona completamente fuera de MTA. Guarda las solicitudes en la base de datos
        local del navegador mediante IndexedDB.
      </div>

      <div class="field-group">
        <label class="field-label" for="discordInput">
          Nombre en Discord
          <small>Ejemplo: angelcruz</small>
        </label>
        <input
          class="text-input"
          id="discordInput"
          type="text"
          maxlength="50"
          autocomplete="off"
          placeholder="Escribe tu usuario de Discord"
          value="${escapeHtml(state.discord)}"
        >
        <p class="input-note">No se solicita correo, contraseña ni información de tu cuenta.</p>
      </div>
    </div>
  `;

  const input = document.getElementById("discordInput");
  input.focus();

  input.addEventListener("input", (event) => {
    state.discord = event.target.value;
    updateHeader();
  });
}

function renderChoiceQuestion(question) {
  const selected = state.answers[question.id] || "";
  const correctAnswer = answerKey[question.id];
  const hasAnswered = Boolean(selected);
  const isCorrect = hasAnswered && selected === correctAnswer;

  content.innerHTML = `
    <div class="view">
      <span class="question-type">Situación de roleplay</span>
      <h2 class="question-title">${escapeHtml(question.title)}</h2>
      <p class="question-helper">${escapeHtml(question.helper)}</p>

      <div class="options-grid">
        ${question.options.map(([value, text]) => {
          let optionClass = "";

          if (selected === value) {
            optionClass = value === correctAnswer
              ? "selected correct"
              : "selected incorrect";
          }

          return `
            <button
              class="option ${optionClass}"
              type="button"
              data-option="${value}"
            >
              <span class="option-key">${value}</span>
              <span class="option-text">${escapeHtml(text)}</span>
            </button>
          `;
        }).join("")}
      </div>

      ${hasAnswered ? `
        <div class="answer-feedback ${isCorrect ? "correct" : "incorrect"}">
          <span class="feedback-icon">${isCorrect ? "✓" : "!"}</span>
          <div>
            <strong>${isCorrect ? "Respuesta correcta" : "Respuesta incorrecta"}</strong>
            <p>
              ${isCorrect
                ? "Comprendiste correctamente esta situación de roleplay."
                : "La opción seleccionada no corresponde con la regla evaluada. Puedes cambiarla antes de continuar."}
            </p>
          </div>
        </div>
      ` : ""}
    </div>
  `;

  content.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      state.answers[question.id] = option.dataset.option;
      render();
    });
  });
}

function renderDevelopmentQuestion(question) {
  const value = state.answers[question.id] || "";

  content.innerHTML = `
    <div class="view">
      <span class="question-type">Respuesta de desarrollo</span>
      <h2 class="question-title">${escapeHtml(question.title)}</h2>
      <p class="question-helper">${escapeHtml(question.helper)}</p>

      <div class="field-group">
        <textarea
          class="answer-textarea"
          id="developmentAnswer"
          minlength="20"
          maxlength="1200"
          placeholder="Escribe una respuesta clara y completa..."
        >${escapeHtml(value)}</textarea>
        <div class="char-counter" id="charCounter">${value.length} / 1200</div>
      </div>
    </div>
  `;

  const textarea = document.getElementById("developmentAnswer");
  const counter = document.getElementById("charCounter");

  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);

  textarea.addEventListener("input", (event) => {
    state.answers[question.id] = event.target.value;
    counter.textContent = `${event.target.value.length} / 1200`;
    updateHeader();
  });
}

function renderReview() {
  const choiceCount = questions.filter((question) => question.type === "choice").length;
  const developmentCount = questions.filter((question) => question.type === "development").length;

  content.innerHTML = `
    <div class="view">
      <span class="intro-badge">Todo preparado</span>
      <h2 class="intro-title">Confirma el envío de tu solicitud.</h2>
      <p class="intro-copy">
        Tus respuestas quedarán guardadas en este navegador y podrán revisarse desde el panel
        de solicitudes incluido en la carpeta.
      </p>

      <div class="review-list">
        <div class="review-row">
          <span>Nombre de Discord</span>
          <strong>${escapeHtml(state.discord)}</strong>
        </div>
        <div class="review-row">
          <span>Selección múltiple</span>
          <strong>${choiceCount} COMPLETADAS</strong>
        </div>
        <div class="review-row">
          <span>Desarrollo</span>
          <strong>${developmentCount} COMPLETADAS</strong>
        </div>
        <div class="review-row">
          <span>Estado inicial</span>
          <strong>PENDIENTE</strong>
        </div>
      </div>
    </div>
  `;
}

function renderSuccess(applicationId) {
  state.done = true;
  actions.style.display = "none";

  content.innerHTML = `
    <div class="result-view view">
      <div>
        <div class="result-icon">✓</div>
        <h2>Solicitud enviada</h2>
        <p>
          La postulación fue guardada correctamente en la base de datos local del navegador.
          Puedes revisarla desde el panel administrativo.
        </p>
        <span class="application-id">Solicitud #${applicationId}</span>
      </div>
    </div>
  `;
}

function render() {
  if (state.done) return;

  actions.style.display = "flex";
  nextBtn.disabled = state.sending;

  if (state.step === -1) {
    renderIntro();
  } else if (state.step < questions.length) {
    const question = questions[state.step];
    if (question.type === "choice") {
      renderChoiceQuestion(question);
    } else {
      renderDevelopmentQuestion(question);
    }
  } else {
    renderReview();
  }

  updateHeader();
  content.scrollTop = 0;
}

function goNext() {
  if (state.sending || state.done) return;

  if (!isCurrentValid()) {
    validationText.textContent = state.step >= 0 &&
      state.step < questions.length &&
      questions[state.step].type === "development"
        ? "Escribe al menos 20 caracteres"
        : "Completa esta sección";
    return;
  }

  if (state.step < questions.length) {
    state.step++;
    render();
    return;
  }

  submitForm();
}

function goBack() {
  if (state.sending || state.done) return;

  if (state.step > -1) {
    state.step--;
    render();
  }
}

async function submitForm() {
  if (!isCurrentValid()) return;

  state.sending = true;
  updateHeader();

  try {
    const scoreData = calculateScore();

    const application = {
      discord: state.discord.trim(),
      answers: questions.map((question) => {
        const selectedValue = state.answers[question.id];
        const selectedOption = question.type === "choice"
          ? question.options.find(([value]) => value === selectedValue)
          : null;

        return {
          id: question.id,
          type: question.type,
          question: question.title,
          answer: selectedValue,
          answerText: question.type === "choice"
            ? selectedOption?.[1] || "Respuesta desconocida"
            : selectedValue,
          isCorrect: question.type === "choice"
            ? selectedValue === answerKey[question.id]
            : null
        };
      }),
      score: scoreData.score,
      maxScore: scoreData.maxScore,
      percentage: scoreData.percentage,
      status: "Pendiente",
      createdAt: new Date().toISOString()
    };

    const id = await saveApplication(application);
    renderSuccess(id);
  } catch (error) {
    console.error(error);
    validationText.textContent = "No se pudo guardar. Revisa los permisos del navegador.";
    state.sending = false;
    updateHeader();
  }
}

backBtn.addEventListener("click", goBack);
nextBtn.addEventListener("click", goNext);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && state.step === -1) {
    goNext();
  }
});

render();
