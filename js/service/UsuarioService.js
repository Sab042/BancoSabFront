import Cliente from "../models/Cliente.js";
import PersistenciaService from "./PersistenciaService.js";

export default class UsuarioService {
    #persistencia;
    #clave;
    #usuarios;

    constructor() {
        this.#persistencia = new PersistenciaService();
        this.#clave = "miPlata_usuarios";
        this.#usuarios = this.#persistencia.cargar(
            this.#clave,
            []
        );
    }

    // CREATE: registrar un usuario
    crearUsuario(cliente, password = null) {
        if (!(cliente instanceof Cliente)) {
            throw new Error(
                "Debes proporcionar un objeto de tipo Cliente."
            );
        }

        const duplicado = this.#usuarios.some(usuario =>
            usuario.usuario.toLowerCase() ===
                cliente.usuario.toLowerCase() ||
            usuario.identificacion === cliente.identificacion
        );

        if (duplicado) {
            throw new Error(
                "El usuario o la identificación ya están registrados."
            );
        }

        if (!password) {
            throw new Error(
                "Se requiere una contraseña para registrar el usuario."
            );
        }

        const registro = {
            ...cliente.obtenerInformacion(),
            password,
            intentosFallidos: 0,
            bloqueado: false
        };

        this.#usuarios.push(registro);
        this.#guardar();

        return cliente;
    }

    // READ: listar usuarios sin exponer sus contraseñas
    listarUsuarios() {
        return this.#usuarios.map(usuario => ({
            id: usuario.id,
            identificacion: usuario.identificacion,
            nombre: usuario.nombre,
            celular: usuario.celular,
            usuario: usuario.usuario,
            bloqueado: usuario.bloqueado
        }));
    }

    buscarPorId(id) {
        const registro = this.#usuarios.find(
            usuario => usuario.id === id
        );

        return registro ? this.#reconstruirCliente(registro) : null;
    }

    buscarPorUsuario(nombreUsuario) {
        if (!nombreUsuario) return null;

        const registro = this.#usuarios.find(
            usuario =>
                usuario.usuario.toLowerCase() ===
                nombreUsuario.trim().toLowerCase()
        );

        return registro ? this.#reconstruirCliente(registro) : null;
    }

    // UPDATE: editar los datos personales
    editarUsuario(id, cambios) {
        const indice = this.#usuarios.findIndex(
            usuario => usuario.id === id
        );

        if (indice === -1) {
            throw new Error("El usuario no existe.");
        }

        const actual = this.#usuarios[indice];

        const nombre = cambios.nombre ?? actual.nombre;
        const celular = cambios.celular ?? actual.celular;

        if (!nombre || nombre.trim().length < 3) {
            throw new Error("Ingresa un nombre válido.");
        }

        if (!celular || celular.trim().length < 7) {
            throw new Error("Ingresa un celular válido.");
        }

        if (cambios.usuario &&
            cambios.usuario.toLowerCase() !== actual.usuario.toLowerCase()) {
            const existeUsuario = this.#usuarios.some(
                usuario =>
                    usuario.id !== id &&
                    usuario.usuario.toLowerCase() ===
                    cambios.usuario.trim().toLowerCase()
            );

            if (existeUsuario) {
                throw new Error("Ese nombre de usuario ya existe.");
            }
        }

        this.#usuarios[indice] = {
            ...actual,
            nombre: nombre.trim(),
            celular: celular.trim()
        };

        this.#guardar();

        return this.listarUsuarios().find(usuario => usuario.id === id);
    }

    // UPDATE: guardar el estado de autenticación
    actualizarEstado(cliente) {
        const indice = this.#usuarios.findIndex(
            usuario => usuario.id === cliente.id
        );

        if (indice === -1) {
            throw new Error("El usuario no existe.");
        }

        this.#usuarios[indice] = {
            ...this.#usuarios[indice],
            ...cliente.obtenerInformacion(),
            intentosFallidos: cliente.intentosFallidos,
            bloqueado: cliente.bloqueado
        };

        this.#guardar();
    }

    // UPDATE: guardar una contraseña nueva
    actualizarPassword(id, passwordNueva) {
        const registro = this.#usuarios.find(
            usuario => usuario.id === id
        );

        if (!registro) {
            throw new Error("El usuario no existe.");
        }

        if (!passwordNueva || passwordNueva.length < 6) {
            throw new Error(
                "La contraseña debe tener al menos 6 caracteres."
            );
        }

        registro.password = passwordNueva;
        this.#guardar();

        return true;
    }

    // DELETE: eliminar un usuario
    eliminarUsuario(id) {
        const cantidadInicial = this.#usuarios.length;

        this.#usuarios = this.#usuarios.filter(
            usuario => usuario.id !== id
        );

        if (this.#usuarios.length === cantidadInicial) {
            throw new Error("No se encontró el usuario para eliminar.");
        }

        this.#guardar();

        return true;
    }

    // Reconstruir la instancia y recuperar el estado de bloqueo
    #reconstruirCliente(registro) {
        const cliente = new Cliente(
            registro.id,
            registro.identificacion,
            registro.nombre,
            registro.celular,
            registro.usuario,
            registro.password
        );

        const intentos = Math.min(
            registro.intentosFallidos || 0,
            3
        );

        for (let i = 0; i < intentos; i++) {
            cliente.registrarFallo();
        }

        if (registro.bloqueado) {
            cliente.bloquearCuenta();
        }

        return cliente;
    }

    #guardar() {
        this.#persistencia.guardar(
            this.#clave,
            this.#usuarios
        );
    }
}