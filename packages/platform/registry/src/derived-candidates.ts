import { decodePrintableBase64, decodePrintableBase64Url } from '@pastemorphbox/tool-base64'
import { decodeJwtPayloadText } from '@pastemorphbox/tool-jwt'
import { decodePercentText, decodeUrlParameterValue, extractUrlParamValues } from '@pastemorphbox/tool-url'

export type DerivedCandidate = {
  source: string
  label: string
}

type CandidateProducer = (source: string) => DerivedCandidate[]

const candidateProducers: CandidateProducer[] = [
  percentDecodedCandidate,
  urlParameterCandidates,
  base64Candidate,
  base64UrlCandidate,
  jwtPayloadCandidate,
]

export function deriveCandidates(input: string): DerivedCandidate[] {
  const source = input.trim()

  if (!source) {
    return []
  }

  return dedupeCandidates(candidateProducers.flatMap((producer) => producer(source)), source)
}

function percentDecodedCandidate(source: string): DerivedCandidate[] {
  return candidateFromValue(decodePercentText(source), 'percent-decoded input')
}

function urlParameterCandidates(source: string): DerivedCandidate[] {
  return extractUrlParamValues(source).flatMap((value) => [
    ...candidateFromValue(value, 'decoded URL query parameter'),
    ...candidateFromValue(decodeUrlParameterValue(value), 'decoded URL query parameter'),
  ])
}

function base64Candidate(source: string): DerivedCandidate[] {
  return candidateFromValue(decodePrintableBase64(source), 'Base64 decoded input')
}

function base64UrlCandidate(source: string): DerivedCandidate[] {
  return candidateFromValue(decodePrintableBase64Url(source), 'Base64URL decoded input')
}

function jwtPayloadCandidate(source: string): DerivedCandidate[] {
  return candidateFromValue(decodeJwtPayloadText(source), 'JWT payload')
}

function candidateFromValue(value: string | null, label: string): DerivedCandidate[] {
  const source = value?.trim()
  return source ? [{ source, label }] : []
}

function dedupeCandidates(candidates: DerivedCandidate[], original: string): DerivedCandidate[] {
  const seen = new Set<string>()
  const result: DerivedCandidate[] = []

  for (const candidate of candidates) {
    if (candidate.source === original || seen.has(candidate.source)) {
      continue
    }

    seen.add(candidate.source)
    result.push(candidate)
  }

  return result
}
