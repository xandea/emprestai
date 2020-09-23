const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { name, user, email, password}=req.body;

        const userExist= await User.findOne({user:user });
        if(userExist){
            console.log("User existente");
            return res.json(userExist);
        }
        else{
            const cadastro = await User.create({
                name: name,
                user: user,
                email: email,
                password: password
            })
            return res.json(cadastro);
        }
    }

        
};