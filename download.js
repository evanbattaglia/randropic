#!/usr/bin/env node

const fs = require('fs');
const db = require('./dropboxconfig.js');

function *downloadTo(src, dest) {
  const result = yield db.filesDownload({ path: src });
  // Default name is full path with directories collapsed to underscores
  if (!dest) dest = src.replace(/\//g, '__');
  if (dest.match(/\/$/)) dest += src.replace(/\//g, '__'); // dest is a directory
  fs.writeFileSync(dest, result.fileBinary, "binary");
  return dest;
}

function *main() {
  if (!process.argv[2]) {
    throw `Missing arguments. Usage: ${process.argv[1]} dropboxsrc [localdest]`;
  }
  const outputFn = yield downloadTo(process.argv[2], process.argv[3]);
  console.log(outputFn);
}

require('./co')(main);
