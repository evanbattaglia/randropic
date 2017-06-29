const db = require('./dropboxconfig.js');

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
