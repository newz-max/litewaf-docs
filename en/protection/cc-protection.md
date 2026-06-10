# CC Protection

CC Protection limits high-frequency access, login brute force, API abuse, 404 scans, and attack-hit frequency. Rules execute as `module=cc-protection` and `category=rate-limit`.

## Use Cases

- Protect login, SMS, captcha, search, and other expensive endpoints.
- Rate-limit API calls.
- Apply a baseline full-site request rate guard.
- Limit 404 scans and repeated attack hits.

## Dashboard Entry

Open "CC Protection" in the dashboard. Read-only users can view rules; administrators can create, edit, delete, enable, and disable rules.

## How to Configure

1. Select the protected application; keep global scope only when the rule should apply globally.
2. Enter the URI path, such as `/api/login`, `/api/`, or `/api/*`.
3. In the match-mode selector, choose "Prefix", "Exact", or "Glob". "Glob" appears only on the CC Protection page.
4. Select HTTP methods to count; leaving methods empty means all methods.
5. Choose the counter: `client_ip`, `client_ip_path`, `global`, `session`, `device`, `not_found_frequency`, or `attack_frequency`.
6. Set window, threshold, action, and ban duration. Validate with observe mode or loose thresholds before blocking or banning.

## Match Scope

"Exact" (published value `exact`) requires the request URI path to equal the configured path. `/api/login` matches only `/api/login`, not `/api/login/`; the Gateway evaluates the path portion, not the query string.

"Prefix" (published value `prefix`) matches by path segment boundary. `/admin` matches `/admin` and `/admin/users`, but not `/admin2`. Configuring `/api/` covers `/api`, `/api/`, and `/api/users`, which is suitable for multi-level API prefixes.

"Glob" (published value `glob`) is supported only by CC Protection and is a restricted path wildcard. `*` matches any characters within a single path segment and does not cross `/`; `?` matches one non-`/` character. Regular expressions, character classes, and `**` are not supported. For example, `/api/*` matches `/api/login`, but not `/api/v1/login`. For multi-level paths, choose "Prefix" in the Dashboard and enter `/api/`.

An empty method list means all HTTP methods. Counters include `client_ip`, `client_ip_path`, `global`, `not_found_frequency`, `attack_frequency`, `session`, and `device`. `session` requires a Cookie or Header name. `device` derives a coarse key from request signals and does not store raw fingerprints.

## Publish Activation

Saving or simulation preview does not update Gateway counters or active rules. The Gateway loads CC rules only after publishing. Publish preview warns about low full-site thresholds, broad `glob` rules, and blocking actions.

## Validation

1. After publishing, send requests above the threshold to the target path.
2. Confirm a `429` response or the configured blocking result.
3. Change the threshold or roll back the publish and verify behavior returns.

## Log Fields

Filter attack logs by `module=cc-protection`. Check `rule_name`, `counter`, `threshold`, `window_sec`, `action`, `disposition`, and request path.

## False-Positive Risk

- Do not start with a very low threshold on `/` and immediate blocking.
- Login bans can affect legitimate users sharing the same IP, so observe first.
- "Glob" fits single-level paths; use "Prefix" for multi-level APIs.
- Verify trusted proxy and real client IP settings before IP-based counters.
