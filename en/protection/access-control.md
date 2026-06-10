# Access Control

Access Control allows, observes, or blocks requests by path, header, or host. Source IP and CIDR rules belong in the standalone IP Access Lists module.

## Use Cases

- Block admin paths, debug paths, or internal endpoints.
- Allow a canary entry only when a specific header is present.
- Restrict access by exact host or host suffix.

## Dashboard Entry

Open "Access Control" in the dashboard. Choose target type, match mode, method scope, and action.

## Recommended Settings

| Scenario | Target | Match | Action |
| --- | --- | --- | --- |
| Admin path | path `/admin` | `prefix` | `block` or start with `log-only` |
| Single internal endpoint | path `/internal/status` | `exact` | `block` |
| Header check | header `X-Internal-Token` | `exact` or `contains` | `allow` / `block` |
| Host limit | host `example.com` | `exact` or `suffix` | `allow` / `block` |

## Match Scope

Path matching supports `exact` and `prefix`. `exact` requires the path to match exactly. `prefix` matches by path segment boundary, so `/admin` matches `/admin/users` but not `/admin2`.

Header matching reads the configured header name and supports exact or contains matching. Host matching ignores the port and supports exact domain or suffix domain matching.

An empty method list means all HTTP methods. An allow rule lets the request continue to proxy. A block rule rejects the request. An observe rule records an event only.

## Publish Activation

Access Control rules require a publish after saving. The Gateway evaluates Access Control before CC Protection, making it suitable for clear path, header, and host rules.

## Validation

1. Publish an observe-mode rule and access matching and non-matching paths.
2. Confirm `/admin` matches while `/admin2` does not.
3. Switch to allow or block, publish, and confirm the response changes.

## Log Fields

Filter by `module=access-control`. Check `target`, `rule_name`, `action`, `disposition`, and summary.

## False-Positive Risk

- Broad allow rules can bypass later modules, so keep scope narrow.
- Header values can be sensitive; logs store only bounded summaries.
- Do not block the full site with `/` unless the impact is confirmed.

