import { useRef } from 'react';
import { useEffect } from 'react';
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


    return (
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
            <planeGeometry ref={planeGeometryRef} args={[20, 20, 500, 500]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={terrainVertexShader}
                fragmentShader={terrainFragmentShader}
                uniforms={{
                    // Vertex Shader Uniforms
                    uWarpFrequency: { value: 5.0 },
                    uWarpStrength: { value: 0.2 },
                    uPositionFrequency: { value: 0.2 }, 
                    uStrength: { value: 3.5 }, 

                    // Fragment Shader Uniforms 
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
