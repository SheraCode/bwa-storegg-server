const config = require('../../config');
const jwt = require('jsonwebtoken')

const Player = require('../player/model')
module.exports = {
   isLoginAdmin: (req, res , next) => {
    if(req.session.user === null || req.session.user === undefined) {
        req.flash('alertMessage', 'Mohon Maaf Sesi Anda Telah Habis, Silahkan Login Kembali')
        req.flash('alertStatus','danger')
        res.redirect('/')

    } else {
        next()
    }
   },

   isLoginPlayer : async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
      if (!token) {
        throw new Error('Token tidak ditemukan');
      }
  
      console.log('Token:', token);
  
      const data = jwt.verify(token, config.jwtKey);
      console.log('Data Token:', data);
  
      const player = await Player.findOne({ _id: data.player.id });
  
      console.log('Data Player:', player);
  
      if (!player) {
        throw new Error('Player tidak ditemukan');
      }
  
      req.player = player;
      req.token = token;
      next();
    } catch (err) {
      console.error('Error:', err.message);
      res.status(401).json({
        error: 'Tidak Diizinkan untuk Mengakses Hasil Ini'
      });
    }
  }
  
   
}