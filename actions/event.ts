"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/Schema";
import { FormData } from "@/Types";

export const createEvent = async (data: FormData) => {
  try {
    const { userId } = await auth();

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

    const event = await prisma.event.create({
      ...validatedData,
      userId: user.id,
    });

    return event;
  } catch (error) {
    throw new Error(`Error in creating event ${error}`);
  }
};
