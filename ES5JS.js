//ES5 OOPusing constructors and prototype methods

// Book constructor for creating book object
function Book(title, author, isbn) {
    this.Title = title;
    this.Author = author;
    this.Isbn = isbn;
}

// UI constructor for adding book to list , delete book , show alert
function UI() {}
UI.prototype.addBookToList = function(Bookobj) {
    const list = document.getElementById('book-list');
    const Trrow = document.createElement('tr');
    // Insert cols 
    Trrow.innerHTML = `
    <td>${Bookobj.Title}</td>
    <td>${Bookobj.Author}</td>    
    <td>${Bookobj.Isbn}</td>  
    <td><a href = "#" class = "delete"> X </a></td >`;
    list.appendChild(Trrow);
}
UI.prototype.showAlert = function(msg, classname) {
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
UI.prototype.clearfields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.DeleteBook = function(targetele) {
    if (targetele.className === 'delete') {
        targetele.parentElement.parentElement.remove(); // that tr removed 
    }
}


// Event Listeners

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
        UIobj.showAlert('Please Fill All the Details', 'error'); // Msg and error class styled

    } else {
        // Now we have to add book to table using UI object
        UIobj.addBookToList(NewBook); // passing out Book object 
        UIobj.showAlert('Book Added Successfully !!', 'success');
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
    ObjUI.showAlert('Book Removed!!', 'success');
    e.preventDefault();
});