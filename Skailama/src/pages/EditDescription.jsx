import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants/constant';
import Sidebar from '../components/sidebar/Sidebar';
import BreadCrumps from '../components/breadcrumps/BreadCrumps';
import Arrow from '../components/icons/Arrow';
import Language from '../components/icons/Language';
import Notifications from '../components/icons/Notifications';
import EditAndUpload from '../components/buttons/EditAndUpload';
import { FaPencil } from "react-icons/fa6";


function EditDescription() {
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(null);
    const [editEnable, setEditEnable] = useState(false);
    const [description, setDescription] = useState('');

    const location = useLocation();
    const { projectId, projectName, editFile } = location.state || {}; 
    const { fileId } = useParams();
    const fileEdit = location.fileEdit;

    // Safeguard if editFile is not found
    const findedData = editFile ? editFile.find((item) => item._id === fileId) : null;
    const findedID = findedData ? findedData._id : '';

    useEffect(() => {

        if (findedData) {
            setDescription(findedData.description);
        }
    }, [findedData]);

    const handleEdit = (params) => {
        setEditEnable(params);
    };

    const handleClick = () => {
        handleSubmit();
        handleEdit()
    };

    const handleChange = (event) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        if (isSubmitting && formData) {
            const fetchFileData = async () => {
                try {
                    const response = await axios.post(`${BACKEND_BASE_URL}/edit_description`, formData, {
                        withCredentials: true
                    });
                    setFileData(response.data);
                    setDescription(response.data.description);
                } catch (error) {
                    console.error('Error fetching file data:', error);
                    setError('Failed to fetch file data');
                } finally {
                    setIsSubmitting(false);
                }
            };
            fetchFileData();
        }
    }, [isSubmitting, formData]);

    const handleSubmit = () => {
        try {
            const dataToSubmit = { projectId, findedID, description };
            setFormData(dataToSubmit);
            setIsSubmitting(true);
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setError('Failed to update file description');
        }
    };

    return (
        <div className='flex'>
           <Sidebar className=" h-dvh" />
            <div className='flex-1 p-4 m-10'>
                {/* Header */}
                <div className="flex justify-between items-center h-16 mb-4">
                    <div className='pb-4'>
                        <BreadCrumps projectName={projectName} />
                    </div>
                    <div className="flex items-center">
                        <Arrow />
                        <p className='font-bold text-3xl pt-1 pe-2 '>EN</p>
                        <Language />
                        <Notifications />
                    </div>
                </div>
                {/* edit-save discard heading */}
                <div className='flex justify-between items-center'>
                    <div className='bg-lightgray pb-10 rounded-lg'>
                        <h1 className='theamColor font-bold text-5xl'>Edit Transcript</h1>

                    </div>
                    {editEnable === true ? (
                        <div className='flex items-center'>
                            <button
                                onClick={() => handleEdit(false)}
                                type="button"
                                className="text-red-500 border-red-500 bg-gradient-to-r border font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
                            >
                                Discard
                            </button>
                            <EditAndUpload handleClick={handleClick} value={'Save & exit'} />
                        </div>
                    ) : null}
                </div>

                {/* input text */}

                <form>
                    <div className="w-full mb-4 border theamBorder rounded-lg">
                        <div className="flex items-center justify-between px-3 py-2">
                            <div className="flex flex-wrap items-center">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(true)}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border text-white border-gray-200 rounded-full bg-gray-600"
                                    >
                                        <div className='p-1 pt-2'><FaPencil /></div>
                                        Edit Mode
                                    </button>
                                </div>
                            </div>
                            <button
                                type="button"
                                data-tooltip-target="tooltip-fullscreen"
                                className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto"
                            >



                                <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white theamBorder rounded-full border ">
                                    <svg width="15" height="15" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.6631 19.6006H20.5769L20.1919 19.2293C21.5394 17.6618 22.3506 15.6268 22.3506 13.4131C22.3506 8.47684 18.3494 4.47559 13.4131 4.47559C8.4769 4.47559 4.47565 8.47684 4.47565 13.4131C4.47565 18.3493 8.4769 22.3506 13.4131 22.3506C15.6269 22.3506 17.6619 21.5393 19.2294 20.1918L19.6006 20.5768V21.6631L26.4756 28.5243L28.5244 26.4756L21.6631 19.6006ZM13.4131 19.6006C9.9894 19.6006 7.22565 16.8368 7.22565 13.4131C7.22565 9.98934 9.9894 7.22559 13.4131 7.22559C16.8369 7.22559 19.6006 9.98934 19.6006 13.4131C19.6006 16.8368 16.8369 19.6006 13.4131 19.6006Z" fill="#7E22CE" />
                                    </svg>


                                </button>


                            </button>
                            <div
                                id="tooltip-fullscreen"
                                role="tooltip"
                                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium rounded-lg"
                            >
                                Show full screen
                                <div className="tooltip-arrow" data-popper-arrow></div>
                            </div>
                        </div>
                        <div>
                            <h1 className='theamColor font-bold text-xl ps-4'>Speaker</h1>
                        </div>
                        <div className="px-4 py-2">
                            <textarea
                                id="editor"
                                rows="14"
                                className="w-full px-0 border-none bg-transparent focus:outline-none custom-scrollbar"
                                placeholder={findedData.description}
                                value={editEnable ? description : ''}
                                onChange={handleChange}
                                disabled={!editEnable}
                                required
                            />

                        </div>
                    </div>
                </form>


            </div>
        </div>
    );
}

export default EditDescription;
