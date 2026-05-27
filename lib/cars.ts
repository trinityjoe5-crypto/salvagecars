import type { Car } from '@/types/car'

// ─────────────────────────────────────────────────────────────────────────────
// DATA LAYER — single entry point for all car data.
//
// Currently returns static mock data for development/design purposes.
//
// TODO: Replace this implementation with the autobazar.eu XML feed:
//   1. Set env var AUTOBAZAR_FEED_URL to the feed URL provided by autobazar.eu
//   2. Fetch + parse the XML (each <Ad> element → Car object)
//   3. Map autobazar.eu fields to the Car interface (see @/types/car.ts)
//   4. Optionally persist to Supabase and return from DB for caching
//
// All UI components call getCars() or getCarById() only — zero UI changes
// needed when you swap this implementation.
// ─────────────────────────────────────────────────────────────────────────────

export function getCars(): Car[] {
  return MOCK_CARS
}

export function getCarById(id: string): Car | undefined {
  return MOCK_CARS.find((car) => car.id === id)
}

// ── Mock data ──────────────────────────────────────────────────────────────

const MOCK_CARS: Car[] = [
  {
    id: 'bmw-320d-2018',
    title: 'BMW 320d xDrive',
    price: 4200,
    year: 2018,
    mileageKm: 145000,
    fuel: 'diesel',
    transmission: 'automaticka',
    shortDescription:
      'Čelný náraz, airbags vystrelené. Motor a pohon v dobrom stave.',
    longDescription:
      'BMW 320d xDrive Sedan, rok výroby 2018, motor 2.0 diesel (140 kW). Vozidlo bolo účastníkom čelnej zrážky pri nízkej rýchlosti. Pohonná sústava, prevodovka a podvozok sú bez závad. Interiér kompletný, nepoškodený. Ideálne na vlastnú opravu alebo predaj dielov.',
    damageDescription:
      'Čelný náraz — poškodená predná časť: kapota, chladič, svetlomety, predný nárazník a ľavý predný blatník. Airbags vo volantu a palubnej doske vystrelené. Agregát a pohon bez poškodenia.',
    images: ['/bmw-320d.jpg'],
  },
  {
    id: 'skoda-octavia-2017',
    title: 'Škoda Octavia 1.6 TDI Combi',
    price: 3800,
    year: 2017,
    mileageKm: 112000,
    fuel: 'diesel',
    transmission: 'manualna',
    shortDescription:
      'Zadný náraz, poškodený kufor. Predná časť a motor bez závad.',
    longDescription:
      'Škoda Octavia III 1.6 TDI Combi (85 kW), rok 2017. Zadný náraz bez druhotných škôd. Predná časť vozidla a motor sú v perfektnom stave. Vozidlo chodí — vhodné na lacnú opravu zadku.',
    damageDescription:
      'Zadný náraz — deformovaný kufor, poškodený zadný nárazník a ľavé zadné svetlo. Karoséria v ostatných oblastiach bez poškodenia. Airbags nevystrelené.',
    images: ['/skoda-octavia.jpg'],
  },
  {
    id: 'vw-passat-2016',
    title: 'VW Passat 2.0 TDI Combi',
    price: 2900,
    year: 2016,
    mileageKm: 189000,
    fuel: 'diesel',
    transmission: 'automaticka',
    shortDescription:
      'Krupobitie po celej karosérii. Motor, prevodovka a elektronika bez závad.',
    longDescription:
      'Volkswagen Passat B8 2.0 TDI DSG Combi, rok 2016. Vozidlo poškodené krupobitím pri živelnej pohrome. Motor, prevodovka a elektronika sú bez závad, auto chodí spoľahlivo. Vhodné pre lakovňu alebo predaj dielov.',
    damageDescription:
      'Rozsiahle poškodenie laku krupobitím — kapota, strecha, strechy všetkých dverí a kufor. Odhadovaný počet priehlbín: 200+. Žiadne mechanické poškodenie ani poranenie rámu.',
    images: ['/vw-passat.jpg'],
  },
  {
    id: 'audi-a4-2019',
    title: 'Audi A4 2.0 TFSI Sedan',
    price: 6500,
    year: 2019,
    mileageKm: 98000,
    fuel: 'benzin',
    transmission: 'automaticka',
    shortDescription:
      'Bočný náraz z pravej strany. Motor a pohon bez závad, nízky nájazd.',
    longDescription:
      'Audi A4 B9 2.0 TFSI Sedan (140 kW), rok 2019. Bočný náraz z pravej strany pri parkovacom manévri. Motor, prevodovka a celý pohon sú v perfektnom stave. Nízky nájazd — výhodná kúpa pre skúseného opravára.',
    damageDescription:
      'Bočný náraz z pravej strany — poškodené pravé predné dvere, pravý predný blatník a pravý A-stĺpik. Airbags nevystrelené. Ľavá strana a predok vozidla bez poškodenia.',
    images: ['/audi-a4.jpg'],
  },
  {
    id: 'mercedes-c220d-2017',
    title: 'Mercedes-Benz C 220 d AMG',
    price: 3200,
    year: 2017,
    mileageKm: 134000,
    fuel: 'diesel',
    transmission: 'automaticka',
    shortDescription:
      'Rozsiahly čelný náraz, totálna škoda poisťovne. Agregát nepoškodený.',
    longDescription:
      'Mercedes-Benz C 220 d AMG Line (143 kW), rok 2017. Poisťovňou evidované ako totálna škoda po čelnom náraze. Napriek rozsahu poškodenia karosérie je motor, prevodovka a pohon v bezvadnom stave.',
    damageDescription:
      'Rozsiahly čelný náraz — predná časť kompletne zdeformovaná: kapota, chladič, obe svetlomety, predný rám. Airbags vystrelené. Agregát a hnacie ústrojenstvo nepoškodené.',
    images: ['/mercedes-c.jpg'],
  },
  {
    id: 'toyota-corolla-hybrid-2020',
    title: 'Toyota Corolla 1.8 Hybrid',
    price: 5100,
    year: 2020,
    mileageKm: 67000,
    fuel: 'hybrid',
    transmission: 'automaticka',
    shortDescription:
      'Povodňová škoda — interiér zasiahnutý vodou. Karoséria bez nárazu.',
    longDescription:
      'Toyota Corolla 1.8 Hybrid (72 kW + 53 kW el.), rok 2020. Vozidlo zasiahnuté povodňami, interiér bol pod vodou. Karoséria je bez akéhokoľvek nárazového poškodenia. Nízky nájazd, hybridná batéria čiastočne funkčná.',
    damageDescription:
      'Povodňová škoda — sedadlá, koberce a palubná doska premočené. Čiastočne poškodená elektronika (airbag modul, multimediálny systém). Karoséria a lak v perfektnom stave, bez nárazového poškodenia.',
    images: ['/toyota-corolla.jpg'],
  },
]