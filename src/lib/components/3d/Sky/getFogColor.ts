import * as THREE from 'three';

/**
 * Calculate a simplified fog color based on the elevation.
 * 
 * @param elevation - The elevation angle in degrees (0° at the horizon, 90° directly overhead).
 * @returns The calculated fog color as a THREE.Color.
 */
export function getFogColor(elevation: number): THREE.Color {
  // Normalize the elevation to a range of 0.0 to 1.0
  const normalizedElevation = THREE.MathUtils.clamp(elevation / 90, 0, 1);

  // Define base colors for low and high elevation
  const horizonColor = new THREE.Color(0xffa07a); // Light salmon (represents warm colors near the horizon)
  const zenithColor = new THREE.Color(0x87ceeb); // Sky blue (represents the color at the zenith)

  // Interpolate between the horizon color and the zenith color based on elevation
  const fogColor = horizonColor.lerp(zenithColor, normalizedElevation);

  return fogColor;
}