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
