import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <p className="text-red-500/60 text-xs font-semibold uppercase tracking-widest">Error</p>
        <h1 className="text-8xl font-black text-white tracking-tight leading-none">404</h1>
        <div className="h-px w-16 bg-zinc-800" />
        <p className="text-zinc-400 text-lg font-medium">Page not found</p>
        <p className="text-zinc-600 text-sm max-w-xs">The page you're looking for doesn't exist or has been moved.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-white text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer hover:bg-zinc-800"
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default NotFound;