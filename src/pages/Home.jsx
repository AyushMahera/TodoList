import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loggedUser } = useContext(AuthContext);
  const tasks = useSelector(state => state.todo.tasks).filter((task) => task.userId === loggedUser);

  const total = useMemo(() => tasks.length, [tasks]);
  const completed = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const pending = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);

  const navigate = useNavigate();

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-950 relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-8 py-16">

        {/* Page Header */}
        <div className="mb-14">
          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-4xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-zinc-500 text-sm mt-2">Track your productivity at a glance</p>
        </div>

        {/* Progress Bar Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-zinc-400 text-sm font-medium">Overall Completion</span>
            <span className="text-white text-sm font-bold">{completionRate}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-zinc-600 text-xs mt-2">{completed} of {total} tasks completed</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Total Tasks */}
          <div
            onClick={() => navigate('/tasks')}
            className="group relative bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/60 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-all duration-300 pointer-events-none" />
            <div className="flex items-start justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/25 transition-colors duration-300">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-zinc-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Total Tasks</p>
            <p className="text-5xl font-bold text-white tabular-nums">{total}</p>
            <p className="text-indigo-400/70 text-xs mt-3 font-medium group-hover:text-indigo-400 transition-colors duration-300">View all tasks →</p>
          </div>

          {/* Completed Tasks */}
          <div
            onClick={() => navigate('/tasks?filter=completed')}
            className="group relative bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/60 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-300 pointer-events-none" />
            <div className="flex items-start justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors duration-300">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Completed</p>
            <p className="text-5xl font-bold text-white tabular-nums">{completed}</p>
            <p className="text-emerald-400/70 text-xs mt-3 font-medium group-hover:text-emerald-400 transition-colors duration-300">View completed →</p>
          </div>

          {/* Pending Tasks */}
          <div
            onClick={() => navigate('/tasks?filter=pending')}
            className="group relative bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/60 hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-2xl bg-amber-500/0 group-hover:bg-amber-500/5 transition-all duration-300 pointer-events-none" />
            <div className="flex items-start justify-between mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/25 transition-colors duration-300">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <svg className="w-4 h-4 text-zinc-700 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Pending</p>
            <p className="text-5xl font-bold text-white tabular-nums">{pending}</p>
            <p className="text-amber-400/70 text-xs mt-3 font-medium group-hover:text-amber-400 transition-colors duration-300">View pending →</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;