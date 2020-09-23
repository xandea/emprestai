const User = require('../models/User');

module.exports={

    async auth(req,res){
        const{user, password} = req.body;

        const userExist= await User.findOne({user:user });
        if(userExist){
            
            //const autenticacao = await User.findOne({user}).select('+password');
            const autenticacao= await User.findOne({
                $and: [
                    {user:user},
                    {password:password}
                ]
            })
            if(autenticacao){
                console.log("deu certo");
                return res.json(autenticacao);
            }
            else{
                console.log("nao deu certo");
            }
            return res.json();        
        }
        else{
            console.log("User não existe");
            return res.json();
        }
    }
}