-- CreateTable
CREATE TABLE "almaceninsumos" (
    "Insumos_id" INTEGER NOT NULL,
    "Proveedores_id" INTEGER NOT NULL,
    "cantidad" VARCHAR(45) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "almaceninsumos_pkey" PRIMARY KEY ("Insumos_id","Proveedores_id")
);

-- CreateTable
CREATE TABLE "atributo" (
    "idAtributo" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "valor" VARCHAR(45) NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "atributo_pkey" PRIMARY KEY ("idAtributo")
);

-- CreateTable
CREATE TABLE "categoria" (
    "idCategoria" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("idCategoria")
);

-- CreateTable
CREATE TABLE "cliente" (
    "idCliente" INTEGER NOT NULL,
    "direccion" VARCHAR(60) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "detalleventas" (
    "id" SERIAL NOT NULL,
    "idVenta" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "cantidad" SMALLINT NOT NULL,
    "nit" VARCHAR(45) NOT NULL,
    "precioUnitario" DECIMAL(18,2) NOT NULL,
    "inporte" DECIMAL(18,2) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "detalleventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insumo" (
    "idInsumo" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "precio" DECIMAL(18,2) NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "insumo_pkey" PRIMARY KEY ("idInsumo")
);

-- CreateTable
CREATE TABLE "insumoproduccion" (
    "Insumo_idInsumo" INTEGER NOT NULL,
    "Produccion_id" INTEGER NOT NULL,
    "cantidadEntrada" INTEGER NOT NULL,
    "cantidadSalida" INTEGER NOT NULL,
    "cantidadTotal" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insumoproduccion_pkey" PRIMARY KEY ("Insumo_idInsumo","Produccion_id")
);

-- CreateTable
CREATE TABLE "organizacion" (
    "idOrganizacion" INTEGER NOT NULL,
    "latitud" VARCHAR(60) NOT NULL,
    "longitud" VARCHAR(60) NOT NULL,
    "crearProductos" SMALLINT,
    "nit" VARCHAR(45) NOT NULL,

    CONSTRAINT "organizacion_pkey" PRIMARY KEY ("idOrganizacion")
);

-- CreateTable
CREATE TABLE "produccion" (
    "id" SERIAL NOT NULL,
    "idProductos" INTEGER NOT NULL,
    "idProductor" INTEGER NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "canrtidad" INTEGER NOT NULL,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "produccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productor" (
    "idProductor" INTEGER NOT NULL,
    "puesto" VARCHAR(45) NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "idOrganizacion" INTEGER NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "productor_pkey" PRIMARY KEY ("idProductor")
);

-- CreateTable
CREATE TABLE "productos" (
    "idProductos" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "precio" DECIMAL(18,2) NOT NULL,
    "descripcion" VARCHAR(100),
    "idCategoria" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "idProductor" INTEGER NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),
    "fechaVencimiento" TIMESTAMP(6),
    "mainIndex" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("idProductos")
);

-- CreateTable
CREATE TABLE "proveedores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "celular" VARCHAR(45) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ruta" (
    "id" SERIAL NOT NULL,
    "ruta" VARCHAR(200) NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "ruta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "apellido" VARCHAR(45) NOT NULL,
    "correo" VARCHAR(45) NOT NULL,
    "contrasena" VARCHAR(45) NOT NULL,
    "celular" VARCHAR(45) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(6),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta" (
    "id" SERIAL NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "total" DECIMAL(18,2) NOT NULL,
    "estado" SMALLINT NOT NULL DEFAULT 1,
    "fechaRegistro" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "almaceninsumos" ADD CONSTRAINT "fk_Insumos_has_Proveedores_Insumos1" FOREIGN KEY ("Insumos_id") REFERENCES "insumo"("idInsumo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "almaceninsumos" ADD CONSTRAINT "fk_Insumos_has_Proveedores_Proveedores1" FOREIGN KEY ("Proveedores_id") REFERENCES "proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "atributo" ADD CONSTRAINT "fk_id_productos5" FOREIGN KEY ("idProducto") REFERENCES "productos"("idProductos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "fk_Cliente_usuario1" FOREIGN KEY ("idCliente") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "fk_id_producto" FOREIGN KEY ("idProducto") REFERENCES "productos"("idProductos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detalleventas" ADD CONSTRAINT "fk_id_venta" FOREIGN KEY ("idVenta") REFERENCES "venta"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insumoproduccion" ADD CONSTRAINT "fk_Insumo_has_Produccion_Insumo1" FOREIGN KEY ("Insumo_idInsumo") REFERENCES "insumo"("idInsumo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "insumoproduccion" ADD CONSTRAINT "fk_Insumo_has_Produccion_Produccion1" FOREIGN KEY ("Produccion_id") REFERENCES "produccion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "organizacion" ADD CONSTRAINT "fk_Organizacion_usuario1" FOREIGN KEY ("idOrganizacion") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produccion" ADD CONSTRAINT "fk_id_productor2" FOREIGN KEY ("idProductor") REFERENCES "productor"("idProductor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produccion" ADD CONSTRAINT "fk_id_productos2" FOREIGN KEY ("idProductos") REFERENCES "productos"("idProductos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productor" ADD CONSTRAINT "fk_Productores_usuario1" FOREIGN KEY ("idProductor") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productor" ADD CONSTRAINT "fk_id_organizacion" FOREIGN KEY ("idOrganizacion") REFERENCES "organizacion"("idOrganizacion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "fk_id_categoria" FOREIGN KEY ("idCategoria") REFERENCES "categoria"("idCategoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "fk_id_productor" FOREIGN KEY ("idProductor") REFERENCES "productor"("idProductor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ruta" ADD CONSTRAINT "fk_id_productos3" FOREIGN KEY ("idProducto") REFERENCES "productos"("idProductos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "fk_id_cliente" FOREIGN KEY ("idCliente") REFERENCES "cliente"("idCliente") ON DELETE NO ACTION ON UPDATE NO ACTION;
