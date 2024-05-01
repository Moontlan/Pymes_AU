'use client'
import EditIcon from '@/EditIcon';
import { Button, Link, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'


interface Categoria{
    nombre: String
}

export default function Mostrar() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [Categoria , setCategoria] = useState([]);

    const pages = Math.ceil(Categoria.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return Categoria.slice(start, end);
    }, [page, Categoria]);

    const crearCategoria = () => {
        router.push("/Categoria/Crear");
    }

    useEffect(() => {
        // Realizar la solicitud GET al servidor para obtener las organizaciones usando Axios
        axios.get("/api/categoria")
          .then((response) => {
            if (response.data && response.data.data) {
                setCategoria(response.data.data);
            }
          })
          .catch((error) => console.error("Error al obtener las organizaciones:", error));
      }, []);

      const clicEdit = (id: any) => {
        router.push(`/Categoria/Editar?id=${id}`);
      };  

    return (
    <>
<div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Lista de Categorias</h1>
      <Link onClick={crearCategoria} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Categoria
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
          <TableColumn hidden key="id">Id</TableColumn>
          <TableColumn key="nombre">Nombre</TableColumn>
          
          <TableColumn key="editar">Editar</TableColumn>

        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item['idCategoria']}>
              <TableCell hidden>
                 <div className="flex gap-4">
                {item['idCategoria']}
                </div>
              </TableCell>
              <TableCell>{item['nombre']}</TableCell> 
           
              <TableCell>
              <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="success"
                  onClick={() => clicEdit(item['idCategoria'])}
                >
                  <EditIcon className="w-6 h-6 text-black" />
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </>
    )
}