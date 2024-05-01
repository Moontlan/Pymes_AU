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
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Tooltip,
} from "@nextui-org/react";

import { FaWhatsapp } from 'react-icons/fa';

import { useRouter } from "next/navigation";
import { Metadata } from "next";
import EyeIcon from "@/EyeIcon";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface User {
  estado: number;
  fechaActualizacion: Date;
}
export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [productor, setProductores] = useState([]);

  const user: User = {
    estado: 0,
    fechaActualizacion: new Date(new Date().toISOString()),
  };
  //const userToken = useAppSelector((state) => state.user.token);

  
  useEffect(() => {
    /*if( userToken === null){
      router.push("/Login");
    }*/
    carga();
    
  }, []);

  const carga = () => {
    axios
    .get("/api/productor")
    .then((response) => {
      if (response.data && response.data.data) {
        setProductores(response.data.data);
        console.log(response.data.data);
      }
    })
    .catch((error) => console.error(error));
  }

  const pages = Math.ceil(productor.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return productor.slice(start, end);
  }, [page, productor]);

  const detalles = (id: any) => {
    router.push(`/Productor/Detalles?id=${id}`);
  };
  const editar = (id: any) => {
    router.push(`/Productor/Editar?id=${id}`);
  };
  const registrar = () => {
    router.push(`/Productor/Crear`);
  };

  const handleDeleteConfirm = async (id: any) => {
    try {
      const response = await axios.delete(`/api/productor/${id}`, {
        data: {
          estado: user.estado,
          fechaActualizacion: user.fechaActualizacion,
        },
      });

      if (response.status === 200) {
        carga();
      } else {
        console.error("Error al actualizar:", response.data);
      }
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  return (
    <div className="text-black bg-blanco p-4 w-full">
      <h1 className="text-center text-2xl mb-4">Lista de Productores</h1>
      <Button
        color="success"
        variant="solid"
        as={Link}
        onClick={registrar}
        className="btn mb-5  font-bold py-2 px-4 rounded-lg"
      >
        Registrar Productor
      </Button>
      <Table
        
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
          <TableColumn hidden key="idProductor">Id</TableColumn>
          <TableColumn key="nombre">Nombres</TableColumn>
          <TableColumn key="apellido">Apellidos</TableColumn>
          <TableColumn key="correo">Correo</TableColumn>
          <TableColumn key="celular">Celular</TableColumn>
          <TableColumn key="puesto">Puesto</TableColumn>

          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item["usuario"]["id"]}>
              <TableCell hidden>
                <div className="flex gap-4">{item["usuario"]["id"]}</div>
              </TableCell>
              <TableCell>{item["usuario"]["nombre"]}</TableCell>
              <TableCell>{item["usuario"]["apellido"]}</TableCell>
              <TableCell>{item["usuario"]["correo"]}</TableCell>

              <TableCell>
                <a
                  href={`https://wa.me/+591${item["usuario"]["celular"]}`}
                  target="_blank"
                  className="hover:text-green-500 flex items-center"
                  style={{ fontSize: '15px' }}
                >
                  <FaWhatsapp />
                  <span className="ml-1">{item["usuario"]["celular"]}</span>
                </a>

              </TableCell>
              <TableCell>{item["puesto"]}</TableCell>

              <TableCell>
                <Tooltip className="text-black" content="Ver detalles">
                  <span
                    onClick={() => detalles(item["usuario"]["id"])}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EyeIcon />
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip className="text-black" content="Editar productor">
                  <span
                    onClick={() => editar(item["usuario"]["id"])}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EditIcon />
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>
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
                    <Button color="danger" className="rounded-full">
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
                          ¿Estás seguro de querer eliminar a{" "}
                          {item["usuario"]["nombre"]}?
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <Button
                            color="success"
                            onClick={() =>
                              handleDeleteConfirm(item["usuario"]["id"])
                            }
                          >
                            Confirmar
                          </Button>
                          <Button>Cancelar</Button>
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