import { writable } from 'svelte/store';

export const Contacts = writable([{ name: "", isnew: true }])