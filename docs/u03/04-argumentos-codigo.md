# 3.4 Argumentos y código de salida

<div class="narrador" data-slug="u03-04-argumentos-codigo" data-voces="mujer:Mujer,hombre:Hombre,hombre2:Hombre 2" data-titulo="Resumen de argumentos y código de salida"></div>

??? note "Leer el resumen"
    Hay dos formas de comunicarte con un hijo sin leer lo que escribe. Lo que le pasas al lanzarlo, que son los argumentos, y lo que te devuelve al terminar, que es el código de salida.
    Al lanzar un proceso, el programa y cada argumento van como piezas separadas. Si lo escribes todo en una sola cadena, se toma por el nombre del programa y falla. Y recuerda que el argumento lo interpreta el programa lanzado, no el lenguaje.
    El hijo recibe los argumentos en su lista, y debe comprobar cuántos le han llegado antes de leerlos. Si faltan, escribe un error y termina con un código distinto de cero.
    Ojo: escribir el error no basta. Si el hijo solo escribe el mensaje y termina, su código será cero, y el padre creerá que todo ha ido bien. Hay que terminar con un código de salida.
    Y si el hijo falla, el padre no se cae. Lee el código y decide qué hacer.


Dos formas de comunicarse con un hijo **sin leer lo que escribe**: lo que le pasas al lanzarlo (los **argumentos**) y lo que te devuelve al terminar (el **código de salida**).

## Paso 8 · Los argumentos van como piezas separadas

Al lanzar un proceso se le pasa **el programa y, a continuación, cada argumento como una pieza distinta**. Cada elemento es un argumento, tenga o no espacios. En la lista del ejemplo:

```text
"hijo"  "Ana"  "Perez"  "20"      →  4 piezas: el hijo recibe 3 datos después de «hijo»
"hijo"  "Ana Perez 20"            →  2 piezas: el hijo recibe 1 solo dato
```

Y hay dos errores muy típicos:

* Escribir **todo en una sola cadena**, como `new ProcessBuilder("notepad.exe datos.txt")`. Java busca un programa que se llame *literalmente* `notepad.exe datos.txt`, no lo encuentra y falla ([3.5](05-errores.md)). Lo correcto es `new ProcessBuilder("notepad.exe", "datos.txt")`.
* Creer que el argumento lo interpreta Java. **Lo interpreta el programa lanzado.** Si haces `new ProcessBuilder("notepad.exe", "foto.jpg")`, el Bloc de notas intenta abrir la foto **como texto** y muestra símbolos raros: el lanzamiento va bien, otra cosa es lo que ese programa hace con el argumento.

Para abrir un archivo con *su* programa predeterminado en Windows se usa el intérprete de órdenes: `cmd /c start "" archivo.txt`. Ten en cuenta que entonces el proceso que lanzas es `cmd`, no el editor que se abre.

## Pasos 9 y 10 · El hijo recibe datos y avisa del resultado

<div class="pg" data-pg="argumentos" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
import java.util.*;

public class Main {
    static void hijo(String[] datos) {                                   // lo ejecuta el proceso hijo
        if (datos.length == 3) {
            System.out.println("   Hijo: nombre = " + datos[0] + ", apellido = " + datos[1] + ", edad = " + datos[2]);
        } else {
            System.out.println("   Hijo: ERROR, se esperaban 3 argumentos y he recibido " + datos.length);
            System.exit(1);                                          // 1 = «he terminado con errores»
        }
    }

    static void probar(String... argumentos) throws Exception {         // el padre lanza al hijo con estos argumentos
        List<String> orden = new ArrayList<>(List.of(ProcessHandle.current().info().command().orElse("java"),
                "-cp", System.getProperty("java.class.path"), "Main", "hijo"));
        orden.addAll(List.of(argumentos));                           // cada argumento, como una pieza distinta
        Process proceso = new ProcessBuilder(orden).inheritIO().start();
        int codigo = proceso.waitFor();
        System.out.println("Código de salida: " + codigo + (codigo == 0 ? " → todo correcto" : " → el hijo terminó con errores"));
    }

    static void padre() throws Exception {
        probar("Ana", "Perez", "20");                                // tres argumentos
        probar("Ana", "Perez");                                      // faltan datos
        probar("Ana Perez 20");                                      // ¡un solo argumento con espacios!
    }

    public static void main(String[] args) throws Exception {
        if (args.length > 0 && args[0].equals("hijo")) hijo(Arrays.copyOfRange(args, 1, args.length));
        else padre();
    }
}
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
import java.util.*;

public class Demo {
    void hijo(String[] datos) {                                   // lo ejecuta el proceso hijo
        if (datos.length == 3) {
            System.out.println("   Hijo: nombre = " + datos[0] + ", apellido = " + datos[1] + ", edad = " + datos[2]);
        } else {
            System.out.println("   Hijo: ERROR, se esperaban 3 argumentos y he recibido " + datos.length);
            System.exit(1);                                          // 1 = «he terminado con errores»
        }
    }

    void probar(String... argumentos) throws Exception {         // el padre lanza al hijo con estos argumentos
        List<String> orden = new ArrayList<>(List.of(ProcessHandle.current().info().command().orElse("java"),
                "-cp", System.getProperty("java.class.path"), "Demo", "hijo"));
        orden.addAll(List.of(argumentos));                           // cada argumento, como una pieza distinta
        Process proceso = new ProcessBuilder(orden).inheritIO().start();
        int codigo = proceso.waitFor();
        System.out.println("Código de salida: " + codigo + (codigo == 0 ? " → todo correcto" : " → el hijo terminó con errores"));
    }

    void padre() throws Exception {
        probar("Ana", "Perez", "20");                                // tres argumentos
        probar("Ana", "Perez");                                      // faltan datos
        probar("Ana Perez 20");                                      // ¡un solo argumento con espacios!
    }

    public static void main(String[] args) throws Exception {
        Demo demo = new Demo();
        if (args.length > 0 && args[0].equals("hijo")) demo.hijo(Arrays.copyOfRange(args, 1, args.length));
        else demo.padre();
    }
}
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
import kotlin.system.exitProcess

fun hijo(datos: List<String>) {                                  // lo ejecuta el proceso hijo
    if (datos.size == 3) {
        println("   Hijo: nombre = ${datos[0]}, apellido = ${datos[1]}, edad = ${datos[2]}")
    } else {
        println("   Hijo: ERROR, se esperaban 3 argumentos y he recibido ${datos.size}")
        exitProcess(1)                                           // 1 = «he terminado con errores»
    }
}

fun probar(vararg argumentos: String) {                          // el padre lanza al hijo con estos argumentos
    val java = ProcessHandle.current().info().command().orElse("java")
    val orden = listOf(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo") + argumentos   // cada argumento, una pieza
    val proceso = ProcessBuilder(orden).inheritIO().start()
    val codigo = proceso.waitFor()
    println("Código de salida: $codigo" + if (codigo == 0) " → todo correcto" else " → el hijo terminó con errores")
}

fun padre() {
    probar("Ana", "Perez", "20")                                 // tres argumentos
    probar("Ana", "Perez")                                       // faltan datos
    probar("Ana Perez 20")                                       // ¡un solo argumento con espacios!
}

fun main(args: Array<String>) {
    if (args.firstOrNull() == "hijo") hijo(args.drop(1)) else padre()
}
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
import kotlin.system.exitProcess

class Demo {
    fun hijo(datos: List<String>) {                                  // lo ejecuta el proceso hijo
        if (datos.size == 3) {
            println("   Hijo: nombre = ${datos[0]}, apellido = ${datos[1]}, edad = ${datos[2]}")
        } else {
            println("   Hijo: ERROR, se esperaban 3 argumentos y he recibido ${datos.size}")
            exitProcess(1)                                           // 1 = «he terminado con errores»
        }
    }

    fun probar(vararg argumentos: String) {                          // el padre lanza al hijo con estos argumentos
        val java = ProcessHandle.current().info().command().orElse("java")
        val orden = listOf(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo") + argumentos   // cada argumento, una pieza
        val proceso = ProcessBuilder(orden).inheritIO().start()
        val codigo = proceso.waitFor()
        println("Código de salida: $codigo" + if (codigo == 0) " → todo correcto" else " → el hijo terminó con errores")
    }

    fun padre() {
        probar("Ana", "Perez", "20")                                 // tres argumentos
        probar("Ana", "Perez")                                       // faltan datos
        probar("Ana Perez 20")                                       // ¡un solo argumento con espacios!
    }
}

fun main(args: Array<String>) {
    val demo = Demo()
    if (args.firstOrNull() == "hijo") demo.hijo(args.drop(1)) else demo.padre()
}
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="python" data-forma="funcion" markdown="1">

<p class="pg-cab">Python · como función</p>

```python
import subprocess
import sys

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

def hijo(datos):                                                 # lo ejecuta el proceso hijo
    if len(datos) == 3:
        print(f"   Hijo: nombre = {datos[0]}, apellido = {datos[1]}, edad = {datos[2]}")
    else:
        print(f"   Hijo: ERROR, se esperaban 3 argumentos y he recibido {len(datos)}")
        sys.exit(1)                                              # 1 = «he terminado con errores»


def probar(*argumentos):                                         # el padre lanza al hijo con estos argumentos
    orden = [sys.executable, __file__, "hijo", *argumentos]      # cada argumento, una pieza distinta
    codigo = subprocess.Popen(orden).wait()
    print("Código de salida:", codigo, "→ todo correcto" if codigo == 0 else "→ el hijo terminó con errores")


def padre():
    probar("Ana", "Perez", "20")                              # tres argumentos
    probar("Ana", "Perez")                                    # faltan datos
    probar("Ana Perez 20")                                    # ¡un solo argumento con espacios!


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        hijo(sys.argv[2:])
    else:
        padre()
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="python" data-forma="clase" markdown="1">

<p class="pg-cab">Python · como clase</p>

```python
import subprocess
import sys

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

class Demo:
    @staticmethod
    def hijo(datos):                                                 # lo ejecuta el proceso hijo
        if len(datos) == 3:
            print(f"   Hijo: nombre = {datos[0]}, apellido = {datos[1]}, edad = {datos[2]}")
        else:
            print(f"   Hijo: ERROR, se esperaban 3 argumentos y he recibido {len(datos)}")
            sys.exit(1)                                              # 1 = «he terminado con errores»

    @staticmethod
    def probar(*argumentos):                                         # el padre lanza al hijo con estos argumentos
        orden = [sys.executable, __file__, "hijo", *argumentos]      # cada argumento, una pieza distinta
        codigo = subprocess.Popen(orden).wait()
        print("Código de salida:", codigo, "→ todo correcto" if codigo == 0 else "→ el hijo terminó con errores")

    @staticmethod
    def padre():
        Demo.probar("Ana", "Perez", "20")                              # tres argumentos
        Demo.probar("Ana", "Perez")                                    # faltan datos
        Demo.probar("Ana Perez 20")                                    # ¡un solo argumento con espacios!


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        Demo.hijo(sys.argv[2:])
    else:
        Demo.padre()
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="funcion" markdown="1">

<p class="pg-cab">C# · como función</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

void Hijo(string[] datos)                                     // lo ejecuta el proceso hijo
{
    if (datos.Length == 3)
        Console.WriteLine($"   Hijo: nombre = {datos[0]}, apellido = {datos[1]}, edad = {datos[2]}");
    else
    {
        Console.WriteLine($"   Hijo: ERROR, se esperaban 3 argumentos y he recibido {datos.Length}");
        Environment.Exit(1);                                     // 1 = «he terminado con errores»
    }
}

void Probar(params string[] argumentos)                       // el padre lanza al hijo con estos argumentos
{
    var orden = new[] { "hijo" }.Concat(argumentos);             // cada argumento, una pieza distinta
    Process proceso = Process.Start(Environment.ProcessPath!, orden)!;
    proceso.WaitForExit();
    int codigo = proceso.ExitCode;
    Console.WriteLine("Código de salida: " + codigo + (codigo == 0 ? " → todo correcto" : " → el hijo terminó con errores"));
}

void Padre()
{
    Probar("Ana", "Perez", "20");                                // tres argumentos
    Probar("Ana", "Perez");                                      // faltan datos
    Probar("Ana Perez 20");                                      // ¡un solo argumento con espacios!
}

if (args.Length > 0 && args[0] == "hijo") Hijo(args[1..]);
else Padre();
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="clase" markdown="1">

<p class="pg-cab">C# · como clase</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

var demo = new Demo();
if (args.Length > 0 && args[0] == "hijo") demo.Hijo(args[1..]);
else demo.Padre();

class Demo
{
    public void Hijo(string[] datos)                                     // lo ejecuta el proceso hijo
    {
        if (datos.Length == 3)
            Console.WriteLine($"   Hijo: nombre = {datos[0]}, apellido = {datos[1]}, edad = {datos[2]}");
        else
        {
            Console.WriteLine($"   Hijo: ERROR, se esperaban 3 argumentos y he recibido {datos.Length}");
            Environment.Exit(1);                                     // 1 = «he terminado con errores»
        }
    }

    public void Probar(params string[] argumentos)                       // el padre lanza al hijo con estos argumentos
    {
        var orden = new[] { "hijo" }.Concat(argumentos);             // cada argumento, una pieza distinta
        Process proceso = Process.Start(Environment.ProcessPath!, orden)!;
        proceso.WaitForExit();
        int codigo = proceso.ExitCode;
        Console.WriteLine("Código de salida: " + codigo + (codigo == 0 ? " → todo correcto" : " → el hijo terminó con errores"));
    }

    public void Padre()
    {
        Probar("Ana", "Perez", "20");                                // tres argumentos
        Probar("Ana", "Perez");                                      // faltan datos
        Probar("Ana Perez 20");                                      // ¡un solo argumento con espacios!
    }
}
```

**Salida:**

```text
   Hijo: nombre = Ana, apellido = Perez, edad = 20
Código de salida: 0 → todo correcto
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 2
Código de salida: 1 → el hijo terminó con errores
   Hijo: ERROR, se esperaban 3 argumentos y he recibido 1
Código de salida: 1 → el hijo terminó con errores
```

</div>

</div>


El hijo **recibe sus datos** en su lista de argumentos y **decide** cómo terminar:

* Si recibe **tres** datos, los muestra y termina con normalidad (código `0`).
* Si no, escribe un error y termina con **`System.exit(1)`**: el `1` es el código que le llega al padre.
* El padre lo recoge con `waitFor()` y decide: `0` → «todo correcto»; otro valor → «el hijo terminó con errores».

El tercer intento es el error de la lista: `"Ana Perez 20"` viaja como **una sola pieza**, así que el hijo cuenta **un** dato y falla.

| | Java / Kotlin | Python | C# |
|---|---|---|---|
| Argumentos que recibe el hijo | `args` | `sys.argv[1:]` | `args` |
| ¿Cuántos? | `args.length` / `args.size` | `len(sys.argv) - 1` | `args.Length` |
| Terminar con un código | `System.exit(1)` / `exitProcess(1)` | `sys.exit(1)` | `Environment.Exit(1)` |
| Leerlo en el padre | `waitFor()` | `wait()` | `ExitCode` |

!!! warning "Escribir un error no cambia el código"
    Si el hijo **solo escribe** `ERROR...` y termina, su código será `0` y el padre creerá que todo ha ido bien. El aviso al padre es `System.exit(1)`, no el texto.

## Un fallo del hijo no tumba al padre

<div class="pg" data-pg="fallo" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
import java.util.*;

public class Main {
    static void hijo(String[] datos) {                                   // lo ejecuta el proceso hijo
        System.out.println(datos[0]);                                // ¡no ha recibido ningún dato!
    }

    static void padre() throws Exception {
        ProcessBuilder pb = new ProcessBuilder(ProcessHandle.current().info().command().orElse("java"),
                "-cp", System.getProperty("java.class.path"), "Main", "hijo");
        pb.redirectError(ProcessBuilder.Redirect.DISCARD);           // aquí no nos interesa el texto de la excepción
        int codigo = pb.start().waitFor();
        System.out.println("El hijo ha fallado con el código " + codigo);
        System.out.println("Pero el padre sigue vivo y continúa con su trabajo");
    }

    public static void main(String[] args) throws Exception {
        if (args.length > 0 && args[0].equals("hijo")) hijo(Arrays.copyOfRange(args, 1, args.length));
        else padre();
    }
}
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
import java.util.*;

public class Demo {
    void hijo(String[] datos) {                                   // lo ejecuta el proceso hijo
        System.out.println(datos[0]);                                // ¡no ha recibido ningún dato!
    }

    void padre() throws Exception {
        ProcessBuilder pb = new ProcessBuilder(ProcessHandle.current().info().command().orElse("java"),
                "-cp", System.getProperty("java.class.path"), "Demo", "hijo");
        pb.redirectError(ProcessBuilder.Redirect.DISCARD);           // aquí no nos interesa el texto de la excepción
        int codigo = pb.start().waitFor();
        System.out.println("El hijo ha fallado con el código " + codigo);
        System.out.println("Pero el padre sigue vivo y continúa con su trabajo");
    }

    public static void main(String[] args) throws Exception {
        Demo demo = new Demo();
        if (args.length > 0 && args[0].equals("hijo")) demo.hijo(Arrays.copyOfRange(args, 1, args.length));
        else demo.padre();
    }
}
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
fun hijo(datos: List<String>) {                                  // lo ejecuta el proceso hijo
    println(datos[0])                                            // ¡no ha recibido ningún dato!
}

fun padre() {
    val java = ProcessHandle.current().info().command().orElse("java")
    val pb = ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo")
    pb.redirectError(ProcessBuilder.Redirect.DISCARD)            // aquí no nos interesa el texto de la excepción
    val codigo = pb.start().waitFor()
    println("El hijo ha fallado con el código $codigo")
    println("Pero el padre sigue vivo y continúa con su trabajo")
}

fun main(args: Array<String>) {
    if (args.firstOrNull() == "hijo") hijo(args.drop(1)) else padre()
}
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
class Demo {
    fun hijo(datos: List<String>) {                                  // lo ejecuta el proceso hijo
        println(datos[0])                                            // ¡no ha recibido ningún dato!
    }

    fun padre() {
        val java = ProcessHandle.current().info().command().orElse("java")
        val pb = ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo")
        pb.redirectError(ProcessBuilder.Redirect.DISCARD)            // aquí no nos interesa el texto de la excepción
        val codigo = pb.start().waitFor()
        println("El hijo ha fallado con el código $codigo")
        println("Pero el padre sigue vivo y continúa con su trabajo")
    }
}

fun main(args: Array<String>) {
    val demo = Demo()
    if (args.firstOrNull() == "hijo") demo.hijo(args.drop(1)) else demo.padre()
}
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

<div class="pg-panel" data-lang="python" data-forma="funcion" markdown="1">

<p class="pg-cab">Python · como función</p>

```python
import subprocess
import sys

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

def hijo(datos):                                                 # lo ejecuta el proceso hijo
    print(datos[0])                                              # ¡no ha recibido ningún dato!


def padre():
    proceso = subprocess.Popen([sys.executable, __file__, "hijo"], stderr=subprocess.DEVNULL)   # no nos interesa el texto de la excepción
    codigo = proceso.wait()
    print("El hijo ha fallado con el código", codigo)
    print("Pero el padre sigue vivo y continúa con su trabajo")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        hijo(sys.argv[2:])
    else:
        padre()
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

<div class="pg-panel" data-lang="python" data-forma="clase" markdown="1">

<p class="pg-cab">Python · como clase</p>

```python
import subprocess
import sys

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

class Demo:
    @staticmethod
    def hijo(datos):                                                 # lo ejecuta el proceso hijo
        print(datos[0])                                              # ¡no ha recibido ningún dato!

    @staticmethod
    def padre():
        proceso = subprocess.Popen([sys.executable, __file__, "hijo"], stderr=subprocess.DEVNULL)   # no nos interesa el texto de la excepción
        codigo = proceso.wait()
        print("El hijo ha fallado con el código", codigo)
        print("Pero el padre sigue vivo y continúa con su trabajo")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        Demo.hijo(sys.argv[2:])
    else:
        Demo.padre()
```

**Salida:**

```text
El hijo ha fallado con el código 1
Pero el padre sigue vivo y continúa con su trabajo
```

</div>

</div>


El hijo hace `datos[0]` sin comprobar que existe. Se produce una excepción que no captura nadie y el hijo **muere con el código 1**. El padre, que es otro proceso, sigue vivo, lee el código y continúa. (El texto de la excepción sale por la salida de error del hijo; aquí se descarta para ver solo lo importante.)

!!! note "El código de una excepción no es igual en todos los lenguajes"
    En Java, Kotlin y Python una excepción sin capturar da el código **1**. En C# (.NET) depende del sistema: ejecutado en Windows, el padre ve un número como `-532462766`. Por eso el ejemplo de C# se ha dejado fuera: lo seguro es que el hijo **controle** sus errores y termine con un código elegido por él.

**Pregunta de comprensión 8.** El hijo tiene este código y recibe solo 2 argumentos. ¿Qué valor devuelve `waitFor()` en el padre? ¿Y si faltara la línea `System.exit(1);`?

```java
if (args.length == 3) {
    System.out.println("Argumentos correctos");
} else {
    System.out.println("ERROR");
    System.exit(1);
}
```

??? success "Respuesta"
    **1**, porque el hijo ha ejecutado `System.exit(1)`. Si faltara, el hijo escribiría `ERROR` y terminaría con normalidad: `waitFor()` devolvería **0** aunque se haya producido un error.

**Pregunta de comprensión 9.** El padre lanza `new ProcessBuilder("notepad.exe", "archivo.txt")`. ¿Quién abre e interpreta `archivo.txt`: Java, Windows o el Bloc de notas?

??? success "Respuesta"
    **El Bloc de notas.** Java solo pide al sistema que ejecute `notepad.exe` y le **pasa** `archivo.txt` como argumento. Qué hace el programa con él (abrirlo, mostrarlo como texto, dar un error) es cosa suya.

**Pregunta de comprensión 10.** El hijo espera tres argumentos, pero el padre solo envía dos, y el hijo hace `System.out.println(args[2]);` sin comprobar nada. ¿Qué ocurre? ¿Se cae también el padre?

??? success "Respuesta"
    El hijo lanza `ArrayIndexOutOfBoundsException` (no existe la posición 2), muere con el código 1 y el padre **sigue funcionando** (ejemplo anterior). Para evitarlo, el hijo comprueba `args.length` antes de leer los argumentos.

## Qué recordar

* El programa y **cada argumento** van como piezas **separadas**. Todo junto en una sola cadena se toma por el nombre del programa.
* El **hijo** recibe los argumentos en `args` (`sys.argv` en Python). **Comprueba cuántos** antes de leerlos.
* El hijo avisa con su **código de salida**: `0` bien, otro número error. Escribir el error **no basta**: hay que terminar con `exit(1)`.
* El padre lee el código con `waitFor()` y decide. Un fallo del hijo **no tumba al padre**.

Ahora, los ejercicios [P3.8 a P3.10](ejercicios.md). Y para repasar los fallos típicos: [3.5 Errores típicos al empezar](05-errores.md).
