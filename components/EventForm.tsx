import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventSchema } from "@/Schema";
import { FormData } from "@/Types";
import { createEvent } from "@/actions/event";
import { useRouter, useSearchParams } from "next/navigation";

const EventForm = ({ setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(eventSchema) });

  const onsubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // console.log(data);
      setLoading(true);
      await createEvent(data);
      setLoading(false);
      if (searchParams.get("create") === "true") {
        router.replace(window?.location.pathname);
      }
      setIsOpen(false);
    } catch (error) {
      console.log(`Error in creating Event ${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="px-6 flex flex-col gap-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>

        <Input
          placeholder="Enter Your Title of Event"
          id="title"
          {...register("title")}
          className="mt-1"
        />

        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <Textarea
          {...register("description")}
          id="description"
          className="mt-1"
          placeholder="Enter description ..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration (minutes)
        </label>

        <Input
          placeholder="Enter duration in minutes"
          id="duration"
          {...register("duration", {
            valueAsNumber: true,
          })}
          type="number"
          className="mt-1"
        />

        {errors.duration && (
          <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-gray-700"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value === "true")}
              value={field.value ? "true" : "false"}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {errors.isPrivate && (
        <p className="text-red-500 text-xs mt-1">{errors.isPrivate.message}</p>
      )}
      <Button className="cursor-pointer" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Event"}
      </Button>
    </form>
  );
};

export default EventForm;
