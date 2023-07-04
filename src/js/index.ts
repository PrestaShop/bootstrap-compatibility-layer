import '../styles/index.scss';

// The BSCompatibilityLayer class is responsible for updating the data attributes of HTML elements to be compatible with Bootstrap 5. It also initializes the popover and tooltip components of Bootstrap 5.
class BSCompatibilityLayer {
  readonly dataToUpdate: Record<string, string>;

  constructor() {
    // a readonly object that maps the old data attributes to the new data attributes in Bootstrap 5
    this.dataToUpdate = {
      'data-autohide': 'data-bs-autohide',
      'data-content': 'data-bs-content',
      'data-dismiss': 'data-bs-dismiss',
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
    this.initPopover();
    this.initTooltip();
  }

  public updateDataAttributes(): void {
    for (const [key, value] of Object.entries(this.dataToUpdate)) {
      const findData = document.querySelectorAll(`[${key}]`);
      Array.from(findData).forEach(el => {
        const dataValue = el.getAttribute(key);
        if (dataValue !== null && dataValue !== '') {
          el.setAttribute(value, dataValue);
        }
      });
    }
  }

  public initPopover(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    Array.from(popoverTriggerList).map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  }

  public initTooltip(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
}

export default new BSCompatibilityLayer();
