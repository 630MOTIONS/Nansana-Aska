// Small, pure helpers the editor toolbar uses to change the text. Each takes the
// current text and selection and returns the new text and selection.
export type EditResult = {
  value: string;
  selectionStart: number;
  selectionEnd: number;
};

// Wraps the selection (or a placeholder) in markers, for example **bold**.
export function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder: string,
): EditResult {
  const selected = value.slice(start, end) || placeholder;
  const next =
    value.slice(0, start) + before + selected + after + value.slice(end);
  return {
    value: next,
    selectionStart: start + before.length,
    selectionEnd: start + before.length + selected.length,
  };
}

// Puts a prefix at the start of every line touched by the selection.
export function prefixLines(
  value: string,
  start: number,
  end: number,
  prefix: string,
): EditResult {
  const lineStart = start === 0 ? 0 : value.lastIndexOf("\n", start - 1) + 1;
  const newline = value.indexOf("\n", end);
  const lineEnd = newline === -1 ? value.length : newline;
  const prefixed = value
    .slice(lineStart, lineEnd)
    .split("\n")
    .map((line) => prefix + line)
    .join("\n");
  return {
    value: value.slice(0, lineStart) + prefixed + value.slice(lineEnd),
    selectionStart: lineStart,
    selectionEnd: lineStart + prefixed.length,
  };
}

// Inserts text at the cursor, replacing any selection.
export function insertText(
  value: string,
  start: number,
  end: number,
  text: string,
): EditResult {
  const position = start + text.length;
  return {
    value: value.slice(0, start) + text + value.slice(end),
    selectionStart: position,
    selectionEnd: position,
  };
}
