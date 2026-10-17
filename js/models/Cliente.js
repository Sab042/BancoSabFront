export default class Cliente {

    // Atributos privados: solo se modifican desde la clase
    #id;
    #identificacion;
    #nombre;
    #celular;
    #usuario;
    #password;
    #bloqueado;
    #intentosFallidos;

    constructor(
        id,
        identificacion,
        nombre,
        celular,
        usuario,
        password
    ) {
        if (
            !id ||
            !identificacion ||
            !nombre ||
            !celular ||
            !usuario ||
            !password
        ) {
            throw new Error(
                "Todos los datos del cliente son obligatorios."
            );
        }

        if (password.length < 6) {
            throw new Error(
                "La contraseña debe tener al menos 6 caracteres."
            );
        }

        this.#id = id;
        this.#identificacion = identificacion;
        this.#nombre = nombre.trim();
        this.#celular = celular;
        this.#usuario = usuario.trim();
        this.#password = password;
        this.#bloqueado = false;
        this.#intentosFallidos = 0;
    }

    // Getters: permiten consultar los atributos privados

    get id() {
        return this.#id;
    }

    get identificacion() {
        return this.#identificacion;
    }

    get nombre() {
        return this.#nombre;
    }

    get celular() {
        return this.#celular;
    }

    get usuario() {
        return this.#usuario;
    }

    get bloqueado() {
        return this.#bloqueado;
    }

    get intentosFallidos() {
        return this.#intentosFallidos;
    }

    // Actualizar los datos personales del cliente

    actualizarPerfil(nombre, celular) {
        if (!nombre || nombre.trim().length < 3) {
            throw new Error(
                "El nombre debe tener al menos 3 caracteres."
            );
        }

        if (!celular || celular.trim().length < 7) {
            throw new Error(
                "Ingresa un número de celular válido."
            );
        }

        this.#nombre = nombre.trim();
        this.#celular = celular.trim();

        return true;
    }

    // Validar la contraseña ingresada

    verificarPassword(password) {
        return this.#password === password;
    }

    // Cambiar la contraseña del cliente

    cambiarPassword(passwordActual, passwordNueva) {
        if (!this.verificarPassword(passwordActual)) {
            throw new Error(
                "La contraseña actual es incorrecta."
            );
        }

        if (!passwordNueva || passwordNueva.length < 6) {
            throw new Error(
                "La nueva contraseña debe tener al menos 6 caracteres."
            );
        }

        if (passwordActual === passwordNueva) {
            throw new Error(
                "La nueva contraseña debe ser diferente a la actual."
            );
        }

        this.#password = passwordNueva;

        return true;
    }

    // Registrar un intento fallido de inicio de sesión

    registrarFallo() {
        if (this.#bloqueado) {
            throw new Error(
                "La cuenta está bloqueada."
            );
        }

        this.#intentosFallidos++;

        if (this.#intentosFallidos >= 3) {
            this.bloquearCuenta();
        }

        return this.#intentosFallidos;
    }

    // Reiniciar los intentos después de iniciar sesión correctamente

    reiniciarIntentos() {
        this.#intentosFallidos = 0;
    }

    // Bloquear el acceso del cliente

    bloquearCuenta() {
        this.#bloqueado = true;
    }

    // Desbloquear la cuenta mediante una acción autorizada

    desbloquearCuenta() {
        this.#bloqueado = false;
        this.#intentosFallidos = 0;
    }

    // Representación pública del cliente
    // Nunca incluye la contraseña

    obtenerInformacion() {
        return {
            id: this.#id,
            identificacion: this.#identificacion,
            nombre: this.#nombre,
            celular: this.#celular,
            usuario: this.#usuario,
            bloqueado: this.#bloqueado,
            intentosFallidos: this.#intentosFallidos
        };
    }
}