# Síla jevů (pokrok v tématech)

Schváleno 2026-10-06. Podle toho se počítají kroužky a procenta u témat (obrazovka Témata). Úroveň A2–C1 a obtížnost se počítají dál po svém (úroveň nikdy neklesá).

## Proč
Pár správných odpovědí za sebou ukazuje, že si to člověk pamatuje teď, ne že to umí. Jev se proto posouvá až po úspěšné kontrole s odstupem dní (systém opakování). Chceme lidi v aplikaci dlouhodobě, takže 100 % má znamenat „upevněno“.

## Jev
- Jev = podtéma (tag) v rámci tématu, klíč `téma|tag`. „Mix“ není jev. Odpovědi z Mix otázek se počítají k jevům jednotlivých mezer.
- Počítají se odpovědi ze všech obtížností. Kdo trénuje na Základní, zvládá jev na své úrovni.

## Stupně 0–6
| Stupeň | Jak se na něj dostaneš | Další kontrola |
|---|---|---|
| 0 | jev ještě netrénovaný | – |
| 1 | první den, kdy ho dáš správně (stejné pravidlo jako u kontroly) | za 1 den |
| 2 | kontrola po 1 dni | za 3 dny |
| 3 | kontrola po 3 dnech | za 7 dní |
| 4 | kontrola po 7 dnech | za 14 dní |
| 5 **Zvládnuto** | kontrola po 14 dnech | za 30 dní |
| 6 **Upevněno** | kontrola po 30 dnech | za 60 dní (udržovací) |

- **Kontrola** = v den, kdy je jev na řadě (nebo kdykoli později), odpovíš na 2–3 **různé** otázky k jevu. Projdeš při 2 ze 2 nebo 2 ze 3, neprojdeš při 2 chybách.
- Za jeden den se jev vyhodnotí **nejvýš jednou**, nadrtit to nejde. Nejrychlejší cesta ke „Zvládnuto“ je asi 25 dní, k „Upevněno“ asi 2 měsíce.
- Udržovací kontrola u stupně 6: úspěch stupeň drží (další za 60 dní), neúspěch ho sníží na 5.

## Zhoršení (mírné)
- Neúspěšná kontrola sníží jev o 1 stupeň (nejníž na 1, pokud už byl někdy správně) a další kontrola je hned zítra.
- Čas sám nic neubírá. Jev, který měl kontrolu a člověk netrénoval, je jen „čeká na kontrolu“ a rozhodnou odpovědi.
- Pojistka: jev na stupni 5–6, u kterého v jeden den dáš aspoň 3 odpovědi a většina je špatně, klesne o 1 stupeň i bez kontroly (nejvýš jednou za den).

## Návrat po pauze
- Po 30 a více dnech bez tréninku nabídne „Vítej zpátky!“ **návratový test**: 10 otázek z jevů na stupni 2 a výš (jedna otázka na jev). Správně = jev je potvrzený (další kontrola podle stupně), špatně = o 1 stupeň níž. Test se nabízí, nevnucuje. Rozřazovací test jde spustit vždy v Nastavení.

## Procenta a texty u tématu
- % tématu = součet stupňů jevů ÷ (6 × počet jevů).
- Část získaná z rozřazovacího testu se v kroužku ukazuje světlejší („náskok z testu“).
- Text pod tématem ukáže to nejbližší, v pořadí: „Ještě 1 správná a {jev} postoupí“ → „Dnes kontrola: {jev}“ → „Zítra kontrola: {jev}“ → „Nový jev: {jev}“ → „Další kontrola za N dní“ → „Vše upevněno“.
- Rozbalené téma ukazuje u každého jevu 6 teček (stupeň).

## Náskok z rozřazovacího testu
Jev, který dáš v testu správně, začne na stupni 1, a když ho dáš správně dvakrát, na stupni 2. Víc ne: test ukazuje, co umíš, ne jestli si to udržíš.

## Přechod pro stávající uživatele
Při prvním spuštění se stupně jevů odhadnou z dosavadních výsledků u otázek, nejvýš stupeň 3: aspoň 3 otázky jevu správně 2× po sobě s odstupem → 3, aspoň 1 taková → 2, aspoň 1 správně → 1. Kontroly se rozloží do dalších dnů, aby nepřišly všechny najednou.

## Denní trénink
Dnešní trénink nejdřív zařadí kontroly: 2 otázky ke každému jevu, který je na řadě (nejvýš polovina kola), pak opakování, slabá místa a nové otázky jako dosud.

## Přidávání otázek a jevů (do budoucna)
- **Nové otázky k existujícím jevům** (např. víc otázek ke slovesným časům) procenta nesníží. Počítají se jevy, ne otázky. Víc otázek jen znamená, že se při kontrolách méně opakují stejné věty. Každá nová otázka potřebuje nové unikátní `id` (statistiky jsou podle id) a tag přesně podle taháku (CHEATSHEET).
- **Nový jev v tématu** přidá stupně 0, takže procenta tématu u všech trochu klesnou (např. 7 jevů místo 6). Je to správně: v tématu je víc k naučení. Při přidání je dobré to zmínit v novinkách.
- **Přejmenování tagu** by smazalo pokrok jevu. Pokud je potřeba, musí se přidat převod starého klíče na nový v `migrateState`.
- Nové otázky musí mít CEFR úroveň jevu v `TAG_CEFR`, jinak se nepočítají do úrovně A2–C1 ani do rozřazovacího testu.
