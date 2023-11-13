import '../styles/index.scss';
import { type Popover, type Tooltip } from 'bootstrap';

// The BSCompatibilityLayer class is responsible for updating the data attributes of HTML elements to be compatible with Bootstrap 5. It also initializes the popover and tooltip components of Bootstrap 5.
class BSCompatibilityLayer {
  readonly dataToUpdate: Record<string, string>;

  constructor() {
    // a readonly object that maps the old data attributes to the new data attributes in Bootstrap 5
    this.dataToUpdate = {
      'data-autohide': 'data-bs-autohide',
      'data-content': 'data-bs-content',
      'data-dismiss': 'data-bs-dismiss',
      'data-html': 'data-bs-html',
      'data-offset': 'data-bs-offset',
      'data-parent': 'data-bs-parent',
      'data-placement': 'data-bs-placement',
      'data-reference': 'data-bs-reference',
      'data-ride': 'data-bs-ride',
      'data-slide': 'data-bs-slide',
      'data-slide-to': 'data-bs-slide-to',
      'data-spy': 'data-bs-spy',
      'data-target': 'data-bs-target',
      'data-toggle': 'data-bs-toggle',
      'data-trigger': 'data-bs-trigger'
    };
    this.init();
  }

  init(): void {
    this.updateAllDataAttributes();
    this.attachObserver();

    this.waitingForJQuery(() => {
      this.attachJQueryMethods();
    });
  }

  public updateAllDataAttributes(): void {
    for (const [key] of Object.entries(this.dataToUpdate)) {
      Array.from(document.querySelectorAll(`[${key}]`)).forEach((el) => {
        this.updateDataAttributes(el, key);
      });
    }
  }

  public updateDataAttributes(el: Element, dataAttribute: string): void {
    const dataValue = el.getAttribute(dataAttribute);
    if (dataValue !== null && dataValue !== '' && this.dataToUpdate[dataAttribute] !== undefined) {
      el.setAttribute(this.dataToUpdate[dataAttribute], dataValue);
    }
  }

  public attachObserver(): void {
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(this.observerCallback);
      const config = { attributes: true, childList: true, subtree: true };
      const targetNode = document.documentElement;

      observer.observe(targetNode, config);
    }
  }

  public waitingForJQuery(callback: () => void): void {
    const checkJQueryLoaded = (): void => {
      if (typeof $ !== 'undefined') {
        callback();
      } else {
        requestAnimationFrame(checkJQueryLoaded);
      }
    };
    requestAnimationFrame(checkJQueryLoaded);
  }

  observerCallback = (mutationsList: MutationRecord[], observer: MutationObserver): void => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            for (const attr in this.dataToUpdate) {
              if (attr in this.dataToUpdate && node.hasAttribute(attr)) {
                this.updateDataAttributes(node, attr);
              }
            }
          }
        });
      } else if (mutation.type === 'attributes' && mutation.attributeName !== null && mutation.attributeName in this.dataToUpdate) {
        const targetElement = mutation.target;
        if (targetElement instanceof Element) {
          this.updateDataAttributes(targetElement, mutation.attributeName);
        }
      }
    }
  };

  attachJQueryMethods = (): void => {
    $.fn.extend({
      popover: function(params: Partial<Popover.Options> | undefined) {
        // @ts-expect-error because it's JQuery method
        return this.each(function() {
          // @ts-expect-error because of the scope
          new bootstrap.Popover(this, params);
        });
      },
      tooltip: function(params: Partial<Tooltip.Options> | undefined) {
        // @ts-expect-error because it's JQuery method
        return this.each(function() {
          // @ts-expect-error because of the scope
          new bootstrap.Tooltip(this, params);
        });
      }
    });
  };
}

export default new BSCompatibilityLayer();
