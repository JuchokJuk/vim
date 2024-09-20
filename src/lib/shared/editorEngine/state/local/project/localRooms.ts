import { writable } from 'svelte/store';
// todo: swap to real local types
import type { Area, Hole, Line, Vertex } from '../../../API/queries/projects/layouts';

export type LocalRooms = {
	holes: Record<string, Hole>;
	lines: Record<string, Line>;
	vertices: Record<string, Vertex>;
	areas: Record<string, Area>;
};

export const localRooms = writable<LocalRooms>();
