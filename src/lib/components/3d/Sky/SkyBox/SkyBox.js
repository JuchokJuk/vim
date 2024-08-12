import { BackSide, BoxGeometry, Mesh, ShaderMaterial, UniformsUtils, Vector3 } from 'three';
import vertexShader from './shaders/vertexShader.glsl?raw';
import fragmentShader from './shaders/fragmentShader.glsl?raw';

/**
 * Based on "A Practical Analytic Model for Daylight"
 * aka The Preetham Model, the de facto standard analytic skydome model
 * https://www.researchgate.net/publication/220720443_A_Practical_Analytic_Model_for_Daylight
 *
 * First implemented by Simon Wallner
 * http://simonwallner.at/project/atmospheric-scattering/
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
 */

class SkyBox extends Mesh {
	constructor() {
		const shader = SkyBox.SkyShader;

		const material = new ShaderMaterial({
			name: shader.name,
			uniforms: UniformsUtils.clone(shader.uniforms),
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader,
			side: BackSide,
			depthWrite: false
		});

		super(new BoxGeometry(1, 1, 1), material);

		this.isSky = true;
	}
}

SkyBox.SkyShader = {
	name: 'SkyShader',

	uniforms: {
		turbidity: { value: 2 },
		rayleigh: { value: 1 },
		mieCoefficient: { value: 0.005 },
		mieDirectionalG: { value: 0.8 },
		sunPosition: { value: new Vector3() },
		up: { value: new Vector3(0, 1, 0) }
	},

	vertexShader,
	fragmentShader
};

export { SkyBox };
