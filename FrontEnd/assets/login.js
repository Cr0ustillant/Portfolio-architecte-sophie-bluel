const btnConnexion = document.getElementById("btn-connexion");

const emailBalise = document.getElementById("email");
const passwordBalise = document.getElementById("password");

const form = document.querySelector("form");

const pErrorEmail = document.createElement("p");
const pErrorPassword = document.createElement("p");

const labelEmail = document.querySelector("label[for='email']");
const labelpassword = document.querySelector("label[for='password']");

labelEmail.appendChild(pErrorEmail);
labelpassword.appendChild(pErrorPassword);

async function login() {
  let user = {
    email: emailBalise.value,
    password: passwordBalise.value
  }
  btnConnexion.addEventListener("click", async (event) => {
    event.preventDefault();
    const r = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user)
    });
  })
  if (r.ok) {
    const userData = await response.json();
    if (userData.token) {
      localStorage.setItem("userId" , userData.userId);
      localStorage.setItem("token" , userData.token);
      window.location.href = "index.html";
    } else {
      console.log("erreur Id");
    }
  }   if (verificationEmail(email) && 
      verificationPassword(password)) {
      login();
  }
}

btnConnexion.addEventListener("click", (event) => {
  event.preventDefault();                


});


function verificationEmail(email){
    let emailRegExp = new RegExp("[a-z]+\\.[a-z]+@[a-z]+\\.[a-z]+")
    if (!emailRegExp.test(email.value)) {
        emailBalise.classList.add("error")
        console.log("Email incorrecte!")
  
        pErrorEmail.innerHTML = "Email incorrecte!"
        pErrorEmail.style.color = "red"
}}

function verificationPassword(password){
    if (password.value.length < 8) {
        passwordBalise.classList.add("error")
        console.log("mot de passe incorrect")
        pErrorPassword.innerHTML = "mot de passe incorrecte!"
        pErrorPassword.style.color = "red"
    } else {console.log(passwordBalise.value ,"pass")}
}