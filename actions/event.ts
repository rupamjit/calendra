"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/Schema";
import { FormData } from "@/Types";

export const createEvent = async (data: FormData) => {
  try {
    const { userId } = await auth();
    console.log(userId);
    if (!userId) {
      throw new Error("Unauthorized User");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const validatedData = eventSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error("Validation failed");
    }
    const { title, description, duration, isPrivate } = validatedData.data;
    console.log(title);
    const event = await prisma.event.create({
      data: {
        title,
        description,
        duration,
        isPrivate,
        userId: user.id,
      },
    });

    return event;
  } catch (error) {
    throw new Error(`Error in creating event ${error}`);
  }
};
