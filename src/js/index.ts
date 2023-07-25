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
    this.updateDataAttributes();

    this.waitingForJQuery(() => {
      this.attachJQueryMethods();
    });
  }

  public updateDataAttributes(): void {
    for (const [key, value] of Object.entries(this.dataToUpdate)) {
      Array.from(document.querySelectorAll(`[${key}]`)).forEach((el) => {
        const dataValue = el.getAttribute(key);
        if (dataValue !== null && dataValue !== '') {
          el.setAttribute(value, dataValue);
        }
      });
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

  public attachJQueryMethods(): void {
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
  }
}

export default new BSCompatibilityLayer();
