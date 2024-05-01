"use client";
import React, { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function UpdateData() {
  
  const [modal, setModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [fieldValidations, setFieldValidations] = useState({
    nombre: true,
    apellido: true,
    celular: true,
    correo: true,
  });
    const router = useRouter();
  //const id = useAppSelector((state) => state.user.id);
  const id = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userId") || "0") as number : 0;
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/usuario/${id}`);
        if (response.status === 200) {
          const usuario = await response.data;

          setNombre(usuario.usuario.nombre);
          setApellido(usuario.usuario.apellido);
          setCelular(usuario.usuario.celular);
          setCorreo(usuario.usuario.correo);

          console.log(usuario);
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const handleActualizadoClick = () => {
    router.push('/Usuario/MiPerfil');
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newValidations = {
      nombre: nombre.trim() !== "",
      apellido: apellido.trim() !== "",
      celular: celular.trim() !== "",
      correo: correo.trim() !== "",
    };

    setFieldValidations(newValidations);

    if (Object.values(newValidations).every((valid) => valid)) {
      try {
        const resp = await axios.put(`/api/usuario/${id}`, {
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          correo: correo.trim(),
          celular: celular.trim(),
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
    <div className="min-h-screen text-blanco ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl text-center font-bold mb-8 mt-5">
          Actualizar datos del perfil
        </h1>
        <form
          className=" p-5 border-1 shadow"
          method="Post"
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <Input
              id="nombres"
              name="nombres"
              key="outside"
              type="text"
              label="Nombre"
              labelPlacement="outside"
              required
              onValueChange={setNombre}
              value={nombre}
              validationState={fieldValidations.nombre ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.nombre ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-10">
            {apellido !== null &&
              apellido !== "" && (
                <Input
                  id="apellido"
                  name="apellido"
                  key="outside"
                  type="text"
                  label="Apellidos"
                  labelPlacement="outside"
                  required
                  onValueChange={setApellido}
                  value={apellido}
                  validationState={
                    fieldValidations.apellido ? "valid" : "invalid"
                  }
                  errorMessage={
                    !fieldValidations.apellido ? "Campo requerido" : undefined
                  }
                />
              )}
          </div>
          <div className="mt-10">
            <Input
              id="celular"
              name="celular"
              key="outside"
              type="text"
              label="Celular"
              labelPlacement="outside"
              required
              onValueChange={setCelular}
              value={celular}
              validationState={fieldValidations.celular ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.celular ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-12 mb-10">
            <Input
              id="correo"
              name="correo"
              key="outside"
              type="text"
              label="Correo Electrónico"
              labelPlacement="outside"
              required
              onValueChange={setCorreo}
              value={correo}
              validationState={fieldValidations.correo ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.correo ? "Campo requerido" : undefined
              }
            />
          </div>

          <Button type="submit" radius="full" className="bg-amarillo">
            Actualizar
          </Button>
          <Modal isOpen={modal} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 self-center mt-10">
                    Datos Actualizados Correctamente
                  </ModalHeader>

                  <ModalFooter>
                    <Button
                      color="success"
                     onClick={handleActualizadoClick}
                    >
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </div>
  );
}
