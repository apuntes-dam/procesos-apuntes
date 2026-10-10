# 2.2 Algoritmos no apropiativos

En estos algoritmos, **una vez que un proceso toma la CPU, la conserva hasta que termina**. Solo se decide quién va después cuando la CPU queda libre. Los ejemplos usan los cuatro procesos de [2.1](01-calculos.md) (A, B, C y D); en prioridad se añade una prioridad a cada uno.

## FCFS: primero en llegar, primero en ser servido

**Regla:** se atiende a los procesos **por orden de llegada**, como una cola de tienda. Es el más sencillo.

**Orden de ejecución:** A (0-3) → B (3-4) → C (4-6) → D (6-7)

<div class="gantt-wrap"><table class="gantt"><tbody><tr><th>D</th><td></td><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="ge">e</td><td class="gx g3">x</td></tr><tr><th>C</th><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g2">x</td><td class="gx g2">x</td><td></td></tr><tr><th>B</th><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g1">x</td><td></td><td></td><td></td></tr><tr><th>A</th><td class="gl">l</td><td class="gx g0">x</td><td class="gx g0">x</td><td class="gx g0">x</td><td></td><td></td><td></td><td></td></tr></tbody><tfoot><tr><th></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></tfoot></table></div>

<p class="gantt-leyenda"><strong>l</strong> = llegada · <strong>e</strong> = espera · <strong>x</strong> = ejecución</p>

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) | Instante de fin (tf) | Tiempo de servicio (T = tf − ti) | Tiempo de espera (E = T − t) | Índice de servicio (I = t / T) |
|---|---|---|---|---|---|---|
| A | 0 | 3 | 3 | 3 | 0 | 1 |
| B | 2 | 1 | 4 | 2 | 1 | 1/2 |
| C | 3 | 2 | 6 | 3 | 1 | 2/3 |
| D | 4 | 1 | 7 | 3 | 2 | 1/3 |
| **Medias** | | | | **2,75** | **1** | **0,625** |

Como A llega primero y dura 3, B, C y D esperan aunque sean muy cortos. Eso es lo malo de FCFS: **un proceso largo retrasa a todos los demás**.

## SJF: el más corto primero

**Regla:** cuando la CPU queda libre, se elige el proceso preparado con **menor tiempo de ejecución**. Si hay empate, se usa FCFS.

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

Al terminar A (instante 3) han llegado B (t = 1) y C (t = 2): gana B por ser más corto. Al terminar B (instante 4) está esperando C (2) y acaba de llegar D (1): gana D. C se ejecuta la última. SJF baja el **tiempo medio de espera** respecto a FCFS (0,75 frente a 1), a costa de **retrasar a los procesos largos**, que podrían no llegar a ejecutarse nunca si siguen llegando procesos cortos (*inanición*).

## Prioridad no apropiativa

**Regla:** cuando la CPU queda libre, se elige el proceso preparado con **mayor prioridad** (mayor número). Si hay empate, FCFS. Para este ejemplo, cada proceso tiene prioridad: A = 2, B = 1, C = 3 y D = 2.

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

Al terminar A (instante 3) están preparados B (prioridad 1) y C (prioridad 3): gana C. Después, D (2) gana a B (1). **B**, con la prioridad más baja, espera mucho: es el mismo problema de inanición que en SJF.

## HRN: el de mayor índice de respuesta

**Regla:** es como SJF, pero **corrige la inanición** haciendo que la prioridad de un proceso **crezca mientras espera**. Cuando la CPU queda libre se calcula, para cada proceso preparado:

`P = (W + t) / t`

donde **W** es el tiempo que lleva esperando en la cola de preparados y **t** su tiempo de ejecución. Entra el de **mayor P**. Un proceso corto tiene un P alto desde el principio, pero uno largo que espera mucho acaba superándolo.

**Orden de ejecución:** A (0-3) → B (3-4) → C (4-6) → D (6-7)

<div class="gantt-wrap"><table class="gantt"><tbody><tr><th>D</th><td></td><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="ge">e</td><td class="gx g3">x</td></tr><tr><th>C</th><td></td><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g2">x</td><td class="gx g2">x</td><td></td></tr><tr><th>B</th><td></td><td></td><td class="gl">l</td><td class="ge">e</td><td class="gx g1">x</td><td></td><td></td><td></td></tr><tr><th>A</th><td class="gl">l</td><td class="gx g0">x</td><td class="gx g0">x</td><td class="gx g0">x</td><td></td><td></td><td></td><td></td></tr></tbody><tfoot><tr><th></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></tfoot></table></div>

<p class="gantt-leyenda"><strong>l</strong> = llegada · <strong>e</strong> = espera · <strong>x</strong> = ejecución</p>

| Proceso | Ciclo de llegada (ti) | Ciclos de ejecución (t) | Instante de fin (tf) | Tiempo de servicio (T = tf − ti) | Tiempo de espera (E = T − t) | Índice de servicio (I = t / T) |
|---|---|---|---|---|---|---|
| A | 0 | 3 | 3 | 3 | 0 | 1 |
| B | 2 | 1 | 4 | 2 | 1 | 1/2 |
| C | 3 | 2 | 6 | 3 | 1 | 2/3 |
| D | 4 | 1 | 7 | 3 | 2 | 1/3 |
| **Medias** | | | | **2,75** | **1** | **0,625** |

Al terminar A (instante 3): B ha esperado 1 y dura 1, así que P = (1 + 1) / 1 = **2**; C acaba de llegar (W = 0) y dura 2, así que P = (0 + 2) / 2 = **1**. Gana B. Al terminar B (instante 4): C ha esperado 1, P = (1 + 2) / 2 = **1,5**; D acaba de llegar, P = (0 + 1) / 1 = **1**. Gana C.

## Qué recordar

* **FCFS**: por orden de llegada. Sencillo, pero los procesos cortos esperan tras uno largo.
* **SJF**: el más corto primero. Buen tiempo de espera, pero puede dejar sin ejecutar a los largos.
* **Prioridad**: el de mayor prioridad. Puede dejar sin ejecutar a los de prioridad baja.
* **HRN**: `P = (W + t) / t`; el tiempo de espera hace subir la prioridad y evita la inanición.
