"use server";

import { days } from "@/app/(main)/availability/data";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getUserAvailability = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        avalaibility: {
          include: {
            days: true,
          },
        },
      },
    });
    if (!user) {
      throw new Error("User Not Found");
    }

    if (!user.avalaibility) {
      return null;
    }

    const availabilityData = { timeGap: user.avalaibility.timeGap };

    days.forEach((day) => {
      const dayAvailability = user.avalaibility?.days.find(
        (d) => d.day === day.toUpperCase()
      );

      availabilityData[day] = {
        isAvailable: !!dayAvailability,
        startTime: dayAvailability
          ? dayAvailability.startTime.toISOString().slice(11, 16)
          : "09:00",
        endTime: dayAvailability
          ? dayAvailability.endTime.toISOString().slice(11, 16)
          : "17:00",
      };
    });

    return availabilityData;
  } catch (error) {
    throw new Error(`Error in user availability ${error}`);
  }
};

export const updateAvailability = async (data) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        avalaibility: true,
      },
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    const availabilityData = Object.entries(data).flatMap(
      ([day, { isAvailable, startTime, endTime }]) => {
        if (isAvailable) {
          const baseDate = new Date().toISOString().split("T")[0];

          return [
            {
              day: day.toUpperCase(),
              startTime: new Date(`${baseDate}T${startTime}:00Z`),
              endTime: new Date(`${baseDate}T${endTime}:00Z`),
            },
          ];
        }
        return [];
      }
    );

    if (user.avalaibility) {
      await prisma.avalaibility.update({
        where: { id: user.avalaibility.id },
        data: {
          timeGap: data.timeGap,
          days: {
            deleteMany: {},
            create: availabilityData,
          },
        },
      });
    } else {
      await prisma.avalaibility.create({
        data: {
          userId: user.id,
          timeGap: data.timeGap,
          days: {
            create: availabilityData,
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    throw new Error(`Error in updating availability: ${error}`);
  }
};
