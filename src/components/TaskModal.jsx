import { createPortal } from 'react-dom'

const TaskModal = ({showModal,setShowModal,isCompleted,children}) => {

  return createPortal(
    <div onClick={() => {setShowModal(false)}}  className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none" } transition-all duration-200`}>
        <div onClick={(e) => e.stopPropagation()} id='root-modal' className={`min-h-20 max-h-[90vh] overflow-y-scroll w-100 ${isCompleted ? 'bg-green-700' : 'bg-gray-400'} rounded-xl p-4 ${showModal ? "opacity-100 scale-100" : "opacity-0 pointer-events-none" } transition-all duration-200 flex flex-col justify-between`}>
            {children}
        </div>
    </div>,document.getElementById("root-modal")
  )
}

export default TaskModal