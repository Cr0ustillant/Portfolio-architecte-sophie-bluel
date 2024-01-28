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
    } else {
      console.log("erreur Id");
    }
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
    }
  
  async  function verificationEmail(email){
      let emailRegExp = new RegExp("[a-z]+\\.[a-z]+@[a-z]+\\.[a-z]+")
      if (!emailRegExp.test(email.value) || email.value !== user[email.value]) {
          emailBalise.classList.add("error")
          console.log("Email incorrecte!")
    
          pErrorEmail.innerHTML = "Email incorrecte!"
          pErrorEmail.style.color = "red"
  }
}

  async  function verificationPassword(password){
      if (password.value == "" || password.value !== user[password.value]) {
          passwordBalise.classList.add("error")
          console.log("mot de passe incorrect")
          pErrorPassword.innerHTML = "mot de passe incorrecte!"
          pErrorPassword.style.color = "red"
      } else {
        pErrorPassword.classList.remove("error")
        pErrorPassword.innerHTML = ""
      }
  }   
  
  
});


