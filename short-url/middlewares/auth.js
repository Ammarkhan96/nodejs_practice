const { getUser } = require("../service/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    console.log(req);
    // const userUid = req.cookies?.uid;
    const userUid = req.headers['authorization']

    if (!userUid) return res.redirect("/login")
    const token = userUid.split('Bearer ')[1] // "Bearer [23u12652787fgtd]"
    // const user = getUser(userUid)
    const user = getUser(token)

    if (!user) return res.redirect("/login")

    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    console.log(req.headers);
    // const userUid = req.cookies?.uid;
    const userUid = req.headers['authorization']
    const token = userUid.split('Bearer ')[1]

    // const user = getUser(userUid)
    const user = getUser(token)

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
}