import { useState, ChangeEvent, FormEvent } from "react";
import { alphabet } from "../Utils/alpabet";
import { onlyLetters } from "../Utils/onlyLetters";

const alphabetWithCharacters = [...alphabet, "_", ".", ",", "-"];
const ROWS = 6;
const COLS = 5;

const sanitizeInput = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z_.,-]/g, "")
    .replace(/\s+/g, "");
};

const createPlayfairMatrix = (): string[][] => {
  const matrix: string[][] = [];
  const chars = [...alphabetWithCharacters].sort(() => Math.random() - 0.5);
  for (let i = 0; i < ROWS; i++) {
    matrix.push(chars.slice(i * COLS, (i + 1) * COLS));
  }
  return matrix;
};

const findPosition = (matrix: string[][], char: string): [number, number] => {
  for (let row = 0; row < ROWS; row++) {
    const col = matrix[row].indexOf(char);
    if (col !== -1) return [row, col];
  }
  return [-1, -1]; // shouldn't happen
};

const playfairEncrypt = (text: string, matrix: string[][]): string => {
  const clean = sanitizeInput(text);

  // Build digraphs (insert filler '_' if pair letters are same or length is odd)
  const digraphs: string[] = [];
  for (let i = 0; i < clean.length; i += 2) {
    const first = clean[i];
    const second = clean[i + 1] || "_";

    if (first === second) {
      digraphs.push(first + "_");
      i--;
    } else {
      digraphs.push(first + second);
    }
  }

  const encrypted = digraphs.map((pair) => {
    const [r1, c1] = findPosition(matrix, pair[0]);
    const [r2, c2] = findPosition(matrix, pair[1]);

    if (r1 === r2) {
      // Same row → shift columns right
      return matrix[r1][(c1 + 1) % COLS] + matrix[r2][(c2 + 1) % COLS];
    } else if (c1 === c2) {
      // Same column → shift rows down
      return matrix[(r1 + 1) % ROWS][c1] + matrix[(r2 + 1) % ROWS][c2];
    } else {
      // Rectangle → swap columns
      return matrix[r1][c2] + matrix[r2][c1];
    }
  });

  return encrypted.join("");
};

export default function Task4() {
  const [text, setText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [matrix, setMatrix] = useState<string[][]>(createPlayfairMatrix());
  const [result, setResult] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLetters(value)) setText(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encrypted = playfairEncrypt(text, matrix);
    setResult(encrypted);
  };

  return (
    <div>
      <h2>Task 4 Page – Playfair Cipher</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="inputText">Text to encrypt:</label>
        <input
          id="inputText"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text to encrypt"
        />
        <button type="submit">Encrypt</button>
      </form>

      {/* Playfair Matrix Table */}
      <table style={{ marginTop: "24px", borderCollapse: "collapse" }}>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((char, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    textAlign: "center",
                    width: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {char}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Encrypted Result */}
      {result && (
        <p style={{ marginTop: "24px" }}>
          <strong>Encrypted Text:</strong> {result}
        </p>
      )}
    </div>
  );
}
