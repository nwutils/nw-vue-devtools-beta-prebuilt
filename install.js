const fs = require('fs');
const path = require('path');
const downloadCRX = require('download-crx');
const unzip = require("unzip-crx-3");

const vuejsDevToolsId = 'ljjemllljcmogpfapbkkighbhhppjdbg';
const crx = path.join(__dirname, vuejsDevToolsId + '.crx');
const manifestFile = path.join(__dirname, 'extension/manifest.json');
const pkgFile = path.join(__dirname, 'extension/package.json');
const outDir = path.join(__dirname, 'extension');

downloadCRX
  .downloadById(vuejsDevToolsId, __dirname, vuejsDevToolsId)
  .then((filePath) => {
    // console.log('CRX is located in', filePath);
    unzip(filePath, outDir)
      .then(() => {
        // console.log(' - Successfully unzipped the CRX file');
        fs.unlinkSync(crx);
        // console.log(' - Reading manifest file');
        fs.readFile(manifestFile, 'utf8', function (err, data) {
          if (err) {
            console.log(err);
            return;
          }
          const result = data.replace('"file:///*",', '"file:///*","<all_urls>",');
          // console.log(' - Patching Vue DevTools manifest file...');
          fs.writeFile(manifestFile, result, 'utf8', function (err) {
            if (err) {
              console.log(err);
              return;
            }
            if (fs.existsSync(pkgFile)) {
              fs.unlinkSync(pkgFile);
            }
            console.log('[OK] Vue DevTools Extension successfully installed!');
          });
        });
      });
  });
