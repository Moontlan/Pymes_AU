'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import { FaWhatsapp } from 'react-icons/fa';

export default function Page() {
  const [ventaData, setVentaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/detalles/`);
        if (response.status === 200) {
          const data = await response.data;
          const ventaDatos = await data.venta;
          setVentaData(ventaDatos);
          console.log("Datos de la venta (dentro de useEffect):", ventaDatos);
        } else {
          console.error("Error al obtener la Categoria");
        }
      } catch (error) {
        console.error("Error al obtener la Categoria:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth === '') {
      setFilteredData(ventaData);
    } else {
      setFilteredData(ventaData.filter(venta => {
        const ventaDate = new Date(venta['fechaRegistro']);
        const selectedDate = new Date(selectedMonth);
        return ventaDate.getFullYear() === selectedDate.getFullYear() && ventaDate.getMonth() === selectedDate.getMonth();
      }));
    }
  }, [ventaData, selectedMonth]);

  return (
    <>
    <div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Detalles Ventas</h1>

      <Input 
        className="w-1/4"
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <Table className="mt-5">
        <TableHeader>
          <TableColumn key="nombreProducto">Nombre del Producto</TableColumn>
          <TableColumn key="precio">Precio Unitario Bs</TableColumn>
          <TableColumn key="cantidad">Cantidad de Productos Comprados</TableColumn>
          <TableColumn key="importe">Importe Bs</TableColumn>
          
          <TableColumn key="fechaVenta">Fecha de Venta</TableColumn>
          <TableColumn key="nombreUsuario">Nombre del Cliente</TableColumn>
          <TableColumn key="Celular">Celular</TableColumn>
        </TableHeader>
        <TableBody items={filteredData}>
          {(venta) => (
            <TableRow key={venta['id']}>
              <TableCell>{venta['productos']['nombre']}</TableCell>
              <TableCell>{venta['productos']['precio']}</TableCell>
              <TableCell>{venta['cantidad']}</TableCell>
              <TableCell>{venta['inporte']}</TableCell>
              <TableCell>
                {new Date(venta['fechaRegistro']).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </TableCell>
              <TableCell>{venta['venta']['cliente']['usuario']['nombre'] + " " +  venta['venta']['cliente']['usuario']['apellido']}</TableCell>
              <TableCell>
                <a
                  href={`https://wa.me/+591${venta['venta']['cliente']['usuario']['celular']}`}
                  target="_blank"
                  className="hover:text-green-500 flex items-center"
                  style={{ fontSize: '15px' }}
                >
                  <FaWhatsapp />
                  <span className="ml-1">{venta['venta']['cliente']['usuario']['celular']}</span>
                </a>
              </TableCell>

            </TableRow>
          )}
        </TableBody>
      </Table>

    </div> 
   
      
    </>
  );
}
