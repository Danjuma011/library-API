const User = require("../models/User");

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if(!userId)return res.status(404).send('not found')

    const adminId = req.headers.authorization.split(' ')[0]
    const admin = await User.findOne({ _id: adminId })
    if (!admin || !admin.isAdmin) return res.status(401).send({ message: 'Unauthorized', error: 'only admin can delete' })

    try {
        await User.findByIdAndDelete(userId)
        res.status(204).send({message:"deleted succesfully"});
    } catch (error) {
        res.status(500).send({message: "server error"});
    }
    
 }

 module.exports = {deleteUser}