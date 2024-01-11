const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const buttonAll = document.createElement("button");
const btns = document.createElement("div");
btns.appendChild(buttonAll);
portfolio.appendChild(btns);
btns.className = 'btns';
buttonAll.innerHTML = "Tous";
gallery.insertAdjacentElement("beforebegin" , btns);

async function works() {
    const r = await fetch("http://localhost:5678/api/works");
    const listWorks = await r.json();
    console.log(listWorks);
    
    listWorks.forEach(element => {
        const figureBalise = document.createElement("figure");
        const imgBalise = document.createElement("img");
        const figcaptionBalise = document.createElement("figcaption");

        gallery.appendChild(figureBalise);
        figureBalise.appendChild(imgBalise);
        figureBalise.appendChild(figcaptionBalise);

        imgBalise.src = element.imageUrl;
        imgBalise.alt = element.title;
        figcaptionBalise.innerHTML = element.title;
        figureBalise.classList = element.category.name;
    }); 
}

async function categories() {
    const r = await fetch("http://localhost:5678/api/categories");
    const listCategories = await r.json();
    console.log(listCategories);
    const btns = document.querySelector(".btns");
    let figureBalise = document.querySelector("#gallery figure");
    listCategories.forEach(element => {
        const buttonBalise = document.createElement("button");
        btns.appendChild(buttonBalise);
        
        buttonBalise.innerHTML = element.name;
        buttonBalise.className = element.name;
        


        buttonBalise.addEventListener("click", function() {
            listCategories.forEach(element => {
                figureBalise.className == buttonBalise.className
            });
        });
    });
}

works();
categories();