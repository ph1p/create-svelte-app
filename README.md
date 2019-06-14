# create-svelte-app

```bash
npm i create-svelte-app

# yarn
yarn add global create-svelte-app
```

### how to use

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
create-svelte-app # serve project
create-svelte-app build # build project
```

### create-svelte-app help

```bash
create-svelte-app <cmd> [args]

Options:
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
  --entry, -e    Entry file                  [string] [default: "./src/main.js"]
  --port, -p     dev server port                        [number] [default: 3000]
  --build, -b    build project                        [boolean] [default: false]
```
