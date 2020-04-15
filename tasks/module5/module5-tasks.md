# Selecting a log file

## Require the `fs` and `path` modules
In `services/select-file-service.js` require the `fs` module and store a reference to it in a `const` called `fs`. Then require the `path` module and store it in a `const` called `path`.

## Implement the isDirectory() function
In `services/select-file-service.js` implement the `isDirectory()` function. Do this by first joining the `currentDir` and `file` parameters using the `path.join()` function to form the file or directory path. Then pass the path to `fs.statSync()` and store the return value in a `const` called `fileInfo`. Use the `isDirectory()` method on `fileInfo` to return a boolean value.

## Implement the getDirectoryContents() function
In `services/select-file-service.js` implement the `getDirectoryContents()` function. Do this by first initializing an empty array (`[]`) named `data` as a `const`. Then use `forEach` on the `files` parameter to loop over each file (or directory). Use `file ` as the name of the parameter for the callback passed to `forEach()`. Use the `isDirectory()` function to determine if the `file` is a directory. If it is a directory then add a new object representing a directory to the `data` array with fields: `name` (assigned to `file`), `isDirectory` (set to `true`), and `path` (assigned to the result of joining `query` and `file`). If `file` is not a directory then add a new object representing a file to the `data` array with fields: `name` (assigned to `file`), `isDirectory` (set to `false`), `path` (assigned to the result of joining `query` and `file`), and `currentDir`. Return the `data` array.

## Implement the readDir() function
In `services/select-file-service.js` implement the `readDir()` function. Do this by using `fs.readdir()` to read the contents of the `currentDir` parameter. Pass a callback function as the second parameter to `fs.readdir()` using `err` as the callback's first parameter and `files` as the callback's second parameter. Inside the callback create a variable called `directoryContents` and assign it to an empty array (`[]`). Then, if `err` is falsy, reassign `directoryContents` to the result of `getDirectoryContents()`. Call the `json()` method of the `res` (response) parameter and pass `directoryContents` as the argument.

## Add global `dir` constant
In `services/select-file-service.js` add a global `const` named `dir` after the `require`s. Assign it the result of `process.cwd()`.

## Implement the `get()` function
In `services/select-file-service.js` implement the exported `get()` function. Do this by creating a variable named `currentDir` assigned to the value of the global `dir` `const`. Then create a `const` named `query` and assign it the value of `req.query.path` or empty string (`""`) if falsy. Then if `query` is truthy set `currentDir` to the joined path of `currentDir` and `query`. Lastly, call `readDir()`, which will set the `res` body with the directory contents. Start the app and navigate to the [select file page](http://localhost:3000/select-file). You should now see the current directory contents displayed and should be able to traverse directories to select a log file. Select the log file at log-generator/sample.log using the select file page. A new log dashboard page should open displaying the log files.
