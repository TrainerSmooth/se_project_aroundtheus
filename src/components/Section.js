export default class Section {
  constructor({ renderer, selector }) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  /**
   * Renders all provided items by calling the renderer for each.
   * @param {Array} items - Array of items to render.
   */
  renderItems(items) {
    items.forEach((item) => {
      const renderedElement = this._renderer(item);
      if (renderedElement) {
        this.addItem(renderedElement);
      }
    });
  }

  /**
   * Adds a new element to the container.
   * @param {HTMLElement} element - The DOM element to add.
   */
  addItem(element) {
    this._container.prepend(element);
  }
}

// Initialize Section for rendering cards
const cardSection = new Section({
  renderer: (item) => {
    return createCard(item); // Return the card element created
  },
  selector: selectors.cardSelection, // The CSS selector for the card container
});
