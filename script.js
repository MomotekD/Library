const Books = [];
const gridContainer = document.querySelector('.gridContainer')

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    Books.push(this);
}

const LOTR = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, true);

const Hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

document.querySelector('.bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#bookAuthor').value;
    const pages = document.querySelector('#bookPages').value;
    const read = document.querySelector('#bookRead').checked;
    
    const book = new Book(title, author, pages, read);

    document.querySelector('.bookForm').reset();
    showBooks();
})


function showBooks(){
    gridContainer.innerHTML = "";
    Books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        gridContainer.appendChild(bookCard);

        const bookCardText = document.createElement('div');
        bookCardText.classList.add('bookCardText');
        bookCard.appendChild(bookCardText);
        
        const title = document.createElement('h3');
        title.textContent = `Title: ${book.title}`;
        bookCardText.appendChild(title);
        
        const author = document.createElement('h3');
        author.textContent = `Author: ${book.author}`;
        bookCardText.appendChild(author);
        
        const pages = document.createElement('h3');
        pages.textContent = `Pages: ${book.pages}`;
        bookCardText.appendChild(pages);

        const wasReadLabel = document.createElement('label');
        wasReadLabel.textContent = "Read? ";
        wasReadLabel.setAttribute("for", "wasRead");
        bookCardText.appendChild(wasReadLabel);
    
        const wasRead = document.createElement('input');
        wasRead.checked = book.read;
        wasRead.setAttribute("id", "wasRead");
        wasRead.setAttribute("type", "checkbox");
        bookCardText.appendChild(wasRead);
        wasRead.addEventListener('change', (e) => {
            e.preventDefault;
            book.read = e.target.checked;
        });

        const bookCardButtons = document.createElement('div');
        bookCardButtons.classList.add('bookCardButtons');
        bookCard.appendChild(bookCardButtons);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('removeButton');
        bookCardButtons.appendChild(removeButton);

        removeButton.addEventListener('click', (e) => {
            e.preventDefault;
            const index = Books.findIndex(bookItem => bookItem.id === book.id);
            if(index !== -1){
            Books.splice(index, 1);
            showBooks();
            }
        });
    });
}

showBooks();
