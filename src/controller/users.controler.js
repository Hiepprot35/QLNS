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
        // console.log(img)
        try {
            const hhexString = img && img.map(byte => byte.toString(16).padStart(2, '0')).join('');
            const dataFinal = { ...data2, Image: hhexString }
            const result = await User.CreateUserModel(dataFinal);
            if (result.affectedRows > 0) {
                const loginInfo = { "Username": result.insertId, "Password": req.body.CCCD, "Role": 2 }
                await User.CreateLoginModel(loginInfo);

                res.send({ message: "Thêm thành công" });
            }
        } catch (error) {
            console.log(error)
            res.send({ message: "Thêm thất bại" })
        }
    }
    async createCaLamViec(req, res, next) {
        console.log(req.body)
        try {
            await User.addCaLamViecModel(req.body);

            res.status(200).send({ message: "Thêm thành công" });
        } catch (error) {
            console.log(error)
            res.send({ message: 'Thêm thất bại' })
        }
    }
    async getUserByID(req, res, next) {
        try {

            const result = await User.getUserByIDModel(req.params.MaNV);
            res.status(200).send(result);
        } catch (error) {
            console.log(error)
            res.status(404).send({ message: 'That bai' })
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

    async createDanhGiaNhanVien(req, res, next) {
        try {
            const userID = await User.getUserByIDModel(req.body.MaNhanVien)
            if (userID) {
                const result = await User.createDanhGiaNhanVienModel(req.body);
                res.status(200).send({ message: "Thêm đánh giá thành công" });

            }
            else {
                res.status(200).send({ message: "Mã nhân viên không tồn tại " });

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'Thêm thất bại' });
        }
    }

    async createThemDonNghi(req, res, next) {
        try {

            const result = await User.createThemDonNghiModel(req.body);
            res.status(200).send({ message: "Thêm đơn nghỉ thành công" });
        } catch (error) {
            console.log(error)
            res.send({ message: 'Thêm thất bại' })
        }
    }
    async getAllHopDong(req, res, next) {
        try {
            const result = await User.getAllHopDongModel()
            res.send(result)
        } catch (error) {
            res.send({ message: 'Thất bại' })

        }
    }
    async getHopDongByIDUser(req, res, next) {
        try {
            const HopDong = await User.getHopDongByIDUserModel(req.params.MaNV)
            res.send(HopDong)
        } catch (error) {
            res.send({ message: 'Thất bại' })

        }
    }
    async createHopDong(req, res, next) {
        try {
            const userID = await User.getUserByIDModel(req.body.MaNhanVien)
            const HopDong = await User.getHopDongByIDUserModel(req.body.MaNhanVien)
            if (userID) {
                if (!HopDong) {
                    const result = await User.createHopDongModel(req.body);
                    res.status(200).send({ message: "Thêm hợp đồng thành công" });                }
                else {
                    res.status(200).send({ message: "Nhân viên đã có hợp đồng" });    }}
            else {
                res.status(200).send({ message: "Mã nhân viên không tồn tại " });        }
        } catch (error) {
            res.status(500).send({ message: 'Thêm thất bại' });    }
    }
    async getCalamViecIDController(req, res, next) {
        try {
            const result = await User.getCaLamViecByIDModel(req.params.CaID)
            res.send(result)
        } catch (error) {
            res.send({ message: "thất bại" })
        }
    }
    async ChangeUser(req, res, next) {
        const data2 = req.body;
        const img = req.body.Image.data;
        try {
            const hhexString = img && img.map(byte => byte.toString(16).padStart(2, '0')).join('');
            const dataFinal = { ...data2, Image: hhexString }
            const result = await User.ChangeUserModel(dataFinal);
            res.send({ message: `Thành công. Thay đổi thông tin người dùng ${data2.MaNhanVien} thành công` });
        } catch (error) {
            console.log(error)
            res.send({ message: `Thất bại. Thay đổi thông tin người dùng ${data2.MaNhanVien} thất bại` })
        }
    }
    async ChangeHopDong(req, res, next) {
        const data2 = req.body;
        console.log(data2)
        try {
            const result = await User.ChangeHopDongModel(data2);
            console.log(result)
            res.send({ message: `Thành công. Thay đổi thông tin hợp đồng người dùng ${data2.MaNhanVien} thành công` });
        } catch (error) {
            console.log(error)
            res.send({ message: `Thất bại. Thay đổi thông tin hợp đồng người dùng ${data2.MaNhanVien} thất bại` })
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
            res.send({ message: "Sai tài khoản hoặc mật khẩu" })
        }
    }
    async checkLogined(req, res, next) {
        const token = req.body.token
        const jwt = require('jsonwebtoken');
        try {
            const decodedToken = jwt.verify(token, process.env.APP_Secret_token);
            if (decodedToken.exp < Date.now() / 1000) {
                res.send({ message: "Sai rôi bạn ơi" })
            } else {
                res.status(200).send(decodedToken)
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra token:', error.message);
        }

    }
}
module.exports = new UserController()
