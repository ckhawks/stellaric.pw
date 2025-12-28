"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Model {
  name: string;
  file: string;
  polycount: string;
  useMatcap?: boolean;
}

interface ModelViewerCanvasProps {
  model: Model;
  wireframe: boolean;
  autoRotate: boolean;
}

function ModelContent({
  model,
  wireframe,
  autoRotate,
}: {
  model: Model;
  wireframe: boolean;
  autoRotate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Load the model
  const gltf = useGLTF(model.file);

  // Load rainbow matcap texture
  const matcapTexture = useTexture(
    "https://raw.githubusercontent.com/nidorx/matcaps/master/1024/7877EE_D87FC5_75D9C7_1C78C0.png"
  );

  useEffect(() => {
    if (group.current && gltf.scene) {
      // Clone the scene to avoid state issues
      const clonedScene = gltf.scene.clone();
      group.current.clear();
      group.current.add(clonedScene);

      // Check if model has materials and apply matcap if needed
      let hasMaterials = false;
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mat = child.material as THREE.Material;
          // Check if material has color/map (proper material)
          if (
            (mat instanceof THREE.MeshStandardMaterial ||
              mat instanceof THREE.MeshPhongMaterial) &&
            (mat.map || (mat instanceof THREE.MeshPhongMaterial && mat.specularMap))
          ) {
            hasMaterials = true;
          }
        }
      });

      // Apply matcap if: explicitly enabled OR (no materials found AND not explicitly disabled)
      const shouldUseMatcap =
        model.useMatcap === true ||
        (model.useMatcap !== false && !hasMaterials);

      if (shouldUseMatcap && matcapTexture) {
        clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshMatcapMaterial({
              matcap: matcapTexture,
            });
          }
        });
      }

      // Center and fit model in view
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      clonedScene.position.sub(center);

      // Calculate camera position to fit entire model
      const maxDim = Math.max(size.x, size.y, size.z);
      const perspCamera = camera as THREE.PerspectiveCamera;
      const fov = perspCamera.fov * (Math.PI / 180);
      let cameraZ = maxDim / 2 / Math.tan(fov / 2);

      perspCamera.position.z = cameraZ * 1.5;
      perspCamera.lookAt(clonedScene.position);

      return;
    }
  }, [gltf.scene, camera, matcapTexture]);

  // Apply wireframe to all materials
  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.wireframe = wireframe;
            });
          } else {
            child.material.wireframe = wireframe;
          }
        }
      });
    }
  }, [wireframe]);

  // Handle auto-rotation
  useFrame((state) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

function SceneBackground() {
  const { scene } = useThree();

  useEffect(() => {
    // Set a dark background for better contrast
    scene.background = new THREE.Color(0x676767);
    return () => {
      scene.background = null;
    };
  }, [scene]);

  return null;
}

export default function ModelViewerCanvas({
  model,
  wireframe,
  autoRotate,
}: ModelViewerCanvasProps) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 50,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true,
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneBackground />
      <ambientLight intensity={1.2} />
      {/* Sunlight from upper right */}
      <directionalLight
        position={[8, 10, 8]}
        intensity={2}
        castShadow={false}
      />
      {/* Fill light from opposite direction */}
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <ModelContent
        model={model}
        wireframe={wireframe}
        autoRotate={autoRotate}
      />
      <OrbitControls autoRotate={autoRotate} autoRotateSpeed={4} makeDefault />
    </Canvas>
  );
}
