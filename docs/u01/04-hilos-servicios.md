# 1.4 Hilos, servicios y procesos huérfanos o zombis

## La memoria de un proceso

Cada proceso tiene **su propio espacio de memoria**, que el sistema divide en cuatro zonas:

| Zona | Qué guarda |
|---|---|
| **Código** | Las instrucciones del programa. Solo se leen, no se modifican |
| **Datos** | Las variables **globales** y las **estáticas**, que existen mientras el proceso vive |
| **Montículo** (*heap*) | La memoria que el programa **pide mientras se ejecuta**: cada objeto o lista que se crea |
| **Pila** (*stack*) | Las **llamadas a funciones** en curso, con sus parámetros y sus variables locales |

El sistema **impide** que un proceso lea o escriba en la memoria de otro. Es una ventaja: si un programa falla, no estropea a los demás. Y un inconveniente: para que dos procesos se comuniquen hace falta pasar por el sistema operativo.

## PID, PPID y el árbol de procesos

Todo proceso lo **crea otro**, su **padre**. Cada proceso guarda el PID de quien lo creó, el **PPID** (*Parent PID*), y así se forma un **árbol de procesos**. En Linux el primero que arranca es `systemd` (o `init`), con PID 1, y todos descienden de él; en Windows, la mayoría de lo que abres con doble clic cuelga de `explorer.exe`.

En [1.1](01-proceso.md) viste cómo se crea un hijo y se consulta su PID; ahora interesa **de quién es hijo**. Esta demostración comprueba que el PPID del hijo es el PID del padre. Se ha ejecutado de verdad (Windows); los PID concretos no se muestran porque cambian cada vez.

```python
import multiprocessing
import os


def hijo(pid_padre):
    print("   Hijo: mi PID es distinto del del padre:", os.getpid() != pid_padre)
    print("   Hijo: mi PPID (el PID de mi padre) coincide con el PID del padre:", os.getppid() == pid_padre)


if __name__ == "__main__":
    proceso = multiprocessing.Process(target=hijo, args=(os.getpid(),))
    proceso.start()
    proceso.join()
    print("El padre sabe que el hijo terminó con código:", proceso.exitcode)
```

**Salida:**

```text
   Hijo: mi PID es distinto del del padre: True
   Hijo: mi PPID (el PID de mi padre) coincide con el PID del padre: True
El padre sabe que el hijo terminó con código: 0
```

!!! tip "Verlo en tu equipo (sin ejecutar aquí)"
    En Windows, el **Administrador de tareas**, en la pestaña *Detalles*, muestra el PID; el PPID se ve con `Get-CimInstance Win32_Process | Select-Object ProcessId, ParentProcessId, Name` en PowerShell. En Linux, `ps -ef` muestra PID y PPID, y `pstree` dibuja el árbol.

## Hilos

Un **hilo** (*thread*) es un **flujo de ejecución dentro de un proceso**. Todo proceso tiene al menos uno; puede tener varios, como un procesador de textos que atiende el teclado en un hilo, revisa la ortografía en otro y guarda una copia automática en un tercero.

| | **Proceso** | **Hilo** |
|---|---|---|
| **Memoria** | Propia y aislada | **Compartida** con los demás hilos del mismo proceso (solo la pila es propia) |
| **Coste de crearlo** | Alto: el sistema reserva memoria y crea su BCP | Bajo |
| **Comunicación** | Hace falta un mecanismo del sistema operativo | Directa, a través de variables compartidas |
| **Si falla** | No afecta a los demás procesos | Puede hacer caer **todo el proceso** |

Esta demostración lo enseña con una lista compartida: un **hilo** la modifica y se nota; un **proceso hijo** la modifica y el padre **no se entera**, porque tiene su propia copia en su propia memoria.

```python
import multiprocessing
import threading

datos = []


def tarea_hilo():
    datos.append("lo añade el hilo")


def tarea_proceso():
    datos.append("lo añade el proceso hijo")
    print("   Dentro del proceso hijo, datos =", datos)


if __name__ == "__main__":
    t = threading.Thread(target=tarea_hilo)
    t.start()
    t.join()
    print("Después del hilo:    ", datos)

    p = multiprocessing.Process(target=tarea_proceso)
    p.start()
    p.join()
    print("Después del proceso: ", datos)
```

**Salida:**

```text
   Dentro del proceso hijo, datos = ['lo añade el proceso hijo']
Después del hilo:     ['lo añade el hilo']
Después del proceso:  ['lo añade el hilo']
```

El hilo añadió su texto a la **misma** lista que ve el programa principal. El proceso hijo añadió el suyo a **otra** lista (en Windows el hijo ni siquiera hereda la lista del padre; en Linux partiría de una **copia**): en los dos casos, el padre no ve el cambio.

!!! note "¿Procesos o hilos?"
    Se usan **procesos** cuando se quiere **aislamiento** (que un fallo no tumbe al resto) o ejecutar **otro programa**. Se usan **hilos** cuando se quiere hacer varias cosas **dentro del mismo programa** compartiendo datos con rapidez; pero entonces hay que **sincronizar** los accesos, como se vio en la [sección crítica](03-planificador.md). Cambiar de un hilo a otro del mismo proceso también es más barato, porque no hay que cambiar de memoria.

## Servicios (demonios)

Un **servicio** (en Linux, **demonio** o *daemon*) es un proceso que:

* se ejecuta en **segundo plano**, sin ventana ni interacción con el usuario;
* normalmente **arranca con el sistema** y sigue funcionando aunque nadie haya iniciado sesión;
* **atiende peticiones**: imprimir, conexiones remotas, consultas a una base de datos, páginas web.

Ejemplos: la cola de impresión, el servidor SSH (`sshd`), un servidor web o MySQL.

| Sistema | Ver y gestionar servicios |
|---|---|
| Windows | `services.msc`, o en PowerShell `Get-Service` y `Restart-Service Spooler` |
| Linux | `systemctl status ssh`, `systemctl restart ssh` |
| macOS | `launchctl list` |

## Procesos huérfanos y zombis

Cuando un proceso hijo termina, deja un **código de salida** (0 si todo fue bien) que el padre tiene que **recoger**. Según quién termina primero y quién recoge, aparecen dos casos:

| Caso | Qué pasa | ¿Es un problema? |
|---|---|---|
| **Huérfano** | El **padre termina antes** que el hijo. El hijo sigue funcionando y el sistema lo **adopta**: pasa a ser hijo del proceso con PID 1 | No. Muchos servicios se lanzan así a propósito |
| **Zombi** | El **hijo ya ha terminado**, pero el padre **todavía no ha recogido** su código de salida | Un zombi no gasta CPU ni memoria, pero **ocupa un PID y una entrada** en la tabla de procesos. Si se acumulan miles, el sistema se queda sin PID. En Linux, `ps` lo muestra con la letra `Z` o con `<defunct>` |

!!! warning "No confundir"
    Un proceso que se queda **bloqueado para siempre** esperando un dato que nunca llega **no es un zombi**: sigue vivo y es un error del programa. El zombi, en cambio, **ya está muerto**; solo falta que su padre lo recoja (con `wait`, en Linux).

!!! info "Por qué no hay ejemplo ejecutado"
    Los zombis y los huérfanos son un comportamiento de Linux y macOS. En Windows no se pueden provocar de la misma forma, y esta web solo muestra lo que se ha ejecutado de verdad.

## Qué recordar

* La memoria de un proceso tiene **código, datos, montículo y pila**, y es **privada**.
* El **PPID** es el PID del padre; los procesos forman un **árbol**.
* Los **hilos** comparten la memoria del proceso; los procesos, no.
* Un **servicio** es un proceso en segundo plano que atiende peticiones.
* **Huérfano**: el padre terminó antes. **Zombi**: el hijo terminó y el padre no recogió su código.
