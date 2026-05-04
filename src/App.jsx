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
  [
    "Dinner Planning",
    "Owner picks",
    "Ski Tip Lodge, Keystone Ranch, Snake River Saloon",
  ],
];

const suggestedQuestions = [
  "What is the Wi-Fi?",
  "Where do we park?",
  "How do we get to the ski slopes?",
  "What should we do tonight in Keystone?",
  "What are the best dinner spots nearby?",
  "What time is checkout?",
  "Where is the hot tub?",
  "What is the door code?",
  "Where do we take trash?",
  "Can we bring a pet?",
  "How do we use the fireplace?",
  "What should we do if we don’t ski?",
];

const conciergeKnowledgeBase = [
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
      "The Wi-Fi network is Wildirishman1074 and the password is wildirishman1074. The guide lists the speed at 1200 Mbps. Best move: take a screenshot now so everyone in your group can connect quickly.",
    actions: ["Copy Wi-Fi info", "Ask another house question"],
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
      "Parking is available for 2 vehicles max. There are no assigned spaces, so parking is first come, first served. Parking passes are required and must be displayed at all times. They are usually on the kitchen counter, hanging near the door, or on top of the fridge. Trailers and RVs are not permitted. Extra cars can park overnight at the Peru Lift Lot for a nightly fee.",
    actions: ["Show arrival directions", "Ask about ski access"],
  },
  {
    id: "checkin",
    title: "Check-in and arrival",
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
      "Check-in is after 4:00 PM unless early check-in was approved. The address is 373 Wild Irishman Road, Unit 1074, Keystone, CO 80435. When you enter Wild Irishman, drive past the pool and take a right into the parking lot. Then follow the sidewalk left into the building labeled Raven. The unit is on the ground floor, 2nd door on the left. Parking lot coordinates: 39.6042444, -105.9733106.",
    actions: ["Show parking info", "Ask about door access"],
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
      "This unit uses a smart lock with a reservation-specific code. The code is not stored in this demo. The reservation holder should check the original Vacation Rental Guide link sent by text/email on arrival day. After entering the code, lift the door handle UP to open the door. If you are locked out, call Mountain Vacation Lodging at 970-825-0480. Do not guess lockbox codes.",
    actions: ["Call MVL", "Show arrival directions"],
  },
  {
    id: "checkout",
    title: "Checkout",
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
      "Checkout is by 10:00 AM unless late checkout was approved. Before leaving: dispose of trash/recycling, load and run the dishwasher, clean and put away large dishes, remove perishable/open items from the fridge, turn off lights/electronics/appliances/fireplace, set thermostats to 60 in winter or 70 in warmer seasons, return parking passes/key cards where found, close and lock all doors/windows, leave used beds unmade, place towels in a bathroom, and take all belongings.",
    actions: ["Show trash info", "Ask about late checkout"],
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
      "Late checkout requests need to be made within 48 hours of departure. Approval is not guaranteed, especially if another guest is checking in the same day. Best move: contact MVL as soon as possible and do not stay past 10:00 AM unless you receive approval.",
    actions: ["Contact MVL", "Show checkout checklist"],
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
      "Trash and recycling are in the large trash building at the front of the Wild Irishman property. You need the red Keystone amenity key card to access the trash/recycling facility. Do not leave trash outside overnight or next to/on top of full bins because wildlife can be a real issue. If you cannot access the trash building, leave trash inside the unit for the cleaners.",
    actions: ["Show checkout checklist", "Ask about amenity key"],
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
      "Community amenities include a heated pool, hot tub, sauna, gas grills, picnic area, fire pit, and clubhouse with lounge/restrooms. They are located in the middle of the Wild Irishman property. You need the red Keystone amenity key card from the unit. Typical amenity hours are 10 AM–10 PM, but availability and hours can vary by season or maintenance.",
    actions: ["Ask about pool hours", "Ask about grills"],
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
      "Best move: use the free Summit Stage bus stop in front of Wild Irishman on the Yellow Route. It connects you to Keystone areas like River Run, Mountain House, restaurants, and ski access. If you drive, go early and park at Mountain House near the Peru Lift or the main lot at River Run Base.",
    actions: ["Ask about ski locker", "Ask about rentals"],
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
      "Use ski locker #1074. The ski locker key is located in the unit. Please do not bring skis or snowboards into the condo. Also, remove shoes and boots when entering to help protect the floors.",
    actions: ["Ask about ski access", "Ask about ski rentals"],
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
      "For ski and snowboard rentals, the guide lists Base Mountain Sports and Elite Ski Delivery as partner options. Best move: delivery is usually easiest for groups and families because you skip the rental shop line and can get skis, boards, boots, and helmets handled together.",
    actions: ["Request rental help", "Ask about ski access"],
  },
  {
    id: "transportation",
    title: "Airport transportation",
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
    ],
    answer:
      "Airport shuttle options between DIA and Keystone include Summit Express, Epic Mountain Express / Colorado Mountain Express, Fresh Tracks Transportation, and Peak 1 Express. Uber and Lyft may be limited in Keystone depending on season, day, and time. Best move: book airport transportation in advance, especially for groups or winter arrivals.",
    actions: ["Ask about local bus", "Ask about winter driving"],
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
      "The free Summit Stage bus stop is in front of Wild Irishman Condominiums on the Yellow Route. It gives you easy access to Keystone slopes, River Run, Mountain House, restaurants, and resort amenities. The guide notes service from 8 AM–6 PM, with on-call service from 6–10 PM. On-call number: 970-496-4200.",
    actions: ["Ask about ski access", "Ask about dinner spots"],
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
    ],
    answer:
      "Best owner-recommended picks: Ski Tip Lodge for a special fine-dining night, Keystone Ranch for rustic Colorado cuisine and wild game, Snake River Saloon and Steakhouse for a cozy steakhouse feel, No Where Pizza for casual pizza, Bighorn Bistro & Bar for a polished but easy meal, and Haywood Cafe for breakfast or casual lunch.",
    actions: ["Plan dinner tonight", "Ask about no-ski activities"],
  },
  {
    id: "group-dinner",
    title: "Group dinner plan",
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
    ],
    answer:
      "Best move for a group: keep the night simple and close to Keystone. Start with an easy après/drink plan, then go to a hearty dinner spot like Snake River Saloon if you want steakhouse comfort or No Where Pizza for a casual group meal. If the group wants a more elevated night, Keystone Ranch or Ski Tip Lodge is the special-occasion move. Book early for larger parties.",
    actions: ["Show dinner picks", "Ask about transportation"],
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
      "haywood",
    ],
    answer:
      "For breakfast, Haywood Cafe is the owner-recommended easy win. It has hearty breakfast options like omelets and pancakes, plus sandwiches, burgers, and salads if you want something casual later in the day.",
    actions: ["Ask about skiing tomorrow", "Ask about coffee setup"],
  },
  {
    id: "coffee",
    title: "Coffee",
    keywords: ["coffee", "coffee maker", "filters", "drip", "keurig"],
    answer:
      "The unit has a standard drip coffee maker. Guests need to provide their own coffee and filters, though the unit may sometimes have starter supplies like coffee filters, sugar, spices, and basic kitchen items. Best move: check the kitchen first, then grab anything missing while you’re out.",
    actions: ["Ask about kitchen", "Ask about groceries"],
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
      "The guide lists Summit Home Services & Breckenridge Grocery for home services and grocery delivery. The unit also comes with starter supplies, but they may not last the whole stay. Best move: use grocery delivery or make one supply run early if your group needs extra paper goods, snacks, breakfast items, coffee, or drinks.",
    actions: ["Ask about kitchen supplies", "Ask about restaurants"],
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
      "The kitchen is well stocked. It includes a standard drip coffee maker, 2 crockpots, Ninja blender, food processor, air fryer, pots, pans, baking sheets, and dish set for 8+ people. Guests provide their own coffee and filters, though some starter supplies may be present but not guaranteed.",
    actions: ["Ask about groceries", "Ask about checkout dishes"],
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
      "The unit has a wood-burning fireplace. Before starting a fire, open the flue. You can check it by holding a lighter or lit match near the fireplace and watching for the flame to be pulled toward the chimney. Do not leave a fire unattended, always use the built-in screens/doors, and close the flue only after embers are completely cooled. The community fire pit is near the pool and grills.",
    actions: ["Ask about heating", "Ask about fire safety"],
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
      "The unit has heated baseboard flooring throughout, with individual thermostats in each room. Start the heat slowly, then increase if needed. Keep personal items and gear at least 5–6 inches away from baseboard heaters. There is no air conditioning, but there are ceiling fans in the master bedroom and portable fans in the bedrooms. In summer, close and lock windows/doors when leaving.",
    actions: ["Ask about fireplace", "Ask about checkout thermostats"],
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
      "The unit has a private washer and dryer, and the community also has coin-operated laundry. Do not overload the machines, and empty the lint trap before and after each drying cycle. Laundry soap and fabric softener are provided by the owner.",
    actions: ["Ask about checkout linens", "Ask about supplies"],
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
      "The unit has helpful family items: a pack and play in the back guest bedroom, a booster seat, and a blow-up mattress with sheets. Best move for families: get ski rentals delivered, use the free bus when practical, and keep dinner early and easy.",
    actions: ["Ask about family activities", "Ask about ski rentals"],
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
      "Cable, YouTube TV, and NFL Sunday Ticket are provided. Each bedroom has a TV and remote. You can sign into your own streaming accounts, but remember to sign out before departure. There are Alexa devices in the kitchen and master bedroom, plus games, books, and vinyl for the record player.",
    actions: ["Ask about checkout remotes", "Ask about Wi-Fi"],
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
      "Pets are not permitted in the home or on the premises. Bona fide service animals are permitted as required by law, but they must be disclosed properly so the required service animal form can be handled. Emotional support animals are not considered service animals and are not allowed unless a property is pet-friendly. This property is not pet-friendly.",
    actions: ["Ask about house rules", "Contact MVL"],
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
      "This is a no-smoking unit. Smoking is prohibited inside and outside the unit, including tobacco, marijuana, vaping devices, incense, and candles. Smoking is not permitted on balconies, in common areas, or in units. Use only designated smoking areas if permitted by the property.",
    actions: ["Ask about house rules", "Ask about fire safety"],
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
    ],
    answer:
      "No parties or large gatherings are allowed. Quiet hours begin after 10 PM, and community quiet hours are 10 PM–6 AM. Many neighbors may be local residents, so keep noise respectful, especially at night.",
    actions: ["Ask about house rules", "Ask about checkout"],
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
      "Great Keystone options include skiing/snowboarding, night skiing, snow tubing at Adventure Point, ice skating at Keystone Lake or Dercum Square, scenic gondola rides, mountain biking at Keystone Bike Park, hiking like Loveland Pass Loop or Keystone Gulch Trail, Keystone Ranch Golf Course, horseback/wagon/sleigh rides, festivals, and fly fishing near the Snake River. Best no-ski day: coffee/breakfast, Keystone Lake or scenic walk, spa or snow tubing, then an owner-recommended dinner.",
    actions: ["Build no-ski day", "Show dinner picks"],
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
      "All-wheel drive or 4-wheel drive is not required to access the property, but it is strongly recommended for winter travel and mountain pass conditions. Roads in Keystone to/from the property are generally maintained, but your route may include a mountain pass. Best move: check COtrip before driving and make sure you have good tires.",
    actions: ["Ask about parking", "Ask about shuttles"],
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
      "Keystone is high elevation, so take the first day seriously. Drink plenty of water, ease into alcohol and coffee, rest if needed, and start ski days early rather than pushing too hard late in the day. If symptoms feel serious or urgent, seek medical help or call 911.",
    actions: ["Ask about easy activities", "Ask about emergency"],
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
      "You may see moose, elk, bears, foxes, skunks, porcupines, or even mountain lions. Always keep a safe distance and never feed wildlife. Moose are especially dangerous if approached. Do not leave food or trash in your car, lock car doors, and keep trash secured.",
    actions: ["Ask about trash", "Ask about safety"],
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
      "For medical, fire, carbon monoxide, or immediate safety emergencies, call 911 right away. For property issues, lockouts, maintenance, or guest service help, contact Mountain Vacation Lodging at 970-825-0480. MVL also handles after-hours emergency vacation rental issues.",
    actions: ["Call MVL", "Ask about lockout"],
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
      "The unit includes multiple workstations with monitors, and the Wi-Fi speed is listed at 1200 Mbps. Best move: connect to Wildirishman1074, confirm your setup early, and keep devices charged because cold temperatures can drain batteries faster.",
    actions: ["Show Wi-Fi", "Ask about tech"],
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalize(text) {
  return String(text || "").toLowerCase();
}

function getKeywordScore(message, keywords) {
  const lower = normalize(message);
  return keywords.reduce((score, keyword) => {
    const k = normalize(keyword);
    if (!k) return score;
    if (lower === k) return score + 10;
    if (lower.includes(k)) return score + Math.max(2, Math.min(8, k.length / 3));
    return score;
  }, 0);
}

function getConciergeResponse(message) {
  const lower = normalize(message);

  if (!lower.trim()) {
    return {
      title: "Peak Concierge",
      answer:
        "Ask me about Wi-Fi, parking, ski access, checkout, amenities, transportation, restaurants, groceries, or what to do in Keystone.",
      actions: ["Show Wi-Fi", "Plan my day"],
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
    lower.includes("where") ||
    lower.includes("how") ||
    lower.includes("what") ||
    lower.includes("can")
  ) {
    return {
      title: "Best local move",
      answer:
        "Best move: I can help with the most common Wild Irishman 1074 questions — Wi-Fi, parking, smart lock access, ski access, amenities, dinner, transportation, checkout, trash, house rules, and Keystone activity planning. Try asking, “Where do we park?” or “What should we do tonight?”",
      actions: ["Ask about parking", "Ask about tonight"],
      matched: "help",
    };
  }

  return {
    title: "Peak Concierge",
    answer:
      "I can help with property details and local Keystone planning. Try asking about Wi-Fi, parking, ski access, checkout, restaurants, groceries, transportation, hot tub, ski rentals, or no-ski activities.",
    actions: ["Show house info", "Plan Keystone day"],
    matched: "fallback",
  };
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
    "Hi — I’m your Peak Concierge for Wild Irishman 1074. Ask me about Wi-Fi, parking, check-in, ski access, amenities, dinner, transportation, house rules, or checkout.";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: openingMessage,
      title: "Welcome",
    },
  ]);
  const [input, setInput] = useState("");

  const popularTopics = useMemo(
    () => [
      "Wi-Fi",
      "Parking",
      "Door code",
      "Checkout",
      "Hot tub",
      "Ski access",
      "Restaurants",
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
          <div className="eyebrow">Internal concierge database</div>
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
                {message.actions.map((action) => (
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
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about Wi-Fi, ski slopes, dinner, checkout..."
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
