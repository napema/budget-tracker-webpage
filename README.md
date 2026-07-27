# Registro

Tracker di entrate e uscite. Sito statico: nessun server, nessun account, nessun abbonamento.

## Sincronizzazione tra iPhone e computer

**GitHub Pages serve solo file statici: non può salvare niente da solo.** Non esiste
un file sul sito che si aggiorna quando registri una spesa — Pages non esegue codice,
serve la cartella così com'è.

La sincronizzazione funziona in modo diverso: l'app scrive un file JSON dentro un
**secondo repository, privato**, usando l'API di GitHub. Ogni dispositivo scarica il
file, lo fonde con quello che ha in locale e lo ricarica. Risultato: iPhone e computer
vedono gli stessi movimenti.

### Come attivarla

1. **Crea un secondo repository, privato**, ad esempio `registro-dati`. Lascialo vuoto.
   Deve essere separato da quello dell'app: su GitHub Pages gratuito il repo del sito
   è pubblico, e i dati non ci devono stare.
2. **Crea un token**: GitHub → Settings → Developer settings →
   *Personal access tokens* → **Fine-grained tokens** → Generate new token.
   - Repository access: **Only select repositories** → `registro-dati` e basta
   - Permissions → Repository permissions → **Contents: Read and write**
   - Metti una scadenza (90 giorni va bene, poi lo rinnovi)
3. Nell'app: **Setup → Sincronizzazione**, incolla `tuo-utente/registro-dati` e il token,
   tocca *Sincronizza adesso*.
4. Ripeti il punto 3 sull'altro dispositivo, con lo stesso repository e lo stesso token.

L'indicatore a forma di nuvola in alto mostra lo stato: verde allineato, blu in corso,
rosso errore. Toccalo per forzare un aggiornamento.

### Quando sincronizza

All'apertura, a ogni movimento registrato (dopo un paio di secondi), quando torni
sull'app, quando la rete ritorna, e comunque ogni due minuti se l'app è aperta.
Offline continua a funzionare: le modifiche restano in locale e partono appena c'è rete.

### Come risolve i conflitti

Ogni movimento ha un identificativo e l'ora dell'ultima modifica. Quando due dispositivi
hanno versioni diverse, vince la più recente. Le eliminazioni lasciano una traccia, così
un movimento cancellato sul computer non ricompare dal telefono. Budget e tetti seguono
l'ultimo dispositivo che li ha toccati. Il vocabolario delle categorie si somma: quello
che insegni su un dispositivo lo sa anche l'altro.

### Sul token — leggilo

Il token resta nel `localStorage` di quel browser. Non finisce nei backup esportati e
non passa da nessun server che non sia GitHub. Ma chi ha accesso al tuo telefono sbloccato
ha accesso al token. Per questo va creato **fine-grained**, limitato a quel solo repository,
con permesso solo su Contents e con una scadenza. Se perdi il dispositivo, lo revochi da
GitHub e il problema è chiuso in dieci secondi.

### Senza sincronizzazione

Se preferisci non usare token: i dati restano nel browser del dispositivo dove li inserisci,
non si sincronizzano, e **spariscono** se cancelli i dati di navigazione o disinstalli l'app.
In quel caso **Setup → Esporta backup** una volta al mese non è un consiglio, è necessario.
Il file JSON si reimporta dalla stessa schermata e si fonde con quello che c'è già.

## Pubblicare su GitHub Pages

1. Crea un repository e carica tutti i file di questa cartella nella radice.
2. Repo → **Settings** → **Pages** → Source `Deploy from a branch`, branch `main`,
   cartella `/ (root)` → Save.
3. Dopo un minuto il sito è su `https://<utente>.github.io/<repo>/`.

## Installare su iPhone

Apri l'indirizzo **in Safari** — non Chrome, su iOS solo Safari può installare app.
Tocca Condividi → **Aggiungi a schermata Home**. Si apre a schermo intero, senza barra
del browser, e funziona anche offline.

Android: Chrome → menu → *Installa app*. Desktop: icona di installazione nella barra indirizzi.

## Categorie automatiche

Scrivi la nota e la categoria si sceglie da sola. Due livelli:

1. **Dizionario italiano di partenza** — circa 200 termini: catene di supermercati,
   distributori, farmacia, mezzi, abbonamenti, ristorazione.
2. **Apprendimento dalle tue correzioni** — ogni volta che cambi la categoria proposta,
   l'app associa le parole di quella nota alla categoria che hai scelto. Dalla volta
   dopo ci azzecca. Le tue correzioni hanno sempre la precedenza sul dizionario.

Il vocabolario appreso è nel backup JSON, quindi si sposta con i dati.
Si azzera da Setup senza toccare i movimenti.

## File

| File | Cosa fa |
|---|---|
| `index.html` | Tutta l'app: interfaccia, logica, grafici, dizionario |
| `manifest.webmanifest` | Rende l'app installabile |
| `sw.js` | Service worker: funzionamento offline |
| `icon-*.png` | Icone per schermata Home |

## Aggiornare l'app

Modifica `index.html` e fai push. Se le modifiche non compaiono, alza il numero di versione
in `sw.js` (`const CACHE = 'registro-v4'`): il service worker continua a servire la copia
in cache finché la chiave non cambia.
