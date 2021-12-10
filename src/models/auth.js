const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const authSchema = new Schema({
    username: {
        type: 'string',
        require: true
    },
    password: {
        type: 'string',
        require: true
    },
},{
    timestamps: true
})

authSchema.methods.encryPass = pass => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
}

authSchema.methods.decryPass = function(pass) {
    return bcrypt.compareSync(pass, this.password);
}

module.exports = model('auths', authSchema);