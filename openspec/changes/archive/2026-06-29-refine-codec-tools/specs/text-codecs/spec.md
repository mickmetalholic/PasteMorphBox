## MODIFIED Requirements

### Requirement: URL and Base64 codecs
The app SHALL detect URL-oriented, Base64, and Base64URL text input and show conversion fields for readable text payloads.

#### Scenario: Encoded URL
- **WHEN** the user enters percent-encoded URL text
- **THEN** the app SHALL show decoded and encoded fields.

#### Scenario: URL parts
- **WHEN** the user enters a URL-like value with origin, path, or query parameters
- **THEN** the app SHALL show decoded URL fields and any detected query parameter fields.

#### Scenario: Base64 text
- **WHEN** the user enters Base64 text that decodes to mostly printable UTF-8 text
- **THEN** the app SHALL show decoded text and normalized Base64 fields.

#### Scenario: Base64URL text
- **WHEN** the user enters standalone Base64URL text that decodes to mostly printable UTF-8 text
- **THEN** the app SHALL show decoded text and normalized Base64URL fields.

#### Scenario: JWT-shaped text
- **WHEN** the user enters a dotted three-part JWT-shaped value
- **THEN** standalone Base64URL codec detection SHALL NOT claim the whole value as a Base64URL text match.
