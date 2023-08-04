const mongoose = require('mongoose')
let paymentSchema = mongoose.Schema ({
    type : {
        type : String,
        require : [true, 'Tipe Pembayaran Harus Diisi']
    },
    status : {
        type : String,
        enum : ['Y','N'],
        default : 'Y'
    },
    Banks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Bank'
    }]
}, {timestamps: true}
)

module.exports = mongoose.model('Payment' , paymentSchema);