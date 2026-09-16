# Mantra Lab V3.4

## Cosa cambia
- Flusso guidato **FORMATO → MODULO → CAMPO**: prima MANTRA o CLASSIC, poi lo schema, quindi il campo interattivo.
- Listone Fantacalcio 2026/27 fornito per il progetto integrato localmente come sorgente dati iniziale.
- Tutti i giocatori del foglio `Tutti` sono disponibili nel builder, con ruolo Classic e ruoli Mantra del listone.
- Moduli visualizzati come mini-campi tattici, con ruoli colorati e selezione del modulo tramite click.
- Drag & drop diretto dal listone al campo: se il giocatore non è ancora in rosa viene aggiunto automaticamente, nel limite di 30.
- Su mobile resta disponibile il flusso tap-giocatore → tap-posizione.
- Spostamento dei giocatori tra le posizioni e riempimento automatico degli slot rimanenti compatibili.
- Analisi di copertura e ricerca delle formazioni mantenute nel nuovo flusso.
- PWA/offline shell aggiornata alla versione V3.4.

## Flusso prodotto
**FORMATO → MODULO → LISTONE → CAMPO**

Il core resta gratuito e mobile-first. La sorgente locale è separata dal motore UI tramite `data-provider.js`, così in futuro potrà essere sostituita con un provider online autorizzato senza riscrivere il builder.

## Dati
Il file `data/listone-2026-27.csv` deriva dal listone 2026/27 fornito per questo progetto e contiene 532 giocatori del foglio `Tutti`.

Campi principali: ID, nome, squadra, ruolo Classic, ruoli Mantra, quotazione, quotazione iniziale e FVM.

Eventuali immagini, statistiche aggiuntive o aggiornamenti online devono essere collegati solo tramite una fonte autorizzata. Il provider è intenzionalmente sostituibile.

## Hosting
Il repository è collegato a Cloudflare Workers. I commit sulla `main` sono destinati a innescare il deployment configurato su Cloudflare.
