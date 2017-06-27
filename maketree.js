const db = require('./dropboxconfig.js');
const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

function *allfiles(path, array=[]) {
  const listing = yield db.filesListFolder({ path });
  for (const entry of listing.entries) {
    if (entry['.tag'] === 'file') {
      console.log(entry.path_lower); //array.push(entry.path_lower);
    } else if (entry['.tag'] === 'folder') {
      yield allfiles(entry.path_lower, array);
    }
  }
  return array;
}

function *main() {
  yield allfiles("/bitcasa/photos/places/");
}

require('./co')(main);
