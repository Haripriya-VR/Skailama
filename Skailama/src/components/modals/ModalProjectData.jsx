import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from '../../constants/constant';
function ModalProjectData({ handleClose }) {

    const [project, setProject] = useState('')
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(null); 

    const userId = localStorage.getItem('user');

    const navigate = useNavigate();
    useEffect(() => {
        if (isSubmitting && formData) {
            const submitData = async () => {
                try {
                    console.log('data sending',formData);
                    const response = await axios.post(`${BACKEND_BASE_URL}/projects`,formData,
                     {
                        withCredentials: true
                    });
                    console.log('Response:', response.data);
                    console.log(response.data.success);
                    if (response.data.success) { 
                        navigate('/projects')
                    }
                    
                } catch (error) {
                    console.error('Error:', error);
                    setError('Failed to create user. Please try again.');
                } finally {
                    setIsSubmitting(false);
                    setFormData(null);
                }
            };
    
           submitData();
        }
    },[isSubmitting, formData ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('sumbiting');
        if (!project) {
            setError(`Project Name Can't be empty.`);
            return
        } else {
            setFormData({projectName : project ,userId});
            setIsSubmitting(true);
            
        }
        setError('');
    };

    return (
        <div className=''>
            <div className="flex items-center justify-between  mb-7">
                <h1 className="text-xl font-bold text-gray-900">Create Project</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col  max-w-5xl">
                <label htmlFor="project-name" className="mb-3 text-sm text-slate-700 font-medium  ">
                    Enter Project Name:
                </label>
                <div className="relative w-full  ">
                    <input
                        onChange={(e) => setProject(e.target.value)}
                        type="text"
                        id="project-name"
                        name='projectName'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Type here"
                    />
                </div>
                {error && (
                    <p className="text-red-500 text-sm fond-medium mt-1">{error}</p>
                )}
                <div className="flex items-center justify-end p-4 mt-5 rounded-b">
                    <button onClick={handleClose}
                        type="button"
                        className=" py-2.5 px-5 ms-3 me-3 text-md font-medium  text-red-600  bg-white rounded-lg  hover:bg-gray-100 hover:text-red-900  "
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="text-white backgroundColor text-lg  font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ModalProjectData
