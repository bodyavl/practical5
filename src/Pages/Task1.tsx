import { ChangeEvent, FormEvent, useState } from "react";
import { alphabet } from "../Utils/alpabet";
import { onlyLettersAndSpaces } from "../Utils/onlyLettersAndSpaces";

export default function Task1() {
  const [inputValue, setInputValue] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [alphabetValue, setOriginalAlphabet] = useState<string[]>([]);
  const [shuffledAlphabetValue, setShuffledAlphabet] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (onlyLettersAndSpaces(value)) setInputValue(value);
  };
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
        <label htmlFor="taskInput">Text to encrypt:</label>
        <input
          type="text"
          id="taskInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter text to encrypt"
        />
        <button type="submit">Encrypt</button>
      </form>
      <table>
        <thead>
          <tr>
            {alphabetValue.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {shuffledAlphabetValue.map((cell, cellIdx) => (
              <td key={cellIdx}>{cell}</td>
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
