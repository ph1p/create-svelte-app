# create-svelte-app

This CLI provides you a way to create, build and serve your svelte app. Under the hood `webpack` is used for all operations.

```bash
npm i create-svelte-app -g
```

### How to use

Run all commands inside a `svelte` project.
You don't need a bundler anymore, because as I said before, it already has a preconfigured webpack.

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

### Custom Elements

This CLI makes it easy for you to create a custom element. Just run:

```bash
svelte build FILE_PATH.svelte --custom-element
```

The CLI creates the javascript file, and you can use your custom tag that you specified within your `<svelte:options tag="your-custom-element"/>` tag.

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
