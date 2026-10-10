# 2.1 Cómo se calcula: la tabla y el diagrama de Gantt

## Apropiativo y no apropiativo

Los algoritmos se clasifican según lo que pasa cuando **llega un proceso nuevo** mientras otro usa la CPU:

| Tipo | Qué ocurre | Algoritmos |
|---|---|---|
| **No apropiativos** | Cuando un proceso toma la CPU, **no la suelta hasta terminar** | FCFS, SJF, prioridad no apropiativa, HRN |
| **Apropiativos** | Un proceso en ejecución **puede ser interrumpido** por otro | Round Robin, SRT, prioridad apropiativa |

## Los datos de cada proceso

Cada proceso se describe con:

* **Ciclo de llegada (ti)**: cuándo llega a la cola de preparados.
* **Ciclos de ejecución (t)**: cuántos ciclos de CPU necesita en total.
* **Prioridad**: solo en los algoritmos de prioridad.

## Lo que se calcula

Para cada proceso, cuando termina en el instante **tf**:

| Magnitud | Fórmula | Qué mide |
|---|---|---|
| **T**: tiempo de servicio | `T = tf − ti` | Todo el tiempo que el proceso pasa en el sistema, desde que llega hasta que acaba |
| **E**: tiempo de espera | `E = T − t` | El tiempo que ha estado **esperando** sin usar la CPU |
| **I**: índice de servicio | `I = t / T` | La **eficiencia**: 1 significa que nunca esperó; cuanto más cerca de 0, peor |

Se rellena una tabla con una fila por proceso y, al final, las **medias** de T, E e I.

!!! info "¿Qué algoritmo es mejor?"
    El mejor para un conjunto de procesos es el que tiene **menor tiempo medio de servicio**, **menor tiempo medio de espera** y **mayor eficiencia** (índice de servicio medio). A veces no coinciden: por eso se comparan las tres medias.

## El diagrama de Gantt

Es una gráfica con **el tiempo en horizontal** y **un proceso por fila**. En clase se dibuja en una hoja de cálculo con tres letras, que muestran **todo lo que le pasa a cada proceso**, no solo cuándo usa la CPU:

| Letra | Significa | Dónde aparece |
|---|---|---|
| **l** | **Llegada** | Una sola vez, en la columna del instante en que llega el proceso |
| **e** | **Espera** | Una por cada unidad de tiempo que el proceso espera en la cola de preparados |
| **x** | **Ejecución** | Una por cada unidad de tiempo que el proceso usa la CPU |

Cada letra ocupa **una columna**, y la columna lleva el número del instante en que **acaba** esa unidad de tiempo. Por ejemplo, un proceso que llega en el instante 1, espera dos unidades y se ejecuta tres se dibuja `l e e x x x` en las columnas 1 a 6, y termina (tf) en el instante 6.

Como los procesos se dibujan **uno por fila** (el último arriba y el primero abajo, con el eje del tiempo debajo), el diagrama se lee de dos formas: por filas (qué le pasa a cada proceso) y por columnas (qué proceso tiene la CPU en cada instante: en cada columna solo puede haber **una `x`**).

!!! tip "Del diagrama a los tiempos"
    Contando letras de la fila de un proceso: **t** = número de `x`, **E** = número de `e` y **T** = número de `e` más número de `x`. Si el diagrama está bien hecho, `T − E = t` siempre. Es una buena forma de **comprobar** un ejercicio.

## Reglas que se aplican siempre

* **Empates**: se atiende primero al que **llegó antes** (FCFS). Si hay un empate entre el proceso en ejecución y otro que llega, **no se expulsa** al que ya está en la CPU.
* **Prioridad**: en esta web, **mayor número = más prioridad**, como en el ejemplo de clase.
* Si en un instante **no hay ningún proceso preparado**, la CPU espera hasta la siguiente llegada.

## Resolver un ejercicio paso a paso

1. Ordena los procesos por **instante de llegada**.
2. Avanza el reloj. En cada **decisión** (la CPU queda libre, o llega un proceso en un algoritmo apropiativo), mira **qué procesos están preparados** y aplica la regla del algoritmo.
3. Anota en el Gantt las letras de cada proceso (`l` al llegar, `e` mientras espera y `x` mientras usa la CPU) y apunta el **tf** de cada proceso al terminar.
4. Calcula **T**, **E** e **I** de cada uno y las **medias**.
5. Comprueba el diagrama: en cada fila hay tantas `x` como ciclos de ejecución, y en cada columna **una sola `x`**. Si no hay huecos, el número total de `x` es la suma de los tiempos de ejecución.

Todos los ejemplos de las páginas siguientes usan **los mismos cuatro procesos**, para poder comparar los algoritmos:

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) |
|---|---|---|
| A | 0 | 3 |
| B | 2 | 1 |
| C | 3 | 2 |
| D | 4 | 1 |
