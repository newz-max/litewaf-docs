---
pageClass: protection-doc
---

# Upload Protection

Upload Protection limits upload paths, dangerous extensions, and upload size. It records upload metadata and bounded summaries, not file contents.

## Use Cases

- Block dangerous extensions such as `.php`, `.jsp`, and `.exe`.
- Limit avatar, attachment, and import file size.
- Observe high-risk upload entry points before blocking.

## Dashboard Entry

Open "Upload Protection" in the dashboard. Configure path, match mode, methods, extensions, max bytes, and action.

## How to Configure

1. In Upload Protection, select the protected application and enabled state.
2. Enter the upload path and choose "Prefix" or "Exact" in the match-mode selector.
3. Select HTTP methods, usually the actual upload methods such as `POST` or `PUT`.
4. Enter dangerous extensions and max bytes; keep fields empty or default when they should not limit traffic.
5. Choose observe or block, save, and confirm the rule in publish preview.

## Match Scope

Upload Protection supports "Exact" (published value `exact`) and "Prefix" (published value `prefix`). "Exact" matches only the full path. "Prefix" matches by path segment boundary. An empty method list means all methods, but upload entry points should usually be limited to `POST` or `PUT`.

Extensions are evaluated from uploaded filename metadata. Max size is evaluated from request or upload metadata. When size metadata is not stable, observe logs before tightening rules.

## Upload Size Limit Layers

Upload size limits are not a single switch:

| Layer | Name | Stage | Upload protection event |
| --- | --- | --- | --- |
| L0 | Upstream proxy request body limit | Before LiteWaf | No |
| L1 | Gateway request body hard limit | OpenResty request body read | No |
| L2 | Request body inspection read limit | WAF body inspection | Possible WAF event |
| L3 | Upload protection size rule | Upload protection rules | Possible upload protection event |

Dashboard "System Settings / Upload Limits" and publish preview show the LiteWaf-controlled L1/L2/L3 summary. Disabling Upload Protection does not disable the L1 gateway hard limit. The final accepted upload size can also be constrained by L0 upstream proxies and the origin service.

## Publish Activation

Saving Upload Protection rules requires a publish. The Gateway evaluates Upload Protection after CC Protection and before Bot and Dynamic Protection.

## Validation

1. Publish observe mode and upload allowed and dangerous-extension samples.
2. Confirm `module=upload-protection` appears in attack logs.
3. Switch to blocking, publish, and confirm dangerous extensions or oversized uploads are rejected.

## Log Fields

Filter by `module=upload-protection`. Check `rule_name`, `target`, `threshold`, `upload_metadata`, `action`, and `disposition`.

If an upload endpoint returns 413, first check whether it hit the L1 gateway hard limit:

```bash
docker exec litewaf-gateway-1 /usr/local/openresty/bin/openresty -T | grep -n client_max_body_size
docker logs litewaf-gateway-1 2>&1 | grep -i "too large body"
```

OpenResty-native 413 responses happen before WAF rules and normally do not appear in attack logs as `module=upload-protection`. If L1 is correct, continue checking CDN, load balancer, host reverse proxy, or other L0 upstream limits.

## False-Positive Risk

- Do not set very low size limits on full-site paths.
- Extension checks do not replace backend content validation and storage isolation.
- Observe business filenames and MIME distribution before blocking.
