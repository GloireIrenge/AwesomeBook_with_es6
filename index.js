import luxon from './modules/luxon.js';
import Book from './modules/add_remove_books.js';

import { loadStorage } from './modules/storeBooks.js';

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const submitButton = document.getElementById('submit');

const todayDate = document.getElementById('date');
const DTime = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED);

todayDate.innerHTML = DTime;
const addBook = (book) => {
  Book.addBook(book);
};

const removeBook = (bookId) => {
  Book.removeBook(bookId);
};

const renderBook = (book) => {
  const { title, author } = book;

  const renderContainer = document.createElement('tr');
  const tdTitle = document.createElement('td');
  const tdAuthor = document.createElement('td');
  const tdButton = document.createElement('td');
  tdButton.id = 'tdButton';
  const button = document.createElement('button');
  button.className = 'bg-danger text-light border-0 d-block';
  button.textContent = 'Delete';

  tdTitle.innerHTML = title;
  tdAuthor.innerHTML = author;

  tdButton.appendChild(button);
  renderContainer.appendChild(tdTitle);
  renderContainer.appendChild(tdAuthor);
  renderContainer.appendChild(tdButton);
  return renderContainer;
};

const DisplayBooks = () => {
  const container = document.getElementById('ctn-book');
  container.innerHTML = '';
  const storage = loadStorage();
  if (storage !== null) {
    storage.forEach((book) => {
      const child = renderBook(book);
      const button = child.children[2].firstChild;
      button.addEventListener('click', () => {
        removeBook(book.id);
        DisplayBooks();
      });
      container.appendChild(child);
    });
  }
};

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const id = Math.floor(Math.random() * 10000) + 1;
  const title = titleInput.value;
  const author = authorInput.value;
  const book = new Book(id, title, author);
  titleInput.value = '';
  authorInput.value = '';
  addBook(book);
  DisplayBooks();
});

const NavList = document.getElementById('Mylist');
const NavAdd = document.getElementById('AddBooks');
const NavContact = document.getElementById('Mycontact');

const bookListDiv = document.getElementById('list');
const formDiv = document.getElementById('form');
const contactDiv = document.getElementById('contact');

const constructListSection = () => {
  bookListDiv.style.display = 'block';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'none';

  DisplayBooks();
};

const constructFormSection = () => {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'block';
  contactDiv.style.display = 'none';
};

const constructContactSection = () => {
  bookListDiv.style.display = 'none';
  formDiv.style.display = 'none';
  contactDiv.style.display = 'block';
};

const section = (page) => {
  switch (page) {
    case 0:
      constructListSection();
      break;
    case 1:
      constructFormSection();
      break;
    case 2:
      constructContactSection();
      break;
    default:
      break;
  }
};

NavList.addEventListener('click', () => {
  section(0);
});

NavAdd.addEventListener('click', () => {
  section(1);
});

NavContact.addEventListener('click', () => {
  section(2);
});

section(0);
DisplayBooks();
