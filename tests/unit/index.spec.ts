describe('test for test', () => {
  test('if BSCompatibilityLayer init', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    require('../../src/js/index');
    expect(consoleSpy).toHaveBeenCalledWith('test');
    consoleSpy.mockRestore();
  });
});

export {};
