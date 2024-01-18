const btnConnexion = document.getElementById("btn-connexion");

async function login() {
  btnConnexion.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, "ok");
    console.log(password, "ok");
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    });

    const passwordAndEmail = await r.json();
    console.log(passwordAndEmail, "ok");

    localStorage.setItem("token", "");
  });
}

// Vérification du champ de saisie

let emailValue = document.getElementById("email");
let passwordValue = document.getElementById("password");

function verification(balise) {
  if (balise.value === "") {
    balise.classList.add("error");
    alert("Error !!!");
  } else {
    balise.classList.remove("error");
    window.location.href = "/index.html";
  }
}

const form = document.querySelector("form");

btnConnexion.addEventListener("click", (event) => {
  event.preventDefault();
  verification(emailValue);
  verification(passwordValue);
  console.log(btnConnexion, "ok");
});

login();
