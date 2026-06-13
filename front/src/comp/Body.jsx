import { useState, useCallback } from "react";
import { Tree } from "../comp/Tree";

function countNodes(val) {
  if (typeof val !== "object" || val === null) return 1;
  if (Array.isArray(val)) return 1 + val.reduce((s, v) => s + countNodes(v), 0);
  return 1 + Object.values(val).reduce((s, v) => s + countNodes(v), 0);
}

export default function Body({
  input,
  setInput,
  parsed,
  setParsed,
  error,
  setError,
  searchTerm, // <-- add this
}) {
  const [expandAll, setExpandAll] = useState(false);

  const handleInput = useCallback(
    (value) => {
      setInput(value);

      try {
        const result = JSON.parse(value);
        setParsed(result);
        setError(null);
      } catch (e) {
        setParsed(null);
        setError(e.message);
      }
    },
    [setInput, setParsed, setError]
  );

  const nodeCount = parsed ? countNodes(parsed) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="px-4 py-2 border-b border-slate-800">
        Nodes: {nodeCount}
      </div>

      <main className="grid grid-cols-2 h-[90vh]">
        <textarea
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          className="bg-slate-900 p-4 outline-none resize-none"
        />

        <div className="overflow-auto p-4">
          {parsed && (
           <Tree
  value={parsed}
  expandAll={expandAll}
  searchTerm={searchTerm}
/>
          )}

          {error && (
            <div className="text-red-400">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}