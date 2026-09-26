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

## 3. CEFR a obtížnost — nezávislé na sobě

`difficulty` (`basic`/`intermediate`/`advanced`) je stupeň složitosti cvičení k danému gramatickému jevu, ne cílová CEFR úroveň studenta. **Každé podtéma má vždy všechny tři obtížnosti** — i u jevů, které se v reálné výuce typicky učí jen na jedné CEFR úrovni (např. Past perfect na B1). U basic verze jde o zjednodušenou variantu stejného jevu (jednodušší slovní zásoba/kontext, ne jiná gramatika), u advanced o náročnější kontext/nuance.

Orientační CEFR úroveň (A1–C1) u sekce 4 zůstává jako informace pro autora otázek — pomáhá odhadnout, jak jednoduchou/náročnou slovní zásobu a kontext zvolit. Appka s ní funkčně nepočítá; u konkrétní otázky se může připojit jako poznámka na konci `rule` textu, např. „(CEFR: B1)", čistě informativně pro budoucí rozšíření (např. filtrování).

## 4. Obsahová mapa — 15 kategorií gramatiky

Používej přesně tyto názvy podtémat jako `tag` v datech. `topic` slug pro existující kategorie zjisti přímo ze stávajícího souboru appky (nepřejmenovávat!). Pro nové kategorie navrhované slugy jsou v hranaté závorce — než je použiješ, zkontroluj, že appka ještě žádný jiný slug pro danou kategorii nepoužívá.

Mapa je dvouúrovňová: hlavní téma (`topic`) → konkrétní jmenovaná podtémata (`tag`), každé se svým orientačním CEFR rozpětím (viz sekce 3 — neediktuje, jen doporučuje, na které úrovni jev typicky žije). Podtémata jsou to, co appka rozklikává (accordion) uvnitř hlavního tématu, a v accordionu se zobrazují stejná pro všechny tři obtížnosti.

**Zrnitost podtématu: jeden gramatický jev = jedna kolonka.** Podtéma se nedělí podle použití/nuance stejné gramatické formy (např. „Will (rozhodnutí)" / „Will (predikce)" / „Will (slib)" by byly tři kolonky pro jeden a týž jev) — všechny nuance jedné formy patří pod jedno podtéma a jejich rozlišení je na `rule` textu u konkrétní otázky, ne na struktuře výběru.

Každé hlavní téma navíc dostává přesně jedno doplňkové podtéma `Mix` (viz sekce 2) — ne samostatný záznam pro každou konkrétní kombinaci podtémat. Mapa proto `Mix` u jednotlivých témat nevypisuje znovu, platí automaticky pro všech 15 kategorií.

1. Slovesné časy `[tenses]`
   * Present simple — A1–B1
   * Present continuous — A1–B1
   * Past simple — A2–B1
   * Past continuous — A2–B1
   * Present perfect — A2–C1
   * Present perfect continuous — B1–B2
   * Past perfect — B1–B2
   * Past perfect continuous — B1–B2
   * Used to / would — B1–B2
   * Will — A2–C1
   * Going to — A2–C1
   * Future continuous — B1–C1
   * Be about to — C1
   * Časová věta (when/after/before + present simple) — B1
   * Future perfect — B2 (zatím bez otázek)
   * Future perfect continuous — C1 (zatím bez otázek)
   * Stavová slovesa (state verbs: love, know, believe...) — A2–B1 (zatím bez otázek)
   * Přítomné časy pro budoucnost (jízdní řády, rozvrhy, naplánované děje) — B1 (zatím bez otázek)
   * Budoucnost v minulosti (was going to / would) — B2 (zatím bez otázek)
   * Be used to / get used to — B1–B2 (zatím bez otázek)

   *(Pozn.: „Inverze v minulosti (Had I known...)" byla odsud odebrána — patří koncepčně do `[conditionals]` → „Inverze v podmínce". Obsahový přesun proběhl: 60 duplicitních otázek (stejný jev jako „Had I..." varianta pod „Inverze v podmínce") bylo smazáno, stejně jako 8 Mix otázek, které tento tag kombinovaly s jinými tenses jevy. Tenses/Mix má proto teď dočasně méně než 20 otázek na obtížnost (19/18/15) — čeká na doplnění.)*
2. Podmínky a přání `[conditionals]`
   * 0. kondicionál — A2
   * 1. kondicionál — A2–B1
   * 2. kondicionál — A2–B1
   * 3. kondicionál — B2
   * Smíšený kondicionál — B2
   * Unless — B2–C1
   * Inverze v podmínce (Were I.../Had I.../Should you...) — C1
   * Wish + minulost (včetně If only — emocionálně silnější varianta stejného jevu) — B2–C1
   * As if / as though + minulost — B2–C1
   * Wish + would (stěžování na cizí opakované/rušivé chování) — B2 (zatím bez otázek)
   * Would rather / It's time + minulý čas (přání/nutnost týkající se chování druhé osoby) — B2–C1 (zatím bez otázek)
   * Provided / as long as / in case — B2 (zatím bez otázek)

   *(Pozn.: „It's time + minulý čas" sloučeno s „Would rather + minulý čas" — oba vyjadřují nepřímý nátlak/přání ohledně chování druhé osoby přes minulý čas s přítomným/budoucím významem.)*
3. Trpný rod `[passive]`
   * Přítomný a minulý čas prostý — A2–B1
   * Present perfect, budoucí časy — B1
   * S modálními slovesy — B2
   * Have/get something done — B2
   * Průběhové časy v trpném rodě (is being done / was being done) — B2 (zatím bez otázek)
   * Věty se dvěma předměty (I was given a book.) — B2 (zatím bez otázek)
   * Trpný infinitiv a gerundium (to be done / being done) — C1 (zatím bez otázek)
   * Vazby It is said that.../He is said to... — C1 (zatím bez otázek)
4. Nepřímá řeč `[reported-speech]`
   * Oznamovací věty — B1
   * Otázky v nepřímé řeči — B1
   * Rozkazy a žádosti — B1
   * Posun časů (backshift) — B1–B2
   * Uvozovací slovesa a jejich vazby (suggest, advise, deny, apologise...) — B2
5. Modální slovesa `[modals]`
   * Schopnost (can/could/be able to) — A2
   * Dovolení (can/may/could) — A2
   * Povinnost a nutnost (must/have to/need to) — A2–B1
   * Zákaz vs. absence nutnosti (mustn't vs. don't have to) — B1
   * Rada (should/ought to/had better) — B1
   * Pravděpodobnost a dedukce v přítomnosti (must/might/can't be) — B1–B2
   * Modály v minulosti (must have/might have/should have/needn't have) — B2
   * Needn't have vs. didn't need to — C1 (zatím bez otázek)
   * Be supposed to — B1–B2 (zatím bez otázek)
   * Náhradní tvary (be able to, be allowed to, have to v jiných časech) — B1–B2 (zatím bez otázek)

   *(Pozn.: „Had better" se nakonec nepřidává jako samostatné podtéma — zůstává jen jako jedna z forem pod „Rada (should/ought to/had better)", protože jde sloučit a samostatně by mělo malou variabilitu.)*
6. Členy `[articles]`
   * A/an vs. the — A1–A2
   * Nulový člen (vč. institucí: go to school/bed/work/prison) — B1
   * Členy se zeměpisnými názvy — B2
   * Obecná tvrzení (generalizace pomocí členů) — B1

   *(Pozn.: „Instituce (go to school vs. go to the school)" sloučena do „Nulový člen" — jde o stejný jev, nulový člen u podstatného jména použitého ve své typické funkci.)*
7. Podstatná jména a determinery `[nouns]`
   * Počitatelnost (vč. hromadných podstatných jmen: the police, the team) — A1–B2
   * Množné číslo, nepravidelné tvary — A1–A2
   * Some/any/no — A1–A2
   * Much/many/a lot of — A1–A2
   * (A) few / (a) little — A2–B1
   * All/both/each/every/either/neither/none — A2–B1
   * Přivlastňovací 's vs. of — A2–B1

   *(Pozn.: „Hromadná podstatná jména (the police, the team)" sloučena do „Počitatelnost" — jde o hraniční případ počitatelnosti/shody se slovesem.)*
8. Zájmena `[pronouns]`
   * Osobní a přivlastňovací — A1 (méně než 20/buňku — uzavřená sada tvarů, nedá se smysluplně sloučit)
   * Zvratná a vzájemná zájmena (myself.../each other, one another) — A1–B1
   * Neurčitá (someone, anything...) — A2–B1
   * Ukazovací (this/that/these/those) — A1–A2 (méně než 20/buňku — jen 4 tvary, nedá se smysluplně sloučit)
   * One/ones — A2–B1
   * There is vs. it is — A1–A2

   *(Pozn.: „Vztažná (who, which, that...)" odsud odebrána — patří koncepčně do `[clauses]`, kde je teď rozdělená na tři podtémata vztažných vět. „Each other / one another" sloučeno se „Zvratná" — reflexivní a vzájemná zájmena se běžně učí v kontrastu (blamed themselves vs. blamed each other), spojení dává víc prostoru pro 20 různých vět.)*
9. Vedlejší věty `[clauses]`
   * Určující vztažné věty (defining relative clauses) — B1
   * Neurčující vztažné věty (non-defining relative clauses) — B1–B2
   * Zkrácené vztažné věty (redukce vztažné věty pomocí příčestí/infinitivu) — C1
   * Podmětné, předmětné věty — B2
   * Participle clauses — C1

   *(Pozn.: „Participle clauses" přesunuty sem z `[infinitive-gerund]`; „Vztažné věty (defining/non-defining)" rozdělené na tři samostatná podtémata podle typu.)*
10. Infinitiv a gerundium `[infinitive-gerund]`
    * Sloveso + to infinitiv — A2–B1
    * Sloveso + -ing — A2–B1
    * Rozdíly ve významu (remember, stop, try...) — B2
    * Sloveso + předmět + infinitiv, vč. holého infinitivu (want/tell/ask him to go vs. make/let him go) — B1–B2
    * Předložka + -ing — B1
    * Perfektní infinitiv (seem to have done) — C1

    *(Pozn.: „Holý infinitiv (make/let)" sloučen se „Sloveso + předmět + infinitiv" — jde o stejný vzorec, jednou s „to" a jednou bez; spojení zvětšuje slovní zásobu k dispozici.)*
11. Přídavná jména a příslovce `[adjectives-adverbs]`
    * Stupňování (vč. stupňovatelných vs. absolutních přídavných jmen: very tired / absolutely exhausted) — A1–B2
    * Pořadí přídavných jmen — B1
    * Tvorba a pozice příslovcí — A2
    * Too/enough — A2–B1
    * So/such — B1
    * As...as / the more..., the more... — B1–B2
    * Přídavná jména na -ed/-ing (bored/boring) — A2–B1

    *(Pozn.: „Stupňovatelná vs. absolutní přídavná jména" sloučena do „Stupňování" — je to výjimka/hranice téhož jevu.)*
12. Předložky `[prepositions]`
    * Místa a času — A1–A2
    * Vazby se slovesy — B1–B2
    * Vazby s přídavnými jmény — B1–B2
    * Vazby s podstatnými jmény (reason for, increase in) — B1–B2
    * Předložka na konci věty — B2
13. Slovosled a otázky `[word-order]`
    * Nepřímé otázky — A2–C1
    * Záporné otázky — A2–C1
    * Tag questions — B1–B2
    * Inverze po záporných příslovcích (Never had I...) — C1
    * Otázky na podmět a předmět (Who called you? / Who did you call?) — A2–B1 (zatím bez otázek)
    * Vytýkací věty (It was John who... / What I need is...) — B2–C1 (zatím bez otázek)
    * Pozice příslovcí frekvence — A2–B1 (zatím bez otázek)
    * Krátké odpovědi, elipsa a důrazové do/did (So do I / Neither do I, I think so / I hope not, emphatic do) — B1–B2 (zatím bez otázek)

    *(Pozn.: „So do I / Neither do I", „Důrazové do/did" a „Elipsa a substituce" sloučeny do jednoho podtématu — všechny řeší, jak se vyhnout opakování celé věty pomocí pomocného slovesa.)*
14. Frázová slovesa `[phrasal-verbs]`
    * Základní sada — A2–B1
    * Rozšířená sada — B2–C1
    * Dělitelná vs. nedělitelná frázová slovesa (turn it off / look after it) — B1
15. Spojky a diskurzní markery `[conjunctions]`
    * Although, despite, in spite of — B1
    * Because, since, as (důvod) — B1
    * So that, in order to (účel) — B1–B2
    * Diskurzní markery (however, moreover...) — B2–C1
    * Whereas/while — B1–B2
    * However vs. although — B1
    * Both...and / either...or / neither...nor — A2–B1
    * Even though vs. even if — B2

    *(Unless zůstává výhradně v `[conditionals]`, sem se nepřidává.)*

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
