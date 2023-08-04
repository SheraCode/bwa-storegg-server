const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema ({
    historyVoucherTopup : {
        gameName : {type: String, require : (true,'Nama game harus diisi')},
        category : {type: String, require : (true,'Kategori game harus diisi')},
        thumbnail : {type: String},
        coinName : {type: String, require : (true,'Nama koin harus diisi')},
        coinQuantity : {type: String, require : (true,'coinQuantity game harus diisi')},
        price : {type: Number},
    },

    historyPayment : {
        name: {type: String, require: (true, 'Nama harus diisi')},
        type: {type: String, require: (true, 'Tipe pembayaran harus diisi')},
        bankName: {type: String, require: (true, 'Nama bank harus diisi')},
        noRekening: {type: String, require: (true, 'Nomor rekekning harus diisi')},

    },

    name : {
        type : String,
        require : [true, 'Nama Harus Diisi'],
        maxlength : [225, 'Panjang nama harus antara 3 - 225 karakter'],
        minlength : [3, 'Panjang nama harus antara 3 - 225 karakter'],
    },

    accountUser : {
        type : String,
        require : [true, 'Nama akun Harus Diisi'],
        maxlength : [225, 'Panjang nama akun harus antara 3 - 225 karakter'],
        minlength : [3, 'Panjang nama akun harus antara 3 - 225 karakter'],
    },

    tax : {
        type : Number,
        default : 0,
    },

    value : {
        type: Number,
        default : 0,
    },

    status : {
        type: String,
        enum : ['pending','success','failed'],
        default : 'pending'
    },

    player : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },

    historyUser : {
        name : {type: String, require : (true,'Nama player harus diisi')},
        phoneNumber : {
            type : Number,
            require : [true, 'Nomor telepon Harus Diisi'],
            maxlength : [13, 'Panjang nomor telepon harus antara 9 - 225 digit'],
            minlength : [9, 'Panjang nomor telepon harus antara 9 - 225 digit']
        }
    },

    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }

}, 

{timestamps: true}
)

module.exports = mongoose.model('Transaction' , transactionSchema);