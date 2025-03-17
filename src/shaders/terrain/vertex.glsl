uniform float uTime;
uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;

varying vec3 vPosition;
varying float vUpDot;

#include ../simplexNoise2d.glsl

float getElevation(vec2 position) {
    vec2 warpedPosition = position;
    warpedPosition += simplexNoise2d(warpedPosition * uPositionFrequency * uWarpFrequency) * uWarpStrength;
    
    float elevation = 0.0;
    elevation += simplexNoise2d(warpedPosition * uPositionFrequency      ) / 2.0;
    elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 2.0) / 4.0;
    elevation += simplexNoise2d(warpedPosition * uPositionFrequency * 4.0) / 8.0;

    float elevationSign = sign(elevation);
    elevation = pow(abs(elevation), 2.0) * elevationSign;
    elevation *= uStrength;

    return elevation;
}

void main() {
    vec3 modifiedPosition = position;

    // Compute Elevation for Main Position
    float elevation = getElevation(modifiedPosition.xz);
    modifiedPosition.y += elevation;

    // Neighbor Positions for Normal Calculation
    float shift = 0.01;
    vec3 positionA = position + vec3(shift, 0.0, 0.0);
    vec3 positionB = position + vec3(0.0, 0.0, -shift);

    // Ensure Consistent Elevation Calculation
    positionA.y += getElevation(positionA.xz);
    positionB.y += getElevation(positionB.xz);

    // Compute Normal Correctly
    vec3 toA = normalize(positionA - modifiedPosition);
    vec3 toB = normalize(positionB - modifiedPosition);
    vec3 normal = normalize(cross(toA, toB));

    // Set Varyings
    vPosition = modifiedPosition;
    vUpDot = dot(normal, vec3(0.0, 1.0, 0.0));

    // Final Position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(modifiedPosition, 1.0);
}
