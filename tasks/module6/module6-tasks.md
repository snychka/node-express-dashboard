# Adding settings and configuration

## Require the `fs` and `path` modules
In `services/settings-service.js` require the `fs` module and store a reference to it in a `const` called `fs`. Then require the `path` module and store it in a `const` called `path`.

## Get a global reference to the settings file path
In `services/settings-service.js` after the `require`s, create a `const` named `settingsFilePath`. Assign it to the path value of the `settings.json` file located at `json/settings.json`. Hint: use `path.join()` and the Node constant `__dirname`, which is the absolute path of the directory containing the currently executing file.

## Implement the `getSettings()` function
In `services/settings-service.js` implement the `getSettings()` function. Do this by using `fs.readFileSync()` passing in as its argument the settings file path `const` `settingsFilePath`. Assign the result of `fs.readFileSync()` to a `const` named `settingsData`. Use `JSON.parse()` to parse `settingsData` and return it.

## Implement the `writeSettings()` function
In `services/settings-service.js` implement the `writeSettings()` function. Do this by using `JSON.stringify()` to convert the `newSettings` parameter to a `string`. Pass `null` as the second argument to `JSON.stringify()` and `2`, the number of spaces in the `JSON` file, as the third argument. Assign the result of `JSON.stringify()` to a `const` called `settingsJSON`. Then, inside of the `try` block of a `try...catch`, use `fs.writeFileSync()` to write `settingsJSON` to `settingsFilePath` and return true. If an error is caught in the `catch` block then return false.

## Implement the `isValidDir()` function
In `services/settings-service.js` implement the `isValidDir()` function. Inside of the `try` block of a `try...catch`, use `fs.readdirSync()` to check the `dirPath` and return true. If an error is caught in the `catch` block then return false.

## Implement the `getDefaultDir()` function
In `services/settings-service.js` implement the `getDefaultDir()` function. Do this by leveraging the `getSettings()` function and referencing its `defaultDir` property and assign that to a `const` called `defaultDir`. Then, to account for the case where the `defaultDir` is empty, check if `defaultDir` is falsy and, if so, return `process.cwd()`. Otherwise use a ternary operator to determine if `defaultDir` is valid using `isValidDir()` and if so return `defaultDir` otherwise return `process.cwd()`. Start the app and visit the [settings page](http://localhost:3000/settings). Try entering an invalid directory path and click the Submit button. You should see an error saying the default directory is not valid. Now enter a valid directory path and submit. You should see a success message and the valid default directory should be displayed.

## Add export for setting the current directory in select file service
In `services/select-file-service.js` add a property called `setcwd` to the global `exports` object and assign it to a function. The function parameter should be named `cwd`. Inside the function assign the `dir` variable to the `cwd` parameter.

## Import the `getDefaultDir` function from settings service
In `routes/index.js` add `getDefaultDir` as an import to the existing `settings-service.js` function imports. 

## Set the current directory from settings when loading the select file page
In `routes/index.js` inside the callback function parameter of the `router.get()` function for the `select-file` path, set the current directory from settings before rendering the select file page. Do this by calling `fileService.setcwd()` and passing in the value returned from calling the settings service's `getDefaultDir()` function before the `res.render()` call.

## Import the `getSettings()` function from settings service
In `bin/www` after the `const` `fs` import, import the `getSettings` function from `settings-service.js`.

## Apply the filter from settings
In `bin/www` after the `logs` variable assignment create a `const` named `settings` and assign it the value returned from the imported `getSettings()` function. Check if `settings.filter` is truthy and, if so, filter out log entries that include the value of `settings.filter` and assign the filtered array to `logs`. Use `logs.filter()` with a parameter of `line` for the filter callback function and `line.includes()` to check if the filter string (`settings.filter`) is found in the log entry (`line`). Start the app and add a filter string on the settings page, e.g. `POST`. Now select the log file at `log-generator/sample.log` using the select file page. Notice that log entries with the string `POST` are not displayed.
