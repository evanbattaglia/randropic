const childProcess = require('child_process');

module.exports = {
  flatten: list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []),
  escapeShellArg: cmd => '\'' + cmd.replace(/\'/g, "'\\''") + '\'',
  exec(...args) {
    childProcess.execSync(module.exports.flatten(args).map(escapeShellArg).join(' '));
  },
};
