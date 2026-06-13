import { ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-green bg-black backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1">
            <span className="text-green-400 font-bold text-lg">
              {"{}"}
            </span>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              TreeifyJson
            </h3>
            <p className="text-xs text-slate-500">
              Visualize JSON Structure Instantly
            </p>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>Built by Ayush Chauhan | For Developers, By a Developer.</span>
       
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ayuu25141"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition"
          >
           <ExternalLink size={16} />
            GitHub
          </a>

          <span className="text-slate-700">|</span>

          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </footer>
  );
}