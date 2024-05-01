"use client";
import React, { useState } from "react";
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

import CryptoJS from "crypto-js";
import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


export default function UpdatePassword() {
  const router = useRouter();
  //const idUser = useAppSelector((state) => state.user.id)
  //const idUser = JSON.parse(localStorage.getItem("userId") || "0") as number;
  const idUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("userId") || "0") as number : 0;
  const [modal, setModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [isVisible1, setIsVisible1] = React.useState(false);
  const [isVisible2, setIsVisible2] = React.useState(false);
  const [isVisible3, setIsVisible3] = React.useState(false);

  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const toggleVisibility3 = () => setIsVisible3(!isVisible3);

  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fieldValidations, setFieldValidations] = useState({
    contrasenaActual: true,
    contrasena: true,
    confirmarContrasena: true,
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
const handleClick = () => {
    router.push("/Usuario/MiPerfil");
}
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newValidations = {
      contrasenaActual: contrasenaActual.trim() !== "",
      contrasena: contrasena.trim() !== "",
      confirmarContrasena: confirmarContrasena.trim() !== "",
    };

    setFieldValidations(newValidations);

    if (Object.values(newValidations).every((valid) => valid)) {
      if (contrasena !== confirmarContrasena) {
        setPasswordsMatchError("Las contraseñas no coinciden.");
      } else {
        const axios = require("axios");

        try {
          const response = await axios.get(`/api/usuario/${idUser}`);
          if (response.status === 200) {
            var usario = response.data;
            console.log(usario);
          }
          if (
            usario.usuario.contrasena ==
            CryptoJS.MD5(contrasenaActual.trim()).toString(CryptoJS.enc.Hex)
          ) {
            const resp = await axios.delete(`/api/usuario/${idUser}`, {
              data: {
                contrasena: CryptoJS.MD5(contrasena).toString(CryptoJS.enc.Hex),
              },
            });
            if (resp.status === 200) {
              //console.log(CryptoJS.MD5(contrasena).toString(CryptoJS.enc.Hex));
              setModal(true);
            }
          } else {
            setCurrentPasswordError("La contraseña actual no es correcta.");
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className=" min-h-screen ">
      <div className="mx-auto max-w-5xl">
        <h1 className="  text-2xl text-center font-bold mb-8 mt-5">
          Cambiar Contraseña
        </h1>
        <form
          className=" p-5 border-1 shadow"
          method="Post"
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <Input
              id="contrasenaActual"
              name="contrasenaActual"
              key="outside"
              label="Contraseña actual"
              labelPlacement="outside"
              type={isVisible1 ? "text" : "password"}
              required
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility1}>
                  {isVisible1 ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              onValueChange={setContrasenaActual}
              validationState={
                fieldValidations.contrasenaActual ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.contrasenaActual
                  ? "Campo requerido"
                  : undefined
              }
            />
            <span className="text-red-900">{currentPasswordError}</span>
          </div>
          <div className="mt-10">
            <Input
              id="contrasena"
              name="contrasena"
              key="outside"
              type={isVisible2 ? "text" : "password"}
              label="Nueva contraseña"
              minLength={6}
              labelPlacement="outside"
              required
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                  {isVisible2 ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              onValueChange={setContrasena}
              validationState={
                fieldValidations.contrasena ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.contrasena ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-12 mb-10">
            <Input
              id="confirmarContrasena"
              name="confirmarContrasena"
              key="outside"
              type={isVisible3 ? "text" : "password"}
              label="Confirmar nueva contraseña"
              minLength={6}
              labelPlacement="outside"
              required
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility3}>
                  {isVisible3 ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              onValueChange={setConfirmarContrasena}
              validationState={
                fieldValidations.confirmarContrasena ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.confirmarContrasena
                  ? "Campo requerido"
                  : undefined
              }
            />
            <span className="text-red-900">{passwordsMatchError}</span>
          </div>

          <Button type="submit" radius="full" className="bg-amarillo">
            Cambiar Contraseña
          </Button>
          <Modal isOpen={modal} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 self-center mt-10 text-black">
                    Contraseña Actualizada Correctamente
                  </ModalHeader>

                  <ModalFooter>
                    <Button
                      color="success"
                      as={Link}
                      onClick={handleClick}
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
