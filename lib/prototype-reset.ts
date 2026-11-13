/** Clear only this prototype's data, never unrelated same-origin storage. */
export function clearPrototypeData(local: Storage, session: Storage) {
  for (const key of ['dekho-prototype-v0', 'dekho-polls-v0', 'dekho-voter', 'dekho-private-device-v1', 'dekho-splash-seen']) local.removeItem(key);
  session.removeItem('dekho-tester-brand');
}
