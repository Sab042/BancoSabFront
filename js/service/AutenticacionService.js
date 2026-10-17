import Cliente from "../models/Cliente.js";
import UsuarioService from "./UsuarioService.js";

export default class AutenticacionService {
    #usuarioService;
    #sesionActual;

    constructor(usuarioService = new UsuarioService()) {
        this.#usuarioService = usuarioService;
        this.#sesionActual = null;
    }

    registrar(datos) {
        const {
            id,
            identificacion,
            nombre,
            celular,
            usuario,
            password,
            confirmarPassword
        } = datos;

        if (password !== confirmarPassword) {
            throw new Error("Las contraseñas no coinciden.");
        }

        const cliente = new Cliente(
            id || crypto.randomUUID(),
            identificacion,
            nombre,
            celular,
            usuario,
            password
        );

        this.#usuarioService.crearUsuario(cliente, password);

        return cliente.obtenerInformacion();
    }

    iniciarSesion(usuario, password) {
        const cliente = this.#usuarioService.buscarPorUsuario(usuario);

        if (!cliente) {
            throw new Error("Usuario o contraseña incorrectos.");
        }

        if (cliente.bloqueado) {
            throw new Error("La cuenta está bloqueada.");
        }

        if (!cliente.verificarPassword(password)) {
            const intentos = cliente.registrarFallo();

            this.#usuarioService.actualizarEstado(cliente);

            if (cliente.bloqueado) {
                throw new Error(
                    "Cuenta bloqueada tras tres intentos incorrectos."
                );
            }

            throw new Error(
                `Credenciales incorrectas. Intento ${intentos} de 3.`
            );
        }

        cliente.reiniciarIntentos();
        this.#usuarioService.actualizarEstado(cliente);

        this.#sesionActual = cliente.id;

        return {
            cliente: cliente.obtenerInformacion(),
            sesionId: this.#sesionActual
        };
    }

    cerrarSesion() {
        this.#sesionActual = null;

        return true;
    }

    obtenerSesionActual() {
        if (!this.#sesionActual) {
            return null;
        }

        const cliente = this.#usuarioService.buscarPorId(
            this.#sesionActual
        );

        return cliente ? cliente.obtenerInformacion() : null;
    }

    estaAutenticado() {
        return this.obtenerSesionActual() !== null;
    }

    desbloquearUsuario(usuario) {
        const cliente = this.#usuarioService.buscarPorUsuario(usuario);

        if (!cliente) {
            throw new Error("El usuario no existe.");
        }

        cliente.desbloquearCuenta();
        this.#usuarioService.actualizarEstado(cliente);

        return true;
    }
}