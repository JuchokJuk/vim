#include <common>

varying vec3 worldPosition;

#include <shadowmap_pars_vertex>

void main() {
	#include <beginnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>

    vec3 pos = position.xzy;

    worldPosition = pos;
    
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
}