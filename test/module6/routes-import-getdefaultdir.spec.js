describe("routes/index.js", () => {
  const routesModule = rewire(path.join(process.cwd(), 'routes/index.js'));
  
  it('Should import getDefaultDir @routes-import-getDefaultDir', () => {
    let getDefaultDir;
    try {
      getDefaultDir = routesModule.__get__('getDefaultDir');
    } catch (err) {
      assert(getDefaultDir !== undefined, 
        'Has the `getDefaultDir` function been imported?');
    }
  });
});