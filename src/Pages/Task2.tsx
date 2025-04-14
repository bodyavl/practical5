import { ChangeEvent, FormEvent, useState } from "react";
import { onlyLettersAndSpaces } from "../Utils/onlyLettersAndSpaces";
import { hasUniqueCharacters } from "../Utils/hasUniqueCharacters";
import { alphabet } from "../Utils/alpabet";

const encryptText = (input: string, shuffledAlphabet: string[]): string => {
  const upperText = input.toLowerCase();
  return upperText
    .split("")
    .map((char) => {
      if (char === " ") return " ";
      const index = alphabet.indexOf(char);
      return index !== -1 ? shuffledAlphabet[index] : char;
    })
    .join("");
};

export default function Task2() {
  const [text, setText] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [shuffledAlphabet, setShuffledAlphabet] = useState<string[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLettersAndSpaces(value)) setText(value);
  };

  const handleSloganChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onlyLettersAndSpaces(value)) setSlogan(value);
  };

  const handleEncrypt = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedSlogan = slogan.replace(/\s/g, "").toLowerCase();
    if (!hasUniqueCharacters(cleanedSlogan)) {
      alert("Slogan must contain only unique characters.");
      return;
    }

    const uniqueSloganLetters = [...new Set(cleanedSlogan), "_"];
    const remainingLetters = alphabet.filter(
      (letter) => !uniqueSloganLetters.includes(letter)
    );
    const fullShuffled = [...uniqueSloganLetters, ...remainingLetters];

    setShuffledAlphabet(fullShuffled);
    setResult(encryptText(text, fullShuffled));
  };

  return (
    <div>
      <h2>Task 2 Page</h2>

      <form onSubmit={handleEncrypt}>
        <label htmlFor="textInput">Text to encrypt:</label>
        <input
          id="textInput"
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to encrypt"
        />

        <label htmlFor="sloganInput">Slogan (unique characters):</label>
        <input
          id="sloganInput"
          type="text"
          value={slogan}
          onChange={handleSloganChange}
          placeholder="Enter slogan (unique characters)"
        />

        <button type="submit">Encrypt</button>
      </form>

      {shuffledAlphabet.length > 0 && (
        <table>
          <thead>
            <tr>
              {alphabet.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {shuffledAlphabet.map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}

      {result && (
        <p style={{ marginTop: "24px" }}>
          Encrypted Text: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
}
