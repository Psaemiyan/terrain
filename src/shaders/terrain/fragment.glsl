uniform vec3 uColorWaterDeep;
uniform vec3 uColorWaterSurface;
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
    vec3 grassBaseColor = mix(vec3(0.3, 0.5, 0.2), vec3(0.2, 0.35, 0.2), noise); 
    return grassBaseColor;
}

float getRipple(vec2 position, float time) {
    float speed = 0.5;
    float frequencyX = 0.2;
    float frequencyZ = 0.25; 
    float amplitude = 0.05; 
    float rippleX = sin(position.x * frequencyX + time * speed) * amplitude;
    float rippleZ = sin(position.y * frequencyZ + time * speed) * amplitude;  
    return rippleX + rippleZ;
}



void main()
{
    // Base color
    vec3 color = vec3(1.0);

    // Water
    float rippleEffect = getRipple(vPosition.xz, uTime);
    vec3 distortedPosition = vPosition;
    distortedPosition.y += rippleEffect;
    float surfaceWaterMix = smoothstep(- 1.0, - 0.1, distortedPosition.y);
    color = mix(uColorWaterDeep, uColorWaterSurface, surfaceWaterMix);

    // Sand transition
    float sandMix = step(- 0.1, vPosition.y);
    color = mix(color, uColorSand, sandMix);

    // Grass transition
    float grassMix = step(-0.02, vPosition.y);
    vec3 grassColor = getGrassColor(vPosition.xz); 
    color = mix(color, grassColor, grassMix);


    // Rock transition
    float rockMix = vUpDot;
    rockMix = 1.0 - step(0.8, rockMix);
    rockMix *= step(- 0.06, vPosition.y);
    color = mix(color, uColorRock, rockMix);


    // Snow transition
    float snowThreshold = 0.65;
    snowThreshold += simplexNoise2d(vPosition.xz * 15.0) * 0.1;
    float snowMix = step(snowThreshold, vPosition.y);
    color = mix(color, uColorSnow, snowMix);

    // Final output color
    gl_FragColor = vec4(color, 1.0);
}

