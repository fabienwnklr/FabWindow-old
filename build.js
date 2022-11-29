require('esbuild')
    .build({
        logLevel: 'info',
        entryPoints: ['lib/FabModalManager.ts', 'lib/FabModal.ts'],
        bundle: true,
        minify: true,
        outfile: 'dist/fabmodal.complete.min.js'
    })
    .catch(() => process.exit(1));

// require('esbuild')
//     .build({
//         logLevel: 'info',
//         entryPoints: ['lib/FabModalManager.ts', 'lib/FabModal.ts'],
//         bundle: true,
//         outfile: 'www/main.js'
//     })
//     .catch(() => process.exit(1));
