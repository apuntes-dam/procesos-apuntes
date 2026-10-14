# 2.3 Algoritmos apropiativos

En estos algoritmos, el sistema **puede quitarle la CPU** a un proceso que se está ejecutando para dársela a otro. Los ejemplos usan los mismos procesos que en [2.2](02-no-apropiativos.md).

## Round Robin (RR)

**Regla:** a cada proceso se le asigna un **tiempo máximo de CPU seguido**, el **quantum**. Si pasado ese tiempo no ha terminado, **pasa al final de la cola de preparados** y entra el primero de la cola. Es un reparto **por turnos**, pensado para sistemas de tiempo compartido.

Ejemplo con **quantum = 2**:

**Orden de ejecución:** A (0-2) → B (2-3) → A (3-4) → C (4-6) → D (6-7)

<div class="gantt-wrap"><table class="gantt"><tbody><tr><th>D</th><td></td><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="ge">e</td><td class="gx g3">x</td></tr><tr><th>C</th><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g2">x</td><td class="gx g2">x</td><td></td></tr><tr><th>B</th><td></td><td></td><td class="gl">l</td><td class="gx g1">x</td><td></td><td></td><td></td><td></td></tr><tr><th>A</th><td class="gl">l</td><td class="gx g0">x</td><td class="gx g0">x</td><td class="ge">e</td><td class="gx g0">x</td><td></td><td></td><td></td></tr></tbody><tfoot><tr><th></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></tfoot></table></div>

<p class="gantt-leyenda"><strong>l</strong> = llegada · <strong>e</strong> = espera · <strong>x</strong> = ejecución</p>

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) | Instante de fin (tf) | Tiempo de servicio (T = tf − ti) | Tiempo de espera (E = T − t) | Índice de servicio (I = t / T) |
|---|---|---|---|---|---|---|
| A | 0 | 3 | 4 | 4 | 1 | 3/4 |
| B | 2 | 1 | 3 | 1 | 0 | 1 |
| C | 3 | 2 | 6 | 3 | 1 | 2/3 |
| D | 4 | 1 | 7 | 3 | 2 | 1/3 |
| **Medias** | | | | **2,75** | **1** | **0,688** |

A empieza (0-2) y agota su quantum con 1 ciclo pendiente. En el instante 2 acaba de llegar B: **B se pone en la cola antes que A** (los que llegan justo en ese momento van delante del proceso expulsado), así que B se ejecuta (2-3) y termina. Después A termina su último ciclo (3-4), C (4-6) y D (6-7).

!!! warning "Un detalle que cambia el resultado"
    Si llega un proceso **justo cuando acaba un quantum**, hay que decidir si entra en la cola antes o después del proceso expulsado. En esta web (y en los ejemplos de clase) entra **antes**.

La elección del quantum importa: si es **muy grande**, RR se parece a FCFS; si es **muy pequeño**, se hacen demasiados cambios de contexto y se pierde tiempo.

## SRT: menor tiempo restante

**Regla:** es el SJF **apropiativo**. Se ejecuta el proceso con **menos tiempo pendiente**. Si llega otro con menos tiempo del que le queda al que está en la CPU, el actual **se interrumpe** y entra el nuevo. Con un empate no se expulsa.

**Orden de ejecución:** A (0-3) → B (3-4) → D (4-5) → C (5-7)

<div class="gantt-wrap"><table class="gantt"><tbody><tr><th>D</th><td></td><td></td><td></td><td></td><td class="gl">l</td><td class="gx g3">x</td><td></td><td></td></tr><tr><th>C</th><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="ge">e</td><td class="gx g2">x</td><td class="gx g2">x</td></tr><tr><th>B</th><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g1">x</td><td></td><td></td><td></td></tr><tr><th>A</th><td class="gl">l</td><td class="gx g0">x</td><td class="gx g0">x</td><td class="gx g0">x</td><td></td><td></td><td></td><td></td></tr></tbody><tfoot><tr><th></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></tfoot></table></div>

<p class="gantt-leyenda"><strong>l</strong> = llegada · <strong>e</strong> = espera · <strong>x</strong> = ejecución</p>

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) | Instante de fin (tf) | Tiempo de servicio (T = tf − ti) | Tiempo de espera (E = T − t) | Índice de servicio (I = t / T) |
|---|---|---|---|---|---|---|
| A | 0 | 3 | 3 | 3 | 0 | 1 |
| B | 2 | 1 | 4 | 2 | 1 | 1/2 |
| C | 3 | 2 | 7 | 4 | 2 | 1/2 |
| D | 4 | 1 | 5 | 1 | 0 | 1 |
| **Medias** | | | | **2,5** | **0,75** | **0,75** |

En el instante 2 llega B (t = 1), pero a A solo le queda 1: **empatan**, y A sigue. Al terminar A, se ejecuta B. En el 4 llega D (1) mientras C (2) está esperando: gana D. Con estos procesos, SRT y SJF dan el mismo resultado; la diferencia aparece cuando llega un proceso más corto que lo que le queda al que está ejecutando.

## Prioridad apropiativa

**Regla:** se ejecuta el proceso preparado con **mayor prioridad**. Si llega otro **más prioritario** que el que está en la CPU, el actual **abandona la CPU** y entra el nuevo. Con un empate no se expulsa. Prioridades del ejemplo: A = 2, B = 1, C = 3 y D = 2.

**Orden de ejecución:** A (0-3) → C (3-5) → D (5-6) → B (6-7)

<div class="gantt-wrap"><table class="gantt"><tbody><tr><th>D</th><td></td><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g3">x</td><td></td></tr><tr><th>C</th><td></td><td></td><td></td><td class="gl">l</td><td class="gx g2">x</td><td class="gx g2">x</td><td></td><td></td></tr><tr><th>B</th><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="ge">e</td><td class="ge">e</td><td class="ge">e</td><td class="gx g1">x</td></tr><tr><th>A</th><td class="gl">l</td><td class="gx g0">x</td><td class="gx g0">x</td><td class="gx g0">x</td><td></td><td></td><td></td><td></td></tr></tbody><tfoot><tr><th></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></tfoot></table></div>

<p class="gantt-leyenda"><strong>l</strong> = llegada · <strong>e</strong> = espera · <strong>x</strong> = ejecución</p>

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) | Prioridad | Instante de fin (tf) | Tiempo de servicio (T = tf − ti) | Tiempo de espera (E = T − t) | Índice de servicio (I = t / T) |
|---|---|---|---|---|---|---|---|
| A | 0 | 3 | 2 | 3 | 3 | 0 | 1 |
| B | 2 | 1 | 1 | 7 | 5 | 4 | 1/5 |
| C | 3 | 2 | 3 | 5 | 2 | 0 | 1 |
| D | 4 | 1 | 2 | 6 | 2 | 1 | 1/2 |
| **Medias** | | | | | **3** | **1,25** | **0,675** |

Cuando llega B (prioridad 1) a la CPU está A (2): no hay expulsión. Cuando llega C (prioridad 3) A ya había terminado, y C gana a B. Con estos datos el resultado coincide con la prioridad no apropiativa; la diferencia aparece cuando llega un proceso **más prioritario mientras otro se ejecuta**.

## Cambios de contexto

Cada vez que la CPU pasa de un proceso a otro se produce un **cambio de contexto**: el sistema **guarda** el estado del proceso que sale en su BCP (por dónde iba, los valores de sus registros) y **carga** el del que entra. Durante ese tiempo la CPU **no hace trabajo útil**: es **sobrecarga**. Ocurre cuando se acaba el quantum, cuando el proceso se bloquea, cuando llega uno más prioritario o cuando termina.

Se cuentan en el diagrama de Gantt: **cada trozo de CPU de un proceso distinto del anterior** es un cambio. Con los procesos A (llega en 0, t = 6), B (1, 3), C (2, 1) y D (3, 4):

| Algoritmo | Cambios de contexto | Espera media E |
|---|---|---|
| FCFS | 3 | 4,75 |
| Round Robin, q = 4 | 4 | 5,25 |
| Round Robin, q = 2 | 7 | 5,25 |
| Round Robin, q = 1 | 13 | 4,75 |

Cuanto **más pequeño es el quantum**, más cambios de contexto y más tiempo perdido; con un quantum muy grande, Round Robin se parece a FCFS. Por eso se elige un quantum ni muy grande ni muy pequeño.

## Qué recordar

* **Round Robin**: turnos de un **quantum**; el que no acaba va al final de la cola.
* **SRT**: el de menor tiempo restante; expulsa si llega uno con menos tiempo que lo que le queda al actual.
* **Prioridad apropiativa**: expulsa si llega uno con mayor prioridad.
* En los tres, **un empate no expulsa** al proceso que ya está en la CPU.
