const express = require('express');
const bodyParser = require('body-parser');
const { HoverflyServer: Hoverfly } = require('../hoverfly-server');

const createApp = (port = 9877, app = express()) => {
  app.use(bodyParser.json());
  app.post('/import', async (req, res, next) => {
    const path = req.body.path;
    if (!path) {
      return res.status(400).json({ message: 'No path sent!' });
    }
    try {
      await Hoverfly.import(path);
      res.status(200).json({ message: `imported: ${path}` });
    } catch (err) {
      return next(err);
    }
  });

  app.post('/start', async (req, res, next) => {
    try {
      await Hoverfly.start();
      res.status(200).json({ message: 'started!' });
    } catch (err) {
      return next(err);
    }
  });

  app.post('/stop', async (req, res, next) => {
    try {
      await Hoverfly.stop();
      res.status(200).json({ message: 'stopped!' });
    } catch (err) {
      return next(err);
    }
  });
  return app.listen(port);
};

module.exports = {
  createApp,
};
