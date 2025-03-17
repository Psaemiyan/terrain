import { Clouds, Cloud } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sky() {
  const cloudCount = 9;
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const newClouds = Array.from({ length: cloudCount }, () => ({
      initialX: Math.random() * 40 - 20,
      y: Math.random() * 8 + 13,
      z: Math.random() * 30 - 20,
      speed: Math.random() * 0.5 + 0.2,
    }));

    setClouds(newClouds);
  }, []);

  return (
    <Clouds>
      {clouds.map((cloud, i) => (
        <Puffycloud key={i} cloud={cloud} />
      ))}
    </Clouds>
  );
}

const Puffycloud = ({ cloud }) => {
  const { initialX, y, z, speed } = cloud;
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      ref.current.position.x = initialX - (time * speed * 2) % 50;

      const opacity = ref.current.position.x < -15 ? 0.1 : 0.8;
      
      ref.current.traverse((child) => {
        if (child.material) {
          child.material.opacity = opacity;
        }
      });

      if (ref.current.position.x < -20) {
        ref.current.position.x = 25;
      }
    }
  });

  return (
    <group ref={ref} position={[initialX, y, z]}>
      <Cloud scale={1} speed={0.5} opacity={0.8} />
    </group>
  );
};
