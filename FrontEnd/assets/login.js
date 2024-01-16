const btnConnexion = document.getElementById("btn-connexion");

btnConnexion.addEventListener("click" , async (event) => {
    event.preventDefault();
    const  email = document.getElementById('email').value;
    const  password = document.getElementById('password').value;
    console.log(email, "ok");
    console.log(password, "ok");
    const r = await fetch('http://localhost:5678/api/users/login',{
        method: "POST" ,
        headers: {   
            'Content-Type':'application/json'
        },
        body : JSON.stringify({email,password})
    });

    const passwordAndEmail = await r.json();
    console.log(passwordAndEmail, "ok");
    
});