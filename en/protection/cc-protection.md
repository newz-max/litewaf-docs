# CC Protection

CC Protection limits high-frequency access, login brute force, API abuse, 404 scans, and attack-hit frequency. Rules execute as `module=cc-protection` and `category=rate-limit`.

## Use Cases

- Protect login, SMS, captcha, search, and other expensive endpoints.
- Rate-limit API calls.
- Apply a baseline full-site request rate guard.
- Limit 404 scans and repeated attack hits.

## Dashboard Entry

Open "CC Protection" in the dashboard. Read-only users can view rules; administrators can create, edit, delete, enable, and disable rules.

## Recommended Settings

| Scenario | Path | Match | Method | Counter | Threshold and action |
| --- | --- | --- | --- | --- | --- |
| Login brute force | `/api/login` | `exact` | `POST` | `client_ip` | 10 requests / 60 seconds, `ban` for 600 seconds |
| API rate limit | `/api/` | `prefix` | All | `client_ip_path` | 120 requests / 60 seconds, `rate-limit` |
| Site baseline | `/` | `prefix` | All | `client_ip` | 300 requests / 60 seconds, `rate-limit` |
| 404 scan | `/api/*` | `glob` | All | `not_found_frequency` | 20 requests / 60 seconds, `rate-limit` |
| Session login limit | `/api/login` | `exact` | `POST` | `session` | 8 requests / 60 seconds, `block` |

## Match Scope

`exact` requires the request URI path to equal the configured path. `/api/login` matches only `/api/login`, not `/api/login/`; the Gateway evaluates the path portion, not the query string.

`prefix` matches by path segment boundary. `/admin` matches `/admin` and `/admin/users`, but not `/admin2`. Configuring `/api/` covers `/api`, `/api/`, and `/api/users`, which is suitable for multi-level API prefixes.

`glob` is supported only by CC Protection and is a restricted path wildcard. `*` matches any characters within a single path segment and does not cross `/`; `?` matches one non-`/` character. Regular expressions, character classes, and `**` are not supported. For example, `/api/*` matches `/api/login`, but not `/api/v1/login`. Use `prefix=/api/` for multi-level paths.

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
- `glob` fits single-level paths; use `prefix` for multi-level APIs.
- Verify trusted proxy and real client IP settings before IP-based counters.

