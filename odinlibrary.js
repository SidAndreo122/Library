let bookCount = 3;

const library = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${haveRead}`;
    };
    this.changeReadStatus = function() {
        this.haveRead = this.haveRead === "true" ? "false" : "true";
    }
}

function addBookToLibrary(title, author, pages, read) {
    bookCount++;
    const book = new Book(title, author, pages, read);
    library.push(book);
    displayBooks(); // Update the entire list including new books
}

// Pre-load some books
addBookToLibrary("Game of Thrones", "George R.R. Martin", 5000, "true");
addBookToLibrary("Lord of the Rings", "J.R.R. Tolkien", 2000, "false");
addBookToLibrary("Dune", "Frank Herbert", 50000, "true");

function displayBooks() {
    const gridContainer = document.querySelector('.grid-book-container');
    gridContainer.innerHTML = ''; // Clear the grid for a fresh render
    library.forEach((book, index) => {
        appendBookToGrid(book, index);
    });
}

function appendBookToGrid(book, index) {
    const gridContainer = document.querySelector('.grid-book-container');
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-book');

    gridItem.innerHTML = `
        <div class="generated-container">
            <div class="page-number-container">
                <span class="generated-page-number">${book.pages} pages</span>
            </div>
            <div>
                <h1 class="generated-book-title">${book.title}</h1>
            </div>
            <div>
                <span class="generated-author-name">By: ${book.author}</span>
            </div>
            <div>
                <h2 class="generated-have-read" style="color: ${book.haveRead === "true" ? "green" : "red"}; cursor: pointer;">
                    <b>${book.haveRead === "true" ? "Has Read" : "Has Not Read"}</b>
                </h2>
            </div>
            <div>
                <button class="generated-delete-button" data-index="${index}">Delete</button>
            </div>
        </div>
    `;

    // Add the delete functionality
    const deleteBtn = gridItem.querySelector('.generated-delete-button');
    deleteBtn.addEventListener('click', () => {
        library.splice(index, 1); // Remove the book from the array
        displayBooks(); // Re-render the updated list
    });
    const readStatus = gridItem.querySelector('.generated-have-read');
    readStatus.addEventListener('click', () => {
        book.changeReadStatus();
        readStatus.textContent = book.haveRead === "true" ? "Has Read" : "Has Not Read";
        readStatus.style.color = book.haveRead === "true" ? "green" : "red";
    });

    gridContainer.appendChild(gridItem);
}

// Dialog and form handlers
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

submitDialog.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    read = read ? "true" : "false";

    addBookToLibrary(title, author, pages, read);

    dialog.close();
    resetDialog();
});

function resetDialog() {
    document.getElementById("addBookForm").reset();
}

// Initial display of books
displayBooks();
