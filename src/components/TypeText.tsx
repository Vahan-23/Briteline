type TypeTextProps = {
  text: string;
};

const STEP_MS = 18;

/** Reveals characters in order. The full string stays in the DOM. */
export function TypeText({ text }: TypeTextProps) {
  const characters = Array.from(text);

  return (
    <>
      {characters.map((character, index) => (
        <span key={`${character}-${index}`} className="type-char" style={{ animationDelay: `${index * STEP_MS}ms` }}>
          {character}
        </span>
      ))}
      <span aria-hidden="true" className="type-caret" style={{ animationDelay: `${characters.length * STEP_MS}ms` }} />
    </>
  );
}
