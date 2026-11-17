// Deliberately matches roster.schema.json without adding a runtime dependency.
// CID shape is limited to the directory format supported by this publication index.
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const idPattern = /^[a-z][a-z0-9_-]{0,63}$/;
const cidPattern = /^bafybei[a-z2-7]{51}[aeimquy4]$/;
export function validateRoster(roster) {
  const errors = [];
  const fields = (value, allowed, path) => {
    for (const key of Object.keys(value)) if (!allowed.includes(key)) errors.push(`${path}: unknown field ${key}`);
    for (const key of allowed) if (!Object.hasOwn(value, key)) errors.push(`${path}: missing ${key}`);
  };
  if (!object(roster)) return ['roster: expected an object'];
  fields(roster, ['$schema', 'schemaVersion', 'heroes', 'featured'], 'roster');
  if (roster.$schema !== './roster.schema.json') errors.push('$schema must be ./roster.schema.json');
  if (roster.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  const ids = new Set(), cids = new Set();
  if (!Array.isArray(roster.heroes) || roster.heroes.length < 3) errors.push('heroes must contain at least three entries');
  if (Array.isArray(roster.heroes)) roster.heroes.forEach((hero, index) => {
    const path = `heroes[${index}]`;
    if (!object(hero)) { errors.push(`${path}: expected an object`); return; }
    fields(hero, ['id', 'cid'], path);
    if (typeof hero.id !== 'string' || !idPattern.test(hero.id)) errors.push(`${path}.id: use a lowercase stable slug (max 64 characters)`);
    if (ids.has(hero.id)) errors.push(`${path}.id: duplicate ${hero.id}`);
    ids.add(hero.id);
    if (typeof hero.cid !== 'string' || !cidPattern.test(hero.cid)) errors.push(`${path}.cid: expected a bare base32 CIDv1 dag-pb sha2-256 directory CID`);
    if (cids.has(hero.cid)) errors.push(`${path}.cid: duplicate package CID`);
    cids.add(hero.cid);
  });
  if (!Array.isArray(roster.featured) || roster.featured.length !== 3) errors.push('featured must contain exactly three hero IDs');
  if (Array.isArray(roster.featured)) {
    const seen = new Set();
    for (const id of roster.featured) {
      if (typeof id !== 'string' || !idPattern.test(id) || !ids.has(id)) errors.push(`featured: unknown hero ${String(id)}`);
      if (seen.has(id)) errors.push(`featured: duplicate ${String(id)}`);
      seen.add(id);
    }
  }
  return errors;
}
