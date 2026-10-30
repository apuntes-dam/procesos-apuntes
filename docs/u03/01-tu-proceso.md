# 3.1 Tu propio proceso

Antes de lanzar procesos, aprende a **mirar el tuyo**. Cada vez que ejecutas un programa, el sistema crea un proceso nuevo y le da un **PID**, el número que lo identifica ([1.1](../u01/01-proceso.md)). Tu propio programa puede preguntar por él.

## Pasos 1 y 2 · Mi PID y mis datos

<div class="pg" data-pg="pid" markdown="1">

<div class="pg-panel" data-lang="java" data-forma="funcion" markdown="1">

<p class="pg-cab">Java · como función</p>

```java
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        ProcessHandle yo = ProcessHandle.current();                      // «mi proceso»
        System.out.println("¿Mi PID es un número positivo? " + (yo.pid() > 0));
        System.out.println("¿Sigo vivo? " + yo.isAlive());
        String programa = yo.info().command().orElse("desconocido");     // Optional: el dato puede no estar
        System.out.println("Me ejecuta el programa: " + Path.of(programa).getFileName());
    }
}
```

**Salida:**

```text
¿Mi PID es un número positivo? true
¿Sigo vivo? true
Me ejecuta el programa: java.exe
```

</div>

<div class="pg-panel" data-lang="java" data-forma="clase" markdown="1">

<p class="pg-cab">Java · como clase</p>

```java
import java.nio.file.Path;

public class Demo {
    void mostrar() {
        ProcessHandle yo = ProcessHandle.current();                      // «mi proceso»
        System.out.println("¿Mi PID es un número positivo? " + (yo.pid() > 0));
        System.out.println("¿Sigo vivo? " + yo.isAlive());
        String programa = yo.info().command().orElse("desconocido");     // Optional: el dato puede no estar
        System.out.println("Me ejecuta el programa: " + Path.of(programa).getFileName());
    }

    public static void main(String[] args) {
        new Demo().mostrar();
    }
}
```

**Salida:**

```text
¿Mi PID es un número positivo? true
¿Sigo vivo? true
Me ejecuta el programa: java.exe
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="funcion" markdown="1">

<p class="pg-cab">Kotlin · como función</p>

```kotlin
import java.nio.file.Path

fun main() {
    val yo = ProcessHandle.current()                                 // «mi proceso»
    println("¿Mi PID es un número positivo? ${yo.pid() > 0}")
    println("¿Sigo vivo? ${yo.isAlive}")
    val programa = yo.info().command().orElse("desconocido")        // Optional: el dato puede no estar
    println("Me ejecuta el programa: ${Path.of(programa).fileName}")
}
```

**Salida:**

```text
¿Mi PID es un número positivo? true
¿Sigo vivo? true
Me ejecuta el programa: java.exe
```

</div>

<div class="pg-panel" data-lang="kotlin" data-forma="clase" markdown="1">

<p class="pg-cab">Kotlin · como clase</p>

```kotlin
import java.nio.file.Path

class Demo {
    fun mostrar() {
        val yo = ProcessHandle.current()                             // «mi proceso»
        println("¿Mi PID es un número positivo? ${yo.pid() > 0}")
        println("¿Sigo vivo? ${yo.isAlive}")
        val programa = yo.info().command().orElse("desconocido")    // Optional: el dato puede no estar
        println("Me ejecuta el programa: ${Path.of(programa).fileName}")
    }
}

fun main() {
    Demo().mostrar()
}
```

**Salida:**

```text
¿Mi PID es un número positivo? true
¿Sigo vivo? true
Me ejecuta el programa: java.exe
```

</div>

<div class="pg-panel" data-lang="python" data-forma="funcion" markdown="1">

<p class="pg-cab">Python · como función</p>

```python
import os
import sys

print("¿Mi PID es un número positivo?", os.getpid() > 0)           # mi proceso: os.getpid()
print("Me ejecuta el programa:", os.path.basename(sys.executable))
```

**Salida:**

```text
¿Mi PID es un número positivo? True
Me ejecuta el programa: python.exe
```

</div>

<div class="pg-panel" data-lang="python" data-forma="clase" markdown="1">

<p class="pg-cab">Python · como clase</p>

```python
import os
import sys


class Demo:
    @staticmethod
    def mostrar():
        print("¿Mi PID es un número positivo?", os.getpid() > 0)   # mi proceso: os.getpid()
        print("Me ejecuta el programa:", os.path.basename(sys.executable))


Demo.mostrar()
```

**Salida:**

```text
¿Mi PID es un número positivo? True
Me ejecuta el programa: python.exe
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="funcion" markdown="1">

<p class="pg-cab">C# · como función</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

Process yo = Process.GetCurrentProcess();                          // «mi proceso»
Console.WriteLine("¿Mi PID es un número positivo? " + (yo.Id > 0));
Console.WriteLine("Me ejecuta el programa: " + Path.GetFileName(Environment.ProcessPath));
```

**Salida:**

```text
¿Mi PID es un número positivo? True
Me ejecuta el programa: main.exe
```

</div>

<div class="pg-panel" data-lang="csharp" data-forma="clase" markdown="1">

<p class="pg-cab">C# · como clase</p>

```csharp
using System.Diagnostics;

Console.OutputEncoding = System.Text.Encoding.UTF8;   // para que la consola muestre las tildes

new Demo().Mostrar();

class Demo
{
    public void Mostrar()
    {
        Process yo = Process.GetCurrentProcess();                  // «mi proceso»
        Console.WriteLine("¿Mi PID es un número positivo? " + (yo.Id > 0));
        Console.WriteLine("Me ejecuta el programa: " + Path.GetFileName(Environment.ProcessPath));
    }
}
```

**Salida:**

```text
¿Mi PID es un número positivo? True
Me ejecuta el programa: main.exe
```

</div>

</div>


Línea a línea, en Java (las otras pestañas hacen lo mismo con sus herramientas):

* `ProcessHandle.current()` devuelve una **referencia a tu proceso**: es como un mando a distancia con el que puedes preguntarle cosas.
* `.pid()` pregunta por su **PID**. No se imprime el número porque cambia en cada ejecución; por eso solo se comprueba que es positivo.
* `.isAlive()` pregunta si **sigue vivo**. Para tu propio proceso siempre es `true` (si no, no estarías ejecutando nada). Cobra sentido en el [paso 4](02-lanzar-esperar.md), con un proceso que lanzas tú.
* `.info().command()` da el programa que ejecuta tu proceso (aquí, `java.exe`, el intérprete de Java: tu programa no es un ejecutable propio, lo ejecuta la JVM).

| Quiero... | Java / Kotlin | Python | C# |
|---|---|---|---|
| Mi proceso | `ProcessHandle.current()` | (no hace falta: se usa `os`) | `Process.GetCurrentProcess()` |
| Mi PID | `.pid()` | `os.getpid()` | `.Id` |
| El programa que me ejecuta | `.info().command()` | `sys.executable` | `Environment.ProcessPath` |

!!! note "¿Por qué hay un `orElse` y qué es un `Optional`?"
    El sistema puede **negarse a dar** el programa de un proceso (por permisos, por ejemplo). Por eso `command()` no devuelve un texto, sino un `Optional<String>`: una caja que puede estar vacía. `.orElse("desconocido")` dice qué usar si está vacía. Sin él, `println` mostraría `Optional[...]` en vez del texto.

**Pregunta de comprensión 1.** ¿En qué se diferencian `ProcessHandle yo = ProcessHandle.current();` y `yo.pid()`?

??? success "Respuesta"
    La primera instrucción **guarda una referencia** a tu proceso en la variable `yo`: todavía no has preguntado nada. La segunda **pregunta a esa referencia** por un dato concreto, su número de identificación. Con la misma referencia puedes preguntar más cosas (`isAlive()`, `info()`...).

**Pregunta de comprensión 2.** Ejecutas el programa dos veces. ¿Sale el mismo PID? ¿Por qué?

??? success "Respuesta"
    **No.** Cada ejecución crea un proceso **nuevo** y el sistema le asigna un PID que no esté en uso. El programa es el mismo archivo; los procesos son dos. (Es la diferencia entre programa y proceso de [1.1](../u01/01-proceso.md).)

## Qué recordar

* Cada ejecución de un programa es un **proceso nuevo**, con su propio PID.
* Java: `ProcessHandle.current()` es *tu* proceso; Python: `os.getpid()`; C#: `Process.GetCurrentProcess()`.
* Lo que el sistema puede negarse a dar viene en un `Optional`: usa `orElse`.

Ahora, los ejercicios [P3.1 y P3.2](ejercicios.md). Siguiente: [3.2 Lanzar otro programa y esperar](02-lanzar-esperar.md).
