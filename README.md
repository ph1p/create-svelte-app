# create-svelte-app

```bash
npm i create-svelte-app -g

# yarn
yarn add global create-svelte-app
```

### How to use

Run all commands inside a `svelte` project.

You do not need a bundler anymore. `create-svelte-app` serves and builds the project for you.

**Example structure:**

```
package.json
src/
  - App.svelte
  main.js
```

```bash
svelte # serve project
svelte build # build project
```

### svelte help

```bash
Options:
  -V, --version            output the version number
  -p, --port <number>      Application port (default: 3000)
  -h, --help               output usage information

Commands:
  serve [options] [path]   Serve project/file
  create [options] [path]  Create project
  build [options] [path]   Build project (default entrypoint is ./src/main.js
```
