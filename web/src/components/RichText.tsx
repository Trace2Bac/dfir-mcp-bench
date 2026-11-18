import styles from './ExperimentPage/styles.module.css';

// Text from the YAML files: blank lines separate paragraphs, and a block that
// starts with "- " is a list. In a list, a line that does not start with "- "
// continues the item above it.
export default function RichText({text}: {text: string}) {
  const blocks = text
    .split(/\n\s*\n/)
    .map(b => b.trim())
    .filter(Boolean);
  const join = (s: string) => s.replace(/\s*\n\s*/g, ' ');
  return (
    <div className={styles.rich}>
      {blocks.map((b, i) =>
        b.startsWith('- ') ? (
          <ul key={i}>
            {b.split(/\n(?=- )/).map((item, j) => (
              <li key={j}>{join(item.slice(2))}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{join(b)}</p>
        ),
      )}
    </div>
  );
}
