import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PasteConverter } from '../PasteConverter'
import { useInputStore } from '../store/input-store'

const clipboardWriteText = vi.fn<() => Promise<void>>(() => Promise.resolve())
const navigationMock = vi.hoisted(() => ({
  searchParams: new URLSearchParams(),
}))

vi.mock('next/navigation', () => ({
  useSearchParams: () => navigationMock.searchParams,
}))

function installClipboardMock() {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: clipboardWriteText,
    },
  })
}

beforeEach(() => {
  clipboardWriteText.mockClear()
  installClipboardMock()
  useInputStore.getState().setInput('')
  window.history.replaceState(null, '', '/')
})

async function renderApp(path = '/') {
  window.history.replaceState(null, '', path)
  navigationMock.searchParams = new URL(path, 'http://localhost').searchParams

  const user = userEvent.setup()
  installClipboardMock()

  render(<PasteConverter />)

  await screen.findByLabelText('Smart input')

  return { user }
}

function smartInput() {
  return screen.getByLabelText('Smart input') as HTMLTextAreaElement
}

describe('App interactions', () => {
  it('initializes from q search and clears stale URL state when editing', async () => {
    const { user } = await renderApp('/?q=%23ff6600')

    expect(smartInput().value).toBe('#ff6600')
    await screen.findByText('Color conversion')

    await user.clear(smartInput())
    await user.type(smartInput(), '1700000000')

    expect(smartInput().value).toBe('1700000000')
    expect(window.location.search).toBe('')
    await screen.findByText('Timestamp conversion')
  })

  it('applies examples and no-match suggestions to the smart input', async () => {
    const { user } = await renderApp()

    await user.click(screen.getByRole('button', { name: /Examples/i }))
    await user.click(within(screen.getByRole('region', { name: 'Examples' })).getByText('URL parts').closest('button')!)

    expect(smartInput().value).toBe('https://example.com/orders?id=42&status=ready#details')
    await screen.findByText('URL conversion')

    await user.clear(smartInput())
    await user.type(smartInput(), 'x')
    await screen.findByText('No strong match yet')
    await user.click(screen.getByRole('button', { name: /JSON object/i }))

    expect(smartInput().value).toContain('"user"')
    await screen.findByText('JSON formatting')
  })

  it('keeps card edits local until applying the card value to input', async () => {
    const { user } = await renderApp('/?q=%23000000')

    await screen.findByText('Color conversion')
    const rgbField = screen.getByDisplayValue('rgb(0 0 0)')

    fireEvent.change(rgbField, { target: { value: 'rgb(255 255 255)' } })

    expect(smartInput().value).toBe('#000000')
    await screen.findByText(/Edited inside this card/)

    await user.click(screen.getAllByRole('button', { name: /Apply to input/i })[0]!)

    expect(smartInput().value).toBe('#ffffff')
  })

  it('retains card-local edits when matching input updates keep the same card id', async () => {
    const { user } = await renderApp('/?q=%23000000')

    await screen.findByText('Color conversion')
    const rgbField = screen.getByDisplayValue('rgb(0 0 0)')

    fireEvent.change(rgbField, { target: { value: 'rgb(255 255 255)' } })
    await screen.findByText(/Edited inside this card/)

    await user.type(smartInput(), ' ')

    expect(screen.getByDisplayValue('rgb(255 255 255)')).toBeInTheDocument()
    expect(smartInput().value).toBe('#000000 ')
  })

  it('copies individual fields and all fields through the clipboard API', async () => {
    const { user } = await renderApp('/?q=%23ff6600')

    await screen.findByText('Color conversion')
    await user.click(screen.getByTitle('Copy HEX'))

    expect(clipboardWriteText).toHaveBeenLastCalledWith('#ff6600')

    await user.click(screen.getAllByRole('button', { name: /Copy all/i })[0]!)

    expect(clipboardWriteText).toHaveBeenLastCalledWith(expect.stringContaining('HEX\n#ff6600'))
    expect(clipboardWriteText).toHaveBeenLastCalledWith(expect.stringContaining('RGB\nrgb(255 102 0)'))
  })

  it('copies edited visible card fields through the bulk copy action', async () => {
    const { user } = await renderApp('/?q=%23000000')

    await screen.findByText('Color conversion')
    fireEvent.change(screen.getByDisplayValue('rgb(0 0 0)'), { target: { value: 'rgb(255 255 255)' } })

    await user.click(screen.getAllByRole('button', { name: /Copy all/i })[0]!)

    expect(clipboardWriteText).toHaveBeenLastCalledWith(expect.stringContaining('RGB\nrgb(255 255 255)'))
  })
})
