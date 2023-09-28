const { dbconnection } = require('../config/dbconfig');

class User {
   async getAllUserModel() {
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query('SELECT * FROM users', (err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    }

    );
    return result;
  }
  async addCaLamViecModel(data)
  {

    const query=`INSERT into calamviec  SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result; 
  }
  async getCaLamViecModel()
  {

    const query=`select * from calamviec`
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result; 
  }
  async CreateUserModel(data) {
    const bufferImg=data.Image;
    const binaryImg=Buffer.from(bufferImg, 'hex');
    const query=`INSERT INTO users SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query, {...data,Image:binaryImg},(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
  async createDanhGiaNhanVienModel(data)
  {
    const query=`INSERT INTO danhgia SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query, data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
  async getHopDongByIDUserModel(data)
  {

    const query =`SELECT * FROM HopDong where MaNhanVien= ?`
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result[0];
  }
  async getDanhGiaByIDUserModel(data)
  {

    const query =`SELECT * FROM danhgia where MaNhanVien= ?`
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result[0];
  }
  async getCaLamViecByIDModel(data)
  {

    const query =`SELECT * FROM calmaviec where CaID= ?`
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result[0];
  }
  async CreateLoginModel(data) {
    const query=`INSERT INTO login SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query, data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
  async getUserByIDModel(data)
  {

    const query =`SELECT * FROM users where MaNhanVien= ?`
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result[0];
  }
  
  async ChangeUserModel(data) {
    const bufferImg=data.Image;
    const binaryImg=Buffer.from(bufferImg, 'hex');
    const query=`UPDATE users SET ? WHERE MaNhanVien = ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query,[ {...data,Image:binaryImg},data.MaNhanVien],(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
  async findLogin(data)  {
    const userInfo=await new Promise(function (resolve, reject) {

        dbconnection.query('Select * from login where Username  = ? and Password= ? ', [data.Username,data.Password], (err, result) => {
            
            if (result)
            {
                
                resolve(result)
            } 
            else
            {

                reject(err)
            }

        }
        )
    })
    return userInfo[0]
}
  async createThemDonNghiModel(data)
  {
    const query=`INSERT INTO donnghi SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query, data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
   async createHopDongModel(data)
  {
    const query=`INSERT INTO hopdong SET ? `
    const result = await new Promise(function (resolve, reject) {
      dbconnection.query(query, data,(err, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
    return result;
  }
}

module.exports= new User();
