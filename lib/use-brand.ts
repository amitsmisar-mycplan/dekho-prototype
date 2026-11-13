'use client';
import { useSyncExternalStore } from 'react';
import { brand, brands, type BrandName } from './brand';
const event = 'prototype-brand-change';
function current(): BrandName { try { const value = sessionStorage.getItem('dekho-tester-brand'); return value === 'WatchAdda' || value === 'Dekho' ? value : brand.name; } catch { return brand.name; } }
function subscribe(listener: () => void) { window.addEventListener(event, listener); return () => window.removeEventListener(event, listener); }
export function useBrand() { const name = useSyncExternalStore(subscribe, current, () => brand.name); return { ...brand, ...brands[name] }; }
export function setTesterBrand(name: BrandName) { sessionStorage.setItem('dekho-tester-brand', name); window.dispatchEvent(new Event(event)); document.title = `${brands[name].name} — ${brands[name].tagline}`; }
