import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import terrainVertexShader from './shaders/terrain/vertex.glsl';
import terrainFragmentShader from './shaders/terrain/fragment.glsl';

export default function Scene({ isDay }) {
    const planeGeometryRef = useRef();
    const materialRef = useRef();

    useEffect(() => {
        if (planeGeometryRef.current) {
            planeGeometryRef.current.rotateX(-Math.PI / 2);
            planeGeometryRef.current.rotateY(-Math.PI / 2);
        }
    }, []);

    const dayColors = {
        deepWater: new THREE.Color('#002b3d'),
        surfaceWater: new THREE.Color('#4a7bb6'),
        sand: new THREE.Color('#b9c1c7'),
        grass: new THREE.Color('#85d534'),
        rock: new THREE.Color('#7f8386'),
        snow: new THREE.Color('#b0c4de'),
    };

    const nightColors = {
        deepWater: new THREE.Color('#0a1623'),   // Dark navy with a subtle teal tint for depth  
        surfaceWater: new THREE.Color('#1b3552'), // Deep blue for subtle night reflections  
        sand: new THREE.Color('#5e6971'),        // Darker but still visible  
        grass: new THREE.Color('#235022'),       // Dark forest green, natural but not too bright  
        rock: new THREE.Color('#3a3f4a'),        // Dark gray with a blue undertone for a moody effect  
        snow: new THREE.Color('#6f7f8d'),        // Cool grayish-blue to blend with the night scene  
    };
    

    const colors = isDay ? dayColors : nightColors;

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.needsUpdate = true; 
            materialRef.current.uniforms.uSurfaceColorWater.value = colors.surfaceWater;
            materialRef.current.uniforms.uDeepColorWater.value = colors.deepWater;
            materialRef.current.uniforms.uColorSand.value = colors.sand;
            materialRef.current.uniforms.uColorGrass.value = colors.grass;
            materialRef.current.uniforms.uColorRock.value = colors.rock;
            materialRef.current.uniforms.uColorSnow.value = colors.snow;
        }
    }, [isDay, colors]);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
            <planeGeometry ref={planeGeometryRef} args={[40, 40, 1000, 1000]} />
            <shaderMaterial
                ref={materialRef}
                key={isDay ? 'day' : 'night'} 
                vertexShader={terrainVertexShader}
                fragmentShader={terrainFragmentShader}
                uniforms={{
                    uWarpFrequency: { value: 5.0 },
                    uWarpStrength: { value: 0.5 },
                    uPositionFrequency: { value: 0.2 },
                    uStrength: { value: 2.0 },

                    uTime: { value: 0.0 },
                    uTimeOfDay: { value: isDay ? 1.0 : 0.0 },
                    uSurfaceColorWater: { value: colors.surfaceWater },
                    uDeepColorWater: { value: colors.deepWater },
                    uColorSand: { value: colors.sand },
                    uColorGrass: { value: colors.grass },
                    uColorRock: { value: colors.rock },
                    uColorSnow: { value: colors.snow },
                }}
            />
        </mesh>
    );
}
