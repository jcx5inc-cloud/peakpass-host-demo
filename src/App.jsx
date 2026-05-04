import React, { useMemo, useState } from "react";

const screens = {
  welcome: "Welcome",
  house: "House Info",
  tonight: "Tonight",
  perks: "Perks",
  concierge: "Ask Concierge",
  book: "Book Local",
};

const houseItems = [
  ["Wi-Fi", "Wildirishman1074", "Password: wildirishman1074"],
  [
    "Parking",
    "2 vehicles max",
    "First come, first served. Parking passes required.",
  ],
  [
    "Check-out",
    "10:00 AM",
    "Trash out, dishwasher started, thermostats set, doors/windows locked.",
  ],
  [
    "Emergency",
    "MVL + 911",
    "Call 911 for emergencies. MVL: 970-825-0480.",
  ],
];

const perks = [
  [
    "❄️",
    "Ski rental delivery",
    "Base Mountain Sports / Elite Ski Delivery",
    "Skip the rental shop line",
  ],
  [
    "🚙",
    "Airport shuttle options",
    "Summit Express / Epic Mountain Express",
    "DIA to Keystone transportation",
  ],
  [
    "🍽️",
    "Dinner recommendations",
    "Ski Tip Lodge / Keystone Ranch",
    "Owner-recommended local dining",
  ],
  [
    "🛒",
    "Grocery delivery",
    "Summit Home Services",
    "Arrive stocked and ready",
  ],
];

const services = [
  [
    "Restaurant Help",
    "Local picks",
    "Call Ski Tip, Snake River, Bighorn, Nowhere Pizza, or Haywood",
  ],
  [
    "Ski Rental Delivery",
    "Partner options",
    "Base Mountain Sports and Elite Ski Delivery",
  ],
  [
    "Airport Shuttle",
    "DIA to Keystone",
    "Summit Express, Epic, Fresh Tracks, Peak 1",
  ],
  [
    "Grocery Stocking",
    "Local service",
    "Summit Home Services / Breckenridge Grocery",
  ],
];

const suggestedQuestions = [
  "Help me call some restaurants",
  "What should we do tonight in Keystone?",
  "Where do we park?",
  "How do we get to the ski slopes?",
  "What is the Wi-Fi?",
  "What time is checkout?",
  "Where is the hot tub?",
  "What is the door code?",
  "Where do we take trash?",
  "Can we bring a pet?",
  "How do we use the fireplace?",
  "What should we do if we don’t ski?",
];

const restaurants = [
  {
    name: "Ski Tip Lodge",
    phone: "970-496-4950",
    vibe: "Special occasion / fine dining",
    bestFor:
      "Date night, anniversary, parents, or a polished mountain dinner.",
    note:
      "Reservations are typically required. Best for guests who want the most elevated Keystone dinner.",
    query: "Tell me about Ski Tip Lodge",
  },
  {
    name: "Snake River Saloon & Steakhouse",
    phone: "970-468-2788",
    vibe: "Classic Keystone steakhouse",
    bestFor:
      "Groups, hearty dinner, bar energy, happy hour, and a reliable mountain-town night out.",
    note:
      "Strong first call for groups because it is practical, local, and open 7 days according to their site.",
    query: "Tell me about Snake River Saloon",
  },
  {
    name: "Nowhere Pizza & Pub",
    phone: "970-485-6974",
    vibe: "Casual pizza by Keystone Lake",
    bestFor:
      "Families, kids, low-effort arrival night, casual group dinner, takeout-style plans.",
    note:
      "Best easy choice when the group does not want a formal dinner.",
    query: "Tell me about Nowhere Pizza",
  },
  {
    name: "Bighorn Bistro & Bar",
    phone: "970-496-3663",
    vibe: "Polished but easy",
    bestFor:
      "Couples, families, or guests who want a nicer dinner without going too formal.",
    note:
      "Located near Keystone Lodge/Lakeside area. Good middle-ground option.",
    query: "Tell me about Bighorn Bistro",
  },
  {
    name: "Haywood Cafe",
    phone: "970-262-9300",
    vibe: "Breakfast / casual lunch",
    bestFor:
      "Breakfast, takeout, bloody mary, pancakes, omelets, burgers, and casual daytime food.",
    note:
      "Best morning move before skiing or heading out.",
    query: "Tell me about Haywood Cafe",
  },
];

const quickCallActions = restaurants.map((r) => ({
  label: `Call ${r.name}`,
  href: `tel:${r.phone.replaceAll("-", "")}`,
}));

const conciergeKnowledgeBase = [
  {
    id: "restaurant-calls",
    title: "Restaurant calling list",
    keywords: [
      "call restaurant",
      "call restaurants",
      "help me call",
      "phone restaurants",
      "reservation",
      "reservations",
      "book dinner",
      "call dinner",
      "restaurant phone",
      "restaurant number",
      "numbers for restaurants",
      "make a reservation",
      "where should i call",
    ],
    answer:
      "Absolutely — here are the best Keystone restaurant calls based on what kind of night you want:\n\n• Ski Tip Lodge — 970-496-4950 — best for a special fine-dining night.\n• Snake River Saloon — 970-468-2788 — best first call for steakhouse comfort, groups, bar energy, and a classic Keystone night.\n• Nowhere Pizza & Pub — 970-485-6974 — best for casual pizza, families, takeout-style plans, or an easy arrival night.\n• Bighorn Bistro & Bar — 970-496-3663 — best for a polished but not overly formal dinner.\n• Haywood Cafe — 970-262-9300 — best for breakfast, brunch, or casual lunch.\n\nBest move: if it is tonight and you have a group, call Snake River first, then Nowhere Pizza as the easy backup. If you want the premium night, call Ski Tip Lodge first.",
    actions: [
      { label: "Call Snake River", href: "tel:9704682788" },
      { label: "Call Ski Tip Lodge", href: "tel:9704964950" },
      { label: "Call Nowhere Pizza", href: "tel:9704856974" },
      { label: "Build dinner plan", query: "Plan dinner tonight" },
    ],
  },
  {
    id: "dinner-tonight",
    title: "Dinner plan tonight",
    keywords: [
      "plan dinner",
      "dinner tonight",
      "where should we eat tonight",
      "eat tonight",
      "restaurant tonight",
      "tonight dinner",
      "best dinner",
      "food tonight",
      "where should we go for dinner",
    ],
    answer:
      "Best move tonight depends on your group:\n\n• Premium / special night: Ski Tip Lodge. Call 970-496-4950.\n• Classic Keystone dinner + drinks: Snake River Saloon. Call 970-468-2788.\n• Casual and easy: Nowhere Pizza & Pub. Call 970-485-6974.\n• Polished but not too formal: Bighorn Bistro & Bar. Call 970-496-3663.\n\nIf you are tired from travel or skiing, I would keep it simple: Snake River for a real Keystone night, or Nowhere Pizza if you want low effort.",
    actions: [
      { label: "Call Snake River", href: "tel:9704682788" },
      { label: "Call Nowhere Pizza", href: "tel:9704856974" },
      { label: "Ask for group dinner", query: "Where should a group go for dinner?" },
    ],
  },
  {
    id: "group-dinner",
    title: "Group dinner + drinks",
    keywords: [
      "group dinner",
      "8 guys",
      "guys",
      "bachelor",
      "large group",
      "big group",
      "drinks",
      "bar",
      "apres",
      "après",
      "night out",
      "boys trip",
      "where should 8",
    ],
    answer:
      "For a group, the goal is simple logistics: easy call, enough space, good food, and no over-complicated transportation.\n\nBest move:\n1. Call Snake River Saloon first — 970-468-2788. It is the strongest group dinner + drinks option.\n2. Use Nowhere Pizza as the casual backup — 970-485-6974.\n3. If the group wants an elevated dinner, try Ski Tip Lodge — 970-496-4950 — but it is more of a special-occasion plan.\n\nIf you are drinking, stay local or arrange a shuttle. Uber/Lyft can be limited in Keystone.",
    actions: [
      { label: "Call Snake River", href: "tel:9704682788" },
      { label: "Call Nowhere Pizza", href: "tel:9704856974" },
      { label: "Transportation options", query: "How should we get around tonight?" },
    ],
  },
  {
    id: "ski-tip",
    title: "Ski Tip Lodge",
    keywords: ["ski tip", "fine dining", "fancy dinner", "special dinner", "anniversary"],
    answer:
      "Ski Tip Lodge is the premium dinner move in Keystone — best for a special night, date night, parents, anniversary, or a more elevated mountain experience. It is known for a cozy historic setting and a seasonal multi-course style dinner.\n\nCall: 970-496-4950.\n\nBest move: call early. If they are booked, use Keystone Ranch when open, or pivot to Bighorn Bistro for a polished but easier backup.",
    actions: [
      { label: "Call Ski Tip Lodge", href: "tel:9704964950" },
      { label: "Show other dinner picks", query: "What are other dinner options?" },
    ],
  },
  {
    id: "snake-river",
    title: "Snake River Saloon",
    keywords: ["snake river", "steakhouse", "saloon", "steak", "happy hour"],
    answer:
      "Snake River Saloon & Steakhouse is the classic Keystone dinner-and-drinks move. Best for groups, steakhouse comfort, happy hour, and a real mountain-town night out.\n\nCall: 970-468-2788.\n\nBest move: if you have a larger group, call before you go. Their site lists the saloon/bar opening at 4 PM, happy hour 4–6 PM, and steakhouse dinner 5–9:30 PM.",
    actions: [
      { label: "Call Snake River", href: "tel:9704682788" },
      { label: "Plan group dinner", query: "Plan group dinner tonight" },
    ],
  },
  {
    id: "nowhere-pizza",
    title: "Nowhere Pizza & Pub",
    keywords: ["nowhere", "pizza", "pub", "casual", "takeout"],
    answer:
      "Nowhere Pizza & Pub is the easy casual move — best for families, kids, takeout-style plans, arrival night, or when nobody wants a formal dinner.\n\nCall: 970-485-6974.\n\nBest move: use it as your low-effort backup if nicer restaurants are full or the group wants something simple.",
    actions: [
      { label: "Call Nowhere Pizza", href: "tel:9704856974" },
      { label: "Show dinner picks", query: "Dinner recommendations" },
    ],
  },
  {
    id: "bighorn",
    title: "Bighorn Bistro & Bar",
    keywords: ["bighorn", "big horn", "bistro", "keystone lodge"],
    answer:
      "Bighorn Bistro & Bar is the polished but easy dinner option. It is a good middle ground if you want something nicer than pizza but not as formal as Ski Tip Lodge.\n\nCall: 970-496-3663.\n\nBest move: use Bighorn for couples, families, or a calmer dinner near the Keystone Lodge / Lakeside area.",
    actions: [
      { label: "Call Bighorn Bistro", href: "tel:9704963663" },
      { label: "Show dinner picks", query: "Dinner recommendations" },
    ],
  },
  {
    id: "haywood",
    title: "Haywood Cafe",
    keywords: ["haywood", "breakfast", "brunch", "bloody mary", "pancakes", "omelet", "omelette"],
    answer:
      "Haywood Cafe is the breakfast and casual lunch move. Best for omelets, pancakes, casual food, and a strong start before skiing or heading out.\n\nCall: 970-262-9300.\n\nBest move: go early on ski mornings. It is the owner-recommended breakfast pick.",
    actions: [
      { label: "Call Haywood Cafe", href: "tel:9702629300" },
      { label: "Plan ski morning", query: "What should we do before skiing?" },
    ],
  },
  {
    id: "wifi",
    title: "Wi-Fi",
    keywords: [
      "wifi",
      "wi-fi",
      "internet",
      "network",
      "password",
      "speed",
      "connect",
    ],
    answer:
      "The Wi-Fi network is Wildirishman1074 and the password is wildirishman1074. The guide lists the speed at 1200 Mbps.\n\nBest move: screenshot this so everyone in your group can connect without asking the host.",
    actions: ["Parking", "TV and streaming"],
  },
  {
    id: "parking",
    title: "Parking",
    keywords: [
      "parking",
      "park",
      "car",
      "vehicle",
      "passes",
      "parking pass",
      "rv",
      "trailer",
      "snow removal",
      "extra car",
    ],
    answer:
      "Parking is available for 2 vehicles max. There are no assigned spaces, so parking is first come, first served. Parking passes are required and must be displayed at all times.\n\nWhere passes may be: kitchen counter, hanging near the door, or on top of the fridge.\n\nImportant: trailers and RVs are not permitted. Extra cars can park overnight at the Peru Lift Lot for a nightly fee. Return parking passes at checkout to avoid replacement fees.",
    actions: ["Arrival directions", "Ski access"],
  },
  {
    id: "checkin",
    title: "Arrival directions",
    keywords: [
      "check in",
      "check-in",
      "arrival",
      "arrive",
      "directions",
      "where is it",
      "address",
      "building",
      "raven",
      "gps",
      "coordinates",
      "what time can we arrive",
    ],
    answer:
      "Check-in is after 4:00 PM unless early check-in was approved.\n\nAddress: 373 Wild Irishman Road, Unit 1074, Keystone, CO 80435.\n\nArrival flow:\n1. Enter Wild Irishman.\n2. Drive past the pool.\n3. Take a right into the parking lot.\n4. Follow the sidewalk left into the building labeled Raven.\n5. The unit is on the ground floor, 2nd door on the left.\n\nParking lot coordinates: 39.6042444, -105.9733106.",
    actions: ["Door code", "Parking"],
  },
  {
    id: "door-code",
    title: "Door code and access",
    keywords: [
      "door code",
      "code",
      "lock",
      "smart lock",
      "key",
      "access",
      "get in",
      "locked out",
      "lockbox",
      "front door",
    ],
    answer:
      "This unit uses a smart lock with a reservation-specific code. The code is not stored in this demo.\n\nBest move: the reservation holder should check the original Vacation Rental Guide link sent by text/email on arrival day.\n\nAfter entering the code, lift the door handle UP to open the door. If you are locked out, call Mountain Vacation Lodging at 970-825-0480. Do not guess lockbox codes.",
    actions: [
      { label: "Call MVL", href: "tel:9708250480" },
      "Arrival directions",
    ],
  },
  {
    id: "checkout",
    title: "Checkout checklist",
    keywords: [
      "checkout",
      "check out",
      "leave",
      "departure",
      "leaving",
      "what time do we leave",
      "late checkout",
      "checklist",
      "departure instructions",
    ],
    answer:
      "Checkout is by 10:00 AM unless late checkout was approved.\n\nBefore leaving:\n• Dispose of trash/recycling.\n• Load and run the dishwasher.\n• Clean and put away large dishes/pots/pans.\n• Remove perishable/open items from the fridge.\n• Turn off lights, electronics, appliances, oven/range, and fireplace.\n• Set thermostats to 60 in winter or 70 in spring/summer/fall.\n• Return parking passes, key cards, and extra keys where found.\n• Close and lock all doors/windows.\n• Leave used beds unmade.\n• Leave towels in a bathroom.\n• Take all belongings.",
    actions: ["Trash", "Late checkout"],
  },
  {
    id: "late-checkout",
    title: "Late checkout",
    keywords: [
      "late checkout",
      "late check out",
      "stay later",
      "extend checkout",
      "leave later",
    ],
    answer:
      "Late checkout requests need to be made within 48 hours of departure. Approval is not guaranteed, especially if another guest is checking in the same day.\n\nBest move: contact MVL as soon as possible and do not stay past 10:00 AM unless you receive approval.",
    actions: [
      { label: "Call MVL", href: "tel:9708250480" },
      "Checkout checklist",
    ],
  },
  {
    id: "trash",
    title: "Trash and recycling",
    keywords: [
      "trash",
      "garbage",
      "recycling",
      "dumpster",
      "bins",
      "bear",
      "wildlife trash",
      "where do we take trash",
    ],
    answer:
      "Trash and recycling are in the large trash building at the front of the Wild Irishman property. You need the red Keystone amenity key card to access it.\n\nDo not leave trash outside overnight or next to/on top of full bins because wildlife can be a real issue. If you cannot access the trash building, leave trash inside the unit for the cleaners.",
    actions: ["Checkout checklist", "Amenities"],
  },
  {
    id: "amenities",
    title: "Amenities",
    keywords: [
      "hot tub",
      "pool",
      "sauna",
      "grill",
      "grills",
      "fire pit",
      "clubhouse",
      "amenity",
      "amenities",
      "key card",
      "red keystone",
    ],
    answer:
      "Community amenities include a heated pool, hot tub, sauna, gas grills, picnic area, fire pit, and clubhouse with lounge/restrooms.\n\nThey are located in the middle of the Wild Irishman property. You need the red Keystone amenity key card from the unit. Typical amenity hours are 10 AM–10 PM, but availability and hours can vary by season or maintenance.",
    actions: ["Trash", "What should we do tonight?"],
  },
  {
    id: "ski-access",
    title: "Getting to the slopes",
    keywords: [
      "ski",
      "slopes",
      "snowboard",
      "lift",
      "mountain house",
      "river run",
      "peru lift",
      "bus",
      "summit stage",
      "yellow route",
      "keystone resort",
      "ski access",
    ],
    answer:
      "Best move: use the free Summit Stage bus stop in front of Wild Irishman on the Yellow Route. It connects you to Keystone areas like River Run, Mountain House, restaurants, and ski access.\n\nIf you drive, go early and park at Mountain House near the Peru Lift or the main lot at River Run Base. For ski mornings, earlier is always easier.",
    actions: ["Ski locker", "Ski rentals"],
  },
  {
    id: "ski-locker",
    title: "Ski locker",
    keywords: [
      "ski locker",
      "locker",
      "where do skis go",
      "snowboard storage",
      "ski storage",
      "gear storage",
      "boots",
    ],
    answer:
      "Use ski locker #1074. The ski locker key is located in the unit.\n\nPlease do not bring skis or snowboards into the condo. Also, remove shoes and boots when entering to help protect the floors.",
    actions: ["Ski access", "Ski rentals"],
  },
  {
    id: "ski-rentals",
    title: "Ski and snowboard rentals",
    keywords: [
      "ski rental",
      "ski rentals",
      "snowboard rental",
      "rentals",
      "boots",
      "helmet",
      "elite ski",
      "base mountain sports",
      "gear",
      "delivery",
    ],
    answer:
      "For ski and snowboard rentals, the guide lists Base Mountain Sports and Elite Ski Delivery as partner options.\n\nBest move: use delivery if possible. It is usually easiest for groups and families because you skip the rental shop line and can handle skis, boards, boots, and helmets in one order.",
    actions: ["Ski access", "Ski locker"],
  },
  {
    id: "transportation",
    title: "Transportation",
    keywords: [
      "airport",
      "shuttle",
      "transportation",
      "denver",
      "dia",
      "fresh tracks",
      "summit express",
      "epic mountain express",
      "cme",
      "peak 1",
      "ride",
      "uber",
      "lyft",
      "taxi",
      "get around",
      "driving",
    ],
    answer:
      "Airport shuttle options between DIA and Keystone include Summit Express, Epic Mountain Express / Colorado Mountain Express, Fresh Tracks Transportation, and Peak 1 Express.\n\nUber and Lyft can be limited in Keystone depending on season, day, and time. Best move: book airport transportation in advance, especially for groups or winter arrivals. Around Keystone, use the free Summit Stage when practical.",
    actions: ["Summit Stage bus", "Winter driving"],
  },
  {
    id: "local-bus",
    title: "Summit Stage bus",
    keywords: [
      "summit stage",
      "free bus",
      "bus stop",
      "yellow route",
      "local bus",
      "public transportation",
      "route",
    ],
    answer:
      "The free Summit Stage bus stop is in front of Wild Irishman Condominiums on the Yellow Route. It gives you easy access to Keystone slopes, River Run, Mountain House, restaurants, and resort amenities.\n\nThe guide notes service from 8 AM–6 PM, with on-call service from 6–10 PM. On-call number: 970-496-4200.",
    actions: [
      { label: "Call Summit Stage", href: "tel:9704964200" },
      "Ski access",
    ],
  },
  {
    id: "restaurants",
    title: "Dinner and restaurants",
    keywords: [
      "restaurant",
      "restaurants",
      "dinner",
      "eat",
      "food",
      "date night",
      "fine dining",
      "steak",
      "pizza",
      "breakfast",
      "lunch",
      "bistro",
      "saloon",
      "where should we eat",
    ],
    answer:
      "Here is the clean Keystone shortlist:\n\n• Ski Tip Lodge — premium special-occasion dinner — 970-496-4950.\n• Snake River Saloon — steakhouse, drinks, groups — 970-468-2788.\n• Nowhere Pizza — casual pizza / easy arrival night — 970-485-6974.\n• Bighorn Bistro — polished but not too formal — 970-496-3663.\n• Haywood Cafe — breakfast / casual lunch — 970-262-9300.\n\nBest move: for tonight, call Snake River first if you want a real dinner, Nowhere Pizza if you want easy, and Ski Tip Lodge if you want special.",
    actions: [
      { label: "Call Snake River", href: "tel:9704682788" },
      { label: "Call Ski Tip Lodge", href: "tel:9704964950" },
      "Plan dinner tonight",
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast",
    keywords: [
      "breakfast",
      "coffee",
      "brunch",
      "morning",
      "pancakes",
      "omelet",
      "omelette",
      "haywood",
    ],
    answer:
      "Best breakfast move: Haywood Cafe. It is the owner-recommended easy win for breakfast, omelets, pancakes, casual lunch, and a good start before skiing.\n\nCall: 970-262-9300.\n\nIf you want to stay in, the unit has a standard drip coffee maker. Guests provide their own coffee and filters, though starter supplies may sometimes be present.",
    actions: [
      { label: "Call Haywood Cafe", href: "tel:9702629300" },
      "Coffee setup",
    ],
  },
  {
    id: "coffee",
    title: "Coffee setup",
    keywords: ["coffee", "coffee maker", "filters", "drip", "keurig"],
    answer:
      "The unit has a standard drip coffee maker. Guests need to provide their own coffee and filters, though the unit may sometimes have starter supplies like coffee filters, sugar, spices, and basic kitchen items.\n\nBest move: check the kitchen first, then grab anything missing while you’re out.",
    actions: ["Groceries", "Kitchen"],
  },
  {
    id: "groceries",
    title: "Groceries and stocking",
    keywords: [
      "grocery",
      "groceries",
      "stock the fridge",
      "fridge",
      "food delivery",
      "supplies",
      "starter supplies",
      "paper towels",
      "toilet paper",
      "summit home services",
    ],
    answer:
      "The guide lists Summit Home Services & Breckenridge Grocery for home services and grocery delivery.\n\nThe unit comes with starter supplies, but they may not last the whole stay. Best move: make one early grocery run or use delivery for breakfast items, snacks, drinks, coffee, paper goods, and easy dinners.",
    actions: ["Kitchen", "Coffee setup"],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    keywords: [
      "kitchen",
      "cook",
      "cooking",
      "air fryer",
      "blender",
      "crockpot",
      "pots",
      "pans",
      "dishes",
      "baking",
      "food processor",
    ],
    answer:
      "The kitchen is well stocked. It includes a standard drip coffee maker, 2 crockpots, Ninja blender, food processor, air fryer, pots, pans, baking sheets, and dish set for 8+ people.\n\nGuests provide their own coffee and filters, though some starter supplies may be present but not guaranteed.",
    actions: ["Groceries", "Checkout dishes"],
  },
  {
    id: "fireplace",
    title: "Fireplace",
    keywords: [
      "fireplace",
      "fire",
      "wood",
      "flue",
      "embers",
      "smoke",
      "fire pit",
    ],
    answer:
      "The unit has a wood-burning fireplace. Before starting a fire, open the flue. You can check it by holding a lighter or lit match near the fireplace and watching for the flame to be pulled toward the chimney.\n\nDo not leave a fire unattended. Always use the built-in screens/doors. Close the flue only after embers are completely cooled. The community fire pit is near the pool and grills.",
    actions: ["Heating", "Fire safety"],
  },
  {
    id: "heating",
    title: "Heating and cooling",
    keywords: [
      "heat",
      "heating",
      "thermostat",
      "cold",
      "baseboard",
      "air conditioning",
      "ac",
      "cooling",
      "fan",
      "fans",
      "too hot",
      "too cold",
    ],
    answer:
      "The unit has heated baseboard flooring throughout, with individual thermostats in each room. Start the heat slowly, then increase if needed.\n\nKeep personal items and gear at least 5–6 inches away from baseboard heaters. There is no air conditioning, but there are ceiling fans in the master bedroom and portable fans in the bedrooms. In summer, close and lock windows/doors when leaving.",
    actions: ["Fireplace", "Checkout thermostat"],
  },
  {
    id: "laundry",
    title: "Laundry",
    keywords: [
      "laundry",
      "washer",
      "dryer",
      "detergent",
      "lint",
      "wash clothes",
      "linens",
      "towels",
    ],
    answer:
      "The unit has a private washer and dryer, and the community also has coin-operated laundry.\n\nDo not overload the machines, and empty the lint trap before and after each drying cycle. Laundry soap and fabric softener are provided by the owner.",
    actions: ["Checkout linens", "Starter supplies"],
  },
  {
    id: "baby-family",
    title: "Family and baby items",
    keywords: [
      "baby",
      "kids",
      "child",
      "children",
      "family",
      "pack and play",
      "pack n play",
      "booster",
      "mattress",
      "blow up mattress",
    ],
    answer:
      "The unit has helpful family items: a pack and play in the back guest bedroom, a booster seat, and a blow-up mattress with sheets.\n\nBest family move: get ski rentals delivered, use the free bus when practical, keep dinner early, and use Keystone Lake / snow tubing / scenic gondola as lower-stress activity options.",
    actions: ["Family activities", "Ski rentals"],
  },
  {
    id: "entertainment",
    title: "TV and entertainment",
    keywords: [
      "tv",
      "television",
      "cable",
      "youtube tv",
      "nfl",
      "sunday ticket",
      "streaming",
      "netflix",
      "alexa",
      "games",
      "books",
      "vinyl",
      "record player",
    ],
    answer:
      "Cable, YouTube TV, and NFL Sunday Ticket are provided. Each bedroom has a TV and remote.\n\nYou can sign into your own streaming accounts, but remember to sign out before departure. There are Alexa devices in the kitchen and master bedroom, plus games, books, and vinyl for the record player.",
    actions: ["Wi-Fi", "Checkout checklist"],
  },
  {
    id: "pets",
    title: "Pets",
    keywords: [
      "pet",
      "pets",
      "dog",
      "cat",
      "animal",
      "service animal",
      "emotional support",
      "esa",
    ],
    answer:
      "Pets are not permitted in the home or on the premises.\n\nBona fide service animals are permitted as required by law, but they must be disclosed properly so the required service animal form can be handled. Emotional support animals are not considered service animals and are not allowed unless a property is pet-friendly. This property is not pet-friendly.",
    actions: ["House rules", { label: "Call MVL", href: "tel:9708250480" }],
  },
  {
    id: "smoking",
    title: "Smoking",
    keywords: [
      "smoke",
      "smoking",
      "vape",
      "vaping",
      "marijuana",
      "weed",
      "candle",
      "incense",
      "balcony",
    ],
    answer:
      "This is a no-smoking unit. Smoking is prohibited inside and outside the unit, including tobacco, marijuana, vaping devices, incense, and candles.\n\nSmoking is not permitted on balconies, in common areas, or in units. Use only designated smoking areas if permitted by the property.",
    actions: ["House rules", "Fire safety"],
  },
  {
    id: "quiet-hours",
    title: "Quiet hours and parties",
    keywords: [
      "quiet hours",
      "party",
      "parties",
      "noise",
      "neighbors",
      "large gathering",
      "hoa",
      "rules",
      "house rules",
    ],
    answer:
      "No parties or large gatherings are allowed. Quiet hours begin after 10 PM, and community quiet hours are 10 PM–6 AM.\n\nMany neighbors may be local residents, so keep noise respectful, especially at night.",
    actions: ["Pets", "Smoking"],
  },
  {
    id: "activities",
    title: "Things to do in Keystone",
    keywords: [
      "things to do",
      "activities",
      "keystone",
      "tonight",
      "today",
      "tomorrow",
      "no ski",
      "don't ski",
      "dont ski",
      "non skier",
      "snow tubing",
      "ice skating",
      "gondola",
      "hiking",
      "golf",
      "horseback",
      "sleigh",
      "festival",
      "fly fishing",
      "bike",
      "mountain biking",
    ],
    answer:
      "Great Keystone options include skiing/snowboarding, night skiing, snow tubing at Adventure Point, ice skating at Keystone Lake or Dercum Square, scenic gondola rides, mountain biking at Keystone Bike Park, hiking like Loveland Pass Loop or Keystone Gulch Trail, Keystone Ranch Golf Course, horseback/wagon/sleigh rides, festivals, and fly fishing near the Snake River.\n\nBest no-ski day: Haywood Cafe breakfast → Keystone Lake / scenic walk → snow tubing or spa-style downtime → Snake River or Ski Tip dinner.",
    actions: ["No-ski day plan", "Dinner recommendations"],
  },
  {
    id: "no-ski-day",
    title: "No-ski day plan",
    keywords: [
      "no-ski day",
      "no ski day",
      "don't ski tomorrow",
      "dont ski tomorrow",
      "not skiing",
      "non skier",
      "rest day",
      "off day",
    ],
    answer:
      "Perfect no-ski Keystone day:\n\n1. Start with Haywood Cafe for breakfast.\n2. Walk Keystone Lake or explore River Run / Lakeside.\n3. Choose one anchor activity: snow tubing at Adventure Point, scenic gondola, ice skating, spa/recovery time, or a relaxed shopping/coffee loop.\n4. Keep dinner easy: Snake River for classic Keystone, Nowhere Pizza for casual, or Ski Tip Lodge for premium.\n\nBest move: do not over-schedule. Keystone is best when the day feels easy.",
    actions: ["Call Haywood Cafe", "Dinner recommendations"],
  },
  {
    id: "winter-driving",
    title: "Winter driving",
    keywords: [
      "winter driving",
      "snow driving",
      "4wd",
      "4 wheel drive",
      "awd",
      "tires",
      "road conditions",
      "cotip",
      "mountain pass",
      "driving",
    ],
    answer:
      "All-wheel drive or 4-wheel drive is not required to access the property, but it is strongly recommended for winter travel and mountain pass conditions.\n\nRoads in Keystone to/from the property are generally maintained, but your route may include a mountain pass. Best move: check COtrip before driving and make sure you have good tires.",
    actions: ["Parking", "Transportation"],
  },
  {
    id: "altitude",
    title: "High altitude",
    keywords: [
      "altitude",
      "sick",
      "altitude sickness",
      "headache",
      "dehydrated",
      "water",
      "dizzy",
      "high elevation",
    ],
    answer:
      "Keystone is high elevation, so take the first day seriously. Drink plenty of water, ease into alcohol and coffee, rest if needed, and start ski days early rather than pushing too hard late in the day.\n\nIf symptoms feel serious or urgent, seek medical help or call 911.",
    actions: ["Easy activities", "Emergency help"],
  },
  {
    id: "wildlife",
    title: "Wildlife",
    keywords: [
      "wildlife",
      "moose",
      "elk",
      "bear",
      "bears",
      "fox",
      "skunk",
      "porcupine",
      "mountain lion",
      "animals",
    ],
    answer:
      "You may see moose, elk, bears, foxes, skunks, porcupines, or even mountain lions. Always keep a safe distance and never feed wildlife.\n\nMoose are especially dangerous if approached. Do not leave food or trash in your car, lock car doors, and keep trash secured.",
    actions: ["Trash", "Safety"],
  },
  {
    id: "emergency",
    title: "Emergency help",
    keywords: [
      "emergency",
      "911",
      "urgent",
      "medical",
      "fire",
      "carbon monoxide",
      "smoke alarm",
      "alarm",
      "police",
      "local authorities",
      "maintenance",
      "help",
      "mvl",
      "contact",
    ],
    answer:
      "For medical, fire, carbon monoxide, or immediate safety emergencies, call 911 right away.\n\nFor property issues, lockouts, maintenance, or guest service help, contact Mountain Vacation Lodging at 970-825-0480. MVL also handles after-hours emergency vacation rental issues.",
    actions: [
      { label: "Call 911", href: "tel:911" },
      { label: "Call MVL", href: "tel:9708250480" },
    ],
  },
  {
    id: "workstations",
    title: "Workstations",
    keywords: [
      "work",
      "workstation",
      "desk",
      "monitor",
      "remote work",
      "working",
      "zoom",
    ],
    answer:
      "The unit includes multiple workstations with monitors, and the Wi-Fi speed is listed at 1200 Mbps.\n\nBest move: connect to Wildirishman1074, confirm your setup early, and keep devices charged because cold temperatures can drain batteries faster.",
    actions: ["Wi-Fi", "TV and entertainment"],
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[-/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getKeywordScore(message, keywords) {
  const lower = normalize(message);

  return keywords.reduce((score, keyword) => {
    const k = normalize(keyword);
    if (!k) return score;
    if (lower === k) return score + 20;
    if (lower.includes(k)) return score + Math.max(4, Math.min(14, k.length / 2));

    const words = k.split(" ").filter(Boolean);
    if (words.length > 1 && words.every((word) => lower.includes(word))) {
      return score + 8;
    }

    return score;
  }, 0);
}

function getConciergeResponse(message) {
  const lower = normalize(message);

  if (!lower.trim()) {
    return {
      title: "Peak Concierge",
      answer:
        "Ask me about Wi-Fi, parking, ski access, checkout, restaurants, amenities, transportation, groceries, house rules, or what to do in Keystone.",
      actions: ["Help me call some restaurants", "What should we do tonight?"],
      matched: "default",
    };
  }

  const ranked = conciergeKnowledgeBase
    .map((entry) => ({
      ...entry,
      score: getKeywordScore(lower, entry.keywords),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];

  if (best && best.score > 0) {
    return best;
  }

  if (
    lower.includes("call") ||
    lower.includes("phone") ||
    lower.includes("number")
  ) {
    return conciergeKnowledgeBase.find((x) => x.id === "restaurant-calls");
  }

  if (
    lower.includes("where") ||
    lower.includes("how") ||
    lower.includes("what") ||
    lower.includes("can") ||
    lower.includes("help")
  ) {
    return {
      title: "Best local move",
      answer:
        "I can help with the most common Wild Irishman 1074 questions: restaurant calls, Wi-Fi, parking, door access, ski access, amenities, dinner, transportation, checkout, trash, house rules, and Keystone activity planning.\n\nTry asking: “Help me call some restaurants,” “Where do we park?”, “What should we do tonight?”, or “How do we get to the ski slopes?”",
      actions: ["Help me call some restaurants", "What should we do tonight?"],
      matched: "help",
    };
  }

  return {
    title: "Peak Concierge",
    answer:
      "I can help with property details and local Keystone planning. Try asking about restaurants, Wi-Fi, parking, ski access, checkout, groceries, transportation, hot tub, ski rentals, or no-ski activities.",
    actions: ["Help me call some restaurants", "Show house info"],
    matched: "fallback",
  };
}

function renderAction(action, sendMessage) {
  if (typeof action === "string") {
    return (
      <button
        key={action}
        type="button"
        onClick={() => sendMessage(action)}
        style={{
          border: "1px solid rgba(103, 232, 249, 0.22)",
          borderRadius: 14,
          padding: "10px 12px",
          color: "#cffafe",
          background: "rgba(103, 232, 249, 0.09)",
          fontSize: 12,
          fontWeight: 900,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {action}
      </button>
    );
  }

  if (action?.href) {
    return (
      <a
        key={action.label}
        href={action.href}
        style={{
          border: "1px solid rgba(103, 232, 249, 0.22)",
          borderRadius: 14,
          padding: "10px 12px",
          color: "#020617",
          background: "linear-gradient(90deg, #67e8f9, #a78bfa)",
          fontSize: 12,
          fontWeight: 950,
          textAlign: "left",
          textDecoration: "none",
        }}
      >
        {action.label}
      </a>
    );
  }

  if (action?.query) {
    return (
      <button
        key={action.label}
        type="button"
        onClick={() => sendMessage(action.query)}
        style={{
          border: "1px solid rgba(103, 232, 249, 0.22)",
          borderRadius: 14,
          padding: "10px 12px",
          color: "#cffafe",
          background: "rgba(103, 232, 249, 0.09)",
          fontSize: 12,
          fontWeight: 900,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {action.label}
      </button>
    );
  }

  return null;
}

function Phone({ screen, setScreen }) {
  return (
    <div className="phone-shell">
      <div className="phone-screen">
        <div className="phone-top">
          <div className="phone-speaker" />
        </div>

        <div className="phone-content">
          <div className="phone-hero">
            <div className="eyebrow">Wild Irishman 1074</div>
            <div className="phone-title">Your Keystone Concierge</div>
            <p>
              House info, ski access, local recommendations, transportation,
              amenities, and booking help for this stay.
            </p>
          </div>

          <div className="phone-tabs">
            {Object.entries(screens).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setScreen(key)}
                className={cx("phone-tab", screen === key && "phone-tab-active")}
              >
                {label}
              </button>
            ))}
          </div>

          {screen === "welcome" && <WelcomeScreen setScreen={setScreen} />}
          {screen === "house" && <HouseScreen />}
          {screen === "tonight" && <TonightScreen setScreen={setScreen} />}
          {screen === "perks" && <PerksScreen />}
          {screen === "concierge" && <ConciergeScreen />}
          {screen === "book" && <BookScreen />}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ setScreen }) {
  const quickLinks = [
    ["house", "🏠", "House Info", "Wi-Fi, parking, checkout, rules"],
    ["tonight", "✨", "Plan Today", "Live Keystone recommendations"],
    ["perks", "⭐", "Guest Perks", "Ski rentals, shuttles, groceries"],
    ["concierge", "💬", "Ask a Local", "Get instant trip help"],
  ];

  return (
    <div>
      <div className="welcome-card">
        <div className="welcome-icon">🏔️</div>
        <h3>Welcome to Keystone.</h3>
        <p>
          This private guest concierge helps you settle in, get to the slopes,
          use the home confidently, and plan the best local experience.
        </p>
      </div>

      <div className="quick-grid">
        {quickLinks.map(([key, icon, title, subtitle]) => (
          <button
            key={key}
            onClick={() => setScreen(key)}
            className="quick-card"
          >
            <div className="quick-icon">{icon}</div>
            <div className="quick-title">{title}</div>
            <div className="quick-subtitle">{subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HouseScreen() {
  return (
    <div className="stack">
      <div className="screen-intro">
        <div className="eyebrow">Replaces the binder</div>
        <h3>Everything guests ask for.</h3>
      </div>

      {houseItems.map(([title, main, sub]) => (
        <div key={title} className="list-card">
          <div className="list-label">{title}</div>
          <div className="list-main">{main}</div>
          <div className="list-sub">{sub}</div>
        </div>
      ))}
    </div>
  );
}

function TonightScreen({ setScreen }) {
  const livePicks = [
    {
      time: "4:30 PM",
      title: "Easy Keystone arrival reset",
      detail:
        "Settle in, find the Red Keystone amenity card, and confirm parking passes.",
      badge: "First move",
      icon: "🔑",
    },
    {
      time: "5:30 PM",
      title: "Hot tub or Keystone Lake stroll",
      detail: "Use the community amenities or get outside without over-planning.",
      badge: "Low effort",
      icon: "♨️",
    },
    {
      time: "6:30 PM",
      title: "Owner-recommended dinner",
      detail:
        "Try Snake River Saloon for hearty comfort or Ski Tip Lodge for a special night.",
      badge: "Local pick",
      icon: "🍽️",
    },
    {
      time: "Tomorrow AM",
      title: "Beat the ski rush",
      detail:
        "Use the Wild Irishman bus stop or drive early to River Run/Mountain House.",
      badge: "Best ski move",
      icon: "⛷️",
    },
  ];

  return (
    <div className="tonight-premium">
      <div className="tonight-head">
        <div>
          <div className="eyebrow">Live today in Keystone</div>
          <h3>Today’s Best Moves</h3>
          <p>
            Property-aware recommendations, ski logistics, local dining, and a
            simple plan guests can actually follow.
          </p>
        </div>

        <div className="weather-chip">
          <div>🏔️</div>
          <span>Keystone ready</span>
        </div>
      </div>

      <div className="perfect-plan">
        <div className="plan-label">Perfect plan</div>
        <div className="plan-title">
          Settle in → confirm ski logistics → dinner → hot tub.
        </div>
        <p>
          Peak Concierge helps guests avoid arrival confusion and make smarter
          local decisions without texting the host for every detail.
        </p>
      </div>

      <div className="live-picks">
        {livePicks.map((pick) => (
          <div key={pick.title} className="live-pick-card">
            <div className="pick-icon">{pick.icon}</div>

            <div className="pick-main">
              <div className="pick-time">{pick.time}</div>
              <div className="pick-title">{pick.title}</div>
              <div className="pick-detail">{pick.detail}</div>
            </div>

            <div className="pick-badge">{pick.badge}</div>
          </div>
        ))}
      </div>

      <div className="tonight-actions">
        <button className="secondary-action" onClick={() => setScreen("concierge")}>
          Build my plan
        </button>
        <button className="primary-action" onClick={() => setScreen("concierge")}>
          Ask concierge
        </button>
      </div>
    </div>
  );
}

function PerksScreen() {
  return (
    <div className="stack">
      {perks.map(([icon, title, vendor, sub]) => (
        <div key={title} className="partner-card">
          <div className="partner-row">
            <div className="partner-icon">{icon}</div>
            <div>
              <div className="partner-title">{title}</div>
              <div className="partner-vendor">{vendor}</div>
              <div className="partner-sub">{sub}</div>
            </div>
          </div>
          <button className="gradient-button">View details</button>
        </div>
      ))}
    </div>
  );
}

function ConciergeScreen() {
  const openingMessage =
    "Hi — I’m your Peak Concierge for Wild Irishman 1074. Ask me to call restaurants, plan tonight, find ski access, explain parking, show Wi-Fi, or walk through checkout.";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: openingMessage,
      title: "Welcome",
      actions: [
        "Help me call some restaurants",
        "What should we do tonight in Keystone?",
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const popularTopics = useMemo(
    () => [
      "Restaurant calls",
      "Dinner tonight",
      "Parking",
      "Door code",
      "Checkout",
      "Hot tub",
      "Ski access",
      "Transportation",
    ],
    []
  );

  function sendMessage(customMessage) {
    const messageToSend = String(customMessage || input).trim();

    if (!messageToSend) return;

    const response = getConciergeResponse(messageToSend);

    setMessages((current) => [
      ...current,
      { role: "user", content: messageToSend },
      {
        role: "assistant",
        title: response.title,
        content: response.answer,
        actions: response.actions,
      },
    ]);

    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="concierge-live">
      <div className="concierge-live-header">
        <div>
          <div className="eyebrow">Private concierge demo</div>
          <h3>Ask Peak Concierge</h3>
        </div>
        <div className="live-dot">
          <span />
          Demo Mode
        </div>
      </div>

      <div className="suggested-grid">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            onClick={() => sendMessage(question)}
            className="suggested-question"
          >
            {question}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={cx(
              "chat-bubble",
              message.role === "user" ? "chat-user" : "chat-assistant"
            )}
          >
            {message.title && message.role === "assistant" && (
              <strong>{message.title}</strong>
            )}
            {message.title && message.role === "assistant" ? "\n" : ""}
            {message.content}

            {message.actions?.length > 0 && (
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {message.actions.map((action) => renderAction(action, sendMessage))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about restaurants, Wi-Fi, ski slopes, dinner..."
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>

      <div className="suggested-grid">
        {popularTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => sendMessage(topic)}
            className="suggested-question"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

function BookScreen() {
  return (
    <div className="stack">
      {services.map(([title, price, sub]) => (
        <div key={title} className="service-card">
          <div className="service-top">
            <div>
              <div className="service-title">{title}</div>
              <div className="service-sub">{sub}</div>
            </div>
            <div className="price-pill">{price}</div>
          </div>
          <button className="gradient-button">Request help</button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <main className="page">
      <header className="demo-header">
        <div>
          <div className="brand">🏔️ Peak Concierge</div>
          <div className="brand-subtitle">
            Interactive guest experience preview
          </div>
        </div>

        <div className="header-note">
          Demo property: Wild Irishman 1074
        </div>
      </header>

      <section className="demo-stage">
        <div className="stage-copy">
          <div className="demo-pill">Host preview</div>
          <h1>See what your guests would experience.</h1>
          <p>
            This is a sample Peak Concierge guest experience for Wild Irishman
            1074. Guests scan one QR code and get house info, ski logistics,
            local recommendations, transportation, amenities, and booking help —
            all branded to the property.
          </p>
        </div>

        <Phone screen={screen} setScreen={setScreen} />

        <div className="side-card">
          <div className="side-label">Why hosts will want this</div>
          <ul>
            <li>
              Turns a long rental guide into a polished, mobile-first guest
              experience.
            </li>
            <li>
              Answers Wi-Fi, parking, check-in, checkout, ski access, and
              amenity questions instantly.
            </li>
            <li>
              Gives guests local Keystone recommendations without a stale binder.
            </li>
            <li>
              Helps guests find trusted transportation, ski rentals, groceries,
              and dining options.
            </li>
            <li>
              Reduces repetitive host/property manager questions during the
              stay.
            </li>
            <li>
              Makes the property feel more premium from the moment guests arrive.
            </li>
          </ul>
        </div>
      </section>

      <footer className="demo-footer">
        <div>
          <strong>Want this customized for your property?</strong>
          <span>No app. No hardware. No Airbnb account access.</span>
        </div>
        <a href="mailto:hello@peakscreens.com">Request my property demo</a>
      </footer>
    </main>
  );
}
