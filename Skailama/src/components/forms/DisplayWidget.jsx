import React, { useEffect, useState } from 'react';
import EditAndUpload from '../buttons/EditAndUpload';
import { BACKEND_BASE_URL } from '../../constants/constant';
import axios from 'axios';

function DisplayWidget() {
    // State hooks for each input
    const [color, setColor] = useState('#7BD568');
    const [fontColor, setFontColor] = useState('#3C3C3C');
    const [fontSize, setFontSize] = useState(0);
    const [chatHeight, setChatHeight] = useState(0);
    const [iconSize, setIconSize] = useState('');
    const [positionOnScreen, setPositionOnScreen] = useState('');
    const [distanceFromBottom, setDistanceFromBottom] = useState(0);
    const [horizontalDistance, setHorizontalDistance] = useState(0);
    const [isChecked, setIsChecked] = useState(true);
    const [file, setFile] = useState(null);

    // Handlers for each input change
    const handleColorChange = (event) => setColor(event.target.value);
    const handleFontColorChange = (event) => setFontColor(event.target.value);
    const handleFontSizeChange = (event) => setFontSize(event.target.value);
    const handleChatHeightChange = (event) => setChatHeight(event.target.value);
    const handleIconSizeChange = (event) => setIconSize(event.target.value);
    const handlePositionOnScreenChange = (event) => setPositionOnScreen(event.target.value);
    const handleDistanceFromBottomChange = (event) => setDistanceFromBottom(event.target.value);
    const handleHorizontalDistanceChange = (event) => setHorizontalDistance(event.target.value);
    const handleToggleChange = () => setIsChecked(!isChecked);
    const handleFileChange = (event) => setFile(event.target.files[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(null);


    useEffect(() => {
        if (isSubmitting && formData) {
            const fetchFileData = async () => {
                try {
                    const response = await axios.post(`${BACKEND_BASE_URL}/DisplayWidge`, formData, {
                        withCredentials: true
                    });
                   
                } catch (error) {
                    console.error('Error fetching file data:', error);
                
                } finally {
                    setIsSubmitting(false);
                }
            };
            fetchFileData();
        }
    }, [isSubmitting, formData]);

    const handleSubmit = () => {
        setFormData({
            color,
            fontColor,
            fontSize,
            chatHeight,
            iconSize,
            positionOnScreen,
            distanceFromBottom,
            horizontalDistance,
            isChecked,
            file
        })

        setIsSubmitting(true)
    };

    return (
        <div className="py-5">
             <form className="max-w-6xl" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-8">
                    {/* Primary Color */}
                    <div className="mb-5">
                        <label htmlFor="primaryColor" className="block mb-2 text-lg font-bold">Primary Color</label>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                id="primaryColor"
                                value={color}
                                className="border border-gray-300 rounded-lg w-96 h-12"
                                readOnly
                            />
                            <div
                                className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300 flex items-center justify-center"
                                style={{ backgroundColor: color }}
                            >
                                <input
                                    type="color"
                                    id="colorPicker"
                                    value={color}
                                    onChange={handleColorChange}
                                    className="absolute opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                            Select the primary color for the chat widget.
                        </p>
                    </div>

                    {/* Font Color */}
                    <div className="mb-5">
                        <label htmlFor="fontColor" className="block mb-2 text-lg font-bold">Font Color</label>
                        <div className="flex items-center space-x-6">
                            <input
                                type="text"
                                id="fontColorPreview"
                                value={fontColor}
                                readOnly
                                className="border border-gray-300 rounded-lg w-96 h-12"
                            />
                            <div
                                className="w-12 h-12 cursor-pointer rounded-lg border border-gray-300 flex items-center justify-center"
                                style={{ backgroundColor: fontColor }}
                            >
                                <input
                                    type="color"
                                    id="fontColor"
                                    value={fontColor}
                                    onChange={handleFontColorChange}
                                    className="absolute opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">
                            Select the font color for the chat widget.
                        </p>
                    </div>

                    {/* Font Size */}
                    <div className="mb-5">
                        <label htmlFor="fontSize" className="block mb-2 text-lg font-bold">Font Size (in px)</label>
                        <input
                            type="number"
                            id="fontSize"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                        <p className="text-gray-400 text-sm mt-1">Specify the font size for the chat widget.</p>
                    </div>

                    {/* Chat Height */}
                    <div className="mb-5">
                        <label htmlFor="chatHeight" className="block mb-2 text-lg font-bold">Chat Height (in % of total screen)</label>
                        <input
                            type="number"
                            id="chatHeight"
                            value={chatHeight}
                            onChange={handleChatHeightChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                        <p className="text-gray-400 text-sm mt-1">Specify the height of the chat widget as a percentage of the total screen height.</p>
                    </div>

                    {/* Icon Size */}
                    <div className="mb-5">
                        <label htmlFor="chatIconSize" className="block mb-2 text-lg font-bold">Chat Icon Size</label>
                        <select
                            id="chatIconSize"
                            value={iconSize}
                            onChange={handleIconSizeChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option>Small (48x48 px)</option>
                            <option>Medium (64x64 px)</option>
                            <option>Large (128x128 px)</option>
                        </select>
                    </div>

                    {/* Position on Screen */}
                    <div className="mb-5">
                        <label htmlFor="positionOnScreen" className="block mb-2 text-lg font-bold">Position on Screen</label>
                        <select
                            id="positionOnScreen"
                            value={positionOnScreen}
                            onChange={handlePositionOnScreenChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option>Bottom Right</option>
                            <option>Bottom Left</option>
                            <option>Top Right</option>
                            <option>Top Left</option>
                        </select>
                    </div>

                    {/* Distance from Bottom */}
                    <div className="mb-5">
                        <label htmlFor="distanceFromBottom" className="block mb-2 text-lg font-bold">Distance from Bottom (in px)</label>
                        <input
                            type="number"
                            id="distanceFromBottom"
                            value={distanceFromBottom}
                            onChange={handleDistanceFromBottomChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Horizontal Distance */}
                    <div className="mb-5">
                        <label htmlFor="horizontalDistance" className="block mb-2 text-lg font-bold">Horizontal Distance (in px)</label>
                        <input
                            type="number"
                            id="horizontalDistance"
                            value={horizontalDistance}
                            onChange={handleHorizontalDistanceChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>
                </div>

                {/* Toggle Switch */}
                <div className="mb-8 flex items-center">
                    <label className="mr-3 text-lg font-bold">Show Sources</label>
                    <label className="inline-flex relative items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isChecked}
                            onChange={handleToggleChange}
                        />
                        <div
                            className={`w-11 h-6 rounded-full transition-all ${isChecked ? 'bg-purple-600' : 'bg-gray-200'}`}
                        >
                            <div
                                className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-all ${isChecked ? 'translate-x-full bg-white border-white' : 'bg-gray-300 border-gray-300'}`}
                            />
                        </div>
                    </label>
                    <p className="text-gray-400 text-sm ml-3">Toggle to show or hide sources.</p>
                </div>

                <hr className='border-2 rounded-lg' />
                <h2 className="text-2xl font-bold text-purple-600 my-6">Chat Icon</h2>

                {/* Bot Icon Upload */}
                <div className="flex flex-col items-start">
                    <label className="block mb-2 text-lg font-bold">Bot Icon</label>
                    <div className='flex'>
                        <div className="relative">
                            <input
                                type="file"
                                className="hidden"
                                id="upload"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="upload"
                                className="flex items-center justify-center w-16 h-16 bg-gray-400 text-white rounded-full cursor-pointer"
                            >
                                {/* Icon preview or default icon here */}
                            </label>
                        </div>
                        <div className=''>
                            <button
                                type="button"
                                className="flex text-white mt-2 ms-3 items-center px-4 py-2 bg-purple-600 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
                                onClick={() => document.getElementById('upload').click()}
                            >
                                Upload Image
                                <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.0417 23.3333V11.4479L12.25 15.2396L10.2084 13.125L17.5 5.83334L24.7917 13.125L22.75 15.2396L18.9584 11.4479V23.3333H16.0417ZM8.75004 29.1667C7.94796 29.1667 7.26108 28.8808 6.68942 28.3092C6.11775 27.7375 5.8324 27.0511 5.83338 26.25V21.875H8.75004V26.25H26.25V21.875H29.1667V26.25C29.1667 27.0521 28.8809 27.739 28.3092 28.3106C27.7375 28.8823 27.0512 29.1677 26.25 29.1667H8.75004Z" fill="white" />
                                </svg>
                            </button>
                            <p className="text-gray-400 mt-6 ms-3">Recommended Size: 48x48px</p>
                        </div>
                    </div>
                </div>
                <EditAndUpload value={'Submit'}/>
            </form>

           
        </div>
    );
}

export default DisplayWidget;
