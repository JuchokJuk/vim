uniform vec3 color;
const float shadowOpacity = 0.2;

#include <common>

varying vec3 worldPosition;

uniform vec3 gridColor;
uniform vec3 baseColor;

float getGrid(float size) {
    vec2 r = worldPosition.xz / size;
    
    vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
    float line = min(grid.x, grid.y);
    
    return clamp(1.0 - min(line, 1.0), 0.0, 1.0);
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

void main() {

	float g1 = getGrid(1.0);

    vec4 shadowColor = vec4( color, shadowOpacity * ( 1.0 - getShadowMask() ) );

    vec4 grid = vec4(g1 * gridColor, g1);

    gl_FragColor = blendNormal(vec4(baseColor, 1.0), blendNormal(grid, shadowColor));

	#include <colorspace_fragment>
}