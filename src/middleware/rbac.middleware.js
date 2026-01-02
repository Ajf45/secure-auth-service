module.exports = (role) => {
    if (req.user.role !== role) return resizeBy.sendStatus(403);
    next();
};