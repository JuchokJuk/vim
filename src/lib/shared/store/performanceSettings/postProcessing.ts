import { get, writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export const postProcessing = persisted('postProcessing', true, { syncTabs: false });

export const ambientOcclusion = persisted('ambientOcclusion', true, { syncTabs: false });
export const antiAliasing = persisted('antiAliasing', true, { syncTabs: false });
export const bloom = persisted('bloom', true, { syncTabs: false });
export const noise = persisted('noise', true, { syncTabs: false });

export const postProcessingEnabled = writable(get(postProcessing));

function handleChildChange() {
	postProcessing.set(get(ambientOcclusion) || get(antiAliasing) || get(bloom) || get(noise));
}

function handleParentChange(parentEnabled: boolean) {
	if (parentEnabled) {
		if (!get(ambientOcclusion) && !get(antiAliasing) && !get(bloom) && !get(noise)) {
			ambientOcclusion.set(true);
			antiAliasing.set(true);
			bloom.set(true);
			noise.set(true);
		}
	} else {
		ambientOcclusion.set(false);
		antiAliasing.set(false);
		bloom.set(false);
		noise.set(false);
	}
}

ambientOcclusion.subscribe(handleChildChange);
antiAliasing.subscribe(handleChildChange);
bloom.subscribe(handleChildChange);
noise.subscribe(handleChildChange);

postProcessing.subscribe(handleParentChange);
