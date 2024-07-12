import { useState, useRef, useEffect } from 'react'
import Peer from 'peerjs'
import './index.css';

const JoinRoom = () => {

  const [peerId, setPeerId] = useState(null)
  const [roomId, setRoomId] = useState("")
  const remoteVideoRef = useRef(null)
  const localVideoRef = useRef(null)

  // Generate a random 6-digit number
  const number = Math.floor(100000 + Math.random() * 900000);

  const peer = useRef(new Peer(number)).current

  useEffect(() => {
    console.log("The generated peer is : ", number)

    peer.on('open', id => {
      setRoomId(id)
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
        const call = peer.call(roomId, stream)

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
        <h1>PeerJS Video Call</h1>
        <div>
          <h2>Your ID: {peerId}</h2>
          <input
            type="text"
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            placeholder="Enter peer ID to call"
          />
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

export default JoinRoom;
