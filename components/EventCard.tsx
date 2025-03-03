"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/Types";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, Trash2 } from "lucide-react";

const EventCard = ({ event, userName }: { event: Event; userName: string }) => {
    
    const [isCopied,setIsCopied] = useState(false)


    const handleCopy = async () =>{
        try {
            await navigator.clipboard.writeText(`${window.location.href}/${userName}/${event.id}`)
            setIsCopied(true)
            setTimeout(()=>{
                setIsCopied(false)
            },2000)
        } catch (error) {
            console.log(`Failed to copy the url ${error}`)
        }
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{event.title}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-2">
            <p>{event.duration} mins</p>
            <span>|</span>
            <p>{event.isPrivate ? "Private" : "Public"}</p>
          </div>
          <div>{event._count?.bookings} bookings</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      <CardFooter className="flex justify-start gap-3">
        <Button
        onClick={handleCopy}
          className="cursor-pointer flex items-center gap-1"
          variant={"outline"}
        >
          <Link size={16} /> {isCopied?"Copied!!!":"Copy Link"}
        </Button>
        <Button
          className="cursor-pointer flex items-center gap-1"
          variant={"destructive"}
        >
          <Trash2 size={16} /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
