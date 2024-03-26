            // CONFIGURATION MODAL

const modal = document.querySelector("aside");
           
const closeIcone = document.querySelectorAll(".js-modal-close")
const openModal = function (event) {
  event.preventDefault();
  modal.style.display = "flex";
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      resetModal()
    } 
  }
  closeIcone.forEach(icone => {
    icone.addEventListener("click", closeModal);
  });
};

const closeModal = function (event) {
  event.preventDefault();
  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  resetModal();
};

const elementJsModal = document.querySelector(".btn-js-modal");

elementJsModal.addEventListener("click", openModal);

function resetModal() {
  const errorMessage = document.querySelector(".error-msg")
  if (errorMessage.style.display = "block") {
      errorMessage.style.display = "none";
  }
  let imgPreview = document.querySelector(".img-preview"); 
  if (imgPreview !== null) {
    document.querySelector(".img-preview").remove(imgPreview);
    document.querySelector(".img-container").style.display = "flex" 
    document.querySelector(".container-preview-img").style.display = "none"
  }
}

const arrowBack = document.querySelector(".fa-arrow-left")

arrowBack.onclick = function (event) {
    event.preventDefault()
    document.querySelector(".modal-add-project").style.display = "none";
    document.querySelector(".modal-wrapper").style.display = "flex";
    resetModal();
}

// SUPPRIMER UN PROJET

let trashIcones = document.querySelectorAll(".fa-trash-can");
const project = document.querySelector(".fig-container figure");
const token = localStorage.getItem("token");

async function removeProject(projectId) {
  const responj = await fetch(`http://localhost:5678/api/works/${projectId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  console.log(responj);
  // reponse à traiter  
  document.getElementById("vignette" + projectId).remove();
  document.getElementById("figure" + projectId).remove();
}

// AJOUTER UN PROJET (PREVIEW)
// (4mega max) 
const btnAddFile = document.querySelector("#btn-add-img")
btnAddFile.addEventListener("change", () => {

  const imgContainer = document.querySelector(".img-container");
  
  const img = document.createElement("img");
  img.classList.add("img-preview");
  const file = btnAddFile.files[0];
  const url = URL.createObjectURL(file);
  img.setAttribute("src", url);
  const preview = document.querySelector(".container-preview-img");
  preview.style.display = "flex";
  preview.appendChild(img);
  if (btnAddFile.value !== null) {
      imgContainer.style.display = "none";
  }
});

    // Redirection => modale ajout projet

const btnAdd = document.querySelector(".modal-wrapper button");

btnAdd.onclick = function (event) {
  document.querySelector(".modal-wrapper").style.display = "none";
  document.querySelector(".modal-add-project").style.display = "flex";
};

const btnSubmitWork = document.querySelector("#btn-submit-work");

btnSubmitWork.onclick = function (event) {
  event.preventDefault();

  const projectTitle = document.querySelector("#title")
  const imgPreview = document.querySelector(".img-preview") 
  const errorMessage = document.querySelector(".error-msg")

  if (imgPreview == null) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Aucun fichier";
  } else {
    const file = btnAddFile.files[0];
    const fileSize = file.size; // Taille du fichier en octets
    const maxSize = 4 * 1024 * 1024; // Taille maximale autorisée en octets (4 Mo)
    const fileName = file.name.toLowerCase();  // Format du fichier
    
  // Vérifier la taille du fichier
        if (!(fileName.endsWith(".jpg") || fileName.endsWith(".png")) || fileSize >= maxSize) {
          document.querySelector(".add-img").insertAdjacentElement("afterend",errorMessage)
          errorMessage.style.display = "block";
          errorMessage.innerHTML = "Taille du fichier trop volumineuse ou format incorrect";
        } else {
          if (projectTitle.value == "") {
            document.getElementById("title").insertAdjacentElement("beforebegin",errorMessage)
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "Aucun titre";                  
          } else {
            addProject();
          }
        }
  }
}

async function addProject() {
  const formData = new FormData();
  formData.append("image", btnAddFile.files[0]);
  const projectTitle = document.querySelector("#title");
  formData.append("title", projectTitle.value);
  const projectCategory = document.querySelector("#categorie");
  formData.append("category", projectCategory.value);

  const r = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "accept": "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
  });

  const objectAdded = await r.json()
  console.log(objectAdded)

  const figureBaliseModal = document.createElement("figure");
  const imgBaliseModal = document.createElement("img"); 
  const figContainerModal = document.querySelector(".fig-container")

  figContainerModal.appendChild(figureBaliseModal);
  figureBaliseModal.appendChild(imgBaliseModal);

  imgBaliseModal.src = objectAdded.imageUrl;
  imgBaliseModal.alt = objectAdded.title;
  figureBaliseModal.className = objectAdded.categoryId;
  figureBaliseModal.id = "vignette"+objectAdded.id;

  const trashIcone = document.createElement("i")
  trashIcone.setAttribute("class","fa-solid fa-trash-can")
  figureBaliseModal.appendChild(trashIcone)
  figureBaliseModal.style.position = "relative"
  trashIcone.classList.add(objectAdded.id)
  trashIcone.id = objectAdded.id;

  trashIcone.onclick = function(event) {
    removeProject(objectAdded.id)
  }
  const figureBalise = document.createElement("figure");
  const imgBalise = document.createElement("img");
  const figcaptionBalise = document.createElement("figcaption");

  gallery.appendChild(figureBalise);

  figureBalise.appendChild(imgBalise);
  figureBalise.appendChild(figcaptionBalise);

  imgBalise.src = objectAdded.imageUrl;
  imgBalise.alt = objectAdded.title;
  figcaptionBalise.innerHTML = objectAdded.title;
  figureBalise.className = objectAdded.categoryId;
  figureBalise.id = "figure"+objectAdded.id;
  console.log(r.json);
  document.querySelector(".modal-wrapper").style.display = "flex";
  document.querySelector(".modal-add-project").style.display = "none";
  resetModal()
}