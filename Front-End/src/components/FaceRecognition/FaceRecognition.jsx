import "./FaceRecognition.css";

// import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";

import { useCallback, useEffect, useState, useRef } from "react";

const FaceRecognition = ({ imageURL }) => {
  const imageRef = useRef(null);
  const detectorRef = useRef(null);
  const [detector, setDetector] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState("");
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const detectionIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function loadDetector() {
      setError("");

      try {
        const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
        const detectorConfig = {
          runtime: "tfjs",
          // solutionPath: // Only for MediaPipeFaceDetector
          // "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
          // 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
          // or 'base/node_modules/@mediapipe/face_detection' in npm.
          maxFaces: 10,
          modelType: "short", // or 'full'
        };

        const nextDetector = await faceDetection.createDetector(
          model,
          detectorConfig,
        );

        if (cancelled) {
          nextDetector.dispose();
          return;
        }

        detectorRef.current = nextDetector;
        setDetector(nextDetector);
      } catch (err) {
        setError("Unable to load the face detector.");
        console.error(err);
      } finally {
        if (!cancelled) {
          setIsModelLoading(false);
        }
      }
    }

    loadDetector();

    return () => {
      cancelled = true;
      detectionIdRef.current += 1;
      detectorRef.current?.dispose();
      detectorRef.current = null;
    };
  }, []);

  const detectFaces = useCallback(async () => {
    const image = imageRef.current;

    if (!detector || !image || !image.complete || image.naturalWidth === 0) {
      return;
    }

    setBoxes([]);
    const detectionId = ++detectionIdRef.current;
    setIsDetecting(true);
    setError("");

    try {
      const faces = await detector.estimateFaces(image);
      if (detectionId !== detectionIdRef.current) {
        return;
      }

      const imageRect = image.getBoundingClientRect();

      // estimateFaces returns coordinates in the image element's input space.
      // For an HTMLImageElement, that is its rendered width/height, not its
      // intrinsic (natural) dimensions.
      const inputWidth = image.width;
      const inputHeight = image.height;

      const scaleX = imageRect.width / inputWidth;
      const scaleY = imageRect.height / inputHeight;

      setBoxes(
        faces.map(({ box }) => ({
          left: box.xMin * scaleX,
          top: box.yMin * scaleY,
          width: box.width * scaleX,
          height: box.height * scaleY,
        })),
      );
    } catch (err) {
      if (detectionId === detectionIdRef.current) {
        setError("Unable to detect faces in this image.");
        console.error(err);
      }
    } finally {
      if (detectionId === detectionIdRef.current) {
        setIsDetecting(false);
      }
    }
  }, [detector]);

  useEffect(() => {
    detectionIdRef.current += 1;

    const image = imageRef.current;
    if (
      detector &&
      image &&
      image.getAttribute("src") === imageURL &&
      image.complete
    ) {
      detectFaces();
    }
  }, [detector, imageURL, detectFaces]);

  if (!imageURL) {
    return null;
  }

  return (
    <div className="center ma">
      <div className="face-image-wrapper mt2 mb2">
        <img
          ref={imageRef}
          id="inputimage"
          src={imageURL}
          alt="Image being analyzed"
          onLoad={detectFaces}
          width={500}
          crossOrigin="anonymous"
        />

        {(isModelLoading || isDetecting) && (
          <p className="loading-indicator" role="status">
            {isModelLoading ? "Loading face detector..." : "Detecting faces..."}
          </p>
        )}

        {
          // Loop through the array of boxes
          boxes.map((box, i) => {
            return (
              <div
                key={i}
                className="bounding-box"
                style={{
                  left: box.left,
                  top: box.top,
                  width: box.width,
                  height: box.height,
                }}
              ></div>
            );
          })
        }
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default FaceRecognition;
