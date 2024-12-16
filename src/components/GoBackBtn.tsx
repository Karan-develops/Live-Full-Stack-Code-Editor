import { ArrowUpLeftFromSquareIcon, Command } from "lucide-react";
import Link from "next/link";

const GoBackBtn = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-white rounded-xl transition-all duration-200 border border-gray-800 hover:border-blue-500/50 group"
    >
      <Command className="w-5 h-5 text-blue-400" />
      <span>Go Back To Editor</span>
      <ArrowUpLeftFromSquareIcon className="w-5 h-5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
};

export default GoBackBtn;
