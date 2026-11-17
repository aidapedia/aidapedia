type TextRevealProps = {
  text: string
  /** When the first word starts, in ms. */
  delay?: number
  /** Between one word and the next, in ms. */
  stagger?: number
}

// Each word rises out of its own clipped line, one after another. The text stays whole for a screen reader.
export default function TextReveal({ text, delay = 0, stagger = 90 }: TextRevealProps) {
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            {/* The padding gives descenders room inside the clip, and the negative margin hands it back. */}
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <span className="word-rise inline-block" style={{ animationDelay: `${delay + i * stagger}ms` }}>{word}</span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  )
}
