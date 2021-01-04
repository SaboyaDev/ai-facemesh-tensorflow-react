// - Install dependencies DONE
// - Import dependencies DONE
// - Setup Webcam and canvas DONE
// - Define references to the webcam and canvas DONE
// - Load faceLandmarksDetection
// - Detect function
// - Drawing utilities
// - Load triangulation
// - Setup triangle path
// - Setup point drawing
// - Add drawMesh to detect function

// useRef allows to have a reference to our
// canvas component as well as our webcam
import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import WebCam from 'react-webcam';
import {drawFaceLandmarks} from './utilities'

import './App.css';

function App() {
	// Setup references
	const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Load faceLandmarksDetection
  const runFaceLandmarksDetection = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    )
    setInterval(() => {
      detect(model)
    }, 1)
  }
  // Detect function
  const detect = async (model) => {
    // if statement to make sure you have a camera signal
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight
    
      // Set video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas dimensions
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make detection
      const predictions = await model.estimateFaces({ input: video })
      console.log(predictions);

      // Get canvas context for drawing
      const canvasCtx = canvasRef.current.getContext('2d')
      requestAnimationFrame(() => drawFaceLandmarks(predictions, canvasCtx))
    }
  }
  
  useEffect(() => {runFaceLandmarksDetection()}, [])
    

	return (
		<div className='App'>
			<header className='App-header'>
				<WebCam ref={webcamRef} className='webcam' />
				<canvas ref={canvasRef} className='canvas' />
			</header>
		</div>
	);
}

export default App;
