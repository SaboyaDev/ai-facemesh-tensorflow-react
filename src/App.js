// - Install dependencies DONE
// - Import dependencies DONE
// - Setup Webcam and canvas DONE
// - Define references to the webcam and canvas DONE
// - Load Facemesh
// - Detect function
// - Drawing utilities
// - Load triangulation
// - Setup triangle path
// - Setup point drawing
// - Add drawMesh to detect function

// useRef allows to have a reference to our
// canvas component as well as our webcam
import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import WebCam from 'react-webcam';

import './App.css';

function App() {
	// Setup references
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

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
