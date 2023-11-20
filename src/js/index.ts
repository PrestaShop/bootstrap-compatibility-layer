import '../styles/index.scss';

// The BSCompatibilityLayer class is responsible for updating the data attributes of HTML elements to be compatible with Bootstrap 5. It also initializes the popover and tooltip components of Bootstrap 5.
export class BSCompatibilityLayer {
  readonly dataToUpdate: Map<string, string>;

  constructor() {
    // a readonly object that maps the old data attributes to the new data attributes in Bootstrap 5
    this.dataToUpdate = new Map([
      ['data-autohide', 'data-bs-autohide'],
      ['data-content', 'data-bs-content'],
      ['data-dismiss', 'data-bs-dismiss'],
      ['data-html', 'data-bs-html'],
      ['data-offset', 'data-bs-offset'],
      ['data-parent', 'data-bs-parent'],
      ['data-placement', 'data-bs-placement'],
      ['data-reference', 'data-bs-reference'],
      ['data-ride', 'data-bs-ride'],
      ['data-slide', 'data-bs-slide'],
      ['data-slide-to', 'data-bs-slide-to'],
      ['data-spy', 'data-bs-spy'],
      ['data-target', 'data-bs-target'],
      ['data-toggle', 'data-bs-toggle'],
      ['data-trigger', 'data-bs-trigger']
    ]);
    this.init();
  }

  init(): void {
    this.updateAllDataAttributes();
    this.attachObserver();
  }

  // Updates all data attributes in the HTML document that match the keys in the `dataToUpdate` map.
  public updateAllDataAttributes(): void {
    const elements = document.querySelectorAll(
      `[${Array.from(this.dataToUpdate.keys()).join('], [')}]`
    );
    elements.forEach((el) => {
      Array.from(this.dataToUpdate.keys()).forEach((key) => {
        if (el.hasAttribute(key)) {
          this.updateDataAttributes(el, key);
        }
      });
    });
  }

  // Updates a specific data attribute of an HTML element.
  public updateDataAttributes(el: Element, dataAttribute: string): void {
    const dataValue = el.getAttribute(dataAttribute);
    if (dataValue !== null && dataValue !== '' && this.dataToUpdate.has(dataAttribute)) {
      const newDataAttribute = this.dataToUpdate.get(dataAttribute);
      if (newDataAttribute !== undefined) {
        el.setAttribute(newDataAttribute, dataValue);
      }
    }
  }

  // Attaches a mutation observer to the HTML document to detect changes in data attributes.
  public attachObserver(): void {
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(this.observerCallback.bind(this));
      const config = { attributes: true, childList: true, subtree: true };
      const targetNode = document.documentElement;

      observer.observe(targetNode, config);
    }
  }

  // Callback function for the mutation observer, updates data attributes of added or modified elements.
  public observerCallback(mutationsList: MutationRecord[], observer: MutationObserver): void {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            for (const key of this.dataToUpdate.keys()) {
              if (node.hasAttribute(key)) {
                this.updateDataAttributes(node, key);
              }
            }
          }
        });
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName !== null &&
        this.dataToUpdate.has(mutation.attributeName)
      ) {
        const targetElement = mutation.target;
        if (targetElement instanceof Element) {
          this.updateDataAttributes(targetElement, mutation.attributeName);
        }
      }
    }
  }
}

export default new BSCompatibilityLayer();
