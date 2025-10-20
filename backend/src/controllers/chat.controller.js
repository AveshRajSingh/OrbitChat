import { generateStreamToken } from "../config/stream.js";


export const getStreamToken = async (req, res) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const token = generateStreamToken(userId);
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error generating stream token:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};