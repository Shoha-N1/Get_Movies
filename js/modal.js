document.addEventListener("click", (evt) => {

    onModalButtonClick(evt)
    onModalOutsideClick(evt)
    onModalCLoseClick(evt)
})


function onModalCLoseClick(evt) {
    let el = evt.target.closest("[data-modal-close]")

    if(!el) return;

    el.parentElement.parentElement.classList.remove("show")
}


function onModalButtonClick(evt) {

    let el = evt.target.closest("[data-modal-open]")

    if(!el) return;

    let modalSelector = el.dataset.modalOpen;

    document.querySelector(modalSelector).classList.add("show")
}


function onModalOutsideClick(evt) {
    let el = evt.target;

    if(!el.matches("[data-modal]")) return;

    el.classList.remove("show")
}

