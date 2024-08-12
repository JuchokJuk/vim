<script lang="ts">
	import { useRender, useThrelte } from '@threlte/core';

	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		BloomEffect,
		SMAAEffect,
		SMAAPreset,
		GodRaysEffect
	} from 'postprocessing';
	// @ts-ignore
	import { N8AOPostPass } from 'n8ao';
	import { sky } from '$lib/store/sky';
	import { performanceSettings } from '$lib/store/performanceSettings';

	const { scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer);

	$: {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, $camera));
		if ($performanceSettings.postProcessing.settings.antiAliasing.enabled) {
			composer.addPass(
				new EffectPass(
					$camera,
					new SMAAEffect({
						preset: SMAAPreset.ULTRA
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
		if ($performanceSettings.postProcessing.settings.godRays.enabled) {
			composer.addPass(
				new EffectPass(
					$camera,
					new GodRaysEffect($camera, $sky.sunMesh, {
						decay: 0.95
					})
				)
			);
		}
		if ($performanceSettings.postProcessing.settings.ambientOcclusion.enabled) {
			const n8aoPostPass = new N8AOPostPass(scene, $camera, $size.width, $size.height);
			// n8aoPostPass.configuration.halfRes = true;
			n8aoPostPass.configuration.aoSamples = 32;
			n8aoPostPass.configuration.aoRadius = 0.5;
			n8aoPostPass.configuration.denoiseSamples = 6;
			n8aoPostPass.configuration.denoiseRadius = 24;
			composer.addPass(n8aoPostPass);
		}
	}

	$: composer.setSize($size.width, $size.height);

	useRender((_ctx, delta) => {
		composer.render(delta);
	});
</script>
