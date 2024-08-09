import React from 'react';
import CreateProjectModal from './CreateProjectModal';
import ModalProjectData from './ModalProjectData';
import UserModal from './UserModal';
import FilesModal from './FilesModal';
// import { UserProvider } from '../../context/userContext'; 

function ModalData({ ProjectModalOpen, userModalOpen, handleProjectModal, handleUserModal, fileModalOpen, handleFileModal, projectName }) {

    return (
        <div>
            {/* Modal for Project */}
            {ProjectModalOpen && (
                <CreateProjectModal modal_option={ProjectModalOpen} handleModal={handleProjectModal}>
                    <ModalProjectData handleClose={() => handleProjectModal(false)} />
                </CreateProjectModal>
            )}

            {/* Modal for User */}
            {userModalOpen && (
                <CreateProjectModal modal_option={userModalOpen} handleModal={handleUserModal}>
                    <UserModal handleClose={handleUserModal} />
                </CreateProjectModal>
            )}
            {/* Modal for User */}
            {fileModalOpen && (
                <CreateProjectModal modal_option={fileModalOpen} handleModal={handleFileModal}>
                    <FilesModal projectName={projectName} handleClose={() => handleFileModal(false)} />
                </CreateProjectModal>
            )}
        </div>
    );
}

export default ModalData;
