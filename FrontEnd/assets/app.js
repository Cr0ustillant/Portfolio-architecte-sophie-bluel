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

    // const projectSrc = 
    // const projectTitle =
    // const projectId =
    const btnAdd = document.querySelector(".modal-wrapper button")

    btnAdd.onclick = function(event) {
    console.log("hello")
        document.querySelector(".modal-wrapper").style.display = "none"
        document.querySelector(".modal-add-project").style.display = "flex"
    }

async function addProject(project) {
    const responj = await fetch('http://localhost:5678/api/works', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
    }
})
}