// components/ParticlesComponent.tsx
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
// @ts-ignore
import { ISourceOptions } from "tsparticles";

const ParticlesComponent = () => {
  const particlesInit = useCallback(async (engine: any) => {
    // Initialize particles engine if needed
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // Called when the particles are loaded
  }, []);

  const options: ISourceOptions = {
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 600 }
      },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 4,
        direction: "none",
        random: false
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default ParticlesComponent;
