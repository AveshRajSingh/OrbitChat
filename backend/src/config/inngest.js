import { Inngest } from "inngest";
import User from "../models/user.model.js";
import connectDB from "./db";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "OrbitChat" });

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event :"clerk/user.created"},
    async ({event}) => {
        await connectDB();
        const {id, first_name , last_name , profile_image_url, email_addresses} = event.data;

        const newUser = {
            clerkId: id,
            name: `${first_name || ""} ${last_name || ""}`,
            email: email_addresses[0]?.email_address,
            image: profile_image_url
        }

        await User.create(newUser);
    }

)

const deleteUser = inngest.createFunction(
    {id : "delete-user"},
    {event :"clerk/user.deleted"},
    async ({event}) => {
        await connectDB();
        const {id} = event.data;

        await User.deleteOne({clerkId: id});
    }

)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUser];