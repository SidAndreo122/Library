let bookCount = 3;

const library = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function() {
        return(`${title} by ${author}, ${pages}, ${haveRead}`)
    };

}

function addBooktoLibrary() {

}

const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("#addBook");
const closeDialog = document.querySelector("#closeBtn");
const submitDialog = document.querySelector("#submitBtn");

showDialog.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});