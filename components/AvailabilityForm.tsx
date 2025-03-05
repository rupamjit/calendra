"use client";

import { days, timeSlots } from "@/app/(main)/availability/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { z } from "zod";
import { availabilitySchema } from "@/Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { updateAvailability } from "@/actions/availability";
import { useState } from "react";

const AvailabilityForm = ({ initialDatas }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialDatas },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await updateAvailability(data);
      console.log(data)
      console.log("updated");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {days.map((day, index) => {
        const isAvailable = watch(`${day}.isAvailable`);
        return (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <Controller
              control={control}
              name={`${day}.isAvailable`}
              render={({ field }) => (
                <Checkbox
                  className="h-6 w-6 cursor-pointer"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked as boolean);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />
            <span className="text-lg font-bold">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>

            {isAvailable && (
              <>
                <Controller
                  control={control}
                  name={`${day}.startTime`}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time, index) => (
                          <SelectItem
                            className="cursor-pointer"
                            key={index}
                            value={time}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </>
            )}

            {isAvailable ? <span className="text-lg">to</span> : null}

            {isAvailable && (
              <>
                <Controller
                  name={`${day}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select End Time" />
                      </SelectTrigger>

                      <SelectContent>
                        {timeSlots.map((time, index) => (
                          <SelectItem
                            className="cursor-pointer"
                            value={time}
                            key={index}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-3">
        <span className="text-ls">
          Minimum Gap between two bookings (minutes):
        </span>

        <Input
          type="number"
          {...register("timeGap", { valueAsNumber: true })}
          className="w-32"
        />
        {errors.timeGap && (
          <span className="text-red-500 text-sm">{errors.timeGap.message}</span>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading ..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default AvailabilityForm;
