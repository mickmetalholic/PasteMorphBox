## MODIFIED Requirements

### Requirement: URL and Base64 codecs

The app SHALL detect URL-oriented text, printable Base64 text, and arbitrary non-empty text that can be encoded as UTF-8 Base64, then show conversion fields.

#### Scenario: Encoded URL

- **WHEN** the user enters percent-encoded URL text
- **THEN** the app SHALL show decoded and encoded fields.

#### Scenario: Printable Base64 text

- **WHEN** the user enters Base64 text that decodes to printable UTF-8 content
- **THEN** the app SHALL show decoded text and encoded Base64 fields.

#### Scenario: Arbitrary text Base64 encoding

- **WHEN** the user enters arbitrary non-empty text that does not decode as printable Base64
- **THEN** the app SHALL show a Base64 result with an encoded Base64 field for the original text.
