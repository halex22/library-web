export default class Book {

  /**
   * 
   * @param {string} title 
   * @param {string} author 
   * @param {string} isbn 
   * @param {string} category 
   * @param {number} yop 
   */
  constructor(title, author, isbn, category, yop) {
    this.title = title
    this.author = author
    this.isbn = isbn
    this.category = category
    this.yop = yop
  }

  /**
   * 
   * @param {Book} otherBook 
   * @returns {number}
   */
  compareByTitle(otherBook){
    return this.title.localeCompare(otherBook.title)
  }

  /**
   * 
   * @param {book} otherBook 
   */
  compareByYob(otherBook) {
    return this.yop - otherBook.yop
  }

}