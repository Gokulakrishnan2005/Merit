import React, { useRef } from 'react'
import './VideoPlayer.css'

const VideoPlayer = ({playState, setPlayState}) => {

    const player = useRef(null);

    const closePlayer = (e)=>{
        if(e.target === player.current){
           setPlayState(false); 
        }
    }

  return (
    <div className={`video-player ${playState?'':'hide'}`} ref={player} onClick={closePlayer}>
      <video src="https://firebasestorage.googleapis.com/v0/b/my-first-project-6eebf.appspot.com/o/videoplayback.mp4?alt=media&token=3b245694-9ca2-4443-8371-4a83c0e4be7f" autoPlay muted controls></video>
    </div>
  )
}

export default VideoPlayer
