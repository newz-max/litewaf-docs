---
pageClass: protection-doc
---

# IP Access Lists

IP Access Lists allow or block requests by source IP or CIDR. This is a standalone module and should not be mixed with path, header, or host access control.

## Use Cases

- Allow office networks, monitoring nodes, or trusted origin callers.
- Block confirmed attack sources, proxy pools, or abusive networks.
- Apply application-scoped exceptions for one protected application.

## Dashboard Entry

Open "IP Access Lists" in the dashboard. Choose allow or block, IP or CIDR, and global or application scope.

## How to Configure

1. In IP Access Lists, choose the scope: global or a specific protected application.
2. Choose the action: allow or block.
3. Choose the address type: Exact IP or CIDR. Exact IP is one source address; CIDR is a network range.
4. Enter IP, CIDR prefix length, name, and enabled state.
5. Save the entry, then use publish preview to confirm allow, block, Exact IP, CIDR, global, and application-scoped counts.

## Match Scope

Exact IP entries match one source address. CIDR entries match a network, such as `203.0.113.0/24`. The Gateway evaluates the effective client IP, which depends on trusted proxy configuration.

Application-scoped entries take precedence over global entries. Within the same scope and specificity, allow entries take precedence over block entries for emergency recovery. Exact entries and CIDR entries are evaluated separately.

## Publish Activation

Saving IP entries requires a publish. The Gateway uses the published local `ip_access_index` and does not query the control plane database.

## Validation

1. Access the protected application from a controlled source IP or trusted proxy test header.
2. Confirm allowed entries proxy normally and blocked entries are rejected.
3. In publish preview, confirm enabled, allow, block, exact IP, CIDR, global, and site-scoped counts.

## Log Fields

Check source IP, disposition, and rejection reason in blocked/rejected records and access logs. For WAF events, check `module=ip-access-list`, action, and entry name.

## False-Positive Risk

- Global CIDR blocks have a wide blast radius; prefer application scope.
- Incorrect real IP configuration can allow or block the wrong clients.
- Do not express path rules in IP lists; use Access Control for path, header, and host rules.
