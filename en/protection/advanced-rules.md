# Advanced Rules

Advanced Rules cover rule package import, signature status, source tracking, rule testing, and community contribution flow. The Gateway reads only published executable rules and does not pull remote catalogs or verify signatures in the request hot path.

## Use Cases

- Import local JSON rule packages.
- Preview added, changed, skipped, and invalid rules from external packages.
- Test blocking rules before binding them to policies and publishing.
- Prepare community rule contributions and exports.

## Dashboard Entry

Open "Advanced Rule Ecosystem" in the dashboard. Use preview, import, test, and export actions to manage rule packages.

## Recommended Settings

| Scenario | Recommendation |
| --- | --- |
| First import | Preview first, then check signature, source, rule count, and invalid entries |
| Blocking rollout | Test first, then publish with observe mode or a low-risk policy |
| Community maintenance | Keep source, category, attack type, group, and description metadata |
| Rule export | Export only sanitized public rule metadata and expressions |

## Match Scope

Imported rules reuse existing rule fields such as target, expression, action, score, module, category, attack type, group, priority, and enabled state. Execution depends on published policy bindings and module configuration.

Rule tests evaluate expressions against bounded sample requests. They support path, query, headers, body summaries, and upload metadata, and do not save full bodies, Authorization, Cookie, or uploaded file content.

## Publish Activation

Preview, sync, update preview, export preview, and rule testing do not automatically enable, disable, delete, or publish rules. Control-plane rule data changes only after import or explicit apply; the Gateway still requires a publish before execution.

## Validation

1. Preview the package and resolve invalid entries.
2. After import, confirm real rules exist in rule management.
3. Use rule testing to validate matches.
4. Bind a policy and publish, then confirm matched events in attack logs.

## Log Fields

Query by the rule's module, such as `attack-protection` or advanced expression events. Check `rule_id`, `rule_name`, `target`, `action`, `score`, `summary`, `disposition`, and package source summary.

## False-Positive Risk

- Unsigned packages can be imported locally, but need stricter review before publishing.
- Do not publish untested blocking rules to the full site.
- Remote catalog outages do not affect already published rules.

