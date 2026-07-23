const DB_NAME = "cruza2_staff_db";
const DB_VERSION = 1;
const STORE_NAME = "applications";

const choiceCatalog = {
  q1: {
    correct: "b",
    options: {
      a: "Recordar absolutamente todo después de morir.",
      b: "Regresar para vengarte de quien te mató o continuar el conflicto usando información previa a tu muerte.",
      c: "Matar a un jugador sin utilizar armas.",
      d: "Reaparecer en el hospital y comenzar un rol diferente."
    }
  },
  q2: {
    correct: "c",
    options: {
      a: "Defenderte durante un robo correctamente iniciado.",
      b: "Reducir a una persona después de una amenaza clara.",
      c: "Golpear o matar a otro jugador sin motivo ni rol previo.",
      d: "Participar en un evento PvP anunciado por administración."
    }
  },
  q3: {
    correct: "a",
    options: {
      a: "Realizar acciones imposibles o forzar un resultado sin permitir reacción al otro jugador.",
      b: "Hablar fuera de personaje por un chat OOC.",
      c: "Usar información vista en Discord.",
      d: "Regresar al lugar donde moriste."
    }
  },
  q4: {
    correct: "d",
    options: {
      a: "NRE",
      b: "RK",
      c: "CJ",
      d: "MG (Metagaming)"
    }
  },
  q5: {
    correct: "b",
    options: {
      a: "Es válido porque el juego permite mover el vehículo.",
      b: "Debes interpretar el accidente; ignorarlo puede ser PG o falta de rol de entorno.",
      c: "Solo es sancionable si hay un policía mirando.",
      d: "Es únicamente RK."
    }
  },
  q6: {
    correct: "c",
    options: {
      a: "Continuar el tiroteo hasta que el administrador termine de escribir.",
      b: "Insultar al reportado para que admita lo ocurrido.",
      c: "Pausar el rol cuando se indique, explicar con calma y aportar pruebas sin mentir.",
      d: "Desconectarte para evitar una posible sanción."
    }
  },
  q7: {
    correct: "a",
    options: {
      a: "RK",
      b: "NRE",
      c: "Fear RP",
      d: "No existe infracción."
    }
  },
  q8: {
    correct: "d",
    options: {
      a: "MG",
      b: "CK",
      c: "RK",
      d: "NVL o falta de valoración de vida"
    }
  },
  q9: {
    correct: "b",
    options: {
      a: "IC es Discord y OOC es el chat local.",
      b: "IC pertenece al personaje y al mundo del rol; OOC pertenece al jugador fuera del personaje.",
      c: "Son exactamente lo mismo.",
      d: "OOC solo puede usarlo el dueño del servidor."
    }
  },
  q10: {
    correct: "c",
    options: {
      a: "Ignorarlo para evitar problemas internos.",
      b: "Borrar las pruebas y hablar con él en privado.",
      c: "Actuar con imparcialidad, documentar el caso y escalarlo según el protocolo.",
      d: "Sancionar al jugador que lo reportó."
    }
  }
};

let applications = [];
let activeApplicationId = null;

const listElement = document.getElementById("applicationsList");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const averageScore = document.getElementById("averageScore");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const exportBtn = document.getElementById("exportBtn");
const clearBtn = document.getElementById("clearBtn");
const logoutBtn = document.getElementById("logoutBtn");
const detailDialog = document.getElementById("detailDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMeta = document.getElementById("dialogMeta");
const dialogAnswers = document.getElementById("dialogAnswers");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");
const deleteBtn = document.getElementById("deleteBtn");

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

async function getApplications() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).getAll();

    request.onsuccess = () => {
      resolve(request.result.sort((a, b) => b.id - a.id));
    };

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
}

async function updateApplication(id, patch) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const application = request.result;

      if (!application) {
        reject(new Error("Solicitud no encontrada."));
        return;
      }

      store.put({ ...application, ...patch });
    };

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => reject(transaction.error);
  });
}

async function deleteApplication(id) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => reject(transaction.error);
  });
}

async function clearApplications() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).clear();

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => reject(transaction.error);
  });
}

function formatDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Fecha desconocida";
  }

  return new Intl.DateTimeFormat("es-DO", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function getAnswerDetails(answer) {
  if (answer.type !== "choice") {
    return {
      text: answer.answerText || answer.answer || "Sin respuesta",
      option: "",
      correctness: "manual"
    };
  }

  const selectedOption = String(answer.answer || "").toLowerCase();
  const catalogEntry = choiceCatalog[answer.id];
  const text = answer.answerText
    || catalogEntry?.options?.[selectedOption]
    || `Opción ${selectedOption.toUpperCase() || "desconocida"}`;

  const isCorrect = Boolean(
    catalogEntry && selectedOption === catalogEntry.correct
  );

  return {
    text,
    option: selectedOption.toUpperCase(),
    correctness: isCorrect ? "correct" : "incorrect"
  };
}

function getScoreData(application) {
  const choiceAnswers = Array.isArray(application.answers)
    ? application.answers.filter((answer) => answer.type === "choice")
    : [];

  const maxScore = Object.keys(choiceCatalog).length;
  const score = choiceAnswers.reduce((total, answer) => {
    const catalogEntry = choiceCatalog[answer.id];
    const selectedOption = String(answer.answer || "").toLowerCase();

    return total + (
      catalogEntry && selectedOption === catalogEntry.correct
        ? 1
        : 0
    );
  }, 0);

  return {
    score,
    maxScore,
    percentage: maxScore
      ? Math.round((score / maxScore) * 100)
      : 0
  };
}

function updateStats(rows) {
  totalCount.textContent = rows.length;
  pendingCount.textContent = rows.filter(
    (row) => row.status === "Pendiente"
  ).length;

  const average = rows.length
    ? Math.round(
        rows.reduce(
          (sum, row) => sum + getScoreData(row).percentage,
          0
        ) / rows.length
      )
    : 0;

  averageScore.textContent = `${average}%`;
}

function filteredApplications() {
  const search = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;

  return applications.filter((application) => {
    const matchesSearch = !search
      || String(application.discord || "").toLowerCase().includes(search);

    const matchesStatus = status === "all"
      || application.status === status;

    return matchesSearch && matchesStatus;
  });
}

function renderApplications() {
  const rows = filteredApplications();
  updateStats(applications);

  if (!rows.length) {
    listElement.innerHTML = `
      <div class="empty-state">
        No hay solicitudes que coincidan con los filtros actuales.
      </div>
    `;
    return;
  }

  listElement.innerHTML = rows.map((application) => {
    const scoreData = getScoreData(application);

    return `
      <article class="application-card">
        <div class="application-main">
          <strong>${escapeHtml(application.discord)}</strong>
          <span>
            Solicitud #${application.id} ·
            ${escapeHtml(formatDate(application.createdAt))}
          </span>
        </div>

        <div class="application-data">
          <strong>${scoreData.score}/${scoreData.maxScore}</strong>
          <span>Resultado automático: ${scoreData.percentage}%</span>
        </div>

        <div>
          <span class="status ${escapeHtml(application.status)}">
            ${escapeHtml(application.status)}
          </span>
        </div>

        <button
          class="button ghost open-detail"
          type="button"
          data-id="${application.id}"
        >
          Ver respuestas
        </button>
      </article>
    `;
  }).join("");

  listElement.querySelectorAll(".open-detail").forEach((button) => {
    button.addEventListener("click", () => {
      openApplication(Number(button.dataset.id));
    });
  });
}

function openApplication(id) {
  const application = applications.find((item) => item.id === id);

  if (!application) {
    return;
  }

  const scoreData = getScoreData(application);
  activeApplicationId = id;
  dialogTitle.textContent = application.discord;

  dialogMeta.innerHTML = `
    <span class="meta-chip">Solicitud #${application.id}</span>
    <span class="meta-chip">
      ${escapeHtml(formatDate(application.createdAt))}
    </span>
    <span class="meta-chip">
      Resultado: ${scoreData.score}/${scoreData.maxScore}
      (${scoreData.percentage}%)
    </span>
    <span class="meta-chip">
      Estado: ${escapeHtml(application.status)}
    </span>
  `;

  dialogAnswers.innerHTML = application.answers.map((answer, index) => {
    const details = getAnswerDetails(answer);
    const badge = details.correctness === "manual"
      ? '<span class="answer-badge manual">Revisión manual</span>'
      : details.correctness === "correct"
        ? '<span class="answer-badge correct">Correcta</span>'
        : '<span class="answer-badge incorrect">Incorrecta</span>';

    return `
      <article class="answer-card ${details.correctness}">
        <div class="answer-heading">
          <h3>${index + 1}. ${escapeHtml(answer.question)}</h3>
          ${badge}
        </div>

        ${details.option
          ? `<span class="selected-option">
              Opción ${escapeHtml(details.option)}
            </span>`
          : ""}

        <p>${escapeHtml(details.text)}</p>
      </article>
    `;
  }).join("");

  detailDialog.showModal();
}

async function changeStatus(status) {
  if (!activeApplicationId) {
    return;
  }

  await updateApplication(activeApplicationId, { status });
  detailDialog.close();
  await loadApplications();
}

async function loadApplications() {
  try {
    applications = await getApplications();
    renderApplications();
  } catch (error) {
    console.error(error);
    listElement.innerHTML = `
      <div class="empty-state">
        No se pudo abrir la base de datos local del navegador.
      </div>
    `;
  }
}

searchInput.addEventListener("input", renderApplications);
statusFilter.addEventListener("change", renderApplications);

closeDialogBtn.addEventListener("click", () => detailDialog.close());

detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) {
    detailDialog.close();
  }
});

acceptBtn.addEventListener("click", () => {
  changeStatus("Aceptado");
});

rejectBtn.addEventListener("click", () => {
  changeStatus("Rechazado");
});

deleteBtn.addEventListener("click", async () => {
  if (!activeApplicationId) {
    return;
  }

  const confirmed = confirm(
    "¿Seguro que deseas eliminar esta solicitud?"
  );

  if (!confirmed) {
    return;
  }

  await deleteApplication(activeApplicationId);
  detailDialog.close();
  await loadApplications();
});

clearBtn.addEventListener("click", async () => {
  const confirmed = confirm(
    "Esto eliminará todas las solicitudes guardadas en este navegador. ¿Continuar?"
  );

  if (!confirmed) {
    return;
  }

  await clearApplications();
  await loadApplications();
});

exportBtn.addEventListener("click", () => {
  const exportData = applications.map((application) => ({
    ...application,
    automaticResult: getScoreData(application)
  }));

  const blob = new Blob(
    [JSON.stringify(exportData, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download =
    `cruza2-solicitudes-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cruza2_admin_auth");
  sessionStorage.removeItem("cruza2_admin_auth_time");
  window.location.replace("login.html");
});

loadApplications();
