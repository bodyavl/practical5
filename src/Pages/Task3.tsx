import { useState, ChangeEvent, FormEvent } from "react";
import { alphabet } from "../Utils/alpabet";
import { onlyLettersAndSpaces } from "../Utils/onlyLettersAndSpaces";
import { onlyLetters } from "../Utils/onlyLetters";

const getCharIndex = (char: string): number =>
  alphabet.indexOf(char.toLowerCase());

export default function Task3() {
  const [text, setText] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [tableData, setTableData] = useState<string[][]>([]);
  const [result, setResult] = useState<string>("");

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLettersAndSpaces(value)) setText(value);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLetters(value)) setKeyword(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedText = text.replace(/\s/g, "_").toLowerCase();
    const cleanedKey = keyword.replace(/\s/g, "_").toLowerCase();

    if (!cleanedText || !cleanedKey) {
      alert("Please enter both text and keyword.");
      return;
    }

    const fullKey = cleanedKey
      .repeat(Math.ceil(cleanedText.length / cleanedKey.length))
      .slice(0, cleanedText.length);

    const textChars = cleanedText.split("");
    const textIndexes = textChars.map(getCharIndex);

    const keyChars = fullKey.split("");
    const keyIndexes = keyChars.map(getCharIndex);

    const encryptedIndexes = textIndexes.map(
      (tIdx, i) => (tIdx + keyIndexes[i]) % 27
    );
    const encryptedChars = encryptedIndexes.map((i) => alphabet[i]);

    setTableData([
      textChars,
      textIndexes.map((i) => i.toString()),
      keyChars,
      keyIndexes.map((i) => i.toString()),
      encryptedIndexes.map((i) => i.toString()),
      encryptedChars,
    ]);

    setResult(encryptedChars.join(""));
  };

  const rowLabels = [
    "Plaintext Characters",
    "Plaintext Indexes",
    "Key Characters",
    "Key Indexes",
    "Encrypted Indexes",
    "Encrypted Characters",
  ];

  return (
    <div>
      <h2>Task 3 - Vigenère Cipher</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="textInput">Text to encrypt:</label>
        <input
          id="textInput"
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Text to encrypt"
        />

        <label htmlFor="keyInput">Key word:</label>
        <input
          id="keyInput"
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Key word"
        />

        <button type="submit">Encrypt</button>
      </form>

      {tableData.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "24px",
          }}
        >
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <th
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#f2f2f2",
                    padding: "6px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {rowLabels[i]}
                </th>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      border: "1px solid #ccc",
                      padding: "6px",
                      textAlign: "center",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {result && (
        <p style={{ marginTop: "24px" }}>
          <strong>Encrypted Text:</strong> {result}
        </p>
      )}
    </div>
  );
}
