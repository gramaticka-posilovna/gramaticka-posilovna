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

Mix otázky (kombinující víc podtémat ze stejného tématu v kontrastu) dostávají jednotný tag `Mix` — jeden společný pro celé téma, ne samostatný pro každou konkrétní dvojici podtémat. Uživatel si kontrast sám sestaví zaškrtnutím konkrétních podtémat, appka pak `Mix` nabídne navíc jako doplňkovou volbu k zaškrtnutí. Jednotlivé části mix-otázky si i tak nesou svůj vlastní specifický tag (např. `tag:"Past simple"`) pro rozpad v progress dashboardu — jednotné je jen to, podle čeho se dá otázka jako celek vybrat/filtrovat.

## 3. CEFR pásma difficulty — závazné

* `basic` = A1–A2 (+ nejjednodušší vstupy do B1)
* `intermediate` = B1–B2 jádro
* `advanced` = B2–C1 nuance

Podtéma se v appce objevuje jen v těch obtížnostech, které odpovídají jeho CEFR rozpětí (viz sekce 4). Pokud podtéma pokrývá širší rozpětí, rozdíl mezi obtížnostmi dělá složitost věty/kontextu, ne jiný gramatický jev.

## 4. Obsahová mapa — 15 kategorií gramatiky

Používej přesně tyto názvy podtémat jako `tag` v datech. `topic` slug pro existující kategorie zjisti přímo ze stávajícího souboru appky (nepřejmenovávat!). Pro nové kategorie navrhované slugy jsou v hranaté závorce — než je použiješ, zkontroluj, že appka ještě žádný jiný slug pro danou kategorii nepoužívá.

Mapa je dvouúrovňová: hlavní téma (`topic`) → konkrétní jmenovaná podtémata (`tag`), každé se svým CEFR rozpětím. Podtémata jsou to, co appka rozklikává (accordion) uvnitř hlavního tématu.

**Zrnitost podtématu: jeden gramatický jev = jedna kolonka.** Podtéma se nedělí podle použití/nuance stejné gramatické formy (např. „Will (rozhodnutí)" / „Will (predikce)" / „Will (slib)" by byly tři kolonky pro jeden a týž jev) — všechny nuance jedné formy patří pod jedno podtéma a jejich rozlišení je na `rule` textu u konkrétní otázky, ne na struktuře výběru.

Každé hlavní téma navíc dostává přesně jedno doplňkové podtéma `Mix` (viz sekce 2) — ne samostatný záznam pro každou konkrétní kombinaci podtémat. Mapa proto `Mix` u jednotlivých témat nevypisuje znovu, platí automaticky pro všech 15 kategorií.

1. Slovesné časy `[tenses]`
   * Present simple — A1–B1 → basic, intermediate
   * Present continuous — A1–B1 → basic, intermediate
   * Past simple — A2–B1 → basic, intermediate
   * Past continuous — A2–B1 → basic, intermediate
   * Present perfect — A2–C1 → basic, intermediate, advanced
   * Present perfect continuous — B1–B2 → intermediate
   * Past perfect — B1–B2 → intermediate, advanced
   * Past perfect continuous — B1–B2 → intermediate, advanced
   * Used to / would — B1–B2 → intermediate, advanced
   * Will — A2–C1 → basic, intermediate, advanced
   * Going to — A2–C1 → basic, intermediate, advanced
   * Future continuous — B1–C1 → intermediate, advanced
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

## 4a. Slovní zásoba `[vocab]` — samostatná mapa mimo gramatické kategorie

Slovní zásoba má vlastní `topic` (`vocab`) a nepodléhá gramatické mapě výše, ale řídí se stejným principem podtémat a stejnou schémou otázky (sekce 2). `tag` u slovíček je **kategorie slovní zásoby**, ne jednotlivé slovo — appka tak nabízí rozklikávací výběr po kategoriích, ne desítky checkboxů po jednom slovíčku.

Ke každému slovíčku 4 typy cvičení se stejným tagem i `id` základem (jen s pořadovým číslem 1–4): překlad CZ→EN, překlad EN→CZ, slovo v kontextu věty (`F`), a rozpoznání významu z možností (`C`).

Zavedené kategorie (rozšiřovat průběžně, nikdy nepřejmenovávat už použitou):

* Obecná slovní zásoba — basic, intermediate, advanced
* Modální slovesa (vazby jako have to, supposed to, would rather) — basic, intermediate, advanced
* Nepravidelná slovesa (minulý čas) — basic, intermediate, advanced

Aktuální obsah (2026) je jen pár slovíček na vyzkoušení téhle struktury — několik na kategorii a úroveň. Doplňování dalších slovíček do stávajících kategorií je vždy bezpečné (nová `id`, stejný `tag`). Nová kategorie se přidává stejně jako nová gramatická kategorie — navrhne se název a slug, než se použije.

## 5. Co se smí měnit kdykoliv, bez rizika

Vzhled appky, CSS, navigace mezi tématy (harmonika kategorií), texty tlačítek, počet otázek v kole, animace. Tohle je nezávislé na obsahové vrstvě výše a nemá vliv na uložený progress uživatelů.

## 6. Architektonická rozhodnutí pro budoucnost (nerozhodovat teď, jen vědět)

* Appka zatím nemá účty ani cloud sync — progress je jen v `localStorage` prohlížeče. Tracking podle `id`/`tag` (ne podle vzhledu appky) umožňuje účty/sync přidat později bez zásahu do obsahu.
* Appstore appka = appka + obal (PWA/Capacitor/TWA), ne přepis. Appstore submission dává smysl až po dokončení a otestování webové verze.
* Monetizace uvnitř appstore appky (pokud nastane) vyžaduje napojení na Apple In-App Purchase / Google Play Billing — jiné řešení než na webu.

## 7. Vztah k plánovacímu trackeru

Odškrtávací tracker (Claude artifact "Gramatická mapa") je živý plánovací nástroj — sleduje, které podtéma × obtížnost už appka reálně obsahuje. Tento soubor je naopak neměnný rámec pravidel. Tracker se řídí tímto souborem, ne naopak.
