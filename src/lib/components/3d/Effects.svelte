<script lang="ts">
	import { useTask, useThrelte } from '@threlte/core';

	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		BloomEffect,
		SMAAEffect,
		SMAAPreset
	} from 'postprocessing';
	// @ts-ignore
	import { N8AOPostPass } from 'n8ao';
	import { performanceSettings } from '$lib/store/performanceSettings';
	import { onMount } from 'svelte';

	const { renderStage, autoRender, scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer, {
		depthBuffer: true
	});

	const smaaEffect = new SMAAEffect({
		preset: SMAAPreset.LOW
	});

	const bloomEffect = new BloomEffect({
		luminanceThreshold: 0.99,
		luminanceSmoothing: 0.025,
		mipmapBlur: true,
		intensity: 4,
		radius: 1,
		levels: 4
	});

	$: {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, $camera));

		const effects = [];
		if ($performanceSettings.postProcessing.settings!.antiAliasing.enabled) {
			effects.push(smaaEffect);
		}
		if ($performanceSettings.postProcessing.settings!.bloom.enabled) {
			effects.push(bloomEffect);
		}

		composer.addPass(new EffectPass($camera, ...effects));

		if ($performanceSettings.postProcessing.settings!.ambientOcclusion.enabled) {
			const n8aoPostPass = new N8AOPostPass(scene, $camera);
			n8aoPostPass.configuration.halfRes = true;
			n8aoPostPass.configuration.aoSamples = 8;
			n8aoPostPass.configuration.denoiseSamples = 10;
			n8aoPostPass.configuration.aoRadius = 1;
			n8aoPostPass.configuration.denoiseRadius = 24;
			n8aoPostPass.configuration.distanceFalloff = 1;
			n8aoPostPass.configuration.intensity = 4;
			// n8aoPostPass.configuration.gammaCorrection = true;
			composer.addPass(n8aoPostPass);
		}
	}

	$: composer.setSize($size.width, $size.height);

	onMount(() => {
		let before = autoRender.current;
		autoRender.set(false);
		
		return () => autoRender.set(before);
	});

	useTask(
		(delta) => {
			composer.render(delta);
		},
		{ stage: renderStage, autoInvalidate: false }
	);
</script>
