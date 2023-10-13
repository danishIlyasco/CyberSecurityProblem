import { useState, useEffect } from "react";

const Typewriter = ({ typerString, delay }) => {
  const [{ content, carriage }, setContent] = useState({
    content: "",
    carriage: 0
  });
  const [charList, setFlags] = useState([]);

  useEffect(() => {
    if (carriage === typerString.length) return;
    const timeout = setTimeout(() => {
      setContent({
        content: content + typerString[carriage],
        carriage: carriage + 1
      });
      const newFlags = charList.concat(typerString[carriage]);
      setFlags(newFlags);
      clearTimeout(timeout);
    }, delay);
  }, [typerString, delay, charList, content, carriage]);

  return (
    <div>
      <h2>
        <span>{content}</span>
      </h2>
      <ul>
        {charList.map((char) => (
          <li key={char}>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default Typewriter;
