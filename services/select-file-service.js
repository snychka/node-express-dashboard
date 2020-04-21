const fs = require('fs');
const path = require('path');
function getDirectoryContents(files, currentDir, query) {
}

function isDirectory(currentDir, file) {
  let p = path.join(currentDir, file);
  const fileInfo = fs.statSync(p);
  //const fileInfo = fs.statSync(path.join(currentDir, file));
  return fileInfo.isDirectory();
}

function readDir(currentDir, res, query) {
}

exports.get = (req, res) => {
};
