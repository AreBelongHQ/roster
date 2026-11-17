# Character package reference

Each roster `cid` identifies a public IPFS directory containing `manifest.json`.
Names, roles, stats, abilities, animation metadata and files are loaded from that
package. Missing content is shown as **Missing**, without invented stats or assets.

The current viewer supports `cinder-moba-hero-package` (1.0.0/1.1.0) and the
existing `arebelong-moba-character-prototype/1` adapter. See the minimal manifest
example in [CONTRIBUTING.md](CONTRIBUTING.md). This is compatibility documentation,
not a final MOBA schema or a production-quality certification.

For a `cinder-moba-hero-package`, each section has an `items` array. File entries
use `key`, `path` relative to the package directory, `kind: "file"` and
`status: "present"`. Only mark an item present when the file actually exists.

| Section | Item key | Viewer behavior |
| --- | --- | --- |
| `art` | `concept` | Concept image; supported PNG/JPEG/WebP. Other declared art can be a fallback. |
| `model` | `lod1`, then `lod0` | GLB model with embedded textures/animation clips where available. |
| `animations` | `clips` | JSON metadata for animations; playback uses embedded GLB clips. |
| `abilities` | `abilities` | Ability definitions JSON. |
| `abilities` | `stats` | Hero stats and ability numbers JSON. |
| `audio` | `voice_prompts` | Written voice cue JSON. |
| `source` | `recipe` | Character recipe JSON, if published. |

Voice recordings must be declared as present files under
`audio/voice/lines/<cue-id>.<extension>`. Written cues alone do not imply recordings.
Model and concept files should be suitable for browser download and inspection.
Homepage features need a declared `lod1` or `lod0` model and an embedded `idle` clip.

Optional hero fields include `id`, `name`, `role`, `premise`, `home`, `people`,
`faction`, `attack_type`, `complexity`, `accent` and `status`. Do not imply a
production milestone or finished asset when the package is incomplete.

Keep authorship, source/provenance, credit requirements and reuse terms in your
package README. Include those details in the PR. Keep confidential information
out of public packages. A new revision requires a new immutable package CID.
