(async () => {
  const response = await fetch("http://localhost:4000/session", {
    method: "GET",
    credentials: "include",
  });

  console.log({ response });

  if (response.ok) {
    const data = await response.json();
    document.getElementById("user-name").innerText = data.user.username;
  } else {
    window.location.href = "index.html";
  }
})();

document.getElementById("logout").addEventListener("click", async () => {
  const response = await fetch("http://localhost:4000/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error al cerrar sesión");
  } else {
    window.location.href = "index.html";
  }
});
