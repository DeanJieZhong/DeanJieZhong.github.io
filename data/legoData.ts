interface LegoSource {
  label: string
  url: string
}

// Update this date after reviewing the retirement status of the whole collection.
export const legoStatusCheckedAt = '2026-10-14'

export interface LegoSet {
  number: string
  catalogNumber?: string
  variant?: string
  name: string
  theme?: string
  releaseYear?: number
  pieces?: number
  availability?: {
    lifecycle: 'current' | 'retiring-soon' | 'retired' | 'unknown'
    source: LegoSource
  }
  // Personal dates may be approximate. Never infer them from a set's release year.
  acquisition?: {
    when?: string
    how?: string
    from?: string
    place?: {
      city: string
      country: string
    }
  }
  // Personal stories, impressions and memories. Omit until there is something to share.
  notes?: string
  catalogNote?: string
  sources?: LegoSource[]
  image: {
    src: string
    alt: string
    width: number
    height: number
    credit?: string
    sourceUrl?: string
  }
  instructionsUrl?: string
}

// Add confirmed sets here; the archive controls their display order.
// Store images in public/static/images/lego/ and reference /static/images/lego/… here.
// Leave unknown details out rather than inferring them from the release year.
const legoSets: LegoSet[] = [
  {
    number: '21367',
    name: 'Tintin Moon Rocket',
    theme: 'Ideas',
    releaseYear: 2026,
    pieces: 1283,
    acquisition: {
      when: '2026',
      how: 'Purchased',
      place: { city: 'Suzhou', country: 'China' },
    },
    availability: {
      lifecycle: 'current',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/tintin-moon-rocket-21367',
      },
    },
    sources: [
      {
        label: 'LEGO announcement',
        url: 'https://www.lego.com/en-us/aboutus/news/2026/march/lego-ideas-tintin-s-iconic-moon-rocket',
      },
    ],
    image: {
      src: '/static/images/lego/21367.png',
      alt: 'The red-and-white Tintin Moon Rocket with its six LEGO characters',
      width: 986,
      height: 1600,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/product/tintin-moon-rocket-21367',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/21367',
  },
  {
    // Brickset identifies the Ferrari variant of series 71049 as 71049-3.
    number: '71049',
    catalogNumber: '71049-3',
    variant: 'Ferrari',
    name: 'Ferrari F1 Collectible Race Car',
    theme: 'F1 Collectibles',
    releaseYear: 2025,
    pieces: 29,
    acquisition: {
      when: '2025',
      how: 'Purchased',
      place: { city: 'Abu Dhabi', country: 'United Arab Emirates' },
    },
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · UK',
        url: 'https://www.lego.com/en-gb/product/f1-collectible-race-cars-71049',
      },
    },
    notes: 'Only the Ferrari from this series is in my collection.',
    catalogNote: '71049 is the series number. Brickset lists the Ferrari variant as 71049-3.',
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/71049-3/' }],
    image: {
      src: '/static/images/lego/71049-ferrari.jpg',
      alt: 'The red Ferrari miniature race car from LEGO F1 Collectibles series 71049',
      width: 690,
      height: 367,
      credit: 'Image: Brickset',
      sourceUrl: 'https://brickset.com/sets/71049-3/',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/71049',
  },
  {
    number: '76023',
    name: 'The Tumbler',
    theme: 'DC',
    releaseYear: 2014,
    pieces: 1869,
    acquisition: {
      // Inferred from starting the fourth university year in September 2026,
      // with three years each of high school and middle school.
      when: 'Around June 2017',
      how: 'A gift',
      from: 'My mum',
    },
    notes: 'A reward from my mum for graduating from primary school.',
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/the-tumbler-76023',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/76023-1/The-Tumbler' },
    ],
    image: {
      src: '/static/images/lego/76023.jpg',
      alt: 'The black LEGO Tumbler from The Dark Knight trilogy',
      width: 1600,
      height: 1200,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/product/the-tumbler-76023',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/76023',
  },
  {
    number: '42154',
    name: '2022 Ford GT',
    theme: 'Technic',
    releaseYear: 2023,
    pieces: 1468,
    acquisition: {
      when: '2024',
      how: 'A gift',
      from: 'My girlfriend at the time',
    },
    availability: {
      lifecycle: 'retiring-soon',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/2022-ford-gt-42154',
      },
    },
    catalogNote:
      'Piece count follows LEGO’s product page (1,468). Brickset lists 1,466; the sources differ.',
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42154-1/2022-Ford-GT' },
    ],
    image: {
      src: '/static/images/lego/42154.png',
      alt: 'The dark-blue LEGO Technic Ford GT with white racing stripes',
      width: 1600,
      height: 1199,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/product/2022-ford-gt-42154',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42154',
  },
  {
    number: '9498',
    name: 'Saesee Tiin’s Jedi Starfighter',
    theme: 'Star Wars',
    releaseYear: 2012,
    pieces: 244,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/9498-1/Saesee-Tiin-s-Jedi-Starfighter',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/9498-1/Saesee-Tiin-s-Jedi-Starfighter',
      },
    ],
    image: {
      src: '/static/images/lego/9498.jpg',
      alt: 'Saesee Tiin’s green-and-white Jedi Starfighter with three LEGO minifigures',
      width: 690,
      height: 488,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/9498-1/Saesee-Tiin-s-Jedi-Starfighter',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/9498',
  },
  {
    number: '9497',
    name: 'Republic Striker-class Starfighter',
    theme: 'Star Wars',
    releaseYear: 2012,
    pieces: 376,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/9497-1/Republic-Striker-class-Starfighter',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/9497-1/Republic-Striker-class-Starfighter',
      },
    ],
    image: {
      src: '/static/images/lego/9497.jpg',
      alt: 'The red-and-white Republic Striker-class Starfighter with three LEGO minifigures',
      width: 2116,
      height: 1109,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/9497-1/Republic-Striker-class-Starfighter',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/9497',
  },
  {
    number: '9492',
    name: 'TIE Fighter',
    theme: 'Star Wars',
    releaseYear: 2012,
    pieces: 413,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/9492-1/TIE-Fighter',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/9492-1/TIE-Fighter' }],
    image: {
      src: '/static/images/lego/9492.jpg',
      alt: 'The grey-and-black TIE Fighter with four LEGO minifigures',
      width: 1659,
      height: 1526,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/9492-1/TIE-Fighter',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/9492',
  },
  {
    number: '70144',
    name: 'Laval’s Fire Lion',
    theme: 'Legends of Chima',
    releaseYear: 2014,
    pieces: 450,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70144-1/Laval-s-Fire-Lion',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70144-1/Laval-s-Fire-Lion' },
    ],
    image: {
      src: '/static/images/lego/70144.jpg',
      alt: 'Laval’s yellow-and-red Fire Lion vehicle with three LEGO minifigures',
      width: 2274,
      height: 1800,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70144-1/Laval-s-Fire-Lion',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70144',
  },
  {
    number: '70113',
    name: 'CHI Battles',
    theme: 'Legends of Chima',
    releaseYear: 2013,
    pieces: 92,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70113-1/CHI-Battles',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70113-1/CHI-Battles' },
    ],
    image: {
      src: '/static/images/lego/70113.jpg',
      alt: 'Two CHI Battles Speedorz with minifigures, obstacles, CHI crystals and game cards',
      width: 2321,
      height: 1218,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70113-1/CHI-Battles',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70113',
  },
  {
    number: '70114',
    name: 'Sky Joust',
    theme: 'Legends of Chima',
    releaseYear: 2013,
    pieces: 117,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70114-1/Sky-Joust',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/70114-1/Sky-Joust' }],
    image: {
      src: '/static/images/lego/70114.jpg',
      alt: 'The Sky Joust tower, two Speedorz, eagle and raven minifigures, and CHI crystals',
      width: 2392,
      height: 1170,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70114-1/Sky-Joust',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70114',
  },
  {
    number: '70115',
    name: 'Ultimate Speedor Tournament',
    theme: 'Legends of Chima',
    releaseYear: 2013,
    pieces: 246,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70115-1/Ultimate-Speedor-Tournament',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/70115-1/Ultimate-Speedor-Tournament',
      },
    ],
    image: {
      src: '/static/images/lego/70115.jpg',
      alt: 'The Ultimate Speedor Tournament lion gate, obstacles, two Speedorz and CHI crystals',
      width: 1649,
      height: 1714,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70115-1/Ultimate-Speedor-Tournament',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70115',
  },
  {
    number: '76168',
    name: 'Captain America Mech Armor',
    theme: 'Marvel Super Heroes',
    releaseYear: 2021,
    pieces: 121,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/76168-1/Captain-America-Mech-Armor',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/76168-1/Captain-America-Mech-Armor',
      },
    ],
    image: {
      src: '/static/images/lego/76168.jpg',
      alt: 'Captain America in a blue mech with a red, white and blue shield',
      width: 1962,
      height: 2156,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/76168-1/Captain-America-Mech-Armor',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/76168',
  },
  {
    number: '70704',
    name: 'Vermin Vaporizer',
    theme: 'Space / Galaxy Squad',
    releaseYear: 2013,
    pieces: 506,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brick Ranker',
        url: 'https://brickranker.com/rankings/set/70704-1/vermin-vaporizer',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70704-1/Vermin-Vaporizer' },
    ],
    image: {
      src: '/static/images/lego/70704.jpg',
      alt: 'The white-and-green Vermin Vaporizer vehicle, an alien scorpion and three minifigures',
      width: 2080,
      height: 1745,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70704-1/Vermin-Vaporizer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70704',
  },
  {
    number: '42033',
    name: 'Record Breaker',
    theme: 'Technic',
    releaseYear: 2015,
    pieces: 125,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/record-breaker-42033',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42033-1/Record-Breaker' },
    ],
    image: {
      src: '/static/images/lego/42033.jpg',
      alt: 'The LEGO Technic Record Breaker, set 42033',
      width: 2362,
      height: 1617,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42033-1/Record-Breaker',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42033',
  },
  {
    number: '42036',
    name: 'Street Motorcycle',
    theme: 'Technic',
    releaseYear: 2015,
    pieces: 375,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42036-1/Street-Motorcycle',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42036-1/Street-Motorcycle' },
    ],
    image: {
      src: '/static/images/lego/42036.jpg',
      alt: 'The LEGO Technic Street Motorcycle, set 42036',
      width: 2368,
      height: 1561,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42036-1/Street-Motorcycle',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42036',
  },
  {
    number: '42046',
    name: 'Getaway Racer',
    theme: 'Technic',
    releaseYear: 2016,
    pieces: 170,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/getaway-racer-42046',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42046-1/Getaway-Racer' },
    ],
    image: {
      src: '/static/images/lego/42046.jpg',
      alt: 'The LEGO Technic Getaway Racer, set 42046',
      width: 2296,
      height: 1441,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42046-1/Getaway-Racer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42046',
  },
  {
    number: '42002',
    name: 'Hovercraft',
    theme: 'Technic',
    releaseYear: 2013,
    pieces: 170,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · NL',
        url: 'https://www.lego.com/en-nl/product/hovercraft-42002',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/42002-1/Hovercraft' }],
    image: {
      src: '/static/images/lego/42002.jpg',
      alt: 'The LEGO Technic Hovercraft, set 42002',
      width: 2098,
      height: 1737,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42002-1/Hovercraft',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42002',
  },
  {
    number: '42011',
    name: 'Race Car',
    theme: 'Technic',
    releaseYear: 2013,
    pieces: 158,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · NL',
        url: 'https://www.lego.com/en-nl/product/race-car-42011',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/42011-1/Race-Car' }],
    image: {
      src: '/static/images/lego/42011.jpg',
      alt: 'The LEGO Technic Race Car, set 42011',
      width: 2369,
      height: 1410,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42011-1/Race-Car',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42011',
  },
  {
    number: '42020',
    name: 'Twin-rotor Helicopter',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 145,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42020-1/Twin-rotor-Helicopter',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/42020-1/Twin-rotor-Helicopter',
      },
    ],
    image: {
      src: '/static/images/lego/42020.jpg',
      alt: 'The LEGO Technic Twin-rotor Helicopter, set 42020',
      width: 2064,
      height: 1201,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42020-1/Twin-rotor-Helicopter',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42020',
  },
  {
    number: '42022',
    name: 'Hot Rod',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 414,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42022-1/Hot-Rod',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/42022-1/Hot-Rod' }],
    image: {
      src: '/static/images/lego/42022.jpg',
      alt: 'The LEGO Technic Hot Rod, set 42022',
      width: 2400,
      height: 1312,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42022-1/Hot-Rod',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42022',
  },
  {
    number: '42023',
    name: 'Construction Crew',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 833,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42023-1/Construction-Crew',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42023-1/Construction-Crew' },
    ],
    image: {
      src: '/static/images/lego/42023.jpg',
      alt: 'The LEGO Technic Construction Crew, set 42023',
      width: 2400,
      height: 1538,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42023-1/Construction-Crew',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42023',
  },
  {
    number: '42026',
    name: 'Black Champion Racer',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 137,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42026-1/Black-Champion-Racer',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/42026-1/Black-Champion-Racer',
      },
    ],
    image: {
      src: '/static/images/lego/42026.jpg',
      alt: 'The LEGO Technic Black Champion Racer, set 42026',
      width: 2385,
      height: 1409,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42026-1/Black-Champion-Racer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42026',
  },
  {
    number: '42027',
    name: 'Desert Racer',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 148,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42027-1/Desert-Racer',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42027-1/Desert-Racer' },
    ],
    image: {
      src: '/static/images/lego/42027.jpg',
      alt: 'The LEGO Technic Desert Racer, set 42027',
      width: 2336,
      height: 1673,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42027-1/Desert-Racer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42027',
  },
  {
    number: '42028',
    name: 'Bulldozer',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 617,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42028-1/Bulldozer',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/42028-1/Bulldozer' }],
    image: {
      src: '/static/images/lego/42028.jpg',
      alt: 'The LEGO Technic Bulldozer, set 42028',
      width: 2400,
      height: 1714,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42028-1/Bulldozer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42028',
  },
  {
    number: '42025',
    name: 'Cargo Plane',
    theme: 'Technic',
    releaseYear: 2014,
    pieces: 1297,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42025-1/Cargo-Plane',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42025-1/Cargo-Plane' },
    ],
    image: {
      src: '/static/images/lego/42025.jpg',
      alt: 'The LEGO Technic Cargo Plane, set 42025',
      width: 2313,
      height: 1698,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42025-1/Cargo-Plane',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42025',
  },
  {
    number: '8155',
    name: 'Ferrari F1 Pit',
    theme: 'Racers / Tiny Turbos',
    releaseYear: 2008,
    pieces: 482,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'BrickEconomy',
        url: 'https://www.brickeconomy.com/set/8155-1/lego-tiny-turbos-ferrari-f1-pit',
      },
    },
    catalogNote:
      'Catalogue year and piece count follow Brickset (2008, 482). LEGO’s instruction archive lists 2007 and 483 pieces.',
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/8155-1/Ferrari-F1-Pit' },
    ],
    image: {
      src: '/static/images/lego/8155.jpg',
      alt: 'Original Ferrari F1 Pit box showing the garage, two red race cars and support vehicles',
      width: 690,
      height: 506,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/8155-1/Ferrari-F1-Pit',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/8155',
  },
  {
    number: '77259',
    name: 'Audi Revolut F1 Team R26 Race Car',
    theme: 'Speed Champions',
    releaseYear: 2026,
    pieces: 216,
    availability: {
      lifecycle: 'retiring-soon',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/audi-revolut-f1-team-r26-race-car-77259',
      },
    },
    catalogNote:
      'Piece count follows LEGO’s product page (216). Brickset lists 215; the sources differ.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/77259-1/Audi-Revolut-F1-Team-R26-Race-Car',
      },
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-us/product/audi-revolut-f1-team-r26-race-car-77259',
      },
    ],
    image: {
      src: '/static/images/lego/77259.jpg',
      alt: 'The silver, red and black Audi R26 F1 race car with its driver minifigure',
      width: 2400,
      height: 1151,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/77259-1/Audi-Revolut-F1-Team-R26-Race-Car',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/77259',
  },
  {
    number: '77243',
    name: 'Oracle Red Bull Racing RB20',
    theme: 'Speed Champions',
    releaseYear: 2025,
    pieces: 251,
    availability: {
      lifecycle: 'retiring-soon',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/oracle-red-bull-racing-rb20-f1-race-car-77243',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/77243-1' }],
    image: {
      src: '/static/images/lego/77243.jpg',
      alt: 'The dark-blue Oracle Red Bull Racing RB20 with yellow accents and its driver minifigure',
      width: 2400,
      height: 1138,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/77243-1',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/77243',
  },
  {
    number: '7906',
    name: 'Fireboat',
    theme: 'City',
    releaseYear: 2007,
    pieces: 187,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/7906-1/Fireboat',
      },
    },
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/7906-1/Fireboat' }],
    image: {
      src: '/static/images/lego/7906.jpg',
      alt: 'Original LEGO City Fireboat box showing a red fireboat and a yellow rescue dinghy',
      width: 690,
      height: 516,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/7906-1/Fireboat',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7906',
  },
  {
    number: '7239',
    name: 'Fire Truck',
    theme: 'City',
    releaseYear: 2005,
    pieces: 214,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brick Ranker',
        url: 'https://brickranker.com/rankings/set/7239-1/fire-truck',
      },
    },
    catalogNote:
      'Catalogue year and piece count follow Brickset (2005, 214). LEGO’s instruction archive lists 2004 and 216 pieces.',
    sources: [{ label: 'Brickset catalogue', url: 'https://brickset.com/sets/7239-1/Fire-Truck' }],
    image: {
      src: '/static/images/lego/7239.jpg',
      alt: 'The red-and-white fire truck with an extending ladder, boat trailer and two firefighters',
      width: 2268,
      height: 1272,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/7239-1/Fire-Truck',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7239',
  },
  {
    number: '42005',
    name: 'Monster Truck',
    theme: 'Technic',
    releaseYear: 2013,
    pieces: 329,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/42005-1/Monster-Truck',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42005-1/Monster-Truck' },
    ],
    image: {
      src: '/static/images/lego/42005.jpg',
      alt: 'The LEGO Technic Monster Truck with oversized tires',
      width: 2153,
      height: 1786,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/42005-1/Monster-Truck',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42005',
  },
  {
    number: '9483',
    name: 'Agent Mater’s Escape',
    theme: 'Cars',
    releaseYear: 2012,
    pieces: 144,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/9483-1/Agent-Mater-s-Escape',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/9483-1/Agent-Mater-s-Escape' },
    ],
    image: {
      src: '/static/images/lego/9483.jpg',
      alt: 'Mater with a hang glider and an enemy car from LEGO Cars Agent Mater’s Escape',
      width: 2134,
      height: 1548,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/9483-1/Agent-Mater-s-Escape',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/9483',
  },
  {
    number: '4203',
    name: 'Excavator Transporter',
    theme: 'City',
    releaseYear: 2012,
    pieces: 305,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/4203-1/Excavator-Transporter',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/4203-1/Excavator-Transporter',
      },
    ],
    image: {
      src: '/static/images/lego/4203.jpg',
      alt: 'The LEGO City excavator and transporter truck with mining accessories',
      width: 2076,
      height: 1446,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/4203-1/Excavator-Transporter',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/4203',
  },
  {
    number: '31006',
    name: 'Highway Speedster',
    theme: 'Creator 3-in-1',
    releaseYear: 2013,
    pieces: 286,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · NL',
        url: 'https://www.lego.com/en-nl/product/highway-speedster-31006',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/31006-1/Highway-Speedster' },
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-nl/product/highway-speedster-31006',
      },
    ],
    image: {
      src: '/static/images/lego/31006.jpg',
      alt: 'The white LEGO Creator Highway Speedster sports car',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-nl/product/highway-speedster-31006',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/31006',
  },
  {
    number: '60043',
    name: 'Prisoner Transporter',
    theme: 'City',
    releaseYear: 2014,
    pieces: 196,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · NL',
        url: 'https://www.lego.com/en-nl/product/prisoner-transporter-60043',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/60043-1/Prisoner-Transporter',
      },
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-nl/product/prisoner-transporter-60043',
      },
    ],
    image: {
      src: '/static/images/lego/60043.jpg',
      alt: 'The LEGO City Prisoner Transporter with an ATV, a police officer and two crooks',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-nl/product/prisoner-transporter-60043',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/60043',
  },
  {
    number: '60076',
    name: 'Demolition Site',
    theme: 'City',
    releaseYear: 2015,
    pieces: 776,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · CA',
        url: 'https://www.lego.com/en-ca/product/demolition-site-60076',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/60076-1/Demolition-Site' },
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-ca/product/demolition-site-60076',
      },
    ],
    image: {
      src: '/static/images/lego/60076.jpg',
      alt: 'The LEGO City Demolition Site with a wrecking-ball crane, loader, dump truck and building sections',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-ca/product/demolition-site-60076',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/60076',
  },
  {
    number: '4439',
    name: 'Heavy-Lift Helicopter',
    theme: 'City',
    releaseYear: 2012,
    pieces: 393,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'BrickEconomy',
        url: 'https://www.brickeconomy.com/set/4439-1/lego-city-forest-police-heavy-lift-helicopter',
      },
    },
    catalogNote:
      'Release year follows Brickset (2012). LEGO’s instruction archive lists 2011 and uses the name Heavy-Duty Helicopter.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/4439-1/Heavy-Lift-Helicopter',
      },
    ],
    image: {
      src: '/static/images/lego/4439.jpg',
      alt: 'The blue-and-white LEGO City Heavy-Lift Helicopter with a police vehicle and three officers',
      width: 500,
      height: 314,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/service/building-instructions/4439',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/4439',
  },
  {
    number: '42006',
    name: 'Excavator',
    theme: 'Technic',
    releaseYear: 2013,
    pieces: 720,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · NL',
        url: 'https://www.lego.com/en-nl/product/excavator-42006',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/42006-1/Excavator' },
      { label: 'LEGO product page', url: 'https://www.lego.com/en-nl/product/excavator-42006' },
    ],
    image: {
      src: '/static/images/lego/42006.jpg',
      alt: 'The yellow LEGO Technic Excavator with tracks, an extending arm and a four-prong grabber',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-nl/product/excavator-42006',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42006',
  },
  {
    number: '70501',
    name: 'Warrior Bike',
    theme: 'Ninjago',
    releaseYear: 2013,
    pieces: 210,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70501-1/Warrior-Bike',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70501-1/Warrior-Bike' },
    ],
    image: {
      src: '/static/images/lego/70501.jpg',
      alt: 'The LEGO Ninjago Warrior Bike with its two minifigures',
      width: 1634,
      height: 1729,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70501-1/Warrior-Bike',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70501',
  },
  {
    number: '70735',
    name: 'Ronin R.E.X.',
    theme: 'Ninjago',
    releaseYear: 2015,
    pieces: 547,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70735-1/Ronin-R-E-X',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70735-1/Ronin-R-E-X' },
    ],
    image: {
      src: '/static/images/lego/70735.jpg',
      alt: 'The LEGO Ninjago Ronin R.E.X. airship with a dragon and minifigures',
      width: 2290,
      height: 1122,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70735-1/Ronin-R-E-X',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70735',
  },
  {
    number: '70739',
    name: 'Airjitzu Kai Flyer',
    theme: 'Ninjago',
    releaseYear: 2015,
    pieces: 46,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/70739-1/Airjitzu-Kai-Flyer',
      },
    },
    sources: [
      { label: 'Brickset catalogue', url: 'https://brickset.com/sets/70739-1/Airjitzu-Kai-Flyer' },
    ],
    image: {
      src: '/static/images/lego/70739.jpg',
      alt: 'The red LEGO Ninjago Airjitzu Kai Flyer with Kai and his weapons',
      width: 1841,
      height: 1617,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/70739-1/Airjitzu-Kai-Flyer',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/70739',
  },
  {
    number: '8066',
    name: 'Off-Roader',
    theme: 'Technic',
    releaseYear: 2011,
    pieces: 141,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/8066-1/Off-Roader',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/8066-1/Off-Roader',
      },
    ],
    image: {
      src: '/static/images/lego/8066.jpg',
      alt: 'The LEGO Technic Off-Roader with its large wheels and roll cage',
      width: 2158,
      height: 1515,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/8066-1/Off-Roader',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/8066',
  },
  {
    number: '7733',
    name: 'Truck & Forklift',
    theme: 'City',
    releaseYear: 2008,
    pieces: 343,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/7733-1/Truck-Forklift',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/7733-1/Truck-Forklift',
      },
    ],
    image: {
      src: '/static/images/lego/7733.jpg',
      alt: 'The LEGO City cargo truck and trailer with a forklift, cargo and two workers',
      width: 500,
      height: 312,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/service/building-instructions/7733',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7733',
  },
  {
    number: '7741',
    name: 'Police Helicopter',
    theme: 'City',
    releaseYear: 2008,
    pieces: 94,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/police-helicopter-7741',
      },
    },
    catalogNote: 'Release year follows Brickset (2008). LEGO’s instruction archive lists 2007.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/7741-1/Police-Helicopter',
      },
    ],
    image: {
      src: '/static/images/lego/7741.jpg',
      alt: 'The LEGO City Police Helicopter with its pilot minifigure',
      width: 500,
      height: 361,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/service/building-instructions/7741',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7741',
  },
  {
    number: '7638',
    name: 'Tow Truck',
    theme: 'City',
    releaseYear: 2009,
    pieces: 129,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/7638-1/Tow-Truck',
      },
    },
    catalogNote:
      'Piece count follows Brickset (129). LEGO’s instruction archive lists 177; the sources differ.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/7638-1/Tow-Truck',
      },
    ],
    image: {
      src: '/static/images/lego/7638.jpg',
      alt: 'The LEGO City Tow Truck with a towing hook and driver minifigure',
      width: 1570,
      height: 1250,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/7638-1/Tow-Truck',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7638',
  },
  {
    number: '3177',
    name: 'Small Car',
    theme: 'City',
    releaseYear: 2010,
    pieces: 43,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/3177-1/Small-Car',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/3177-1/Small-Car',
      },
    ],
    image: {
      src: '/static/images/lego/3177.jpg',
      alt: 'The LEGO City Small Car with its driver minifigure',
      width: 2056,
      height: 1104,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/3177-1/Small-Car',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/3177',
  },
  {
    number: '3179',
    name: 'Repair Truck',
    theme: 'City',
    releaseYear: 2010,
    pieces: 118,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/3179-1/Repair-Truck',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/3179-1/Repair-Truck',
      },
    ],
    image: {
      src: '/static/images/lego/3179.jpg',
      alt: 'The LEGO City Repair Truck with its lifting platform, streetlight and repair worker',
      width: 1852,
      height: 1521,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/3179-1/Repair-Truck',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/3179',
  },
  {
    number: '3178',
    name: 'Seaplane',
    theme: 'City',
    releaseYear: 2010,
    pieces: 102,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/3178-1/Seaplane',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/3178-1/Seaplane',
      },
    ],
    image: {
      src: '/static/images/lego/3178.jpg',
      alt: 'The LEGO City Seaplane with its floats and pilot minifigure',
      width: 2095,
      height: 1430,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/3178-1/Seaplane',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/3178',
  },
  {
    number: '7279',
    name: 'Police Minifigure Collection',
    theme: 'City',
    releaseYear: 2011,
    pieces: 57,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'BrickPicker',
        url: 'https://app.brickpicker.com/sets/7279-police-minifigure-collection',
      },
    },
    catalogNote: 'Release year follows Brickset (2011). LEGO’s instruction archive lists 2010.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/7279-1/Police-Minifigure-Collection',
      },
    ],
    image: {
      src: '/static/images/lego/7279.jpg',
      alt: 'The LEGO City Police Minifigure Collection with officers, crooks, a dog and an ATV',
      width: 2321,
      height: 1449,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/7279-1/Police-Minifigure-Collection',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7279',
  },
  {
    number: '7285',
    name: 'Police Dog Unit',
    theme: 'City',
    releaseYear: 2011,
    pieces: 96,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'BrickEconomy',
        url: 'https://www.brickeconomy.com/set/7285-1/lego-city-police-dog-unit',
      },
    },
    catalogNote: 'Release year follows Brickset (2011). LEGO’s instruction archive lists 2010.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/7285-1/Police-Dog-Unit',
      },
    ],
    image: {
      src: '/static/images/lego/7285.jpg',
      alt: 'The LEGO City Police Dog Unit with a police vehicle, officer and dog',
      width: 1782,
      height: 1497,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/7285-1/Police-Dog-Unit',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/7285',
  },
  {
    number: '60140',
    name: 'Bulldozer Break-In',
    theme: 'City',
    releaseYear: 2017,
    pieces: 561,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/60140-1/Bulldozer-Break-In',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/60140-1/Bulldozer-Break-In',
      },
    ],
    image: {
      src: '/static/images/lego/60140.jpg',
      alt: 'The LEGO City Bulldozer Break-In bank scene with a bulldozer and police vehicles',
      width: 2337,
      height: 1329,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/60140-1/Bulldozer-Break-In',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/60140',
  },
  {
    number: '60309',
    name: 'Selfie Stunt Bike',
    theme: 'City',
    releaseYear: 2021,
    pieces: 14,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/60309-1/Selfie-Stunt-Bike',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/60309-1/Selfie-Stunt-Bike',
      },
    ],
    image: {
      src: '/static/images/lego/60309.jpg',
      alt: 'The LEGO City Selfie Stunt Bike with its rider, helmet and selfie camera',
      width: 2265,
      height: 1238,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/60309-1/Selfie-Stunt-Bike',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/60309',
  },
  {
    number: '76922',
    name: 'BMW M4 GT3 & BMW M Hybrid V8',
    theme: 'Speed Champions',
    releaseYear: 2024,
    pieces: 676,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/76922-1/BMW-M4-GT3-BMW-M-Hybrid-V8',
      },
    },
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/76922-1/BMW-M4-GT3-BMW-M-Hybrid-V8',
      },
    ],
    image: {
      src: '/static/images/lego/76922.jpg',
      alt: 'The LEGO Speed Champions BMW M4 GT3 and BMW M Hybrid V8 with two racing drivers',
      width: 2399,
      height: 1305,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/76922-1/BMW-M4-GT3-BMW-M-Hybrid-V8',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/76922',
  },
  {
    number: '60098',
    name: 'Heavy-Haul Train',
    theme: 'City',
    releaseYear: 2015,
    pieces: 984,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'LEGO · UK',
        url: 'https://www.lego.com/en-gb/product/heavy-haul-train-60098',
      },
    },
    sources: [
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-gb/product/heavy-haul-train-60098',
      },
    ],
    image: {
      src: '/static/images/lego/60098.jpg',
      alt: 'The LEGO City Heavy-Haul Train with its crane, helicopter, backhoe and railway tracks',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-gb/product/heavy-haul-train-60098',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/60098',
  },
  {
    number: '71020',
    catalogNumber: '71020-3',
    variant: 'Clock King',
    name: 'Clock King',
    theme: 'The LEGO Batman Movie Series 2',
    releaseYear: 2018,
    pieces: 7,
    availability: {
      lifecycle: 'retired',
      source: {
        label: 'Brickset',
        url: 'https://brickset.com/sets/71020-3/Clock-King',
      },
    },
    catalogNote: '71020 is the series number. Brickset lists Clock King as 71020-3.',
    sources: [
      {
        label: 'Brickset catalogue',
        url: 'https://brickset.com/sets/71020-3/Clock-King',
      },
    ],
    image: {
      src: '/static/images/lego/71020-clock-king.jpg',
      alt: 'Clock King with a clock-face head, blue-and-green costume, green cape and two clock hands',
      width: 609,
      height: 920,
      credit: 'Image: LEGO / Brickset',
      sourceUrl: 'https://brickset.com/sets/71020-3/Clock-King',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/71020',
  },
  {
    number: '42173',
    name: 'Koenigsegg Jesko Absolut Grey Hypercar',
    theme: 'Technic',
    releaseYear: 2024,
    pieces: 801,
    acquisition: {
      when: 'June 2025',
      how: 'A birthday gift',
      from: 'My friend Ye Zhou (周晔)',
    },
    notes:
      'Thank you, Ye Zhou (周晔), for the gift! LEGO has done a beautiful job of recreating the rear of this car.\n\nI’m embarrassed to admit that I still haven’t even opened the box. I keep telling myself I’ll build it when I have some free time. Maybe I really have drifted too far from the kid I used to be.',
    availability: {
      lifecycle: 'retiring-soon',
      source: {
        label: 'LEGO · US',
        url: 'https://www.lego.com/en-us/product/koenigsegg-jesko-absolut-grey-hypercar-42173',
      },
    },
    sources: [
      {
        label: 'LEGO product page',
        url: 'https://www.lego.com/en-us/product/koenigsegg-jesko-absolut-grey-hypercar-42173',
      },
    ],
    image: {
      src: '/static/images/lego/42173.jpg',
      alt: 'The grey LEGO Technic Koenigsegg Jesko Absolut hypercar with orange accents',
      width: 1500,
      height: 1125,
      credit: 'Image: LEGO',
      sourceUrl: 'https://www.lego.com/en-us/product/koenigsegg-jesko-absolut-grey-hypercar-42173',
    },
    instructionsUrl: 'https://www.lego.com/en-us/service/building-instructions/42173',
  },
]

export default legoSets
