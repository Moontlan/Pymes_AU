// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        {children}
      </LoadScript>
    </NextUIProvider>
  )
}