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
  .description('a simple CLI to manage and develop svelte apps')
  .option('-p, --port <number>', 'Application port', 3000);

program
  .command('serve [path]')
  .description('Serve project/file')
  .option(
    '-m, --mode <type>',
    'Set mode (development|production)',
    'development'
  )
  .action(function (path, env) {
    if (!path) {
      path = './src/main.js';
    }

    serveCommand(path, env);
  });

program
  .command('create [path]')
  .description('Create project')
  .option('-f, --force', 'Overwrite existing project', false)
  .option('-tpl, --template [name]', 'Set a template', '')
  .action(function (cmd, env) {
    createCommand(cmd, env);
  });

program
  .command('build [path]')
  .description('Build project (default entrypoint is ./src/main.js')
  .option(
    '-m, --mode <type>',
    'Set mode (development|production)',
    'production'
  )
  .action(function (cmd, env) {
    buildCommand(cmd, env);
  });

if (
  !['create', 'build', 'serve', 'help', '--help'].includes(
    process.argv[process.argv.length - 1]
  )
) {
  process.argv.splice(2, 0, 'serve');
}

program.parse(process.argv);
