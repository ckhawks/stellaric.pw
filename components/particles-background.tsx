"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export function ParticlesBackground() {
  const { theme } = useTheme();

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ff0000",
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
  } as const;

  const options: ISourceOptions = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: theme === "dark" ? "#a50b0bff" : "#8f4949ff",
      //   },
      // },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: {
            value: theme === "dark" ? "#ffffffff" : "#000000ff",
          },
          distance: 208.44356791251798,
          enable: true,
          opacity: theme === "dark" ? 0.3 : 0.3,
          width: 1.3,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 137,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 0,
          random: true,
        },
      },
      detectRetina: true,
    }),
    [theme]
  );

  // return (
  //   <Particles
  //     id="tsparticles"
  //     options={options}
  //     particlesLoaded={particlesLoaded}
  //     className="absolute inset-0"
  //   />
  // );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0"
      />
    );
  }

  return <></>;
}
