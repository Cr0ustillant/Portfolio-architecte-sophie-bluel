const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const buttonAll = document.createElement("button");
const btns = document.createElement("div");
btns.appendChild(buttonAll);
portfolio.appendChild(btns);
btns.className = "btns";
buttonAll.innerHTML = "Tous";
gallery.insertAdjacentElement("beforebegin", btns);

async function works() {
  const v = await fetch("http://localhost:5678/api/works");
  const listWorks = await v.json();
  console.log(listWorks);

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
    figureBalise.id = element.categoryId;
  });
}

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
  });

  buttonBalise = document.querySelectorAll(".btns button");

  buttonBalise.forEach((button) => {
    button.addEventListener("click", function comparaisonId() {
      let figures = document.querySelectorAll(".gallery figure");
      const choixUtilisateur = this.id;

      figures.forEach((figure) => {
        if (choixUtilisateur === figure.id) {
          figure.style.display = "block";
        } else if (choixUtilisateur === "") {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
        console.log(choixUtilisateur, "ok");
      });
    });
  });
}
works();
categories();
