import React, { useEffect, useState } from 'react';
import EditAndUpload from '../buttons/EditAndUpload';
import { BACKEND_BASE_URL } from '../../constants/constant';
import axios from 'axios';

function GeneralWidget() {
   
    const [chatbotName, setChatbotName] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [inputPlaceholder, setInputPlaceholder] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleChatbotNameChange = (event) => setChatbotName(event.target.value);
    const handleWelcomeMessageChange = (event) => setWelcomeMessage(event.target.value);
    const handleInputPlaceholderChange = (event) => setInputPlaceholder(event.target.value);

    useEffect(() => {
      if (isSubmitting && formData) {
          const fetchFileData = async () => {
              try {
                  const response = await axios.post(`${BACKEND_BASE_URL}/GeneralWidge`, formData, {
                      withCredentials: true
                  });
                 
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

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        setFormData({
          chatbotName,
          welcomeMessage,
          inputPlaceholder,
      })

        setIsSubmitting(true)

    };

    return (
        <div className='h-dvh'>
            <form className="max-w-6xl" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="chatbotName" className="block mb-2 text-lg font-bold">Chatbot Name</label>
                    <input
                        type="text"
                        id="chatbotName"
                        value={chatbotName}
                        onChange={handleChatbotNameChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                    <p>Lorem ipsum dolor sit Lorem ipsum dolor sit</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="welcomeMessage" className="block mb-2 text-lg font-bold">Welcome Message</label>
                    <input
                        type="text"
                        id="welcomeMessage"
                        value={welcomeMessage}
                        onChange={handleWelcomeMessageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                    <p>Lorem ipsum dolor sit Lorem ipsum dolor sit</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="inputPlaceholder" className="block mb-2 text-lg font-bold">Input Placeholder</label>
                    <input
                        type="text"
                        id="inputPlaceholder"
                        value={inputPlaceholder}
                        onChange={handleInputPlaceholderChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                    <p>Lorem ipsum dolor sit Lorem ipsum dolor sit</p>
                </div>
                
               
               
            </form>
        </div>
    );
}

export default GeneralWidget;
