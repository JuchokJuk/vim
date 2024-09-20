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
		OutlineEffect,
		BlendFunction,
		Effect,
		KernelSize,
	} from 'postprocessing';
	// @ts-ignore
	import { N8AOPostPass } from 'n8ao';
	import { onMount } from 'svelte';
	import {
		ambientOcclusion,
		antiAliasing,
		bloom,
		noise,
		postProcessing
	} from '$lib/shared/store/3d/performanceSettings/postProcessing';
	import { selectedObjects } from '$lib/shared/store/3d/selectedObjects';
	import {
		degradePostProcessing,
		postProcessingDegraded
	} from '$lib/shared/store/3d/performanceSettings/degradeQualityOnRerender';
	import colors from '$lib/shared/styles/variables/colors/colors.module.scss';
	import { Color } from 'three';
	import { theme } from '$lib/shared/store/UI/theme';

	const { renderStage, autoRender, scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer, { depthBuffer: true });

	$: enablePostprocessing =
		$postProcessing &&
		(($degradePostProcessing && !$postProcessingDegraded) || !$degradePostProcessing);

	$: outlineEffect = new OutlineEffect(scene, $camera, {
		blendFunction: BlendFunction.ALPHA,
		edgeStrength: 10,
		pulseSpeed: 0.0,
		visibleEdgeColor: new Color(colors[`${$theme}-primary-0`]).getHex(),
		hiddenEdgeColor: new Color(colors[`${$theme}-primary-1`]).getHex(),
		xRay: true,
		blur: true,
		kernelSize: KernelSize.SMALL
	});

	$: outlineEffect.selection.set($selectedObjects);

	$: {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, $camera));

		const effects: Effect[] = [outlineEffect];

		if (enablePostprocessing) {
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
		}

		composer.addPass(new EffectPass($camera, ...effects));

		if ($ambientOcclusion && enablePostprocessing) {
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

		// if (enablePostprocessing) {
		// 	const effects: Effect[] = [];

		// 	if ($depthOfField) {
		// 		const depthOfFieldEffect = new DepthOfFieldEffect($camera, {
		// 			focusDistance: 0.0,
		// 			focusRange: 0.01,
		// 			bokehScale: 6,
		// 			resolutionScale: 0.5
		// 		});

		// 		effects.push(depthOfFieldEffect);
		// 	}

		// 	if ($noise) {
		// 		const noiseEffect = new NoiseEffect({ blendFunction: BlendFunction.MULTIPLY });
		// 		noiseEffect.blendMode.opacity.value = 0.0625;

		// 		effects.push(noiseEffect);
		// 	}

		// 	composer.addPass(new EffectPass($camera, ...effects));
		// }
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
