import React from 'react'

const EditAndUpload = ({value, handleClick}) => {
    return (
        
        <button
        onClick={handleClick}
            type="submit"
            className="text-white uploadButton text-lg  font-medium rounded-lg text-sm px-5 py-2.5"

        >

            {value}

        </button>
    )
}

export default EditAndUpload
