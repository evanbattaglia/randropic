module.exports = main => require('co')(main).catch(err => {
  console.error("Error:");
  console.error(err);
  console.error(err.stack);
});
