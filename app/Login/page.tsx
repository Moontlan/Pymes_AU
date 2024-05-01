"use client";
import React, { useState, useEffect } from "react";
import { Button, Link, user } from "@nextui-org/react";
import { motion } from "framer-motion";
import CryptoJS from "crypto-js";
import Cookies from 'js-cookie'; // npm i --save-dev @types/js-cookie

//redux
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter } from "next/navigation";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
interface User {
  correo: string;
  contrasena: string;
}
export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {   
    //
    Cookies.remove('userToken')
    dispatch(deleteUser());
  }, []);

  const ForgotPassword = () => {
    router.push("/forgot_password");
  }

  // const select = useAppSelector((state) => state.user);
  // console.log(select);
  const [invalidMesasge, setInvalidMessage] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const correo =
      (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const contrasena =
      (formElements.namedItem("contrasena") as HTMLInputElement)?.value || "";
    const user: User = {
      correo,
      contrasena,
    };

    const axios = require("axios");
    var pass = CryptoJS.MD5(user.contrasena).toString(CryptoJS.enc.Hex);
    user.contrasena = pass;

    try {
      var resp = await axios.post("/api/login/", {
        correo: user.correo,
        contrasena: user.contrasena,
      });

      if (resp.status === 200) {
        //console.log(resp.data);
        const user = {
          id: resp.data.user.id,
          nombre: resp.data.user.nombre,
          apellido: resp.data.user.apellido,
          correo: resp.data.user.correo,
          rol: resp.data.role,
          token: resp.data.token,
          celular: resp.data.user.celular
        };

        if(user.rol === 3){
          setInvalidMessage(true);
          return;
        }
       
        //dispatch(addUser(user));
        if (typeof window !== 'undefined') {
          localStorage.setItem("rol", user.rol);
        }
        //Cookies.remove('userToken')
        Cookies.set('userToken', user.token, { expires: 2 / 24 });
        Cookies.set('userId', user.id, { expires: 2 / 24 });

        if (typeof window !== 'undefined') {
          localStorage.setItem("userId", user.id);
        }
        
       // console.log(Cookies.get('userToken'));
       
       

        router.push(`/Principal`);
      } else if (resp.status === 401) {
        setInvalidMessage(true);
      }
    } catch (error) {
     // console.error(error);
      setInvalidMessage(true);
  
    }
  };

  // console.log(useAppSelector((state) => state.user.id));

  return (
  
    <motion.div
      className="w-full content-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-1/2">
            <img
              className="h-screen w-full"
              alt="Imagen"
              src="https://images.pexels.com/photos/5749155/pexels-photo-5749155.jpeg"
            ></img>
          </div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
            <div className="w-full">
              <h1 className="text-4xl font-bold text-white">INICIAR SESIÓN</h1>

              {invalidMesasge && (
                <p className="mt-5 text-red-500 font-bold">
                  Correo o contraseña incorrrecta
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mt-6">
                  <h1 className="text-gray-500 dark:text-gray-300">
                    Correo Electrónico
                  </h1>
                  <input
                    type="email"
                    name="correo"
                    placeholder="Ingresa tu correo Electrónico"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                <div className="mt-6">
                  <h1 className="text-gray-500 dark:text-gray-300">
                    Contraseña
                  </h1>
                  <input
                    type="password"
                    name="contrasena"
                    placeholder="Ingresa tu contraseña"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>

                <Button
                  type="submit" name="btnLogin"
                  className="flex items-center  justify-center mt-4 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 w-full h-13"
                >
                  <h1 className="px-4 py-3 w-5/6 text-base text-center text-white font-bold">
                    Iniciar Sesión
                  </h1>
                </Button>

                <div className="mt-2 justify-end">
                  <a
                    onClick={ForgotPassword}
                    className="font-bold text-blue-500  hover:underline hover:p-2 cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
   
  );
}
