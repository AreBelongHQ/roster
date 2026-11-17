import test from 'node:test';
import assert from 'node:assert/strict';
import roster from '../roster.json' with {type:'json'};
import {validateRoster} from '../scripts/roster-validation.mjs';

test('current roster passes validation',()=>assert.deepEqual(validateRoster(roster),[]));
test('roster validation rejects duplicate identities, packages and unknown featured heroes',()=>{
  const duplicate=structuredClone(roster);duplicate.heroes.push({...duplicate.heroes[0]});
  assert.match(validateRoster(duplicate).join('\n'),/duplicate.*\n.*duplicate/s);
  const invalid=structuredClone(roster);invalid.featured=['missing',roster.featured[0],roster.featured[0]];
  assert.match(validateRoster(invalid).join('\n'),/unknown hero/);
  assert.match(validateRoster(invalid).join('\n'),/duplicate/);
});
test('roster validation rejects paths, URLs, unsafe IDs, noncanonical CIDs and schema typos',()=>{
  for(const cid of ['https://ipfs.io/ipfs/'+roster.heroes[0].cid,roster.heroes[0].cid+'/manifest.json','ipfs://'+roster.heroes[0].cid,'bafytest','QmExample',roster.heroes[0].cid.slice(0,-1)+'b']){
    const value=structuredClone(roster);value.heroes[0].cid=cid;assert.ok(validateRoster(value).length,cid);
  }
  for(const change of [v=>v.heroes[0].id='<img>',v=>v.schemaVersion=2,v=>v.heroes[0].name='Not an index field',v=>v.heroes=[],v=>v.featured=[],v=>v.heroes[0]=null]){
    const value=structuredClone(roster);change(value);assert.ok(validateRoster(value).length);
  }
  assert.ok(validateRoster(null).length);
});
