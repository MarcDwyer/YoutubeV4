# YoutubeonNodeV2
React-redux version


This app pulls streamer data from the YoutubeAPI. The app updates the streamer's status every 2 minutes and notifies the user if any livestreamers went online. The backend (Node) handles the fetch
requests to Youtubes API hiding my API key and controlling the flow of requests so I dont exceed Youtubes quota. 


Key Files to look at on Node
./routes
./init/getstreams.js

Front End (React-Redux)
./public/reacttube/src


You can also view this app live on fetcherapp.net
