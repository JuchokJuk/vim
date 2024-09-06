import { get, writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

export const degradeQualityOnFrequentRerender = persisted(
	'degradeQualityOnFrequentRerender',
	false,
	{ syncTabs: false }
);

export const degradePostProcessing = persisted('degradePostProcessing', false, { syncTabs: false });
export const degradeResolution = persisted('degradeResolution', false, { syncTabs: false });

export const LOW_RESOLUTION = 0.5;
export const NORMAL_RESOLUTION = 1;

export const resolutionDegradation = writable(NORMAL_RESOLUTION);
export const postProcessingDegraded = writable(false);

export const frequentRerender = writable(false);

frequentRerender.subscribe((value: boolean) => {
	if (value) {
		if (get(degradePostProcessing)) postProcessingDegraded.set(true);
		if (get(degradeResolution)) resolutionDegradation.set(LOW_RESOLUTION);
	} else {
		if (get(degradePostProcessing)) postProcessingDegraded.set(false);
		if (get(degradeResolution)) resolutionDegradation.set(NORMAL_RESOLUTION);
	}
});

function handleChildChange() {
	const parentEnabled = get(degradePostProcessing) || get(degradeResolution);

	degradeQualityOnFrequentRerender.set(parentEnabled);
}

function handleParentChange(parentEnabled: boolean) {
	if (parentEnabled) {
		if (!get(degradePostProcessing) && !get(degradeResolution)) {
			degradePostProcessing.set(true);
			degradeResolution.set(true);
		}
	} else {
		degradePostProcessing.set(false);
		degradeResolution.set(false);
	}
}

degradePostProcessing.subscribe(handleChildChange);
degradeResolution.subscribe(handleChildChange);

degradeQualityOnFrequentRerender.subscribe(handleParentChange);

degradePostProcessing.subscribe((value: boolean) => {
	if (!value) postProcessingDegraded.set(false);
});

degradeResolution.subscribe((value: boolean) => {
	if (!value) resolutionDegradation.set(NORMAL_RESOLUTION);
});
