import type { AnyToolMatch } from '@pastemorphbox/core'
import { resolveToolCard } from '../../lib/result-card'
import { initialCardState, useCardStates } from '../../lib/use-card-states'
import { ToolCard } from '../ToolCard'

export function ResultList({ matches, onApplyInput }: { matches: AnyToolMatch[]; onApplyInput: (value: string) => void }) {
  const { cardStates, setCardState } = useCardStates(matches)
  const cards = matches.flatMap((match, index) => {
    const card = resolveToolCard({
      match,
      rank: index + 1,
      cardState: cardStates[match.matchId] ?? initialCardState(match),
      onApplyInput,
      onStateChange: (state) => setCardState(match.matchId, state),
    })

    return card ? [card] : []
  })

  return (
    <section className="grid gap-4">
      {cards.map((card) => (
        <ToolCard key={card.matchId} card={card} />
      ))}
    </section>
  )
}
