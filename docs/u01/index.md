# U1 · Procesos

<div class="narrador" data-slug="u01-index" data-voces="mujer:Mujer,hombre:Hombre,hombre2:Hombre 2" data-titulo="Resumen de la unidad 1"></div>

??? note "Leer el resumen"
    Cuando ejecutas un programa, el sistema operativo crea un proceso. Un programa es solo un archivo guardado en el disco, y un proceso es ese programa cuando ya está en marcha, con su memoria y sus datos.
    El sistema guarda de cada proceso una ficha, el BCP, con su identificador, su estado y por dónde va. Esa ficha le permite pararlo y volver a arrancarlo justo donde lo dejó.
    Un proceso no está siempre trabajando. Unas veces espera su turno, otras espera algo que todavía no ha llegado, como un dato del teclado o un archivo ocupado. Esto lo vemos con los estados y las transiciones entre ellos.
    Y como hay muchos procesos y pocas CPU, alguien tiene que decidir cuál ejecuta ahora. Esa es la tarea del planificador, y de eso trata la unidad siguiente.
    Lee la teoría por orden, haz los ejercicios y, si te atascas, vuelve a este resumen.


Cuando ejecutas un programa, el sistema operativo crea un **proceso**. Con muchos procesos a la vez y una sola CPU (o pocas), hace falta alguien que organice quién usa qué y cuándo. Esta unidad explica **qué es un proceso**, **qué información guarda el sistema de cada uno**, **por qué estados pasa** y **quién decide** el siguiente.

## Teoría

1. [Qué es un proceso](01-proceso.md)
2. [Estados y transiciones](02-estados.md)
3. [Planificador, despachador y sincronización](03-planificador.md)
4. [Hilos, servicios y procesos huérfanos o zombis](04-hilos-servicios.md)
5. [Concurrencia, paralelismo y distribución](05-concurrencia.md)

## Antes de empezar: qué debes dominar

* Qué es un sistema operativo y qué hace (reparte la CPU, la memoria y los dispositivos entre los programas).
* La diferencia entre un programa guardado en el disco y un programa que se está ejecutando.

## Ejercicios de la unidad

Hay [8 ejercicios](ejercicios.md) de esta unidad.

## Antes de pasar a los ejercicios

Cuando hayas leído y practicado la teoría, marca la casilla para **desbloquear** los ejercicios:

<div class="ej-check" data-unit="u01"></div>
