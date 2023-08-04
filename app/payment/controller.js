const Payment = require('./model');
const Bank = require('../bank/model');

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            const payment = await Payment.find()
            .populate('Banks');

            res.render('admin/payment/view_payment', {
                payment,
                alert,
                name: req.session.user.name,
                title: 'Payment'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    },

    viewCreate: async(req, res) => {
        try {
            const banks = await Bank.find()
            res.render('admin/payment/create', {
                banks,
                name: req.session.user.name,
                title: 'Payment'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
        }
    },
    
    actionCreate: async(req, res) => {
        try {
            const {type , Banks} = req.body

            let payment = await Payment({type , Banks})

            await payment.save();
            req.flash('alertMessage',"Payment Berhasil di Tambahkan")
            req.flash('alertStatus',"success")
            res.redirect('/payment');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)     
           }
    },

    viewEdit: async(req, res) => {
        try {
            const {id} = req.params
            const banks = await Bank.find()
            const payment = await Payment.findOne({_id: id})
            res.render('admin/payment/edit', {
                banks,
                payment,
                name: req.session.user.name,
                title: 'Payment'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)      
          }
    },

    ActionEdit: async(req, res) => {
        try {
            const {id} = req.params
            const {type , status , Banks } = req.body
            req.flash('alertMessage',"Payment Berhasil di Edit")
            req.flash('alertStatus',"success")

            const payment = await Payment.findOneAndUpdate({_id: id},{type , status , Banks})
            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)      
          }
    },

    deletePayment: async(req, res) => {
        try {
            const {id} = req.params
            const payment = await Payment.findOneAndDelete({_id: id})
            req.flash('alertMessage',"Payment Berhasil di Hapus")
            req.flash('alertStatus',"success")

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/payment')
            console.log(err)
                }
    },

    

    
}