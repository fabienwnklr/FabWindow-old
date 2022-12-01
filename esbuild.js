#!/usr/bin/env node

import { build } from 'esbuild';
import { generateDocumentation } from 'tsdoc-markdown';

const [node, _, method] = process.argv;
const { npm_package_version } = process.env;
const headerJS = `/**
 * FabWindow (v${npm_package_version})
 * https://netlify.fabwindow.dev
 *
 * Copyright (c) 2021-${new Date().getFullYear()} Fabien Winkler & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Fabien Winkler <fabienwinkler@outlook.fr>
 */
`;

const buildAPIDocs = () => {
  generateDocumentation({ inputFiles: ['./lib/default.ts'], outputFile: './website/docs/api/default.md' });
  generateDocumentation({ inputFiles: ['./lib/FabModal.ts'], outputFile: './website/docs/api/fabmodal.md' });
  generateDocumentation({ inputFiles: ['./lib/FabModalManager.ts'], outputFile: './website/docs/api/fabmodal-manager.md' });
};

const buildDist = () => {
  const formats = ['iife', 'esm', 'cjs'];

  formats.forEach((format) => {
    build({
      banner: { js: headerJS },
      format,
      sourcemap: false,
      logLevel: 'info',
      entryPoints: ['lib/FabModalManager.ts', 'lib/FabModal.ts'],
      bundle: true,
      minify: true,
      outdir: `build/${format}`
    }).catch(() => process.exit(1));
  });
};

const buildDocs = () => {
  build({
    banner: { js: headerJS },
    sourcemap: false,
    logLevel: 'info',
    entryPoints: ['lib/FabModalManager.ts', 'lib/FabModal.ts'],
    bundle: true,
    minify: false,
    outdir: 'website/static/assets/',
    watch: {
      onRebuild(error, result) {
        if (error) console.error('watch build failed:', error);
        else console.log('watch build succeeded:', result);
      }
    }
  })
    .then((result) => {
      console.log(result);
      console.log('watching...');
    })
    .catch(() => process.exit(1));
};

// buildDist();
// buildDocs();
buildAPIDocs();
