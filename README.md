# webpack-13735

Sandbox URL: *TODO*

Attempt to fix <https://github.com/webpack/webpack/issues/13735>

Main point is to put webpack chunks into separate container (and separate `window`).

See

* `webpack.config.js` for configuration
* `src/MY_IMPORT.js` for `import()` interceptor
* `src/index.js` for application code with dynamic import

## Demo image

![Img](./assets/Screenshot%202021-07-07%20at%2000.56.59.png)
