const mongoose = require('mongoose');

// Define a unified schema for both DisplayWidget and GeneralWidget
const widgetSchema = new mongoose.Schema({
    
     chatbotName: {
        type: String,
       
    },
    welcomeMessage: {
        type: String,
       
    },
    inputPlaceholder: {
        type: String,
        
    },
    primaryColor: {
        type: String,
      
        default: '#7BD568'
    },
    fontColor: {
        type: String,
       
        default: '#3C3C3C'
    },
    fontSize: {
        type: Number,
        
        default: 25
    },
    chatHeight: {
        type: Number,
      
        default: 50 
    },
    isChecked: {
        type: Boolean,
       
        default: true
    },
    chatIconSize: {
        type: String,
        enum: ['Small (48x48 px)', 'Medium (64x64 px)', 'Large (128x128 px)'],
        default: 'Small (48x48 px)'
    },
    positionOnScreen: {
        type: String,
        enum: ['Bottom Right', 'Bottom Left', 'Top Right', 'Top Left'],
        default: 'Bottom Right'
    },
    distanceFromBottom: {
        type: Number,
       
        default: 20
    },
    horizontalDistance: {
        type: Number,
       
        default: 20
    },
    botIconUrl: {
        type: String,
        default: '' 
    },

   
});

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
