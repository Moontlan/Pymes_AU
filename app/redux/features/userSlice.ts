import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    id: 0,
    nombre: "",
    apellido: "",
    correo: "",
    rol: 0,
    token: "",

}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
       
    reducers: {
        addUser:(state, action) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombre;
            state.apellido = action.payload.apellido;
            state.correo = action.payload.correo;
            state.rol = action.payload.rol;
            state.token = action.payload.token;
        },
        deleteUser:(state) => {
            state.id = 0;
            state.nombre = "";
            state.apellido = "";
            state.correo = "";
            state.rol = 0;
            state.token = "";
        },
        updateUser:(state, action) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombres;
            state.apellido = action.payload.apellidos;
            state.correo = action.payload.correo;
            state.rol = action.payload.rol;
            state.token = action.payload.token;
         }
    }
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
//export const { addUser } = userSlice.actions;

export default userSlice.reducer;