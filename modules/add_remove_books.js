import { loadStorage, updateStorage } from './storeBooks.js';

const radix = 10;
export default class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static addBook(book) {
    const arr = loadStorage();
    arr.push(book);
    updateStorage(arr);
  }

  static removeBook(bookId) {
    const arr = loadStorage();
    const data = arr.filter((item) => item.id !== parseInt(bookId, radix));
    updateStorage(data);
  }
}