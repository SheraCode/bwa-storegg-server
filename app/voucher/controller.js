const Voucher = require('./model');
const Category = require('../category/model');
const Nominal = require('../nominal/model');
const path = require('path');
const fs = require('fs');
const config = require('../../config');

module.exports = {
    index: async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = {
                message: alertMessage, 
                status: alertStatus
            }
            const voucher = await Voucher.find()
            .populate('category')
            .populate('nominals')
            console.log(voucher)
            res.render('admin/voucher/view_voucher', {
                voucher,
                alert,
                name: req.session.user.name,
                title: 'Voucher'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err)
        }
    },

    viewCreate: async(req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            res.render('admin/voucher/create' , {
                category,
                nominal,
                name: req.session.user.name,
                title: 'Voucher'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err)
        }
    },
    
    actionCreate: async(req, res) => {
        try {
        const {name , category  , nominals} = req.body

            if(req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);

                src.pipe(dest)

                src.on('end', async ()=> {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnial: filename
                        })

                        await voucher.save();
                        req.flash('alertMessage',"Voucher Berhasil di Tambahkan")
                        req.flash('alertStatus',"success")
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`)
                        req.flash('alertStatus','danger')
                        res.redirect('/voucher')
                        console.log(err) 
                    }
                })
            } else {
                
                const voucher = new Voucher({
                    name,
                    category,
                    nominals
                })

                await voucher.save();
                req.flash('alertMessage',"Voucher Berhasil di Tambahkan")
                req.flash('alertStatus',"success")
                res.redirect('/voucher');
            }


        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err) 
           }
    },

    viewEdit: async(req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            const {id} = req.params
            const voucher = await Voucher.findOne({_id: id})
            .populate('category')
            .populate('nominals')
            res.render('admin/voucher/edit', {
                voucher,
                category,
                nominal,
                name: req.session.user.name,
                title: 'Voucher'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err)      
          }
    },    
    // ...
    
    ActionEdit: async (req, res) => {
        const { id } = req.params;
        const { name, category, nominals } = req.body;
    
        try {
            if (req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`);
    
                const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);
    
                src.pipe(dest);
    
                src.on('end', async () => {
                    try {
                        const voucher = await Voucher.findOne({ _id: id });
                        let currentImage = path.resolve(config.rootPath, `public/uploads/${voucher.thumbnial}`);
                        if (fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage);
                        }
    
                        await Voucher.findOneAndUpdate({
                            _id: id
                        }, {
                            name,
                            category,
                            nominals,
                            thumbnial: filename
                        });
    
                        // Tidak perlu melakukan voucher.save() karena sudah ada dalam Voucher.findOneAndUpdate()
                        req.flash('alertMessage', "Voucher Berhasil di Update");
                        req.flash('alertStatus', "success");
                        res.redirect('/voucher');
                    } catch (err) {
                        req.flash('alertMessage', `${err.message}`);
                        req.flash('alertStatus', 'danger');
                        res.redirect('/voucher');
                        console.log(err);
                    }
                });
            } else {
                await Voucher.findOneAndUpdate({
                    _id: id
                }, {
                    name,
                    category,
                    nominals
                });
    
                // Tidak perlu melakukan voucher.save() karena sudah ada dalam Voucher.findOneAndUpdate()
                req.flash('alertMessage', "Voucher Berhasil di Update");
                req.flash('alertStatus', "success");
                res.redirect('/voucher');
            }
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
            console.log(err);
        }
    },

    StatusDisabled: async(req, res) => {
        try {
            const {id} = req.params
            const status = 'N'
            req.flash('alertMessage',"Status Voucher Berhasil di Edit")
            req.flash('alertStatus',"success")

            const voucher = await Voucher.findOneAndUpdate({_id: id},{status})
            res.redirect('/voucher')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err)      
          }
    },

    StatusEnabled: async(req, res) => {
        try {
            const {id} = req.params
            const status = 'Y'
            req.flash('alertMessage',"Status Voucher Berhasil di Edit")
            req.flash('alertStatus',"success")

            const voucher = await Voucher.findOneAndUpdate({_id: id},{status})
            res.redirect('/voucher')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus','danger')
            res.redirect('/voucher')
            console.log(err)      
          }
    },
    
    
    deleteVoucher: async (req, res) => {
        try {
            const { id } = req.params;
    
            // Cari voucher sebelum dihapus untuk mendapatkan nama file gambar
            const voucher = await Voucher.findOne({ _id: id });
    
            // Hapus gambar dari direktori uploads jika ada
            if (voucher && voucher.thumbnial) {
                const imagePath = path.resolve(config.rootPath, `public/uploads/${voucher.thumbnial}`);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
    
            // Hapus voucher dari database
            await Voucher.findOneAndDelete({ _id: id });
    
            req.flash('alertMessage', "Voucher Berhasil di Hapus");
            req.flash('alertStatus', "success");
            res.redirect('/voucher');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/voucher');
            console.log(err);
        }
    },
    

    

    
}