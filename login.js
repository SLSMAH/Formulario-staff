const config = window.CRUZA2_CONFIG;
const params = new URLSearchParams(location.search);
const requestedRole = params.get("role") || "staff";

const roleInfo = {
  staff: ["Jefatura de Staff", "Acceso exclusivo a las postulaciones de Staff."],
  police: ["Jefatura Policial", "Acceso exclusivo a las postulaciones del Departamento de Policía."],
  mechanic: ["Jefatura Mecánica", "Acceso exclusivo a las postulaciones del Taller Mecánico."],
  ems: ["Jefatura 911 / EMS", "Acceso exclusivo a las postulaciones médicas."],
  admin: ["Administración general", "Acceso global a formularios, actividad y control de IP."]
};

if (!roleInfo[requestedRole]) location.replace("access.html");

document.getElementById("roleChip").textContent = roleInfo[requestedRole][0].toUpperCase();
document.getElementById("loginTitle").textContent = roleInfo[requestedRole][0];
document.getElementById("loginDescription").textContent = roleInfo[requestedRole][1];

const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("loginMessage");
const button = document.getElementById("loginButton");
const toggle = document.getElementById("togglePassword");

function apiUrl(path) {
  const base = String(config?.API_BASE_URL || "").trim();

  if (!base || base.includes("TU-WORKER") || base.includes("TU-USUARIO")) {
    throw new Error(
      "La API todavía no está conectada. Debes desplegar el Cloudflare Worker y pegar su URL en frontend/config.js."
    );
  }

  return `${base.replace(/\/$/, "")}${path}`;
}

toggle.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  toggle.textContent = password.type === "password" ? "Ver" : "Ocultar";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  message.textContent = "Verificando acceso...";

  try {
    const response = await fetch(apiUrl("/api/login"), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        role: requestedRole,
        username: username.value.trim(),
        password: password.value
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Acceso denegado.");

    sessionStorage.setItem("cruza2_session", JSON.stringify({
      token: data.token,
      role: data.role,
      username: data.username,
      expiresAt: data.expiresAt
    }));
    location.replace("panel.html");
  } catch (error) {
    const isNetworkError =
      error instanceof TypeError ||
      /failed to fetch|networkerror|load failed/i.test(String(error?.message || ""));

    message.textContent = isNetworkError
      ? "No se pudo conectar con la API. Revisa la URL del Worker en config.js, que el Worker esté desplegado y que FRONTEND_ORIGIN permita tu GitHub Pages."
      : error.message;

    password.value = "";
    button.disabled = false;
  }
});
