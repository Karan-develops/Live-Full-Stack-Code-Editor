"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Copied to Clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };
  return (
    <button
      onClick={copyToClipboard}
      type="button"
      className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
    >
      {isCopied ? (
        <Check className="size-4 text-green-400" />
      ) : (
        <Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
      )}
    </button>
  );
};

export default CopyButton;
