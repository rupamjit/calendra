"use client";
import { getUserAvailability } from "@/actions/availability";
import AvailabilityForm from "@/components/AvailabilityForm";
import React, { useEffect, useState } from "react";
import { defaultData } from "./data";
import { AvailabilityData } from "@/Types";



const Availability = () => {
  const [data, setData] = useState<AvailabilityData | null>(null);

  useEffect(() => {
     const fetchUserAvailability = async () => {
      try {
        const userAvailability = await getUserAvailability();
        setData(userAvailability ?? defaultData); 
        console.log(userAvailability)
      } catch (error) {
        console.error("Error fetching user availability:", error);
        setData(defaultData); 
      }
    };

    fetchUserAvailability();
  }, []);

  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div>
      <AvailabilityForm initialDatas={data} />
    </div>
  );
};

export default Availability;


