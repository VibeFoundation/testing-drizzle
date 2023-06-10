import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        post: true,
      },
    });
  }),
  getByAuthorId: protectedProcedure
    .input(z.object({ Id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { authorId: input.Id },
      });
    }),
  getByPostId: protectedProcedure
    .input(z.object({ Id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({ where: { postId: input.Id } });
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(3),
        postId: z.string(),
        authorId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          postId: input.postId,
          authorId: input.authorId,
        },
      });
    }),
});
