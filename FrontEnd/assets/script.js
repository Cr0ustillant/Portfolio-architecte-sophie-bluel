async function works(){

    const r = await fetch('http://localhost:5678/api/works');
    const travaux = await r.json();
    console.log(travaux);
    const gallery = document.querySelector(".gallery");
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

works();

