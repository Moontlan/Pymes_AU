"use client";
import DeleteIcon from "@/DeleteIcon";
import EditIcon from "@/EditIcon";
import EyeIcon from "@/EyeIcon";
import {
  Button,
  Link,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [produccionD, setProduccion] = useState([]);

  useEffect(() => {
    axios
      .get("/api/insumosProduccion")
      .then((res) => {
        if (res.data && res.data.data) {
          setProduccion(res.data.data);
        }
      })
      .catch((error) => {
        console.log("Error eal obtener los datos de la Api" + error);
      });
  }, []);

  const pages = Math.ceil(produccionD.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return produccionD.slice(start, end);
  }, [page, produccionD]);

  const ClickDetalles = (id: any) => {
    router.push(`/Produccion/Detalles?id=${id}`);
  };

  const ClickEditar = (id: any) => {
    router.push(`/Produccion/Editar?id=${id}`);
  };

  const CrearProduccion = () => {
    router.push(`/Produccion/Crear`);
  };

  return (
    <>
      <div className="text-black bg-blanco p-4">
        <h1 className="text-center text-2x1 mb-4"> Lista de Producciones</h1>

       
        <Button
          className="flex items-center text-black hover:text-gray-800"
          color="success"
          onClick={() => CrearProduccion()}
        >
          <EditIcon className="w-6 h-6 text-black" />
          Crear Producciones
        </Button>
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
            <TableColumn hidden key="id">Id</TableColumn>
            <TableColumn key="nombre">Nombre</TableColumn>

            <TableColumn key="cantidad">Cantidad</TableColumn>
            <TableColumn key="productor">Productor</TableColumn>

            <TableColumn key="ver">Ver</TableColumn>
            <TableColumn key="editar">Editar</TableColumn>
            <TableColumn key="eliminar">Eliminar</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item["id"]}>
                <TableCell hidden>
                  <div className="flex gap-4">{item["id"]}</div>
                </TableCell>
                <TableCell>{item["productos"]["nombre"]}</TableCell>

                <TableCell>{item["canrtidad"]}</TableCell>
                <TableCell>{item["productor"]["puesto"]}</TableCell>

                <TableCell>
                  <Button
                    className="flex items-center text-black hover:text-gray-800"
                    color="primary"
                    onClick={() => ClickDetalles(item["id"])}
                  >
                    <EyeIcon className="w-6 h-6 text-black" />
                    Ver
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    className="flex items-center text-black hover:text-gray-800"
                    color="success"
                    onClick={() => ClickEditar(item["idProductos"])}
                  >
                    <EditIcon className="w-6 h-6 text-black" />
                    Editar
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    className="flex items-center text-black hover:text-gray-800"
                    color="danger"
                    onClick={() => ClickDetalles(item["idProductos"])}
                  >
                    <DeleteIcon className="w-6 h-6 text-black" />
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
