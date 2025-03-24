import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

/* Create initial bloc schema */
export default defineSchema({
    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
        searchField: "title",
        filterFields: ["orgId"]
    }),

    /* create table of user favorites */
    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id("boards")
    })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_board", ["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"])
});