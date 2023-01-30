#!/usr/bin/env node

import { build } from "esbuild"
import { buildDocumentation, documentationToMarkdown } from "tsdoc-markdown"
import path from "node:path"
import { writeFile } from "node:fs/promises"
import { exit, argv, env, stdout, stderr } from "node:process"
import { exec } from "node:child_process"
import { red, green, cyan, cyanBright } from "console-log-colors"

const [node, _, method] = argv
const { npm_package_version } = env
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
`

const buildAPIDocs = async () => {
  const inputFiles = ["./lib/default.ts", "./lib/FabWindow.ts", "./lib/FabWindowManager.ts"]
  const output = "docs/docs/api/"

  let i = 0
  const genereDocRecursive = function (i) {
    const mdDoc = documentationToMarkdown({ entries: buildDocumentation({ inputFiles: [inputFiles[i]] }) })
    const extension = path.extname(inputFiles[i])
    const fileName = path.basename(inputFiles[i], extension)
    const header = `# ${fileName.charAt(0).toUpperCase() + fileName.slice(1)}\n\n`
    const docToRight = header + mdDoc
    const outputFile = `${output + fileName.toLowerCase()}.md`

    writeFile(outputFile, docToRight).then(function () {
      console.log(cyan(`${fileName.toLowerCase()}.md generated.`))
      i++
      if (inputFiles[i]) {
        genereDocRecursive(i)
      } else {
        console.log(green("Api docs generation completed."))

        // Running docs
        if (method === "serve") {
          console.log(cyan("Running docs..."))
          const cmd = exec("npm run doc", (error, stdout, stderr) => {
            if (error) {
              console.log(red(`error: ${error.message}`))
              return
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`)
              return
            }
            console.log(`stdout: ${stdout}`)
          })

          cmd.stdout.pipe(stdout)
          cmd.stderr.pipe(stderr)
          cmd.on("error", error => {
            console.log(red(`error: ${error.message}`))
            exit(1)
          })
        }
      }
    })
  }

  genereDocRecursive(i)
}

const buildDist = () => {
  const formats = ["iife", "esm", "cjs"]

  formats.forEach(format => {
    build({
      banner: { js: headerJS },
      format,
      sourcemap: false,
      logLevel: "info",
      entryPoints: ["lib/FabWindowManager.ts", "lib/FabWindow.ts"],
      bundle: true,
      minify: true,
      outdir: `build/${format}`,
    })
      .then(result => {
        console.log(green("build dist for format " + format + " succeeded."))
      })
      .catch(err => {
        console.error(red(err))
        exit(1)
      })
  })
}

const buildDocs = () => {
  build({
    banner: { js: headerJS },
    sourcemap: false,
    logLevel: "info",
    entryPoints: ["lib/FabWindowManager.ts", "lib/FabWindow.ts"],
    bundle: true,
    minify: false,
    outdir: "docs/static/assets/",
    watch: {
      onRebuild(error, result) {
        if (error) console.error(red("watch build failed:" + error))
        else console.log(green("Build docs files successfully"))
      },
    },
  })
    .then(result => {
      console.log(cyan("watching..."))
      buildAPIDocs()
    })
    .catch(() => exit(1))
}

buildDist()
buildDocs()
