export function toLocalInputValue(date: Date): string {
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    'T',
    pad(date.getHours()),
    ':',
    pad(date.getMinutes()),
    ':',
    pad(date.getSeconds()),
  ].join('')
}

export function toLocalDisplay(date: Date): string {
  return toLocalInputValue(date).replace('T', ' ')
}

export function formatRelative(epochMs: number): string {
  const diffSeconds = Math.round((epochMs - Date.now()) / 1000)
  const absolute = Math.abs(diffSeconds)
  const suffix = diffSeconds >= 0 ? 'from now' : 'ago'

  if (absolute < 60) {
    return `${absolute}s ${suffix}`
  }

  if (absolute < 3600) {
    return `${Math.round(absolute / 60)}m ${suffix}`
  }

  if (absolute < 86400) {
    return `${Math.round(absolute / 3600)}h ${suffix}`
  }

  return `${Math.round(absolute / 86400)}d ${suffix}`
}

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}
