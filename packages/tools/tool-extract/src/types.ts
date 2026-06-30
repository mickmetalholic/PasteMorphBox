export type EntityKey = 'emails' | 'urls' | 'phones' | 'dates' | 'money' | 'numbers' | 'domains' | 'hashtags' | 'mentions' | 'ips'

export type EntityGroup = {
  key: EntityKey
  label: string
  values: string[]
}

export type ExtractState = {
  raw: string
  groups: EntityGroup[]
  csv: string
  total: number
}
