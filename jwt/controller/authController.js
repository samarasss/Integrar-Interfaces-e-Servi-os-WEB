const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET; 

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    try {
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Email ou senha incorretos' });

        user.isCorrectPassword(password, (err, same) => {
            if (!same) return res.status(401).json({ error: 'Email ou senha incorretos' });

            // Gerar o token JWT
            const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
            res.json({ user, token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno, tente novamente' });
    }
};

module.exports = {
    login, register
};


