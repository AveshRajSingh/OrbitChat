import {StreamChat} from 'stream-chat';
import {ENV} from  "./env.js";


const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET_KEY);

export const upsertStreamUser = async (userData) => {
    try {
        const user = await streamClient.upsertUser(userData);
        return user;
    } catch (error) {
        console.error("Error upserting user:", error);
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId, { mark_messages_deleted: true });
        console.log(`User with ID ${userId} deleted from Stream.`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const generateStreamToken = (userId) => {
   try {
     const userIdstring = userId.toString();
     return streamClient.createToken(userIdstring);
     
   } catch (error) {
        console.error("Error generating stream token:", error);
        throw error;
   }
}