import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './index.css';

const VideoCallView = () => {

  const { meetingId } = useParams()

  const number = Math.floor(100000 + Math.random() * 900000);
  const peer = useRef(new Peer(number)).current
  // const peer = useRef(new Peer(number)).current

  const remoteVideoRef = useRef(null)
  const localVideoRef = useRef(null)

  useEffect(() => {
    console.log("The generated peer is : ", meetingId)

    peer.on('open', async id => {
      console.log("meetingId : ", meetingId)
      console.log("id parameter : ", id)
      await addDoc(collection(db, 'calls'), { meetingId, id });
      // setRoomId(id)
    })

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
      })

    peer.on('call', call => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream
          }
          call.answer(stream)

          call.on('stream', remoteStream => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream
            }
          })
        })
        .catch(err => {
          console.log("Something went wrong on Join Room Use Effect : ", err)
        })
    })
  }, [peer])

  const makeCall = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        const call = peer.call(meetingId, stream)

        call.on('stream', remoteStream => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream
          }
        })
      })
      .catch(err => {
        console.log("Something wrong on Make Call : ", err)
      })
  }

  return (
    <div className='flex flex-col p-12'>
      <div className="App">
        <h1>Welcome To The Meeting</h1>
        <div>
          <h2>Your ID: {meetingId}</h2>
          {/* <input
            type="text"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            placeholder="Enter peer ID to call"
          />
          <button>Call</button> */}
          <button onClick={makeCall}>Call</button>
        </div>
        <div>
          <h2>Local Video</h2>
          <video ref={localVideoRef} autoPlay playsInline muted />
        </div>
        <div>
          <h2>Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
    </div>
  );

}

export default VideoCallView;
