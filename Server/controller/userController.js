const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
module.exports = {
    login: async (req, res) => {
        try {
            const { password, userName, email } = req.body;
            if (!password || !userName || !email) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            const data = {
                userName: userName,
                email: email,
                password: password
            };

            const existingUser = await UserModel.findOne({ email: data.email });
            if (!existingUser) {
                const User = await UserModel.create(data);
                req.session.user = {
                    userName: User.userName,
                    email: User.email,
                    _id: User._id
                };

                return res.json({ success: true, User });
            }

            return res.status(400).json({ success: false, message: 'User already exists' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },
    editUser: async (req, res) => {
        try {
            const { userName, email } = req.body

            const user = await UserModel.findOne({ email: email })

            if (user) {

                await UserModel.updateOne(
                    { email: email },
                    { $set: { userName: userName } }
                );
                res.status(200).json({ success: true })
            } else {
                return res.status(400).json({ success: false, message: 'User not found' });
            }

        } catch (error) {
            res.status(400).json({ success: false, message: error })
        }
    },
    getUser: async (req, res) => {

        try {
            const { user_id } = req.body

            const user = await UserModel.findOne({ _id: user_id })

            if (user) {
                res.status(200).json({ success: true, data: user })
            } else {
                return res.status(400).json({ success: false, message: "User not found" });
            }

        } catch (error) {
            res.status.json({ success: false, message: error })
        }
    }
}