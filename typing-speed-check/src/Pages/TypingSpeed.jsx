import { useState, useRef, useEffect } from "react";
import "../css/Typeing.css";

const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Practice makes a man perfect",
  "React is a powerful JavaScript library",
  "Typing speed tests can be fun and challenging",
  "Consistency is key to improvement",
];

function TypingSpeed() {
  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    if (!startTime) {
      setStartTime(new Date()); 
    }
    setInput(e.target.value);

    if (e.target.value === sentence) {
      calculateWPM();
    }
  };

  const calculateWPM = () => {
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000 / 60; 
    const words = sentence.split(" ").length;
    setWpm(Math.round(words / timeTaken));
  };

  const handleReset = () => {
    setInput("");
    setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    setStartTime(null);
    setWpm(null);
    inputRef.current.focus();
  };

  const correctText = sentence.slice(0, input.length);
  const isError = input !== correctText;

  return (
    <div className="typing-speed-checker">
      <h2 className="title">Typing Speed Test</h2>
      <p className="sentence">
        {sentence.split("").map((char, index) => (
          <span
            key={index}
            className={
              index < input.length
                ? input[index] === char
                  ? "correct"
                  : "incorrect"
                : ""
            }
          >
            {char}
          </span>
        ))}
      </p>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Start typing here..."
          className="input-field"
          style={{
            borderColor: isError ? "#dc3545" : "#007bff",
          }}
        />
      </div>
      {wpm !== null && (
        <p className="result">
          Your typing speed is: <strong>{wpm} WPM</strong>
        </p>
      )}
      <button onClick={handleReset} className="reset-button">
        Restart
      </button>
    </div>
  );
}

export default TypingSpeed;
