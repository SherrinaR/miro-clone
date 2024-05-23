import { v } from "convex/values";
import { mutation } from "./_generated/server";

/* create array of images */
const images = [
    "/placehonders/Sample 13.svg",
    "/placehonders/Sample 19.svg",
    "/placehonders/Sample 24.svg",
    "/placehonders/Sample 34.svg",
    "/placehonders/Sample 35.svg",
    "/placehonders/Sample 42.svg",
]

/* create an API route to create boards */
export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });
        return board;
    }
})