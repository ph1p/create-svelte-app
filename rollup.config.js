import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import { version, dependencies } from './package.json';

export default {
  input: './src/main.ts',
  output: {
    file: 'dist/cli.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node\n',
  },
  external: [...Object.keys(dependencies || {}), 'child_process', 'fs', 'path'],
  acorn: {
    allowHashBang: true,
  },
  plugins: [
    json(),
    typescript(),
    replace({
      VERSION: version,
    }),
    terser(),
  ],
};
