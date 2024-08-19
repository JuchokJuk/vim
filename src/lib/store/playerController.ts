import { writable } from 'svelte/store';

export const playerController = writable({
	angle: 0,
	speed: 0,
	jump: false,
	phi: 0,
	theta: 0
});
