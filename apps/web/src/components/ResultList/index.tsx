import { useEffect, useState } from 'react'
import type { AnyToolMatch } from '@pastemorphbox/core'
import type { CardState } from '../../types/card-state'
import { ToolCard } from '../ToolCard'

export function ResultList({ matches, onApplyInput }: { matches: AnyToolMatch[]; onApplyInput: (value: string) => void }) {
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({})

  useEffect(() => {
    setCardStates((current) => {
      const next: Record<string, CardState> = {}

      for (const match of matches) {
        next[match.matchId] = current[match.matchId] ?? {
          state: match.state,
          dirty: false,
        }
      }

      return next
    })
  }, [matches])

  return (
    <section className="grid gap-4">
      {matches.map((match, index) => (
        <ToolCard
          key={match.matchId}
          match={match}
          rank={index + 1}
          cardState={cardStates[match.matchId] ?? { state: match.state, dirty: false }}
          onApplyInput={onApplyInput}
          onStateChange={(state) =>
            setCardStates((current) => ({
              ...current,
              [match.matchId]: state,
            }))
          }
        />
      ))}
    </section>
  )
}
