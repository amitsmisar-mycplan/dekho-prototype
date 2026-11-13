const key = 'dekho-private-device-v1';
/** A new, private UUID: old local-mode identities appeared in share URLs. */
export function privateDeviceId() {
  let id = localStorage.getItem(key);
  if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    id = crypto.randomUUID(); localStorage.setItem(key, id);
  }
  return id;
}
