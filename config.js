// QUESTO FILE NON CONTIENE PIU IL TOKEN, E NON DEVE TORNARCI.
//
// Lo serviva GitHub Pages da un repo pubblico: chiunque aprisse
// napema.github.io/budget-tracker-webpage/config.js si portava via una chiave di lettura
// e scrittura sul repo privato dei dati. Il base64 spezzato in tre non
// nascondeva niente a nessuno - tranne che al secret scanner di GitHub,
// che un token intero lo avrebbe intercettato e revocato da solo. Cioe:
// serviva a spegnere l'unico allarme che c'era.
//
// La regola che ne resta: in un sito statico non esiste un nascondiglio.
// Tutto cio che il browser scarica senza autenticarsi lo scarica chiunque.
//
// Questa app e in pensione: i dati vivono in ATLAS, che il token lo chiede
// al dispositivo invece di pubblicarlo (vedi core/credenziali.js la'). Qui
// resta tutto leggibile in locale, ma il sync non parte piu. Il repo dei
// dati non e stato toccato: finance-tracker e intatto.

window.REGISTRO_CFG = {
  owner: "napema",
  repo: "finance-tracker",
  path: "registro.json",
  branch: "main",
  t1: "",
  t2: "",
  t3: ""
};
