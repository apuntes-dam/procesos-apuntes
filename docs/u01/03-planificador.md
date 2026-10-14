# 1.3 Planificador, despachador y sincronización

## El planificador

El **planificador** es la parte del sistema operativo que **asigna los recursos** del sistema para conseguir sus objetivos. En lo que a la CPU se refiere, decide **qué proceso de los preparados pasa al estado de ejecución**. Hay tres tipos, según el plazo:

| Planificador | Qué decide |
|---|---|
| **A largo plazo** | Cuál es el **próximo trabajo** que se va a ejecutar. Este nivel solo existe en los sistemas de **proceso por lotes**, donde se decide según las necesidades de recursos y su disponibilidad. En los sistemas de **tiempo compartido** su única misión es **cargar en memoria** los programas que se quieren ejecutar: es decir, **crea los procesos** |
| **A medio plazo** | Si un proceso **bloqueado o suspendido** debe sacarse **temporalmente** de la memoria. Mueve procesos entre la memoria principal y el disco: es lo que se llama **swapping** |
| **A corto plazo** | **Asigna la CPU** entre los procesos preparados que están en memoria. Es el que ejecutan los algoritmos de la [unidad 2](../u02/index.md) |

!!! info "El despachador"
    El **despachador** es el módulo que **entrega la CPU** al proceso elegido por el planificador a corto plazo: guarda el estado del proceso que sale y carga el del que entra (lo que se llama *cambio de contexto*). El planificador **decide**; el despachador **ejecuta** esa decisión.

!!! info "¿Y si se acaba la memoria RAM?"
    Si hay más procesos de los que caben en la RAM, el sistema usa la **memoria virtual**: **mueve al disco** las partes de los procesos que se usan poco (la zona de **intercambio** o *swap*; en Windows, el archivo de paginación) y las trae de vuelta cuando hacen falta. Permite ejecutar más programas de los que caben, pero el disco es **miles de veces más lento** que la RAM: si se abusa, el sistema se pasa el tiempo moviendo datos y todo va muy lento. Esa situación se llama **hiperpaginación** (*thrashing*).

## Sincronización de procesos

La **sincronización** consigue que los procesos se ejecuten **en el orden adecuado y sin interferir** entre ellos. Suele hacer falta en la **multiprogramación**, cuando varios programas necesitan usar **la misma información** (por ejemplo, las mismas variables en memoria).

La parte del programa en la que se accede a esos datos compartidos se llama **sección crítica**. En esa fase el sistema tiene que **sincronizar** los procesos para que **no puedan acceder a los mismos datos a la vez** y modificarlos de forma que se estropeen.

!!! info "Un ejemplo"
    Dos procesos suman un ingreso al **mismo saldo**: ambos leen 100 €, cada uno suma 10 € y escribe 110 €. El saldo debería ser 120 €, pero queda en 110 €: **se ha perdido un ingreso**. La lectura y la escritura del saldo es la sección crítica: mientras un proceso está dentro, el otro tiene que esperar.

## Qué recordar

* El planificador **elige**; el despachador **entrega** la CPU.
* Tres niveles: **largo** (crea procesos), **medio** (swapping) y **corto** (reparte la CPU).
* La **sección crítica** es donde se tocan datos compartidos; hay que impedir que dos procesos entren a la vez.
