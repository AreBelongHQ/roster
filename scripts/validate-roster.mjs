import {readFile} from 'node:fs/promises';
import {validateRoster} from './roster-validation.mjs';

try {
  const roster = JSON.parse(await readFile(new URL('../roster.json', import.meta.url), 'utf8'));
  const errors = validateRoster(roster);
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Valid roster: ${roster.heroes.length} packages, ${roster.featured.length} featured heroes.`);
  console.log('Offline validation only: reviewers must verify IPFS availability, package content and asset rights.');
} catch (error) {
  console.error(`Roster validation failed:\n${error.message}`);
  process.exitCode = 1;
}
