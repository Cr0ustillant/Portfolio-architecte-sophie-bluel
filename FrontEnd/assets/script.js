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

                    // Liste des objets

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

  listWorks => listWorks.name;

}

                  // Liste des categories

async function category() {
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

        if (userChoice === figure.id || userChoice === "") {
          figure.style.display = "block";

        } else {
          figure.style.display = "none";
        }
        console.log(userChoice, "ok");
      });
    });
  });
}

// Test
window.onload = function() {
  buttonAll.classList.add("btn-style-selected");
  buttonAll.style.outline = "none";

  works();
  category();
}


