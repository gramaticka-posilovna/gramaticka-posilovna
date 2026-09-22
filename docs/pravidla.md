# Gramatická posilovna — řídicí dokument appky

Tento soubor je závazný rámec pro appku "Gramatická posilovna". Vznikl v plánovacím vlákně (Claude, artifacts) předtím, než se appka začala reálně programovat. Platí od teď napořád — nová pravidla se do něj dopisují, stará se nepřepisují způsobem, který by rozbil existující obsah nebo uživatelský progress.

Přilož tento soubor hned na začátku appka-vlákna (spolu se stávajícím HTML souborem appky) a řekni Claude, ať se jím řídí po celou dobu vývoje.

## 1. Co appka je

Jednosouborová HTML appka na procvičování anglické gramatiky. Výběr tématu, obtížnosti a počtu otázek, vysvětlení u každé otázky, vyhodnocení kola, spaced-repetition plánování opakování, progress dashboard. Cílový stav: appka nasazená na vlastní doméně (přes GitHub Pages), postupně rozšiřovaná o obsah, beze změn architektury.

## 2. Schema jedné otázky — závazné, neměnit

Každá otázka má:

* `id` — jedinečný identifikátor, formát `topic-tag_slug-difficulty-poradove_cislo` (např. `tenses-past-simple-basic-01`). Jakmile má otázka `id`, které už používá živý uživatel (má u něj progress), toto `id` se nikdy nemění ani neruší — jen se přestane nabízet, pokud je potřeba otázku stáhnout.
* `topic` — slug hlavní kategorie (viz seznam níže). Jednou zvolený slug se nikdy nepřejmenovává — appka má `migrateState()`, která čistí progress u témat, co zmizí z `TOPICS`, takže přejmenování = ztráta historie uživatelů.
* `tag` — jemnější podtéma v rámci kategorie. Musí 1:1 odpovídat názvu podtématu v obsahové mapě (sekce 4), aby appka a plánovací tracker zůstaly navždy sesynchronizované.
* `difficulty` — jedna z `basic` / `intermediate` / `advanced`. Viz CEFR mapování v sekci 3. Není to libovolná škálka — musí odpovídat reálné CEFR úrovni dané konkrétní otázky.
* `type` + typová pole (fill-in, multi-part, choice — podle existující appky).
* `rule` — vysvětlení, které appka zobrazí po odpovědi. Povinné u každé otázky bez výjimky, appka to má i technicky vynucené.

Mix otázky (kombinující dvě podtémata v kontrastu) dostávají vlastní tag ve tvaru `Mix: Podtéma A vs. Podtéma B`, aby šly sledovat odděleně od čistých podtémat ve statistikách i v trackeru.

## 3. CEFR pásma difficulty — závazné

* `basic` = A1–A2 (+ nejjednodušší vstupy do B1)
* `intermediate` = B1–B2 jádro
* `advanced` = B2–C1 nuance

Podtéma se v appce objevuje jen v těch obtížnostech, které odpovídají jeho CEFR rozpětí (viz sekce 4). Pokud podtéma pokrývá širší rozpětí, rozdíl mezi obtížnostmi dělá složitost věty/kontextu, ne jiný gramatický jev.

## 4. Obsahová mapa — 15 kategorií gramatiky

Používej přesně tyto názvy podtémat jako `tag` v datech. `topic` slug pro existující kategorie zjisti přímo ze stávajícího souboru appky (nepřejmenovávat!). Pro nové kategorie navrhované slugy jsou v hranaté závorce — než je použiješ, zkontroluj, že appka ještě žádný jiný slug pro danou kategorii nepoužívá.

Mapa je dvouúrovňová: hlavní téma (`topic`) → konkrétní jmenovaná podtémata (`tag`), každé se svým CEFR rozpětím. Podtémata jsou to, co appka rozklikává (accordion) uvnitř hlavního tématu.

1. Slovesné časy `[tenses]`
   * Present simple (zvyky, fakta) — A1–A2 → basic
   * Present continuous (probíhá teď) — A1–A2 → basic
   * Present simple vs. continuous (stavová slovesa) — A2–B1 → basic, intermediate
   * Present simple (rozvrh, budoucí) — A2–B1 → basic, intermediate
   * Present continuous (budoucí plán) — A2–B1 → basic, intermediate
   * Past simple — A2–B1 → basic, intermediate
   * Past continuous — A2–B1 → basic, intermediate
   * Present perfect — A2–C1 → basic, intermediate, advanced
   * Present perfect continuous — B1–B2 → intermediate
   * Past perfect — B1–B2 → intermediate, advanced
   * Past perfect continuous — B1–B2 → intermediate, advanced
   * Used to / would — B1–B2 → intermediate, advanced
   * Will (rozhodnutí, slib, predikce, zápor) — A2–C1 → basic, intermediate, advanced
   * Going to — A2–C1 → basic, intermediate, advanced
   * Future continuous (+ zdvořilý dotaz) — B1–C1 → intermediate, advanced
   * Be about to — C1 → advanced
   * Časová věta (when/after/before + present simple) — B1 → intermediate
   * Inverze v minulosti (Had I known...) — C1 → advanced
2. Podmínky a přání `[conditionals]`
   * 0. kondicionál — A2 → basic
   * 1. kondicionál — A2–B1 → basic, intermediate
   * 2. kondicionál — A2–B1 → basic, intermediate
   * 3. kondicionál — B2 → advanced
   * Smíšený kondicionál — B2 → advanced
   * Unless — B2–C1 → advanced
   * Inverze v podmínce (Were I.../Had I...) — C1 → advanced
   * Formální podmínka (should) — C1 → advanced
   * Wish + minulost — B2–C1 → advanced
   * If only + minulost — B2–C1 → advanced
   * As if / as though + minulost — B2–C1 → advanced
3. Trpný rod `[passive]`
   * Přítomný a minulý čas prostý — A2–B1 → basic, intermediate
   * Present perfect, budoucí časy — B1 → intermediate
   * S modálními slovesy — B2 → advanced
   * Have/get something done — B2 → advanced
4. Nepřímá řeč `[reported-speech]`
   * Oznamovací věty — B1 → intermediate
   * Otázky v nepřímé řeči — B1 → intermediate
   * Rozkazy a žádosti — B1 → intermediate
   * Posun časů (backshift) — B1–B2 → intermediate, advanced
5. Modální slovesa `[modals]`
   * Schopnost (can/could/be able to) — A2 → basic
   * Dovolení (can/may/could) — A2 → basic
   * Povinnost a nutnost (must/have to/need to) — A2–B1 → basic, intermediate
   * Zákaz vs. absence nutnosti (mustn't vs. don't have to) — B1 → intermediate
   * Rada (should/ought to/had better) — B1 → intermediate
   * Pravděpodobnost a dedukce v přítomnosti (must/might/can't be) — B1–B2 → intermediate, advanced
   * Modály v minulosti (must have/might have/should have/needn't have) — B2 → advanced
6. Členy `[articles]`
   * A/an vs. the — A1–A2 → basic
   * Nulový člen — B1 → intermediate
7. Podstatná jména a determinery `[nouns]`
   * Počitatelnost — A1–A2 → basic
   * Množné číslo, nepravidelné tvary — A1–A2 → basic
   * Some/any/no — A1–A2 → basic
   * Much/many/a lot of — A1–A2 → basic
   * (A) few / (a) little — A2–B1 → basic, intermediate
8. Zájmena `[pronouns]`
   * Osobní a přivlastňovací — A1 → basic
   * Zvratná (myself, yourself...) — A1 → basic
   * Vztažná (who, which, that...) — B1 → intermediate
   * Neurčitá (someone, anything...) — A2–B1 → basic, intermediate
9. Vedlejší věty `[clauses]`
   * Vztažné věty (defining/non-defining) — B1 → intermediate
   * Podmětné, předmětné věty — B2 → advanced
10. Infinitiv a gerundium `[infinitive-gerund]`
    * Sloveso + to infinitiv — A2–B1 → basic, intermediate
    * Sloveso + -ing — A2–B1 → basic, intermediate
    * Rozdíly ve významu (remember, stop, try...) — B2 → advanced
    * Participle clauses — C1 → advanced
11. Přídavná jména a příslovce `[adjectives-adverbs]`
    * Stupňování — A1–A2 → basic
    * Pořadí přídavných jmen — B1 → intermediate
    * Tvorba a pozice příslovcí — A2 → basic
12. Předložky `[prepositions]`
    * Místa a času — A1–A2 → basic
    * Vazby se slovesy — B1–B2 → intermediate, advanced
    * Vazby s přídavnými jmény — B1–B2 → intermediate, advanced
13. Slovosled a otázky `[word-order]`
    * Nepřímé otázky — A2–C1 → basic, intermediate, advanced
    * Záporné otázky — A2–C1 → basic, intermediate, advanced
    * Tag questions — B1–B2 → intermediate, advanced
    * Inverze po záporných příslovcích (Never had I...) — C1 → advanced
14. Frázová slovesa `[phrasal-verbs]`
    * Základní sada — A2–B1 → basic, intermediate
    * Rozšířená sada — B2–C1 → advanced
15. Spojky a diskurzní markery `[conjunctions]`
    * Although, despite, in spite of — B1 → intermediate
    * Because, since, as (důvod) — B1 → intermediate
    * So that, in order to (účel) — B1–B2 → intermediate, advanced
    * Diskurzní markery (however, moreover...) — B2–C1 → advanced

(Slovní zásoba je samostatná kategorie mimo tuto mapu, appka ji už má — struktura slovíčko × 4 typy cvičení.)

## 5. Co se smí měnit kdykoliv, bez rizika

Vzhled appky, CSS, navigace mezi tématy (harmonika kategorií), texty tlačítek, počet otázek v kole, animace. Tohle je nezávislé na obsahové vrstvě výše a nemá vliv na uložený progress uživatelů.

## 6. Architektonická rozhodnutí pro budoucnost (nerozhodovat teď, jen vědět)

* Appka zatím nemá účty ani cloud sync — progress je jen v `localStorage` prohlížeče. Tracking podle `id`/`tag` (ne podle vzhledu appky) umožňuje účty/sync přidat později bez zásahu do obsahu.
* Appstore appka = appka + obal (PWA/Capacitor/TWA), ne přepis. Appstore submission dává smysl až po dokončení a otestování webové verze.
* Monetizace uvnitř appstore appky (pokud nastane) vyžaduje napojení na Apple In-App Purchase / Google Play Billing — jiné řešení než na webu.

## 7. Vztah k plánovacímu trackeru

Odškrtávací tracker (Claude artifact "Gramatická mapa") je živý plánovací nástroj — sleduje, které podtéma × obtížnost už appka reálně obsahuje. Tento soubor je naopak neměnný rámec pravidel. Tracker se řídí tímto souborem, ne naopak.
