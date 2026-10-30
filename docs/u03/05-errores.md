# 3.5 Errores típicos al empezar

Los fallos que más se repiten al crear procesos desde el código. Cada uno: cómo se ve, por qué pasa y cómo se arregla. Los que tienen salida se han ejecutado de verdad (Java 25 en Windows).

## 1. El programa y su argumento, en una sola cadena

```java
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try {
            new ProcessBuilder("java -version").start();      // ¡el programa y su argumento, en una sola cadena!
        } catch (IOException e) {
            System.out.println("IOException: " + e.getMessage());
        }
    }
}
```

**Salida:**

```text
IOException: Cannot run program "java -version": CreateProcess error=2, El sistema no puede encontrar el archivo especificado
```


Java busca un programa que se llame **exactamente** `java -version` (con el espacio) y no existe. El mensaje exacto depende del sistema operativo y de su idioma; lo que importa es `IOException`.

```java
new ProcessBuilder("java -version")        // ❌ una sola pieza
new ProcessBuilder("java", "-version")     // ✅ el programa, y cada argumento aparte
```

## 2. Imprimir el `Process` en vez del PID

```java
public class Main {
    public static void main(String[] args) throws Exception {
        String java = ProcessHandle.current().info().command().orElse("java");
        Process proceso = new ProcessBuilder(java, "-version")
                .redirectErrorStream(true).redirectOutput(ProcessBuilder.Redirect.DISCARD).start();
        proceso.waitFor();
        System.out.println("Mal:  PID: " + proceso);               // se imprime el objeto entero
        System.out.println("Bien: PID: " + proceso.pid());         // se imprime solo su PID
    }
}
```

**Salida:**

```text
Mal:  PID: Process[pid=3576, exitValue=0]
Bien: PID: 3576
```


Si sumas el objeto `proceso` a un texto, Java usa su representación, que **no es el PID**. Para el número hay que pedirlo con `proceso.pid()`. (El PID de tu equipo será otro.)

## 3. Creer que `new ProcessBuilder(...)` ya lanza el proceso

`new ProcessBuilder(...)` solo **prepara**; hasta `start()` no existe ningún hijo ([paso 3](02-lanzar-esperar.md)). Un efecto frecuente: mostrar `Hijo lanzado` **antes** de `start()`. El mensaje se escribe aunque el lanzamiento falle después (por ejemplo, con un `IOException`).

```java
System.out.println("Hijo lanzado");   // ❌ todavía no se ha lanzado nada
pb.start();

pb.start();                           // ✅ primero se lanza...
System.out.println("Hijo lanzado");   // ...y solo si no ha fallado, se avisa
```

## 4. `"java.class.path"` entre comillas, o no pasar `-cp`

Los dos errores dan el mismo resultado: `Could not find or load main class`, con el código de salida 1. Tienes el ejemplo ejecutado, con su mensaje, en [3.3](03-tu-hijo.md). Lo correcto es `System.getProperty("java.class.path")` sin comillas y detrás de `-cp`.

## 5. El hijo «no habla»

```java
public class Main {
    static int lanzar(boolean compartirConsola) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(ProcessHandle.current().info().command().orElse("java"),
                "-cp", System.getProperty("java.class.path"), "Main", "hijo");
        if (compartirConsola) pb.inheritIO();
        return pb.start().waitFor();
    }

    public static void main(String[] args) throws Exception {
        if (args.length > 0 && args[0].equals("hijo")) {
            System.out.println("   Hijo: ¡hola!");
            return;
        }
        System.out.println("Sin inheritIO(): código " + lanzar(false) + ", pero no se ha visto nada del hijo");
        System.out.println("Con inheritIO():");
        System.out.println("   (el hijo terminó con código " + lanzar(true) + ")");
    }
}
```

**Salida:**

```text
Sin inheritIO(): código 0, pero no se ha visto nada del hijo
Con inheritIO():
   Hijo: ¡hola!
   (el hijo terminó con código 0)
```


Sin `inheritIO()`, lo que el hijo escribe va a una tubería que el padre no lee: el hijo funciona (código `0`), pero **no ves nada**. Con `inheritIO()` comparte tu consola. Si lo que quieres es *leer* lo que escribe para usarlo en el programa, mira [A6.B Hablar con el proceso hijo](https://apuntes-dam.github.io/java-apuntes/avanzado/a6/t-flujos/) en la web de Java.

## 6. Leer un argumento que no existe

El hijo hace `args[2]` y solo le llegaron dos: `ArrayIndexOutOfBoundsException`, código de salida 1. El padre sigue vivo. Compruébalo siempre con `args.length`; lo tienes completo en [3.4](04-argumentos-codigo.md).

## 7. El hijo falla pero devuelve 0

Si el hijo solo escribe `ERROR` y termina normalmente, `waitFor()` da `0` y el padre cree que fue bien. Hay que terminar con `System.exit(1)` (`exitProcess(1)`, `sys.exit(1)`...).

## 8. Errores al escribir el programa

**Una clase pública debe llamarse como su archivo.** Si el archivo es `Main.java`, la clase es `Main` (con mayúscula, por convención):

```java
public class main {
    public static void main(String[] args) {
        System.out.println("Hola");
    }
}
```

**Lo que dice el compilador:**

```text
Main.java:1: error: class main is public, should be declared in a file named main.java
public class main {
       ^
1 error
```


**La barra invertida de Windows es un carácter especial en un texto de Java.** Hay que escribirla doble (`\\`) o usar barras normales (`/`), que Windows también entiende:

```java
public class Main {
    public static void main(String[] args) {
        String ruta = "C:\Users\ana\datos.txt";
    }
}
```

**Lo que dice el compilador:**

```text
Main.java:3: error: illegal escape character
        String ruta = "C:\Users\ana\datos.txt";
                          ^
Main.java:3: error: illegal escape character
        String ruta = "C:\Users\ana\datos.txt";
                                ^
Main.java:3: error: illegal escape character
        String ruta = "C:\Users\ana\datos.txt";
                                    ^
3 errors
```


```java
String ruta = "C:\\Users\\ana\\datos.txt";    // ✅ barras dobles
String ruta = "C:/Users/ana/datos.txt";       // ✅ barras normales
```

## Si algo no funciona, comprueba

1. ¿Has llamado a **`start()`**?
2. ¿Has guardado el **`Process`** en una variable?
3. ¿El programa y **cada argumento** van como piezas separadas?
4. ¿Has pasado **`-cp`** con la ruta real (`System.getProperty`)?
5. ¿El hijo **comprueba `args.length`** y **termina con `exit(1)`** si hay un error?
6. ¿Has puesto **`inheritIO()`** para ver lo que escribe el hijo?

Y para practicar: [los 10 ejercicios](ejercicios.md).
