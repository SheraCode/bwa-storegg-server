const Transaction = require('./model');
module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            const transaction = await Transaction.find().populate('player')
            console.log("Transaction >")
            console.log(transaction);
            res.render('admin/transaction/view_transaction', {
                transaction,
                alert,
                name: req.session.user.name,
                title: 'Transaction'

            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/transaction')
            console.log(err)
        }
    },

    tolak : async(req, res) => {
        try {
            const {id} = req.params
            const status = 'failed'
            req.flash('alertMessage',"Transaksi di Tolak")
            req.flash('alertStatus',"success")

            const transaction = await Transaction.findOneAndUpdate({_id: id},{status})
            res.redirect('/transaction')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/transaction')
            console.log(err)      
          }
    },

    terima : async(req, res) => {
        try {
            const {id} = req.params
            const status = 'success'
            req.flash('alertMessage',"Transaksi di Terima")
            req.flash('alertStatus',"success")

            const transaction = await Transaction.findOneAndUpdate({_id: id},{status})
            res.redirect('/transaction')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/transaction')
            console.log(err)      
          }
    },


    

    
}