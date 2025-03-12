import HtmlCreator from "./services/html-service.js";
import DataService from "./services/data-service.js";
import Book from "./models/books.js";

const service = new DataService()
const categorySelector = document.getElementById('categorySelect')
const titleR = document.getElementById('titleR')
const yobR = document.getElementById('yobR')


const categories = ['Fantasy',
  'Distopia',
  'Romanzo',
  'Storico',
  'Giallo',
  'Avventura',
  'Thriller',
  'Fiaba',
  'Biografia']

const rootDiv = document.getElementById('root')

let currentFilter

// initial rendering



/**
 * Creates a book html representation 
 * @param {Book} bookData 
 */
function createBook(bookData) {
  const bookContainer = document.createElement('div')
  bookContainer.classList.add('book-container')

  const svgDiv = HtmlCreator.addSvgBook()

  const innerDiv = document.createElement('div')
  const bookName = HtmlCreator.createElement('h3', bookData.title)
  const bookAuthor = HtmlCreator.createElement('p', 'by' + bookData.author)
  const bookYob = HtmlCreator.createElement('p', 'First published: ' + bookData.yop)
  const bookCat = HtmlCreator.createElement('span', bookData.category, ['cat'])

  innerDiv.append(bookName, bookAuthor, bookYob, bookCat)

  bookContainer.append(svgDiv, innerDiv)
  return bookContainer
}

function render() {
  cleanUpRoot()
  let data = service.getBooksData()

  if (currentFilter !== 'Tutti') {
    data = data.filter(book => book.category === currentFilter)
  }

  data.forEach(book => rootDiv.appendChild(createBook(book)))
}

/**
 * 
 * @param {Book[]} data 
 */
function renderOrderByTitle() {
  cleanUpRoot()
  let data = service.getBooksData()

  if (currentFilter !== 'Tutti') {
    data = data.filter(book => book.category === currentFilter)
  }
  const sortedData = data.sort((b1, b2) => b1.compareByTitle(b2))

  render(sortedData)
}

/**
 * 
 * @param {Book[]} data 
 */
function renderOrderByYop() {
  cleanUpRoot()
  let data = service.getBooksData()

  if (currentFilter !== 'Tutti') {
    data = data.filter(book => book.category === currentFilter)
  }

  const sortedData = data.sort((b1, b2) => b1.compareByYob(b2))
  render(sortedData)
}


function cleanUpRoot() {rootDiv.innerHTML = ''}


function setUp() {
  currentFilter = categorySelector.value
  categories.forEach(cat => categorySelector.appendChild(HtmlCreator.createOptionElement(cat)))
}

function onFilterChange() {

  currentFilter = categorySelector.value

  if (titleR.checked) {
    renderOrderByTitle()
    return
  }
  if (yobR.checked) {
    renderOrderByYop()
    return
  }
  
  render()
}


setUp()
render()

window.renderOrderByTitle = renderOrderByTitle
window.renderOrderByYop = renderOrderByYop
window.onFilterChange = onFilterChange