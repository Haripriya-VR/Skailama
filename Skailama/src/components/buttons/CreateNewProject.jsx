import React from 'react'

function CreateNewProject({ buttontext, backgroundColor, handleProjectModal }) {

    const handleButtonActions = () => {
        handleProjectModal(true)
    };

    return (
        <div className='flex justify-center mt-4'>
            <button style={{ backgroundColor: backgroundColor }} onClick={handleButtonActions} type="button" class="text-white text-lg  hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
                <svg width="27" height="27" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.8806 42.7186H31.4663V31.5484H42.6376V25.9633H31.4663V14.7931H25.8806V25.9633H14.7093V31.5484H25.8806V42.7186ZM28.6734 56.6814C24.81 56.6814 21.1793 55.9478 17.7814 54.4808C14.3834 53.0138 11.4277 51.0246 8.91415 48.5131C6.4006 45.9998 4.41117 43.0444 2.94587 39.6468C1.48056 36.2492 0.746979 32.6189 0.745117 28.7558C0.745117 24.8928 1.4787 21.2625 2.94587 17.8649C4.41304 14.4673 6.40246 11.5118 8.91415 8.99854C11.4277 6.48524 14.3834 4.49601 17.7814 3.03085C21.1793 1.56569 24.81 0.832184 28.6734 0.830322C32.5368 0.830322 36.1675 1.56383 39.5655 3.03085C42.9634 4.49787 45.9192 6.4871 48.4327 8.99854C50.9463 11.5118 52.9366 14.4673 54.4038 17.8649C55.8709 21.2625 56.6036 24.8928 56.6017 28.7558C56.6017 32.6189 55.8681 36.2492 54.401 39.6468C52.9338 43.0444 50.9444 45.9998 48.4327 48.5131C45.9192 51.0264 42.9634 53.0166 39.5655 54.4836C36.1675 55.9506 32.5368 56.6832 28.6734 56.6814Z" fill="#F8F8F8" />
                </svg>

                <span className=' ms-1  me-3 mb-1 text-xl font-semibold  '> {buttontext || 'default'}</span>
            </button>
        </div>
    )
}

export default CreateNewProject
