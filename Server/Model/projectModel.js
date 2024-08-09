const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    projectName: {
        type: String,
        required: true
    } ,
    projectFile: [{
        FileName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true 
        },
        status: {
            type: Boolean
        }
        
    }]
    
}, {
    timestamps: true
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;


