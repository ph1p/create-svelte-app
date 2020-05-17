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

If you do not want this behavior, you can simple run `svelte create` and choose a template.

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

### svelte serve or svelte

```bash
Usage: svelte serve [options] [path]

Serve project/file

Options:
  -m, --mode <type>  Set mode (development|production) (default: "development")
  -h, --help         display help for command
```

### svelte build

```bash
Usage: svelte build [options] [path]

Build project (default entrypoint is ./src/main.js

Options:
  -m, --mode <type>  Set mode (development|production) (default: "production")
  -h, --help         display help for command
```

### svelte create

```bash
Usage: svelte create [options] [path]

Create project

Options:
  -f, --force              Overwrite existing project (default: false)
  -tpl, --template [name]  Set a template (default: "")
  -h, --help               display help for command
```
