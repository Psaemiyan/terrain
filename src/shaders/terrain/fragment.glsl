uniform vec3 uSurfaceColorWater;
uniform vec3 uDeepColorWater;
uniform vec3 uColorSand;
uniform vec3 uColorGrass;
uniform vec3 uColorSnow;
uniform vec3 uColorRock;
uniform float uTime;

varying vec3 vPosition;
varying float vUpDot;

#include ../simplexNoise2d.glsl

vec3 getGrassColor(vec2 position) {
    float speed = 0.05;
    float noise = simplexNoise2d(position * 0.15 + vec2(uTime * speed, 0.0));
    noise = smoothstep(0.4, 0.6, noise);
    return mix(vec3(0.3, 0.5, 0.2), vec3(0.2, 0.35, 0.2), noise);
}

void main() {
    vec3 color = vec3(1.0);

    // Water transition
    float surfaceWaterMix = smoothstep(-1.0, -0.1, vPosition.y);
    color = mix(uDeepColorWater, uSurfaceColorWater, surfaceWaterMix);

    // Sand 
    float sandMix = step(-0.1, vPosition.y);
    color = mix(color, uColorSand, sandMix);

    // Grass 
    float grassHeight = -0.06; 
    float grassMix = smoothstep(grassHeight - 0.02, grassHeight + 0.02, vPosition.y);
    vec3 grassColor = getGrassColor(vPosition.xz);
    color = mix(color, grassColor, grassMix);

    //rock
    float rockThreshold = 0.15;
    rockThreshold += simplexNoise2d(vPosition.xz) * 0.1;
    float rockMix = step(rockThreshold, vPosition.y);

    // Blending the rock and grass
    float blendThreshold = 0.02;  // Wider threshold for a smoother blend
    float blendedRockMix = smoothstep(grassHeight - blendThreshold, grassHeight + blendThreshold, vPosition.y);
    color = mix(color, uColorRock, rockMix * blendedRockMix);

    // Snow 
    float snowThreshold = 0.45;
    snowThreshold += simplexNoise2d(vPosition.xz * 15.0) * 0.1;
    float snowMix = step(snowThreshold, vPosition.y);
    color = mix(color, uColorSnow, snowMix);

    gl_FragColor = vec4(color, 1.0);
}


