# specish.github.io

Most major test frameworks are based on CommonJS.
This means that projects based on ES6 modules
need to be transpiled.

Specish is based on ES6 modules instead.
With Specish, you don't need to transpile
your ESM-based project.
Also, you can run your tests in the browser or Node.js.

> Specish requires support for ES6 modules.
> Fortunately most modern browsers support ES6 modules.
> The latest version of Node.js has experimental support
> which can be enabled by adding `"type": "module"`
> in your `package.json` file.

Specish offers familiar functions like
`describe`, `it`, `expect`, `beforeEach`, and `afterEach`.
