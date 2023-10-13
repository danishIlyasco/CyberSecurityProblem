import "./styles.css";
import { useState } from "react";
import Typewriter from "./TypeWriter";

const ReqStatuses = Object.freeze({
  Loading: "Loading...",
  Fetched: "Fetched..."
});

export default function App() {
  const [status, setStatus] = useState(ReqStatuses.Loading);
  const [resFlag, setResFlag] = useState("");

  async function captureFlag(hiddenURL) {
    try {
      const response = await fetch(hiddenURL);
      const data = await response.text();
      setResFlag(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchHiddenURL() {
    try {
      const response = await fetch(
        "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
      );
      // Response is converted to plain string(text)
      const data = await response.text();
      // Regex to get the characters from the DOM Hirerachy.
      let regExp = /<code.+?data-class="23.*?".*?>.*?<div.+?data-tag=".*?93".*?>.*?<span.+?data-id=".*?21.*?".*?>.*?<i.*?class=".*?char.*?".+?value="(.)".*?><\/i>.*?<\/span>.*?<\/div>.*?<\/code>/gm;
      // All matches(all characters) from the resonse using the regex.
      let matches = data.matchAll(regExp);
      let url = "";
      for (const match of matches) {
        // Take matched group at position 1 and concate it.
        url += match[1];
      }
      console.log(url);
      setStatus(ReqStatuses.Fetched);
      captureFlag(url);
    } catch (error) {
      console.error(error);
    }
  }

  fetchHiddenURL();

  if (status !== ReqStatuses.Fetched) {
    return (
      <div className="App">
        <h2>{status}</h2>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Typewriter typerString={resFlag} delay={500} />
      </div>
    );
  }
}
