import React, { Component } from 'react'


export const VideoPlayer = (props) => {
    if (!props.live) return null;

    let theStream = props.live[Object.keys(props.live)[0]];

    if (props.onStream) {
        theStream = props.live[props.onStream];
    }
    console.log(theStream);
    const vidId = theStream.vidId;
     const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
     const url = window.location.hostname;
    const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;
    const { viewers } = theStream;
    return (
        <div className="contentmain">
        <div className="videoparent">
        <div className="margincontent">
        <div className="actualvideo">
        <iframe src={vidUrl} frameBorder="0"></iframe>
        </div>
        <div className="videocontent mt-2">
        <h4 className="ml-2">{theStream.title}</h4>
        <span>{viewers} Viewers</span>
        </div>
        <div className="body">
        <p>{theStream.description}</p>
        </div>
        </div>
        </div>
        <div className="chatter">
         <iframe src={chatUrl} frameBorder="0"></iframe>
            </div>
            </div>
    );
}