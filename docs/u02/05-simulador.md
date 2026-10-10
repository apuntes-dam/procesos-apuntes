# 2.5 Simulador

Escribe los procesos (nombre, instante de llegada, tiempo de ejecución y prioridad), elige el algoritmo y pulsa **Calcular**. Verás el **orden de ejecución**, el **diagrama de Gantt** y la **tabla** con tf, T, E e I y sus medias.

<div id="sim-cpu" class="sim-cpu"><noscript>El simulador necesita JavaScript.</noscript></div>

!!! info "Cómo se interpretan los datos"
    * **Prioridad**: por defecto, mayor número = más prioridad (como en clase). La casilla «Menor número = más prioridad» lo invierte.
    * **Empates**: se atiende al que llegó antes, y un empate **no expulsa** al proceso que está en la CPU.
    * **Round Robin**: elige el **quantum**; los procesos que llegan justo cuando acaba un quantum entran en la cola antes que el expulsado.
    * Si en algún momento la CPU no tiene ningún proceso preparado, **espera** a la siguiente llegada (en el Gantt se verá un hueco).

!!! tip "Úsalo para comprobar, no para copiar"
    Resuelve primero **a mano** los [ejercicios](ejercicios.md) y usa el simulador para ver dónde te has equivocado: los exámenes se hacen sin él.

!!! note "¿Prefieres una hoja de cálculo?"
    La [plantilla descargable](01-calculos.md#hacerlo-en-una-hoja-de-calculo) tiene la cuadrícula del diagrama y calcula T, E e I contando las letras que dibujes.
