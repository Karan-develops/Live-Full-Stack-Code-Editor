import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const saveExecution = mutation({
  args: {
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // checking user auth
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new ConvexError("Not Authenticated");
    }
    // check user is pro?
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), userIdentity.subject))
      .first();

    if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError(
        "Pro subscription is required to use this language"
      );
    }
    ctx.db.insert("codeExecutions", {
      ...args,
      userId: userIdentity.subject,
    });
  },
});

export const getUserCodeExecutions = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("codeExecutions")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

export const getUserProfileStats = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const executions = await ctx.db
      .query("codeExecutions")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const starredSnippets = await ctx.db
      .query("stars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    const snippetIds = starredSnippets.map((star) => star.snippetId);
    const snippetDetails = await Promise.all(
      snippetIds.map((id) => ctx.db.get(id))
    );

    const starredLanguages = snippetDetails.filter(Boolean).reduce(
      (acc, curr) => {
        if (curr?.language) {
          acc[curr.language] = (acc[curr.language] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    const mostStarredLanguage =
      Object.entries(starredLanguages).sort(([, a], [, b]) => b - a)[0]?.[0] ??
      "N/A";

    const last24Hours = executions.filter(
      (e) => e._creationTime > Date.now() - 24 * 60 * 60 * 1000
    ).length;

    const languageStats = executions.reduce(
      (acc, curr) => {
        acc[curr.language] = (acc[curr.language] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const languages = Object.keys(languageStats);
    const favoriteLanguage = languages.length
      ? languages.reduce((a, b) =>
          languageStats[a] > languageStats[b] ? a : b
        )
      : "N/A";

    return {
      totalExecutions: executions.length,
      languagesCount: languages.length,
      languages: languages,
      last24Hours,
      favoriteLanguage,
      languageStats,
      mostStarredLanguage,
    };
  },
});
