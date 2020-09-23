const {Schema, model} = require('mongoose');
mongoose = require('mongoose');


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    preco:{
        type: Number,
        required: true,
    },
    foto: {
        type :String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//mongoose.model("User", UserSchema);
module.exports = model('Product', ProductSchema);
