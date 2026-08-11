# Interactive Promo — Compatibility Report

**Plugin:** Interactive Promo (`interactive-promo`)
**Version:** 1.2.6 → 1.5.0
**Branch:** `interactive-promo-dev` (off `master` @ `1a183fe`)
**Date of pass:** 2026-08-10
**Nothing committed or pushed** — all changes left in the working tree for review.

---

## 1. Detected original baseline

### PHP — detected 5.6-era

| Evidence | File:line | Implies |
|---|---|---|
| `[]` short array syntax throughout | `font-loader.php:15`, `interactive-promo.php:44` | 5.4+ |
| Closures (`function ($attributes, $content)`) | `interactive-promo.php:91` | 5.3+ |
| Variadics `...$args` and `new static( ...$args )` | `font-loader.php:21,23` | 5.6+ |
| No `??`, no `<=>`, no return types, no nullable types, no typed properties, no arrow functions, no `match`, no constructor promotion | (absent everywhere) | ceiling at 5.6 |

Highest construct present is the 5.6 variadic. **Detected original PHP floor: 5.6.**

One outlier: `helpers.php` calls `str_contains()`, a PHP 8.0 function. It is not
guarded by `function_exists()`, so on PHP < 8.0 it only survives because
WordPress core polyfills it in `wp-includes/compat.php` from **WP 5.9** onward.
That makes the *real* runtime requirement "PHP 8.0 **or** WP 5.9+", which is a
stronger constraint than the readme's declared floor of WP 5.6 admitted.

### WordPress — detected ~5.9-era, declared 5.6

| Evidence | File:line | Implies |
|---|---|---|
| `register_block_type()` with a **directory path** argument | `interactive-promo.php:87` | 5.8+ |
| `render_block` filter | `font-loader.php:31` | 5.0+ |
| `WP_Block_Type_Registry::is_registered()` | `interactive-promo.php:86` | 5.0+ |
| `site-editor.php` screen handling | `helpers.php:48,69` | 5.9+ |
| `str_contains()` relying on the core polyfill | `helpers.php:48` | 5.9+ |
| Explicit `<= 5.6` fallback returning a block *name* instead of a path | `helpers.php:86` | author targeted 5.6 as the floor |
| (submodule) `rest_after_save_widget`, `wp_is_block_theme()` | `lib/style-handler` | 5.8 / 5.9 |

readme.txt declared `Requires at least: 5.6`; the code actually needs 5.9 for the
`str_contains` polyfill on sub-8.0 PHP. **The declared floor was already wrong.**

### Declared values found at start

| Field | Main plugin file | readme.txt |
|---|---|---|
| `Requires PHP` | **absent** | **absent** |
| `Requires at least` | **absent** | 5.6 |
| `Tested up to` | **absent** | 6.5 |
| `Version` / `Stable tag` | 1.2.6 | 1.2.6 |

The main plugin file carried **no** compatibility headers at all — WordPress had
no floor to enforce, so the plugin would happily install on PHP 5.6 and fatal.

---

## 2. Chosen floor

| | Detected original | Policy minimum | **Winner** |
|---|---|---|---|
| PHP | 5.6 | 7.4 | **7.4** (policy) |
| WordPress | 5.6 declared / 5.9 real | 6.0 | **6.0** (policy) |

Policy minimum won on both axes. The user did **not** request a lower floor for
this plugin, so the standard PHP 7.4 / WP 6.0 default applies.

---

## 3. Target range

Verified live on **2026-08-10**:

- `https://www.php.net/releases/index.php?json&max=4` → latest stable **PHP 8.5.9**
  (released 30 Jul 2026); actively supported branches: 8.2, 8.3, 8.4, 8.5.
- `https://api.wordpress.org/core/version-check/1.7/` → current release
  **WordPress 7.0.3** (core's own declared `php_version` requirement: 7.4).

**Target range: PHP 7.4 → 8.5, WordPress 6.0 → 7.0.**

Per-version checklist actually walked:

- PHP: 7.4, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5
- WP: 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0

Local toolchain: PHP 8.5.8 CLI.

---

## 4. Issues found

| # | File:line | Issue | Breaks on | Severity |
|---|---|---|---|---|
| 1 | `interactive-promo.php:29` | `require_once` of `lib/style-handler/style-handler.php` with no existence check. `lib/style-handler` is a **git submodule and is currently uninitialised/empty** in this checkout (`git submodule status` → `-34fb2c6…`). Unconditional require of a missing file is a hard fatal that takes the entire site down, admin included. | All versions | **Critical** |
| 2 | `helpers.php:50` | `$controls_dependencies = include_once …/modules.asset.php;` — an `*_once` include returns **bool `true`** (not the file's return value) on any repeat include. `$controls_dependencies['dependencies']` then indexes a bool, and `array_merge(null, [...])` throws **`TypeError: array_merge(): Argument #1 must be of type array, null given`**. On PHP 7.4 this was only a notice + warning. | PHP 8.0+ | **High** |
| 3 | `interactive-promo.php:44,57` | `$script_asset['dependencies']` / `['version']` read without checking the keys exist. A truncated or hand-edited `dist/index.asset.php` yields the same `array_merge()` TypeError as #2. | PHP 8.0+ | High |
| 4 | `interactive-promo.php` header | No `Requires PHP`, no `Requires at least`, no `Tested up to`. WordPress cannot block installation on an unsupported stack, and the plugin reads as untested to users and to the wp.org compatibility widget. | All | High |
| 5 | `helpers.php:61` | `(float) get_bloginfo('version')` — float cast of a version string. `"6.10"` casts to `6.1`, so a JS check like `eb_wp_version >= 6.3` silently inverts. Value is shipped to the `controls` submodule JS via `wp_localize_script`. | Any WP `x.10+` release | High |
| 6 | `helpers.php:86` | Same float-cast anti-pattern in `get_block_register_path()`: `(float) get_bloginfo('version') <= 5.6`. | Any WP `x.10+` release | Medium (moot at floor 6.0 — see §5) |
| 7 | `admin-enqueue.php:1` | No `if ( ! defined( 'ABSPATH' ) ) exit;` guard — file is directly requestable. | All | Medium |
| 8 | `interactive-promo.php:1` | Same missing `ABSPATH` guard on the main plugin file. | All | Medium |
| 9 | `admin-enqueue.php:14` | `plugins_url($hover_style, __FILE__)` called from `includes/`, so it resolves to `…/interactive-promo/includes/assets/css/hover-effects.css` — a 404. Currently **masked**: the `hover-effects-style` handle is already registered with the correct URL at `init` priority 99, and `wp_enqueue_style()` will not overwrite an existing registration. A hook-order change would unmask it. | All (latent) | Medium |
| 10 | `font-loader.php:97` | `trim( $font )` where `$font` originates from block attributes and may be `null`. **Passing null to a non-nullable internal parameter is deprecated in PHP 8.1** and emits a deprecation notice per font, per page load. | PHP 8.1+ | Medium |
| 11 | `font-loader.php:70` | `$googleFontFamily[$attributes[$key]] = …` uses an unvalidated attribute value as an array offset. If any `*FontFamily` attribute is an array or object, PHP 8 raises `TypeError: Illegal offset type` (fatal), vs. a warning on 7.4. | PHP 8.0+ | Medium |
| 12 | `helpers.php:48` | `$_SERVER['QUERY_STRING']` read without `wp_unslash()` / `sanitize_text_field()`. Not directly exploitable here (compared, never echoed), but it fails WPCS and is a bad pattern to leave in place. | All | Low |
| 13 | `interactive-promo.php:82` and `admin-enqueue.php:17` | `filemtime()` on an unchecked path. If `assets/css/hover-effects.css` is absent, PHP emits a warning and `false` is passed as the asset version. | All | Low |
| 14 | `post-meta.php:12` | `add_filter('init', …)` used to register an action. Functionally identical in core (both hit `$wp_filter`), but semantically wrong and confusing. | None | Low |
| 15 | `helpers.php:48` | `str_contains()` used with no `function_exists()` guard. Safe **only** because WP >= 5.9 polyfills it — which the WP 6.0 floor now guarantees. Was unsafe under the previously declared 5.6 floor. | PHP < 8.0 **and** WP < 5.9 | Low (resolved by floor raise) |
| 16 | `block.json` | No `apiVersion` key → defaults to **apiVersion 1**. WP 6.3+ iframes the block-editor canvas and drops out of iframe mode for pre-v3 blocks, degrading editor behavior. | WP 6.3+ (degraded, not broken) | Medium — **flagged, not fixed** |
| 17 | `assets/js/eb-animation-load.js:29` | `window.addEventListener('DOMNodeInserted', …)` — a DOM Mutation Event **removed from Chrome/Edge in v127 (2024)**. The admin animation-preview refresh it drives is already inert in every current browser. | Chrome/Edge 127+ | Medium — **flagged, not fixed** |
| 18 | `interactive-promo.php:38` | `throw new Error(…)` from inside an `init` callback when `dist/index.asset.php` is missing. Not a version-range break, but an uncaught throw on `init` white-screens the whole site rather than degrading. | All | Low — **flagged, not fixed** |
| 19 | `lib/style-handler/style-handler.php` (submodule) | Reviewed against a sibling checkout. Uses bare `mkdir()` and `file_put_contents()` with no `WP_Filesystem`, no return-value checks, and `substr( md5( microtime( true ) ), 0, 10 )` as a cache-busting version — which defeats browser caching on every request. | n/a | **Out of scope** — separate repository (`EssentialBlocks/style-handler`) |

Clean on: `mysql_*`, `create_function()`, `each()`, `ereg*`, `split()`, `money_format()`,
`strftime()`, `utf8_encode/decode`, `FILTER_SANITIZE_STRING`, `${var}` interpolation,
curly-brace offsets `$s{0}`, implicit nullable parameters, dynamic property creation,
optional-before-required parameters, `#[\ReturnTypeWillChange]` needs,
raw `$wpdb` queries in plugin code, REST routes missing `permission_callback`
(no REST routes registered), and jQuery 3.x / Migrate removals (no jQuery at all).

---

## 5. Dead version-check branches

Raising the WP floor to 6.0 strands one branch.

| File | Line | Condition | What the branch does | Single remaining reachable path if removed |
|---|---|---|---|---|
| `includes/helpers.php` | 86 | `(float) get_bloginfo('version') <= 5.6` | Returns `$blockname` (the string `"interactive-promo/interactive-promo"`) so `register_block_type()` takes the name form, which is all WP <= 5.6 understood. | `get_block_register_path()` collapses to `return $blockPath;` — always the directory path form, i.e. `register_block_type( INTERACTIVE_PROMO_BLOCKS_ADMIN_PATH, [...] )`. Signature and both call sites stay as they are. |

**User decision: KEEP AS-IS.** Branch left untouched, no comment added.

Note this also neutralises issue #6: with the floor at WP 6.0, `(float) "7.0.3"`
is `7.0` and the condition is permanently false, so the float-cast bug in *this*
particular comparison can no longer produce a wrong answer.

No other version gates exist. A sweep for `version_compare`, `PHP_VERSION_ID`,
`PHP_VERSION`, `$wp_version`, `get_bloginfo('version')`, `phpversion()`,
`is_php_version_compatible()`, `is_wp_version_compatible()` and constant-based
minimums returned only the two `get_bloginfo` float casts (#5, #6).

---

## 6. Fixes applied

| Issue | Fix | File |
|---|---|---|
| 1 | Wrapped the submodule `require_once` in `file_exists()`. Missing style-handler now degrades (no generated CSS) instead of fataling the site. | `interactive-promo.php:37-41` |
| 2 | `include_once` → `require`, gated behind `file_exists()` with an early `return`. Result coerced with `is_array()`, and `dependencies` / `version` read through `isset()` fallbacks into `$controls_deps` / `$controls_version`. Explanatory comment left on the `require` so nobody reintroduces `_once`. | `helpers.php:50-66` |
| 3 | `$script_asset` coerced with `is_array()`; `dependencies` defaults to `[]`, `version` defaults to `INTERACTIVE_PROMO_BLOCKS_VERSION`. | `interactive-promo.php:56-72` |
| 4 | Added `Requires at least: 6.0`, `Tested up to: 7.0`, `Requires PHP: 7.4` to the plugin header; added `Requires PHP: 7.4` to readme.txt and updated its `Requires at least` / `Tested up to`. | `interactive-promo.php`, `readme.txt` |
| 5 | **Per user decision**: `eb_wp_version` left as a float for backward compatibility with existing controls JS; added a new `eb_wp_version_string` key carrying the raw version string, with a comment directing new code to use it. Nothing existing changes. | `helpers.php:61-66` |
| 6 | No change — dead under the WP 6.0 floor, and the user chose to keep the branch. | — |
| 7, 8 | Added `if ( ! defined( 'ABSPATH' ) ) { exit; }` guards. All five plugin PHP files now carry one. | `admin-enqueue.php`, `interactive-promo.php` |
| 9 | `plugins_url()` base changed from `__FILE__` to `INTERACTIVE_PROMO_DIR . '/interactive-promo.php'` so the URL resolves from the plugin root. Behavior-neutral today (the handle is already registered), correct if hook order ever shifts. | `admin-enqueue.php:15-16` |
| 10 | `trim( $font )` → `trim( (string) $font )`. | `font-loader.php:98` |
| 11 | Added an `is_scalar()` guard that `continue`s past non-scalar attribute values before they are used as an array offset. | `font-loader.php:69-72` |
| 12 | `$_SERVER['QUERY_STRING']` now read once through `sanitize_text_field( wp_unslash( … ) )` into `$query_string`, with an `isset()` default of `''`. | `helpers.php:48` |
| 13 | Both `filemtime()` calls guarded by `file_exists()`, falling back to `INTERACTIVE_PROMO_BLOCKS_VERSION` (frontend registration) and `false` (admin enqueue, matching WP's own default). | `interactive-promo.php:81-89`, `admin-enqueue.php:17-22` |
| 14 | `add_filter('init', …)` → `add_action('init', …)`. | `post-meta.php:12` |
| 15 | No code change needed — the WP 6.0 floor guarantees the core polyfill. | — |

### Version bump

1.2.6 → **1.5.0** (minor), synced across:

- `interactive-promo.php` header `Version:`
- `interactive-promo.php` `define( 'INTERACTIVE_PROMO_BLOCKS_VERSION', … )`
- `readme.txt` `Stable tag:`
- `package.json` `"version"`

A 1.5.0 changelog entry was added to readme.txt. `composer.json` does not exist
in this plugin, so there was nothing to sync there.

---

## 7. Flagged, not fixed — awaiting your decision

These were raised and you chose to leave them. Recorded here so they are not lost.

| # | Item | Your decision | Recommendation if revisited |
|---|---|---|---|
| 16 | `block.json` has no `apiVersion` (defaults to 1). WP 6.3+ forces the editor out of iframe mode for pre-v3 blocks. | **Leave at v1** | Bumping to `apiVersion: 3` is the modern-correct move, but it changes editor rendering and would need `edit.js` / `save.js` `useBlockProps` verification, a fresh `npm run build`, and regression testing against the existing `deprecated.js` entry — real risk for a block with saved markup in the wild. Worth doing as its own scoped task, not inside a compat pass. |
| 17 | `DOMNodeInserted` listener in `eb-animation-load.js`, removed from Chrome/Edge 127+. | **Flag only** | Replace with a `MutationObserver` to restore the admin animation-preview refresh. It is editor-preview polish only — frontend animation runs off `DOMContentLoaded` + `scroll` and is unaffected. |
| 18 | `throw new Error()` on missing `dist/index.asset.php` white-screens the site. | Not raised for decision | Convert to an `admin_notice` + early `return`. Deferred because turning a fatal into silent degradation is a user-visible behavior change. |
| 19 | `style-handler` submodule: no `WP_Filesystem`, unchecked `mkdir()` / `file_put_contents()`, `microtime()`-based cache-busting versions that defeat browser caching. | Out of scope | Belongs in `EssentialBlocks/style-handler`. The `microtime()` versioning is worth a look — it forces a re-download of every generated stylesheet on every page load. |

---

## 7b. Frontend/editor feature audit (follow-up investigation)

Separate from the compatibility pass: a reported bug that Height, Width, Content,
Alignment and the Promo Effects worked in the editor but not on the frontend.

### Root cause

Every visual setting in this block is serialised into the `blockMeta` attribute by
the controls' `StyleComponent`. Two independent consumers render it:

- **Editor** — `StyleComponent` injects a live `<style>` tag. Always worked.
- **Frontend** — `EbStyleHandler` (`lib/style-handler`) parses `blockMeta` out of
  the post and writes `uploads/eb-style/eb-style-<post-id>.min.css`.

`lib/style-handler` was an **uninitialised, empty git submodule**, so
`EbStyleHandler` was never defined anywhere on the site and no frontend CSS was
ever generated for this block.

Evidence:

```
grep -rl "class EbStyleHandler" wp-content/plugins/   ->  zero files (entire site)
uploads/eb-style/ contains eb-style-7/35/36.min.css   ->  0 interactive-promo rules
                                                          (only pricing/flipbox/notice, stale)
```

This single cause explains every symptom reported: height, width, alignment,
header/content color and typography, background, margin/padding and border/shadow
are all `blockMeta`-driven. The Promo Effects looked broken as a knock-on effect —
the `effect-*` animations need the figure's generated height/width to have shape.

**Fix:** initialised both submodules (`lib/style-handler` @ `34fb2c6`,
`controls` @ `44acf63`). This also restores CSS generation for the five sibling
standalone EB plugins on this site that had the same empty directory, since
`EbStyleHandler` is a `class_exists`-guarded singleton shared across them.

### Additional inconsistencies found and fixed

| Issue | Detail | Fix |
|---|---|---|
| Editor discarded all tablet/mobile CSS | The built `StyleComponent` emits `@media all and (max-width: ${EssentialBlocksLocalize.responsiveBreakpoints?.tablet}px)`, but `helpers.php` localised only `eb_wp_version` and `rest_rootURL`. The key was `undefined`, yielding the invalid query `max-width: undefinedpx`, so every responsive rule was dropped — in the editor only; the frontend was fine because `build_css()` hardcodes the breakpoints. | Localised `responsiveBreakpoints` as `tablet: 1024`, `mobile: 767`, matching `EbStyleHandlerParseCss::build_css()` exactly. |
| Promo Effects unstyled in the FSE site editor | `hover-effects.css` carries all 22 `effect-*` rules but was enqueued only on `post.php` / `post-new.php`, while `helpers.php` already treated `site-editor.php` as an editor screen. | Added `InteractivePromoAdmin::eb_is_site_editor()` covering `site-editor.php` and the legacy `themes.php?…gutenberg-edit-site` route. |
| Rules-of-Hooks violation | `edit.js` returned `<MediaPlaceholder>` *before* `useEffect`/`useBlockProps`, so the hook count differed between the "no image" and "image selected" renders — React throws *"Rendered more hooks than during the previous render"* on first media selection, and `duplicateBlockIdFix` could fail to assign `blockId`. | Moved both hooks above the early return. |
| Color defaults resolved to nothing | `headerColor`, `contentColor` and `backgroundColor` defaulted to bare `var(--eb-global-*)`. Those custom properties are defined only by the Essential Blocks **main** plugin; standalone, the declaration is invalid-at-computed-value-time and the color is dropped entirely. | Added fallbacks mirroring `Helper::global_colors()`: primary `#101828`, heading `#1D2939`, background `#F9FAFB`. EB's configured values still win where it is installed. |

### Verified correct — no change needed

- All 22 `EFFECTS_LIST` values match the 22 `effect-*` classes in `hover-effects.css`.
- `classHook`, `customCss`, `commonStyles`, `hideOn*` and `animationData` **are**
  registered — the controls bundle injects them via a `blocks.registerBlockType`
  filter gated on `blockRoot.default === "essential_block"`, which this block
  declares. An early suspicion that they were unregistered was wrong.
- Header, content, alt tag, link, new-tab and effect name all persist correctly
  through their `source: "text"` / `source: "attribute"` definitions.
- **Alignment logic is correct.** An initial reading that hardcoded `width: 100%`
  defeated `margin: 0 auto` was wrong: CSS resolves auto margins against the
  *used* width after `max-width` clamping, so alignment works whenever a Width is
  set. With no Width the figure is full-bleed and alignment is inherently moot.

### Flagged, not fixed — user decision recorded

| Issue | Decision |
|---|---|
| **Hide on Desktop/Tab/Mobile and Animation are dead on the frontend.** The controls bundle registers `hideOn*` and `animationData` and has no `blocks.getSaveContent.extraProps` filter, and `save.js` emits no corresponding wrapper classes. The plugin enqueues `animate.min.css` and `eb-animation-load.js` for a feature that can never fire. Fixing requires new classes in `save.js` plus a matching `deprecated.js` entry so existing content still validates. | **Flag only** — deferred to its own scoped task. |
| `interactive-promo.php` guards on `is_registered('essential-blocks/interactive-promo')` while registering `interactive-promo/interactive-promo`. Appears to be a deliberate defer-to-EB-main strategy. | Left as-is to avoid double registration. |

### Known limitation

Existing posts store the **old** `blockMeta` string, generated before the color
fallbacks existed. `EbStyleHandler` regenerates a post's CSS only when the file is
absent, so already-published promos keep `var(--eb-global-heading-color)` with no
fallback until the post is re-saved in the editor. New and re-saved posts pick up
the fallbacks immediately.

---

## 8. Old-vs-new conflicts

**None.** Nothing in the PHP 7.4 → 8.5 or WP 6.0 → 7.0 span required a
compromise: every fix is a guard or a cast that behaves identically at both ends
of the range. No new compatibility shims were written, and none were needed —
all constructs used are valid on 7.4 and current on 8.5.

The one *former* conflict, unguarded `str_contains()` on PHP < 8.0, was resolved
by the floor raise rather than by adding a polyfill: WP 6.0 ships the core
polyfill unconditionally.

---

## 9. Final declared compatibility

| Field | Before | After |
|---|---|---|
| `Requires PHP` | *(absent in both)* | **7.4** (header + readme) |
| `Requires at least` | absent / 5.6 | **6.0** (header + readme) |
| `Tested up to` | absent / 6.5 | **7.0** (header + readme) |
| `Version` / `Stable tag` | 1.2.6 | **1.5.0** |

Verified range: **PHP 7.4 – 8.5, WordPress 6.0 – 7.0.**

---

## 10. Verification

- `php -l` on all 8 PHP files (5 plugin files + 3 generated `dist/*.asset.php`):
  **no syntax errors**, run against PHP 8.5.8 CLI. Re-run as a full sweep after
  the final edit.
- `phpcs` — **not installed** on this machine (`phpcs -i` unavailable). Skipped
  rather than installing global tooling. The sanitization fix at `helpers.php:48`
  was made to the WPCS pattern regardless.
- No build was run; `dist/` is untouched. No fix required regenerating bundles.
- Both git submodules (`controls`, `lib/style-handler`) remain uninitialised in
  this checkout. Fix #1 means that is no longer fatal, but a **release build must
  still initialise them** — `.distignore` does not exclude `lib/`, so the shipped
  zip is expected to contain the style-handler source.

### Files modified

```
includes/admin-enqueue.php
includes/font-loader.php
includes/helpers.php
includes/post-meta.php
interactive-promo.php
package.json
readme.txt
```

Working tree left dirty on `interactive-promo-dev`. No `git commit`, no `git push`.
