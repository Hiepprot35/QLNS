const User = require('../model/users.model')
const jwt = require('jsonwebtoken');

// Đảm bảo rằng bạn đã đặt async cho route handler
class UserController {



    async getAllUser(req, res, next) {
        try {
            const result = await User.getAllUserModel();
            res.send(result);
        } catch (error) {
            res.json(`Internal Server Error: ${error.message}`);
        }
    }
    async createUser(req, res, next) {
        const data2 = req.body;
        const img = req.body.Image.data;
        const loginInfo = { "Username": req.body.CCCD, "Password": req.body.CCCD, "Role": 2 }
        // console.log(img)
        try {
            const hhexString = img && img.map(byte => byte.toString(16).padStart(2, '0')).join('');
            const dataFinal = { ...data2, Image: hhexString }
            await User.CreateUserModel(dataFinal);
            await User.CreateLoginModel(loginInfo);

            res.send({message:"Thêm thành công"});
        } catch (error) {
            console.log(error)
            res.send({message:"Thêm thất bại"})
        }
    }
    async createCaLamViec(req,res,next)
    {
        console.log(req.body)
        try {
             await User.addCaLamViecModel(req.body);

            res.status(200).send({message:"Thêm thành công"});
        } catch (error) {
            console.log(error)
            res.send({message:'Thêm thất bại'})
        }
    }
    async getUserByID(req, res, next) {
        try {

            const result = await User.getUserByIDModel(req.params.MaNV);
            res.send(result);
        } catch (error) {
            console.log(error)
            res.send('That bai')
        }
    }
    async getAllCaLamViec(req, res, next) {
        try {

            const result = await User.getCaLamViecModel();
            res.send(result);
        } catch (error) {
            console.log(error)
            res.send('That bai')
        }
    }

    async createDanhGiaNhanVien(req,res,next)
    {
        try {

            const result = await User.createDanhGiaNhanVienModel(req.body);
            res.status(200).send({message:"Thêm đánh giá thành công"});
        } catch (error) {
            console.log(error)
            res.send({message:'Thêm thất bại'})
        }
    }
    async createThemDonNghi(req,res,next)
    {
        try {

            const result = await User.createThemDonNghiModel(req.body);
            res.status(200).send({message:"Thêm đơn nghỉ thành công"});
        } catch (error) {
            console.log(error)
            res.send({message:'Thêm thất bại'})
        }
    }
    async getCalamViecIDController(req,res,next)
    {
        try {
            const result=await User.getCaLamViecByIDModel(req.params.CaID)
            res.send(result)
        } catch (error) {
            res.send({message:"thất bại"})
        }
    }
    async ChangeUser(req, res, next) {
        const data2 = req.body;
        const img = req.body.Image.data;
        try {
            const hhexString = img && img.map(byte => byte.toString(16).padStart(2, '0')).join('');
            const dataFinal = { ...data2, Image: hhexString }
            const result = await User.ChangeUserModel(dataFinal);
            res.send("Thanh cong");
        } catch (error) {
            console.log(error)
            res.send('That bai')
        }
    }
    
    async loginAPI(req, res, next) {
        const user = {
            Username: req.body.Username,
            Password: req.body.Password
        };

        try {
            const result = await User.findLogin(user);
            if (!result) {
                return res.status(401).json({ error: true, message: "Không tìm thấy tài khoản hoặc mật khẩu không đúng." });
            }

            else {

                const Token = jwt.sign({ Username: result.username, Role: result.Role }, process.env.APP_Secret_token, { expiresIn: '10d' })
                res.status(200).send({ "Username": result.Username, "Role": result.Role, "Token": Token });

            }
        } catch (error) {
            console.error(error);
            res.send({message:"Sai tài khoản hoặc mật khẩu"})
        }
    }
    async checkLogined(req, res, next) {
        const token = req.body.token
        const jwt = require('jsonwebtoken');

        // Thay thế bằng token thực tế và khoá bí mật (secret key)
        

        try {
            // Giải mã token
            const decodedToken = jwt.verify(token, process.env.APP_Secret_token);

            // Kiểm tra thời gian hết hạn (nếu cần)
            if (decodedToken.exp < Date.now() / 1000) {
                res.send({message:"Sai rôi bạn ơi"})
            } else {
                res.status(200).send(decodedToken)
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra token:', error.message);
        }

    }
}
module.exports = new UserController()
