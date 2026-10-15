# U2 · Planificación de la CPU

<div class="narrador" data-slug="u02-index" data-voces="mujer:Mujer,hombre:Hombre,hombre2:Hombre 2" data-titulo="Resumen de la unidad 2"></div>

??? note "Leer el resumen"
    Esta unidad responde a una pregunta: si hay muchos procesos preparados y una sola CPU, a cuál le toca. Las reglas que lo deciden son los algoritmos de planificación.
    Para compararlos, de cada proceso se calculan tres tiempos. El tiempo de servicio, que es lo que pasa desde que llega hasta que termina. El tiempo de espera, que es lo que estuvo sin ejecutarse. Y el índice de servicio, que dice qué parte de ese tiempo estuvo trabajando de verdad.
    Todo se dibuja en un diagrama de Gantt, donde cada letra es una unidad de tiempo, y de ahí sacas las medias.
    Verás dos familias. Los no apropiativos, como FCFS y SJF, que dejan terminar al proceso que ya está en la CPU. Y los apropiativos, como Round Robin y SRT, que pueden quitársela antes de que acabe.
    La unidad trae un simulador. Resuelve primero el ejercicio a mano y usa el simulador para comprobarlo.


Hay muchos procesos preparados y una sola CPU: ¿a cuál le toca? Los **algoritmos de planificación** son las reglas que lo deciden. Cada uno se evalúa con unos **tiempos** (servicio, espera e índice de servicio) y se representa con un **diagrama de Gantt**. Esta unidad enseña a resolver cada algoritmo a mano y tiene un **simulador** para comprobar el resultado.

## Teoría

1. [Cómo se calcula: la tabla y el diagrama de Gantt](01-calculos.md)
2. [Algoritmos no apropiativos: FCFS, SJF, prioridad y HRN](02-no-apropiativos.md)
3. [Algoritmos apropiativos: Round Robin, SRT y prioridad](03-apropiativos.md)
4. [Comparar los algoritmos](04-comparar.md)
5. [Simulador](05-simulador.md)

## Antes de empezar: qué debes dominar

* La [unidad 1](../u01/index.md): qué es un proceso y sus estados (sobre todo, la transición de **preparado a ejecución** y la de **ejecución a preparado**).
* Operar con fracciones sencillas: el índice de servicio se calcula como una fracción.

## Ejercicios de la unidad

Hay [12 ejercicios](ejercicios.md) de esta unidad, con cinco procesos cada uno.

## Antes de pasar a los ejercicios

Cuando hayas leído y practicado la teoría, marca la casilla para **desbloquear** los ejercicios:

<div class="ej-check" data-unit="u02"></div>
