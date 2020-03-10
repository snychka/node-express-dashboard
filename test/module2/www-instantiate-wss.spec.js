describe('bin/www', () => {
  it('should instantiate a WebSocket server based on express server @www-instantiate-wss', () => {
    let wss;
    let server
    try {
      wss = wwwModule.__get__('wss');
    } catch (err) {
      assert(wss !== undefined, 'Has a `const` called `wss` been assigned to a ' +
        'new `WebSocket.Server` instance in `www`?');
    }
    try {
      server = wwwModule.__get__("server")
      assert(wss.server = server, "Did you pass the correct `server` variable " +
        "for the `WebSocket.ServerOptions` object as an argument to the " +
        "`WebSocket.Server` constructor?")
    } catch (err) {
      assert.fail("It appears that the bin/www file has been corrupted. " +
        "Try pulling a fresh copy.")
    }
  });
});