# create-svelte-app

```bash
npm i create-svelte-app -g

# yarn
yarn add global create-svelte-app
```

### How to use

Run all commands inside a `svelte` project.
You do not need a bundler anymore. `svelte` serves and builds the project for you.

**Example structure:**

```
package.json
src/
  - App.svelte
  main.js
```

```bash
svelte # serve project
svelte --build # build project
```

### svelte help

```bash
svelte <cmd> [args]

Options:
  --help, -h     Show help                                             [boolean]
  --version, -v  Show version number                                   [boolean]
  --entry, -e    Entry file                  [string] [default: "./src/main.js"]
  --port, -p     dev server port                        [number] [default: 3000]
  --build, -b    build project                        [boolean] [default: false]
  --create, -c   build project           [string] [default: "my-svelte-project"]
```
