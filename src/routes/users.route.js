const express = require('express');
const UserRouter = express.Router();
const multer = require('multer');
const upload=multer()
const UserController = require('../controller/users.controler');
UserRouter.get('/getAllUser', UserController.getAllUser)
UserRouter.get('/getUserByMaNV/:MaNV', UserController.getUserByID)
UserRouter.post('/changeUser',upload.single('image'),UserController.ChangeUser)
UserRouter.post('/login',UserController.loginAPI)
UserRouter.post('/createUser',upload.single('image'),UserController.createUser)
UserRouter.post('/createCalamviec',UserController.createCaLamViec)


UserRouter.get('/getAllCalamviec',UserController.getAllCaLamViec)
UserRouter.post('/calamviec/:CaID',UserController.getAllCaLamViec)

UserRouter.post('/themdanhgia',UserController.createDanhGiaNhanVien)
UserRouter.post('/themdonnghi',UserController.createThemDonNghi)
UserRouter.post('/themhopdong',UserController.createHopDong)

module.exports = UserRouter;