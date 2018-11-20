import React, { Component } from 'react'


export const VideoPlayer = (props) => {
    if (!props.live) return null;
    const theStream = props.live[props.onStream];
    console.log(props);
    const vidId = props.onStream ? theStream.items[0].id : props.live[0].items[0].id;
     const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
     const url = window.location.hostname;
    const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;
    return (
        <div className="contentmain">
        <div className="videoparent">
        <div className="actualvideo">

        <iframe src={vidUrl} frameBorder="0"></iframe>

        </div>
        </div>
        <div className="chatter">
         <iframe src={chatUrl} frameBorder="0"></iframe>
            </div>
            </div>
    );
}