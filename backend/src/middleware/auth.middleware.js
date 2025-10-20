
const protectRoute = (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
export { protectRoute };