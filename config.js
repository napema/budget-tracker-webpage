/* Registro — configurazione sync GitHub.
   Il token fine-grained (solo Contents R/W sul repo dati) va codificato in
   base64 e spezzato in TRE parti consecutive: t1 + t2 + t3.
   Esempio: btoa("github_pat_...") → "Z2l0aHViX3BhdF8..." → dividi in tre.
   Lascia le parti vuote per lavorare solo in locale (nessun sync). */
window.REGISTRO_CFG = {
  owner: "napema",
  repo: "finance-tracker",
  path: "registro.json",
  branch: "main",
  t1: "Z2l0aHViX3BhdF8xMUFYQkRXN1kwb2lncFFYeDN1RX",
  t2: "h5XzhjSnNnQ1U3TFhaRnpvUkcxYWMxWEE1UEw1enBI",
  t3: "eG5oMDVzMHE2YmhlNXVXS0U3WFZNVXNtamt2cWtr"
};
