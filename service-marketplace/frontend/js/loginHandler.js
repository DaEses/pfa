document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = form.email.value;
      const password = form.password.value;
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Connexion réussie !");
          // tu peux stocker le token, rediriger, etc.
          localStorage.setItem("token", data.token);
          window.location.href = "services.html";
        } else {
          alert("Erreur : " + data.message);
        }
      } catch (err) {
        alert("Erreur réseau !");
        console.error(err);
      }
    });
  });
  