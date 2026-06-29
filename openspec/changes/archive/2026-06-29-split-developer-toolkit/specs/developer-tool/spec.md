## REMOVED Requirements

### Requirement: Developer value detection
**Reason**: Developer utilities are split into dedicated tool modules so each capability owns its detector, examples, fields, and tests.

**Migration**: Use the `jwt-tool`, `uuid-tool`, `hash-tool`, and `html-entities-tool` capabilities for the corresponding developer-category matches.

### Requirement: Developer fields
**Reason**: Field requirements are now owned by each specialized developer utility capability.

**Migration**: Use the field requirements in `jwt-tool`, `uuid-tool`, `hash-tool`, and `html-entities-tool`.
