const fetch = require('node-fetch');
const fs = require('fs');

// server acts as middleman between Youtube API and client, this allows me to hide my api key and control requests.

const API = process.env.KEY;
console.log(API)
const streamList = [
    {name:'Ice', channelId: 'UCv9Edl_WbtbPeURPtFDo-uA'},
    {name:'Mixhound', channelId: 'UC_jxnWLGJ2eQK4en3UblKEw'},
    {name:'Hyphonix', channelId: 'UC4abN4ZiybnsAXTkTBX7now'},
    {name:'Gary', channelId: 'UCvxSwu13u1wWyROPlCH-MZg'},
    {name:'Burger', channelId: 'UC3MAdjjG3LMCG8CV-d7nEQA'},
    {name:'Evan', channelId: 'UCHYUiFsAJ-EDerAccSHIslw'},
    {name:'Lolesports', channelId: 'UCvqRdlKsE5Q8mf8YXbdIJLw'},
    {name:'Chilledcow', channelId: 'UCSJ4gkVC6NrvII8umztf0Ow'},
    {name:'Cxnews', channelId: 'UCStEQ9BjMLjHTHLNA6cY9vg'},
    {name: 'Code', channelId: 'UCvjgXvBlbQiydffZU7m1_aw'},
    {name: 'Joe', channelId: 'UCzQUP1qoWDoEbmsQxvdjxgQ'},
    {name: 'Nasa', channelId: 'UCLA_DiR1FfKNvjuUpBHmylQ'},
    {name: 'CBS', channelId: 'UC8p1vwvWtl6T73JiExfWs1g'},
    {name: 'Pepper', channelId: 'UCdSr4xliU8yDyS1aGnCUMTA'}
];

giveList();
setInterval(giveList, 120000)
    async function giveList() {
        console.log('running...');
try {
  const data = await Promise.all(streamList.map(async (item) => {
      const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${item.channelId}&eventType=live&type=video&key=${API}`);
      const dataFetch = await fetchData.json();
      dataFetch.name = item.name;
      dataFetch.channelId = item.channelId;
      return dataFetch;
  }));
  fs.writeFile('./fetch/all.json', JSON.stringify(data), (err) => {
      if (err) throw err;
  })
    console.log(data)
  const liveStreams = data.filter(item => !item.pageInfo.totalResults == 0);

  const liveData = await Promise.all(liveStreams.map(async (item) => {
      const vidid = item.items[0].id.videoId;
      const fetchData = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+snippet%2C+liveStreamingDetails&id=${vidid}&key=${API}`);
      const dataFetch = await fetchData.json();
b

      const custObj = {
          name: item.name,
          channelId: item.channelId,
          title: dataFetch.items[0].snippet.title,
          description: dataFetch.items[0].snippet.description,
          viewers: dataFetch.items[0].liveStreamingDetails.concurrentViewers,
          stats: dataFetch.items[0].statistics,
          vidId: dataFetch.items[0].id
      };
      return custObj;
  }));
  const sortedData = liveData.sort((a, b) => +a.viewers < +b.viewers ? 1 : -1);
   fs.writeFile('./fetch/livestreams.json', JSON.stringify(sortedData), (err) => {
        if (err) throw err
        console.log('File has been saved');
    })
} catch(err) {
  console.log(err);
}

  }
// export streamer array, and write live streamers statistics and status to a json stored in /fetch folder
  module.exports = {
      streamers: streamList
  };
