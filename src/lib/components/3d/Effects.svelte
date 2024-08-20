<script lang="ts">
	import { useRender, useThrelte } from '@threlte/core';

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

	const { scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer, {
		depthBuffer: true
	});

	$: {
		// todo: merge effects
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, $camera));
		if ($performanceSettings.postProcessing.settings.antiAliasing.enabled) {
			composer.addPass(
				new EffectPass(
					$camera,
					new SMAAEffect({
						preset: SMAAPreset.LOW
					})
				)
			);
		}
		if ($performanceSettings.postProcessing.settings.bloom.enabled) {
			composer.addPass(
				new EffectPass(
					$camera,
					new BloomEffect({
						luminanceThreshold: 0.99,
						luminanceSmoothing: 0.025,
						mipmapBlur: true,
						intensity: 4,
						radius: 1,
						levels: 4
					})
				)
			);
		}

		if ($performanceSettings.postProcessing.settings.ambientOcclusion.enabled) {
			const n8aoPostPass = new N8AOPostPass(scene, $camera, $size.width, $size.height);
			n8aoPostPass.configuration.halfRes = true;
			n8aoPostPass.configuration.aoSamples = 8;
			n8aoPostPass.configuration.denoiseSamples = 10;
			n8aoPostPass.configuration.aoRadius = 0.25;
			n8aoPostPass.configuration.denoiseRadius = 24;
			n8aoPostPass.configuration.distanceFalloff = 1;
			n8aoPostPass.configuration.intensity = 4;
			// n8aoPostPass.configuration.gammaCorrection = true;
			composer.addPass(n8aoPostPass);
		}
	}

	$: composer.setSize($size.width, $size.height);

	useRender((_ctx, delta) => {
		composer.render(delta);
	});
</script>
