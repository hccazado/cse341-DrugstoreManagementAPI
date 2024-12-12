const isAuthenticated = (req, res, next) => {
    if(req.session.user === undefined){
        return res.status(401).json("You are not logged in");
    }
    next();
}

const authorizeAdmin = (req, res, next) =>{
    if(req.session.user.accessLevel[0] != "admin"){
        return res.status(401).json("You do not have access");
    }
    next();
}

const authorizeStore = (req, res, next) =>{
    if(req.session.user.accessLevel[0] != "store" || req.session.user.accessLevel[0] != "admin"){
        return res.status(401).json("You do not have access");
    }
    next();
}

module.exports = {
    isAuthenticated,
    authorizeAdmin,
    authorizeStore
}