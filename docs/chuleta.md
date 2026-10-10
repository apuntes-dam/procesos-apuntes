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

## Los tres estados

**En ejecución → Bloqueado** (1: espera datos) · **En ejecución → Preparado** (2: fin de turno) · **Preparado → En ejecución** (3: le toca) · **Bloqueado → Preparado** (4: ocurre el evento).

## Mejor algoritmo

El de **menor T medio**, **menor E medio** y **mayor I medio**.
