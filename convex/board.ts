import { v } from "convex/values";
import { mutation } from "./_generated/server";

/* create array of images */
const images = [
    "/placeholders/Sample 13.svg",
    "/placeholders/Sample 19.svg",
    "/placeholders/Sample 24.svg",
    "/placeholders/Sample 34.svg",
    "/placeholders/Sample 35.svg",
    "/placeholders/Sample 42.svg",
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
    },
});

/* the functionality to delete boards */
export const remove = mutation({
    args: {id: v.id("boards") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // TODO: Check to delete favorite relation

        await ctx.db.delete(args.id);
    },
});

/* the functionality to update boards */
export const update = mutation({
    args: {id: v.id("boards"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return board;
    },
});