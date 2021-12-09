const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const authSchema = new Schema({
    username: {
        type: 'string',
        require: true
    },
    pass: {
        type: 'string',
        require: true
    },
},{
    timestamps: true
})

authSchema.methods.encryPass = async pass => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
}

authSchema.methods.decryPass = function(pass) {
    return await bcrypt.compare(pass, this.pass);
}



module.exports = model('auth', authSchema);