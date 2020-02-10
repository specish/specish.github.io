# specish.github.io

Most major test frameworks are based on CommonJS
which means you need to transpile your project
if it uses ES6 modules.
Specish is a small test framework based on ES6 modules
so that you don't need to transpile.

Specish does not use patterns for spec filenames.
Instead, you simply import Specish
and destructure the context into those familar functions
(`describe`, `it`, `beforeEach`, `afterEach`, `expect`, etc.)

You can:

- Put your tests in the same module as your code.
- Run your tests in the browser or Node.js.

> Note: Specish requires support for ES6 modules.
> Fortunately, most modern browsers support ES6 modules.
> The latest version of Node.js has experimental support.
