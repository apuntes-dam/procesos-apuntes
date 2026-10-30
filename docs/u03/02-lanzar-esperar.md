# 3.2 Lanzar otro programa y esperar

Tu programa (el **padre**) puede crear otro proceso (el **hijo**). Hay cuatro cosas que querrás hacer: **lanzarlo**, **quedarte con él** para consultarlo, **esperar** a que termine y **saber cómo ha ido**.

!!! info "Un hijo que se puede probar en cualquier equipo"
    Lo más cómodo para aprender es que el hijo sea **tu propio programa vuelto a lanzar** con el argumento `hijo`: así no necesitas ningún otro archivo ni una aplicación que cambie de un sistema a otro. Es la técnica de [1.4](../u01/04-hilos-servicios.md). Si el programa se ejecuta *sin* argumentos, hace de padre; si recibe `hijo`, hace de hijo. La orden larga que lanza a Java (`-cp`...) se explica en el [paso 7](03-tu-hijo.md).

## Paso 3 · Preparar no es lanzar

<div class="pg" data-pg="lanzar" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
public class Main {
    static void hijo() throws Exception {                                // lo ejecuta el proceso hijo
        Thread.sleep(1000);                                          // el hijo trabaja un segundo
        System.out.println("   Hijo: he terminado mi trabajo");
    }

    static void padre() throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        ProcessBuilder pb = new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "Main", "hijo");
        pb.inheritIO();                                              // el hijo escribe en nuestra consola
        System.out.println("Preparado, pero todavía no lanzado");
        Process hijo = pb.start();                                   // aquí nace el proceso hijo
        System.out.println("Lanzado. ¿Está vivo? " + hijo.isAlive());
        int codigo = hijo.waitFor();                                 // el padre espera a que termine
        System.out.println("El hijo terminó con código " + codigo + ". ¿Está vivo? " + hijo.isAlive());
    }

    public static void main(String[] args) throws Exception {
        if (args.length > 0 && args[0].equals("hijo")) hijo();
        else padre();
    }
}
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? true
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? false
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
public class Demo {
    void hijo() throws Exception {                                // lo ejecuta el proceso hijo
        Thread.sleep(1000);                                          // el hijo trabaja un segundo
        System.out.println("   Hijo: he terminado mi trabajo");
    }

    void padre() throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        ProcessBuilder pb = new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "Demo", "hijo");
        pb.inheritIO();                                              // el hijo escribe en nuestra consola
        System.out.println("Preparado, pero todavía no lanzado");
        Process hijo = pb.start();                                   // aquí nace el proceso hijo
        System.out.println("Lanzado. ¿Está vivo? " + hijo.isAlive());
        int codigo = hijo.waitFor();                                 // el padre espera a que termine
        System.out.println("El hijo terminó con código " + codigo + ". ¿Está vivo? " + hijo.isAlive());
    }

    public static void main(String[] args) throws Exception {
        Demo demo = new Demo();
        if (args.length > 0 && args[0].equals("hijo")) demo.hijo();
        else demo.padre();
    }
}
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? true
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? false
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
fun hijo() {                                                     // lo ejecuta el proceso hijo
    Thread.sleep(1000)                                           // el hijo trabaja un segundo
    println("   Hijo: he terminado mi trabajo")
}

fun padre() {
    val java = ProcessHandle.current().info().command().orElse("java")
    val pb = ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo")
    pb.inheritIO()                                               // el hijo escribe en nuestra consola
    println("Preparado, pero todavía no lanzado")
    val hijo = pb.start()                                        // aquí nace el proceso hijo
    println("Lanzado. ¿Está vivo? ${hijo.isAlive}")
    val codigo = hijo.waitFor()                                  // el padre espera a que termine
    println("El hijo terminó con código $codigo. ¿Está vivo? ${hijo.isAlive}")
}

fun main(args: Array<String>) {
    if (args.firstOrNull() == "hijo") hijo() else padre()
}
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? true
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? false
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
class Demo {
    fun hijo() {                                                     // lo ejecuta el proceso hijo
        Thread.sleep(1000)                                           // el hijo trabaja un segundo
        println("   Hijo: he terminado mi trabajo")
    }

    fun padre() {
        val java = ProcessHandle.current().info().command().orElse("java")
        val pb = ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo")
        pb.inheritIO()                                               // el hijo escribe en nuestra consola
        println("Preparado, pero todavía no lanzado")
        val hijo = pb.start()                                        // aquí nace el proceso hijo
        println("Lanzado. ¿Está vivo? ${hijo.isAlive}")
        val codigo = hijo.waitFor()                                  // el padre espera a que termine
        println("El hijo terminó con código $codigo. ¿Está vivo? ${hijo.isAlive}")
    }
}

fun main(args: Array<String>) {
    val demo = Demo()
    if (args.firstOrNull() == "hijo") demo.hijo() else demo.padre()
}
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? true
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? false
```

</div>

<div class="pg-panel" data-lang="python" data-forma="funcion" markdown="1">

<p class="pg-cab">Python · como función</p>

```python
import subprocess
import sys
import time

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

def hijo():                                                      # lo ejecuta el proceso hijo
    time.sleep(1)                                                # el hijo trabaja un segundo
    print("   Hijo: he terminado mi trabajo")


def padre():
    print("Preparado, pero todavía no lanzado")
    proceso = subprocess.Popen([sys.executable, __file__, "hijo"])   # aquí nace el proceso hijo
    print("Lanzado. ¿Está vivo?", proceso.poll() is None)
    codigo = proceso.wait()                                      # el padre espera a que termine
    print(f"El hijo terminó con código {codigo}. ¿Está vivo? {proceso.poll() is None}")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        hijo()
    else:
        padre()
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? True
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? False
```

</div>

<div class="pg-panel" data-lang="python" data-forma="clase" markdown="1">

<p class="pg-cab">Python · como clase</p>

```python
import subprocess
import sys
import time

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

class Demo:
    @staticmethod
    def hijo():                                                      # lo ejecuta el proceso hijo
        time.sleep(1)                                                # el hijo trabaja un segundo
        print("   Hijo: he terminado mi trabajo")

    @staticmethod
    def padre():
        print("Preparado, pero todavía no lanzado")
        proceso = subprocess.Popen([sys.executable, __file__, "hijo"])   # aquí nace el proceso hijo
        print("Lanzado. ¿Está vivo?", proceso.poll() is None)
        codigo = proceso.wait()                                      # el padre espera a que termine
        print(f"El hijo terminó con código {codigo}. ¿Está vivo? {proceso.poll() is None}")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        Demo.hijo()
    else:
        Demo.padre()
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? True
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? False
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="funcion" markdown="1">

<p class="pg-cab">C# · como función</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

void Hijo()                                                   // lo ejecuta el proceso hijo
{
    Thread.Sleep(1000);                                          // el hijo trabaja un segundo
    Console.WriteLine("   Hijo: he terminado mi trabajo");
}

void Padre()
{
    Console.WriteLine("Preparado, pero todavía no lanzado");
    Process hijo = Process.Start(Environment.ProcessPath!, new[] { "hijo" })!;   // aquí nace el proceso hijo
    Console.WriteLine("Lanzado. ¿Está vivo? " + !hijo.HasExited);
    hijo.WaitForExit();                                          // el padre espera a que termine
    Console.WriteLine("El hijo terminó con código " + hijo.ExitCode + ". ¿Está vivo? " + !hijo.HasExited);
}

if (args.Length > 0 && args[0] == "hijo") Hijo();
else Padre();
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? True
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? False
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="clase" markdown="1">

<p class="pg-cab">C# · como clase</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

var demo = new Demo();
if (args.Length > 0 && args[0] == "hijo") demo.Hijo();
else demo.Padre();

class Demo
{
    public void Hijo()                                                   // lo ejecuta el proceso hijo
    {
        Thread.Sleep(1000);                                          // el hijo trabaja un segundo
        Console.WriteLine("   Hijo: he terminado mi trabajo");
    }

    public void Padre()
    {
        Console.WriteLine("Preparado, pero todavía no lanzado");
        Process hijo = Process.Start(Environment.ProcessPath!, new[] { "hijo" })!;   // aquí nace el proceso hijo
        Console.WriteLine("Lanzado. ¿Está vivo? " + !hijo.HasExited);
        hijo.WaitForExit();                                          // el padre espera a que termine
        Console.WriteLine("El hijo terminó con código " + hijo.ExitCode + ". ¿Está vivo? " + !hijo.HasExited);
    }
}
```

**Salida:**

```text
Preparado, pero todavía no lanzado
Lanzado. ¿Está vivo? True
   Hijo: he terminado mi trabajo
El hijo terminó con código 0. ¿Está vivo? False
```

</div>

</div>


* `new ProcessBuilder(...)` **prepara** la orden: dice qué programa se ejecutará y con qué argumentos. **No arranca nada**: en la salida ves `Preparado, pero todavía no lanzado` antes de que exista ningún hijo.
* `pb.start()` **lanza** el proceso: ahí nace el hijo.
* `pb.inheritIO()` hace que el hijo escriba **en tu misma consola**. Sin eso, lo que el hijo escribe va a una tubería que nadie lee y no lo ves (hay un ejemplo en [3.5](05-errores.md)).

| | Java / Kotlin | Python | C# |
|---|---|---|---|
| Preparar | `new ProcessBuilder(...)` | (no hay paso previo) | (no hay paso previo) |
| Lanzar | `pb.start()` | `subprocess.Popen([...])` | `Process.Start(...)` |

!!! note "En Java, `start()` y `waitFor()` obligan a declarar excepciones"
    `start()` puede lanzar **`IOException`** (por ejemplo, si el programa no existe) y `waitFor()` puede lanzar **`InterruptedException`** (si interrumpen al hilo mientras espera). Por eso `main` lleva `throws Exception`. Por ahora basta con declararlas; Python y C# no te obligan.

En Windows también puedes lanzar aplicaciones con ventana: `new ProcessBuilder("notepad.exe").start()` abre el Bloc de notas (aquí no se ejecuta, porque abre una ventana). Tu programa Java sigue su camino sin esperarlo.

## Paso 4 · Guarda el proceso que lanzas

En el ejemplo, `Process hijo = pb.start();` **guarda** lo que devuelve `start()`. Con esa variable puedes preguntarle cosas al hijo; si solo escribes `pb.start();`, lo lanzas pero ya no puedes consultarlo ni esperarlo.

| Quiero... | Java / Kotlin (`Process`) | Python (`Popen`) | C# (`Process`) |
|---|---|---|---|
| El PID del hijo | `hijo.pid()` | `proceso.pid` | `hijo.Id` |
| ¿Sigue vivo? | `hijo.isAlive()` | `proceso.poll() is None` | `!hijo.HasExited` |
| Esperar a que termine | `hijo.waitFor()` | `proceso.wait()` | `hijo.WaitForExit()` |
| Su código de salida | lo que devuelve `waitFor()` | lo que devuelve `wait()` | `hijo.ExitCode` |

## Paso 5 · Esperar y recoger el código de salida

Fíjate en el orden de la salida del ejemplo:

1. El padre escribe `Preparado...` y lanza al hijo.
2. `Lanzado. ¿Está vivo? true`: el padre **no esperó**, siguió y vio que el hijo aún trabajaba (dormía un segundo).
3. El padre llega a `waitFor()` y **se queda parado ahí**.
4. El hijo escribe su mensaje y termina.
5. `waitFor()` devuelve el **código de salida** (`0`) y el padre sigue: ahora el hijo ya no está vivo.

Por convención, el código **`0` significa «todo ha ido bien»** y cualquier otro número indica un problema. Quién lo decide es el hijo (lo verás en el [paso 10](04-argumentos-codigo.md)).

**Pregunta de comprensión 3.** El padre ejecuta esto y el hijo tarda 30 segundos en terminar. ¿Cuándo aparecen A y B?

```java
System.out.println("A");
hijo.waitFor();
System.out.println("B");
```

??? success "Respuesta"
    **A** sale al instante y **B** a los 30 segundos, cuando el hijo termina. `waitFor()` **bloquea** al padre hasta entonces: no hace nada más mientras espera.

**Pregunta de comprensión 4.** ¿Por qué se escribe `Process hijo = pb.start();` y no solo `pb.start();`?

??? success "Respuesta"
    Porque `start()` **devuelve** el objeto que representa al hijo. Si no lo guardas en una variable, lo has lanzado pero **ya no tienes cómo** pedirle su PID, saber si sigue vivo, esperarlo o recoger su código de salida.

## Paso 6 · Dos hijos: el orden de espera

<div class="pg" data-pg="dos" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
public class Main {
    static void hijo(int segundos) throws Exception {                    // lo ejecuta cada proceso hijo
        Thread.sleep(segundos * 1000L);                              // no escribe nada: solo trabaja
    }

    static Process lanzar(int segundos) throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        return new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "Main", "hijo", String.valueOf(segundos)).start();
    }

    static void padre() throws Exception {
        Process largo = lanzar(3);                                   // este tarda 3 segundos
        Process corto = lanzar(1);                                   // este tarda 1 segundo
        System.out.println("¿Los dos están vivos? " + (largo.isAlive() && corto.isAlive()));

        largo.waitFor();                                             // esperamos primero al largo
        System.out.println("El proceso largo ha terminado");
        System.out.println("¿El corto ya había terminado? " + !corto.isAlive());
        corto.waitFor();                                             // ya terminó: no hay nada que esperar
        System.out.println("El proceso corto ha terminado");
    }

    public static void main(String[] args) throws Exception {
        if (args.length > 0 && args[0].equals("hijo")) hijo(Integer.parseInt(args[1]));
        else padre();
    }
}
```

**Salida:**

```text
¿Los dos están vivos? true
El proceso largo ha terminado
¿El corto ya había terminado? true
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
public class Demo {
    void hijo(int segundos) throws Exception {                    // lo ejecuta cada proceso hijo
        Thread.sleep(segundos * 1000L);                              // no escribe nada: solo trabaja
    }

    Process lanzar(int segundos) throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        return new ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "Demo", "hijo", String.valueOf(segundos)).start();
    }

    void padre() throws Exception {
        Process largo = lanzar(3);                                   // este tarda 3 segundos
        Process corto = lanzar(1);                                   // este tarda 1 segundo
        System.out.println("¿Los dos están vivos? " + (largo.isAlive() && corto.isAlive()));

        largo.waitFor();                                             // esperamos primero al largo
        System.out.println("El proceso largo ha terminado");
        System.out.println("¿El corto ya había terminado? " + !corto.isAlive());
        corto.waitFor();                                             // ya terminó: no hay nada que esperar
        System.out.println("El proceso corto ha terminado");
    }

    public static void main(String[] args) throws Exception {
        Demo demo = new Demo();
        if (args.length > 0 && args[0].equals("hijo")) demo.hijo(Integer.parseInt(args[1]));
        else demo.padre();
    }
}
```

**Salida:**

```text
¿Los dos están vivos? true
El proceso largo ha terminado
¿El corto ya había terminado? true
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
fun hijo(segundos: Int) {                                        // lo ejecuta cada proceso hijo
    Thread.sleep(segundos * 1000L)                               // no escribe nada: solo trabaja
}

fun lanzar(segundos: Int): Process {
    val java = ProcessHandle.current().info().command().orElse("java")
    return ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo", segundos.toString()).start()
}

fun padre() {
    val largo = lanzar(3)                                        // este tarda 3 segundos
    val corto = lanzar(1)                                        // este tarda 1 segundo
    println("¿Los dos están vivos? ${largo.isAlive && corto.isAlive}")

    largo.waitFor()                                              // esperamos primero al largo
    println("El proceso largo ha terminado")
    println("¿El corto ya había terminado? ${!corto.isAlive}")
    corto.waitFor()                                              // ya terminó: no hay nada que esperar
    println("El proceso corto ha terminado")
}

fun main(args: Array<String>) {
    if (args.firstOrNull() == "hijo") hijo(args[1].toInt()) else padre()
}
```

**Salida:**

```text
¿Los dos están vivos? true
El proceso largo ha terminado
¿El corto ya había terminado? true
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
class Demo {
    fun hijo(segundos: Int) {                                        // lo ejecuta cada proceso hijo
        Thread.sleep(segundos * 1000L)                               // no escribe nada: solo trabaja
    }

    fun lanzar(segundos: Int): Process {
        val java = ProcessHandle.current().info().command().orElse("java")
        return ProcessBuilder(java, "-cp", System.getProperty("java.class.path"), "MainKt", "hijo", segundos.toString()).start()
    }

    fun padre() {
        val largo = lanzar(3)                                        // este tarda 3 segundos
        val corto = lanzar(1)                                        // este tarda 1 segundo
        println("¿Los dos están vivos? ${largo.isAlive && corto.isAlive}")

        largo.waitFor()                                              // esperamos primero al largo
        println("El proceso largo ha terminado")
        println("¿El corto ya había terminado? ${!corto.isAlive}")
        corto.waitFor()                                              // ya terminó: no hay nada que esperar
        println("El proceso corto ha terminado")
    }
}

fun main(args: Array<String>) {
    val demo = Demo()
    if (args.firstOrNull() == "hijo") demo.hijo(args[1].toInt()) else demo.padre()
}
```

**Salida:**

```text
¿Los dos están vivos? true
El proceso largo ha terminado
¿El corto ya había terminado? true
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="python" data-forma="funcion" markdown="1">

<p class="pg-cab">Python · como función</p>

```python
import subprocess
import sys
import time

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

def hijo(segundos):                                              # lo ejecuta cada proceso hijo
    time.sleep(segundos)                                         # no escribe nada: solo trabaja


def lanzar(segundos):
    return subprocess.Popen([sys.executable, __file__, "hijo", str(segundos)])


def padre():
    largo = lanzar(3)                                         # este tarda 3 segundos
    corto = lanzar(1)                                         # este tarda 1 segundo
    print("¿Los dos están vivos?", largo.poll() is None and corto.poll() is None)

    largo.wait()                                                 # esperamos primero al largo
    print("El proceso largo ha terminado")
    print("¿El corto ya había terminado?", corto.poll() is not None)
    corto.wait()                                                 # ya terminó: no hay nada que esperar
    print("El proceso corto ha terminado")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        hijo(int(sys.argv[2]))
    else:
        padre()
```

**Salida:**

```text
¿Los dos están vivos? True
El proceso largo ha terminado
¿El corto ya había terminado? True
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="python" data-forma="clase" markdown="1">

<p class="pg-cab">Python · como clase</p>

```python
import subprocess
import sys
import time

sys.stdout.reconfigure(line_buffering=True)     # cada línea sale al escribirla: así el orden con el hijo es el de la consola

class Demo:
    @staticmethod
    def hijo(segundos):                                              # lo ejecuta cada proceso hijo
        time.sleep(segundos)                                         # no escribe nada: solo trabaja

    @staticmethod
    def lanzar(segundos):
        return subprocess.Popen([sys.executable, __file__, "hijo", str(segundos)])

    @staticmethod
    def padre():
        largo = Demo.lanzar(3)                                         # este tarda 3 segundos
        corto = Demo.lanzar(1)                                         # este tarda 1 segundo
        print("¿Los dos están vivos?", largo.poll() is None and corto.poll() is None)

        largo.wait()                                                 # esperamos primero al largo
        print("El proceso largo ha terminado")
        print("¿El corto ya había terminado?", corto.poll() is not None)
        corto.wait()                                                 # ya terminó: no hay nada que esperar
        print("El proceso corto ha terminado")


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "hijo":
        Demo.hijo(int(sys.argv[2]))
    else:
        Demo.padre()
```

**Salida:**

```text
¿Los dos están vivos? True
El proceso largo ha terminado
¿El corto ya había terminado? True
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="funcion" markdown="1">

<p class="pg-cab">C# · como función</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

void Hijo(int segundos)                                       // lo ejecuta cada proceso hijo
{
    Thread.Sleep(segundos * 1000);                               // no escribe nada: solo trabaja
}

Process Lanzar(int segundos) =>
    Process.Start(Environment.ProcessPath!, new[] { "hijo", segundos.ToString() })!;

void Padre()
{
    Process largo = Lanzar(3);                                   // este tarda 3 segundos
    Process corto = Lanzar(1);                                   // este tarda 1 segundo
    Console.WriteLine("¿Los dos están vivos? " + (!largo.HasExited && !corto.HasExited));

    largo.WaitForExit();                                         // esperamos primero al largo
    Console.WriteLine("El proceso largo ha terminado");
    Console.WriteLine("¿El corto ya había terminado? " + corto.HasExited);
    corto.WaitForExit();                                         // ya terminó: no hay nada que esperar
    Console.WriteLine("El proceso corto ha terminado");
}

if (args.Length > 0 && args[0] == "hijo") Hijo(int.Parse(args[1]));
else Padre();
```

**Salida:**

```text
¿Los dos están vivos? True
El proceso largo ha terminado
¿El corto ya había terminado? True
El proceso corto ha terminado
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="clase" markdown="1">

<p class="pg-cab">C# · como clase</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

var demo = new Demo();
if (args.Length > 0 && args[0] == "hijo") demo.Hijo(int.Parse(args[1]));
else demo.Padre();

class Demo
{
    public void Hijo(int segundos)                                       // lo ejecuta cada proceso hijo
    {
        Thread.Sleep(segundos * 1000);                               // no escribe nada: solo trabaja
    }

    public Process Lanzar(int segundos) =>
        Process.Start(Environment.ProcessPath!, new[] { "hijo", segundos.ToString() })!;

    public void Padre()
    {
        Process largo = Lanzar(3);                                   // este tarda 3 segundos
        Process corto = Lanzar(1);                                   // este tarda 1 segundo
        Console.WriteLine("¿Los dos están vivos? " + (!largo.HasExited && !corto.HasExited));

        largo.WaitForExit();                                         // esperamos primero al largo
        Console.WriteLine("El proceso largo ha terminado");
        Console.WriteLine("¿El corto ya había terminado? " + corto.HasExited);
        corto.WaitForExit();                                         // ya terminó: no hay nada que esperar
        Console.WriteLine("El proceso corto ha terminado");
    }
}
```

**Salida:**

```text
¿Los dos están vivos? True
El proceso largo ha terminado
¿El corto ya había terminado? True
El proceso corto ha terminado
```

</div>

</div>


Los **dos hijos arrancan antes** de que el padre empiece a esperar, así que trabajan a la vez (el que tarda 3 s y el que tarda 1 s). Esperar es otra cosa y es **en orden**:

1. `largo.waitFor()` bloquea al padre unos 3 segundos.
2. Mientras tanto, el corto terminó (a los 1 s). Por eso `¿El corto ya había terminado?` da `true`.
3. `corto.waitFor()` **no espera nada**: ya había terminado.

El tiempo total es el del más lento (unos 3 s), no la suma (4 s): esa es la ventaja de lanzar los dos antes de esperar.

**Pregunta de comprensión 5.** Hay dos hijos, uno de 5 s y otro de 1 s, y el padre escribe un mensaje al terminar de esperar a cada uno. Si espera primero al de 5 s y luego al de 1 s, ¿cuándo sale cada mensaje? ¿Y si espera primero al de 1 s?

??? success "Respuesta"
    Esperando primero al de 5 s: **los dos mensajes salen a los 5 s**, uno detrás de otro casi a la vez. Aunque el de 1 s terminó mucho antes, el padre estaba parado en la primera espera y no lo ha mirado hasta entonces. Esperando primero al de 1 s: el mensaje del corto sale **a 1 s** y el del largo **a 5 s**.

!!! warning "Algunas aplicaciones con ventana se abren a través de un intermediario"
    Con algunos programas de Windows, el proceso que lanzas puede **terminar enseguida** aunque la ventana siga abierta, porque se abren mediante otro proceso. Por eso los ejemplos de esta unidad usan un hijo tuyo, que se comporta igual en todos los sistemas.

## Qué recordar

* `new ProcessBuilder(...)` **prepara**; `start()` **lanza** y devuelve el `Process` (o el `Popen`/`Process` del otro lenguaje): guárdalo.
* `waitFor()` **bloquea** al padre hasta que el hijo termina y devuelve su **código de salida** (0 = bien).
* Lanza todos los hijos **antes** de esperar: así trabajan a la vez. Esperar es secuencial.
* Con `inheritIO()` el hijo escribe en la consola del padre.

Ahora, los ejercicios [P3.3 a P3.6](ejercicios.md). Siguiente: [3.3 Un programa tuyo como hijo](03-tu-hijo.md).
