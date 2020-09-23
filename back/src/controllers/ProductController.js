const Product = require('../models/Product');


module.exports={
    async listagem(req, res){
        
        const produtos = await Product.find({
            
        })
        return res.json(produtos);
    },
    async atualizar(req, res){
        const {id,status} = req.body;
        const productExist= await Product.findOne({_id:id });
        if(productExist){
            console.log("Produto existe");
        }
        const atualizaProduto = await Product.findByIdAndUpdate(id,{status},{new:true});

        return res.json(atualizaProduto);
    },
    async store(req, res) {
        const { name, user, descricao, preco, categoria, foto} = req.body;
        

        const productExist= await Product.findOne({name:name });
        if(productExist){
            console.log("Produto existente");
            return res.json(productExist);
        }
        else{
            const RegProd = await Product.create({
                name: name,
                user: user,
                descricao: descricao,
                categoria : categoria,
                preco: preco,
                foto :foto
            })
            return res.json(RegProd);
        }
    },

    async listaprodutoscat(req, res) {
        const { categoria} = req.headers;
        
        const produtoscat= await Product.find({
            "categoria":categoria
        });
        
        return res.json(produtoscat);
        
    },
    async listaProdutoIndividual(req, res) {
        const {_id } = req.headers;
        
        const produtosindi= await Product.find({
            "_id":_id
        });
        
        return res.json(produtosindi);
        
    },

    async delete(req, res){
        const {name}=req.body;
        const{id}=req.body;
        const productExist = await Product.findOne({name:name });

        if(productExist){
            const del = await Product.findByIdAndDelete(id);
            return res.json(del);
        }
        else{
            console.log("Produto não existe");
            return res.json({ok:true});

        }
        
    }
};






