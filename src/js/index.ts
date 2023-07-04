import '../styles/index.scss';

class BSCompatibilityLayer {
  constructor() {
    this.init();
  }

  init(): void {
    this.updateDataAttributes();
    this.initPopover();
    this.initTooltip();
  }

  updateDataAttributes(): void {
    const dataToReplace = {
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

    for (const [key, value] of Object.entries(dataToReplace)) {
      const findData = document.querySelectorAll(`[${key}]`);
      [...findData].forEach(el => {
        const dataValue = el.getAttribute(key) ?? '';
        el.setAttribute(value, dataValue);
      });
    }
  }

  initPopover(): void {
    // Popover
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  }

  initTooltip(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }
}

export default new BSCompatibilityLayer();
