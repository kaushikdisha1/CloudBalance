import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "react-toastify";

const CopyCodeBlock = ({ value, copyPosition = "right" }) => {
  const [copied, setCopied] = useState(false);
  const isLeft = copyPosition === "left";

  const handleCopy = () => {
    navigator.clipboard.writeText(
      typeof value === "object" ? JSON.stringify(value, null, 2) : value
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="relative mt-2 group">
      <div
        onClick={handleCopy}
        className="cursor-pointer bg-blue-50 border border-blue-500 rounded-md px-4 py-3 text-sm text-black font-mono whitespace-pre-wrap break-words overflow-auto max-h-96"
      >
        <pre className="whitespace-pre-wrap pl-6">
          {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
        </pre>

        <button
          type="button"
          className={`absolute top-2 ${
            isLeft ? "left-2" : "right-2"
          } bg-white border border-blue-500 text-blue-700 p-1 rounded hover:bg-blue-50 transition`}
        >
          <ClipboardCopy size={16} />
        </button>
      </div>
      <span className="text-xs text-blue-600 mt-1 block">
        Click anywhere in box to copy the content inside.
      </span>
    </div>
  );
};

export default CopyCodeBlock;
