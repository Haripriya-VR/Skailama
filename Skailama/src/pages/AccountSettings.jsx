import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import BreadCrumps from '../components/breadcrumps/BreadCrumps';
import Arrow from '../components/icons/Arrow';
import Language from '../components/icons/Language';
import Notifications from '../components/icons/Notifications';
import profilePic from '../assets/profile.png';
import { BACKEND_BASE_URL } from '../constants/constant';
import axios from 'axios';

import EditAndUpload from '../components/buttons/EditAndUpload';

function AccountSettings() {

    const userId = localStorage.getItem('user');
    const [userDetails, setUserDetails] = useState({
        username: '',
        useremail: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [originalUsername, setOriginalUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_BASE_URL}/get_user_details`,
                    { user_id: userId },
                    { withCredentials: true }
                );

                if (response.data.success) {
                    setOriginalUsername(response.data.data.userName)
                    setUserDetails({
                        username: response.data.data.userName,
                        useremail: response.data.data.email,
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        if (isSubmitting) {
            const submitData = async () => {
                try {
                    const response = await axios.post(
                        `${BACKEND_BASE_URL}/edit_user`,
                        { userName: userDetails.username, email: userDetails.useremail },
                        { withCredentials: true }
                    );
                    if (response.data.success) {
                        setSuccessMessage('UserName Changed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                } finally {
                    setIsSubmitting(false);
                }
            };

            submitData();
        }
    }, [isSubmitting, userDetails, userId]);

    const handleSubmit = () => {
        if (userDetails.username !== originalUsername) {

            setIsSubmitting(true);
        }
    };

    return (
        <div className="flex ">
            <Sidebar className=" h-dvh" />

            <div className="flex-1 h-screen p-8 ps-10 ">
                {/* Header */}
                <div className="flex justify-between items-center h-16 mb-4">
                    <div className='pb-4'>
                        <BreadCrumps projectName={"Settings"} />
                    </div>
                    <div className="flex items-center">
                        <Arrow />
                        <p className="font-bold text-3xl pt-1 pe-2">EN</p>
                        <Language />
                        <Notifications />
                    </div>
                </div>

                <div className="bg-lightgray py-2 rounded-lg">
                    <h1 className="theamColor font-bold text-5xl">Account Settings</h1>
                </div>

                <div className="flex py-5">
                    <div className='pe-10'>
                        <img src={profilePic} width={110} height={1010} alt="profile" />
                    </div>

                    <div className='pe-10'>
                        <label htmlFor="userName" className="mb-3  text-md font-bold text-slate-70 ">
                            User Name
                        </label>
                        <div className="w-[435px] pt-1">
                            <input
                                type="text"
                                id="userName"
                                value={userDetails.username}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" // Use w-full to apply the container width
                                placeholder="Enter Username"
                            />
                        </div>
                        
                        <div className='flex justify-end py-2'>
                        <span className='text-green-600 me-4'>{successMessage}</span>
                            <EditAndUpload value={'Edit'} handleClick={handleSubmit} />
                            
                        </div>
                       

                        
                    </div>

                    <div className=''>
                        <label htmlFor="Email" className="mb-3  font-bold text-slate-700 ">
                            Email
                        </label>
                        <div className="relative w-[435px] pt-1">
                            <input
                                type="text"
                                id="Email"
                                name="email"
                                value={userDetails.useremail}
                                onChange={(e) => setUserDetails({ ...userDetails, useremail: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" // Use w-full to apply the container width
                                disabled
                            />
                        </div>
                    </div>
                </div>


                <div className="py-5 ">
                    <h1 className="theamColor font-bold text-3xl">Subscriptions</h1>
                </div>
                <div className="flex rounded-lg justify-between items-center p-4 backgroundColor">
                    <p className='text-2xl text-white'>You are currently on the <span className='font-bold underline'>Ques AI Basic Plan!</span></p>
                    <button
                        type="button"
                        className="focus:outline-none  font-bold rounded-lg theamColor  px-5 py-2.5 bg-white text-center "
                    >
                        Upgrade
                    </button>
                </div>
                <a href="#" target="_blank" rel="noopener noreferrer" className="canncelSubscription font-bold text-xl underline">
                    Cancel Subscription
                </a>
            </div>
        </div>
    );
}

export default AccountSettings;
