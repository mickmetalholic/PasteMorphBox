import type { EntityKey } from './types'

export const entityLabels = {
  emails: 'Emails',
  urls: 'URLs',
  phones: 'Phone-like values',
  dates: 'Dates',
  money: 'Money amounts',
  numbers: 'Numbers',
  domains: 'Domains',
  hashtags: 'Hashtags',
  mentions: 'Mentions',
  ips: 'IP addresses',
} satisfies Record<EntityKey, string>

export const entityPatterns: Record<EntityKey, RegExp> = {
  emails: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  urls: /\bhttps?:\/\/[^\s<>"']+/gi,
  phones: /(?:\+?\d[\d\s().-]{7,}\d)/g,
  dates: /\b(?:\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4}|[A-Z][a-z]{2,9}\s+\d{1,2},?\s+\d{4})\b/g,
  money: /(?:[$€£¥]\s?\d[\d,]*(?:\.\d{2})?|\b\d[\d,]*(?:\.\d{2})?\s?(?:USD|EUR|GBP|JPY|CNY)\b)/gi,
  numbers: /\b-?\d+(?:,\d{3})*(?:\.\d+)?\b/g,
  domains: /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}\b/gi,
  hashtags: /#[\p{L}\p{N}_-]+/gu,
  mentions: /(?<![\w.])@[\p{L}\p{N}_-]+/gu,
  ips: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,
}
