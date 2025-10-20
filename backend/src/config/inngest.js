import { Inngest } from "inngest";
import User from "../models/user.model.js";
import connectDB from "./db.js";
import { upsertStreamUser, deleteStreamUser } from "./stream.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("RUNNING INNGEST FROM:", __dirname);

// Create a client to send and receive events
export const inngest = new Inngest({ id: "OrbitChat" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, first_name, last_name, profile_image_url, email_addresses } =
      event.data;

    const newUser = {
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
      image: profile_image_url,
    };

    await User.create(newUser);
    upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.image,
    });
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    try {
      await connectDB();
      const { id } = event.data;

      await User.deleteOne({ clerkId: id });
      await deleteStreamUser(id.toString());
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Re-throw to let Inngest handle retry logic
    }
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUser];
