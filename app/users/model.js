const mongoose = require('mongoose')
let usersSchema = mongoose.Schema ({
    email : {
        type : String,
        require : [true, 'Email Harus Diisi']
    },
    name : {
        type : String,
        require : [true, 'Nama Harus Diisi']
    },
    password : {
        type : String,
        require : [true, 'Password Harus Diisi']
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'admin'
    },
    status : {
        type : String,
        require : ['Y','N'],
        default : 'Y'
    },
    phoneNumber : {
        type : String,
        require : [true, 'Nomor telepon Harus Diisi']
    }, 
},
{timestamps: true}

)

module.exports = mongoose.model('Users' , usersSchema);