const mongoose = require('mongoose')


const bcrypt = require('bcryptjs')
const HASH_ROUND = 10
let playerSchema = mongoose.Schema ({
    email : {
        type : String,
        require : [true, 'Email Harus Diisi']
    },
    name : {
        type : String,
        require : [true, 'Nama akun Harus Diisi'],
        maxlength : [225, 'Panjang nama akun harus antara 3 - 225 karakter'],
        minlength : [3, 'Panjang nama akun harus antara 3 - 225 karakter'],
    },
    username : {
        type : String,
        require : [true, 'Username akun Harus Diisi'],
        maxlength : [225, 'Panjang Username akun harus antara 3 - 225 karakter'],
        minlength : [3, 'Panjang Username akun harus antara 3 - 225 karakter'],
    },
    password : {
        type : String,
        require : [true, 'Password Harus Diisi'],
        maxlength : [225, 'Panjang Password akun maksimal antara 225 karakter'],
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    },
    status : {
        type : String,
        require : ['Y','N'],
        default : 'Y'
    },
    avatar : {
        type : String,
    },
    fileName : {
        type : String
    },
    phoneNumber : {
        type : String,
        require : [true, 'Nomor telepon Harus Diisi'],
        maxlength : [13, 'Panjang nomor telepon harus antara 9 - 225 digit'],
        minlength : [9, 'Panjang nomor telepon harus antara 9 - 225 digit']
}, 
favorite : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
},
},
{timestamps: true})

playerSchema.path('email').validate(async function(value) {
    try {
        const count = await this.model('Player').countDocuments({email : value})

        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} Sudah Terdaftar`)

playerSchema.pre('save', function (next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player' , playerSchema);