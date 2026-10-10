# 2.4 Comparar los algoritmos

Con los mismos cuatro procesos (A, B, C y D de [2.1](01-calculos.md)), estas son las tres medias de cada algoritmo, calculadas por el programa:

| Algoritmo | Tiempo medio de servicio (T) | Tiempo medio de espera (E) | Índice de servicio medio (I) |
|---|---|---|---|
| FCFS | 2,75 | 1 | 0,625 |
| SJF | 2,5 | 0,75 | 0,75 |
| HRN | 2,75 | 1 | 0,625 |
| Round Robin (q = 2) | 2,75 | 1 | 0,6875 |
| SRT | 2,5 | 0,75 | 0,75 |
| Prioridad no apropiativa (con las prioridades del ejemplo) | 3 | 1,25 | 0,675 |
| Prioridad apropiativa (con las prioridades del ejemplo) | 3 | 1,25 | 0,675 |

!!! info "Cómo leer la tabla"
    **Menor T y menor E** es mejor; **mayor I** es mejor. Con estos datos, **SJF y SRT** consiguen la menor espera media (0,75) y la mayor eficiencia (índice medio de 0,75), y **FCFS, HRN y Round Robin** quedan algo peor. La prioridad depende de qué prioridades se hayan asignado, así que no se puede comparar en general con los demás: **con otros procesos, el orden puede cambiar**.

| Algoritmo | Ventaja | Inconveniente |
|---|---|---|
| **FCFS** | Muy sencillo y justo con el orden de llegada | Un proceso largo retrasa a todos los demás |
| **SJF** | Tiempo medio de espera bajo | Los procesos largos pueden no ejecutarse nunca (**inanición**); hay que conocer el tiempo de ejecución de antemano |
| **Prioridad** | Permite dar preferencia a lo importante | Los procesos de prioridad baja pueden sufrir **inanición** |
| **HRN** | Como SJF, pero la espera sube la prioridad: **evita la inanición** | Hay que calcular `P` para cada proceso cada vez |
| **Round Robin** | **Reparto equitativo** por turnos; bueno para sistemas interactivos | Muchos cambios de contexto si el quantum es pequeño; tiempos medios más altos |
| **SRT** | Aprovecha que llegue un proceso corto | Puede expulsar muchas veces; mismo riesgo de inanición que SJF |

!!! note "Para practicar"
    Cambia los datos en el [simulador](05-simulador.md) y comprueba cómo varía cada media.
