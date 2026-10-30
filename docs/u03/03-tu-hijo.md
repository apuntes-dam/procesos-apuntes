# 3.3 Un programa tuyo como hijo: `-cp` y el classpath

En 3.2 el hijo era el mismo programa vuelto a lanzar. En un proyecto real suele ser **otra clase** de tu proyecto: un `Main` (el padre) y un `Saludo` (el hijo). Aquí aparece el fallo más repetido al empezar: *«no se encuentra la clase»*.

## Paso 7 · Lanzar una clase de tu proyecto

Para ejecutar una clase de Java ya compilada hace falta el comando `java` y **saber dónde están sus archivos `.class`**. A esa lista de carpetas se le llama **classpath** y se le dice a `java` con **`-cp`**:

```text
java -cp RUTA Saludo
```

* `java`: la máquina virtual de Java.
* `-cp RUTA`: dónde buscar las clases compiladas.
* `Saludo`: la clase que quieres ejecutar.

En un proyecto de un IDE hay dos carpetas distintas:

```text
MiProyecto/
├── src/                          ← tu código: Main.java, Saludo.java
└── out/production/MiProyecto/     ← el código compilado: Main.class, Saludo.class
```

(`out/production/...` es la que usa IntelliJ; con Maven o Gradle son otras, como `target/classes` o `build/classes`.) El hijo **no hereda** esa ruta: si no se la das, `java` busca en la carpeta desde la que se lanza, que en un IDE es la raíz del proyecto, no `out/production/...`.

<div class="pg" data-pg="classpath" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
public class Main {
    static void lanzar(String... orden) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(orden);
        pb.redirectErrorStream(true);                                // los errores del hijo llegan junto a su salida
        Process proceso = pb.start();
        String texto = new String(proceso.getInputStream().readAllBytes());
        texto.lines().forEach(linea -> System.out.println("   Hijo> " + linea));
        System.out.println("   Código de salida: " + proceso.waitFor());
    }

    public static void main(String[] args) throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        String ruta = System.getProperty("java.class.path");         // dónde están las clases de ESTE programa

        System.out.println("1) Con -cp, el hijo sabe dónde buscar su clase:");
        lanzar(java, "-cp", ruta, "Saludo");

        System.out.println("2) Sin -cp, no la encuentra:");
        lanzar(java, "Saludo");
    }
}

class Saludo {                                                       // el programa hijo: otra clase del mismo proyecto
    public static void main(String[] args) {
        System.out.println("Hola, soy el programa hijo");
    }
}
```

**Salida:**

```text
1) Con -cp, el hijo sabe dónde buscar su clase:
   Hijo> Hola, soy el programa hijo
   Código de salida: 0
2) Sin -cp, no la encuentra:
   Hijo> Error: Could not find or load main class Saludo
   Hijo> Caused by: java.lang.ClassNotFoundException: Saludo
   Código de salida: 1
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
public class Demo {
    void lanzar(String... orden) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(orden);
        pb.redirectErrorStream(true);                                // los errores del hijo llegan junto a su salida
        Process proceso = pb.start();
        String texto = new String(proceso.getInputStream().readAllBytes());
        texto.lines().forEach(linea -> System.out.println("   Hijo> " + linea));
        System.out.println("   Código de salida: " + proceso.waitFor());
    }

    void ejecutar() throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        String ruta = System.getProperty("java.class.path");         // dónde están las clases de ESTE programa

        System.out.println("1) Con -cp, el hijo sabe dónde buscar su clase:");
        lanzar(java, "-cp", ruta, "Saludo");

        System.out.println("2) Sin -cp, no la encuentra:");
        lanzar(java, "Saludo");
    }

    public static void main(String[] args) throws Exception {
        new Demo().ejecutar();
    }
}

class Saludo {                                                       // el programa hijo: otra clase del mismo proyecto
    public static void main(String[] args) {
        System.out.println("Hola, soy el programa hijo");
    }
}
```

**Salida:**

```text
1) Con -cp, el hijo sabe dónde buscar su clase:
   Hijo> Hola, soy el programa hijo
   Código de salida: 0
2) Sin -cp, no la encuentra:
   Hijo> Error: Could not find or load main class Saludo
   Hijo> Caused by: java.lang.ClassNotFoundException: Saludo
   Código de salida: 1
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
fun lanzar(vararg orden: String) {
    val pb = ProcessBuilder(*orden)
    pb.redirectErrorStream(true)                                     // los errores del hijo llegan junto a su salida
    val proceso = pb.start()
    val texto = String(proceso.inputStream.readAllBytes())
    texto.trim().lines().forEach { println("   Hijo> $it") }
    println("   Código de salida: " + proceso.waitFor())
}

object Saludo {                                                      // el programa hijo: otra clase del mismo proyecto
    @JvmStatic
    fun main(args: Array<String>) {
        println("Hola, soy el programa hijo")
    }
}

fun main() {
    val java = ProcessHandle.current().info().command().orElse("java")
    val ruta = System.getProperty("java.class.path")                 // dónde están las clases de ESTE programa

    println("1) Con -cp, el hijo sabe dónde buscar su clase:")
    lanzar(java, "-cp", ruta, "Saludo")

    println("2) Sin -cp, no la encuentra:")
    lanzar(java, "Saludo")
}
```

**Salida:**

```text
1) Con -cp, el hijo sabe dónde buscar su clase:
   Hijo> Hola, soy el programa hijo
   Código de salida: 0
2) Sin -cp, no la encuentra:
   Hijo> Error: Could not find or load main class Saludo
   Hijo> Caused by: java.lang.ClassNotFoundException: Saludo
   Código de salida: 1
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
class Demo {
    fun lanzar(vararg orden: String) {
        val pb = ProcessBuilder(*orden)
        pb.redirectErrorStream(true)                                 // los errores del hijo llegan junto a su salida
        val proceso = pb.start()
        val texto = String(proceso.inputStream.readAllBytes())
        texto.trim().lines().forEach { println("   Hijo> $it") }
        println("   Código de salida: " + proceso.waitFor())
    }

    fun ejecutar() {
        val java = ProcessHandle.current().info().command().orElse("java")
        val ruta = System.getProperty("java.class.path")             // dónde están las clases de ESTE programa

        println("1) Con -cp, el hijo sabe dónde buscar su clase:")
        lanzar(java, "-cp", ruta, "Saludo")

        println("2) Sin -cp, no la encuentra:")
        lanzar(java, "Saludo")
    }
}

object Saludo {                                                      // el programa hijo: otra clase del mismo proyecto
    @JvmStatic
    fun main(args: Array<String>) {
        println("Hola, soy el programa hijo")
    }
}

fun main() {
    Demo().ejecutar()
}
```

**Salida:**

```text
1) Con -cp, el hijo sabe dónde buscar su clase:
   Hijo> Hola, soy el programa hijo
   Código de salida: 0
2) Sin -cp, no la encuentra:
   Hijo> Error: Could not find or load main class Saludo
   Hijo> Caused by: java.lang.ClassNotFoundException: Saludo
   Código de salida: 1
```

</div>

</div>


* `System.getProperty("java.class.path")` le pregunta a Java **cuál es el classpath con el que se está ejecutando el padre**. Es la ruta real; así no la escribes a mano.
* El ejemplo lanza al hijo **dos veces**: con `-cp` lo encuentra; sin `-cp` ocurre lo que verás muchas veces, `Could not find or load main class`, y el código de salida es **1**.
* Como el hijo escribe su error por la **salida de error**, se mezcla con `redirectErrorStream(true)` y se lee entero. Cada línea del hijo sale con `Hijo>`.

!!! note "Si la clase está en un paquete"
    Con `package ejemplo;` la clase se llama `ejemplo.Saludo`, y es ese nombre completo el que va en el comando: `java -cp RUTA ejemplo.Saludo`.

| ¿Cómo se lanza al hijo? | Java / Kotlin | Python | C# |
|---|---|---|---|
| Qué se ejecuta | `java -cp RUTA Clase` | `sys.executable` + el archivo | `Environment.ProcessPath` (el propio ejecutable) |
| ¿Hay *classpath*? | **Sí** | No | No |

El classpath es cosa de la máquina virtual de Java (y de Kotlin, que corre sobre ella). En Python y C# no existe: se lanza el intérprete con el archivo o el ejecutable, como en los ejemplos de [3.2](02-lanzar-esperar.md).

**Pregunta de comprensión 6.** ¿Por qué solo sirve la segunda ruta para localizar la clase `Saludo`?

```java
String ruta1 = "java.class.path";
String ruta2 = System.getProperty("java.class.path");
```

??? success "Respuesta"
    La primera guarda **literalmente el texto** `java.class.path`: un String cualquiera, que `java` tomaría por el nombre de una carpeta que no existe. La segunda **le pregunta a Java** por la propiedad del sistema `java.class.path` y devuelve la **ruta real** con las clases compiladas.

**Pregunta de comprensión 7.** Escribir `java Saludo` en el terminal, dentro de la carpeta de las clases, funciona. ¿Por qué falla `new ProcessBuilder("java", "Saludo")` cuando se ejecuta desde el IDE?

??? success "Respuesta"
    Porque el hijo se lanza desde el **directorio de trabajo del padre**, y en un IDE es la raíz del proyecto, no la carpeta con los `.class`. Sin `-cp`, `java` busca solo en el directorio actual y no encuentra `Saludo`. Hay que darle la ruta con `-cp`.

## Qué recordar

* Un hijo Java necesita que le digas **dónde están sus clases**: `java -cp RUTA Clase`.
* La ruta se obtiene con **`System.getProperty("java.class.path")`**, nunca entre comillas.
* Sin `-cp`: `Could not find or load main class` y código de salida **1**.
* Python y C# no tienen *classpath*.

Ahora, el ejercicio [P3.7](ejercicios.md). Siguiente: [3.4 Argumentos y código de salida](04-argumentos-codigo.md).
