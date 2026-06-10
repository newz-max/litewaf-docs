---
pageClass: protection-doc
---

# Bot Verification

Bot Verification adds local JS challenge, captcha, behavior scoring, and device-signal checks before sensitive paths. The Gateway does not call third-party captcha services in the request hot path.

## Use Cases

- Protect admin, login, payment, and campaign browser paths.
- Challenge requests with abnormal User-Agent, missing Accept-Language, or similar light signals.
- Protect SEO-visible pages while limiting basic scripts.

## Dashboard Entry

Open "Bot / Human Verification" in the dashboard. Choose challenge mode, verification TTL, failure action, path scope, and enhancement options.

## How to Configure

1. In Bot / Human Verification, select the protected application and enabled state.
2. Enter the path and choose "Prefix" or "Exact" in the match-mode selector.
3. Choose the challenge mode: JS challenge or captcha.
4. Set verification TTL and failure action; observe first, then block.
5. Enable behavior scoring, device-signal binding, or search-engine bypass only after checking client compatibility.

## Match Scope

Bot rules support "Exact" (published value `exact`) and "Prefix" (published value `prefix`). An empty method list means all methods. "Prefix" uses path segment boundaries to avoid matching `/admin2` from `/admin`.

`js-challenge` issues a locally signed cookie and allows subsequent requests during the TTL. `captcha` uses local arithmetic verification and then writes a signed cookie. Behavior scoring uses light request header signals and does not store raw fingerprints. Search-engine bypass uses User-Agent and does not perform reverse DNS verification in this version.

## Publish Activation

Saving Bot rules requires a publish. The Gateway evaluates Bot Verification after Upload Protection and before Dynamic Protection.

## Validation

1. Publish observe mode or a narrow-path rule.
2. Access with a real browser and confirm challenge issue and pass.
3. Access with a script or missing headers and confirm challenge results in logs.
4. Switch to blocking, publish, and confirm failed requests are blocked.

## Log Fields

Filter by `module=bot-protection`. Check `challenge_mode`, `challenge_result`, `bot_result`, `bot_reason`, `device_signal`, `action`, and `disposition`.

## False-Positive Risk

- Full-site blocking challenges can affect API clients and search engines.
- Search-engine bypass can be spoofed and should not be treated as strong authentication.
- Device-signal binding can invalidate tokens when UA or language settings change.
