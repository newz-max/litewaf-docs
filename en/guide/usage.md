# Daily Usage

LiteWaf daily work follows a simple loop: create resources, adjust protection, publish configuration, and validate gateway behavior. The control plane stores configuration, while the Gateway enforces only the published version.

## Operating Flow

1. Create a site with host, listener port, protocol, and origin settings.
2. Configure rules, policies, IP blacklists and whitelists, access control, rate limits, and protection modules.
3. Use publish preview to inspect the configuration that will be sent to the Gateway.
4. Publish the configuration.
5. Access the business domain or port through the Gateway, then inspect access logs, attack logs, reports, and publish records.

## Publish Lifecycle

The following changes require publishing before they reach the Gateway:

- Sites, listener ports, certificates, and origins.
- Rules, rule sets, policies, and score thresholds.
- IP blacklist, IP whitelist, access control, and rate limits.
- CC protection, Bot protection, dynamic protection, upload protection, and advanced rule settings.

If the Dashboard saves successfully but gateway behavior does not change, check publish records, the active version, and Gateway logs first.

## Validation

| Goal | Suggested check |
| --- | --- |
| Normal proxying | Access the application URL through the Gateway and confirm the origin response |
| WAF blocking | Send a request that matches a rule and confirm a blocking response |
| Log ingestion | Review access logs, WAF events, and reports |
| Publish status | Review publish records, version numbers, and Gateway refresh status |

Full operation details are available in [`litewaf-api/doc/使用说明.md`](https://github.com/newz-max/litewaf-api/blob/master/doc/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md).
