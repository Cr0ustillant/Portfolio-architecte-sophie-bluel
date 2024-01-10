const gallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const btns = document.createElement("div");
btns.className = 'btns';
const buttonAll = document.createElement("button");
portfolio.appendChild(btns);
btns.appendChild(buttonAll);
buttonAll.innerHTML = "Tous";
gallery.insertAdjacentElement("beforebegin" , btns);

async function works(){

    const r = await fetch("http://localhost:5678/api/works");
    const travaux = await r.json();
    console.log(travaux);

    travaux.forEach(element => {
        
        const figureBalise = document.createElement("figure");
        const imgBalise = document.createElement("img");
        const figcaptionBalise = document.createElement("figcaption");

        gallery.appendChild(figureBalise);
        figureBalise.appendChild(imgBalise);
        figureBalise.appendChild(figcaptionBalise);

        imgBalise.src = element.imageUrl;
        imgBalise.alt = element.title;
        figcaptionBalise.innerHTML = element.title;
    }); 
}

async function categories(){

    const r = await  fetch ("http://localhost:5678/api/categories");
    const travaux = await r.json();
    console.log(travaux);
    const btns = document.querySelector(".btns");

    travaux.forEach(element => {

        const buttonBalise = document.createElement("button");

        btns.appendChild(buttonBalise);
            
        buttonBalise.innerHTML = element.name;
    })
} 

categories();
works();


