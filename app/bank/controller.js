const Bank = require('./model');
module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            const bank = await Bank.find()
            res.render('admin/bank/view_bank', {
                bank,
                alert,
               name: req.session.user.name,
                title: 'Bank'

            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    viewCreate: async(req, res) => {
        try {
            res.render('admin/bank/create' ,{
               name: req.session.user.name,
                title: 'Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
    
    actionCreate: async(req, res) => {
        try {
            const {name , nameBank , noRekening} = req.body

            let bank = await Bank({name , nameBank , noRekening})

            await bank.save();
            req.flash('alertMessage',"Bank Berhasil di Tambahkan")
            req.flash('alertStatus',"success")
            res.redirect('/bank');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)     
           }
    },

    viewEdit: async(req, res) => {
        try {
            const {id} = req.params
            const bank = await Bank.findOne({_id: id})
            res.render('admin/bank/edit', {
                bank,
                name: req.session.user.name,
                 title: 'Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)      
          }
    },

    ActionEdit: async(req, res) => {
        try {
            const {id} = req.params
            const {name , nameBank , noRekening} = req.body
            req.flash('alertMessage',"Bank Berhasil di Edit")
            req.flash('alertStatus',"success")

            const bank = await Bank.findOneAndUpdate({_id: id},{name , nameBank , noRekening})
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)      
          }
    },

    deleteBank: async(req, res) => {
        try {
            const {id} = req.params
            const bank = await Bank.findOneAndDelete({_id: id})
            req.flash('alertMessage',"Bank Berhasil di Hapus")
            req.flash('alertStatus',"success")
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    

    
}