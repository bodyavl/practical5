import { FormEvent, useState } from "react";
import { alphabet } from "../Utils/alpabet";

export default function Task1() {
  const [inputValue, setInputValue] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [alphabetValue, setOriginalAlphabet] = useState<string[]>([]);
  const [shuffledAlphabetValue, setShuffledAlphabet] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }

    const inputWithReplacesSpaces = inputValue
      .replaceAll(" ", "_")
      .toLowerCase();

    const shuffledAlphabet = [...alphabet].sort(() => Math.random() - 0.5);

    const inputChars = inputWithReplacesSpaces.split("");

    const transformedChars = inputChars.map((char) => {
      const index = alphabet.indexOf(char);
      return shuffledAlphabet[index];
    });

    const transformedText = transformedChars.join("");
    setOriginalAlphabet(alphabet);
    setShuffledAlphabet(shuffledAlphabet);
    setSubmittedText(transformedText);
  };

  return (
    <div>
      <h2>Task 1 Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskInput">Enter something:</label>
        <input
          type="text"
          id="taskInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Encrypt</button>
      </form>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "24px" }}
      >
        <thead>
          <tr>
            {alphabetValue.map((col, idx) => (
              <th
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "left",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {shuffledAlphabetValue.map((cell, cellIdx) => (
              <td
                key={cellIdx}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {submittedText && (
        <p style={{ marginTop: "16px" }}>
          Result: <b>{submittedText}</b>
        </p>
      )}
    </div>
  );
}
