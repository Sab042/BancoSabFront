# Historias de Usuario
## Proyecto: Mi Plata – Sistema Bancario

**Proyecto:** Sistema Bancario Mi Plata  
**Tecnologías:** HTML5, CSS3 y JavaScript  
**Paradigma de programación:** Programación Orientada a Objetos (POO)

---

## 1. Módulo de registro y autenticación

### HU-01. Registro de clientes

**Como** visitante,  
**quiero** registrarme en el sistema ingresando mis datos personales y credenciales,  
**para** crear una cuenta de usuario y acceder a los servicios bancarios.

**Criterios de aceptación:**
- El formulario debe solicitar identificación, nombre completo, celular, nombre de usuario, contraseña y confirmación de contraseña.
- Todos los campos obligatorios deben validarse.
- El nombre de usuario y la identificación deben ser únicos.
- La contraseña y su confirmación deben coincidir.
- Después del registro, el sistema debe crear los productos bancarios correspondientes al cliente.
- El sistema debe mostrar un mensaje de confirmación o error.

### HU-02. Inicio de sesión

**Como** cliente registrado,  
**quiero** iniciar sesión con mi usuario y contraseña,  
**para** acceder de forma controlada a mis productos bancarios.

**Criterios de aceptación:**
- El sistema debe validar el usuario y la contraseña.
- Debe mostrar el contador de intentos fallidos.
- Después de tres intentos incorrectos, la cuenta debe quedar bloqueada.
- El sistema debe informar al usuario cuando se produzca el bloqueo.
- Si las credenciales son correctas, debe mostrar el panel bancario.
- Una cuenta bloqueada no debe permitir iniciar sesión.

### HU-03. Cierre de sesión

**Como** cliente autenticado,  
**quiero** cerrar mi sesión,  
**para** evitar que otra persona acceda a mis funcionalidades desde el mismo navegador.

**Criterios de aceptación:**
- El sistema debe finalizar la sesión activa.
- El usuario debe regresar a la página de inicio.
- Las vistas privadas deben requerir autenticación.
- La sesión debe quedar invalidada después del cierre.

### HU-04. Desbloqueo de usuarios

**Como** administrador autorizado,  
**quiero** desbloquear una cuenta que haya alcanzado el límite de intentos fallidos,  
**para** permitir que el cliente vuelva a ingresar al sistema.

**Criterios de aceptación:**
- El desbloqueo debe estar restringido a una acción autorizada.
- El contador de intentos fallidos debe reiniciarse.
- El estado de bloqueo debe actualizarse correctamente.
- El sistema debe informar que la cuenta fue desbloqueada.

---

## 2. Módulo de productos bancarios y transacciones

### HU-05. Consulta de saldos

**Como** cliente autenticado,  
**quiero** consultar los saldos de mis productos bancarios,  
**para** conocer el dinero disponible en mis cuentas.

**Criterios de aceptación:**
- El sistema debe mostrar las cuentas de ahorros y corriente del cliente.
- Debe mostrar el cupo disponible y la deuda de la tarjeta de crédito.
- Los valores deben actualizarse después de cada operación.
- El usuario solo debe visualizar sus propios productos.

### HU-06. Consignación de dinero

**Como** cliente autenticado,  
**quiero** consignar dinero en una de mis cuentas,  
**para** incrementar el saldo disponible.

**Criterios de aceptación:**
- El usuario debe seleccionar una cuenta de destino.
- El monto debe ser numérico y mayor que cero.
- El sistema debe actualizar el saldo después de una operación válida.
- La consignación debe registrarse en el historial.
- El sistema debe mostrar un mensaje de éxito o error.

### HU-07. Retiro de dinero

**Como** cliente autenticado,  
**quiero** retirar dinero de mis cuentas,  
**para** disponer de mis fondos respetando las reglas de cada producto bancario.

**Criterios de aceptación:**
- El usuario debe seleccionar una cuenta e ingresar el monto.
- El monto debe ser numérico y mayor que cero.
- La cuenta de ahorros no debe permitir retiros superiores al saldo disponible.
- La cuenta de ahorros debe aplicar el interés mensual del 1,5 % según las reglas definidas para el proyecto.
- La cuenta corriente debe permitir un sobregiro máximo del 20 % sobre el saldo positivo disponible.
- El saldo debe actualizarse después de cada retiro válido.
- El movimiento debe quedar registrado con fecha, tipo y valor.

### HU-08. Transferencia de dinero

**Como** cliente autenticado,  
**quiero** transferir dinero entre mis productos bancarios y a cuentas de otros clientes,  
**para** mover mis fondos de manera sencilla.

**Criterios de aceptación:**
- El usuario debe seleccionar una cuenta de origen y una de destino.
- El sistema debe permitir transferencias entre productos diferentes del mismo cliente.
- El sistema debe permitir transferencias a cuentas de otros usuarios.
- No se deben permitir transferencias al mismo producto.
- Se debe validar el saldo o el sobregiro permitido de la cuenta de origen.
- Las cuentas de origen y destino deben actualizarse correctamente.
- La operación debe registrarse en el historial de ambas partes.
- El sistema debe mostrar un mensaje de confirmación o error.

### HU-09. Compras con tarjeta de crédito

**Como** cliente autenticado,  
**quiero** registrar compras con mi tarjeta de crédito y seleccionar el número de cuotas,  
**para** conocer el valor de mis pagos mensuales y controlar mi deuda.

**Criterios de aceptación:**
- La tarjeta debe tener un cupo de crédito asignado.
- El monto de la compra debe ser mayor que cero.
- La compra no debe superar el cupo disponible.
- Para compras de hasta dos cuotas se debe aplicar una tasa del 0 %.
- Para compras de tres a seis cuotas se debe aplicar una tasa mensual del 1,9 %.
- Para compras de siete o más cuotas se debe aplicar una tasa mensual del 2,3 %.
- El sistema debe calcular y mostrar el valor de la cuota mensual.
- El sistema debe actualizar la deuda y el cupo disponible.
- Cada compra debe quedar registrada.

### HU-10. Consulta de movimientos

**Como** cliente autenticado,  
**quiero** consultar el historial de movimientos de mis productos bancarios,  
**para** revisar las operaciones realizadas.

**Criterios de aceptación:**
- El sistema debe almacenar los movimientos en un Array de JavaScript.
- Cada movimiento debe registrar fecha, hora, tipo de transacción y valor.
- Se debe registrar la cuenta de origen y la de destino cuando corresponda.
- El sistema debe mostrar el saldo resultante cuando aplique.
- Los movimientos deben mostrarse ordenados desde el más reciente hasta el más antiguo.
- El historial debe actualizarse después de cada operación.

---

## 3. Módulo de perfil y administración de usuarios

### HU-11. Actualización del perfil

**Como** cliente autenticado,  
**quiero** editar y guardar mis datos personales,  
**para** mantener mi información actualizada.

**Criterios de aceptación:**
- El sistema debe permitir modificar los datos personales registrados.
- Los campos deben validarse antes de guardar.
- Los cambios deben persistir después de recargar la aplicación.
- El sistema debe informar si la actualización fue exitosa.

### HU-12. Cambio de contraseña

**Como** cliente autenticado,  
**quiero** cambiar mi contraseña,  
**para** mantener el control de mis credenciales de acceso.

**Criterios de aceptación:**
- El sistema debe solicitar el nombre de usuario.
- Debe solicitar la contraseña actual.
- Debe permitir ingresar una nueva contraseña y confirmarla.
- La contraseña actual debe validarse.
- La nueva contraseña y su confirmación deben coincidir.
- El cambio debe guardarse correctamente.
- El sistema debe mostrar un mensaje de éxito o error.

### HU-13. Administración de usuarios (CRUD)

**Como** administrador autorizado,  
**quiero** crear, consultar, editar y eliminar usuarios,  
**para** gestionar los registros de clientes del sistema.

**Criterios de aceptación:**
- El sistema debe permitir agregar usuarios.
- Debe permitir consultar los usuarios registrados.
- Debe permitir editar los datos de un usuario.
- Debe permitir eliminar usuarios con confirmación previa.
- Debe validar los campos obligatorios y evitar usuarios duplicados.
- La eliminación debe gestionar correctamente los productos asociados.
- Los cambios deben persistir en el almacenamiento utilizado.

---

## 4. Módulo de interfaz y experiencia de usuario

### HU-14. Navegación responsiva

**Como** usuario del sistema,  
**quiero** navegar por una interfaz moderna, clara y adaptable a diferentes dispositivos,  
**para** utilizar las funcionalidades bancarias de manera cómoda.

**Criterios de aceptación:**
- La página debe adaptarse a computadores, tabletas y teléfonos móviles.
- La página de inicio debe presentar la identidad institucional de Mi Plata.
- Debe existir navegación hacia el registro y el inicio de sesión.
- Las páginas de registro e inicio de sesión deben conservar la identidad visual.
- El panel debe ofrecer acceso claro a las funcionalidades bancarias.
- Debe existir un footer con información corporativa y enlaces sociales.
- Los formularios, botones y textos deben ser legibles y accesibles.

### HU-15. Retroalimentación al usuario

**Como** usuario del sistema,  
**quiero** recibir mensajes claros después de realizar una acción,  
**para** saber si la operación fue exitosa o si debo corregir algún dato.

**Criterios de aceptación:**
- Las operaciones exitosas deben mostrar una confirmación.
- Los errores deben explicar el motivo del rechazo.
- Las advertencias deben informar sobre límites y restricciones.
- Las acciones sensibles deben solicitar confirmación cuando corresponda.
- Los mensajes deben ser visibles y coherentes con el diseño de la aplicación.

---

## 5. Consideraciones técnicas

El desarrollo debe cumplir las siguientes condiciones:

- Utilizar HTML5, CSS3 y JavaScript puro.
- Aplicar programación orientada a objetos.
- Implementar las clases Cliente, Cuenta, CuentaAhorros, CuentaCorriente y TarjetaCredito.
- Utilizar encapsulamiento mediante atributos privados de JavaScript.
- Aplicar herencia entre las clases de productos bancarios.
- Evidenciar polimorfismo mediante métodos sobrescritos.
- Separar las clases, los servicios y la interfaz en archivos independientes.
- Utilizar módulos JavaScript mediante import y export.
- Validar las reglas de negocio tanto en la interfaz como en las clases correspondientes.
- Utilizar almacenamiento local únicamente como mecanismo de persistencia para la simulación académica.
- Probar las funcionalidades en diferentes tamaños de pantalla.

**Nota:** La aplicación es un proyecto académico de simulación bancaria. El almacenamiento en el navegador no constituye un mecanismo de seguridad apropiado para una entidad financiera real.