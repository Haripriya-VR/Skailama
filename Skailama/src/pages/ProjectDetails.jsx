import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BreadCrumps from '../components/breadcrumps/BreadCrumps';
import Notifications from '../components/icons/Notifications';
import Sidebar from '../components/sidebar/Sidebar';
import Language from '../components/icons/Language';
import Arrow from '../components/icons/Arrow';
import ModalData from '../components/modals/ModalData';
import { BACKEND_BASE_URL } from '../constants/constant';
import axios from 'axios';


function ProjectDetails() {
   const [projects, setProjects] = useState([]);
   const [projectId, setProjectId] = useState([]);
   const [editFile, setEditfile] = useState([]);
   const [projectName,setProjectName]= useState('')
   console.log('projectName',projectName);

   const [cards, setCards] = useState([])
   const [fileModalOpen, setFileModalOpen] = useState(false);
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
      if (location.state) {
         setProjectName(location.state);
      }
   }, [location.state]);
  

   const handleClick = (file) => {
      navigate(`/edit_description/${file._id}`, { state: { projectName, editFile, projectId } });
   };

   useEffect(() => {
      const fetchProjects = async () => {
         try {
            const res = await axios.get(`${BACKEND_BASE_URL}/projectFiles`, {
               withCredentials: true,
            });

            const response = res.data;
           
            response.project.map((item) => {
               
               if (item.projectName == projectName) {
                  setProjectId(item._id);
                  setProjects([item]);
                  
                  setEditfile(item.projectFile);
                  

               } 
            })

         } catch (error) {
            console.error('Error fetching projects:', error);
         }
      };

      fetchProjects();
   }, [projectName]);

   const deleteFile = async (fileId) => {
      try {
         let response = await axios.delete(`${BACKEND_BASE_URL}/delete_files/${fileId}`, {
            params: { projectId },
            withCredentials: true
         });


         if (response.d) {
            setProjects((prevProjects) =>
               prevProjects.map((project) => ({
                  ...project,
                  projectFile: project.projectFile.filter((file) => file._id !== fileId),
               }))
            );
         }
      } catch (error) {
         console.error('Error deleting file:', error);
      }
   };

   const icons = [
      [<svg width="60" height="60" viewBox="0 0 84 83" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M42 82.7077C65.196 82.7077 84 64.1929 84 41.3538C84 18.5147 65.196 0 42 0C18.804 0 0 18.5147 0 41.3538C0 64.1929 18.804 82.7077 42 82.7077Z" fill="#DA0000" />
         <path d="M68.824 28.0839C68.5067 26.9074 67.8792 25.8344 67.005 24.9737C66.1308 24.113 65.0411 23.4951 63.8462 23.1827C59.5093 22.0554 42 22.0554 42 22.0554C42 22.0554 24.4844 22.0554 20.1164 23.2072C18.9273 23.5243 17.844 24.1443 16.9756 25.0047C16.1072 25.8651 15.4844 26.9356 15.1698 28.1084C14 32.3969 14 41.3784 14 41.3784C14 41.3784 14 50.3476 15.1698 54.6484C15.4844 55.8212 16.1072 56.8917 16.9756 57.7521C17.844 58.6125 18.9273 59.2325 20.1164 59.5496C24.472 60.7014 42 60.7014 42 60.7014C42 60.7014 59.5093 60.7014 63.8773 59.5496C65.0722 59.2372 66.1619 58.6193 67.0361 57.7586C67.9103 56.8978 68.5378 55.8249 68.8551 54.6484C70.0311 50.3598 70.0311 41.3784 70.0311 41.3784C70.0311 41.3784 70 32.3847 68.824 28.0839ZM36.4 49.6247V33.0831L50.9413 41.3539L36.4 49.6247Z" fill="white" />
      </svg>, <p>Upload<br />YouTube Video</p>],
      [<svg width="60" height="60" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M42 0C33.6932 0 25.5729 2.46326 18.6661 7.07828C11.7592 11.6933 6.37596 18.2528 3.19708 25.9273C0.018198 33.6018 -0.813542 42.0466 0.807037 50.1938C2.42762 58.341 6.42773 65.8247 12.3015 71.6985C18.1753 77.5723 25.659 81.5724 33.8062 83.193C41.9534 84.8135 50.3982 83.9818 58.0727 80.8029C65.7472 77.624 72.3067 72.2408 76.9217 65.3339C81.5367 58.4271 84 50.3068 84 42C84 30.8609 79.575 20.178 71.6985 12.3015C63.822 4.42499 53.1391 0 42 0ZM61.2889 60.5796C60.9258 61.1718 60.3427 61.596 59.6675 61.7593C58.9923 61.9225 58.2798 61.8116 57.6862 61.4507C47.824 55.4213 35.4107 54.0587 20.7885 57.4C20.1257 57.5184 19.4428 57.3771 18.8815 57.0053C18.3202 56.6336 17.9235 56.0601 17.7738 55.4037C17.6241 54.7473 17.7329 54.0585 18.0776 53.4802C18.4223 52.9018 18.9764 52.4784 19.6249 52.2978C35.6222 48.6391 49.3484 50.2133 60.4178 56.9769C61.0059 57.344 61.4249 57.9289 61.5834 58.6038C61.742 59.2787 61.6271 59.989 61.264 60.5796H61.2889ZM66.4285 49.1369C65.9741 49.8772 65.2445 50.407 64.3999 50.61C63.5553 50.813 62.6647 50.6726 61.9236 50.2195C50.6364 43.2818 33.4258 41.272 20.0729 45.3227C19.242 45.5751 18.3448 45.4872 17.5788 45.0782C16.8127 44.6692 16.2405 43.9727 15.988 43.1418C15.7355 42.3109 15.8235 41.4137 16.2325 40.6477C16.6414 39.8816 17.338 39.3094 18.1689 39.0569C33.4196 34.4275 52.3911 36.6738 65.3458 44.6569C66.0777 45.1128 66.5997 45.8397 66.7978 46.6789C66.996 47.5182 66.8542 48.4017 66.4036 49.1369H66.4285ZM66.8702 37.2338C53.3058 29.1884 30.9742 28.4542 18.0445 32.3742C17.5493 32.5237 17.0295 32.5743 16.5148 32.5229C16.0001 32.4716 15.5006 32.3194 15.0447 32.075C14.124 31.5814 13.4371 30.7423 13.1351 29.7422C12.9856 29.247 12.9351 28.7273 12.9864 28.2126C13.0377 27.6979 13.19 27.1983 13.4344 26.7424C13.6788 26.2866 14.0106 25.8833 14.4108 25.5557C14.8111 25.228 15.272 24.9824 15.7671 24.8329C30.6071 20.328 55.2658 21.1991 70.8524 30.4329C71.2961 30.696 71.6837 31.0439 71.9929 31.4568C72.3021 31.8697 72.527 32.3394 72.6547 32.8392C72.7824 33.339 72.8104 33.859 72.7371 34.3696C72.6638 34.8802 72.4907 35.3714 72.2276 35.8151C71.9644 36.2588 71.6165 36.6463 71.2036 36.9556C70.7908 37.2648 70.321 37.4897 69.8212 37.6174C69.3215 37.745 68.8014 37.773 68.2908 37.6997C67.7802 37.6265 67.289 37.4533 66.8453 37.1902L66.8702 37.2338Z" fill="#7BD568" />
         <path d="M61.2642 60.5796C60.9011 61.1718 60.3181 61.596 59.6428 61.7593C58.9676 61.9226 58.2552 61.8116 57.6616 61.4507C47.7993 55.4214 35.386 54.0587 20.7638 57.4C20.101 57.5184 19.4182 57.3771 18.8568 57.0054C18.2955 56.6337 17.8989 56.0601 17.7492 55.4037C17.5995 54.7473 17.7083 54.0585 18.0529 53.4802C18.3976 52.9019 18.9517 52.4785 19.6002 52.2978C35.5976 48.6392 49.3238 50.2134 60.3931 56.9769C60.9854 57.3401 61.4096 57.9231 61.5728 58.5983C61.7361 59.2736 61.6251 59.986 61.2642 60.5796Z" fill="#010201" />
         <path d="M66.4037 49.1369C65.9493 49.8773 65.2198 50.4071 64.3752 50.61C63.5306 50.813 62.6399 50.6726 61.8988 50.2196C50.6117 43.2818 33.401 41.272 20.0481 45.3227C19.2172 45.5752 18.3201 45.4873 17.554 45.0783C16.7879 44.6693 16.2157 43.9727 15.9632 43.1418C15.7107 42.3109 15.7987 41.4138 16.2077 40.6477C16.6167 39.8816 17.3132 39.3094 18.1441 39.0569C33.3948 34.4276 52.3663 36.6738 65.321 44.6569C66.0571 45.1088 66.5842 45.8339 66.7871 46.6734C66.99 47.513 66.8521 48.3987 66.4037 49.1369Z" fill="#010201" />
         <path d="M66.8452 37.2339C53.3056 29.1886 30.9741 28.4543 18.0443 32.3743C17.5491 32.5239 17.0294 32.5744 16.5147 32.5231C16 32.4717 15.5004 32.3195 15.0445 32.0751C14.1239 31.5815 13.437 30.7424 13.135 29.7423C12.9854 29.2472 12.9349 28.7274 12.9863 28.2127C13.0376 27.698 13.1898 27.1984 13.4342 26.7426C13.6786 26.2867 14.0104 25.8834 14.4107 25.5558C14.8109 25.2281 15.2718 24.9825 15.767 24.833C30.607 20.3281 55.2656 21.1992 70.8523 30.433C71.296 30.6961 71.6835 31.044 71.9927 31.4569C72.302 31.8698 72.5269 32.3395 72.6545 32.8393C72.7822 33.3391 72.8102 33.8591 72.7369 34.3698C72.6637 34.8804 72.4905 35.3715 72.2274 35.8152C71.9643 36.2589 71.6164 36.6464 71.2035 36.9557C70.7906 37.2649 70.3209 37.4898 69.8211 37.6175C69.3213 37.7452 68.8013 37.7732 68.2907 37.6999C67.78 37.6266 67.2889 37.4534 66.8452 37.1903V37.2339Z" fill="#010201" />
      </svg>, <p>
         Upload<br />
         Spotify Podcast
      </p>],
      [<svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
         <rect width="84" height="84" fill="url(#pattern0_1353_1935)" />
         <defs>
            <pattern id="pattern0_1353_1935" patternContentUnits="objectBoundingBox" width="1" height="1">
               <use xlink:href="#image0_1353_1935" transform="scale(0.00390625)" />
            </pattern>
            <image id="image0_1353_1935" width="256" height="256" xlink:href="data:image/png;base64,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" />
         </defs>
      </svg>, <p>
         Upload<br />
         From
         RSS Feed
      </p>]

   ]

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      const dateOptions = { day: '2-digit', month: 'short', year: '2-digit' };
      const timeOptions = { hour: '2-digit', minute: '2-digit' };
      const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
      const formattedTime = new Intl.DateTimeFormat('en-GB', timeOptions).format(date);
      return `${formattedDate} | ${formattedTime}`;
   };

   const arr = [1, 1, 3, 3, 5, 6];

   const handleFileModal = (params) => {

      setFileModalOpen(params);
   };

   useEffect(() => {
      if (projects.length > 0 && projects[0].projectFile) {
         setCards(projects[0].projectFile.length !== 0 ? arr.slice(0, arr.length / 2) : arr);
      }else{
        
            
            setCards(arr);
     
      }
      return () => {
      };
   }, [projects])

   console.log('projects',projects.length > 0 && projects[0].projectFile);

   return (
      <div className='flex'>
         <Sidebar className="h-dvh" />
         <div className='main-content flex-1 p-4 m-10 mb-36'>
            {/* header */}
            <div className="flex justify-between items-center h-16 mb-4">
               <div className='pb-4'>
                  <BreadCrumps projectName={projectName} secondName={'Upload'} />
               </div>
               <div className='flex items-center'>
                  <Arrow />
                  <p className='font-bold text-3xl pt-1 pe-2'>EN</p>
                  <Language />
                  <Notifications />
               </div>
            </div>

            {/* cards */}
            <div className='bg-lightgray p-4 rounded-lg'>
               <h1 className='theamColor font-bold text-5xl'>Upload</h1>
               <div className="grid gap-x-8 gap-y-12 grid-cols-3 py-7">
                  {cards.map((item, index) => (

                     < div
                        key={index}
                        onClick={() => handleFileModal(true)}
                        className="w-11/12 bg-white border border-gray-400 rounded-2xl shadow hover:bg-gray-100 shadow-md flex"
                     >
                        <div className="font-bold p-2 ps-4 flex items-center justify-center">
                           {icons[index % icons.length][0]}
                        </div>
                        <div className="font-bold px-6 flex items-center text-lg justify-center">
                           {icons[index % icons.length][1]}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* {table} */}
            {(projects.length > 0 && projects[0].projectFile) == false ? (
   <div>
      <p className='text-4xl text-center pb-4 textColor'>or</p>
      <div className='border-4 rounded-lg border-dashed borderColor'>
         <div className='flex justify-center'>
            <svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M103.2 54.4666C99.5733 36.0666 83.4133 22.2533 64 22.2533C48.5867 22.2533 35.2 31 28.5333 43.8C12.48 45.5066 0 59.1066 0 75.5866C0 93.24 14.3467 107.587 32 107.587H101.333C116.053 107.587 128 95.64 128 80.92C128 66.84 117.067 55.4266 103.2 54.4666ZM101.333 96.92H32C20.2133 96.92 10.6667 87.3733 10.6667 75.5866C10.6667 64.6533 18.8267 55.5333 29.6533 54.4133L35.36 53.8266L38.0267 48.76C43.0933 39 53.0133 32.92 64 32.92C77.9733 32.92 90.0267 42.84 92.7467 56.5466L94.3467 64.5466L102.507 65.1333C110.827 65.6666 117.333 72.6533 117.333 80.92C117.333 89.72 110.133 96.92 101.333 96.92ZM42.6667 70.2533H56.2667V86.2533H71.7333V70.2533H85.3333L64 48.92L42.6667 70.2533Z" fill="#7E22CE" />
            </svg>
         </div>
         <p className='text-2xl text-center projectDetailText'>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
         <p className='textColor text-center'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
         <div className='flex justify-center'>
            <button type="button" className="theamColor border-2 theamBorder font-medium rounded-full text-sm px-7 py-2.5 text-center me-2 mb-2">Select File</button>
         </div>
      </div>
   </div>
) : (
   <div>
      <div className="flex rounded-lg justify-between items-center p-4 backgroundColor">
         <p className='text-2xl text-white'>All files are processed! Your widget is ready to go!</p>
         <button
            type="button"
            className="focus:outline-none font-bold rounded-lg px-5 py-2.5 bg-white text-center"
         >
            Try it out!
         </button>
      </div>
      <div className="relative overflow-x-auto mt-4 shadow-md sm:rounded-lg">
         <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase border">
               <tr>
                  <th scope="col" className="px-6 py-5">Name</th>
                  <th scope="col" className="px-6 py-3">Upload Date & Time</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                  <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
               </tr>
            </thead>
            <tbody>
               {projects.map((project) => (
                  project.projectFile.map((file) => (
                     <tr key={file._id} className="bg-white border-b">
                        <td className="px-6 py-3 font-medium text-gray-900">{file.FileName}</td>
                        <td className="px-6 py-4">{formatDate(project.updatedAt)}</td>
                        <td className="px-6 py-4">{project.status}</td>
                        <td className="px-6 py-1">
                           <button onClick={() => handleClick(file)} type="button" className="focus:outline-none border font-bold rounded-l-lg text-sm px-7 py-2.5 mb-2">Edit</button>
                           <button onClick={() => deleteFile(file._id)} type="button" className="focus:outline-none border font-bold text-red-500 rounded-r-lg text-sm px-5 py-2.5 mb-2">Delete</button>
                        </td>
                        <td className="px-6 py-4 text-right"></td>
                     </tr>
                  ))
               ))}
            </tbody>
         </table>
      </div>
   </div>
)}

         </div>
         {fileModalOpen && <ModalData projectName={projectName} fileModalOpen={fileModalOpen} handleFileModal={handleFileModal} />}

      </div >
   );
}

export default ProjectDetails;
