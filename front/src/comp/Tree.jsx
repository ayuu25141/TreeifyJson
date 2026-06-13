import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

function getValueColor(value) {
  if (value === null) return "text-rose-400";
  if (typeof value === "boolean") return "text-purple-400";
  if (typeof value === "number") return "text-amber-300";
  if (typeof value === "string") return "text-emerald-400";
  return "text-blue-300";
}

function getValueLabel(value) {
  if (value === null) return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return `"${value}"`;
  return "";
}

function getTypeTag(value) {
  if (Array.isArray(value)) {
    return `Array[${value.length}]`;
  }

  if (typeof value === "object" && value !== null) {
    return `Object{${Object.keys(value).length}}`;
  }

  return "";
}

function TreeNode({
  keyName,
  value,
  depth = 0,
  expandAll = false,
  searchTerm = "",
}) {
  const [expanded, setExpanded] = useState(
    expandAll || depth < 2
  );

  useEffect(() => {
    if (searchTerm.trim()) {
      setExpanded(true);
    } else {
      setExpanded(expandAll || depth < 2);
    }
  }, [expandAll, depth, searchTerm]);

  const isObject =
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value);

  const isArray = Array.isArray(value);

  const isComplex = isObject || isArray;

  const indent = depth * 20;

  const entries = isObject
    ? Object.entries(value)
    : isArray
    ? value.map((v, i) => [String(i), v])
    : [];

  const keyMatch =
    searchTerm &&
    keyName &&
    keyName
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  const valueMatch =
    searchTerm &&
    !isComplex &&
    String(value)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  return (
    <div className="select-none">
      <div
        className="group flex items-center gap-1 py-[3px] px-2 rounded-sm hover:bg-blue-500/10 transition-colors cursor-default"
        style={{
          paddingLeft: `${indent + 8}px`,
        }}
      >
        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
          {isComplex && (
            <button
              onClick={() =>
                setExpanded((e) => !e)
              }
              className="text-blue-400 hover:text-blue-300"
            >
              {expanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          )}
        </div>

        {keyName !== undefined && (
          <span
            className="text-blue-300 shrink-0"
            style={{
              fontFamily:
                "JetBrains Mono, monospace",
            }}
          >
            <span
              className={
                keyMatch
                  ? "bg-yellow-400 text-black px-1 rounded"
                  : isArray
                  ? "text-slate-500"
                  : ""
              }
            >
              {keyName}
            </span>

            <span className="text-slate-500">
              :
            </span>
          </span>
        )}

        {isComplex ? (
          <span
            className="text-slate-400 cursor-pointer"
            style={{
              fontFamily:
                "JetBrains Mono, monospace",
            }}
            onClick={() =>
              setExpanded((e) => !e)
            }
          >
            <span className="text-blue-400/70">
              {getTypeTag(value)}
            </span>

            {!expanded && (
              <span className="text-slate-600 ml-1">
                {isArray ? "[...]" : "{...}"}
              </span>
            )}
          </span>
        ) : (
        <span
  className={`${getValueColor(value)} ${
    valueMatch
      ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 px-2 py-[2px] rounded-md shadow-[0_0_12px_rgba(234,179,8,0.35)]"
      : ""
  }`}
  style={{
    fontFamily: "JetBrains Mono, monospace",
  }}
>
  {getValueLabel(value)}
</span>
        )}

        {!isComplex && (
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0 rounded text-[10px] bg-slate-800 text-slate-500 border border-slate-700/50">
            {value === null
              ? "null"
              : typeof value}
          </span>
        )}
      </div>

      {isComplex && expanded && (
        <div>
          {entries.map(([k, v]) => (
            <TreeNode
              key={`${depth}-${k}`}
              keyName={k}
              value={v}
              depth={depth + 1}
              expandAll={expandAll}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Tree({
  value,
  expandAll = false,
  searchTerm = "",
}) {
  return (
    <TreeNode
      value={value}
      depth={0}
      expandAll={expandAll}
      searchTerm={searchTerm}
    />
  );
}