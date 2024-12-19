// src/lib/stores/roleStore.ts
import { writable } from 'svelte/store';

export const selectedRole = writable('Teacher');

export interface roleStore {}