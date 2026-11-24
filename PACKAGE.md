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

### Engine downloads

To add a package to a character’s **Assets → Engine downloads** table, include
the archive and a recording of its animation controller in the character’s IPFS
directory. Replace `{id}` with the roster ID. Add each file to the matching
manifest section with `kind: "file"`, `required: false`, its byte size and
SHA-256. Put the tested editor version in the archive’s `note`.

| Engine | Archive in the `model` section | Controller video in the `art` section |
| --- | --- | --- |
| Unity | `engine.unity` → `model/engines/{id}-unity.unitypackage` | `engine_demo.unity` → `art/engines/{id}-unity.mp4` |
| Unreal Engine | `engine.unreal` → `model/engines/{id}-unreal.zip` | `engine_demo.unreal` → `art/engines/{id}-unreal.mp4` |
| Godot | `engine.godot` → `model/engines/{id}-godot.zip` | `engine_demo.godot` → `art/engines/{id}-godot.mp4` |

Test the archive in a clean project and play its demo scene. Include the rig,
controller, clips, materials, import instructions and attribution inside the
download. Record the supplied controller playing the character in that engine
and export the preview as an H.264 MP4. An absent archive or recording displays
as **Missing**. Pin the revised directory and put its new CID in your roster PR.

Optional hero fields include `id`, `name`, `role`, `premise`, `home`, `people`,
`faction`, `attack_type`, `complexity`, `accent` and `status`. Do not imply a
production milestone or finished asset when the package is incomplete.

Keep authorship, source/provenance, credit requirements and reuse terms in your
package README. Include those details in the PR. Keep confidential information
out of public packages. A new revision requires a new immutable package CID.
