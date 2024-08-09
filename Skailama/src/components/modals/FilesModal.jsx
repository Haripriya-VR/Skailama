import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BACKEND_BASE_URL } from '../../constants/constant';
import EditAndUpload from '../buttons/EditAndUpload';

function FilesModal({ projectName,handleClose }) {
    const [projectFile, setProjectFile] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isSubmitting && formData) {
            const submitData = async () => {
                try {
                    const response = await axios.post(`${BACKEND_BASE_URL}/projectEdit`, formData, {
                        withCredentials: true
                    });
                    if (response.data.success) {
                        setSuccessMessage("Added Successfully"); 
                        handleClose()
                    } 
                } catch (error) {
                    console.error('Error:', error);
                    setError('Failed to upload. Please try again.');
                } finally {
                    setIsSubmitting(false);
                    setFormData(null);
                }
            };

            submitData();
        }
    }, [isSubmitting, formData])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectFile || !description) {
            setError(`Project File or description is Empty`);
            return
        } else {
            setFormData({ projectName, projectFile, description });
            setIsSubmitting(true);
        }
        setError('');
    };

    return (
        <>
            <div className=''>
                <div className="flex items-center justify-between  mb-7">
                    <h1 className="text-3xl font-bold text-gray-900">Upload from</h1>
                    <button onClick={handleClose}>
                        <svg width="52" height="52" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M31.0001 34.6165L18.3417 47.2748C17.8681 47.7484 17.2653 47.9852 16.5334 47.9852C15.8015 47.9852 15.1987 47.7484 14.7251 47.2748C14.2515 46.8012 14.0146 46.1984 14.0146 45.4665C14.0146 44.7345 14.2515 44.1318 14.7251 43.6582L27.3834 30.9998L14.7251 18.3415C14.2515 17.8679 14.0146 17.2651 14.0146 16.5332C14.0146 15.8012 14.2515 15.1984 14.7251 14.7248C15.1987 14.2512 15.8015 14.0144 16.5334 14.0144C17.2653 14.0144 17.8681 14.2512 18.3417 14.7248L31.0001 27.3832L43.6584 14.7248C44.132 14.2512 44.7348 14.0144 45.4667 14.0144C46.1987 14.0144 46.8015 14.2512 47.2751 14.7248C47.7487 15.1984 47.9855 15.8012 47.9855 16.5332C47.9855 17.2651 47.7487 17.8679 47.2751 18.3415L34.6167 30.9998L47.2751 43.6582C47.7487 44.1318 47.9855 44.7345 47.9855 45.4665C47.9855 46.1984 47.7487 46.8012 47.2751 47.2748C46.8015 47.7484 46.1987 47.9852 45.4667 47.9852C44.7348 47.9852 44.132 47.7484 43.6584 47.2748L31.0001 34.6165Z" fill="#3C3C3C" />
                        </svg>
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="flex flex-col  max-w-5xl">
                    <label htmlFor="FileName" className="mb-3 text-sm text-slate-700 font-medium  ">
                        Name:
                    </label>
                    <div className="relative w-full  ">
                        <input
                            onChange={(e) => setProjectFile(e.target.value)}
                            type="text"
                            id="FileName"
                            name="FileName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "


                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm fond-medium mt-1">{error}</p>
                    )}
                    <label htmlFor="description" className="mb-3 text-sm text-slate-700 font-medium  ">
                        Link:
                    </label>
                    <div className="relative w-full  ">
                        <input
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            id="description"
                            name='description'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "


                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm fond-medium mt-1">{error}</p>
                    )}

                    <div className="flex items-center justify-end p-4 mt-5 rounded-b">
                        {successMessage && (
                            <p className='text-green-600 font-bold me-5'>{successMessage}</p>
                        )}
                        <EditAndUpload value={'Upload'}/>
                        
                    </div>
                </form>
            </div>

        </>
    )
}

export default FilesModal
