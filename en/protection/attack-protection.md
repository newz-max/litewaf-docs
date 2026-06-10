# Attack Protection

Attack Protection groups managed SQL injection, XSS, RCE, and path traversal rules. It manages managed attack rule enablement, actions, and priority. It does not include access control, upload protection, Bot verification, or Dynamic Protection capabilities.

## Use Cases

- Block common SQL injection, script injection, command execution, and path traversal attempts.
- Observe high false-positive rules before switching to blocking.
- Manage default managed rule groups in one module.

## Dashboard Entry

Open "Attack Protection" in the dashboard. Review managed rules by attack type or rule group, then adjust enablement, action, and priority.

## How to Configure

1. In Attack Protection, choose a managed rule group such as SQL injection, XSS, RCE, or path traversal.
2. Review group status, action, and priority. Start with observe or a low-risk action, then block after confirming hits.
3. If a rule depends on body inspection, enable body inspection in the policy and constrain Content-Type, path prefixes, and size limits.
4. Save the change, then use publish preview to confirm attack groups, actions, and risk prompts.

## Match Scope

Attack Protection matches managed rule target fields such as URI, query, header, body summary, or normalized path. Body inspection requires explicit policy enablement and is constrained by Content-Type, path prefixes, and size limits.

## Publish Activation

Changes to attack groups, actions, enablement, and priority require a publish. The Gateway evaluates the published local rules and does not read the control plane in the request hot path.

## Validation

1. Publish an observe-mode rule and send a request containing a test payload.
2. Confirm a `module=attack-protection` event in attack logs.
3. Switch the action to blocking, publish again, and confirm the matched request is blocked.

## Log Fields

Filter by `module=attack-protection`. Check `attack_type`, `group_name`, `rule_id`, `rule_name`, `target`, `action`, `score`, `summary`, and `disposition`.

## False-Positive Risk

- Do not use Attack Protection as access control; use Access Control for path allow/block rules.
- Body inspection adds processing cost, so enable it only on needed paths.
- Logs keep bounded summaries and do not store full sensitive payloads.
