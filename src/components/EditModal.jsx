import { createPortal } from 'react-dom'

const EditModal = ({ showModal, onCancel, isCompleted, children }) => {
  return createPortal(
    <div
      onClick={() => { onCancel() }}
      className={`fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50 ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"} transition-all duration-200`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        id='edit-modal'
        className={`min-h-20 max-h-[90vh] overflow-y-auto w-[420px] bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl shadow-black/60 ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none"} transition-all duration-200 flex flex-col gap-4`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("edit-modal")
  )
}

export default EditModal