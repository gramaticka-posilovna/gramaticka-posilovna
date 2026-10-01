# Návrhy vzhledu — záznam verzí a rozhodnutí

Statické návrhy obrazovek (appka se jimi nemění). Každé kolo je samostatný soubor, starší verze se nepřepisují, aby šly porovnat.

## Soubory

| Kolo | Soubor | Obsah |
|---|---|---|
| 1 | `navrhy-vzhledu.html` | A · Letecká pošta, vylepšená · B · Posilovna (hravá) · C · Tmavý klid |
| 2 | `navrhy-vzhledu-2.html` | Letecká pošta+ **v1** · Sešit · Kondice (fitness kroužky) |
| 3 | `navrhy-vzhledu-3.html` | Letecká pošta+ **v2** · Činka (originální „posilovna“) |
| 4 | `navrhy-vzhledu-4.html` | Letecká pošta+ **v3** (se srdcem) · Korektura · Mozaika |
| 5 | `navrhy-vzhledu-5.html` | Letecká pošta+ **v4a** Měkké 3D · **v4b** Papír na stole · **v4c** Sklo a nebe |
| 6 | `navrhy-vzhledu-6.html` | Měkké 3D **v5** (bez poštovních nápisů, nový odznak) |

## Zpětná vazba

- **Kolo 1:** líbí se A (Letecká pošta, vylepšená) — zapamatovat jako možný návrat. B a C ne. „Pořád to není ono.“
- **Kolo 2:**
  - Letecká pošta+ v1 — líbí se nejvíc, **ale nelíbí se barevná přerušovaná čára** (červeno-modrý pruh „letecké obálky“ nahoře na kartách).
  - Sešit — vůbec se nelíbí, vyřazeno.
  - Kondice — dobrý směr kvůli názvu „Gramatická posilovna“, ale kopíruje fitness aplikace (kroužky jako v iPhonu), kterých je spousta. Chce to něco originálního.
- **Kolo 3:** Letecká pošta+ v2 se líbí nejvíc a má se rozvíjet dál, „dát do ní srdce“. K Čince bez komentáře. Zadání: ještě pár opravdu dobrých moderních návrhů s využitím technik kreativních lidí.
- **Kolo 4:** nepochopeno zadání. v3 (Ella, album, dopis od autora), Korektura ani Mozaika se nelíbí. Zpět k v2 a **jen udělat vizuál líbivější, např. víc 3D**. Tři návrhy.
- **Kolo 5:** líbí se **v4a Měkké 3D**. Nechce nápisy typu „Pohlednice z kola“, „Cestovní pas“ a razítko „doručeno“ vymyslet jinak.

## Letecká pošta+ — historie verzí

### v1 (kolo 2)
- Metafora cesty: denní cíl = „dopis“, splněný den = razítko, úroveň = cíl cesty B1 → B2, správná odpověď = razítko „doručeno“, výsledek = pohlednice, placená verze = „cestovní pas“.
- Červeno-modrý přerušovaný pruh (okraj letecké obálky) nahoře na vybraných kartách.
- Razítka dnů s čárkovaným (přerušovaným) okrajem, trasa B1 → B2 jako tečkovaná čára.

### v2 (kolo 3)
- **Odstraněn červeno-modrý přerušovaný pruh** ze všech karet (dopis, otázka, cestovní pas).
- Místo pruhu nese „poštovní“ charakter jemná ikona obálky / razítka v rohu karty.
- **Razítka dnů mají zoubkovaný okraj jako skutečná poštovní známka** místo čárkovaného rámečku — méně přerušovaných čar celkově, víc „pravá známka“.
- **Trasa B1 → B2 je plná tenká linka** s vyznačenou ušlou částí místo tečkované čáry.
- Velká známka na pohlednici také se zoubkovaným okrajem.
- Ostatní (barvy, písmo, rozvržení, obsah obrazovek) beze změny, aby šly verze porovnat.

### v3 (kolo 4) — „se srdcem“
- Vzhled beze změny proti v2 (barvy, Fraunces + Inter, zoubkované známky, plná trasa).
- **Nová postava Ella**, kamarádka na dopisy: za splněný den pošle ručně psanou pohlednici v angličtině s gramatikou, kterou uživatel ten den procvičil (zvýrazněno). Úvod ukazuje zalepenou obálku s červenou pečetí se srdcem.
- **Laskavá chyba:** razítko „vráceno s poznámkou“, ručně psaný lísteček se správným tvarem a věta „Razítko dne ti chyba nevezme.“
- **Album pohlednic:** 15 témat = 15 měst, trasa B1 → B2 přesunuta z úvodu sem.
- **Cestovní pas s osobním dopisem od autora** (text je ukázka, musí se přepsat pravdivě).
- Ručně psané písmo Caveat jen pro „lidské“ prvky (Ella, poznámky, autor).

### v4a / v4b / v4c (kolo 5) — vychází z v2, ne z v3
- Obsah, rozvržení i texty obrazovek **přesně jako v2** (stejné HTML), mění se jen CSS. Barevná emoji místo plochých symbolů (obálka, letadlo, pas).
- Společné: razítko „doručeno“ posunuto výš, aby nepřekrývalo text.
- **v4a Měkké 3D:** zaoblenější „nafouklé“ karty se světlem shora a stínem zespodu, tlačítka se spodní hranou, vypouklý ukazatel pokroku a trasa, známky a razítko vrhají stín, pohlednice mírně natočená.
- **v4b Papír na stole:** pozadí z balicího papíru, karty jako listy papíru se dalšími listy pod sebou a lepicí páskou, mírně natočené; razítko jako inkoust.
- **v4c Sklo a nebe:** pozadí ranní obloha s mraky, karty z matného skla, ukazatel pokroku od broskvové po námořní modrou.

### v5 (kolo 6) — z v4a Měkké 3D
- Poštovní nápisy nahrazeny obyčejnými: Dnešní dopis → Dnešní cíl, Razítka tento týden → Tento týden, náhradní razítko → náhradní den, Tvoje cesta → Tvůj pokrok, „62 % cesty“ → „62 % k úrovni B2“, „+1 do dnešního dopisu“ → „+1 k dnešnímu cíli“, Pohlednice z kola → Výsledek kola, Dnešní razítko získáno → Dnešní cíl splněn, Cestovní pas (🛂) → Plná verze (⭐), „Celá cesta od A2“ → „Všechny úrovně od A2“, náhradní razítka → náhradní dny, „den 8 tvé cesty“ → „8. den v řadě“.
- Kulaté razítko „DORUČENO“ u správné odpovědi nahrazeno vypouklým zeleným 3D odznakem se zatržítkem a štítkem „+1“.
- Beze změny zůstávají drobné poštovní prvky bez textu: ikonky obálky a letadla v rozích, dny jako známky, letadélko na pruhu, známka 8/10 na výsledku.

## Činka — historie verzí

### v1 (kolo 3)
- Náhrada za „Kondici“: vlastní koncept místo fitness kroužků.
- Správná odpověď = kotouč na čince; barva kotouče podle obtížnosti (zelená 10 kg = základní, žlutá 15 kg = střední, červená 25 kg = pokročilá — podle barev olympijských kotoučů).
- Kolo = sada, otázka = opakování; téma = cvik s osobním maximem (kg); pokrok v „tréninkovém deníku“.
- Betonově šedé pozadí, výrazné úzké písmo pro čísla (jako cedule v posilovně).

## Korektura — historie verzí

### v1 (kolo 4)
- Inspirace Rams/Vignelli (dvě písma: Instrument Serif + Inter, černá na papíře, jediná červená) a de Bono (otočení role: uživatel je korektor, ne zkoušený žák).
- Úvod: velké číslo dne, témata jako „obsah knihy“. Otázka: velká věta v knižní sazbě, odpověď vložená červeně s korektorskou značkou ‸, pravidlo jako marginálie. Výsledek: stránka do „tvé knihy“, polička s hřbety dní, věta dne.

## Mozaika — historie verzí

### v1 (kolo 4)
- Inspirace Bauhaus/Albers (červená, modrá, žlutá, černá; čtverce, kruhy, čtvrtkruhy) + Zeigarnikův efekt.
- Každá buňka (20 otázek) = obraz z 20 dílků; dílek přibude, až když otázku opravdu umíš (2× správně). Hotové obrazy v galerii, lze nastavit jako tapetu nebo sdílet. Písmo Space Grotesk.
