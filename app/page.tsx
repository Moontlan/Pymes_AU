"use client";
import Image from 'next/image'
import { Providers } from "./redux/provider"
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    window.onload = () => {
      // El código dentro de esta función se ejecutará después de que la página se haya cargado completamente
      router.push("/Login");
    };
  }, []);
  return (
    <Providers>
       {/* <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        
      </LoadScript> */}
    </Providers>
  )
}
