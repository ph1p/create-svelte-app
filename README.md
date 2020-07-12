# create-svelte-app

```bash
npm i create-svelte-app -g

# yarn
yarn add global create-svelte-app

# or
yarn create svelte-app
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

### Single .svelte file

You can serve a `.svelte` file by running`svelte FILE_PATH.svelte` or `svelte serve FILE_PATH.svelte`. When you use this feature, a `main.js` is temporarily created by the CLI. If you want to pass `props` from this main file to your svelte file, you can set a JSON-String via the `--props` flag.

```bash
svelte serve ./test.svelte --props '{"prop":"hi there!"}'
```

And if you want to build a project with this `.svelte` file, run:

```bash
svelte serve ./build.svelte --props '{"prop":"hi there!"}'
```

### svelte help

```bash
Options:
  -V, --version            output the version number
  -h, --help               output usage information

Commands:
  serve [options] [path]   Serve project/file
  create [options] [path]  Create project
  build [options] [path]   Build project (default entrypoint is ./src/main.js
```

### svelte serve or just svelte

```bash
Usage: svelte serve [options] [path]

Serve a project or a single .svelte file (default entrypoint is ./src/main.js)

Options:
  -m, --mode <type>      Set mode (development|production) (default: "development")
  --props <string>       Set props JSON, if you serve a .svelte file (default: "{}")
  -ce, --custom-element  Serve as custom element (default: false)
  -t, --title <string>   HTML-Page Title (default: "Svelte-App")
  -p, --port <number>    Application port (default: 3000)
  -h, --help             display help for command
```

### svelte build

```bash
Usage: svelte build [options] [path]

Build project (default entrypoint is ./src/main.js)

Options:
  -m, --mode <type>      Set mode (development|production) (default: "production")
  --props <string>       Set props JSON, if you serve a .svelte file (default: "{}")
  -ce, --custom-element  Build as custom element (default: false)
  -t, --title <string>   HTML-Page Title (default: "Svelte-App")
  -h, --help             display help for command
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
