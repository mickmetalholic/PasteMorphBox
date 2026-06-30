## Why

PasteMorphBox now has many independent tool packages and derived detection paths. Existing tests cover the basic happy paths, but several core detector, converter, and registry contracts need stronger regression coverage before more tools are added.

## What Changes

- Expand tests for high-risk existing tools, especially URL, JSON, time, and color.
- Add shared contract-style expectations for module metadata, fields, serialization, edit failures, and non-match behavior.
- Add registry tests for ordering and derived-source interactions that can easily regress as tools are added.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `developer-workflow`: Require tool and registry regression coverage for detector and converter behavior.

## Impact

- Affects `packages/tool-*` tests and `packages/registry` tests.
- No user-facing behavior or public tool module contracts are intended to change.
