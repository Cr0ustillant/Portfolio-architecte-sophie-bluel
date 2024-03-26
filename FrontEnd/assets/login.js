const btnConnexion = document.getElementById("btn-connexion");

const emailBalise = document.getElementById("email");
const passwordBalise = document.getElementById("password");

const form = document.querySelector("form");

const labelEmail = document.querySelector("label[for='email']");


async function login() {
  let user = {
    email: emailBalise.value,
    password: passwordBalise.value
  }
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user)
    });
  if (r.ok) {
    const userData = await r.json();
    if (userData.token) {
      localStorage.setItem("userId" , userData.userId);
      localStorage.setItem("token" , userData.token);
      window.location.href = "index.html";
    }
  } else {
    const errorMsg = document.querySelector(".error-msg")
    errorMsg.style.display = "block"
    errorMsg.innerHTML = "Email/Mot de passe incorrect"
  }   
}

btnConnexion.addEventListener("click", async (event) => {
  event.preventDefault();
  
  let user = {
    email: emailBalise.value,
    password: passwordBalise.value
  }

  if (verificationPassword(password) && 
      verificationEmail(email)) {
      login();
    } else {
      alert("Couple email/mot de passe incorrecte")
      console.log("chaussure")
    };
  
  async  function verificationEmail(email){
      let emailRegExp = new RegExp("[a-z]+\\.[a-z]+@[a-z]+\\.[a-z]+")
      if (!emailRegExp.test(email.value) || email.value !== user[email.value]) {
  }
}

  async  function verificationPassword(password){
      if (password.value == "" || password.value !== user[password.value]) {
      }
  }  
});