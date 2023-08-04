const User = require('./model')
const bcrypt = require('bcryptjs')
module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            if(req.session.user === null || req.session.user === undefined) {            
                res.render('admin/users/view_signin', {
                    alert,
                     title: 'SignIn'
                })
            } else {
                res.redirect('/dashboard')
            }

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/')
            console.log(err)
        }
    },

    
    actionSignin : async (req, res) => {
      try {
        const { email, password } = req.body;
        const check = await User.findOne({ email: email });
    
        if (check) {
          if (check.status === 'Y') {
            const checkPassword = await bcrypt.compare(password, check.password);
            if (checkPassword) {
                req.session.user = {
                    id: check._id,
                    email : check.email,
                    status : check.status,
                    name : check.name
                }
              res.redirect('/dashboard');
            } else {
              req.flash('alertMessage', 'Mohon Maaf Password Anda Salah');
              req.flash('alertStatus', 'danger');
              res.redirect('/');
            }
          } else {
            req.flash('alertMessage', 'Mohon Maaf Status Anda Belum Aktif');
            req.flash('alertStatus', 'danger');
            res.redirect('/');
          }
        } else {
          req.flash('alertMessage', 'Email yang anda inputkan salah');
          req.flash('alertStatus', 'danger');
          res.redirect('/');
        }
      } catch (err) {
        req.flash('alertMessage', 'Terjadi kesalahan saat mencari akun.');
        req.flash('alertStatus', 'danger');
        res.redirect('/');
        console.log(err);
      }
    },
    
    actionLogout : async(req,res) => {
        req.session.destroy();
        res.redirect('/')
    }

    // viewCreate: async(req, res) => {
    //     try {
    //         res.render('admin/category/create')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus','danger')
    //         res.redirect('/category')
    //         console.log(err)
    //     }
    // },
    
    // actionCreate: async(req, res) => {
    //     try {
    //         const {name} = req.body

    //         let category = await Category({name})

    //         await category.save();
    //         req.flash('alertMessage',"Kategori Berhasil di Tambahkan")
    //         req.flash('alertStatus',"success")
    //         res.redirect('/category');
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus','danger')
    //         res.redirect('/category')
    //         console.log(err)     
    //        }
    // },

    // viewEdit: async(req, res) => {
    //     try {
    //         const {id} = req.params
    //         const category = await Category.findOne({_id: id})
    //         res.render('admin/category/edit', {
    //             category
    //         })
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus','danger')
    //         res.redirect('/category')
    //         console.log(err)      
    //       }
    // },

    // ActionEdit: async(req, res) => {
    //     try {
    //         const {id} = req.params
    //         const {name} = req.body
    //         req.flash('alertMessage',"Kategori Berhasil di Edit")
    //         req.flash('alertStatus',"success")

    //         const category = await Category.findOneAndUpdate({_id: id},{name})
    //         res.redirect('/category')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus','danger')
    //         res.redirect('/category')
    //         console.log(err)      
    //       }
    // },

    // deleteCategory: async(req, res) => {
    //     try {
    //         const {id} = req.params
    //         const category = await Category.findOneAndDelete({_id: id})
    //         req.flash('alertMessage',"Kategori Berhasil di Hapus")
    //         req.flash('alertStatus',"success")

    //         res.redirect('/category')
    //     } catch (err) {
    //         req.flash('alertMessage', `${err.message}`)
    //         req.flash('alertStatus','danger')
    //         res.redirect('/category')
    //         console.log(err)
    //             }
    // },

    

    
}