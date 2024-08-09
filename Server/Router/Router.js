const express = require("express");
const router = express.Router()
const widgetController = require('../controller/widgetController');
const userController = require('../controller/userController');
const projectController = require("../controller/projectController");

// user Routes
router.post('/login', userController.login)
router.post('/edit_user', userController.editUser)
router.post('/get_user_details', userController.getUser)


// ================================================
// project Routes

router.post('/projects', projectController.projectPost)
router.get('/projects_list', projectController.projectGet)
router.post('/projectEdit', projectController.projectFile_post)
router.get('/projectFiles', projectController.ProjectFilesGet)
router.post('/edit_description', projectController.ProjectDescriptionEdit)
router.delete('/delete_files/:fileId',projectController.projectFileDelete)

// ====================================================================
// Widget config Routes

router.post('/DisplayWidge',widgetController.DisplayWidget)
router.post('/GeneralWidge',widgetController.GeneralWidget)

module.exports = router

