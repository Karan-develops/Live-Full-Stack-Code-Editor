import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated!");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), userIdentity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }

    const snippetID = await ctx.db.insert("snippets", {
      userId: userIdentity.subject,
      userName: user.name,
      title: args.title,
      language: args.language,
      code: args.code,
    });
    return snippetID;
  },
});

export const getSnippets = query({
  handler: async (ctx, args) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

export const isSnippedStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      return false;
    }
    const star = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), userIdentity.subject) &&
          q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return !!star;
  },
});

export const getStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return stars.length;
  },
});

export const deleteSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated");
    }
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) {
      throw new Error("Snippet not found!");
    }
    if (snippet.userId !== userIdentity.subject) {
      throw new Error("Not authorized to delete this snippet!");
    }
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();
    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();
    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  },
});

export const starSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated!");
    }
    const alreadyStarred = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("snippetId"), args.snippetId) &&
          q.eq(q.field("userId"), userIdentity.subject)
      )
      .first();

    if (alreadyStarred) {
      await ctx.db.delete(alreadyStarred._id);
    } else {
      await ctx.db.insert("stars", {
        userId: userIdentity.subject,
        snippetId: args.snippetId,
      });
    }
  },
});

export const getSnippetByID = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) {
      throw new Error("No Snippet Found.");
    }
    return snippet;
  },
});

export const getComments = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const addComment = mutation({
  args: {
    snippetId: v.id("snippets"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), userIdentity.subject))
      .first();
    if (!user) {
      throw new Error("User not found");
    }
    return await ctx.db.insert("snippetComments", {
      snippetId: args.snippetId,
      userId: userIdentity.subject,
      userName: user.name,
      content: args.content,
    });
  },
});

export const deleteComment = mutation({
  args: {
    commentId: v.id("snippetComments"),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not authenticated");
    }
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("No Comment found");
    }
    if (comment.userId !== userIdentity.subject) {
      throw new Error("UnAuthorized to delete the comment");
    }
    await ctx.db.delete(args.commentId);
  },
});
