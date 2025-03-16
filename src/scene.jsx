import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import terrainVertexShader from './shaders/terrain/vertex.glsl';
import terrainFragmentShader from './shaders/terrain/fragment.glsl';

export default function Scene() {
    const planeGeometryRef = useRef();
    const materialRef = useRef();

    useEffect(() => {
        if (planeGeometryRef.current) {
            planeGeometryRef.current.rotateX(-Math.PI / 2);
            planeGeometryRef.current.rotateY(-Math.PI / 2);
        }
    }, []);


    useFrame(({ clock }) => {
        materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      });

    return (
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
            <planeGeometry ref={planeGeometryRef} args={[40, 40, 500, 500]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={terrainVertexShader}
                fragmentShader={terrainFragmentShader}
                uniforms={{
                    // Vertex Shader Uniforms
                    uWarpFrequency: { value: 4.0 },
                    uWarpStrength: { value: 0.5 },
                    uPositionFrequency: { value: 0.2 }, 
                    uStrength: { value: 2.0 }, 

                    // Fragment Shader Uniforms 
                    uTime: {value: 0},
                    uColorWaterDeep: { value: new THREE.Color('#002b3d') }, 
                    uColorWaterSurface: { value: new THREE.Color('#4a7bb6') }, 
                    uColorSand: { value: new THREE.Color('#b9c1c7') },  
                    uColorGrass: { value: new THREE.Color('#2f5d2a') }, 
                    uColorRock: { value: new THREE.Color('#454148') }, 
                    uColorSnow: { value: new THREE.Color('#b0c4de') }, 
                }}
            />
        </mesh>
    );
}
