import type {ReactNode} from 'react';
import styles from './ExperimentPage/styles.module.css';

// `code` spans in YAML text become <code>; the rest stays plain text.
export function inline(text: string | undefined): ReactNode {
  if (!text) return text;
  const parts = text.split(/`([^`\n]+)`/);
  if (parts.length === 1) return text;
  return parts.map((t, i) => (i % 2 ? <code key={i}>{t}</code> : t));
}

// The same text with the backticks dropped, for one-line places such as lists.
export const plain = (text: string) => text.replace(/`([^`\n]+)`/g, '$1');

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
              <li key={j}>{inline(join(item.slice(2)))}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{inline(join(b))}</p>
        ),
      )}
    </div>
  );
}
