# 1.1 Qué es un proceso

Un **programa** es un conjunto de instrucciones guardado en un archivo. Un **proceso** es **un programa en ejecución**: ese programa cargado en memoria, con su estado actual y los recursos que está usando. Del mismo programa puede haber **varios procesos a la vez** (por ejemplo, dos ventanas del mismo editor): cada uno tiene su propio estado, aunque las instrucciones sean las mismas.

!!! info "Una analogía"
    Una **receta** es el programa; **cocinarla ahora mismo**, con los ingredientes ya sacados y la cazuela al fuego, es el proceso. Si dos personas cocinan la misma receta, hay dos procesos distintos.

Cuando se ejecutan varios procesos **de forma concurrente** (a la vez, o alternándose tan rápido que lo parece), todos necesitan que el sistema les dé recursos: tiempo de CPU, memoria, archivos, dispositivos. El sistema operativo, usando la CPU, se encarga de **sincronizar y repartir** esos recursos en un orden adecuado.

## El bloque de control de proceso (BCP)

Para gestionar cada proceso, el sistema guarda una estructura de datos llamada **bloque de control de proceso (BCP)**. Contiene:

| Dato | Para qué sirve |
|---|---|
| **Estado actual** | En qué estado está: inicio, preparado, en ejecución, bloqueado o terminado (ver [1.2](02-estados.md)) |
| **Identificador (PID)** | Un número que identifica al proceso; con él se le puede consultar o detener |
| **Prioridad** | Qué importancia tiene frente a otros. La asigna el sistema según cómo está diseñado y puede cambiarla el administrador |
| **Ubicación en memoria** | En qué zona de la memoria está. Lo normal es que cada proceso tenga su zona independiente; en el peor caso se comparten zonas con otros |
| **Recursos utilizados** | Qué recursos de hardware y software necesita y está usando. Se ponen a su disposición en cuanto empieza a ejecutarse |

## Verlo con procesos reales

Este programa de Python muestra su propio PID, crea un **proceso hijo**, consulta si sigue en ejecución y lo termina. Se ha ejecutado de verdad en Windows; los números de PID **serán otros en tu equipo**, porque el sistema los asigna cada vez.

```python
import os, subprocess, sys

print("Mi PID:", os.getpid())
hijo = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(30)"])
print("PID del hijo:", hijo.pid, "| ¿sigue en ejecución?", hijo.poll() is None)
hijo.terminate()
hijo.wait()
print("Tras terminate: ¿sigue en ejecución?", hijo.poll() is None, "| código de salida:", hijo.returncode)
```

**Salida:**

```text
Mi PID: 5588
PID del hijo: 33952 | ¿sigue en ejecución? True
Tras terminate: ¿sigue en ejecución? False | código de salida: 1
```

Cada proceso tiene su **PID**, y el sistema sabe si el hijo sigue vivo (`poll()` devuelve `None` mientras no ha terminado). Al terminarlo, el sistema libera sus recursos y solo queda su **código de salida**.

!!! tip "Verlo en tu equipo (sin ejecutar aquí)"
    En Windows, el **Administrador de tareas** (`Ctrl+Mayús+Esc`) muestra los procesos con su PID, y en PowerShell, `Get-Process` los lista y `Stop-Process -Id <PID>` detiene uno. En Linux y macOS, `ps` y `kill <PID>`. Estos comandos se explican con más detalle en la asignatura de Sistemas Informáticos.

## Qué recordar

* Programa = archivo con instrucciones; **proceso = programa en ejecución**.
* Cada proceso tiene un **BCP** con su estado, PID, prioridad, ubicación en memoria y recursos.
* El sistema reparte los recursos entre los procesos que se ejecutan de forma **concurrente**.
