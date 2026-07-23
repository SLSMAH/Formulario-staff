const AUTH_KEY = "cruza2_admin_auth";
const AUTH_TIME_KEY = "cruza2_admin_auth_time";
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;

// Se guardan hashes, no las credenciales en texto visible.
const USER_HASH = "e3655757c8d52c62e8fd74fec8ad16ba7957a5c4ec8101b7bdc5d6e39dcd6439";
const PASSWORD_HASH = "cbfad02f9ed2a8d1e08d8f74f5303e9eb93637d47f82ab6f1c15871cf8dd0481";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginError = document.getElementById("loginError");
const loginButton = document.getElementById("loginButton");

function hasValidSession() {
  const authenticated = sessionStorage.getItem(AUTH_KEY) === "true";
  const authenticatedAt = Number(sessionStorage.getItem(AUTH_TIME_KEY) || 0);
  return authenticated && Date.now() - authenticatedAt < SESSION_DURATION_MS;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

if (hasValidSession()) {
  window.location.replace("admin.html");
}

togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";
  passwordInput.type = showing ? "password" : "text";
  togglePassword.textContent = showing ? "Ver" : "Ocultar";
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.textContent = "";

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    loginError.textContent = "Completa el usuario y la contraseña.";
    return;
  }

  loginButton.disabled = true;
  loginButton.querySelector("span").textContent = "Verificando...";

  try {
    const [usernameHash, passwordHash] = await Promise.all([
      sha256(username),
      sha256(password)
    ]);

    if (usernameHash === USER_HASH && passwordHash === PASSWORD_HASH) {
      sessionStorage.setItem(AUTH_KEY, "true");
      sessionStorage.setItem(AUTH_TIME_KEY, String(Date.now()));
      window.location.replace("admin.html");
      return;
    }

    loginError.textContent = "Usuario o contraseña incorrectos.";
    passwordInput.value = "";
    passwordInput.focus();
  } catch (error) {
    console.error(error);
    loginError.textContent = "El navegador no pudo verificar las credenciales.";
  } finally {
    loginButton.disabled = false;
    loginButton.querySelector("span").textContent = "Entrar al panel";
  }
});
