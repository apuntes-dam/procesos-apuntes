# 1.2 Estados y transiciones

El **estado** de un proceso indica en qué situación está. Un proceso no está siempre trabajando: a veces espera su turno, a veces espera algo que todavía no ha llegado, y al final de su vida desaparece del sistema.

## Los cinco estados

| Estado | Qué significa |
|---|---|
| **Inicio** (nuevo) | El proceso **se acaba de crear**: el sistema prepara su BCP y le asigna memoria, pero todavía no compite por la CPU |
| **Preparado** (listo, en espera o activo) | Podría ejecutarse, pero está **esperando su turno** para usar la CPU |
| **En ejecución** | El procesador está ejecutando sus instrucciones y tiene concedido tiempo de CPU en ese instante |
| **Bloqueado** | Está retenido porque **le falta algo**: datos que no han llegado, un fichero que usa otro proceso, un dispositivo ocupado (por ejemplo, una impresora sin papel) |
| **Terminado** | El proceso **ha acabado** (o se ha detenido): el sistema libera sus recursos y deja solo su código de salida |

Con una sola CPU, **solo un proceso puede estar en ejecución** a la vez; los demás están preparados o bloqueados.

!!! info "Y el tema de clase"
    En el tema de clase se explican los **tres estados principales** (ejecución, preparado y bloqueado) y sus cuatro transiciones, que son las que importan para los algoritmos de la [unidad 2](../u02/index.md). El modelo completo añade el **inicio** y el **final** de la vida del proceso.

## Las seis transiciones

<svg viewBox="0 0 720 310" role="img" aria-label="Diagrama de estados: inicio, preparado, en ejecución, bloqueado y terminado, con seis transiciones" style="max-width:720px;width:100%;height:auto;font-family:inherit">
  <defs><marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
  <g fill="none" stroke="currentColor" stroke-width="2.5">
    <rect x="10" y="50" width="130" height="56" rx="14"/>
    <rect x="270" y="50" width="160" height="56" rx="14"/>
    <rect x="560" y="50" width="150" height="56" rx="14"/>
    <rect x="270" y="215" width="160" height="56" rx="14"/>
    <rect x="560" y="215" width="150" height="56" rx="14"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#flecha)">
    <path d="M142 78 L 268 78"/>
    <path d="M432 62 Q 495 28 558 62"/>
    <path d="M558 96 Q 495 130 432 96"/>
    <path d="M590 108 Q 560 200 434 232"/>
    <path d="M350 213 L 350 108"/>
    <path d="M635 108 L 635 213"/>
  </g>
  <g fill="currentColor" font-size="17" font-weight="bold" text-anchor="middle">
    <text x="75" y="85">INICIO</text>
    <text x="350" y="85">PREPARADO</text>
    <text x="635" y="85">EN EJECUCIÓN</text>
    <text x="350" y="250">BLOQUEADO</text>
    <text x="635" y="250">TERMINADO</text>
  </g>
  <g fill="currentColor" font-size="18" text-anchor="middle">
    <text x="205" y="68">1</text>
    <text x="495" y="30">2</text>
    <text x="495" y="136">3</text>
    <text x="508" y="190">4</text>
    <text x="368" y="165">5</text>
    <text x="653" y="165">6</text>
  </g>
</svg>

| N.º | De → a | Cuándo ocurre | En el tema de clase |
|---|---|---|---|
| **1** | Inicio → **Preparado** | El sistema **admite** el proceso: ya está creado y cargado en memoria, y pasa a la cola de preparados | |
| **2** | Preparado → **En ejecución** | Le toca el turno: el planificador le asigna la CPU | Transición **3** |
| **3** | En ejecución → **Preparado** | El planificador decide que ya ha tenido **suficiente tiempo** de CPU (se acaba el quantum) o que otro proceso más prioritario debe usarla | Transición **2** |
| **4** | En ejecución → **Bloqueado** | El proceso **no puede continuar** porque espera datos o un recurso (por ejemplo, una lectura de disco) | Transición **1** |
| **5** | Bloqueado → **Preparado** | Ocurre el **evento** que estaba esperando (llegan los datos, se libera el recurso) | Transición **4** |
| **6** | En ejecución → **Terminado** | El proceso **acaba** su ejecución (o se le detiene) | |

!!! warning "Lo que NO puede pasar"
    * Un proceso **bloqueado no pasa directamente a ejecución**: cuando se desbloquea, **vuelve a la cola de preparados** y espera su turno como los demás.
    * **Solo se bloquea quien se ejecuta**: de preparado no se pasa a bloqueado.
    * De **terminado** no se vuelve a ningún estado: un proceso terminado no se reactiva.
    * Para llegar a **terminado** hay que estar **en ejecución**.

## Qué recordar

* Cinco estados: **inicio**, **preparado**, **en ejecución**, **bloqueado** y **terminado**; seis transiciones.
* Las transiciones 4 y 5 dependen de **un evento externo** (esperar y recibir); las transiciones 2 y 3 las decide el **planificador**.
* Los algoritmos de la [unidad 2](../u02/index.md) deciden **qué proceso preparado pasa a ejecución** (transición 2) y, si son apropiativos, **cuándo se le quita la CPU** (transición 3).
