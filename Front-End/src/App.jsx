import "./App.css";

import { useCallback, useMemo, useState } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SigIn";
import Register from "./components/Register/Register";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  function loadUser(userData) {
    setUser(userData);
  }

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function onButtonSubmit() {
    setImageURL(input);
  }

  function onRouteChange(nextRoute) {
    if (nextRoute === "signout") {
      setIsSignedIn(false);
      setImageURL("");
      setInput("");
      setRoute("signin");
    } else if (nextRoute === "signin") {
      setIsSignedIn(false);
      setImageURL("");
      setInput("");
      setRoute("signin");
    } else if (nextRoute === "register") {
      setIsSignedIn(false);
      setImageURL("");
      setInput("");
      setRoute("register");
    } else if (nextRoute === "home") {
      setIsSignedIn(true);
      setImageURL("");
      setInput("");
      setRoute("home");
    }
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
          <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          {route === "home" ? (
            <>
              <Logo />
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
              {imageURL && <FaceRecognition imageURL={imageURL} />}
            </>
          ) : route === "signin" ? (
            <>
              <Logo />
              <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
            </>
          ) : (
            <>
              <Logo />
              <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            </>
          )}
        </main>
      </ParticlesProvider>
    </div>
  );
}

export default App;
