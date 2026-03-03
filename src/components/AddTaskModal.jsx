import React from 'react'
import { createPortal } from 'react-dom'
import TaskForm from './TaskForm'

const AddTaskModal = ({setShowModal}) => {
  return createPortal(
    <div onClick={() => setShowModal(false)} className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
        <div onClick={(e) => e.stopPropagation()}>
            <TaskForm setShowModal={setShowModal}/>
        </div>
    </div>, document.getElementById('add-modal')
  )
}

export default AddTaskModal