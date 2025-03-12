export default class HtmlCreator {

  /**
   * The function `createSingleInfo` creates a new HTML element with the specified tag name and text
   * content.
   * @param {keyof HTMLElementTagNameMap} tagName - The `tagName` parameter is the type of HTML element you want to create, such as
   * 'div', 'p', 'span', 'h1', etc.
   * @param {string} nodeText - The `nodeText` parameter in the `createSingleInfo` function is the text content
   * that will be added inside the newly created HTML element specified by the `tagName` parameter.
   * @param {string[]?} cssClasses
   * @returns {HTMLElement} The `createSingleInfo` function returns a newly created HTML element with the specified
   * tag name and text content.
   */
  static createElement(tagName, nodeText, cssClasses) {
    const newTag = document.createElement(tagName)
    const tagTextNode = document.createTextNode(nodeText)
    newTag.appendChild(tagTextNode)

    if (cssClasses) cssClasses.forEach(cls => newTag.classList.add(cls))
    return newTag
  }

  static createOptionElement(value){
    const option = document.createElement('option')
    option.value = value
    option.innerText = value
    return option
  }

  static addSvgBook() {
    const bookSvg = document.createElement('div')
    bookSvg.classList.add('svg-container')
    bookSvg.innerHTML = bookSvgCode
    return bookSvg
  }
}


const bookSvgCode = 
`
<svg width="64px" height="64px" viewBox="0 0 24 24" 
fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
<path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
</path> 
</g>
</svg>
`;

