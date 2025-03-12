import HtmlCreator from "./services/html-service.js";
import DataService from "./services/data-service.js";
import Book from "./models/books.js";

const service = new DataService();
const categorySelector = document.getElementById('categorySelect');
const titleR = document.getElementById('titleR');
const yobR = document.getElementById('yobR');
const rootDiv = document.getElementById('root');

const categories = [
  'Fantasy', 'Distopia', 'Romanzo', 'Storico', 'Giallo', 
  'Avventura', 'Thriller', 'Fiaba', 'Biografia'
];

let currentFilter = 'Tutti';

// Fetch book data once and reuse it
let allBooksData = service.getBooksData();

/**
 * Creates a book HTML representation 
 * @param {Book} bookData 
 */
function createBook(bookData) {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');

  const svgDiv = HtmlCreator.addSvgBook();

  const innerDiv = document.createElement('div');
  const bookName = HtmlCreator.createElement('h3', bookData.title);
  const bookAuthor = HtmlCreator.createElement('p', `by ${bookData.author}`);
  const bookYob = HtmlCreator.createElement('p', `First published: ${bookData.yop}`);
  const bookCat = HtmlCreator.createElement('span', bookData.category, ['cat']);

  innerDiv.append(bookName, bookAuthor, bookYob, bookCat);
  bookContainer.append(svgDiv, innerDiv);

  return bookContainer;
}

/**
 * Filters and sorts books based on the selected criteria
 * @param {Book[]} data 
 * @returns {Book[]}
 */
function filterAndSortBooks(data) {
  let filteredData = currentFilter !== 'Tutti' 
    ? data.filter(book => book.category === currentFilter) 
    : [...data];

  if (titleR.checked) {
    filteredData.sort((b1, b2) => b1.compareByTitle(b2));
  } else if (yobR.checked) {
    filteredData.sort((b1, b2) => b1.compareByYob(b2));
  }
  console.log(filteredData, 'after filter')
  return filteredData;
}

/**
 * Renders books to the DOM
 * @param {Book[]} dataToRender
 */
// function render(dataToRender) {
//   cleanUpRoot();

//   let data = dataToRender ?? allBooksData;
//   data = filterAndSortBooks(data);

//   if (data.length === 0) {
//     rootDiv.innerHTML = '<p>No books available</p>';
//     return;
//   }

//   data.forEach(book => rootDiv.appendChild(createBook(book)));
// }

function render(dataToRender) {
  cleanUpRoot(); // Clears the existing books from the DOM

  let data = dataToRender ?? allBooksData;
  data = filterAndSortBooks(data); // Filters and sorts books before rendering

  console.log(data)
  // Append only the filtered books once
  data.forEach(book => rootDiv.appendChild(createBook(book)));
}


/**
 * Cleans up the book list
 */
function cleanUpRoot() {
  rootDiv.innerHTML = '';
}

/**
 * Initializes the category selector and sets up event listeners
 */
function setUp() {
  categories.forEach(cat => 
    categorySelector.appendChild(HtmlCreator.createOptionElement(cat))
  );

  categorySelector.addEventListener('change', onFilterChange);
  titleR.addEventListener('change', onFilterChange);
  yobR.addEventListener('change', onFilterChange);
}

/**
 * Handles filtering and sorting changes
 */
function onFilterChange() {
  currentFilter = categorySelector.value;
  render();
}

/**
 * Resets the filter and sorting
 */
function resetQuery() {
  currentFilter = 'Tutti';
  titleR.checked = false;
  yobR.checked = false;
  render();
}

// Initialize the app
setUp();
render();

// Expose functions globally if needed
window.renderOrderByTitle = () => { titleR.checked = true; render(); };
window.renderOrderByYop = () => { yobR.checked = true; render(); };
window.onFilterChange = onFilterChange;
window.resetQuery = resetQuery;
