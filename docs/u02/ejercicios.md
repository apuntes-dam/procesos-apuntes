# P2 · Ejercicios de planificación

<div class="ej-gate" data-unit="u02" data-nombre="U2 · Planificación de la CPU"></div>

Diez ejercicios con cinco procesos cada uno: los cinco primeros son los de clase y del P2.6 al P2.10 son nuevos, del mismo estilo (con la CPU libre en medio, todos llegando a la vez, empates...). Resuélvelos **a mano o en una hoja de cálculo** y comprueba el resultado con el [simulador](05-simulador.md) solo al final. Puedes dibujar el diagrama en la [plantilla de hoja de cálculo](../assets/plantilla-procesos.xlsx), que calcula T, E e I contando las letras. En todos, **mayor número = mayor prioridad** y los empates se resuelven por orden de llegada.

## Ejercicio P2.1

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* SJF
* Prioridad no apropiativa
* Round Robin (q = 3)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 3 | 5 |
| P2 | 1 | 5 | 1 |
| P3 | 2 | 1 | 2 |
| P4 | 3 | 12 | 6 |
| P5 | 4 | 2 | 1 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.1">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.2

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* SJF
* HRN
* Round Robin (q = 2)
* SRT

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 1 | 5 | 5 |
| P2 | 1 | 11 | 2 |
| P3 | 2 | 1 | 2 |
| P4 | 3 | 6 | 3 |
| P5 | 4 | 2 | 1 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.2">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.3

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* Prioridad no apropiativa
* SJF
* HRN
* Round Robin (q = 4)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 2 | 1 |
| P2 | 2 | 1 | 2 |
| P3 | 2 | 3 | 7 |
| P4 | 3 | 6 | 3 |
| P5 | 5 | 2 | 1 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.3">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== Prioridad no apropiativa ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.4

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* HRN
* SJF
* SRT
* Round Robin (q = 2)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 1 | 1 |
| P2 | 3 | 1 | 2 |
| P3 | 3 | 11 | 7 |
| P4 | 4 | 2 | 3 |
| P5 | 5 | 2 | 1 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.4">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== HRN ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.5

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* Prioridad no apropiativa
* SJF
* HRN
* Round Robin (q = 4)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 1 | 1 |
| P2 | 2 | 3 | 2 |
| P3 | 2 | 3 | 5 |
| P4 | 3 | 2 | 3 |
| P5 | 5 | 2 | 1 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.5">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== Prioridad no apropiativa ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.6

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* HRN
* Prioridad apropiativa
* Round Robin (q = 3)
* SRT

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 4 | 2 |
| P2 | 1 | 3 | 4 |
| P3 | 2 | 1 | 1 |
| P4 | 4 | 5 | 3 |
| P5 | 6 | 2 | 5 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.6">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.7

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* SJF
* Prioridad no apropiativa
* Round Robin (q = 2)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 2 | 3 |
| P2 | 1 | 1 | 1 |
| P3 | 9 | 4 | 2 |
| P4 | 10 | 2 | 5 |
| P5 | 11 | 3 | 4 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.7">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.8

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* SJF
* SRT
* HRN
* Round Robin (q = 5)
* Prioridad no apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 6 | 1 |
| P2 | 1 | 2 | 4 |
| P3 | 2 | 4 | 2 |
| P4 | 3 | 1 | 5 |
| P5 | 4 | 3 | 3 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.8">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== SJF ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.9

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* SJF
* Prioridad no apropiativa
* Round Robin (q = 4)
* HRN

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 5 | 3 |
| P2 | 0 | 2 | 1 |
| P3 | 0 | 8 | 4 |
| P4 | 0 | 3 | 2 |
| P5 | 0 | 1 | 5 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.9">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.10

**Planificación de 5 procesos.** Resuelve con estos algoritmos:

* FCFS
* SRT
* HRN
* Round Robin (q = 3)
* Prioridad apropiativa

| Proceso | Ciclo de llegada | Ciclos de ejecución | Prioridad |
|---|---|---|---|
| P1 | 0 | 3 | 2 |
| P2 | 2 | 3 | 2 |
| P3 | 2 | 2 | 3 |
| P4 | 4 | 4 | 1 |
| P5 | 4 | 1 | 3 |

Para **cada algoritmo**: dibuja el **diagrama de Gantt** con la notación de clase (**l** llegada, **e** espera, **x** ejecución; en una hoja de cálculo o a mano) y calcula el instante de finalización (tf), el **tiempo de servicio (T)**, el **tiempo de espera (E)** y el **índice de servicio (I)** de cada proceso, con las **medias** de T, E e I. Al final, indica **qué algoritmo es el mejor** para estos procesos y por qué. Recuerda: mayor número = mayor prioridad.

<details class="sol" data-key="procesos/u02/P2.10">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>== FCFS ==
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.11

**Tiempo de respuesta.** Para estos procesos calcula el **tiempo de respuesta** (R = instante en que usa la CPU por primera vez − llegada) de cada uno y la media con **FCFS**, **SRT** y **Round Robin (q = 2)**. Compara con el tiempo medio de espera. ¿Qué algoritmo es mejor para un programa interactivo?

| Proceso | Ciclo de llegada | Ciclos de ejecución |
|---|---|---|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 1 |
| P4 | 3 | 2 |


<details class="sol" data-key="procesos/u02/P2.11">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>FCFS: R = P1: 0, P2: 4, P3: 6, P4: 6  →  media 4  (E media 4)
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P2.12

**Cambios de contexto.** Para estos procesos cuenta los **cambios de contexto** (cada vez que la CPU pasa a un proceso distinto del anterior) con **FCFS** y con **Round Robin de quantum 4, 2 y 1**, y calcula la espera media de cada uno. ¿Qué relación hay entre el quantum, los cambios de contexto y la espera? ¿Cuál elegirías?

| Proceso | Ciclo de llegada | Ciclos de ejecución |
|---|---|---|
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 4 |
| P4 | 4 | 2 |


<details class="sol" data-key="procesos/u02/P2.12">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>FCFS: 3 cambios de contexto, E media = 4,5
... (resto de la solución bloqueado)</code></pre></div>
</details>
