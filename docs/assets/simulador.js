/* Simulador de planificación de la CPU (FCFS, SJF, prioridad, HRN, Round Robin y SRT).
   Misma lógica que _gen/procesos_sim.py, que se comprueba contra los ejemplos de clase.
   Convenciones: T = tf - ti, E = T - t, I = t / T; MAYOR número = MÁS prioridad (se puede invertir);
   los empates se resuelven por orden de llegada y no expulsan al proceso que está en la CPU;
   en Round Robin los procesos que llegan justo cuando termina un quantum entran en la cola antes que el expulsado. */
(function () {
  "use strict";

  function mcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function fr(n, d) { d = d === undefined ? 1 : d; var g = mcd(n, d); if (d < 0) { n = -n; d = -d; } return { n: n / g, d: d / g }; }
  function suma(a, b) { return fr(a.n * b.d + b.n * a.d, a.d * b.d); }
  function cmp(a, b) { return a.n * b.d - b.n * a.d; }
  function fracTxt(f) { return f.d === 1 ? String(f.n) : f.n + "/" + f.d; }
  function decTxt(f, cifras) {
    cifras = cifras === undefined ? 4 : cifras;
    var x = Math.round((f.n / f.d) * Math.pow(10, cifras)) / Math.pow(10, cifras);
    return String(x).replace(".", ",");
  }

  var NOMBRES = {
    fcfs: "FCFS (primero en llegar, primero en ser servido)", sjf: "SJF (el más corto primero)",
    prio: "Prioridad no apropiativa", hrn: "HRN (mayor índice de respuesta)",
    rr: "Round Robin", srt: "SRT (menor tiempo restante)", prio_ap: "Prioridad apropiativa"
  };

  function unir(segs) {
    var out = [];
    segs.forEach(function (s) {
      var u = out[out.length - 1];
      if (u && u[0] === s[0] && u[2] === s[1]) u[2] = s[2]; else out.push([s[0], s[1], s[2]]);
    });
    return out;
  }

  function simular(algo, procesos, q, mayorPrio) {
    q = q || 2;
    mayorPrio = mayorPrio !== false;
    var n = procesos.length, rest = {}, tf = {}, seg = [], hechos = 0;
    var idx = {};
    procesos.forEach(function (p, i) { idx[p.nombre] = i; rest[p.nombre] = p.t; });
    function pri(p) { return mayorPrio ? p.prio : -p.prio; }
    function porLlegada(a, b) { return (a.llegada - b.llegada) || (idx[a.nombre] - idx[b.nombre]); }
    function terminado(p) { return tf[p.nombre] !== undefined; }
    function proximaLlegada() {
      return Math.min.apply(null, procesos.filter(function (p) { return !terminado(p); }).map(function (p) { return p.llegada; }));
    }
    var t = 0;

    if (algo === "rr") {
      var cola = [], admitidos = {}, ordenados = procesos.slice().sort(porLlegada);
      var admitir = function (hasta) {
        ordenados.forEach(function (p) {
          if (!admitidos[p.nombre] && p.llegada <= hasta) { admitidos[p.nombre] = true; cola.push(p); }
        });
      };
      while (hechos < n) {
        admitir(t);
        if (!cola.length) {
          t = Math.min.apply(null, ordenados.filter(function (p) { return !admitidos[p.nombre]; }).map(function (p) { return p.llegada; }));
          continue;
        }
        var p = cola.shift(), corre = Math.min(q, rest[p.nombre]);
        seg.push([p.nombre, t, t + corre]);
        t += corre;
        rest[p.nombre] -= corre;
        admitir(t);
        if (rest[p.nombre] > 0) cola.push(p); else { tf[p.nombre] = t; hechos++; }
      }
    } else if (algo === "fcfs" || algo === "sjf" || algo === "prio" || algo === "hrn") {
      while (hechos < n) {
        var tt = t;
        var listos = procesos.filter(function (p) { return !terminado(p) && p.llegada <= tt; });
        if (!listos.length) { t = proximaLlegada(); continue; }
        listos.sort(function (a, b) {
          if (algo === "sjf") return (a.t - b.t) || porLlegada(a, b);
          if (algo === "prio") return (pri(b) - pri(a)) || porLlegada(a, b);
          if (algo === "hrn") {
            var ra = fr(tt - a.llegada + a.t, a.t), rb = fr(tt - b.llegada + b.t, b.t);
            return (-cmp(ra, rb)) || porLlegada(a, b);
          }
          return porLlegada(a, b);
        });
        var e = listos[0];
        seg.push([e.nombre, t, t + e.t]);
        t += e.t;
        tf[e.nombre] = t;
        hechos++;
      }
    } else {   /* srt y prio_ap: se decide en cada instante */
      var actual = null;
      var clave = function (p) { return algo === "srt" ? rest[p.nombre] : -pri(p); };
      while (hechos < n) {
        var t2 = t;
        var ready = procesos.filter(function (p) { return !terminado(p) && p.llegada <= t2; });
        if (!ready.length) { t = proximaLlegada(); actual = null; continue; }
        var mejor = ready.slice().sort(function (a, b) { return (clave(a) - clave(b)) || porLlegada(a, b); })[0];
        if (actual && !terminado(actual) && ready.indexOf(actual) >= 0 && clave(actual) === clave(mejor)) mejor = actual;
        actual = mejor;
        seg.push([actual.nombre, t, t + 1]);
        rest[actual.nombre] -= 1;
        t += 1;
        if (rest[actual.nombre] === 0) { tf[actual.nombre] = t; hechos++; }
      }
    }
    var filas = procesos.map(function (p) {
      var fin = tf[p.nombre], T = fin - p.llegada;
      return { nombre: p.nombre, llegada: p.llegada, t: p.t, prio: p.prio, tf: fin, T: T, E: T - p.t, I: fr(p.t, T) };
    });
    var medias = {};
    ["T", "E", "I"].forEach(function (k) {
      var s = fr(0);
      filas.forEach(function (f) { s = suma(s, k === "I" ? f.I : fr(f[k])); });
      medias[k] = fr(s.n, s.d * n);
    });
    return { gantt: unir(seg), filas: filas, medias: medias };
  }

  var api = { simular: simular, fracTxt: fracTxt, decTxt: decTxt, NOMBRES: NOMBRES };
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
  if (typeof window === "undefined") return;
  window.PlanificadorCPU = api;

  /* ------------------------------------------------------------------ interfaz */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  var CLASE = [["A", 0, 3, 2], ["B", 2, 1, 1], ["C", 3, 2, 3], ["D", 4, 1, 2]];

  function iniciar() {
    var raiz = document.getElementById("sim-cpu");
    if (!raiz || raiz.dataset.listo) return;
    raiz.dataset.listo = "1";
    raiz.innerHTML = "";

    var tabla = el("table", { "class": "sim-tabla" });
    tabla.innerHTML = "<thead><tr><th>Proceso</th><th>Llegada (ti)</th><th>Ejecución (t)</th><th>Prioridad</th><th></th></tr></thead><tbody></tbody>";
    var cuerpo = tabla.querySelector("tbody");

    function fila(d) {
      var tr = el("tr");
      tr.innerHTML = '<td><input class="s-nom" value="' + d[0] + '" maxlength="4" aria-label="Nombre"></td>' +
        '<td><input class="s-ll" type="number" min="0" value="' + d[1] + '" aria-label="Llegada"></td>' +
        '<td><input class="s-t" type="number" min="1" value="' + d[2] + '" aria-label="Ejecución"></td>' +
        '<td><input class="s-p" type="number" value="' + d[3] + '" aria-label="Prioridad"></td>' +
        '<td><button type="button" class="s-del" aria-label="Quitar proceso" title="Quitar proceso">✕</button></td>';
      tr.querySelector(".s-del").addEventListener("click", function () { tr.remove(); });
      cuerpo.appendChild(tr);
    }
    function cargar(lista) { cuerpo.innerHTML = ""; lista.forEach(fila); }
    cargar(CLASE);

    var ctrl = el("div", { "class": "sim-ctrl" });
    var sel = el("select", { "aria-label": "Algoritmo" });
    Object.keys(NOMBRES).forEach(function (k) { sel.appendChild(el("option", { value: k }, NOMBRES[k])); });
    var q = el("input", { type: "number", min: "1", value: "2", "aria-label": "Quantum", "class": "s-q" });
    var lq = el("label", {}, "Quantum (Round Robin): ");
    lq.appendChild(q);
    var inv = el("input", { type: "checkbox", id: "sim-inv" });
    var linv = el("label", { "for": "sim-inv" }, " Menor número = más prioridad");
    linv.insertBefore(inv, linv.firstChild);
    var bAdd = el("button", { type: "button" }, "＋ Añadir proceso");
    var bClase = el("button", { type: "button" }, "Ejemplo de clase");
    var bCalc = el("button", { type: "button", "class": "sim-calc" }, "Calcular");
    var fila1 = el("div"), fila2 = el("div");
    fila1.appendChild(el("label", {}, "Algoritmo: ")); fila1.lastChild.appendChild(sel);
    fila1.appendChild(lq);
    fila2.appendChild(linv); fila2.appendChild(bAdd); fila2.appendChild(bClase); fila2.appendChild(bCalc);
    ctrl.appendChild(fila1); ctrl.appendChild(fila2);

    var salida = el("div", { "class": "sim-salida", "aria-live": "polite" });
    raiz.appendChild(tabla); raiz.appendChild(ctrl); raiz.appendChild(salida);

    function mostrarQ() { lq.style.display = sel.value === "rr" ? "" : "none"; }
    sel.addEventListener("change", mostrarQ); mostrarQ();
    bAdd.addEventListener("click", function () { fila(["P" + (cuerpo.children.length + 1), 0, 1, 1]); });
    bClase.addEventListener("click", function () { cargar(CLASE); calcular(); });

    function leer() {
      var procs = [], nombres = {}, error = "";
      cuerpo.querySelectorAll("tr").forEach(function (tr, i) {
        var nom = tr.querySelector(".s-nom").value.trim() || ("P" + (i + 1));
        var ll = parseInt(tr.querySelector(".s-ll").value, 10), t = parseInt(tr.querySelector(".s-t").value, 10);
        var p = parseInt(tr.querySelector(".s-p").value, 10);
        if (nombres[nom]) error = "Hay dos procesos con el nombre «" + nom + "».";
        if (isNaN(ll) || ll < 0) error = "La llegada de " + nom + " debe ser un entero de 0 en adelante.";
        if (isNaN(t) || t < 1) error = "El tiempo de ejecución de " + nom + " debe ser un entero de 1 en adelante.";
        nombres[nom] = true;
        procs.push({ nombre: nom, llegada: ll, t: t, prio: isNaN(p) ? 0 : p });
      });
      if (!procs.length) error = "Añade al menos un proceso.";
      return { procs: procs, error: error };
    }

    function calcular() {
      var d = leer();
      if (d.error) { salida.innerHTML = '<p class="sim-error">' + d.error + "</p>"; return; }
      var qv = Math.max(1, parseInt(q.value, 10) || 2);
      var r = simular(sel.value, d.procs, qv, !inv.checked);
      var fin = r.gantt.reduce(function (m, s) { return Math.max(m, s[2]); }, 0);
      var ocup = {};
      r.gantt.forEach(function (s) { for (var i = s[1]; i < s[2]; i++) ocup[s[0] + "|" + i] = true; });
      var cab = "<th></th>";
      for (var i = 0; i < fin; i++) cab += "<th>" + i + "</th>";
      var filas = d.procs.map(function (p, k) {
        var c = "<th>" + p.nombre + "</th>";
        for (var i = 0; i < fin; i++) c += ocup[p.nombre + "|" + i] ? '<td class="g' + (k % 8) + '"></td>' : "<td></td>";
        return "<tr>" + c + "</tr>";
      }).join("");
      var orden = r.gantt.map(function (s) { return s[0] + " (" + s[1] + "-" + s[2] + ")"; }).join(" → ");
      var t = '<table><thead><tr><th>Proceso</th><th>ti</th><th>t</th><th>Prioridad</th><th>tf</th><th>T = tf − ti</th><th>E = T − t</th><th>I = t / T</th></tr></thead><tbody>';
      r.filas.forEach(function (f) {
        t += "<tr><td>" + f.nombre + "</td><td>" + f.llegada + "</td><td>" + f.t + "</td><td>" + f.prio + "</td><td>" + f.tf + "</td><td>" + f.T + "</td><td>" + f.E + "</td><td>" + fracTxt(f.I) + "</td></tr>";
      });
      t += '<tr><td><strong>Medias</strong></td><td></td><td></td><td></td><td></td><td><strong>' + decTxt(r.medias.T) + "</strong></td><td><strong>" + decTxt(r.medias.E) + "</strong></td><td><strong>" + decTxt(r.medias.I) + "</strong></td></tr></tbody></table>";
      salida.innerHTML = "<p><strong>Orden de ejecución:</strong> " + orden + "</p>" +
        '<div class="gantt-wrap"><table class="gantt"><thead><tr>' + cab + "</tr></thead><tbody>" + filas + "</tbody></table></div>" + t;
    }
    bCalc.addEventListener("click", calcular);
    calcular();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
  /* por si la página se carga con navegación instantánea */
  document.addEventListener("DOMContentSwitch", iniciar);
})();
