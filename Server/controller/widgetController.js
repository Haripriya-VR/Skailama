const WidgetModel = require('../Model/widgetModel')

// GeneralWidget handler
module.exports = {
GeneralWidget :async (req, res) => {
    try {
        const { chatbotName, welcomeMessage, inputPlaceholder } = req.body;
        let widget = new WidgetModel({
                chatbotName,
                welcomeMessage,
                inputPlaceholder
            });
            await widget.save();
        

        res.status(200).json(widget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},
DisplayWidget :async (req, res) => {
    try {
        const {
            _id,
            primaryColor,
            fontColor,
            fontSize,
            chatHeight,
            isChecked,
            chatIconSize,
            positionOnScreen,
            distanceFromBottom,
            horizontalDistance,
            botIconUrl
        } = req.body;
        
        let widget;
        if (_id) {
            widget = await WidgetModel.findById(_id);
            if (widget) {
                
                widget.primaryColor = primaryColor;
                widget.fontColor = fontColor;
                widget.fontSize = fontSize;
                widget.chatHeight = chatHeight;
                widget.isChecked = isChecked;
                widget.chatIconSize = chatIconSize;
                widget.positionOnScreen = positionOnScreen;
                widget.distanceFromBottom = distanceFromBottom;
                widget.horizontalDistance = horizontalDistance;
                widget.botIconUrl = botIconUrl;
                widget = await widget.save();
            } else {
                return res.status(404).json({ error: 'Widget not found' });
            }
        } else {
            // Create a new widget
            widget = new WidgetModel({
                primaryColor,
                fontColor,
                fontSize,
                chatHeight,
                isChecked,
                chatIconSize,
                positionOnScreen,
                distanceFromBottom,
                horizontalDistance,
                botIconUrl
            });
            await widget.save();
        }

        res.status(200).json(widget);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
}