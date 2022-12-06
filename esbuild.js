#!/usr/bin/env node

import { build } from "esbuild"
import { generateDocumentation, buildDocumentation, documentationToMarkdown } from "tsdoc-markdown"
import path, { dirname } from "node:path"
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from 'node:url';

const [node, _, method] = process.argv
const { npm_package_version } = process.env
const headerJS = `/**
 * FabModal (v${npm_package_version})
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
`

const buildAPIDocs = async () => {
  const inputFiles = ["./lib/default.ts", "./lib/FabModal.ts", "./lib/FabModalManager.ts"]
  const output = "website/docs/api/"

  let i = 0;
  const genereDocRecursive = function (i) {
    const mdDoc = documentationToMarkdown({ entries: buildDocumentation({ inputFiles: [inputFiles[i]] }) })
    const extension = path.extname(inputFiles[i])
    const fileName = path.basename(inputFiles[i], extension)
    const header = `# ${fileName.charAt(0).toUpperCase() + fileName.slice(1)}\n\n`
    const docToRight = header + mdDoc
    const outputFile = `${output + fileName.toLowerCase()}.md`

    writeFile(outputFile, docToRight).then(function () {
      console.log(`${fileName.toLowerCase()}.md generated.`)
      i++
      if (inputFiles[i]) {
        genereDocRecursive(i)
      } else {
        console.log('Api docs generation completed.')
      }
    })
  }

  genereDocRecursive(i);
}

const buildDist = async () => {
  const formats = ["iife", "esm", "cjs"]

  formats.forEach(format => {
    build({
      banner: { js: headerJS },
      format,
      sourcemap: false,
      logLevel: "info",
      entryPoints: ["lib/FabModalManager.ts", "lib/FabModal.ts"],
      bundle: true,
      minify: true,
      outdir: `build/${format}`,
    }).then(result => {
      console.log('build dist for format ' + format + ' succeeded.')
    }).catch((err) => {
      console.error(err)
      process.exit(1)
    })
  })
}

const buildDocs = async () => {
  build({
    banner: { js: headerJS },
    sourcemap: false,
    logLevel: "info",
    entryPoints: ["lib/FabModalManager.ts", "lib/FabModal.ts"],
    bundle: true,
    minify: false,
    outdir: "website/static/assets/",
    watch: {
      onRebuild(error, result) {
        if (error) console.error("watch build failed:", error)
        else console.log("watch build succeeded")
      },
    },
  })
    .then(result => {
      console.log(result)
      console.log("watching...")
      buildAPIDocs()
    })
    .catch(() => process.exit(1))
}

buildDist()
buildDocs()