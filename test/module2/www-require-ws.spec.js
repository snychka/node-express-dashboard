describe('bin/www', () => {
  it('should contain ws require @www-require-ws', () => {
    let wss;
    try {
      wss = wwwModule.__get__('WebSocket');
    } catch (err) {
      assert(wss !== undefined, 'Has the `ws` module been required and assigned to a `const` called `WebSocket` in `www`?');
    }
  });
});