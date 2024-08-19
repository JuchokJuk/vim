import { writable } from 'svelte/store';

export type EditorMode = 'firstPerson' | 'thirdPerson' | '2d';

export const editorMode = writable<EditorMode>('thirdPerson');
