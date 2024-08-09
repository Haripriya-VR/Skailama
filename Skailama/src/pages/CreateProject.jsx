import React, { useState ,useEffect  } from 'react'
import Topbar from '../components/topbar/Topbar'
import podcast from '../assets/podcast.svg'
import CreateNewProject from '../components/buttons/CreateNewProject'
import CreateProjectModal from '../components/modals/CreateProjectModal'
import ModalData from '../components/modals/ModalData'


function CreateProject() {

  const [ProjectModalOpen, setProjectModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
        console.log(existingUser);
        if (existingUser) {
        console.log('hello');
          return;
        }
        console.log('herer');
    if(ProjectModalOpen){
      return false
    }
    setUserModalOpen(true);
  }, []);

  const handleProjectModal = (params) => {
    setProjectModalOpen(params); 
};

  const handleUserModal = (params) => {
    setUserModalOpen(params)
  }

  return (
    <div className='pt-2'>
      <Topbar /> 
      <div className='ms-48 me-32 mt-5'>
        
        <h1 className='font-bold	theamColor md:text-5xl lg:text-6xl flex justify-center'>Create New Project</h1>

        <div className='flex justify-center pt-3 '> <img src={podcast} alt="Logo" height={500} width={450} /> </div>
        <div className='createProjectText text-center mx-10 mt-4 text-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        </div>
        <CreateNewProject buttontext={'Create New Project'} backgroundColor={"#211935"} handleProjectModal={handleProjectModal} />
      </div>
      {/* <CreateProjectModal modal_option={modalOpen} handleModal={handleModal}/> */}

      <ModalData  ProjectModalOpen={ProjectModalOpen}  userModalOpen={userModalOpen} handleUserModal={handleUserModal} handleProjectModal={handleProjectModal}/>
    </div>
  )
}

export default CreateProject

