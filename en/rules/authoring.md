# Rule Authoring

LiteWaf rules describe request detection conditions and handling behavior. Rules should remain explainable, reversible, and independent of remote execution logic.

## Core Fields

| Field | Description |
| --- | --- |
| Name | Human-readable rule name |
| Target | Detection target such as URI, header, query, body, or upload metadata |
| Expression | Match condition |
| Action | Log, block, or score |
| Score | Value used by policy threshold evaluation |
| Status | Whether the rule is enabled |

## Authoring Guidance

- Start with logging or a low-risk policy to validate hits, then move to blocking.
- Use clear names and descriptions for rules with higher false-positive risk.
- Maintain generic rules separately from business-specific rules.
- Use publish preview before publishing to confirm the rule enters the target site policy.

For dashboard module configuration, start with [Protection Modules](../protection/). CC Protection, Attack Protection, Access Control, Upload Protection, Bot Verification, Dynamic Protection, and Advanced Rules do not share exactly the same match scope.

## Unsupported Boundaries

At this stage, LiteWaf does not execute third-party remote code, does not dynamically run arbitrary Lua plugins as community rules, and does not perform remote signature verification in the Gateway request hot path.

Detailed fields and examples are available in [`litewaf-api/doc/规则编写指南.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E8%A7%84%E5%88%99%E7%BC%96%E5%86%99%E6%8C%87%E5%8D%97.md).
