<script lang="ts">
	import { useTask, useThrelte } from '@threlte/core';
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		BloomEffect,
		SMAAEffect,
		SMAAPreset,
		NoiseEffect,
		BlendFunction
	} from 'postprocessing';
	// @ts-ignore
	import { N8AOPostPass } from 'n8ao';
	import { onMount } from 'svelte';
	import {
		ambientOcclusion,
		antiAliasing,
		bloom,
		noise
	} from '$lib/shared/store/performanceSettings/postProcessing';

	const { renderStage, autoRender, scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer, { depthBuffer: true });

	$: {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, $camera));

		const effects = [];

		if ($antiAliasing) {
			const smaaEffect = new SMAAEffect({
				preset: SMAAPreset.LOW
			});

			effects.push(smaaEffect);
		}

		if ($bloom) {
			const bloomEffect = new BloomEffect({
				luminanceThreshold: 0.99,
				luminanceSmoothing: 0.025,
				mipmapBlur: true,
				intensity: 4,
				radius: 1,
				levels: 4
			});

			effects.push(bloomEffect);
		}

		if ($noise) {
			const noiseEffect = new NoiseEffect({ blendFunction: BlendFunction.MULTIPLY });
			noiseEffect.blendMode.opacity.value = 0.0625;

			effects.push(noiseEffect);
		}

		composer.addPass(new EffectPass($camera, ...effects));

		if ($ambientOcclusion) {
			const n8aoPostPass = new N8AOPostPass(scene, $camera);
			// n8aoPostPass.setDisplayMode("AO");
			// n8aoPostPass.configuration.halfRes = true;
			n8aoPostPass.configuration.aoSamples = 4;
			n8aoPostPass.configuration.denoiseSamples = 12;
			n8aoPostPass.configuration.aoRadius = 1;
			n8aoPostPass.configuration.denoiseRadius = 24;
			n8aoPostPass.configuration.distanceFalloff = 2;
			n8aoPostPass.configuration.intensity = 2;
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
