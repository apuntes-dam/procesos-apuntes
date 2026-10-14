# P1 · Ejercicios de procesos

<div class="ej-gate" data-unit="u01" data-nombre="U1 · Procesos"></div>

Responde con tus palabras. Las soluciones modelo están bloqueadas: intenta primero escribir la tuya.

## Ejercicio P1.1

**El BCP.** Enumera la información que guarda el **bloque de control de proceso (BCP)** y explica para qué sirve cada dato.

<details class="sol" data-key="procesos/u01/P1.1">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>El BCP guarda, de cada proceso:
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.2

**Estados y transiciones.** Dibuja el diagrama de estados de un proceso (**inicio, preparado, en ejecución, bloqueado y terminado**) y explica **cuándo ocurre cada una de las seis transiciones**. Después indica si es **posible** cada una de estas, y por qué: preparado → bloqueado, bloqueado → en ejecución, en ejecución → preparado y terminado → preparado.

<details class="sol" data-key="procesos/u01/P1.2">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>Cinco estados: INICIO, PREPARADO, EN EJECUCIÓN, BLOQUEADO y TERMINADO.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.3

**Vida de un proceso.** Un proceso lee un fichero grande del disco y después muestra su contenido. Describe **por qué estados pasa** desde que se lanza hasta que termina, indicando el número de la transición en cada cambio (usa la numeración de las seis transiciones de [1.2](../u01/02-estados.md)).

<details class="sol" data-key="procesos/u01/P1.3">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>1. Se lanza el proceso: queda en INICIO mientras el sistema lo crea y lo carga en memoria.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.4

**Tres planificadores.** Explica la diferencia entre el planificador **a largo**, **a medio** y **a corto plazo**. ¿Qué papel tiene el **despachador**?

<details class="sol" data-key="procesos/u01/P1.4">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>- Largo plazo: decide cuál es el próximo trabajo que se va a ejecutar. En los sistemas por lotes lo hace según los recursos necesarios y disponibles; en los de tiempo compartido solo carga programas en memoria, es decir, crea los procesos.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.5

**Sección crítica.** Explica qué es la sección crítica con el ejemplo de dos procesos que ingresan dinero en la misma cuenta, y qué hace falta para que el saldo final sea correcto.

<details class="sol" data-key="procesos/u01/P1.5">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>La sección crítica es la parte de un programa en la que se accede a datos compartidos con otros procesos.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.6

**Huérfano, zombi o ninguno.** Indica qué ocurre en cada caso y por qué: (a) el padre termina mientras el hijo sigue trabajando; (b) el hijo termina y el padre sigue ejecutándose sin recoger su código de salida; (c) un proceso espera un dato de la red que nunca llega; (d) el padre espera al hijo y recoge su código de salida cuando termina.

<details class="sol" data-key="procesos/u01/P1.6">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>(a) Proceso HUÉRFANO: el padre termina antes que el hijo. El hijo sigue funcionando y el sistema lo adopta (pasa a ser hijo del proceso con PID 1). No es un error.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.7

**Proceso o hilo.** Para cada caso, di si usarías **procesos** o **hilos** y por qué: (a) un navegador que quiere que, si una pestaña se cuelga, no caiga el resto; (b) un editor que revisa la ortografía mientras escribes y comparte el documento en memoria; (c) un programa que necesita ejecutar otro programa distinto. Después indica en qué **zona de la memoria** de un proceso se guarda cada cosa: una variable local de una función, una lista creada mientras se ejecuta y una variable global.

<details class="sol" data-key="procesos/u01/P1.7">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>(a) PROCESOS: la memoria de cada proceso está aislada, así que un fallo en una pestaña no afecta a las demás.
... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P1.8

**Tipos de programación y ley de Amdahl.** (1) Explica con el ejemplo de la cocina la diferencia entre programación **concurrente** y **paralela**, y di cuál de las dos necesita varios núcleos. (2) Un programa tarda **100 s** y el **60 %** de su código se puede paralelizar. Calcula la aceleración y el tiempo con **2 y 4 núcleos**, y el máximo con infinitos núcleos. (3) Indica una ventaja y un inconveniente de la programación **distribuida** frente a la paralela.

<details class="sol" data-key="procesos/u01/P1.8">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>(1) Concurrente: un solo cocinero prepara una ensalada y una sopa alternando (las dos tareas están en curso, pero en cada instante hace una cosa). Paralela: dos cocineros, uno pica y otro remueve, a la vez. La paralela necesita varios núcleos; la concurrente puede hacerse con uno.
... (resto de la solución bloqueado)</code></pre></div>
</details>
