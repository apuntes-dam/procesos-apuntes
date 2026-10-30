# Procesos y planificación de la CPU

Apuntes y ejercicios sobre cómo el **sistema operativo** gestiona los **procesos**: qué es un proceso, por qué estados pasa mientras vive y cómo decide el **planificador** cuál de ellos usa la CPU en cada momento. Incluye un **simulador** que calcula el diagrama de Gantt y los tiempos de cada algoritmo.

!!! info "Cómo está organizado"
    Tres unidades, de menos a más. Cada unidad tiene su teoría y, debajo, sus **ejercicios**, que se desbloquean al marcar la unidad como leída. Las soluciones están **bloqueadas**: solo se ve el comienzo como ejemplo.

| Unidad | Contenido |
|---|---|
| [U1 · Procesos](u01/index.md) | Qué es un proceso, el bloque de control (BCP), los estados y sus transiciones, los tipos de planificador y la sincronización |
| [U2 · Planificación de la CPU](u02/index.md) | Los siete algoritmos (FCFS, SJF, prioridad, HRN, Round Robin y SRT), el diagrama de Gantt, los tiempos T, E e I, y el simulador |
| [U3 · Procesos desde el código](u03/index.md) | Crear y controlar procesos con código, paso a paso: el PID, lanzar un hijo, esperarlo, pasarle argumentos y leer su código de salida (Java, Kotlin, Python y C#) |
| [Chuleta](chuleta.md) | Fórmulas, reglas de desempate y cómo resolver un ejercicio paso a paso |

!!! tip "Los números están comprobados"
    Todos los ejemplos resueltos de la web los calcula un **programa** que se ha comprobado contra los ejemplos del tema (FCFS, SJF, prioridad, HRN, Round Robin, SRT y prioridad apropiativa dan exactamente las tablas de clase). El [simulador](u02/05-simulador.md) usa ese mismo algoritmo, y se ha comprobado que da lo mismo que el programa en más de mil casos.

!!! note "Una convención importante: la prioridad"
    En los ejemplos de clase, **un número mayor significa más prioridad**. Algunos libros y sistemas lo hacen al revés (el 1 es la prioridad más alta). En esta web se sigue la de clase; el simulador permite cambiarla con una casilla.

!!! note "Empieza por aquí"
    Si no has visto nada de procesos, empieza por [1.1 Qué es un proceso](u01/01-proceso.md). Si ya sabes lo básico y solo quieres practicar los algoritmos, ve a la [U2](u02/index.md). Si quieres **crear procesos con tu propio código**, ve a la [U3](u03/index.md).
