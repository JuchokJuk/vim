import { get, writable } from 'svelte/store';

export const degradeQualityOnFrequentRerender = writable(false);

export const degradePostProcessing = writable(false);
export const degradeResolution = writable(false);

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
