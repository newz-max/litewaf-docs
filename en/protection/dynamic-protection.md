---
pageClass: protection-doc
---

# Dynamic Protection

Dynamic Protection includes dynamic tokens, page mutation, and a local waiting room. All decisions use published local configuration and Gateway shared dictionaries, not control-plane database calls in the request hot path.

## Use Cases

- Issue short-lived dynamic tokens for admin or campaign browser paths.
- Inject controlled markers into small HTML responses.
- Use a local waiting room to limit admission during traffic peaks.

## Dashboard Entry

Open "Dynamic Protection / Waiting Room" in the dashboard. Choose rule type, path scope, TTL, failure action, or waiting-room capacity.

## How to Configure

1. In Dynamic Protection / Waiting Room, choose the rule type: dynamic token, page mutation, or waiting room.
2. Enter the path and choose "Prefix" or "Exact" in the match-mode selector.
3. For dynamic token rules, configure token TTL, token placement, and failure action.
4. For page mutation rules, configure injection marker and max buffer size.
5. For waiting-room rules, configure capacity, admission TTL, retry interval, and overflow action.

## Match Scope

Dynamic Protection supports "Exact" (published value `exact`) and "Prefix" (published value `prefix`). An empty method list means all methods. "Prefix" uses path segment boundaries, so `/admin` does not match `/admin2`.

Dynamic tokens support cookie, header, and query placement. Page mutation only handles responses whose `Content-Type` contains `text/html` and whose size is under the limit. Waiting-room state is local to the Gateway node, so multi-Gateway deployments do not provide exact global fairness.

## Publish Activation

Saving Dynamic Protection rules requires a publish. The Gateway evaluates Dynamic Protection after Bot Verification and before Attack Protection.

## Validation

1. Publish a narrow-path observe rule.
2. Access a dynamic-token path twice and confirm token issue and pass.
3. Confirm page mutation injects into HTML or skips safely.
4. Lower waiting-room capacity to test overflow and `Retry-After`.

## Log Fields

Filter by `module=dynamic-protection`. Common results include `token-issued`, `token-passed`, `token-failed`, `mutation-applied`, `mutation-skipped`, `queue-admitted`, `queue-queued`, `queue-blocked`, and `queue-observed`.

## False-Positive Risk

- Do not enable blocking dynamic tokens on `/` for the full site without compatibility checks.
- Header or query tokens require clients to store and return the token.
- The first waiting-room version uses node-local capacity and is not suitable for strict global fairness requirements.
