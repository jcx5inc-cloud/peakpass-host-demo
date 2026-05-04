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
    "🌮",
    "Local food concierge",
    "Dinner, Mexican, après, breakfast",
    "Specific picks based on what guests ask for",
  ],
  [
    "❄️",
    "Ski rental delivery",
    "Base Mountain Sports / Elite Ski Delivery",
    "Skip the rental shop line",
  ],
  [
    "🚙",
    "Airport shuttle options",
    "Summit Express / Epic / Fresh Tracks / Peak 1",
    "DIA to Keystone transportation",
  ],
  [
    "🏔️",
    "Keystone activity planning",
    "Events, no-ski days, family plans",
    "Better than a stale binder",
  ],
];

const services = [
  [
    "Restaurant Help",
    "Tap-to-call",
    "Mexican, steakhouse, pizza, breakfast, après, fine dining",
  ],
  [
    "Things To Do",
    "Local planning",
    "No-ski day, family day, night skiing, gondola, events",
  ],
  [
    "Ski Logistics",
    "Guest support",
    "Bus, parking, rentals, ski locker, slope access",
  ],
  [
    "Arrival + Checkout",
    "House info",
    "Wi-Fi, smart lock, parking, trash, rules, amenities",
  ],
];

const restaurants = [
  {
    id: "dos-locos",
    name: "Dos Locos Mexican Restaurant & Cantina",
    shortName: "Dos Locos",
    phone: "970-262-9185",
    category: ["mexican", "margaritas", "casual", "kids", "group"],
    vibe: "Mexican food, margaritas, casual Keystone dinner",
    bestFor:
      "Mexican food, margaritas, casual groups, families, and a low-pressure dinner close to the condo.",
    caution:
      "They do not take reservations, so call first for current timing, then go early if your group is larger.",
    conciergeTake:
      "If someone asks for Mexican, this is the answer. It is the most direct Keystone Mexican recommendation.",
    searchTerms: [
      "mexican",
      "tacos",
      "margarita",
      "margaritas",
      "queso",
      "burrito",
      "chips",
      "salsa",
      "dos locos",
      "cantina",
    ],
  },
  {
    id: "snake-river",
    name: "Snake River Saloon & Steakhouse",
    shortName: "Snake River",
    phone: "970-468-2788",
    category: ["steakhouse", "bar", "apres", "group", "drinks", "classic"],
    vibe: "Classic Keystone steakhouse, bar, happy hour, live music energy",
    bestFor:
      "Groups, steakhouse comfort, drinks, happy hour, and a real mountain-town night.",
    caution:
      "Call ahead for groups. It is one of the strongest all-around Keystone dinner choices.",
    conciergeTake:
      "This is the best first call for most groups because it solves dinner and drinks in one move.",
    searchTerms: [
      "snake river",
      "steakhouse",
      "saloon",
      "steak",
      "happy hour",
      "bar",
      "drinks",
      "live music",
      "dancing",
    ],
  },
  {
    id: "ski-tip",
    name: "Ski Tip Lodge",
    shortName: "Ski Tip",
    phone: "970-496-4950",
    category: ["fine dining", "romantic", "date night", "premium"],
    vibe: "Historic, cozy, premium fine-dining experience",
    bestFor:
      "Date night, anniversary, parents, celebration, or the most elevated Keystone dinner.",
    caution:
      "This is not the casual backup. Call early and expect a more intentional dinner plan.",
    conciergeTake:
      "This is the premium mountain dinner. It makes the stay feel special.",
    searchTerms: [
      "ski tip",
      "ski tip lodge",
      "fine dining",
      "fancy",
      "special dinner",
      "anniversary",
      "romantic",
      "date night",
      "premium dinner",
    ],
  },
  {
    id: "keystone-ranch",
    name: "Keystone Ranch Restaurant",
    shortName: "Keystone Ranch",
    phone: "970-754-0005",
    category: ["fine dining", "steak", "special", "premium", "ranch"],
    vibe: "Rustic Colorado elegance, steakhouse-inspired, special occasion",
    bestFor:
      "Guests who want a polished Colorado dinner, steakhouse feel, or a more elevated night out.",
    caution:
      "It is not the most convenient walk-up option and may be seasonal. Call or check availability before committing.",
    conciergeTake:
      "A great premium alternative if Ski Tip is full or if guests want rustic Colorado over intimate fine dining.",
    searchTerms: [
      "keystone ranch",
      "ranch restaurant",
      "wild game",
      "rustic",
      "premium",
      "special occasion",
    ],
  },
  {
    id: "nowhere-pizza",
    name: "Nowhere Pizza & Pub",
    shortName: "Nowhere Pizza",
    phone: "970-485-6974",
    category: ["pizza", "casual", "kids", "family", "takeout"],
    vibe: "Casual pizza and pub food",
    bestFor:
      "Families, kids, arrival night, casual groups, easy dinner, or low-effort takeout-style plans.",
    caution:
      "Use this when the group is tired or wants easy, not when you want a special dinner.",
    conciergeTake:
      "The easy fallback. Great for guests who say, 'We just want food.'",
    searchTerms: [
      "nowhere",
      "nowhere pizza",
      "pizza",
      "pub",
      "casual",
      "takeout",
      "kids",
      "family food",
    ],
  },
  {
    id: "bighorn",
    name: "Bighorn Bistro & Bar",
    shortName: "Bighorn Bistro",
    phone: "970-496-3663",
    category: ["bistro", "polished", "cocktails", "family", "couples"],
    vibe: "Polished but not overly formal",
    bestFor:
      "Couples, families, calm dinner, cocktails, wine, and a nicer meal near Keystone Lodge.",
    caution:
      "Good middle-ground option. Call or check availability if timing matters.",
    conciergeTake:
      "Nicer than pizza, easier than a fine-dining plan.",
    searchTerms: [
      "bighorn",
      "big horn",
      "bistro",
      "bighorn bistro",
      "keystone lodge",
      "cocktails",
      "polished dinner",
    ],
  },
  {
    id: "montezuma",
    name: "Montezuma Roadhouse",
    shortName: "Montezuma Roadhouse",
    phone: "970-262-2202",
    category: ["river run", "family", "american", "apres", "gondola"],
    vibe: "Family-friendly contemporary eatery in River Run Village",
    bestFor:
      "Guests already in River Run, families, burgers, sandwiches, après-style food, and an easy gondola-area meal.",
    caution:
      "Good when you are already near River Run. Call first if you need exact wait times.",
    conciergeTake:
      "Strong River Run option because it is right in the village and easy to understand for guests.",
    searchTerms: [
      "montezuma",
      "montezuma roadhouse",
      "river run food",
      "river run restaurant",
      "american food",
      "burger",
      "gondola food",
    ],
  },
  {
    id: "kickapoo",
    name: "Kickapoo Tavern",
    shortName: "Kickapoo",
    phone: "970-468-0922",
    category: ["apres", "bar", "river run", "drinks", "burgers"],
    vibe: "River Run après-ski bar and grill",
    bestFor:
      "Après-ski, drinks, casual food, and being directly near the base area in River Run.",
    caution:
      "Check current status before going. Public listing recently showed it as temporarily closed.",
    conciergeTake:
      "Great conceptually for après, but guests should confirm it is open before making it the plan.",
    searchTerms: [
      "kickapoo",
      "kickapoo tavern",
      "apres",
      "après",
      "river run bar",
      "base bar",
      "bar and grill",
    ],
  },
  {
    id: "haywood",
    name: "Haywood Cafe",
    shortName: "Haywood Cafe",
    phone: "970-262-9300",
    category: ["breakfast", "brunch", "lunch", "casual"],
    vibe: "Breakfast, brunch, and casual lunch",
    bestFor:
      "Breakfast before skiing, omelets, pancakes, casual lunch, takeout, and easy morning food.",
    caution:
      "Go early on ski mornings so breakfast does not delay the whole day.",
    conciergeTake:
      "This is the breakfast answer.",
    searchTerms: [
      "haywood",
      "haywood cafe",
      "breakfast",
      "brunch",
      "omelet",
      "omelette",
      "pancakes",
      "coffee",
      "bloody mary",
    ],
  },
  {
    id: "inxpot",
    name: "Inxpot Coffeehouse",
    shortName: "Inxpot",
    phone: "970-262-3707",
    category: ["coffee", "breakfast", "lunch", "river run"],
    vibe: "Coffeehouse in River Run Village",
    bestFor:
      "Coffee, light breakfast, lunch, laptop time, and starting the day near the gondola.",
    caution:
      "Hours can vary seasonally; check before relying on it during mud season.",
    conciergeTake:
      "Best coffeehouse-style answer for River Run.",
    searchTerms: [
      "inxpot",
      "coffee",
      "coffeehouse",
      "espresso",
      "river run coffee",
      "cafe",
      "laptop",
    ],
  },
  {
    id: "crepe-stand",
    name: "The Crepe Stand",
    shortName: "Crepe Stand",
    phone: "970-262-3686",
    category: ["dessert", "snack", "kids", "river run"],
    vibe: "Dessert, snack, and casual crepes",
    bestFor:
      "Kids, dessert, walking snack, or an easy treat in River Run Village.",
    caution:
      "Best as a snack/treat, not a full dinner plan.",
    conciergeTake:
      "Great little add-on if guests are walking River Run.",
    searchTerms: [
      "crepe",
      "crepes",
      "dessert",
      "sweet",
      "snack",
      "treat",
      "kids dessert",
    ],
  },
];

const eventDatabase = [
  {
    name: "Keystone Concert Series: Float Like a Buffalo",
    date: "June 19, 2026",
    time: "4:00 PM – 6:00 PM",
    location: "River Run Village Events Plaza",
    bestFor: "Free live music, easy après-style evening, families, groups.",
  },
  {
    name: "Keystone Concert Series: Tiny Pockets",
    date: "June 26, 2026",
    time: "4:00 PM – 6:00 PM",
    location: "River Run Village Events Plaza",
    bestFor: "Free live music in River Run Village.",
  },
  {
    name: "Keystone Bacon & Bourbon Festival",
    date: "June 28–29, 2026",
    time: "1:00 PM – 5:00 PM",
    location: "Keystone / River Run Village",
    bestFor: "Adults, food festival, bourbon, live music, group trip energy.",
  },
  {
    name: "Crafternoon",
    date: "July 2, 2026",
    time: "2:00 PM – 5:00 PM",
    location: "Warren Station Center for the Arts",
    bestFor: "Creative afternoon activity, families, couples, low-key day.",
  },
];

const suggestedQuestions = [
  "Where can we get Mexican food?",
  "Help me call some restaurants",
  "Book dinner for me",
  "What events are happening?",
  "What should we do if we don’t ski?",
  "What should we do tonight in Keystone?",
  "Best bars or après nearby?",
  "Where should we get breakfast?",
  "How do we get to the ski slopes?",
  "What is the Wi-Fi?",
  "Where do we park?",
  "Where is the hot tub?",
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[-/]/g, " ")
    .replace(/[?!.,"()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, terms) {
  const lower = normalize(text);
  return terms.some((term) => lower.includes(normalize(term)));
}

function callAction(label, phone) {
  return {
    label,
    href: `tel:${phone.replaceAll("-", "")}`,
  };
}

function askAction(label, query) {
  return { label, query };
}

function restaurantByText(text) {
  const lower = normalize(text);
  return restaurants.find((r) =>
    r.searchTerms.some((term) => lower.includes(normalize(term)))
  );
}

function restaurantsByCategory(category) {
  return restaurants.filter((restaurant) => restaurant.category.includes(category));
}

function formatRestaurant(restaurant) {
  return `• ${restaurant.name} — ${restaurant.phone}
  ${restaurant.vibe}
  Best for: ${restaurant.bestFor}
  Concierge note: ${restaurant.conciergeTake}`;
}

function formatRestaurantList(list) {
  return list.map(formatRestaurant).join("\n\n");
}

function getRestaurantResponse(restaurant) {
  return {
    title: restaurant.name,
    answer:
      `${restaurant.name}\n\n` +
      `Call: ${restaurant.phone}\n\n` +
      `Vibe: ${restaurant.vibe}\n\n` +
      `Best for: ${restaurant.bestFor}\n\n` +
      `Concierge take: ${restaurant.conciergeTake}\n\n` +
      `Note: ${restaurant.caution}\n\n` +
      `Best move: call before leaving, especially if you have a larger group, want a reservation, or are going during peak dinner hours.`,
    actions: [
      callAction(`Call ${restaurant.shortName}`, restaurant.phone),
      askAction("Compare dinner options", "Compare dinner options"),
      askAction("Plan tonight", "Plan dinner tonight"),
    ],
  };
}

function restaurantCallActions(list = restaurants.slice(0, 4)) {
  return list.slice(0, 4).map((r) => callAction(`Call ${r.shortName}`, r.phone));
}

function getConciergeResponse(message) {
  const lower = normalize(message);
  const specificRestaurant = restaurantByText(lower);

  if (!lower) {
    return {
      title: "Peak Concierge",
      answer:
        "Ask me for restaurant calls, Mexican food, dinner plans, events, bars/après, Wi-Fi, parking, door access, ski logistics, checkout, amenities, transportation, groceries, or a no-ski day plan.",
      actions: [
        askAction("Mexican food", "Where can we get Mexican food?"),
        askAction("Events", "What events are happening?"),
        askAction("Dinner help", "Help me call some restaurants"),
      ],
    };
  }

  if (specificRestaurant) {
    return getRestaurantResponse(specificRestaurant);
  }

  if (
    hasAny(lower, [
      "mexican",
      "taco",
      "tacos",
      "burrito",
      "queso",
      "margarita",
      "margaritas",
      "chips",
      "salsa",
      "cantina",
    ])
  ) {
    const dosLocos = restaurants.find((r) => r.id === "dos-locos");
    return {
      title: "Mexican food near Keystone",
      answer:
        "Best move for Mexican: Dos Locos Mexican Restaurant & Cantina.\n\n" +
        "Call: 970-262-9185\n\n" +
        "Why this is the pick: it is the main Keystone Mexican/Cantina option, good for tacos, margaritas, casual groups, and an easy dinner close to Wild Irishman.\n\n" +
        "Important: Dos Locos says they do not take reservations, so call first for current wait/timing, then go early if you have a group.\n\n" +
        "Concierge move: if Dos Locos is slammed, pivot to Snake River for a classic dinner or Nowhere Pizza for the easy backup.",
      actions: [
        callAction("Call Dos Locos", dosLocos.phone),
        callAction("Call Snake River", "970-468-2788"),
        askAction("Easy dinner backup", "I want easy casual food"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "event",
      "events",
      "festival",
      "festivals",
      "happening",
      "live music",
      "concert",
      "bacon",
      "bourbon",
      "this weekend",
      "what is going on",
    ])
  ) {
    return {
      title: "Keystone events",
      answer:
        "Known upcoming Keystone events in the current demo database:\n\n" +
        eventDatabase
          .map(
            (event) =>
              `• ${event.name}\n  ${event.date}, ${event.time}\n  Location: ${event.location}\n  Best for: ${event.bestFor}`
          )
          .join("\n\n") +
        "\n\nConcierge note: events change seasonally, so for a live product this section would update automatically. For the demo, this shows hosts what a real event-aware concierge experience feels like.",
      actions: [
        askAction("Plan around events", "Plan a day around Keystone events"),
        askAction("No-ski day", "What should we do if we don’t ski?"),
        askAction("Dinner after event", "Where should we eat after an event?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "bars",
      "bar",
      "apres",
      "après",
      "drinks",
      "beer",
      "cocktails",
      "happy hour",
      "where should we drink",
      "nightlife",
      "live music",
    ])
  ) {
    const barList = [
      restaurants.find((r) => r.id === "snake-river"),
      restaurants.find((r) => r.id === "kickapoo"),
      restaurants.find((r) => r.id === "montezuma"),
      restaurants.find((r) => r.id === "bighorn"),
    ];
    return {
      title: "Bars and après",
      answer:
        "Best Keystone bar/après options:\n\n" +
        formatRestaurantList(barList) +
        "\n\nBest move: call Snake River first if you want dinner + drinks. If you are already in River Run, Montezuma Roadhouse is an easier village option. Kickapoo is a classic River Run après name, but check current status before going.",
      actions: [
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Montezuma", "970-262-2202"),
        callAction("Call Kickapoo", "970-468-0922"),
        askAction("Plan tonight", "What should we do tonight?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "call restaurant",
      "call restaurants",
      "help me call",
      "restaurant phone",
      "restaurant number",
      "numbers for restaurants",
      "phone number",
      "make reservation",
      "make a reservation",
      "reserve dinner",
      "reservation",
      "reservations",
    ])
  ) {
    return {
      title: "Restaurant calling list",
      answer:
        "Absolutely — here are the best Keystone restaurant calls based on what kind of night you want:\n\n" +
        formatRestaurantList([
          restaurants.find((r) => r.id === "dos-locos"),
          restaurants.find((r) => r.id === "snake-river"),
          restaurants.find((r) => r.id === "ski-tip"),
          restaurants.find((r) => r.id === "nowhere-pizza"),
          restaurants.find((r) => r.id === "bighorn"),
          restaurants.find((r) => r.id === "haywood"),
        ]) +
        "\n\nBest move: if it is tonight and you have a group, call Snake River first. If you want Mexican, call Dos Locos. If you want premium, call Ski Tip Lodge first.",
      actions: [
        callAction("Call Dos Locos", "970-262-9185"),
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Ski Tip Lodge", "970-496-4950"),
        callAction("Call Nowhere Pizza", "970-485-6974"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "book something",
      "book for me",
      "can you book",
      "make booking",
      "request booking",
      "reserve something",
      "book activity",
      "book local",
    ])
  ) {
    return {
      title: "Booking help",
      answer:
        "I can help start the right request. For this demo, I can’t finalize a live booking inside the chat, but this is exactly where Peak Concierge would turn the guest into a vendor lead.\n\nChoose what you want:\n\n• Dinner reservation — I’ll give you the best call list and script.\n• Mexican dinner — call Dos Locos first; they do not take reservations, so check wait/timing.\n• Ski rentals — use delivery if possible so you skip the rental shop line.\n• Airport shuttle — book in advance; Uber/Lyft can be limited.\n• Grocery stocking — best for late arrivals or families.\n• No-ski activity — tubing, skating, gondola, spa, events, or dinner plan.\n\nBest move: tell me what you want to book, how many people, and what time.",
      actions: [
        askAction("Book dinner", "Book dinner for me"),
        askAction("Mexican food", "Where can we get Mexican food?"),
        askAction("Book ski rentals", "Help me book ski rentals"),
        askAction("Book shuttle", "Help me book an airport shuttle"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "book dinner",
      "dinner reservation",
      "reserve dinner",
      "plan dinner",
      "dinner tonight",
      "where should we eat tonight",
      "eat tonight",
      "food tonight",
      "i want food",
      "hungry",
      "where should we eat",
      "dinner",
      "restaurants",
      "restaurant",
      "food",
      "lunch",
    ])
  ) {
    return {
      title: "Dinner concierge",
      answer:
        "Here is the clean Keystone dinner plan:\n\n" +
        "• Want Mexican: Dos Locos — 970-262-9185. They do not take reservations, so call first and go early.\n\n" +
        "• Want dinner + drinks: Snake River Saloon — 970-468-2788.\n\n" +
        "• Want premium: Ski Tip Lodge — 970-496-4950.\n\n" +
        "• Want casual and easy: Nowhere Pizza — 970-485-6974.\n\n" +
        "• Want polished but not too formal: Bighorn Bistro — 970-496-3663.\n\n" +
        "Best move: for most groups tonight, call Snake River first. For Mexican, call Dos Locos. If everyone is tired, choose Nowhere Pizza.",
      actions: [
        callAction("Call Dos Locos", "970-262-9185"),
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Ski Tip Lodge", "970-496-4950"),
        callAction("Call Nowhere Pizza", "970-485-6974"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "compare dinner",
      "compare restaurants",
      "which restaurant",
      "best restaurant",
      "nice dinner",
      "casual dinner",
      "family dinner",
      "date night",
      "group dinner",
      "large group",
      "8 guys",
      "bachelor",
      "guys trip",
    ])
  ) {
    return {
      title: "Best dinner choice",
      answer:
        "Here’s the concierge breakdown:\n\n" +
        "• Best Mexican: Dos Locos.\n\n" +
        "• Best overall for groups: Snake River Saloon.\n\n" +
        "• Best premium dinner: Ski Tip Lodge.\n\n" +
        "• Best casual backup: Nowhere Pizza.\n\n" +
        "• Best River Run village meal: Montezuma Roadhouse.\n\n" +
        "• Best polished middle ground: Bighorn Bistro.\n\n" +
        "• Best breakfast: Haywood Cafe or Inxpot if you are in River Run.\n\n" +
        "Best move: if you have more than 4 people, call before you go.",
      actions: [
        callAction("Call Dos Locos", "970-262-9185"),
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Ski Tip Lodge", "970-496-4950"),
        callAction("Call Montezuma", "970-262-2202"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "breakfast",
      "brunch",
      "coffee",
      "morning food",
      "pancakes",
      "omelet",
      "omelette",
    ])
  ) {
    return {
      title: "Breakfast and coffee",
      answer:
        "Best breakfast/coffee options:\n\n" +
        "• Haywood Cafe — 970-262-9300. Best for a real breakfast before skiing: omelets, pancakes, casual breakfast/lunch.\n\n" +
        "• Inxpot Coffeehouse — 970-262-3707. Best if you are in River Run and want coffee, breakfast, lunch, or a coffeehouse vibe.\n\n" +
        "• The unit has a standard drip coffee maker. Bring your own coffee and filters, though starter supplies may sometimes be present.\n\n" +
        "Best move: ski mornings get delayed fast. Go early or keep breakfast simple in the condo.",
      actions: [
        callAction("Call Haywood Cafe", "970-262-9300"),
        callAction("Call Inxpot", "970-262-3707"),
        askAction("Coffee setup", "What coffee maker is in the unit?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "dont ski",
      "don’t ski",
      "do not ski",
      "not skiing",
      "no ski",
      "no-ski",
      "non skier",
      "rest day",
      "off day",
      "what should we do if we dont ski",
      "what should we do if we don’t ski",
    ])
  ) {
    return {
      title: "No-ski day plan",
      answer:
        "Perfect no-ski Keystone day:\n\n" +
        "Morning: Haywood Cafe for breakfast or Inxpot if you want River Run coffee.\n\n" +
        "Midday: choose one anchor activity — snow tubing at Adventure Point, ice skating at Keystone Lake or Dercum Square, scenic gondola ride, River Run stroll, spa time at Alpenglow, shopping/coffee, or a low-key family activity.\n\n" +
        "Afternoon: hot tub back at Wild Irishman or a relaxed Keystone Lake walk.\n\n" +
        "Dinner: Dos Locos for Mexican, Snake River for classic Keystone, Nowhere Pizza for easy, or Ski Tip Lodge for premium.\n\n" +
        "Best move: do not over-schedule. Pick one main activity and one great dinner.",
      actions: [
        callAction("Call Dos Locos", "970-262-9185"),
        callAction("Call Snake River", "970-468-2788"),
        askAction("Events", "What events are happening?"),
        askAction("Family activities", "What can families do in Keystone?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "tonight",
      "what should we do tonight",
      "plan tonight",
      "things to do tonight",
      "best moves",
      "plans tonight",
      "activity tonight",
    ])
  ) {
    return {
      title: "Tonight’s best move",
      answer:
        "Tonight’s best plan from Wild Irishman 1074:\n\n" +
        "1. Settle in and confirm the essentials: Wi-Fi, parking passes, red amenity key card, and ski locker key.\n\n" +
        "2. Do a low-effort reset: hot tub, Keystone Lake stroll, or River Run walk.\n\n" +
        "3. Dinner:\n" +
        "   • Mexican: Dos Locos.\n" +
        "   • Classic dinner + drinks: Snake River.\n" +
        "   • Easy: Nowhere Pizza.\n" +
        "   • Premium: Ski Tip Lodge.\n\n" +
        "4. If skiing tomorrow, plan the morning now: Wild Irishman bus stop or early parking at Mountain House/River Run.\n\n" +
        "Best move: choose dinner now so you are not driving around guessing.",
      actions: [
        callAction("Call Dos Locos", "970-262-9185"),
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Nowhere Pizza", "970-485-6974"),
        askAction("Ski morning plan", "How do we get to the ski slopes?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "family",
      "kids",
      "children",
      "kid friendly",
      "kidtopia",
      "playground",
      "easy activity",
    ])
  ) {
    return {
      title: "Family-friendly Keystone plan",
      answer:
        "Best family-friendly options:\n\n" +
        "• Snow tubing at Adventure Point.\n" +
        "• Ice skating at Keystone Lake or Dercum Square.\n" +
        "• Scenic gondola ride.\n" +
        "• River Run Village stroll and snacks.\n" +
        "• The Crepe Stand for a treat.\n" +
        "• Hot tub/pool at Wild Irishman.\n" +
        "• Easy dinner: Nowhere Pizza or Dos Locos.\n\n" +
        "Best move: keep travel time low. Do one activity, one food stop, then reset at the condo.",
      actions: [
        callAction("Call Nowhere Pizza", "970-485-6974"),
        callAction("Call Dos Locos", "970-262-9185"),
        askAction("No-ski day", "What should we do if we don’t ski?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "summer",
      "bike",
      "mountain biking",
      "gondola",
      "hiking",
      "golf",
      "wagon",
      "horseback",
      "lake",
      "spa",
      "alpenglow",
    ])
  ) {
    return {
      title: "Keystone summer activities",
      answer:
        "Best Keystone summer moves:\n\n" +
        "• Mountain biking at Keystone Bike Park.\n" +
        "• Scenic gondola ride.\n" +
        "• Hiking around Keystone / Loveland Pass / Keystone Gulch.\n" +
        "• Golf at Keystone Ranch or River Course.\n" +
        "• Lakeside activities around Keystone Lake.\n" +
        "• Horseback or wagon rides through Keystone Stables.\n" +
        "• River Run Village activities.\n" +
        "• Alpenglow Spa for a recovery/luxury day.\n\n" +
        "Best move: pick one mountain activity, then anchor the day with dinner in Keystone.",
      actions: [
        askAction("Events", "What events are happening?"),
        askAction("Dinner", "Where should we eat after activities?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "things to do",
      "activities",
      "keystone",
      "activity",
      "snow tubing",
      "ice skating",
      "gondola",
      "hiking",
      "golf",
      "horseback",
      "sleigh",
      "festival",
      "fly fishing",
      "mountain biking",
    ])
  ) {
    return {
      title: "Things to do in Keystone",
      answer:
        "Great Keystone options:\n\n" +
        "• Skiing and snowboarding at Keystone Resort.\n" +
        "• Night skiing.\n" +
        "• Snow tubing at Adventure Point.\n" +
        "• Ice skating at Keystone Lake or Dercum Square.\n" +
        "• Scenic gondola ride.\n" +
        "• Mountain biking at Keystone Bike Park.\n" +
        "• Hiking like Loveland Pass Loop or Keystone Gulch Trail.\n" +
        "• Golf at Keystone Ranch or River Course.\n" +
        "• Horseback riding, wagon rides, or sleigh rides.\n" +
        "• River Run Village activities.\n" +
        "• Events like concerts and festivals.\n\n" +
        "Best move: tell me your group type — family, couple, guys trip, no-ski day, or summer trip — and I’ll narrow it down.",
      actions: [
        askAction("No-ski day", "What should we do if we don’t ski?"),
        askAction("Events", "What events are happening?"),
        askAction("Family plan", "What can families do in Keystone?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "ski slopes",
      "get to slopes",
      "ski access",
      "keystone resort",
      "river run",
      "mountain house",
      "peru lift",
      "yellow route",
      "summit stage",
      "free bus",
      "bus stop",
      "ski tomorrow",
      "snowboard",
    ])
  ) {
    return {
      title: "Ski access",
      answer:
        "Best move: use the free Summit Stage bus stop in front of Wild Irishman on the Yellow Route. It connects to Keystone areas like River Run, Mountain House, restaurants, and ski access.\n\nIf you drive, leave early and park at Mountain House near the Peru Lift or the main River Run lot.\n\nFor the smoothest morning: use ski locker #1074, keep gear out of the condo, and plan transportation before everyone is dressed in ski gear.",
      actions: [
        askAction("Ski locker", "Where is the ski locker?"),
        askAction("Ski rentals", "Help me book ski rentals"),
        askAction("Summit Stage", "Tell me about the Summit Stage bus"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "ski rental",
      "ski rentals",
      "snowboard rental",
      "rentals",
      "boots",
      "helmet",
      "gear",
      "delivery",
      "elite ski",
      "base mountain sports",
    ])
  ) {
    return {
      title: "Ski rental delivery",
      answer:
        "For ski and snowboard rentals, the guide lists Base Mountain Sports and Elite Ski Delivery.\n\nBest move: choose delivery if available. It saves the group from waiting in a rental shop and makes the first ski morning much easier.\n\nWhat to have ready: number of guests, ski/snowboard preference, height, weight, shoe size, ability level, and preferred delivery time.",
      actions: [
        askAction("Ski access", "How do we get to the ski slopes?"),
        askAction("Ski locker", "Where is the ski locker?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "ski locker",
      "locker",
      "where do skis go",
      "ski storage",
      "snowboard storage",
      "boots",
    ])
  ) {
    return {
      title: "Ski locker",
      answer:
        "Use ski locker #1074. The ski locker key is located in the unit.\n\nPlease do not bring skis or snowboards into the condo. Also, remove shoes and boots when entering to help protect the floors.\n\nBest move: put gear away tonight so the morning is easier.",
      actions: [
        askAction("Ski access", "How do we get to the ski slopes?"),
        askAction("Ski rentals", "Help me book ski rentals"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "wifi",
      "wi fi",
      "internet",
      "network",
      "password",
      "connect",
      "speed",
    ])
  ) {
    return {
      title: "Wi-Fi",
      answer:
        "Wi-Fi network: Wildirishman1074\nPassword: wildirishman1074\n\nThe guide lists speed at 1200 Mbps.\n\nBest move: screenshot this and send it to your group so nobody has to ask again.",
      actions: [
        askAction("TV and streaming", "How do we use the TV?"),
        askAction("Workstations", "Is there a place to work?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "door code",
      "code",
      "smart lock",
      "lock",
      "locked out",
      "get in",
      "access",
      "lockbox",
      "key",
    ])
  ) {
    return {
      title: "Door code and access",
      answer:
        "This unit uses a smart lock with a reservation-specific code. The code is not stored in this demo.\n\nThe reservation holder should check the original Vacation Rental Guide link sent by text/email on arrival day.\n\nAfter entering the code, lift the door handle UP to open the door.\n\nIf you are locked out, call Mountain Vacation Lodging at 970-825-0480. Do not guess lockbox codes.",
      actions: [
        callAction("Call MVL", "970-825-0480"),
        askAction("Arrival directions", "How do we find the unit?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "check in",
      "checkin",
      "arrival",
      "directions",
      "address",
      "where is it",
      "raven",
      "gps",
      "coordinates",
      "find the unit",
      "how do we find",
    ])
  ) {
    return {
      title: "Arrival directions",
      answer:
        "Check-in is after 4:00 PM unless early check-in was approved.\n\nAddress: 373 Wild Irishman Road, Unit 1074, Keystone, CO 80435.\n\nArrival flow:\n1. Enter Wild Irishman.\n2. Drive past the pool.\n3. Take a right into the parking lot.\n4. Follow the sidewalk left into the building labeled Raven.\n5. The unit is on the ground floor, 2nd door on the left.\n\nParking lot coordinates: 39.6042444, -105.9733106.",
      actions: [
        askAction("Parking", "Where do we park?"),
        askAction("Door code", "What is the door code?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "parking",
      "park",
      "car",
      "vehicle",
      "parking pass",
      "passes",
      "extra car",
      "rv",
      "trailer",
      "snow removal",
    ])
  ) {
    return {
      title: "Parking",
      answer:
        "Parking is available for 2 vehicles max. There are no assigned spaces, so parking is first come, first served.\n\nParking passes are required and must be displayed at all times. They are usually on the kitchen counter, hanging near the door, or on top of the fridge.\n\nTrailers and RVs are not permitted. Extra cars can park overnight at the Peru Lift Lot for a nightly fee.\n\nReturn parking passes at checkout to avoid replacement fees.",
      actions: [
        askAction("Arrival directions", "How do we find the unit?"),
        askAction("Ski access", "How do we get to the ski slopes?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "hot tub",
      "pool",
      "sauna",
      "grill",
      "grills",
      "fire pit",
      "clubhouse",
      "amenities",
      "amenity",
      "red keystone",
      "key card",
    ])
  ) {
    return {
      title: "Amenities",
      answer:
        "Community amenities include a heated pool, hot tub, sauna, gas grills, picnic area, fire pit, and clubhouse with lounge/restrooms.\n\nThey are located in the middle of the Wild Irishman property. You need the red Keystone amenity key card from the unit.\n\nTypical amenity hours are 10 AM–10 PM, but hours and availability can vary by season or maintenance.",
      actions: [
        askAction("Trash", "Where do we take trash?"),
        askAction("Tonight plan", "What should we do tonight?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "trash",
      "garbage",
      "recycling",
      "dumpster",
      "bins",
      "where do we take trash",
      "bear",
      "wildlife trash",
    ])
  ) {
    return {
      title: "Trash and recycling",
      answer:
        "Trash and recycling are in the large trash building at the front of the Wild Irishman property. You need the red Keystone amenity key card to access it.\n\nDo not leave trash outside overnight or next to/on top of full bins because wildlife can be a real issue.\n\nIf you cannot access the trash building, leave trash inside the unit for the cleaners.",
      actions: [
        askAction("Checkout", "What time is checkout?"),
        askAction("Amenities", "Where is the amenity key?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "checkout",
      "check out",
      "departure",
      "leaving",
      "leave",
      "what time do we leave",
      "departure instructions",
      "checklist",
    ])
  ) {
    return {
      title: "Checkout checklist",
      answer:
        "Checkout is by 10:00 AM unless late checkout was approved.\n\nBefore leaving:\n• Dispose of trash/recycling.\n• Load and run the dishwasher.\n• Clean and put away large dishes/pots/pans.\n• Remove perishable/open items from the fridge.\n• Turn off lights, electronics, appliances, oven/range, and fireplace.\n• Set thermostats to 60 in winter or 70 in spring/summer/fall.\n• Return parking passes, key cards, and extra keys where found.\n• Close and lock all doors/windows.\n• Leave used beds unmade.\n• Leave towels in a bathroom.\n• Take all belongings.",
      actions: [
        askAction("Trash", "Where do we take trash?"),
        askAction("Late checkout", "Can we get late checkout?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "late checkout",
      "late check out",
      "stay later",
      "leave later",
      "extend checkout",
    ])
  ) {
    return {
      title: "Late checkout",
      answer:
        "Late checkout requests must be made within 48 hours of departure. Approval is not guaranteed, especially if another guest is checking in the same day.\n\nBest move: contact MVL as soon as possible and do not stay past 10:00 AM unless you receive approval.",
      actions: [
        callAction("Call MVL", "970-825-0480"),
        askAction("Checkout checklist", "What do we need to do before checkout?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "airport",
      "shuttle",
      "transportation",
      "denver",
      "dia",
      "fresh tracks",
      "summit express",
      "epic mountain express",
      "peak 1",
      "uber",
      "lyft",
      "taxi",
      "get around",
    ])
  ) {
    return {
      title: "Transportation",
      answer:
        "Airport shuttle options between DIA and Keystone include Summit Express, Epic Mountain Express / Colorado Mountain Express, Fresh Tracks Transportation, and Peak 1 Express.\n\nUber and Lyft can be limited in Keystone depending on season, day, and time.\n\nBest move: book airport transportation in advance, especially for groups or winter arrivals. Around Keystone, use the free Summit Stage when practical.",
      actions: [
        askAction("Summit Stage", "Tell me about the Summit Stage bus"),
        askAction("Winter driving", "Do we need 4WD?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "summit stage",
      "free bus",
      "bus stop",
      "yellow route",
      "local bus",
      "public transportation",
    ])
  ) {
    return {
      title: "Summit Stage bus",
      answer:
        "The free Summit Stage bus stop is in front of Wild Irishman Condominiums on the Yellow Route. It gives you easy access to Keystone slopes, River Run, Mountain House, restaurants, and resort amenities.\n\nThe guide notes service from 8 AM–6 PM, with on-call service from 6–10 PM.\n\nOn-call number: 970-496-4200.",
      actions: [
        callAction("Call Summit Stage", "970-496-4200"),
        askAction("Ski access", "How do we get to the ski slopes?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "grocery",
      "groceries",
      "stock the fridge",
      "fridge",
      "food delivery",
      "supplies",
      "starter supplies",
      "paper towels",
      "toilet paper",
    ])
  ) {
    return {
      title: "Groceries and supplies",
      answer:
        "The guide lists Summit Home Services & Breckenridge Grocery for home services and grocery delivery.\n\nThe unit comes with starter supplies, but they may not last the whole stay. Best move: make one early grocery run or use delivery for breakfast items, snacks, drinks, coffee, paper goods, and easy dinners.",
      actions: [
        askAction("Kitchen", "What is in the kitchen?"),
        askAction("Coffee", "What coffee maker is there?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "coffee maker",
      "filters",
      "drip",
      "keurig",
      "coffee in unit",
    ])
  ) {
    return {
      title: "Coffee setup",
      answer:
        "The unit has a standard drip coffee maker. Guests need to provide their own coffee and filters, though the unit may sometimes have starter supplies like coffee filters, sugar, spices, and basic kitchen items.\n\nFor coffee out, use Inxpot in River Run if you’re heading that direction.",
      actions: [
        callAction("Call Inxpot", "970-262-3707"),
        askAction("Breakfast", "Where should we get breakfast?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "kitchen",
      "cook",
      "cooking",
      "air fryer",
      "blender",
      "crockpot",
      "pots",
      "pans",
      "dishes",
      "food processor",
    ])
  ) {
    return {
      title: "Kitchen",
      answer:
        "The kitchen is well stocked. It includes a standard drip coffee maker, 2 crockpots, Ninja blender, food processor, air fryer, pots, pans, baking sheets, and dish set for 8+ people.\n\nGuests provide their own coffee and filters, though some starter supplies may be present but not guaranteed.",
      actions: [
        askAction("Groceries", "Can we get groceries delivered?"),
        askAction("Checkout dishes", "What do we do with dishes at checkout?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "fireplace",
      "fire",
      "wood",
      "flue",
      "embers",
      "smoke",
      "fire pit",
    ])
  ) {
    return {
      title: "Fireplace",
      answer:
        "The unit has a wood-burning fireplace. Before starting a fire, open the flue. You can check it by holding a lighter or lit match near the fireplace and watching for the flame to be pulled toward the chimney.\n\nDo not leave a fire unattended. Always use the built-in screens/doors. Close the flue only after embers are completely cooled.\n\nThe community fire pit is near the pool and grills.",
      actions: [
        askAction("Heating", "How does the heat work?"),
        askAction("Fire safety", "Any fire safety rules?"),
      ],
    };
  }

  if (
    hasAny(lower, [
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
    ])
  ) {
    return {
      title: "Heating and cooling",
      answer:
        "The unit has heated baseboard flooring throughout, with individual thermostats in each room. Start the heat slowly, then increase if needed.\n\nKeep personal items and gear at least 5–6 inches away from baseboard heaters.\n\nThere is no air conditioning, but there are ceiling fans in the master bedroom and portable fans in the bedrooms. In summer, close and lock windows/doors when leaving.",
      actions: [
        askAction("Fireplace", "How do we use the fireplace?"),
        askAction("Checkout thermostat", "What do we set thermostats to at checkout?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "pet",
      "pets",
      "dog",
      "cat",
      "animal",
      "service animal",
      "emotional support",
      "esa",
    ])
  ) {
    return {
      title: "Pet policy",
      answer:
        "Pets are not permitted in the home or on the premises.\n\nBona fide service animals are permitted as required by law, but they must be disclosed properly so the required service animal form can be handled.\n\nEmotional support animals are not considered service animals and are not allowed unless a property is pet-friendly. This property is not pet-friendly.",
      actions: [
        callAction("Call MVL", "970-825-0480"),
        askAction("House rules", "What are the house rules?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "smoke",
      "smoking",
      "vape",
      "vaping",
      "marijuana",
      "weed",
      "candle",
      "incense",
      "balcony",
    ])
  ) {
    return {
      title: "Smoking policy",
      answer:
        "This is a no-smoking unit. Smoking is prohibited inside and outside the unit, including tobacco, marijuana, vaping devices, incense, and candles.\n\nSmoking is not permitted on balconies, in common areas, or in units. Use only designated smoking areas if permitted by the property.",
      actions: [
        askAction("House rules", "What are the house rules?"),
        askAction("Fire safety", "Any fire safety rules?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "quiet hours",
      "party",
      "parties",
      "noise",
      "neighbors",
      "large gathering",
      "hoa",
      "rules",
      "house rules",
    ])
  ) {
    return {
      title: "House rules",
      answer:
        "Key rules:\n\n• No parties or large gatherings.\n• Quiet hours begin after 10 PM.\n• Community quiet hours are 10 PM–6 AM.\n• No smoking or vaping inside/outside the unit.\n• No pets, except properly disclosed bona fide service animals.\n• Remove shoes and boots when entering.\n• Be respectful of neighbors — many may be local residents.",
      actions: [
        askAction("Pet policy", "Can we bring a pet?"),
        askAction("Smoking policy", "Can we smoke?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "winter driving",
      "snow driving",
      "4wd",
      "4 wheel drive",
      "awd",
      "tires",
      "road conditions",
      "cotip",
      "mountain pass",
    ])
  ) {
    return {
      title: "Winter driving",
      answer:
        "All-wheel drive or 4-wheel drive is not required to access the property, but it is strongly recommended for winter travel and mountain pass conditions.\n\nRoads in Keystone to/from the property are generally maintained, but your route may include a mountain pass.\n\nBest move: check COtrip before driving and make sure your vehicle has good tires.",
      actions: [
        askAction("Parking", "Where do we park?"),
        askAction("Transportation", "Should we use a shuttle?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "altitude",
      "sick",
      "altitude sickness",
      "headache",
      "dehydrated",
      "water",
      "dizzy",
      "high elevation",
    ])
  ) {
    return {
      title: "High altitude",
      answer:
        "Keystone is high elevation, so take the first day seriously. Drink plenty of water, ease into alcohol and coffee, rest if needed, and start ski days early rather than pushing too hard late in the day.\n\nIf symptoms feel serious or urgent, seek medical help or call 911.",
      actions: [
        askAction("Easy activities", "What should we do if we don’t ski?"),
        callAction("Call 911", "911"),
      ],
    };
  }

  if (
    hasAny(lower, [
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
    ])
  ) {
    return {
      title: "Wildlife safety",
      answer:
        "You may see moose, elk, bears, foxes, skunks, porcupines, or even mountain lions. Always keep a safe distance and never feed wildlife.\n\nMoose are especially dangerous if approached. Do not leave food or trash in your car, lock car doors, and keep trash secured.",
      actions: [
        askAction("Trash info", "Where do we take trash?"),
        askAction("Emergency", "Who do we call in an emergency?"),
      ],
    };
  }

  if (
    hasAny(lower, [
      "emergency",
      "911",
      "urgent",
      "medical",
      "fire",
      "carbon monoxide",
      "smoke alarm",
      "alarm",
      "police",
      "maintenance",
      "help",
      "mvl",
      "contact",
    ])
  ) {
    return {
      title: "Emergency help",
      answer:
        "For medical, fire, carbon monoxide, or immediate safety emergencies, call 911 right away.\n\nFor property issues, lockouts, maintenance, or guest service help, contact Mountain Vacation Lodging at 970-825-0480. MVL also handles after-hours emergency vacation rental issues.",
      actions: [
        callAction("Call 911", "911"),
        callAction("Call MVL", "970-825-0480"),
      ],
    };
  }

  return {
    title: "Peak Concierge",
    answer:
      "I can help with restaurant calls, Mexican food, dinner plans, Keystone events, bars/après, Wi-Fi, parking, door access, ski logistics, checkout, amenities, transportation, groceries, house rules, or no-ski activities.\n\nTry asking:\n• Where can we get Mexican food?\n• What events are happening?\n• Best bars nearby?\n• Book dinner for me\n• What should we do if we don’t ski?\n• How do we get to the ski slopes?",
    actions: [
      askAction("Mexican food", "Where can we get Mexican food?"),
      askAction("Events", "What events are happening?"),
      askAction("Dinner help", "Help me call some restaurants"),
    ],
  };
}

const actionButtonStyle = {
  border: "1px solid rgba(103, 232, 249, 0.22)",
  borderRadius: 14,
  padding: "10px 12px",
  color: "#cffafe",
  background: "rgba(103, 232, 249, 0.09)",
  fontSize: 12,
  fontWeight: 900,
  textAlign: "left",
  cursor: "pointer",
};

const callButtonStyle = {
  border: "1px solid rgba(103, 232, 249, 0.22)",
  borderRadius: 14,
  padding: "10px 12px",
  color: "#020617",
  background: "linear-gradient(90deg, #67e8f9, #a78bfa)",
  fontSize: 12,
  fontWeight: 950,
  textAlign: "left",
  textDecoration: "none",
};

function renderAction(action, sendMessage) {
  if (typeof action === "string") {
    return (
      <button
        key={action}
        type="button"
        onClick={() => sendMessage(action)}
        style={actionButtonStyle}
      >
        {action}
      </button>
    );
  }

  if (action?.href) {
    return (
      <a key={action.label} href={action.href} style={callButtonStyle}>
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
        style={actionButtonStyle}
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
              amenities, events, restaurants, and booking help for this stay.
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
          {screen === "book" && <BookScreen setScreen={setScreen} />}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ setScreen }) {
  const quickLinks = [
    ["house", "🏠", "House Info", "Wi-Fi, parking, checkout, rules"],
    ["tonight", "✨", "Plan Today", "Events, dining, activities"],
    ["perks", "⭐", "Guest Perks", "Restaurants, ski rentals, shuttles"],
    ["concierge", "💬", "Ask a Local", "Get instant trip help"],
  ];

  return (
    <div>
      <div className="welcome-card">
        <div className="welcome-icon">🏔️</div>
        <h3>Welcome to Keystone.</h3>
        <p>
          This private guest concierge helps you settle in, get to the slopes,
          find local food, discover events, use the home confidently, and plan
          the best local experience.
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
      title: "Pick the right dinner lane",
      detail:
        "Dos Locos for Mexican, Snake River for dinner + drinks, Nowhere Pizza for easy.",
      badge: "Local food",
      icon: "🌮",
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
          <div className="eyebrow">Live-style Keystone guide</div>
          <h3>Today’s Best Moves</h3>
          <p>
            Property-aware recommendations, dining, events, ski logistics, and a
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
          Settle in → hot tub or River Run → local dinner → ski plan.
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
    "Hi — I’m your Peak Concierge for Wild Irishman 1074. Ask me for Mexican food, dinner reservations, events, bars, no-ski plans, ski access, parking, Wi-Fi, hot tub, or checkout.";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: openingMessage,
      title: "Welcome",
      actions: [
        askAction("Mexican food", "Where can we get Mexican food?"),
        askAction("Events", "What events are happening?"),
        askAction("Dinner help", "Help me call some restaurants"),
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const popularTopics = useMemo(
    () => [
      "Mexican food",
      "Events",
      "Bars / après",
      "Book dinner",
      "No-ski day",
      "Breakfast",
      "Ski access",
      "Parking",
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
          placeholder="Ask about Mexican, events, bars, dinner, Wi-Fi..."
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

function BookScreen({ setScreen }) {
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
          <button
            className="gradient-button"
            onClick={() => setScreen("concierge")}
          >
            Request help
          </button>
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
            local recommendations, events, transportation, amenities, and booking
            help — all branded to the property.
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
              Gives guests real Keystone recommendations instead of a stale
              binder.
            </li>
            <li>
              Helps guests find restaurants, events, bars, transportation, ski
              rentals, and groceries.
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
