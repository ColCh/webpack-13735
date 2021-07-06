# webpack-13735

Sandbox URL: https://codesandbox.io/s/jovial-liskov-77n9k?file=/README.md

Attempt to fix <https://github.com/webpack/webpack/issues/13735>

Main point is to put webpack chunks into separate container (and separate `window`).

See

* `webpack.config.js` for configuration
* `src/MY_IMPORT.js` for `import()` interceptor
* `src/index.js` for application code with dynamic import

Launch with `npx webpack serve --mode=development` and open `http://localhost:8080/`

## Demo image

![Img](./assets/Screenshot%202021-07-07%20at%2000.56.59.png)
