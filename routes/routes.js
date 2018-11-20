const router = require('express').Router();
const fs = require('fs');
const { liveData, streamers } = require('../init/getstreams');

    (async () => {
    let data =  await liveData();
    setInterval(async () => data = await liveData(), 500000)
    router.get('/live', (req, res) => {
        res.send(JSON.stringify(data));
    })
  })();

router.get('/all', (req, res) => {
  res.send(JSON.stringify(streamers));
})

module.exports = router;
