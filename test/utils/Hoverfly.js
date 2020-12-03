module.exports = {
  Hoverfly:
    typeof window === 'undefined'
      ? require('./hoverfly-server').HoverflyServer
      : require('./hoverfly-browser').HoverflyBrowser,
};
