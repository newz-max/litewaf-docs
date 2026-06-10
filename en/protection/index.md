# Protection Modules

LiteWaf protection modules organize common WAF operations for dashboard users. The control plane stores module settings, while the Gateway enforces only the published version. Creating, editing, deleting, enabling, or disabling rules requires a publish before real traffic changes.

## Module Entries

| Module | Use case |
| --- | --- |
| [CC Protection](cc-protection.md) | High-frequency access, login brute force, API abuse, 404 scans |
| [Attack Protection](attack-protection.md) | Managed SQL injection, XSS, RCE, and path traversal rules |
| [IP Access Lists](ip-access-list.md) | Global or application-scoped allow/block by source IP or CIDR |
| [Access Control](access-control.md) | Allow, observe, or block by path, header, or host |
| [Upload Protection](upload-protection.md) | Upload paths, dangerous extensions, and upload size limits |
| [Bot Verification](bot-protection.md) | JS challenge, local captcha, behavior scoring, and device signals |
| [Dynamic Protection](dynamic-protection.md) | Dynamic tokens, page mutation, and local waiting room |
| [Advanced Rules](advanced-rules.md) | Rule package import, signature status, rule testing, and community flow |

## Common Rollout Flow

1. Create or edit a rule in the target module, starting with observe mode or a narrow path.
2. Use publish preview to inspect Gateway-bound rule counts, actions, and risk prompts.
3. Publish the configuration.
4. Access the target path through the Gateway and verify normal and matched requests.
5. Check access logs, attack logs, blocked/rejected records, and reports for module fields.

## Match Scope

CC Protection shows "Prefix", "Exact", and "Glob" in the match-mode selector. Access Control, Upload Protection, Bot Verification, and Dynamic Protection primarily use "Prefix" and "Exact". The values `prefix`, `exact`, and `glob` are mentioned only to explain the published configuration. Attack Protection and Advanced Rules execute by rule target fields. IP Access Lists execute by source IP or CIDR.

## Publish Boundary

Saving, previewing, testing, importing, syncing, or exporting in module pages does not directly change the active Gateway configuration. The Gateway loads new local configuration only after a successful publish.

## Validation Entries

- Access logs: confirm the request reached the Gateway, status code, and disposition.
- Attack logs: filter events by `module`.
- Blocked/rejected records: trace denied requests back to module reasons.
- Publish records: confirm the active version, publish summary, and risk prompts.
