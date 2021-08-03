#!/usr/bin/env node
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const { createCommand, buildCommand, serveCommand } = require('../commands');

const program = require('commander');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

program
  .version('0.0.1')
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
  .option('-p, --port <number>', 'Application port', 3000)
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
