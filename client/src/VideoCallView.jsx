import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./index.css";
import axios from "axios";
import { useState } from "react";

const VideoCallView = () => {
  const { meetingId } = useParams();
  const [prediction, setPrediction] = useState("loading...");

  const number = Math.floor(100000 + Math.random() * 900000);
  const peer = useRef(new Peer(number)).current;
  // const peer = useRef(new Peer(number)).current

  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("The generated peer is : ", meetingId);

    peer.on("open", async (id) => {
      console.log("meetingId : ", meetingId);
      console.log("id parameter : ", id);
      await addDoc(collection(db, "calls"), { meetingId, id });
      // setRoomId(id)
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    setInterval(() => {
      captureFrameAndSend();
    }, 1000 / 30);

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          call.answer(stream);

          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        })
        .catch((err) => {
          console.log("Something went wrong on Join Room Use Effect : ", err);
        });
    });
  }, [peer]);

  const makeCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        const call = peer.call(meetingId, stream);

        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      })
      .catch((err) => {
        console.log("Something wrong on Make Call : ", err);
      });
  };

  const captureFrameAndSend = async () => {
    // console.log("Capturing frame...");

    if (!canvasRef.current || !localVideoRef.current) return;

    const canvas = canvasRef.current;
    const video = localVideoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video frame size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data from canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const grayscaleData = new Uint8ClampedArray(
      imageData.width * imageData.height,
    );

    // Convert image to grayscale
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      grayscaleData[i / 4] = gray;
    }

    // Create a new canvas for the grayscale image
    const grayCanvas = document.createElement("canvas");
    grayCanvas.width = 1662;
    grayCanvas.height = 30;
    const grayContext = grayCanvas.getContext("2d");
    const grayImageData = grayContext.createImageData(1662, 30);

    // Resize the grayscale data to fit the new canvas
    for (let y = 0; y < 30; y++) {
      for (let x = 0; x < 1662; x++) {
        const srcX = Math.floor(x * (canvas.width / 1662));
        const srcY = Math.floor(y * (canvas.height / 30));
        const srcIndex = srcY * canvas.width + srcX;
        const dstIndex = y * 1662 + x;
        grayImageData.data[dstIndex * 4] = grayscaleData[srcIndex];
        grayImageData.data[dstIndex * 4 + 1] = grayscaleData[srcIndex];
        grayImageData.data[dstIndex * 4 + 2] = grayscaleData[srcIndex];
        grayImageData.data[dstIndex * 4 + 3] = 255;
      }
    }

    // Draw the resized grayscale image to the canvas
    grayContext.putImageData(grayImageData, 0, 0);

    // Convert the grayscale canvas to a data URL
    const frame = grayCanvas.toDataURL("image/jpeg");

    // Send the frame to the server
    const predictions = await axios.post("http://127.0.0.1:5001/predict", {
      frame,
    });
    let predictedText = "Unknown";

    // Check each prediction and update the state
    if (predictions[0] === 1) {
      predictedText = "hello";
    } else if (predictions[1] === 1) {
      predictedText = "thanks";
    } else if (predictions[2] === 1) {
      predictedText = "ready";
    } else if (predictions[3] === 1) {
      predictedText = "awesome";
    } else if (predictions[4] === 1) {
      predictedText = "i";
    } else if (predictions[5] === 1) {
      predictedText = "i love you";
    }

    setPrediction(predictedText);
  };

  const sendFrameToServer = async (frame) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        frame,
      });
      console.log("Prediction:", response.data);
      // Handle prediction response as needed (update UI, etc.)
    } catch (err) {
      console.error("Error sending frame to server: ", err);
    }
  };

  return (
    <div className="flex flex-col p-12">
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
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <h1>{prediction}</h1>
        </div>
        <div>
          <h2>Remote Video</h2>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
    </div>
  );
};

export default VideoCallView;
