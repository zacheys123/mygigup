/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as controllers_user from "../controllers/user.js";
import type * as models_gigs from "../models/gigs.js";
import type * as models_subscriptions from "../models/subscriptions.js";
import type * as models_user from "../models/user.js";
import type * as models_videos from "../models/videos.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "controllers/user": typeof controllers_user;
  "models/gigs": typeof models_gigs;
  "models/subscriptions": typeof models_subscriptions;
  "models/user": typeof models_user;
  "models/videos": typeof models_videos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
