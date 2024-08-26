import { performanceSettings } from './performanceSettings';

export function getSettings(path: string[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let temp: any = performanceSettings;

	for (let i = 0; i < path.length - 1; i++) {
		temp = temp[path[i]].settings;
	}

	temp = temp[path[path.length - 1]];

	switch (temp.value.type) {
		case 'boolean':
			return temp.value.value;
		case 'selection':
			return temp.value.activeOption;
	}
}

export function getOptions(path: string[]) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let temp: any = performanceSettings;

	for (let i = 0; i < path.length - 1; i++) {
		temp = temp[path[i]].settings;
	}

	temp = temp[path[path.length - 1]];

	switch (temp.value.type) {
		case 'selection':
			return temp.value.options;
	}
}
