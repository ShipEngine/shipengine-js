// https://typedoc.org/guides/options
module.exports = {
  inputFiles: ['./src'],
  mode: 'modules',
  disableSources: true, // blob changes all the time, so disable
  out: 'docs/api',
};
