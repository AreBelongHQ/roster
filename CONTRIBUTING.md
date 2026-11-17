# Contribute a character

Propose changes to the AreBelong roster in **[roster.json](roster.json)** at the repository root.
Adding a character or publishing a new revision normally requires changing only
this file. Names, models, animations, stats, voice lines and other content belong
in that character's IPFS package, not in website source code.

Website: https://www.arebelong.com

Currently deployed index: https://www.arebelong.com/roster.json

This repository is the contribution source. The website uses a snapshot of a
reviewed commit; a merged PR appears after the next roster import and deployment.

## Submit a roster PR

1. Prepare and pin a public IPFS **directory** with `manifest.json` at its root.
   Keep the package available: a CID identifies content but does not host or pin it.
2. Fork this repository and edit `roster.json`. Add an entry to `heroes`, or change
   the `cid` of an existing entry while preserving its `id`.
3. With Node 24, run `node scripts/validate-roster.mjs` and
   `node --test test/*.test.mjs`. No package installation is needed.
4. Open a pull request targeting `AreBelongHQ/roster`, base branch `main`,
   explaining what changed. Include the new IPFS manifest
   link, asset authors/credit and reuse terms, and known missing or unfinished
   content. For an update, describe the difference from the previous package.

Example of an existing entry (use your own package CID for a new character):

```json
{
  "id": "septima",
  "cid": "bafybeihxtr2v42d7yqcbgara5h3usqhzzjti47oasdsnujsab2mvfawn5u"
}
```

Use a unique, stable lowercase `id` with letters, digits, hyphens or underscores
(starting with a letter; maximum 64 characters). IDs are public inspector URLs.
Use a bare lowercase base32 CIDv1 in the current dag-pb/sha2-256 directory format;
do not paste a gateway URL, `ipfs://` prefix, file path, mutable IPNS name or CIDv0.
Each hero must reference a different package. Array order controls roster and
inspector navigation order. Preserve unrelated entries when proposing changes.

The `featured` array selects exactly three existing hero IDs for the homepage,
in stage order. Change it only when proposing a lineup change, and verify those
packages have a viewable model and idle animation. A new roster entry does not
need to be featured. Missing homepage illustrations display **Missing**.

Changing an IPFS file produces a new package CID. Pin the new directory and
replace the old CID in this JSON; do not rename an existing hero for a revision.
Git history preserves the earlier index. Retaining older pinned packages is
separate from Git history.

## Character package

The index has its own schema in [roster.schema.json](roster.schema.json).
It is an index of packages, not the final MOBA character schema.

The inspector currently understands `cinder-moba-hero-package` versions 1.0.0 and
1.1.0, plus the existing `arebelong-moba-character-prototype/1` adapter. A minimal
readable package manifest looks like this:

```json
{
  "schema": "cinder-moba-hero-package",
  "schema_version": "1.1.0",
  "hero": {"id": "your-hero", "name": "Your Hero", "role": null},
  "sections": {
    "art": {"items": [
      {"key": "concept", "path": "art/concept.png", "kind": "file", "status": "present"}
    ]}
  }
}
```

Include the referenced image in that directory. This example is a minimal viewer
input, not a complete production package or a claim of game readiness. An empty
`sections` object is readable and displays missing assets. Only declare files as
`present` if they exist. Paths are relative to the package root.

The inspector reads model `lod1`/`lod0` items under `model`, animation metadata
under `animations`, abilities/stats under `abilities`, and voice data under
`audio`. See [PACKAGE.md](PACKAGE.md) for supported keys. Include
provenance and reuse terms in the package; submit only assets you can authorize
for the stated reuse. Do not put secrets or private files in a public package.

The website preserves the attribution of existing illustrations. New heroes use
package-declared concept/artwork in the roster; if there is no artwork, the card
says **Missing**. No local website portrait or website-code PR is required.

## Review and publication

Pull requests run offline roster validation and tests. Validation checks format,
duplicate IDs/CIDs and featured references. Maintainers also check IPFS availability,
package contents, authorship, reuse terms and the visual result before accepting a PR.
Passing validation does not guarantee acceptance or continued IPFS availability.

After merge, a website maintainer imports that reviewed commit with
`npm run sync:roster -- <full-40-character-commit-sha>` in the website checkout,
runs its tests/build, and deploys the updated snapshot. The importer records the
source commit and content hash. Merging here does not immediately change the site.

Keep old packages pinned when possible. The Git history preserves earlier CIDs,
not the files stored on IPFS. Do not add binaries, API keys, wallets, or secrets to
this index repository.
