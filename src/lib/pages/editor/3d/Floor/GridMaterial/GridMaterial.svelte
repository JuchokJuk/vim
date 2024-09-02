<script lang="ts">
	import { T } from '@threlte/core';

	import fragmentShader from './shaders/fragment.glsl?raw';
	import vertexShader from './shaders/vertex.glsl?raw';
	import colors from '$lib/shared/styles/variables/colors/colors.module.scss';
	import { theme } from '$lib/shared/store/theme';
	import { Color, ShaderLib } from 'three';
	import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils.js';

	const uniforms = mergeUniforms([
		ShaderLib.standard.uniforms,
		{
			baseColor: { value: new Color(colors[`${$theme}-surface-0`]) },
			gridColor: { value: new Color(colors[`${$theme}-surface-3`]) }
		}
	]);
</script>

<T.ShaderMaterial
	{vertexShader}
	{fragmentShader}
	lights
	clipping
	{uniforms}
	uniforms.baseColor.value={new Color(colors[`${$theme}-surface-0`])}
	uniforms.gridColor.value={new Color(colors[`${$theme}-surface-3`])}
/>
