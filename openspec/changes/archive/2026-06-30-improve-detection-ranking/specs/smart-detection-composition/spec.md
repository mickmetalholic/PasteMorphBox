## ADDED Requirements

### Requirement: Ranked detection results
The registry SHALL return direct and derived matches in an order that favors strong, specific interpretations over generic fallback interpretations.

#### Scenario: Structured input outranks text cleanup
- **WHEN** pasted input directly matches a structured tool and the text cleanup tool
- **THEN** the structured tool match SHALL be ranked ahead of the text cleanup match.

#### Scenario: Extraction outranks text cleanup
- **WHEN** pasted input contains extractable entities and also matches text cleanup
- **THEN** the extraction match SHALL be ranked ahead of the text cleanup match.

#### Scenario: Weak developer utility does not outrank stronger structured input
- **WHEN** pasted input produces a weak developer utility match and a stronger structured or extraction match
- **THEN** the stronger structured or extraction match SHALL be ranked ahead of the weak developer utility match.

#### Scenario: Derived payload remains secondary to strong direct interpretation
- **WHEN** pasted input has a strong direct interpretation and also produces derived payload matches
- **THEN** the strong direct interpretation SHALL remain ranked ahead unless a derived match has a higher adjusted confidence.

#### Scenario: Plain text fallback
- **WHEN** pasted input only produces generic text cleanup
- **THEN** the text cleanup match SHALL still be returned.
