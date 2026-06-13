import { useState } from "react";
import Body from "../comp/Body";
import Nav from "../comp/Nav";
import Footer from "../comp/Footer";

const SAMPLE_JSON = `{
  "project": "json-tree-viewer",
  "version": "1.0.0",
  "description": "A lightweight tool to visualize JSON data structures",
  "active": true,
  "features": [
    "collapsible nodes",
    "search filtering",
    "syntax highlighting"
  ],
  "author": {
    "name": "Ayush Chauhan",
    "email": "ayushchauhan753753@gmail.com"
  },
  "stats": {
    "UserUse": "100+",
    "rating": 4.8
  }
}
`;

function Home() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [parsed, setParsed] = useState(JSON.parse(SAMPLE_JSON));
  const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


  return (
    <>
    <Nav
        setInput={setInput}
        setParsed={setParsed}
        setError={setError}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

  <Body
  input={input}
  setInput={setInput}
  parsed={parsed}
  setParsed={setParsed}
  error={error}
  setError={setError}
  searchTerm={searchTerm}
/>
      <Footer />
    </>
  );
}

export default Home;