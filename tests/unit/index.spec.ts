describe('test for test', () => {
  test('if window BSCompatibilityLayer is not available', () => {
    expect(window.BSCompatibilityLayer).toBeUndefined();
  });
  test('if window BSCompatibilityLayer is available', () => {
    require('../../src/js/index');
    expect(window.BSCompatibilityLayer).toBeDefined();
  });
});

export {};
