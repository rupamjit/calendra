"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const checkUser = async () => {
  const user = await currentUser();
  //   console.log(user);

  const isExistingUser = await prisma?.user.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  if (isExistingUser) {
    return isExistingUser;
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: user?.id as string,
      email: user?.emailAddresses[0].emailAddress as string,
      userName: user?.firstName,
      imageUrl: user?.imageUrl,
      name: user?.firstName + " " + user?.lastName,
    },
  });
  return newUser;
  //   console.log(newUser);
};

export { checkUser };
