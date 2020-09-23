const {Schema, model} = require('mongoose');
mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    produtos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//mongoose.model("User", UserSchema);
module.exports = model('User', UserSchema);
