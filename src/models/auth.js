const {Schema, model} = require('mongoose');


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

authSchema.methods.encryPass = pass => {
    
}

module.exports = model('auth', authSchema);