"use client";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Link,
  ModalFooter,
} from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

interface User {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  estado: number;
  fechaActualizacion: Date;
}

interface Productor {
  latitud: number;
  longitud: number;
  puesto: string;
  idOrganizacion: number;
}

export default function Editar() {
  const router = useRouter();
  const valor = useSearchParams();
  const id = valor.get("id");
  const [mapCenter, setMapCenter] = useState(center);
  const [productor, setProductor] = useState(null);

  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [puesto, setPuesto] = useState<string>("");
  const [idOrganizacion, setIdOrganizacion] = useState<number>(0);

  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  const [modal, setModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fieldValidations, setFieldValidations] = useState({
    nombres: true,
    apellidos: true,
    correo: true,
    celular: true,
    puesto: true,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = event.latLng.toJSON();
      setMarkers([newMarker]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await axios.get(`/api/productor/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const productorData = await data.productor;
          setProductor(productorData);

          const centerMap = {
            lat: parseFloat(productorData["latitud"]),
            lng: parseFloat(productorData["longitud"]),
          };
          setMapCenter(centerMap);
          setMarkers([
            {
              lat: parseFloat(productorData["latitud"]),
              lng: parseFloat(productorData["longitud"]),
            },
          ]);
          setNombre(productorData["usuario"]["nombre"] || "");
          setApellido(productorData["usuario"]["apellido"] || "");
          setCorreo(productorData["usuario"]["correo"] || "");
          setContrasena(productorData["usuario"]["contrasena"] || "");
          setCelular(productorData["usuario"]["celular"] || "");
          setPuesto(productorData["puesto"] || "");
          setIdOrganizacion(productorData["idOrganizacion"] || 0);

          console.log(productorData);
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
 const handleAceparClick = () => {
    //router.push("/Productor/Mostrar");
    window.location.href = "/Productor/Mostrar";
 }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    const nombre =
      (formElements.namedItem("nombres") as HTMLInputElement)?.value || "";
    const apellido =
      (formElements.namedItem("apellidos") as HTMLInputElement)?.value || "";
    const correo =
      (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const celular =
      (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const puesto =
      (formElements.namedItem("puesto") as HTMLInputElement)?.value || "";

    const user: User = {
      nombre,
      apellido,
      correo,
      contrasena,
      celular,
      estado: 1,
      fechaActualizacion: new Date(),
    };

    const productor: Productor = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      puesto,
      idOrganizacion,
    };

    const newValidations = {
      nombres: nombre.trim() !== "",
      apellidos: apellido.trim() !== "",
      correo: correo.trim() !== "",
      celular: celular.trim() !== "",
      puesto: puesto.trim() !== "",
    };

    setFieldValidations(newValidations);

    if (Object.values(newValidations).every((valid) => valid)) {
      const axios = require("axios");

      try {
        const resp = await axios.put(`/api/productor/${id}`, {
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          contrasena: user.contrasena,
          celular: user.celular,
          latitud: productor.latitud.toString(),
          longitud: productor.longitud.toString(),
          puesto: productor.puesto,
          idOrganizacion: productor.idOrganizacion,
        });

        if (resp.status === 200) {
          setModal(true);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="max-w-5xl w-full text-black">
      <form
        className="m-4 p-5 border-1 shadow grid sm:grid-cols-2 gap-8"
        method="Post"
        onSubmit={handleSubmit}
      >
        <section className="col-span-1 flex flex-col items-center">
          <div className="w-full">
            <h1 className=" text-2xl text-center font-bold mb-2 mt-5">
              Actualizar Productor
            </h1>
            <div className="mt-10">
              <Input
                id="nombres"
                name="nombres"
                key="outside"
                type="text"
                label="Nombres"
                labelPlacement="outside"
                onChange={(event) => setNombre(event.target.value)}
                value={nombre}
                required
                validationState={fieldValidations.nombres ? "valid" : "invalid"}
                errorMessage={
                  !fieldValidations.nombres ? "Campo requerido" : undefined
                }
              />
            </div>
            <div className="mt-10">
              <Input
                id="apellidos"
                name="apellidos"
                key="outside"
                type="text"
                label="Apellidos"
                labelPlacement="outside"
                onChange={(event) => setApellido(event.target.value)}
                value={apellido}
                required
                validationState={
                  fieldValidations.apellidos ? "valid" : "invalid"
                }
                errorMessage={
                  !fieldValidations.apellidos ? "Campo requerido" : undefined
                }
              />
            </div>
            <div className="mt-10">
              <Input
                id="correo"
                name="correo"
                key="outside"
                type="email"
                label="Correo Electrónico"
                labelPlacement="outside"
                onChange={(event) => setCorreo(event.target.value)}
                value={correo}
                required
                validationState={fieldValidations.correo ? "valid" : "invalid"}
                errorMessage={
                  !fieldValidations.correo ? "Campo requerido" : undefined
                }
              />
            </div>

            <div className="mt-10">
              <Input
                id="celular"
                name="celular"
                type="number"
                key="outside"
                labelPlacement="outside"
                label="Celular"
                onChange={(event) => setCelular(event.target.value)}
                value={celular}
                required
                validationState={fieldValidations.celular ? "valid" : "invalid"}
                errorMessage={
                  !fieldValidations.celular ? "Campo requerido" : undefined
                }
              />
            </div>
            <div className="mt-10">
              <Input
                id="puesto"
                name="puesto"
                key="outside"
                type="text"
                label="Puesto"
                labelPlacement="outside"
                onChange={(event) => setPuesto(event.target.value)}
                value={puesto}
                required
                validationState={fieldValidations.puesto ? "valid" : "invalid"}
                errorMessage={
                  !fieldValidations.puesto ? "Campo requerido" : undefined
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            radius="lg"
            className="bg-amarillo mt-8 mb-6 max-sm:hidden sm:visible w-2/4"
          >
            Actualizar
          </Button>
          <Modal isOpen={modal} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-black flex flex-col gap-1 self-center mt-10">
                    Productor actualizado correctamente
                  </ModalHeader>

                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={handleAceparClick}
                    >
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </section>
        <section className="col-span-1 flex flex-col justify-center">
          <div className="h-fit">
            
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
              >
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker} />
                ))}
            </GoogleMap>  
          </LoadScript>
             
           
          </div>
          <Button
            type="submit"
            radius="lg"
            className="bg-amarillo sm:hidden mt-6"
          >
            Actualizar
          </Button>
        </section>
      </form>
    </div>
  );
}