# specish.github.io

Most major test frameworks are based on CommonJS.
To be compatible, projects that are based on ES6 modules
need to be transpiled.

The Specish framework is based on ES6 modules instead.
Consider using Specish if your project is based on ES6 modules
and you don't want to transpile.

With Specish, you can run your tests in the browser or Node.js.

> Specish requires support for ES6 modules.
>
> Fortunately most modern browsers support ES6 modules.
>
> The latest version of Node.js has experimental support
> which can be enabled by adding `"type": "module"`
> in your `package.json` file.

Specish supports familiar testing functions like
`describe`, `it`, `beforeEach`, `afterEach`, and `expect`.
