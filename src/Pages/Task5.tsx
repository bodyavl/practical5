import { ChangeEvent, FormEvent, useState } from "react";
import { onlyLetters } from "../Utils/onlyLetters";
import { onlyLettersAndSpaces } from "../Utils/onlyLettersAndSpaces";

const generateColumnOrder = (keyword: string): number[] => {
  const keyChars = keyword.toLowerCase().split("");
  const sorted = [...keyChars].slice().sort();
  return keyChars.map((char) => {
    const index = sorted.indexOf(char);
    sorted[index] = ""; // avoid duplicate rankings
    return index + 1;
  });
};

const verticalTranspositionEncrypt = (
  text: string,
  keyword: string
): {
  cipherText: string;
  tableMatrix: string[][];
  headerLetters: string[];
  headerOrder: number[];
} => {
  const cleanText = text.replace(/\s+/g, "").toLowerCase();
  const keywordUpper = keyword.toLowerCase();
  const cols = keywordUpper.length;
  const rows = Math.ceil(cleanText.length / cols);
  const totalLength = rows * cols;
  const paddedText = cleanText.padEnd(totalLength, " ");

  // Build matrix
  const matrix: string[][] = [];
  for (let r = 0; r < rows; r++) {
    matrix.push(paddedText.slice(r * cols, (r + 1) * cols).split(""));
  }

  const order = generateColumnOrder(keywordUpper);

  const encrypted: string[] = [];
  for (let rank = 1; rank <= cols; rank++) {
    const colIdx = order.indexOf(rank);
    for (let row = 0; row < rows; row++) {
      encrypted.push(matrix[row][colIdx]);
    }
  }

  const regex = new RegExp(`.{1,${rows}}`, "g");

  return {
    cipherText: encrypted.join("").match(regex)?.join(" ") ?? "",
    tableMatrix: matrix,
    headerLetters: keywordUpper.split(""),
    headerOrder: order,
  };
};

export default function Task5() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [tableMatrix, setTableMatrix] = useState<string[][]>([]);
  const [headerLetters, setHeaderLetters] = useState<string[]>([]);
  const [headerOrder, setHeaderOrder] = useState<number[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLettersAndSpaces(value)) setText(value);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLetters(value) && value.length <= 7) setKeyword(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (text.trim().length < 50) {
    //   alert("Text must be at least 50 characters long.");
    //   return;
    // }

    if (keyword.trim().length !== 7) {
      alert("Key word must be exactly 7 letters.");
      return;
    }

    const { cipherText, tableMatrix, headerLetters, headerOrder } =
      verticalTranspositionEncrypt(text, keyword);
    setCipherText(cipherText);
    setTableMatrix(tableMatrix);
    setHeaderLetters(headerLetters);
    setHeaderOrder(headerOrder);
  };

  return (
    <div>
      <h2>Task 5 – Vertical Transposition Cipher</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Text to encrypt:</label>
        <input
          id="textInput"
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Text to encrypt"
        />

        <label htmlFor="keywordInput">Key word:</label>
        <input
          id="keywordInput"
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Key word (7 letters)"
        />

        <button type="submit">Encrypt</button>
      </form>

      {/* Visual Table */}
      {headerLetters.length > 0 && (
        <table style={{ marginTop: "24px", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {headerLetters.map((char, idx) => (
                <th key={idx} style={cellStyle}>
                  {char}
                </th>
              ))}
            </tr>
            <tr>
              {headerOrder.map((num, idx) => (
                <th key={idx} style={cellStyle}>
                  {num}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableMatrix.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((char, colIdx) => (
                  <td key={colIdx} style={cellStyle}>
                    {char}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Encrypted Result */}
      {cipherText && (
        <p style={{ marginTop: "24px" }}>
          <strong>Encrypted Text:</strong> {cipherText}
        </p>
      )}
    </div>
  );
}

const cellStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
  fontWeight: "bold",
  minWidth: "30px",
};
