const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const updateRoles = async (req, res) => {
    const userId = req.params.id;
    const  roles  = req.body;
    console.log(roles)

    try {
        // Validar que roles es un objeto
        if (typeof roles !== 'object' || roles === null) {
            return res.status(400).json({ error: 'Los roles deben ser un objeto' });
        }

        // Actualizar roles del usuario
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { roles } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateRoles
}