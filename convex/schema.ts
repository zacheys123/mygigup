import { defineSchema } from "convex/server";
import { usersTable } from "../convex/models/user";
import { gigsTable } from "./models/gigs";
import { videosTable } from "./models/videos";
import { subscriptions } from "./models/subscriptions";

// @snippet start schema
export default defineSchema({
  users: usersTable,
  gigs: gigsTable,
  videos: videosTable,
  subscriptions: subscriptions,
});
