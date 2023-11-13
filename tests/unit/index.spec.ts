import BSCompatibilityLayer from '../../src/js/index';

describe('test for test', () => {
  test('test data attributes updated correctly', () => {
    const el = document.createElement('div');
    el.setAttribute('data-autohide', 'true');
    el.setAttribute('data-content', 'content');
    el.setAttribute('data-toggle', 'popover');
    document.body.appendChild(el);
    BSCompatibilityLayer.updateAllDataAttributes();
    expect(el.getAttribute('data-autohide')).toBe('true');
    expect(el.getAttribute('data-content')).toBe('content');
    expect(el.getAttribute('data-toggle')).toBe('popover');
    expect(el.getAttribute('data-bs-autohide')).toBe('true');
    expect(el.getAttribute('data-bs-content')).toBe('content');
    expect(el.getAttribute('data-bs-toggle')).toBe('popover');
  });

  test('test data attributes not updated if not in data to update object', () => {
    const el = document.createElement('div');
    el.setAttribute('data-foo', 'bar');
    BSCompatibilityLayer.updateAllDataAttributes();
    expect(el.hasAttribute('data-foo')).toBe(true);
    expect(el.hasAttribute('data-bs-foo')).toBe(false);
  });

  test('test data attributes not updated if value is undefined', () => {
    const el = document.createElement('div');
    el.setAttribute('data-autohide', '');
    document.body.appendChild(el);
    BSCompatibilityLayer.updateAllDataAttributes();
    expect(el.hasAttribute('data-autohide')).toBe(true);
    expect(el.hasAttribute('data-bs-autohide')).toBe(false);
  });
});

export {};
