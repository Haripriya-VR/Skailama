const projectModel = require("../Model/projectModel");
const UserModel = require("../Model/userModel");

module.exports = {
    // project ApI

    projectPost: async (req, res) => {
        try {
            const { projectName ,userId } = req.body;
            console.log('projectName id',projectName,userId);

            if (!projectName) {
                return res.status(400).json({ success: false, message: 'Product name is required' });
            }

            const result = await projectModel.create({ projectName ,userId });

            return res.status(201).json({ success: true, product: result });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error });
        }
    },
    projectGet: async (req, res) => {
        try {
            const { userId } = req.query; // Get userId from query parameters
    
            if (!userId) {
                return res.status(400).json({ success: false, message: 'User ID is required' });
            }
    
            const project_data = await projectModel.find({ userId });
    
            return res.status(200).json({ success: true, project: project_data });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    

    projectFile_post: async (req, res) => {
        try {
            const { projectName, projectFile, description } = req.body;
            const existingProject = await projectModel.findOne({ projectName });
            if (existingProject) {
                const updatedProject = await projectModel.updateOne(
                    { projectName },
                    {
                        $push: {
                            projectFile: {
                                FileName: projectFile,
                                description: description,
                                status: true
                            }
                        }
                    }
                );

                if (updatedProject.modifiedCount > 0) {
                    return res.status(200).json({ success: true, message: 'Project updated successfully' });
                } else {
                    return res.status(400).json({ success: false, message: 'No changes were made' });
                }
            } else {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    ProjectFilesGet: async (req, res) => {
        try {
            const project_data = await projectModel.find().sort( { "createdAt":- 1 } )

            return res.status(200).json({ success: true, project: project_data })

        } catch (error) { 
            console.error(error);
            return res.status(500).json({ success: false, message: error });
        }
    },

    ProjectDescriptionEdit: async (req, res) => {
        try {
            const { projectId, findedID, description } = req.body;

            if (!projectId || !findedID || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter all required details",
                    status: 400
                });
            }

            const projectFind = await projectModel.findOne({ _id: projectId });

            if (!projectFind) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                    status: 404
                });
            }

            const updatedFile = projectFind.projectFile.map((element) => {
                if (element._id.toString() === findedID) {
                    element.description = description;
                }
                return element;
            });

            const updatedCount = await projectModel.updateOne(
                { _id: projectId },
                { $set: { projectFile: updatedFile } }
            );

            if (updatedCount.nModified === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No documents updated",
                    status: 400
                });
            }

            res.status(200).json({
                success: true,
                message: "File description updated successfully",
                status: 200
            });
        } catch (error) {
            console.error('Error updating file description:', error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
    projectFileDelete: async (req, res) => {
        try {

            const { fileId } = req.params;
            const { projectId } = req.query
            const projectFind = await projectModel.findOne({ _id: projectId });

            if (!projectFind) {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                    status: 404
                });
            }

            let fileName
            const updatedFile = projectFind.projectFile.map((element) => {
                if (element._id.toString() === fileId) {
                    fileName = element.FileName
                    element.status = false;
                }
                return element;
            });

   
          
            const deleteCount = await projectModel.updateOne(
                { _id: projectId }, 
                { $pull: { projectFile: { FileName: fileName } } }
            );


            if (deleteCount === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No documents updated",
                    status: 400
                });
            }

            res.status(200).json({ message: 'File marked as deleted successfully' });
        } catch (error) {
            console.error('Error soft deleting file:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

}
