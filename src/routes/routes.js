const UserRouter=require('../routes/users.route')
function routes(app) {
    
    app.use('/api', UserRouter)


   
};
module.exports= routes