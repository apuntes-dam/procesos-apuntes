# 1.2 Estados y transiciones

El **estado** de un proceso indica en qué situación está respecto a los recursos del equipo. Un proceso no está siempre trabajando: a veces espera su turno y a veces espera algo que todavía no ha llegado.

## Los tres estados

| Estado | Qué significa |
|---|---|
| **En ejecución** | El procesador está ejecutando sus instrucciones y tiene concedido tiempo de CPU en ese instante |
| **Preparado** (listo, en espera o activo) | Podría ejecutarse, pero está **esperando su turno** para usar la CPU |
| **Bloqueado** | Está retenido porque **le falta algo**: datos que no han llegado, un fichero que usa otro proceso, un dispositivo ocupado (por ejemplo, una impresora sin papel) |

Con una sola CPU, **solo un proceso puede estar en ejecución** a la vez; los demás están preparados o bloqueados.

## Las cuatro transiciones

<svg viewBox="0 0 640 290" role="img" aria-label="Diagrama de estados: en ejecución, preparado y bloqueado, con cuatro transiciones" style="max-width:640px;width:100%;height:auto;font-family:inherit">
  <defs><marker id="flecha" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="currentColor"/></marker></defs>
  <g fill="none" stroke="currentColor" stroke-width="2.5">
    <rect x="215" y="30" width="210" height="56" rx="14"/>
    <rect x="30" y="200" width="210" height="56" rx="14"/>
    <rect x="400" y="200" width="210" height="56" rx="14"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="2" marker-end="url(#flecha)">
    <path d="M405 88 Q 475 120 485 198"/>
    <path d="M232 88 Q 170 120 150 198"/>
    <path d="M205 198 Q 240 130 280 90"/>
    <path d="M398 228 L 244 228"/>
  </g>
  <g fill="currentColor" font-size="18" font-weight="bold" text-anchor="middle">
    <text x="320" y="65">EN EJECUCIÓN</text>
    <text x="135" y="235">PREPARADO</text>
    <text x="505" y="235">BLOQUEADO</text>
  </g>
  <g fill="currentColor" font-size="18" text-anchor="middle">
    <text x="470" y="140">1</text>
    <text x="172" y="130">2</text>
    <text x="262" y="150">3</text>
    <text x="321" y="218">4</text>
  </g>
</svg>

| N.º | De → a | Cuándo ocurre |
|---|---|---|
| **1** | En ejecución → **Bloqueado** | El proceso **no puede continuar** porque espera datos o un recurso (por ejemplo, una lectura de disco) |
| **2** | En ejecución → **Preparado** | El planificador decide que ya ha tenido **suficiente tiempo** de CPU y se la da a otro proceso |
| **3** | Preparado → **En ejecución** | Le toca el turno: el planificador le asigna la CPU |
| **4** | Bloqueado → **Preparado** | Ocurre el **evento** que estaba esperando (llegan los datos, se libera el recurso) |

!!! warning "Un proceso bloqueado no pasa directamente a ejecución"
    Cuando se desbloquea, **vuelve a la cola de preparados** y espera su turno como los demás. No recupera la CPU de inmediato.

## Qué recordar

* Tres estados: **ejecución**, **preparado** y **bloqueado**.
* La 1 y la 4 dependen de **un evento externo** (esperar y recibir); la 2 y la 3 las decide el **planificador**.
* Los algoritmos de la [unidad 2](../u02/index.md) deciden **qué proceso preparado pasa a ejecución** (transición 3) y, si son apropiativos, **cuándo se le quita la CPU** (transición 2).
