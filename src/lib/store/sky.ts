import { writable } from 'svelte/store';
import { Mesh } from 'three';

export const sky = writable({
	azimuth: 0,
	elevation: 90,
	sunMesh: new Mesh()
});
