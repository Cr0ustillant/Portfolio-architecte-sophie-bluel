const btnConnexion = document.getElementById("btn-connexion");

const email = document.getElementById("email");
const password = document.getElementById("password");

const form = document.querySelector("form");

const pErrorEmail = document.createElement("p");
const pErrorPassword = document.createElement("p");

const labelEmail = document.querySelector("label[for='email']");
const labelpassword = document.querySelector("label[for='password']");

labelEmail.appendChild(pErrorEmail);
labelpassword.appendChild(pErrorPassword);

btnConnexion.addEventListener("click", () => {
  let user = {
    email: email.value,
    password: password.value
  };
  console.log(user)
})

async function login() {
  btnConnexion.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    })

    const passwordAndEmail = await r.json();
    console.log(passwordAndEmail, "ok");

    localStorage.setItem("token", "");
    localStorage.getItem("token")
    console.log(localStorage,"bon")
  });
}

// Vérification du champ de saisie

          // EMAIL
          
function verificationEmail(balise) {
  let emailRegExp = new RegExp("[a-z]+\\.[a-z]+@[a-z]+\\.[a-z]+")
  if (emailRegExp.test(balise.value)) {
      console.log(emailRegExp, "emailRegExp : ok")
      balise.classList.remove("error")
      pErrorEmail.innerHTML = ""
  } else {
      balise.classList.add("error")
      console.log("wrong email")

      pErrorEmail.innerHTML = "Email incorrect!"
      pErrorEmail.style.color = "red"
  }
}

function verificationPassword(balise) {
  let passwordRegExp = new RegExp("[a-zA-Z0-9][a-z]+")
  if (passwordRegExp.test(balise.value)) {
      console.log(passwordRegExp ,"passwordRegExp : ok")
      balise.classList.remove("error")
      pErrorPassword.innerHTML = ""
  } else {
      balise.classList.add("error")
      console.log("wrong password")

      pErrorPassword.innerHTML = "Wrong password!"
      pErrorPassword.style.color = "red"
  }
}

 window.location.href = "index.html";


form.addEventListener("change", (event) => {
  event.preventDefault();
  verificationEmail(email);
  verificationPassword(password);
});

login();
