# P3 · Ejercicios de procesos desde el código

<div class="ej-gate" data-unit="u03" data-nombre="U3 · Procesos desde el código"></div>

Son los diez pasos de la unidad, de menos a más: cada uno usa lo del anterior. Hazlos en el lenguaje que prefieras; las soluciones modelo están en **Java** y están bloqueadas, así que intenta primero escribir la tuya. En los ejercicios con un hijo, usa la técnica de [3.2](02-lanzar-esperar.md): el padre vuelve a lanzar **su propio programa** con el argumento `hijo`. Los PID y las rutas cambian de un equipo a otro: lo que se pide se comprueba con tu propia ejecución.

## Ejercicio P3.1

**Tu primer proceso.** Muestra `Información de mi proceso:`, después `PID:` seguido del PID de tu proceso y, por último, `Programa finalizado`.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
Información de mi proceso:
PID: 15432
Programa finalizado
```

!!! tip "Pista"
    Necesitas la referencia a tu propio proceso y su PID (paso 1 de [3.1](01-tu-proceso.md)).


<details class="sol" data-key="procesos/u03/P3.1">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) {
        ProcessHandle proceso = ProcessHandle.current();
        System.out.println("Información de mi proceso:");
        System.out.println("PID: " + proceso.pid());
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.2

**Ficha de mi proceso.** Muestra el PID, si el proceso está vivo y el **nombre del programa** que lo ejecuta (solo el nombre del fichero, sin la ruta). Si el sistema no da ese dato, escribe `Desconocido`.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
=== INFORMACIÓN DEL PROCESO ===
PID: 15432
¿Vivo?: true
Programa: java.exe
Consulta finalizada.
```

!!! tip "Pista"
    El dato del programa puede no estar disponible: piensa qué valor por defecto usar. El nombre sale de la ruta completa.


<details class="sol" data-key="procesos/u03/P3.2">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>import java.nio.file.Path;
public class Main {
    public static void main(String[] args) {
        ProcessHandle proceso = ProcessHandle.current();
        String programa = proceso.info().command()
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.3

**Preparar no es lanzar.** El padre muestra `Preparando al hijo...`, prepara el proceso hijo (el propio programa con el argumento `hijo`), muestra `Todavía no he lanzado nada`, lo lanza y muestra `Hijo lanzado`. El hijo escribe `Hola, soy el hijo`. El padre **no** espera.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
Preparando al hijo...
Todavía no he lanzado nada
Hijo lanzado
Hola, soy el hijo
```

!!! tip "Pista"
    La línea del hijo sale la última porque el padre no lo espera. Que el hijo escriba en tu consola necesita una orden de configuración antes de lanzarlo.


<details class="sol" data-key="procesos/u03/P3.3">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        if (args.length &gt; 0 &amp;&amp; args[0].equals("hijo")) {                 // lo que hace el hijo
            System.out.println("Hola, soy el hijo");
            return;
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.4

**Guarda el proceso.** Igual que el anterior, pero guarda el proceso lanzado y muestra `¿El PID del hijo es distinto del mío?` y `¿Está vivo?`. Haz que el hijo tarde un segundo en escribir su mensaje para que siga vivo.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
¿El PID del hijo es distinto del mío? true
¿Está vivo? true
Hola, soy el hijo
```

!!! tip "Pista"
    Sin guardar lo que devuelve el lanzamiento no podrías preguntarle nada al hijo.


<details class="sol" data-key="procesos/u03/P3.4">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        if (args.length &gt; 0 &amp;&amp; args[0].equals("hijo")) {                 // lo que hace el hijo
            Thread.sleep(1000);
            System.out.println("Hola, soy el hijo");
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.5

**Espera al hijo.** El hijo tarda dos segundos en escribir `Hijo: terminé`. El padre muestra `A: hijo lanzado`, **espera** a que termine, y entonces muestra `B: el hijo terminó con código` y su código, y si sigue vivo.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
A: hijo lanzado
Hijo: terminé
B: el hijo terminó con código 0
¿Sigue vivo? false
```

!!! tip "Pista"
    ¿Cuándo salen A y B? Piensa en qué hace el padre mientras espera.


<details class="sol" data-key="procesos/u03/P3.5">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        if (args.length &gt; 0 &amp;&amp; args[0].equals("hijo")) {                 // lo que hace el hijo
            Thread.sleep(2000);
            System.out.println("Hijo: terminé");
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.6

**Dos hijos, otro orden.** Lanza un hijo que dura 3 segundos y otro que dura 1 (el hijo recibe los segundos como argumento y no escribe nada). Espera primero al **corto**, muestra si el largo sigue vivo, y después espera al largo.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
El corto ha terminado
¿El largo sigue vivo? true
El largo ha terminado
```

!!! tip "Pista"
    Es el ejemplo de [3.2](02-lanzar-esperar.md) con el orden de espera cambiado: ¿en qué momento sale cada línea?


<details class="sol" data-key="procesos/u03/P3.6">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    static Process lanzar(int segundos) throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        return new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "Main", "hijo", String.valueOf(segundos)).start();
    }
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.7

**Un hijo que es otra clase.** Escribe dos clases: `Saludo` (muestra `Hola, soy el programa hijo`) y `Main`, que la lanza con `java -cp ... Saludo`, comparte la consola, espera y muestra el código de salida. El classpath no se escribe a mano.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
=== PROGRAMA PADRE ===
Hola, soy el programa hijo
Código de salida: 0
Programa padre finalizado
```

!!! tip "Pista"
    Mira [3.3](03-tu-hijo.md): la ruta de las clases se le pregunta a Java, no se escribe entre comillas.


<details class="sol" data-key="procesos/u03/P3.7">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("=== PROGRAMA PADRE ===");
        String ruta = System.getProperty("java.class.path");             // ¡la ruta REAL, no el texto "java.class.path"!
        ProcessBuilder pb = new ProcessBuilder("java", "-cp", ruta, "Saludo");
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.8

**Cada argumento, una pieza.** El hijo `Contar` muestra cuántos argumentos ha recibido y los enseña numerados. El padre lo lanza dos veces: una con `uno`, `dos` y `tres` como tres piezas, y otra con `uno dos tres` como **una sola** pieza.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
Recibí 3 argumento(s):
  0: uno
  1: dos
  2: tres
Recibí 1 argumento(s):
  0: uno dos tres
```

!!! tip "Pista"
    Cada elemento que le pasas al lanzamiento es un argumento, tenga o no espacios.


<details class="sol" data-key="procesos/u03/P3.8">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    static void lanzar(String... argumentos) throws Exception {
        String[] orden = new String[4 + argumentos.length];
        orden[0] = "java";
        orden[1] = "-cp";
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.9

**El hijo recibe datos.** `Datos` muestra `=== DATOS RECIBIDOS ===` y el nombre, el apellido y la edad que recibe como argumentos (no los escribas dentro del programa). El padre le pasa `Ana`, `Perez` y `20`, espera y muestra el PID del hijo (solo `> 0`) y su código.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
=== DATOS RECIBIDOS ===
Nombre: Ana
Apellido: Perez
Edad: 20
¿PID del hijo positivo? true
Código de salida: 0
```

!!! tip "Pista"
    Los argumentos del hijo llegan en la lista que recibe su `main`.


<details class="sol" data-key="procesos/u03/P3.9">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        ProcessBuilder pb = new ProcessBuilder("java", "-cp", System.getProperty("java.class.path"), "Datos", "Ana", "Perez", "20");
        pb.inheritIO();
        Process hijo = pb.start();
// ... (resto de la solución bloqueado)</code></pre></div>
</details>

## Ejercicio P3.10

**Valida y avisa.** Modifica `Datos` para que compruebe cuántos argumentos recibe: con tres, los muestra; si no, escribe `ERROR: Se esperaban 3 argumentos.` y termina con el código 1. El padre lo lanza con solo **dos** (`Ana` y `Perez`), espera y escribe `El programa hijo ha terminado correctamente.` o `El programa hijo ha terminado con errores.` según el código.

**Salida esperada** (el PID y el orden de las líneas del hijo pueden variar):

```text
ERROR: Se esperaban 3 argumentos.
El programa hijo ha terminado con errores.
```

!!! tip "Pista"
    Para terminar el programa indicando un código hay una orden concreta. Sin ella, el código sería 0 aunque hayas escrito un error.


<details class="sol" data-key="procesos/u03/P3.10">
<summary>Solución modelo (bloqueada)</summary>
<div class="sol-body"><p class="sol-aviso">🔒 La solución completa está bloqueada. Esto es solo un ejemplo de cómo empieza:</p><pre><code>public class Main {
    public static void main(String[] args) throws Exception {
        ProcessBuilder pb = new ProcessBuilder("java", "-cp", System.getProperty("java.class.path"), "Datos", "Ana", "Perez");
        pb.inheritIO();
        int codigo = pb.start().waitFor();
// ... (resto de la solución bloqueado)</code></pre></div>
</details>
