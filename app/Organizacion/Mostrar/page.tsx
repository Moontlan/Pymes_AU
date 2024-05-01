"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"; // Importa Axios
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
  const [organizacion, setOrganizations] = useState([]); // Estado para almacenar las organizaciones


  const user: User = {
      
   
    estado: 0,
    fechaActualizacion: new Date(new Date().toISOString()), 
  };

  const Carga = () =>{
    axios
    .get("/api/organizacion")
    .then((response) => {
      if (response.data && response.data.data) {
        setOrganizations(response.data.data);
      }
    })
    .catch((error) =>
      console.error("Error al obtener las organizaciones:", error)
    );
  }


  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener las organizaciones usando Axios

    Carga();
   
  }, []);

  const pages = Math.ceil(organizacion.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return organizacion.slice(start, end);
  }, [page, organizacion]);

  const clic = (id: any) => {
    router.push(`/Organizacion/Detalles?id=${id}`);
  };
  const clicEdit = (id: any) => {
    router.push(`/Organizacion/Editar?id=${id}`);
  };
  const CrearOrganizacion = () => {
    router.push(`/Organizacion/Crear`);
  };



  const handleDeleteConfirm = async (id: any) => {
    try {
      const response = await axios.delete(`/api/organizacion/${id}`, {
        data:{
          estado:user.estado
        }
        

      });
  
      if (response.status === 200) {
        // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
        //console.log("Has eliminado a un usuario" + id);

        //window.location.reload();
        Carga();
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
      <h1 className="text-center text-2xl mb-4">Lista de Organizaciones</h1>
     

      <Button
        className="flex items-center text-black hover:text-gray-800"
        color="success"
        onClick={() => CrearOrganizacion()}
      >
        <EditIcon className="w-6 h-6 text-black" />
        Crear Organizacion
      </Button>

      <Table
        className="mt-5"
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
          <TableColumn hidden key="idOrganizacion">Id</TableColumn>
          <TableColumn key="nombre">Nombre</TableColumn>
         
          <TableColumn key="correo">Correo</TableColumn>
          <TableColumn key="celular">Celular</TableColumn>
        
          {/* <TableColumn key="crearProductos">CrearProductos</TableColumn> */}

          <TableColumn key="nit">Nit</TableColumn>
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow  key={item["id"]}>
              <TableCell hidden>
                <div className="flex gap-4">{item["id"]}</div>
              </TableCell>
              <TableCell>{item["nombre"]}</TableCell>
             
              <TableCell>{item["correo"]}</TableCell>

              <TableCell>{item["celular"]}</TableCell>
              

              {/* <TableCell>
                {item["organizacion"]["crearProductos"] === 1
                  ? "Puede Crear"
                  : "No Puede"}
              </TableCell> */}

              <TableCell>{item["organizacion"]["nit"]}</TableCell>
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
