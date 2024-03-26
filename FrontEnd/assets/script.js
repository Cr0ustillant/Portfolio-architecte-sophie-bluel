const portfolio = document.querySelector("#portfolio");
const buttonAll = document.createElement("button");
const btns = document.createElement("div");
btns.appendChild(buttonAll);
portfolio.appendChild(btns);
const gallery = document.querySelector(".gallery");
btns.className = "btns";
buttonAll.innerHTML = "Tous";
buttonAll.classList.add("btn-style");
gallery.insertAdjacentElement("beforebegin", btns);
const modalWrapper = document.querySelector(".modal-wrapper")
const btnSelect = document.querySelector("#categorie")

                    // Liste des objets

async function works() {
  const v = await fetch("http://localhost:5678/api/works");
  const listWorks = await v.json();

  listWorks.forEach((element) => {
    const figureBalise = document.createElement("figure");
    const imgBalise = document.createElement("img");
    const figcaptionBalise = document.createElement("figcaption");
  
    gallery.appendChild(figureBalise);

    figureBalise.appendChild(imgBalise);
    figureBalise.appendChild(figcaptionBalise);

    imgBalise.src = element.imageUrl;
    imgBalise.alt = element.title;
    figcaptionBalise.innerHTML = element.title;
    figureBalise.className = element.categoryId;
    figureBalise.id = "figure"+element.id;


    const figureBaliseModal = document.createElement("figure");
    const imgBaliseModal = document.createElement("img"); 
    const figContainerModal = document.querySelector(".fig-container")

    figContainerModal.appendChild(figureBaliseModal);

    figureBaliseModal.appendChild(imgBaliseModal);

    imgBaliseModal.src = element.imageUrl;
    imgBaliseModal.alt = element.title;
    figureBaliseModal.className = element.categoryId;
    figureBaliseModal.id = "vignette"+element.id;

    const trashIcone = document.createElement("i")
    trashIcone.setAttribute("class","fa-solid fa-trash-can")
    figureBaliseModal.appendChild(trashIcone)
    figureBaliseModal.style.position = "relative"
    trashIcone.classList.add(element.id)
    trashIcone.id = element.id;

    trashIcone.onclick = function(event) {
      removeProject(element.id)
      // console.log("supression", element.id)
    }
  });
  listWorks => listWorks.name;
}

                  // Liste des categories

async function categories() {
  const r = await fetch("http://localhost:5678/api/categories");
  const listCategories = await r.json();

  console.log(listCategories);

  const btns = document.querySelector(".btns");

  listCategories.forEach((element) => {
    const buttonBalise = document.createElement("button");
    btns.appendChild(buttonBalise);
    buttonBalise.innerHTML = element.name;
    buttonBalise.id = element.id;
    buttonBalise.className = "btn-style";

    const categorieOption = document.createElement("option")
    btnSelect.appendChild(categorieOption)
    categorieOption.innerHTML = element.name
    categorieOption.value = element.id

  });

  buttonBalise = document.querySelectorAll(".btns button");

                      // Fonction de filtrage 

  buttonBalise.forEach((button) => {
    button.addEventListener("click", function() {
      const userChoice = this.id;

      const buttonBalise = document.querySelectorAll(".btns button");

      buttonBalise.forEach(button => {
        button.classList.remove("btn-style-selected");
      });

      this.classList.add("btn-style-selected");

      const figures = document.querySelectorAll(".gallery figure");
      figures.forEach((figure) => {

        if (userChoice === figure.className || userChoice === "") {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
        console.log(userChoice, "ok");
      });
    });
  });
}

                  // A l'ouverture de la page

window.onload = function() {
  buttonAll.classList.add("btn-style-selected");
  buttonAll.style.outline = "none";

  works();
  categories();
  logged()
}

                  // Connecté/Déconnecté

function logged() {
  const token = localStorage.getItem("token");
  const liLogin = document.getElementById("login")
  console.log(token)

  if (token !== null) {
    document.querySelector(".btn-js-modal").style.visibility = "visible"
    document.querySelector(".btns").style.display = "none"
    document.querySelector(".edit-mode").style.display = "flex"
    liLogin.innerHTML = "logout"
    liLogin.style.fontWeight = "bold"
    liLogin.onclick = function() {
      localStorage.removeItem("token","")
      liLogin.href = "index.html"
    }
  } else {
    document.querySelector(".btn-js-modal").style.visibility = "hidden"
  }
}
