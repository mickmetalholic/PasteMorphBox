import { useEffect, useState } from 'react'
import type { AnyToolMatch } from '@pastemorphbox/core'
import type { CardState } from '../types/card-state'

export function useCardStates(matches: AnyToolMatch[]) {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({})

  useEffect(() => {
    setCardStates((current) => reconcileCardStates(current, matches))
  }, [matches])

  return {
    cardStates,
    setCardState(matchId: string, state: CardState) {
      setCardStates((current) => ({
        ...current,
        [matchId]: state,
      }))
    },
  }
}

export function initialCardState(match: AnyToolMatch): CardState {
  return {
    state: match.state,
    dirty: false,
  }
}

function reconcileCardStates(current: Record<string, CardState>, matches: AnyToolMatch[]): Record<string, CardState> {
  const next: Record<string, CardState> = {}

  for (const match of matches) {
    next[match.matchId] = current[match.matchId] ?? initialCardState(match)
  }

  return next
}
