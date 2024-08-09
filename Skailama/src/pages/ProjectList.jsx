import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../components/topbar/Topbar';
import CreateNewProject from '../components/buttons/CreateNewProject';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../constants/constant';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
               
    
                if (!userId) {
                    console.error('User ID not found in localStorage');
                    return;
                }
    
                // Fetch projects for the specific userId
                const res = await axios.get(`${BACKEND_BASE_URL}/projects_list`, {
                    params: { userId }, // Pass userId as a query parameter
                    withCredentials: true,
                });
    
                const response = res.data;
    
                if (response.success) {
                    setProjects(response.project);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
    
        fetchProjects();
    }, []);
    

    const handleClick = (index) => {
        navigate('/project-details', { state: projects[index].projectName });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    };
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorArr.length);
        return colorArr[randomIndex];
    };
    const colorArr = [' #7E22CE', '#F8A01D', '#F8A01D']
    return (
        <div>
            <Topbar />


            <div className='ms-48 me-24 mt-5'>
               <Link to='/'>
               <div>
                    <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full ">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0613 8.18402L21.1252 13.6415V23.1133H18.6996V15.8366H11.423V23.1133H8.99746V13.6415L15.0613 8.18402ZM15.0613 4.92166L2.93359 15.8366H6.57191V25.5388H13.8486V18.2622H16.2741V25.5388H23.5507V15.8366H27.1891L15.0613 4.92166Z" fill="#3C3C3C" />
                        </svg>

                        Back to Home
                    </button>
                </div>
               </Link>
                <div className='flex justify-between'>
                    <h1 className='font-bold theamColor md:text-3xl lg:text-5xl flex items-center'>Projects</h1>
                    <div className='me-7 flex items-center'>
                        <Link to="/"><CreateNewProject buttontext={'Create New Project'} backgroundColor={"#211935"} /></Link>
                    </div>
                </div>

                <div className="grid gap-x-8 gap-y-12 grid-cols-3 py-7">
                    {projects.map((project, index) => (
                        <div
                            key={project._id}
                            onClick={() => handleClick(index)}
                            className="w-11/12 bg-white border border-gray-400 rounded-2xl shadow hover:bg-gray-100 shadow-md flex"
                        >
                            <div
                                className="flex-shrink-0 w-2/6 h-4/4 m-2 border font-bold text-white lg:text-5xl rounded-lg p-4 flex items-center justify-center"
                                style={{ backgroundColor: getRandomColor() }}
                            >
                                {getInitials(project.projectName)}
                            </div>
                            <div className="flex-1 p-4 leading-normal">
                                <h5 className="text-xl font-bold theamColor">
                                    {project.projectName}
                                </h5>
                                <p className='text-sm'>4 Episodes</p>
                                <p className="mt-3 font-normal text-gray-700 dark:text-gray-400">
                                    Here are the biggest
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjectList;
