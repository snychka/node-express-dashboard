describe("bin/www", () => {  
  it('Should import getDefaultDir @routes-import-getDefaultDir', () => {
    let www;
    try {
      www = wwwModule.__get__('getSettings');
    } catch (err) {
      assert(www !== undefined, 
        'Has the `getSettings` function been imported?');
    }
  });
});