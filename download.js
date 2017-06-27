#!/usr/bin/env node

const fs = require('fs');
const db = require('./dropboxconfig.js');

function *downloadTo(src, dest) {
  const result = yield db.filesDownload({ path: src });
  fs.writeFileSync(dest, result.fileBinary, "binary");
}

function *main() {
  if (!process.argv[3]) {
    throw `Missing arguments. Usage: ${process.argv[1]} dropboxsrc localdest`;
  }
  yield downloadTo(process.argv[2], process.argv[3]);
}

require('./co')(main);
