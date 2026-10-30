# Chuleta

## Fórmulas

| Magnitud | Fórmula |
|---|---|
| Tiempo de servicio | `T = tf − ti` |
| Tiempo de espera | `E = T − t` |
| Índice de servicio | `I = t / T` |
| Prioridad en HRN | `P = (W + t) / t` (W = tiempo esperando) |
| Medias | suma de cada columna entre el número de procesos |

## Los siete algoritmos

| Algoritmo | Tipo | Quién entra en la CPU |
|---|---|---|
| **FCFS** | No apropiativo | El que **llegó antes** |
| **SJF** | No apropiativo | El de **menor tiempo de ejecución** |
| **Prioridad** | No apropiativo | El de **mayor prioridad** |
| **HRN** | No apropiativo | El de **mayor P** = (W + t) / t |
| **Round Robin** | Apropiativo | El **primero de la cola**, durante un quantum |
| **SRT** | Apropiativo | El de **menor tiempo restante** (expulsa si llega uno menor) |
| **Prioridad apropiativa** | Apropiativo | El de **mayor prioridad** (expulsa si llega uno mayor) |

## Reglas de desempate

* Empate entre procesos preparados → el que **llegó antes** (y, si llegaron a la vez, el que está primero en la lista).
* Un proceso que ya está en la CPU **no se expulsa por un empate**.
* En Round Robin, los que llegan en el instante en que acaba un quantum **entran en la cola antes** que el proceso expulsado.

## Los cinco estados

**Inicio → Preparado** (1: se admite) · **Preparado → En ejecución** (2: le toca) · **En ejecución → Preparado** (3: fin de turno o expulsión) · **En ejecución → Bloqueado** (4: espera datos) · **Bloqueado → Preparado** (5: ocurre el evento) · **En ejecución → Terminado** (6: acaba).

## Mejor algoritmo

El de **menor T medio**, **menor E medio** y **mayor I medio**.

## Procesos desde el código

| Quiero... | Java / Kotlin | Python | C# |
|---|---|---|---|
| Mi PID | `ProcessHandle.current().pid()` | `os.getpid()` | `Process.GetCurrentProcess().Id` |
| Lanzar un hijo | `new ProcessBuilder(prog, arg...).start()` | `subprocess.Popen([prog, arg...])` | `Process.Start(prog, args)` |
| ¿Sigue vivo? | `hijo.isAlive()` | `proceso.poll() is None` | `!hijo.HasExited` |
| Esperar y recoger el código | `hijo.waitFor()` | `proceso.wait()` | `hijo.WaitForExit()` + `ExitCode` |
| Argumentos del hijo | `args` | `sys.argv[1:]` | `args` |
| Terminar con un código | `System.exit(1)` | `sys.exit(1)` | `Environment.Exit(1)` |

Reglas: **preparar no es lanzar** (hasta `start()` no hay hijo) · guarda siempre el `Process` · programa y argumentos, **cada uno aparte** · un hijo Java necesita `-cp` con `System.getProperty("java.class.path")` · código **0 = bien**, otro = error, y hay que terminar con `exit` para que cuente. Más en la [unidad 3](u03/index.md).
