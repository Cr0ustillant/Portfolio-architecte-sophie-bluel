                // CONFIGURATION MODAL

const modal = document.querySelector("aside")

const openModal = function (event) {
    event.preventDefault()
    modal.style.visibility = "visible"
    // modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
};

const closeModal = function (event) {
    event.preventDefault()
    modal.style.visibility = "hidden"
    modal.removeEventListener("click", closeModal)
};

const elementJsModal = document.querySelectorAll(".btn-js-modal")

elementJsModal.forEach(element => {
    element.addEventListener("click",openModal)
});

let trashIcones = document.querySelectorAll(".fa-trash-can")
const project = document.querySelector(".fig-container figure")

                // SUPPRIMER UN PROJET

const token = localStorage.getItem("token");

async function removeProject(projectId) {
    const responj = await fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
        });
        console.log(responj)
        document.getElementById("vignette"+projectId).remove()
}

                // AJOUTER UN PROJET

    const btnAdd = document.querySelector(".modal-wrapper button")

    btnAdd.onclick = function(event) {
        document.querySelector(".modal-wrapper").style.display = "none"
        document.querySelector(".modal-add-project").style.display = "flex"

    }

    const titleSubmit = document.querySelector("#title")
    const categorieSubmit = document.querySelector("#categorie")
    const imgSubmit = document.querySelector(".add-img")
    const btnSubmitWork = document.querySelector("#btn-submit-work")

    const projectSubmit = [
        image ="",
        title ="",
        category ="",
    ]

    btnSubmitWork.onclick = function(event) {
        event.preventDefault()
        if ( imgSubmit !== "" && titleSubmit !== "" && categorieSubmit !== "") {
            // projectSubmit.image.value == imgSubmit.value
            // projectSubmit.title.value == titleSubmit.value
            // projectSubmit.category.value == categorieSubmit.value
            addProject()
            console.log(projectSubmit)
        } else  {
            
        }
    }

async function addProject(project) {

    const responj = await fetch('http://localhost:5678/api/works', {
    method: "POST",
    body:  JSON.stringify({
        image:"",
        title:"",
        category:"",
    }),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
    })
    console.log(responj.json)
}