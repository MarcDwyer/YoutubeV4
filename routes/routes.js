const router = require('express').Router();
const _ = require('lodash');
const fs = require('fs');
const { streamers } = require('../init/getstreams');

router.get('/live', (req, res) => {
  fs.readFile('./fetch/livestreams.json', 'utf8', (err, data) => {
    if (err) throw err
      res.send(data)
  });
})

router.get('/all', (req, res) => {
  res.send(JSON.stringify(_.shuffle(streamers)));
})

module.exports = router;
