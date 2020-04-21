const fs = require('fs');
const path = require('path');

const dir = process.cwd();

function getDirectoryContents(files, currentDir, query) {
  const data = [];
  files.forEach((file) => {
    if (isDirectory(currentDir, file)) {
      data.push({
        name: file,
        isDirectory: true,
        path: path.join(query, file)
      });
    } else {
      data.push({
        name: file,
        isDirectory: false,
        path: path.join(query, file),
        currentDir
      });
    }
    return data;
  })
}

function isDirectory(currentDir, file) {
  //let p = path.join(currentDir, file);
  //const fileInfo = fs.statSync(p);
  const fileInfo = fs.statSync(path.join(currentDir, file));
  return fileInfo.isDirectory();
}

function readDir(currentDir, res, query) {
  fs.readdir(currentDir, (err, files) => {
    let directoryContents = [];
    if (!err) {
      directoryContents = getDirectoryContents(files, currentDir, query);
    }
    res.json(directoryContents);
  })
}

exports.get = (req, res) => {
  let currentDir = dir;
  const query = req.query.path || "";
  if (query) {
    currentDir = path.join(currentDir, query);
  }
  readDir(currentDir, res, query);
};
