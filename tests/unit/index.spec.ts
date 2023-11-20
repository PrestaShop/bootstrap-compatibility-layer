import BSCompatibilityLayer from '../../src/js/index';

describe('BSCompatibilityLayer', () => {
  // BSCompatibilityLayer updates all data attributes in the HTML document that match the keys in the `dataToUpdate` map.
  it('should update all data attributes in the HTML document that match the keys in the `dataToUpdate` map', () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockDataAttribute = 'data-autohide';
    const mockDataValue = 'true';
    mockElement.setAttribute(mockDataAttribute, mockDataValue);
    document.body.appendChild(mockElement);

    // Act
    BSCompatibilityLayer.updateAllDataAttributes();

    // Assert
    expect(mockElement.hasAttribute('data-bs-autohide')).toBe(true);
    expect(mockElement.getAttribute('data-bs-autohide')).toBe(mockDataValue);
  });

  // BSCompatibilityLayer attaches a mutation observer to the HTML document to detect changes in data attributes.
  it('should attach a mutation observer to the HTML document to detect changes in data attributes', () => {
    // Arrange
    const mockObserver = jest.fn();
    const mockMutationObserver = jest.fn(() => ({
      observe: jest.fn()
    }));
    /**
     * Too hard to type mutation observer and unecessary for this test
     *
     * @ts-expect-error */
    window.MutationObserver = mockMutationObserver;

    // Act
    BSCompatibilityLayer.attachObserver();

    // Assert
    expect(mockMutationObserver).toHaveBeenCalledWith(expect.any(Function));
  });

  // BSCompatibilityLayer updates a specific data attribute of an HTML element.
  it('should update a specific data attribute of an HTML element', () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockDataAttribute = 'data-autohide';
    const mockDataValue = 'true';
    mockElement.setAttribute(mockDataAttribute, mockDataValue);

    // Act
    BSCompatibilityLayer.updateDataAttributes(mockElement, mockDataAttribute);

    // Assert
    expect(mockElement.hasAttribute('data-bs-autohide')).toBe(true);
    expect(mockElement.getAttribute('data-bs-autohide')).toBe(mockDataValue);
  });

  // BSCompatibilityLayer updates data attributes of added or modified elements.
  it('should update data attributes of added or modified elements', () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockDataAttribute = 'data-autohide';
    const mockDataValue = 'true';
    mockElement.setAttribute(mockDataAttribute, mockDataValue);

    // Act
    /**
     * Can't recreate the needed type with mock
     *
     * @ts-expect-error */
    BSCompatibilityLayer.observerCallback([{ type: 'childList', addedNodes: [mockElement] }], new MutationObserver(() => {}));

    // Assert
    expect(mockElement.hasAttribute('data-bs-autohide')).toBe(true);
    expect(mockElement.getAttribute('data-bs-autohide')).toBe(mockDataValue);

    const mockModifiedAttribute = 'data-content';
    const mockModifiedValue = 'hello world';

    mockElement.setAttribute(mockModifiedAttribute, mockModifiedValue);

    /**
     * Can't recreate the needed type with moke
     *
     * @ts-expect-error */
    BSCompatibilityLayer.observerCallback([{ type: 'attributes', attributeName: mockModifiedAttribute, target: mockElement }], new MutationObserver(() => {}));

    expect(mockElement.hasAttribute('data-bs-content')).toBe(true);
    expect(mockElement.getAttribute('data-bs-content')).toBe(mockModifiedValue);
  });

  // BSCompatibilityLayer does not update data attributes that are not in the `dataToUpdate` map.
  it('should not update data attributes that are not in the `dataToUpdate` map', () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockDataAttribute = 'data-unknown';
    const mockDataValue = 'unknown';
    mockElement.setAttribute(mockDataAttribute, mockDataValue);

    // Act
    BSCompatibilityLayer.updateDataAttributes(mockElement, mockDataAttribute);

    // Assert
    expect(mockElement.hasAttribute(mockDataAttribute)).toBe(true);
    expect(mockElement.hasAttribute('data-bs-unknown')).toBe(false);
  });

  // BSCompatibilityLayer does not update data attributes with empty or null values.
  it('should not update data attributes with empty or null values', () => {
    // Arrange
    const mockElement = document.createElement('div');
    const mockDataAttribute = 'data-autohide';
    const mockDataValue = '';
    mockElement.setAttribute(mockDataAttribute, mockDataValue);

    // Act
    BSCompatibilityLayer.updateDataAttributes(mockElement, mockDataAttribute);

    // Assert
    expect(mockElement.hasAttribute(mockDataAttribute)).toBe(true);
    expect(mockElement.hasAttribute('data-bs-autohide')).toBe(false);
  });
});

export {};
