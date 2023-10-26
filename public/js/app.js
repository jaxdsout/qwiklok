let show_modal = false
const newUserButton = document.querySelector("#add-user");
const newUserModal = document.querySelector("#newUserModal")
console.log(newUserButton)
newUserButton.addEventListener("click", event => {
    newUserModal.classList.remove("hidden");
})