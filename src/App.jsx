import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";

import { useCallback, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

function App() {
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
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition />*/}
    </ParticlesProvider>
  );
}

export default App;
