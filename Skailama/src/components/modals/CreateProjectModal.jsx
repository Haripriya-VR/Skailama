import React from 'react'
import ModalProjectData from './ModalProjectData';

function CreateProjectModal({ modal_option, handleModal ,children }) {

    if (!modal_option) return null;

    const handleClose = () => {
        handleModal(false)
    }
    return (
        (modal_option &&
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed  inset-0 z-50 flex justify-center items-center w-full  bg-black bg-opacity-50"
            >
               <div className="relative p-4 mx-20 w-full max-w-4xl min-h-[2/5] bg-white rounded-lg shadow">

                    
                    {/* Modal Body */}
                    <div className="p-4 space-y-4">
                    {children}
                    </div>
                    {/* Modal Footer */}
               
                </div>
            </div>

        )
    )
}

export default CreateProjectModal
