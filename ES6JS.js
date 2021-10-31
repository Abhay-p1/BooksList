class Book {
    constructor(title, author, isbn) {
        this.Title = title;
        this.Author = author;
        this.Isbn = isbn;
    }
}
class UI {
    addBookToList(Bookobj) {
        const list = document.getElementById('book-list');
        const Trrow = document.createElement('tr');
        // Insert cols 
        Trrow.innerHTML = `
        <td class="Title">${Bookobj.Title}</td>
        <td class="Author">${Bookobj.Author}</td>    
        <td class="Isbn">${Bookobj.Isbn}</td>  
        <td class="cross"><a href = "#" class = "delete"> ❌  </a></td >`;
        list.appendChild(Trrow);
    }
    showAlert(msg, classname) {
        const divele = document.createElement('div');
        divele.className = `alert ${classname}`;
        divele.appendChild(document.createTextNode(msg));
        // Get parent
        const containerpar = document.querySelector('.container');
        const formele = document.querySelector('#book-form');
        containerpar.insertBefore(divele, formele);
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    clearfields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    DeleteBook(targetele) {
        if (targetele.className === 'delete') {
            targetele.parentElement.parentElement.remove(); // that tr removed 
        }
    }
}
class LocalStore {
    static GetBooks() {
        let Arrbooks;
        if (localStorage.getItem('Arrbooks') == null)
            Arrbooks = [];
        else {
            Arrbooks = JSON.parse(localStorage.getItem('Arrbooks'));
        }
        return Arrbooks;
    }
    static DisplayBooks() {
        const Arrbooks = LocalStore.GetBooks();
        Arrbooks.forEach(function(book) { //books ,add them to UI
            const UIobj = new UI();
            UIobj.addBookToList(book);
        });
    }
    static AddBook(newbook) {
        const Arrbooks = LocalStore.GetBooks();
        Arrbooks.push(newbook);
        localStorage.setItem('Arrbooks', JSON.stringify(Arrbooks)); // stringified Array of bookobjects
    }
    static RemoveBook(isbnval) {
        const Arrbooks = LocalStore.GetBooks();
        Arrbooks.forEach(function(book, index) {
            if (book.Isbn === isbnval) {
                Arrbooks.splice(index, 1);
            }
        });
        // Reset Local storage
        localStorage.setItem('Arrbooks', JSON.stringify(Arrbooks)); // stringified Array of bookobjects
    }
}


// Event Listeners

// DOM Load Event
document.addEventListener('DOMContentLoaded', LocalStore.DisplayBooks());

// For adding book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get Form Values
    const tleval = document.getElementById('title').value;
    const authval = document.getElementById('author').value;
    const isbnval = document.getElementById('isbn').value;

    // Instantiate book
    const NewBook = new Book(tleval, authval, isbnval);

    // Instantiate UI
    const UIobj = new UI();

    // Is valid ?
    if (tleval === '' || authval === '' || isbnval === '') {
        // Error Alert
        UIobj.showAlert('Please Fill All the Details 🖊', 'error'); // Msg and error class styled

    } else {
        // Now we have to add book to table using UI object
        UIobj.addBookToList(NewBook); // passing out Book object 

        // Add to LS
        LocalStore.AddBook(NewBook);

        UIobj.showAlert('Book Added Successfully 📗 !!', 'success');
        // clear fields
        UIobj.clearfields();
    }

    e.preventDefault();
});

// Event Listener for delete :
document.getElementById('book-list').addEventListener('click', function(e) {

    // Intantiate UI 
    const ObjUI = new UI();
    ObjUI.DeleteBook(e.target);
    // Remove from Ls also
    LocalStore.RemoveBook(e.target.parentElement.previousElementSibling.textContent);
    ObjUI.showAlert('Book Removed 📕 !!', 'success');
    e.preventDefault();
});