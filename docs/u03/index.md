# U3 · Procesos desde el código

<div class="narrador" data-slug="u03-index" data-voces="mujer:Mujer,hombre:Hombre,hombre2:Hombre 2" data-titulo="Resumen de la unidad 3"></div>

??? note "Leer el resumen"
    Hasta ahora has visto los procesos por fuera. En esta unidad los creas tú, desde un programa.
    Es una ruta de diez pasos, y cada uno añade una sola idea. Empiezas por mirar tu propio proceso y su PID. Después lanzas otro programa, el hijo, y te quedas con él para poder preguntarle cosas. Aprendes a esperar a que termine y a recoger su código de salida, donde cero significa que todo ha ido bien.
    Más adelante, el hijo es una clase tuya, y descubres por qué hay que decirle dónde están sus clases. Después le pasas datos con argumentos, y el hijo avisa del resultado con su código de salida.
    El lenguaje es solo la herramienta. Los ejemplos están en Java, Kotlin, Python y C#, y todos se han ejecutado de verdad.
    En cada paso hay una pregunta de comprensión. Contéstala antes de mirar la respuesta, y haz los ejercicios sin copiar el ejemplo.


Hasta ahora has visto los procesos **por fuera**: qué son, por qué estados pasan y cómo reparte la CPU el planificador. En esta unidad los **creas y controlas tú**, desde un programa: lanzas otro programa, esperas a que termine, le pasas datos y miras cómo ha acabado.

!!! info "El lenguaje es solo la herramienta"
    Lo que se aprende son ideas (PID, padre e hijo, esperar, código de salida) y son las mismas en cualquier lenguaje. Los ejemplos se ven en **Java** (el que sale por defecto), **Kotlin**, **Python** y **C#** con las pestañas, cada uno como función o como clase. Todos se han **ejecutado de verdad** (Java 25, Kotlin, Python 3.13 y .NET 10 en Windows) y la salida que ves es la real. Los PID y las rutas cambian de un equipo a otro, así que los ejemplos no los imprimen: comparan (`true` o `false`).

## La ruta: diez pasos

Cada paso añade una sola idea a lo anterior y termina con una **pregunta de comprensión** con su respuesta plegada: contéstala *antes* de abrirla.

| Paso | Qué aprendes | Dónde |
|---|---|---|
| 1 | El PID de tu propio proceso | [3.1](01-tu-proceso.md) |
| 2 | Más datos de tu proceso: si sigue vivo y qué programa lo ejecuta | [3.1](01-tu-proceso.md) |
| 3 | **Preparar no es lanzar**: crear el proceso hijo y arrancarlo | [3.2](02-lanzar-esperar.md) |
| 4 | Guardar el proceso lanzado para poder preguntarle cosas | [3.2](02-lanzar-esperar.md) |
| 5 | Esperar a que termine y recoger su **código de salida** | [3.2](02-lanzar-esperar.md) |
| 6 | Dos hijos a la vez: el orden de espera | [3.2](02-lanzar-esperar.md) |
| 7 | Un hijo que es **otra clase tuya**: `-cp` y el *classpath* | [3.3](03-tu-hijo.md) |
| 8 | Los argumentos van **como piezas separadas** | [3.4](04-argumentos-codigo.md) |
| 9 | El hijo **recibe datos** | [3.4](04-argumentos-codigo.md) |
| 10 | **Validar** los datos y avisar al padre con el código de salida | [3.4](04-argumentos-codigo.md) |

Además, [3.5 Errores típicos al empezar](05-errores.md) reúne los fallos que más se repiten, con el mensaje real que da cada uno.

## Antes de empezar

* Qué es un proceso, su PID y la relación entre padre e hijo: [1.1](../u01/01-proceso.md) y [1.4](../u01/04-hilos-servicios.md).
* Lo básico del lenguaje que elijas (variables, `if`, funciones o clases). No hace falta saber hilos.

## Cómo estudiarla

1. Lee el paso y **ejecuta el ejemplo** en tu equipo.
2. Contesta la pregunta de comprensión con tus palabras y compárala con la respuesta.
3. Haz el ejercicio correspondiente **sin mirar el ejemplo**.
4. Compara con la solución modelo.

## Ejercicios de la unidad

Hay [10 ejercicios](ejercicios.md), uno por paso, con la salida esperada y una pista.

## Antes de pasar a los ejercicios

Cuando hayas leído y practicado la teoría, marca la casilla para **desbloquear** los ejercicios:

<div class="ej-check" data-unit="u03"></div>
