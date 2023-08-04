const mongoose = require('mongoose')
let bankSchema = mongoose.Schema ({
    name : {
        type : String,
        require : [true, 'Nama Pemilik Harus Diisi']
    },
    bankName : {
        type : String,
        require : [true, 'Nama Bank Pemilik Harus Diisi']
    },
    noRekening : {
        type : Number,
        require : [true, 'Nomor Rekening Bank Harus Diisi']
    }
}, 
{timestamps: true}
)

module.exports = mongoose.model('Bank' , bankSchema);