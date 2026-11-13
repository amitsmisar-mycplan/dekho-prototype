'use client';
import { useEffect, useState } from 'react';
import { useCopy } from '@/lib/use-copy';
import { commonCopy } from '@/.generated/copy/common';
export function ConnectionStatus() {
 const [offline,setOffline]=useState(false),copy=useCopy();
 useEffect(()=>{const update=()=>setOffline(!navigator.onLine);update();window.addEventListener('online',update);window.addEventListener('offline',update);return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update);};},[]);
 return offline?<p role="status" className="connection-status">{copy(commonCopy.offline)}</p>:null;
}
