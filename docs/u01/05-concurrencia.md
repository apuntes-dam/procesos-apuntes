# 1.5 Concurrencia, paralelismo y distribución

Hay tres formas de conseguir que un sistema haga **varias cosas «a la vez»**. Se diferencian en **cuántos procesadores** hay y **dónde están**.

## El punto de partida: ejecución secuencial

Un programa **secuencial** hace una instrucción detrás de otra y no empieza un paso hasta que acaba el anterior. Es lo más sencillo de escribir y de depurar, pero **desaprovecha el equipo**: con 8 núcleos usa uno y los otros siete esperan, y mientras espera al disco o a la red, la CPU tampoco hace nada.

## Concurrencia

Hay **concurrencia** cuando varias tareas están **en curso durante el mismo periodo**, aunque no se ejecuten en el mismo instante. Es **un solo cocinero** que prepara una ensalada y una sopa: pica un poco, remueve la sopa, vuelve a picar... Los dos platos avanzan, pero en cada instante solo hace una cosa.

En un equipo con **un solo núcleo**, el sistema operativo hace lo mismo: ejecuta un trozo de un proceso, lo para y ejecuta un trozo de otro (es lo que se llama **multiprogramación**). Como los cambios son tan rápidos, parece que todo va a la vez. **No se gana tiempo de CPU, pero no se desperdicia**: mientras un proceso espera al disco, el procesador atiende a otro (los procesos [limitados por E/S](02-estados.md) lo permiten).

## Paralelismo

Hay **paralelismo** cuando varias tareas se ejecutan **en el mismo instante**, en núcleos o procesadores distintos: ahora hay **dos cocineros**, uno pica y otro remueve. Necesita hardware con varios núcleos (**multiprocesamiento**).

* **Todo programa paralelo es concurrente, pero no al revés.** La concurrencia es organizar varias tareas; el paralelismo es tener más manos para hacerlas.
* **Multitarea no es lo mismo que multinúcleo.** Multitarea es que el sistema tenga varias tareas en curso (Windows 95 ya era multitarea con un solo núcleo); multiprocesamiento es tener varios núcleos.

### Tareas independientes y dependientes

* **Independientes**: cada parte se calcula sin saber nada de las demás (aplicar un filtro a 1000 fotos, contar los primos de un rango). Basta con **repartir** el trabajo: paralelismo «trivial».
* **Dependientes**: un paso necesita el resultado del anterior (la sucesión de Fibonacci, los pasos de una receta). Hay que **sincronizar**, y eso limita lo que se gana.

## La ley de Amdahl

Casi todos los programas tienen una parte que se puede paralelizar y otra **secuencial por naturaleza** (preparar los datos, repartirlos, juntar los resultados). Por muchos núcleos que se añadan, la parte secuencial tarda lo mismo. Si una fracción **p** del programa es paralelizable, con **n** núcleos la **aceleración máxima** es:

`S(n) = 1 / ((1 − p) + p / n)`

Para un programa que tarda 100 s y es paralelizable en un 80 % (p = 0,8):

```python
def aceleracion(p, n):
    return 1 / ((1 - p) + p / n)


p = 0.8                      # el 80 % del programa se puede paralelizar
for n in (1, 2, 4, 8, 1000):
    s = aceleracion(p, n)
    print(f"{n:>5} núcleos: aceleración {s:.2f}x, el programa tarda {100 / s:.0f} s")
print(f"Con infinitos núcleos: {1 / (1 - p):.2f}x, {100 / (1 / (1 - p)):.0f} s")
```

**Salida:**

```text
    1 núcleos: aceleración 1.00x, el programa tarda 100 s
    2 núcleos: aceleración 1.67x, el programa tarda 60 s
    4 núcleos: aceleración 2.50x, el programa tarda 40 s
    8 núcleos: aceleración 3.33x, el programa tarda 30 s
 1000 núcleos: aceleración 4.98x, el programa tarda 20 s
Con infinitos núcleos: 5.00x, 20 s
```

Aunque hubiera infinitos núcleos, el programa **nunca baja de 20 s**: es lo que tarda su parte secuencial. **Un programa paralelo va tan rápido como su parte secuencial más lenta.** Es lo que pasa en un supermercado: cientos de personas compran a la vez, pero al pagar se forman colas porque hay pocas cajas.

### Medido en un equipo real

Esta tabla no es teórica: se ha medido repartiendo el cálculo de los números primos hasta 400 000 entre 1, 2 y 4 procesos (en un equipo con varios núcleos; **tus tiempos serán otros**).

```python
import multiprocessing
import time


def contar_primos(desde, hasta):
    cuenta = 0
    for n in range(max(desde, 2), hasta):
        if all(n % d for d in range(2, int(n ** 0.5) + 1)):
            cuenta += 1
    return cuenta


if __name__ == "__main__":
    LIMITE = 400_000
    tiempo_uno = None
    for procesos in (1, 2, 4):
        trozos = [(i * LIMITE // procesos, (i + 1) * LIMITE // procesos) for i in range(procesos)]
        inicio = time.perf_counter()
        with multiprocessing.Pool(procesos) as pool:
            total = sum(pool.starmap(contar_primos, trozos))
        tiempo = time.perf_counter() - inicio
        tiempo_uno = tiempo_uno or tiempo
        print(f"{procesos} proceso(s): {total} primos en {tiempo:.2f} s  (aceleración {tiempo_uno / tiempo:.2f}x)")
```

**Salida:**

```text
1 proceso(s): 33860 primos en 1.62 s  (aceleración 1.00x)
2 proceso(s): 33860 primos en 0.97 s  (aceleración 1.67x)
4 proceso(s): 33860 primos en 0.68 s  (aceleración 2.37x)
```

Con 4 procesos la aceleración **no es 4**. Hay tres razones: parte del trabajo es secuencial (repartir y sumar), **crear procesos cuesta tiempo** y los trozos **no están equilibrados** (los números grandes tardan más en comprobarse, así que el último trozo tarda más que el primero). Es la ley de Amdahl en la práctica.

## Programación distribuida

En la programación **distribuida**, el trabajo se reparte entre **varios ordenadores independientes**, conectados por una red, que colaboran como si fueran uno solo. Cada ordenador tiene su propia memoria y su propio reloj, y solo se comunican **enviándose mensajes**. Ejemplos: una aplicación web con el servidor en la nube y el cliente en el móvil, un videojuego en línea, el sistema de pagos de un banco.

| | **Ventajas** | **Inconvenientes** |
|---|---|---|
| **Paralela** (un equipo, varios núcleos) | Comunicación muy rápida a través de la memoria; más sencilla de programar | Limitada a los núcleos de una máquina; si el equipo falla, falla todo |
| **Distribuida** (varios equipos) | Se amplía añadiendo máquinas; **tolera fallos** (si cae un servidor, otro lo sustituye) | La red es lenta y puede fallar; hay que tratar mensajes perdidos o duplicados; es más difícil de programar y depurar |

## Resumen

| | **Secuencial** | **Concurrente** | **Paralela** | **Distribuida** |
|---|---|---|---|---|
| Procesadores | 1 | 1 o más | Varios en un equipo | Varios equipos |
| Tareas a la vez | Una | Varias en curso, alternándose | Varias en el mismo instante | Varias en máquinas distintas |
| Comunicación | — | Memoria compartida o sistema operativo | Memoria compartida o sistema operativo | **Mensajes por la red** |
| Ejemplo | Un script que procesa un fichero | Un sistema con un núcleo | Renderizar un vídeo con 8 núcleos | Una aplicación en la nube |

Los sistemas reales **combinan las tres**: un servidor web atiende a muchos clientes de forma concurrente, usa varios núcleos en paralelo y forma parte de un sistema distribuido.

## Qué recordar

* **Concurrente**: tareas en curso que se alternan (aunque haya un núcleo). **Paralela**: tareas en el mismo instante en varios núcleos. **Distribuida**: varios equipos que se envían mensajes.
* **Ley de Amdahl**: `S(n) = 1 / ((1 − p) + p / n)`; el máximo con infinitos núcleos es `1 / (1 − p)`.
* Repartir el trabajo tiene un **coste**: la aceleración real es menor que la teórica.
