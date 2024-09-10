uniform vec3 color;
const float shadowOpacity = 0.2;
const float gridOpacity = 0.2;

#include <common>

varying vec3 worldPosition;

uniform vec3 gridColor;
uniform vec3 baseColor;

float getGrid(float size) {
    vec2 r = worldPosition.xz / size;
    
    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
    float line = min(grid.x, grid.y);
    
    return 1.0 - min(line, 1.0);
}

vec4 blendNormal(vec4 base, vec4 blend){
  return vec4(
    blend.rgb * blend.a + base.rgb * (1.0 - blend.a),
    1.0 - (1.0 - blend.a) * (1.0 - base.a)
  );
}

#include <packing>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

const float near = 0.01;
const float far = 1.0;
const float gridHorizon = 16.0;

float linearizeDepth(float depth) {
    float z = depth * 2.0 - 1.0; // Back to NDC 
    return (2.0 * near * far) / (far + near - z * (far - near));
}

void main() {
  float depth = gl_FragCoord.z; // Depth in NDC
  float linearDepth = linearizeDepth(depth); // Linear depth if needed

  float g1 = getGrid(1.0) * (1.0 - linearDepth) * gridHorizon;
  g1 = clamp(g1, 0.0, 1.0);

  vec4 shadowColor = vec4( color, shadowOpacity * ( 1.0 - getShadowMask() ) );

  vec4 grid = vec4(g1 * gridColor, g1 * gridOpacity);

  gl_FragColor = blendNormal(blendNormal(vec4(baseColor, 1.0), grid), shadowColor);

  #include <colorspace_fragment>
}