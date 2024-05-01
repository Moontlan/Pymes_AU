"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Image,
  Tooltip,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import EyeIcon from "@/EyeIcon";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

interface User {
  estado: number;
  fechaActualizacion: Date;
}

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [administrador, setAdmins] = useState([]); // Estado para almacenar los admins

  const user: User = {
    estado: 0,
    fechaActualizacion: new Date(new Date().toISOString()), 
  };

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener los admins usando Axios
    axios
      .get("/api/administrador")
      .then((response) => {
        if (response.data && response.data.data) {
            setAdmins(response.data.data);
        }
      })
      .catch((error) =>
        console.error("Error al obtener a los administradores:", error)
      );
  }, []);

  console.log(administrador);
  const pages = Math.ceil(administrador.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return administrador.slice(start, end);
  }, [page, administrador]);

  const clic = (id: any) => {
    router.push(`/Administrador/Detalles?id=${id}`);
  };
  const clicEdit = (id: any) => {
    router.push(`/Administrador/Editar?id=${id}`);
  };



  const handleDeleteConfirm = async (id: any) => {
    try {
      const response = await axios.delete(`/api/administrador/${id}`, {
        data:{
          estado:user.estado
        }
        

      });
  
      if (response.status === 200) {
        // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página

        window.location.reload();
      } else {
        // Maneja la respuesta en caso de error aquí
        console.error('Error al actualizar:', response.data);
      }
    } catch (error) {
      // Maneja los errores de red o del servidor aquí
      console.error('Error en la solicitud PUT:', error);
    }
  
  
  };

  return (
    <div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Lista de Administradores</h1>
      <Link
        href="/Administrador/Crear"
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Administrador
      </Link>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="idAdministrador">Id</TableColumn>
          <TableColumn key="nombre">Nombre</TableColumn>
          <TableColumn key="apellido">Apellido</TableColumn>
          <TableColumn key="correo">Correo</TableColumn>
          <TableColumn key="celular">Celular</TableColumn>
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item["id"]}>
              <TableCell>
                <div className="flex gap-4">{item["id"]}</div>
              </TableCell>
              <TableCell>{item["nombre"]}</TableCell>
              <TableCell>{item["apellido"]}</TableCell>
              <TableCell>{item["correo"]}</TableCell>

              <TableCell>{item["celular"]}</TableCell>
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="primary"
                  onClick={() => clic(item["id"])}
                >
                  <EyeIcon className="w-6 h-6 text-black" />
                  Ver
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="success"
                  onClick={() => clicEdit(item["id"])}
                >
                  <EditIcon className="w-6 h-6 text-black" />
                  Editar
                </Button>
              </TableCell>
              <TableCell >
                <Popover
                  
                  showArrow
                  backdrop="opaque"
                  placement="right"
                  classNames={{
                    base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                    arrow: "bg-default-200",
                  }}
                >
                  <PopoverTrigger>
                    <Button color="danger">
                      Eliminar
                      <DeleteIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <p
                          className="text-small font-bold text-foreground"
                          {...titleProps}
                        >
                          ¿Estás seguro de querer eliminar a {item["nombre"]}?
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <Button color="success" onClick={ ()=> handleDeleteConfirm(item["id"])    }>
                            Confirmar
                          </Button>
                          <Button >Cancelar</Button>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}