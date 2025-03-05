import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import EventForm from "./EventForm";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

const CreateEventDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
    }
    router.refresh()
  };
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <Link href="/events?create=true">
      <Button className="cursor-pointer">
        <DrawerTrigger className="cursor-pointer">Create Event</DrawerTrigger>
      </Button>
      </Link>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create Your New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm
        setIsOpen={setIsOpen}
          onSubmitForm={() => {
            handleClose();
          }}
        />
        <DrawerFooter className="px-6">
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateEventDrawer;
