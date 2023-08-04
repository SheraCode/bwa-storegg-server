const Category = require('./model');
module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            const category = await Category.find()
            res.render('admin/category/view_category', {
                category,
                alert,
                name: req.session.user.name,
                title: 'Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)
        }
    },

    viewCreate: async(req, res) => {
        try {
            res.render('admin/category/create', {
                
                name: req.session.user.name,
                title: 'Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)
        }
    },
    
    actionCreate: async(req, res) => {
        try {
            const {name} = req.body

            let category = await Category({name})

            await category.save();
            req.flash('alertMessage',"Kategori Berhasil di Tambahkan")
            req.flash('alertStatus',"success")
            res.redirect('/category');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)     
           }
    },

    viewEdit: async(req, res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})
            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)      
          }
    },

    ActionEdit: async(req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body
            req.flash('alertMessage',"Kategori Berhasil di Edit")
            req.flash('alertStatus',"success")

            const category = await Category.findOneAndUpdate({_id: id},{name})
            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)      
          }
    },

    deleteCategory: async(req, res) => {
        try {
            const {id} = req.params
            const category = await Category.findOneAndDelete({_id: id})
            req.flash('alertMessage',"Kategori Berhasil di Hapus")
            req.flash('alertStatus',"success")

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/category')
            console.log(err)
                }
    },

    

    
}