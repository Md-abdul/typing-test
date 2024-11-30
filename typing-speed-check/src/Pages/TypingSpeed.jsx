import { useState, useRef, useEffect } from "react";
import "../css/Typeing.css";

const sentences = [
  "react can be used to develop single page mobile or server rendered applications with frameworks like nextjs because react is only concerned with the user interface and rendering components to the dom react applications often rely on libraries for routing and other client side functionality",
  
  "nodejs lets developers use javascript to write command line tools and for server side scripting the ability to run javascript code on the server is often used to generate dynamic web page content before the page is sent to the users web browser",
  
  "javascript is a versatile programming language used for both front end and back end development it powers modern web applications and enhances user interactivity",
  
  "express is a popular framework for building web applications with nodejs providing robust features for web and mobile applications",
  
  "mongodb is a nosql database that stores data in flexible json like documents enabling developers to build scalable and high performance applications"
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
        <textarea
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
