const router = require('express').Router();
const fs = require('fs');
const _ = require('lodash');
const { liveData, streamers } = require('../init/getstreams');

    (async () => {
    let data =  await liveData();
    setInterval(async () => data = await liveData(), 85000)
    router.get('/live', (req, res) => {
        res.send(JSON.stringify(data));
    })
  })();

router.get('/all', (req, res) => {

  res.send(JSON.stringify(_.shuffle(streamers)));
})

module.exports = router;
