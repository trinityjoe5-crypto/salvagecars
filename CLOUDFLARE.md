# Obnova damagedauto na Cloudflare Workers

## Stav opravy — 25. 10. 2026

Zmeny sú pripravené lokálne, nie sú nahraté na GitHub ani nasadené.
Východiskový commit: 3b40cd05ecb615f95ce5aaaed115b6f1e385fcec.

- Next.js a eslint-config-next: 16.4.3; OpenNext: 1.20.13; lockfile znovu vygenerovaný npm.
- Worker aj WORKER_SELF_REFERENCE: damagedauto; vstup .open-next/worker.js.
- Doplnený open-next.config.ts, build/preview/deploy príkazy a kontrola veľkosti Workera.
- FEED_URL má prednosť; pôvodný AUTOBAZAR_FEED_URL zostáva podporovaný. Hodnoty sa čítajú za behu.
- XML sa načíta pri každom novom serverovom zobrazení stránky (timeout 15 sekúnd). Nepoužíva sa hodinové ISR ani R2. Nejde o plánovaný import: stránka už otvorená v prehliadači sa sama neobnoví.
- Ponuka na /ponuka-vozidiel zostáva obmedzená na 6 nerezervovaných vozidiel; homepage na 3. Zoznam môže byť kratší, ak feed obsahuje menej vozidiel.
- Opravené presné párovanie XML značiek a odstránenie duplicitných ID.
- Obrázky ostávajú unoptimized: true, bez Vercel Image Optimization.
- Diagnostika /api/feed-ping nezverejňuje URL feedu ani surové odpovede. Pri chýbajúcom, prázdnom alebo nedostupnom feede vráti 503.
- DNS ani priradenie domény sa nemenili.

## Čo už bolo overené

6/6 testov XML spracovania a načítavania úspešných; syntax 32 TypeScript súborov; zhoda package.json s lockfile; npm ci --dry-run a git diff --check úspešné.
Testy používajú uložený XML súbor a simulované sieťové odpovede. Nenahrádzajú živý test.

Úplná inštalácia sa zastavila na ENOSPC (plný disk Macu). Next/OpenNext build, výsledná veľkosť Workera, lokálny Workers runtime a produkčný web NIE SÚ overené. Pripravený GitHub workflow tieto build kontroly vykoná po nahratí. Nemá oprávnenie nasadzovať.

Nástroje v tomto prostredí nemali GitHub prístup na zápis ani prihlásenie Wrangler. Stav produkčných FEED_URL / AUTOBAZAR_FEED_URL / RESEND_API_KEY preto nebolo možné zistiť. Nebol odoslaný žiadny e-mail.

npm audit po kompatibilných opravách stále hlási 7 nálezov v reťazcoch nástrojov glob / miniflare / undici / OpenNext / Wrangler. Navrhnuté vynútené downgrady neboli aplikované, aby sa nerozbila požadovaná kompatibilita.

## Nahratie opravy

ZIP obsahuje iba zmenené a nové súbory, so zachovanými adresármi. Rozbaľte ho do pracovnej kópie existujúceho repozitára, nevytvárajte vnorený adresár. Na kontrolu najprv použite samostatnú vetvu fix/cloudflare-workers. Zachovajte aj skryté súbory .github, .gitignore a .env.local.example.

Alternatívou je priložený patch: `git apply --check salvagecars-cloudflare.patch` a potom `git apply salvagecars-cloudflare.patch` v pôvodnom repozitári. Patch aj ZIP predstavujú tú istú opravu; použite iba jednu možnosť.

Po nahratí vetvy otvorte GitHub → Actions → Cloudflare build check. Workflow vykoná čistú inštaláciu, testy, OpenNext build a Wrangler dry-run s kontrolou komprimovanej veľkosti do 3 MiB. Úspech tejto kontroly nepotvrdzuje limity CPU ani funkčnosť živých služieb.

## Cloudflare nastavenie

V Cloudflare → Workers & Pages → damagedauto → Settings → Variables and Secrets nastavte za behu Workera:

- FEED_URL: skutočná úplná adresa exportu od poskytovateľa. Uložte ako Secret, ak obsahuje prístupový kľúč. Ak už existuje AUTOBAZAR_FEED_URL, netreba ho premenovať.
- RESEND_API_KEY: platný Resend API kľúč ako Secret.
- CONTACT_FROM_EMAIL: adresa odosielateľa na doméne overenej v Resend, napr. info@damagedauto.eu, iba ak je táto doména overená.

Tieto hodnoty nenahrávajte do GitHubu ani do verejných logov. Premenné nastavené iba pre build nemusia byť dostupné bežiacemu Workerovi. Bez RESEND_API_KEY kontaktný formulár hlási chybu; predvolený onboarding@resend.dev má obmedzenia Resend testovacieho odosielateľa.

Cloudflare build command:

    npx opennextjs-cloudflare build

Cloudflare deploy command:

    npx wrangler deploy

Node.js 22 alebo novší. Vývojové závislosti musia byť nainštalované, pretože obsahujú OpenNext a Wrangler. Spúšťajte z koreňa repozitára. Chyba chýbajúceho .open-next/worker.js znamená, že treba najprv úspešne dokončiť OpenNext build.

## Test pred zmenou DNS

Najprv nasadiť na adresu damagedauto.<account-subdomain>.workers.dev z Cloudflare dashboardu. Tento dokument nepredpokladá názov subdomény účtu.

1. /api/feed-ping musí vrátiť HTTP 200, ok: true a počet áut. Nulový počet vyžaduje kontrolu feedu aj pri legitímne prázdnej ponuke.
2. Homepage zobrazuje 3 a /ponuka-vozidiel 6 áut, ak ich feed obsahuje dosť. Detail a obrázky fungujú. Žiadosti o obrázky nesmerujú cez /_next/image.
3. Zmena exportu sa prejaví pri novom načítaní stránky bez rebuildu.
4. Skontrolovať nastavenie kľúča a overenie odosielateľa v Resend. Skutočnú testovaciu správu poslať až s výslovným súhlasom vlastníka a potvrdiť doručenie.
5. Skontrolovať logy Workera, chyby a spotrebu CPU pri reálnych návštevách. Veľkostný limit sám o sebe negarantuje bezplatnú prevádzku pri každej záťaži.
6. Až po úspešnom teste riešiť doménu damagedauto.eu. Táto oprava ju neprepája.

## Dokumentácia

- https://opennext.js.org/cloudflare/get-started
- https://opennext.js.org/cloudflare/caching
- https://opennext.js.org/cloudflare/howtos/env-vars
