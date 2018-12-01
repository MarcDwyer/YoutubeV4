import React from 'react'


export const VideoPlayer = (props) => {
    const darkTheme = props.theme ? 'darkTheme' : 'whiteTheme';
    let theStream;
    if (!props.live) return null;
    // lots of guarding and handles streamers going offline and setting a new stream
     theStream = props.live[Object.keys(props.live)[0]];

    if (props.onStream) {
        theStream = props.live[props.onStream];
    } else if (!theStream || !theStream.vidId) {
        theStream = props.live[Object.keys(props.live)[0]];
    }
    const vidId = theStream.vidId;
    const vidUrl = `https://www.youtube.com/embed/${vidId}?autoplay=1&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1&amp`;
    const url = window.location.hostname;
    const chatUrl = `https://www.youtube.com/live_chat?v=${vidId}&embed_domain=${url}`;
    const { viewers } = theStream;

    return (

        <div className="contentmain" style={!props.theme ? {backgroundColor: '#D6D6D6'} : {backgroundColor: 'black'}}>
        <div className="videoparent">
        <div className={`videonav ${darkTheme}`}>
        <div className="marginnav">
        <span><i className="fa fa-thumbs-up"></i> {theStream.stats.likeCount}</span>
        <span><i className="fa fa-thumbs-down ml-4"></i> {theStream.stats.dislikeCount}</span>
        </div>
        </div>
        <div className={`margincontent ${darkTheme}`}>
        <div className="actualvideo">
        <iframe src={vidUrl} frameBorder="0" />
        </div>
            <div className="topcontent">
        <div className="videocontent mt-2">
        <h4 className="ml-2">{theStream.title}</h4>
        <span><i style={{color: 'red'}} className="fa fa-circle mr-2" />{viewers} Viewers</span>
        </div>
        <div className="body ml-2 mb-2">
        <p>{theStream.description}</p>
        </div>
        </div>
        </div>
        </div>
        <div className="chatter">
         <iframe src={chatUrl} frameBorder="0" />
            </div>
            </div>
    );
}