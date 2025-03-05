"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/Schema";
import { FormData } from "@/Types";

export const createEvent = async (data: FormData) => {
  try {
    const { userId } = await auth();
    // console.log(userId);
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

export const getUserEvents = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error(`Unauthorize User`);
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const events = await prisma.event.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });

    return { events, user };
  } catch (error) {
    throw new Error(`Error in fetching user's events ${error}`);
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized user");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!event || event.userId !== user.id) {
      throw new Error("Event not found or unauthorized");
    }

    await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    return {success:true}
  } catch (error) {
    throw new Error(`Error in deleting event ${error}`);
  }
};
