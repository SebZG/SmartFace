import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

import { useCallback, useMemo, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = userState("");
  const [boxes, setBoxes] = userState([]);
  const [route, setRoute] = userState("");
  const [isSignedIn, setIsSignedIn] = userState(Boolean);
  const [user, setUser] = userState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  function loadUser({ id, name, email, entries, joined }) {
    setUser({
      user: {
        id,
        name,
        email,
        entries,
        joined,
      },
    });
  }

  function createBoundingBox(pixelBox, imageWidth, imageHeight) {
    return {
      left_col: pixelBox.xmin / imageWidth,
      top_row: pixelBox.ymin / imageHeight,
      right_col: pixelBox.xmax / imageWidth,
      bottom_row: pixelBox.ymax / imageHeight,
    };
  }

  function calculateFaceLocation(data) {
    // Get ALL items labeled "person" instead of just the first one
    const personItems = data.filter((item) => item.label === "person");

    // With new HuggingFace API we need display width as well as original image width
    const image = document.getElementById("inputimage");
    const originalWidth = Number(image.naturalWidth);
    const originalHeight = Number(image.naturalHeight);
    const width = Number(image.width);
    const height = Number(image.height);

    // Loop through every person found and calculate their box
    const boundingBoxes = personItems.map((person) => {
      const face = createBoundingBox(person.box, originalWidth, originalHeight);
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

    return boundingBoxes;
  }

  function displayFaceBox(boxes) {
    setBoxes(boxes);
  }

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function onButtonSubmit() {
    setImageURL(input);
    const sendImageToHuggingFaceWithFetch = async (imageURL) => {
      const imageRes = await fetch(imageURL);
      const imageBlob = await imageRes.blob();
      const contentType = imageRes.headers.get("content-type");

      const apiResponse = await fetch(
        "https://router.huggingface.co/hf-inference/models/facebook/detr-resnet-50",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${"YOUR_API_KEY_HERE"}`,
            "Content-Type": contentType,
          },
          body: imageBlob,
        },
      );

      const result = await apiResponse.json();
      console.log(result);
      displayFaceBox(calculateFaceLocation(result));
    };

    sendImageToHuggingFaceWithFetch(input);
  }

  function onRouteChange(route) {
    route === "signout"
      ? setIsSignedIn(false)
      : route === "home"
        ? setIsSignedIn(true)
        : setIsSignedIn(false);

    setRoute(route);
  }

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles container loaded", container);
  }, []);

  const options = useMemo(
    () => ({
      key: "backgroundCanvas",
      name: "Background Canvas",
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
          },
        },
        paint: {
          fill: {
            color: {
              value: "#f0f0f0",
            },
            enable: true,
          },
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#f0f0f0",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
          },
        },
      },
      background: {},
    }),
    [],
  );

  return (
    <div className="App">
      <ParticlesProvider init={particlesInit}>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
        <main className="app-content">
          <Navigation />
          {route === "home" ? (
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm />
              {/* <FaceRecognition />*/}
            </div>
          ) : route === "signin" ? (
            <Signin />
          ) : (
            <Register />
          )}
        </main>
      </ParticlesProvider>
    </div>
  );
}

export default App;
