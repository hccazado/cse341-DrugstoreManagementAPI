const controller = {
    login: async (req, res, next)=>{
    },
    logout: async (req, res, next)=>{
        req.logout(function(err){
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
}

module.exports = controller;