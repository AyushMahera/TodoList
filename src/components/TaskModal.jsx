import { createPortal } from 'react-dom'

const TaskModal = ({ showModal, setShowModal, isCompleted, children }) => {
  return createPortal(
    <div
      onClick={() => { setShowModal(false) }}
      className={`fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"} transition-all duration-200`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        id='root-modal'
        className={`min-h-20 max-h-[90vh] overflow-y-auto w-[420px] bg-zinc-900 border ${isCompleted ? 'border-emerald-500/40' : 'border-zinc-800'} rounded-2xl p-7 shadow-2xl shadow-black/60 ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"} transition-all duration-200 flex flex-col gap-4`}
      >
        {isCompleted && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-fit">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Completed</span>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("root-modal")
  )
}

export default TaskModal