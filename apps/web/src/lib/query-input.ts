export function clearQueryInput() {
  const url = new URL(window.location.href)

  if (!url.searchParams.has('q')) {
    return
  }

  url.searchParams.delete('q')
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
}
