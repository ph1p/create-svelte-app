import program from 'commander';
import { createCommand, buildCommand, serveCommand } from './commands';

program
  .version('VERSION')
  .description('a simple CLI to manage and develop svelte apps');

program
  .command('serve [path]')
  .description(
    'Serve a project or a single .svelte file (default entrypoint is ./src/main.js)'
  )
  .option(
    '-m, --mode <type>',
    'Set mode (development|production)',
    'development'
  )
  .option(
    '--props <string>',
    'Set props JSON, if you serve a .svelte file',
    '{}'
  )
  .option('-ce, --custom-element', 'Serve as custom element', false)
  .option('-t, --title <string>', 'HTML-Page Title', 'Svelte-App')
  .option('-p, --port <number>', 'Application port', '3000')
  .action(function (path, env) {
    serveCommand(path, env);
  });

program
  .command('create [path]')
  .description('Create project')
  .option('-f, --force', 'Overwrite existing project', false)
  .option('-tpl, --template [name]', 'Set a template', '')
  .action(function (path, env) {
    createCommand(path, env);
  });

program
  .command('build [path]')
  .description('Build project (default entrypoint is ./src/main.js)')
  .option(
    '-m, --mode <type>',
    'Set mode (development|production)',
    'production'
  )
  .option(
    '--props <string>',
    'Set props JSON, if you serve a .svelte file',
    '{}'
  )
  .option('-ce, --custom-element', 'Build as custom element', false)
  .option('-t, --title <string>', 'HTML-Page Title', 'Svelte-App')
  .action(function (path, env) {
    buildCommand(path, env);
  });

if (!['create', 'build', 'serve', 'help', '--help'].includes(process.argv[2])) {
  process.argv.splice(2, 0, 'serve');
}

program.parse(process.argv);
