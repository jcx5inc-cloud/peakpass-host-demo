import React, { useEffect, useState } from "react";

const screens = {
  welcome: "Welcome",
  house: "House Info",
  tonight: "Tonight",
  perks: "Perks",
  concierge: "Ask Concierge",
  book: "Book Local",
};

const property = {
  name: "Wild Irishman 1074",
  town: "Keystone",
  address: "373 Wild Irishman Road, Unit 1074, Keystone, CO 80435",
  wifi: "Wildirishman1074",
  wifiPassword: "wildirishman1074",
  manager: "Mountain Vacation Lodging",
  managerPhone: "970-825-0480",
};

const houseItems = [
  ["Wi-Fi", "Wildirishman1074", "Password: wildirishman1074"],
  ["Parking", "2 vehicles max", "First come, first served. Parking passes required."],
  ["Check-out", "10:00 AM", "Trash out, dishwasher started, thermostats set, doors/windows locked."],
  ["Emergency", "MVL + 911", "Call 911 for emergencies. MVL: 970-825-0480."],
];

const restaurants = [
  {
    id: "dos-locos",
    name: "Dos Locos",
    fullName: "Dos Locos Mexican Restaurant & Cantina",
    phone: "970-262-9185",
    bestFor: "Mexican food, margaritas, casual groups, and families",
    note: "They do not take reservations, so call first and go early if you have a group.",
    keywords: ["mexican", "tacos", "taco", "burrito", "margarita", "queso", "dos locos"],
  },
  {
    id: "snake-river",
    name: "Snake River",
    fullName: "Snake River Saloon & Steakhouse",
    phone: "970-468-2788",
    bestFor: "Groups, dinner, drinks, happy hour, and a real mountain-town night",
    note: "Best first call for groups who want dinner and drinks in one place.",
    keywords: ["snake river", "steak", "steakhouse", "bar", "drinks", "saloon", "happy hour"],
  },
  {
    id: "ski-tip",
    name: "Ski Tip",
    fullName: "Ski Tip Lodge",
    phone: "970-496-4950",
    bestFor: "Date night, parents, anniversary, celebration, or a special dinner",
    note: "Call early. This is the premium dinner move.",
    keywords: ["ski tip", "fancy", "fine dining", "romantic", "special dinner", "date night"],
  },
  {
    id: "nowhere",
    name: "Nowhere Pizza",
    fullName: "Nowhere Pizza & Pub",
    phone: "970-485-6974",
    bestFor: "Families, tired groups, kids, casual dinner, and arrival night",
    note: "Best easy fallback when nobody wants a formal dinner.",
    keywords: ["pizza", "nowhere", "casual", "kids", "takeout"],
  },
  {
    id: "haywood",
    name: "Haywood Cafe",
    fullName: "Haywood Cafe",
    phone: "970-262-9300",
    bestFor: "Breakfast before skiing, pancakes, omelets, and casual daytime food",
    note: "Go early on ski mornings.",
    keywords: ["breakfast", "brunch", "coffee", "pancakes", "haywood"],
  },
];

const perks = [
  {
    id: "dos-locos-perk",
    category: "Food",
    icon: "🌮",
    title: "Free margarita with entrée",
    vendor: "Dos Locos",
    value: "Guest perk",
    serviceId: "dinner",
    details: "Great for tacos, margaritas, casual groups, and easy Keystone dinners.",
    how: "Show your Peak Concierge guest screen when ordering.",
    phone: "970-262-9185",
    code: "PEAK-MARG",
    bestFor: "Mexican dinner",
    requestNotes:
      "Dinner request from Dos Locos perk. Guest is interested in Mexican food, tacos, margaritas, and an easy Keystone dinner.",
  },
  {
    id: "grocery",
    category: "Arrival",
    icon: "🛒",
    title: "Arrive to a stocked kitchen",
    vendor: "Summit Home Services",
    value: "Grocery delivery",
    serviceId: "grocery",
    details: "Perfect for late arrivals, families, breakfast supplies, snacks, drinks, and essentials.",
    how: "Submit arrival date, guest count, and must-have items.",
    phone: "970-445-8658",
    code: "PEAK-STOCK",
    bestFor: "Late arrival",
    requestNotes:
      "Grocery stocking request from Peak Concierge perk. Guest wants arrival groceries, breakfast supplies, snacks, drinks, and essentials.",
  },
  {
    id: "shuttle-epic",
    category: "Transport",
    icon: "🚙",
    title: "Book DIA to Keystone shuttle",
    vendor: "Epic Mountain Express",
    value: "Airport transfer",
    serviceId: "shuttle",
    details: "Best for guests flying into Denver who do not want to rent a car or drive mountain passes.",
    how: "Start a shuttle request with flight time, group size, and luggage count.",
    phone: "",
    code: "PEAK-RIDE",
    bestFor: "Airport transfer",
    requestNotes:
      "Airport shuttle request from Epic Mountain Express perk. Guest needs DIA to Keystone transportation.",
  },
  {
    id: "summit-express",
    category: "Transport",
    icon: "🚌",
    title: "Shared or private mountain shuttle",
    vendor: "Summit Express",
    value: "Shared/private ride",
    serviceId: "shuttle",
    details: "Good for airport transfers, private rides, and reliable mountain transportation.",
    how: "Request pickup city, destination, group size, and desired arrival time.",
    phone: "",
    code: "PEAK-SUMMIT",
    bestFor: "Group shuttle",
    requestNotes:
      "Shared/private shuttle request from Summit Express perk. Guest needs mountain transportation for their group.",
  },
  {
    id: "fresh-tracks",
    category: "Transport",
    icon: "🏔️",
    title: "Private Keystone airport shuttle",
    vendor: "Fresh Tracks Transportation",
    value: "Private shuttle",
    serviceId: "shuttle",
    details: "Private transportation between Denver International Airport and Keystone.",
    how: "Start with flight details, group size, child seats, and luggage needs.",
    phone: "970-453-7433",
    code: "PEAK-PRIVATE",
    bestFor: "Private ride",
    requestNotes:
      "Private airport shuttle request from Fresh Tracks Transportation perk. Guest may need child seats or extra luggage space.",
  },
  {
    id: "ski-rentals",
    category: "Ski",
    icon: "⛷️",
    title: "Ski rental delivery setup",
    vendor: "Base Mountain Sports / Elite Ski Delivery",
    value: "Skip the shop line",
    serviceId: "ski-rentals",
    details:
      "Best for families and groups who want skis, boards, boots, and helmets handled before the first ski morning.",
    how: "Submit heights, weights, shoe sizes, ability levels, and delivery time.",
    phone: "",
    code: "PEAK-SKI",
    bestFor: "First ski morning",
    requestNotes:
      "Ski rental delivery request. Guest wants skis, boards, boots, helmets, and first-morning setup.",
  },
  {
    id: "dinner-help",
    category: "Food",
    icon: "🍽️",
    title: "Dinner concierge shortlist",
    vendor: "Peak Concierge Picks",
    value: "Tap-to-call",
    serviceId: "dinner",
    details: "Get the right dinner option fast: steakhouse, pizza, fine dining, breakfast, or après.",
    how: "Choose the type of food or vibe, then tap to call the best local option.",
    phone: "",
    code: "PEAK-DINE",
    bestFor: "Dinner decisions",
    requestNotes:
      "Dinner concierge request. Guest wants help choosing or booking a local restaurant.",
  },
  {
    id: "activities",
    category: "Activities",
    icon: "✨",
    title: "No-ski day planner",
    vendor: "Keystone Activities",
    value: "Custom plan",
    serviceId: "activities",
    details:
      "Great for non-skiers, rest days, families, bad weather, or guests who want more than restaurant lists.",
    how: "Tell Peak Concierge your group type, energy level, and timing.",
    phone: "",
    code: "PEAK-DAY",
    bestFor: "No-ski day",
    requestNotes:
      "Activity planning request. Guest wants a no-ski day, family plan, event ideas, or Keystone activity recommendations.",
  },
];

const bookServices = [
  {
    id: "dinner",
    icon: "🍽️",
    title: "Dinner Help",
    subtitle: "Restaurants, reservations, casual food, après",
    price: "Free concierge help",
    highlight: "Most requested",
    fields: ["Guest count", "Preferred time", "Food vibe"],
    defaultTiming: "Tonight",
    defaultNotes:
      "Dinner for our group. Open to steakhouse, pizza, fine dining, or something easy nearby.",
    conciergePromise: "We narrow the options and route you to the best local fit.",
  },
  {
    id: "grocery",
    icon: "🛒",
    title: "Grocery Stocking",
    subtitle: "Snacks, breakfast, drinks, essentials",
    price: "Custom quote",
    highlight: "Arrival upgrade",
    fields: ["Arrival date", "Guest count", "Must-have items"],
    defaultTiming: "Before arrival",
    defaultNotes:
      "We would like groceries stocked before or shortly after arrival. Breakfast items, snacks, drinks, and essentials preferred.",
    conciergePromise: "We collect your list and send it to the right local partner.",
  },
  {
    id: "ski-rentals",
    icon: "⛷️",
    title: "Ski Rentals",
    subtitle: "Skis, boards, boots, helmets",
    price: "Partner pricing",
    highlight: "Skip the line",
    fields: ["Riders", "Ability levels", "Delivery time"],
    defaultTiming: "Tomorrow morning",
    defaultNotes:
      "We need ski or snowboard rental help. Please collect rider info, sizes, ability levels, and preferred delivery time.",
    conciergePromise: "We turn rental chaos into one clean request.",
  },
  {
    id: "shuttle",
    icon: "🚙",
    title: "Airport Shuttle",
    subtitle: "DIA to Keystone transportation",
    price: "From vendor",
    highlight: "Mountain transport",
    fields: ["Flight time", "Group size", "Luggage count"],
    defaultTiming: "Arrival day",
    defaultNotes:
      "We need shuttle transportation between Denver International Airport and Keystone. Please confirm pickup time, group size, luggage, and private/shared preference.",
    conciergePromise: "We capture the right details so guests are not guessing.",
  },
  {
    id: "activities",
    icon: "🏔️",
    title: "Activities",
    subtitle: "No-ski day, family day, events",
    price: "Free concierge help",
    highlight: "Curated plan",
    fields: ["Group type", "Energy level", "Preferred time"],
    defaultTiming: "Flexible",
    defaultNotes:
      "We want help planning activities in Keystone. Interested in no-ski ideas, family activities, events, gondola, skating, tubing, or easy local plans.",
    conciergePromise: "We help guests discover what is actually worth doing.",
  },
  {
    id: "property-help",
    icon: "🔑",
    title: "Property Help",
    subtitle: "Lockout, parking, hot tub, checkout",
    price: "Guest support",
    highlight: "Fast help",
    fields: ["Issue", "Urgency", "Best contact"],
    defaultTiming: "Now",
    defaultNotes:
      "We need help with the property. Please include the issue, urgency, and best contact method.",
    conciergePromise: "We route house-specific questions before they become texts to the host.",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function tel(phone) {
  return phone ? `tel:${phone.replaceAll("-", "")}` : undefined;
}

function askAction(label, query) {
  return { label, query };
}

function callAction(label, phone) {
  return { label, href: tel(phone) };
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[?!.,"()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, terms) {
  const lower = normalize(text);
  return terms.some((term) => lower.includes(normalize(term)));
}

function restaurantByText(text) {
  const lower = normalize(text);
  return restaurants.find((r) => r.keywords.some((k) => lower.includes(normalize(k))));
}

function getConciergeResponse(message) {
  const lower = normalize(message);
  const restaurant = restaurantByText(lower);

  if (restaurant) {
    return {
      title: restaurant.fullName,
      content:
        `${restaurant.fullName}\n\nCall: ${restaurant.phone}\n\nBest for: ${restaurant.bestFor}\n\nConcierge take: ${restaurant.note}\n\nBest move: call before leaving, especially with a group or during peak dinner hours.`,
      actions: [
        callAction(`Call ${restaurant.name}`, restaurant.phone),
        askAction("Compare dinner options", "Compare dinner options"),
        askAction("Book dinner help", "Book dinner for me"),
      ],
    };
  }

  if (hasAny(lower, ["restaurant", "dinner", "food", "hungry", "eat", "book dinner", "reservation"])) {
    return {
      title: "Dinner concierge",
      content:
        "Here is the fast Keystone dinner decision:\n\n• Dinner + drinks: Snake River — 970-468-2788.\n• Premium: Ski Tip Lodge — 970-496-4950.\n• Easy pizza: Nowhere Pizza — 970-485-6974.\n• Breakfast: Haywood Cafe — 970-262-9300.\n\nBest move: for a group tonight, call Snake River first. If everyone is tired, choose Nowhere Pizza.",
      actions: [
        callAction("Call Snake River", "970-468-2788"),
        callAction("Call Ski Tip", "970-496-4950"),
        callAction("Call Nowhere Pizza", "970-485-6974"),
        askAction("Open Book Local", "Book dinner for me"),
      ],
    };
  }

  if (hasAny(lower, ["ski", "slopes", "snowboard", "river run", "mountain house", "bus"])) {
    return {
      title: "Ski access",
      content:
        "Best move: use the free Summit Stage stop in front of Wild Irishman on the Yellow Route. It connects to River Run, Mountain House, restaurants, and ski access.\n\nIf you drive, leave early and park at Mountain House near Peru Lift or the main River Run lot.\n\nUse ski locker #1074 and do not bring skis or boards into the condo.",
      actions: [
        askAction("Book ski rentals", "Help me book ski rentals"),
        askAction("Where is ski locker?", "Where is the ski locker?"),
      ],
    };
  }

  if (hasAny(lower, ["wifi", "internet", "password", "network"])) {
    return {
      title: "Wi-Fi",
      content:
        "Wi-Fi network: Wildirishman1074\nPassword: wildirishman1074\n\nSpeed listed in the guide: 1200 Mbps.\n\nBest move: screenshot this and send it to the group.",
      actions: [askAction("Parking", "Where do we park?")],
    };
  }

  if (hasAny(lower, ["parking", "park", "parking pass", "car"])) {
    return {
      title: "Parking",
      content:
        "Parking is available for 2 vehicles max. There are no assigned spaces, so it is first come, first served.\n\nParking passes are required and must be displayed at all times. They are usually on the kitchen counter, hanging near the door, or on top of the fridge.\n\nTrailers and RVs are not permitted.",
      actions: [askAction("Arrival directions", "How do we find the unit?")],
    };
  }

  if (hasAny(lower, ["hot tub", "pool", "sauna", "amenity", "amenities"])) {
    return {
      title: "Amenities",
      content:
        "Wild Irishman amenities include heated pool, hot tub, sauna, gas grills, picnic area, fire pit, and clubhouse.\n\nThey are located in the middle of the property and require the red Keystone amenity key card from the unit.\n\nTypical hours are 10 AM–10 PM, but hours can vary.",
      actions: [askAction("Plan tonight", "What should we do tonight?")],
    };
  }

  if (hasAny(lower, ["checkout", "check out", "leave", "departure"])) {
    return {
      title: "Checkout checklist",
      content:
        "Checkout is by 10:00 AM.\n\nBefore leaving:\n• Take out trash/recycling.\n• Load and run the dishwasher.\n• Remove open/perishable fridge items.\n• Turn off lights, electronics, appliances, fireplace, oven, and range.\n• Set thermostats to 60 in winter or 70 in warmer seasons.\n• Return parking passes and key cards where found.\n• Close and lock all doors/windows.\n• Leave used beds unmade.\n• Leave towels in a bathroom.\n• Take all belongings.",
      actions: [askAction("Trash", "Where do we take trash?")],
    };
  }

  return {
    title: "Peak Concierge",
    content:
      "I can help with dinner, ski access, Wi-Fi, parking, hot tub, groceries, shuttles, activities, checkout, or booking local services.\n\nTry asking: “Help me plan dinner tonight” or “Book airport shuttle help.”",
    actions: [
      askAction("Plan dinner", "Help me plan dinner tonight"),
      askAction("Book Local", "Book something for me"),
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

const miniCard = {
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 20,
  background: "rgba(255,255,255,.08)",
  padding: 14,
};

const fieldStyle = {
  width: "100%",
  minHeight: 40,
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 13,
  background: "rgba(255,255,255,.09)",
  color: "white",
  padding: "0 11px",
  outline: "none",
  fontSize: 12,
  fontWeight: 700,
  boxSizing: "border-box",
};

function renderAction(action, sendMessage) {
  if (action?.href) {
    return (
      <a key={action.label} href={action.href} style={callButtonStyle}>
        {action.label}
      </a>
    );
  }

  return (
    <button
      key={action.label || action}
      type="button"
      onClick={() => sendMessage(action.query || action)}
      style={actionButtonStyle}
    >
      {action.label || action}
    </button>
  );
}

function Phone({ screen, setScreen, startBooking, bookingSeed }) {
  return (
    <div className="phone-shell">
      <div className="phone-screen">
        <div className="phone-top">
          <div className="phone-speaker" />
        </div>

        <div className="phone-content">
          <div className="phone-hero">
            <div className="eyebrow">{property.name}</div>
            <div className="phone-title">Your Keystone Concierge</div>
            <p>
              House info, local perks, dining, booking help, ski logistics, and
              trusted recommendations for this stay.
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
          {screen === "perks" && <PerksScreen startBooking={startBooking} />}
          {screen === "concierge" && <ConciergeScreen startBooking={startBooking} />}
          {screen === "book" && <BookScreen bookingSeed={bookingSeed} />}
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen({ setScreen }) {
  const quickLinks = [
    ["house", "🏠", "House Info", "Wi-Fi, parking, checkout"],
    ["book", "✨", "Book Local", "Food, rides, groceries, ski rentals"],
    ["perks", "⭐", "Guest Perks", "Exclusive local offers"],
    ["concierge", "💬", "Ask Concierge", "Instant local guidance"],
  ];

  return (
    <div>
      <div className="welcome-card">
        <div className="welcome-icon">🏔️</div>
        <h3>Welcome to Keystone.</h3>
        <p>
          Peak Concierge turns this stay into a guided local experience — from
          arrival details to dinner decisions, activity planning, and local
          booking requests.
        </p>
      </div>

      <div className="quick-grid">
        {quickLinks.map(([key, icon, title, subtitle]) => (
          <button key={key} onClick={() => setScreen(key)} className="quick-card">
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
    ["🔑", "4:30 PM", "Arrival reset", "Find parking passes, red amenity card, and ski locker key."],
    ["🍽️", "6:00 PM", "Dinner lane", "Let Peak Concierge help choose dinner based on your group and timing."],
    ["♨️", "8:00 PM", "Hot tub reset", "Use the Wild Irishman amenities before quiet hours."],
    ["⛷️", "Tomorrow AM", "Beat ski rush", "Use Summit Stage or leave early for Mountain House / River Run."],
  ];

  return (
    <div className="tonight-premium">
      <div className="tonight-head">
        <div>
          <div className="eyebrow">Live-style Keystone guide</div>
          <h3>Today’s Best Moves</h3>
          <p>
            Property-aware recommendations, dining help, ski logistics, and a
            simple plan guests can follow.
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
          Settle in → local dinner → hot tub → ski plan.
        </div>
        <p>
          Peak Concierge makes the stay feel hosted without creating more work
          for the property manager.
        </p>
      </div>

      <div className="live-picks">
        {livePicks.map(([icon, time, title, detail]) => (
          <div key={title} className="live-pick-card">
            <div className="pick-icon">{icon}</div>
            <div className="pick-main">
              <div className="pick-time">{time}</div>
              <div className="pick-title">{title}</div>
              <div className="pick-detail">{detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tonight-actions">
        <button className="secondary-action" onClick={() => setScreen("concierge")}>
          Ask concierge
        </button>
        <button className="primary-action" onClick={() => setScreen("book")}>
          Book local help
        </button>
      </div>
    </div>
  );
}

function PerksScreen({ startBooking }) {
  const categories = ["All", "Food", "Arrival", "Transport", "Ski", "Activities"];
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(perks[0]);
  const filtered = category === "All" ? perks : perks.filter((p) => p.category === category);

  return (
    <div className="stack">
      <div className="screen-intro">
        <div className="eyebrow">Exclusive guest access</div>
        <h3>Local perks that feel premium.</h3>
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 999,
              padding: "8px 11px",
              background:
                category === cat
                  ? "linear-gradient(90deg,#67e8f9,#a78bfa)"
                  : "rgba(255,255,255,.08)",
              color: category === cat ? "#020617" : "white",
              fontWeight: 950,
              whiteSpace: "nowrap",
              fontSize: 11,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={miniCard}>
        <div className="eyebrow">Selected perk</div>
        <div
          style={{
            marginTop: 8,
            color: "white",
            fontSize: 20,
            fontWeight: 950,
            letterSpacing: "-.04em",
          }}
        >
          {selected.icon} {selected.title}
        </div>
        <div style={{ marginTop: 5, color: "#67e8f9", fontWeight: 900, fontSize: 13 }}>
          {selected.vendor}
        </div>

        <p style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.45 }}>
          {selected.details}
        </p>

        <div
          style={{
            border: "1px solid rgba(103,232,249,.18)",
            borderRadius: 15,
            background: "rgba(103,232,249,.08)",
            padding: 11,
            color: "#cffafe",
            fontSize: 12,
            lineHeight: 1.4,
            fontWeight: 750,
          }}
        >
          <strong>How to use:</strong> {selected.how}
        </div>

        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {selected.phone ? (
            <a href={tel(selected.phone)} style={callButtonStyle}>
              Call vendor
            </a>
          ) : (
            <button style={actionButtonStyle} onClick={() => startBooking(selected.serviceId, selected)}>
              Start request
            </button>
          )}

          <button style={callButtonStyle} onClick={() => navigator.clipboard?.writeText(selected.code)}>
            Copy code
          </button>
        </div>

        <button
          className="primary-action"
          style={{ width: "100%", marginTop: 9, minHeight: 42 }}
          onClick={() => startBooking(selected.serviceId, selected)}
        >
          Request this perk
        </button>
      </div>

      <div className="stack">
        {filtered.map((perk) => (
          <button
            key={perk.id}
            onClick={() => setSelected(perk)}
            style={{
              textAlign: "left",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 18,
              background:
                selected.id === perk.id
                  ? "rgba(103,232,249,.14)"
                  : "rgba(255,255,255,.08)",
              padding: 13,
              color: "white",
              boxShadow: "0 12px 24px rgba(0,0,0,.14)",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ fontSize: 25 }}>{perk.icon}</div>
              <div>
                <div style={{ fontWeight: 950, fontSize: 14 }}>{perk.title}</div>
                <div style={{ marginTop: 3, color: "#67e8f9", fontSize: 12, fontWeight: 900 }}>
                  {perk.vendor}
                </div>
                <div style={{ marginTop: 4, color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 }}>
                  Best for: {perk.bestFor}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ConciergeScreen({ startBooking }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      title: "Welcome",
      content:
        "Hi — I’m your Peak Concierge for Wild Irishman 1074. Ask me about dinner plans, ski access, Wi-Fi, parking, hot tub, groceries, airport shuttles, no-ski activities, or booking trusted local help.",
      actions: [
        askAction("Plan dinner", "Help me plan dinner tonight"),
        askAction("Ski access", "How do we get to the ski slopes?"),
        askAction("No-ski day", "What should we do if we don’t ski?"),
      ],
    },
  ]);

  const [input, setInput] = useState("");

  function sendMessage(customMessage) {
    const text = String(customMessage || input).trim();
    if (!text) return;

    if (hasAny(text, ["book dinner", "dinner reservation", "reserve dinner"])) {
      startBooking("dinner", {
        requestNotes:
          "Dinner request from Ask Concierge. Guest wants help choosing or booking a local dinner option.",
      });
      setInput("");
      return;
    }

    if (hasAny(text, ["book ski", "ski rental", "ski rentals", "rent skis"])) {
      startBooking("ski-rentals", {
        requestNotes:
          "Ski rental request from Ask Concierge. Guest wants ski or snowboard rental delivery.",
      });
      setInput("");
      return;
    }

    if (hasAny(text, ["book shuttle", "airport shuttle", "transportation", "ride from airport"])) {
      startBooking("shuttle", {
        requestNotes:
          "Airport shuttle request from Ask Concierge. Guest needs transportation between DIA and Keystone.",
      });
      setInput("");
      return;
    }

    if (hasAny(text, ["grocery", "groceries", "stock the fridge", "food stocked"])) {
      startBooking("grocery", {
        requestNotes:
          "Grocery stocking request from Ask Concierge. Guest wants groceries, snacks, breakfast items, drinks, or essentials.",
      });
      setInput("");
      return;
    }

    const response = getConciergeResponse(text);

    setMessages((current) => [
      ...current,
      { role: "user", content: text },
      { role: "assistant", ...response },
    ]);

    setInput("");
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
        {[
          "Help me plan dinner tonight",
          "How do we get to the ski slopes?",
          "What should we do if we don’t ski?",
          "Book airport shuttle help",
          "What is the Wi-Fi?",
          "Where do we park?",
        ].map((q) => (
          <button key={q} onClick={() => sendMessage(q)} className="suggested-question">
            {q}
          </button>
        ))}
      </div>

      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cx("chat-bubble", message.role === "user" ? "chat-user" : "chat-assistant")}
          >
            {message.title && message.role === "assistant" && <strong>{message.title}</strong>}
            {message.title && message.role === "assistant" ? "\n" : ""}
            {message.content}

            {message.actions?.length > 0 && (
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {message.actions.map((a) => renderAction(a, sendMessage))}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about dinner, ski access, shuttles, Wi-Fi..."
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}

function BookScreen({ bookingSeed }) {
  const [selectedId, setSelectedId] = useState(bookingSeed?.serviceId || "dinner");
  const selected = bookServices.find((service) => service.id === selectedId) || bookServices[0];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    timing: selected.defaultTiming,
    groupSize: "",
    priority: "Best recommendation",
    notes: selected.defaultNotes,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const service = bookServices.find((item) => item.id === bookingSeed?.serviceId);
    if (!service) return;

    setSelectedId(service.id);
    setSubmitted(false);

    setForm((current) => ({
      ...current,
      timing: bookingSeed?.timing || service.defaultTiming,
      priority: bookingSeed?.priority || "Best recommendation",
      notes: bookingSeed?.requestNotes || service.defaultNotes,
    }));
  }, [bookingSeed]);

  function selectService(service) {
    setSelectedId(service.id);
    setSubmitted(false);
    setForm((current) => ({
      ...current,
      timing: service.defaultTiming,
      priority: "Best recommendation",
      notes: service.defaultNotes,
    }));
  }

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitRequest(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const bookingCardStyle = {
    border: "1px solid rgba(103,232,249,.20)",
    borderRadius: 20,
    background: "linear-gradient(135deg, rgba(103,232,249,.11), rgba(167,139,250,.10))",
    padding: 13,
    boxShadow: "0 14px 30px rgba(0,0,0,.18)",
  };

  const serviceTileStyle = (active) => ({
    border: active
      ? "1px solid rgba(103,232,249,.42)"
      : "1px solid rgba(255,255,255,.11)",
    borderRadius: 15,
    padding: "10px 9px",
    minHeight: 58,
    color: active ? "#020617" : "white",
    background: active
      ? "linear-gradient(90deg,#67e8f9,#a78bfa)"
      : "rgba(255,255,255,.075)",
    fontWeight: 950,
    fontSize: 11,
    textAlign: "left",
    boxShadow: active ? "0 10px 24px rgba(103,232,249,.16)" : "none",
  });

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div className="screen-intro">
        <div className="eyebrow">Book Local</div>
        <h3>Request trusted help.</h3>
        <p style={{ color: "#cbd5e1", lineHeight: 1.45, marginBottom: 0, fontSize: 13 }}>
          Dinner, ski rentals, shuttles, groceries, activities, and property support.
        </p>
      </div>

      <div>
        <div
          style={{
            color: "#67e8f9",
            fontSize: 10,
            fontWeight: 950,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Choose request type
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          {bookServices.map((service) => (
            <button
              key={service.id}
              onClick={() => selectService(service)}
              style={serviceTileStyle(selected.id === service.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 17 }}>{service.icon}</span>
                <span>{service.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={bookingCardStyle}>
        {!submitted ? (
          <form onSubmit={submitRequest} style={{ display: "grid", gap: 9 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 15,
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(255,255,255,.12)",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {selected.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="eyebrow">Selected request</div>
                <div
                  style={{
                    marginTop: 4,
                    color: "white",
                    fontSize: 18,
                    fontWeight: 950,
                    lineHeight: 1.05,
                    letterSpacing: "-.04em",
                  }}
                >
                  {selected.title}
                </div>
                <div
                  style={{
                    marginTop: 5,
                    color: "#cbd5e1",
                    fontSize: 12,
                    lineHeight: 1.35,
                  }}
                >
                  {selected.subtitle}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              <div
                style={{
                  border: "1px solid rgba(103,232,249,.16)",
                  borderRadius: 12,
                  padding: "7px 9px",
                  color: "#cffafe",
                  background: "rgba(103,232,249,.07)",
                  fontSize: 10,
                  fontWeight: 950,
                }}
              >
                {selected.price}
              </div>

              <div
                style={{
                  border: "1px solid rgba(167,139,250,.16)",
                  borderRadius: 12,
                  padding: "7px 9px",
                  color: "#ddd6fe",
                  background: "rgba(167,139,250,.07)",
                  fontSize: 10,
                  fontWeight: 950,
                }}
              >
                {selected.highlight}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              <input
                style={fieldStyle}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Name"
              />

              <input
                style={fieldStyle}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Phone"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              <select
                style={fieldStyle}
                value={form.timing}
                onChange={(e) => update("timing", e.target.value)}
              >
                <option>Now</option>
                <option>Tonight</option>
                <option>Tomorrow morning</option>
                <option>Tomorrow afternoon</option>
                <option>Before arrival</option>
                <option>Arrival day</option>
                <option>This weekend</option>
                <option>Flexible</option>
              </select>

              <select
                style={fieldStyle}
                value={form.priority}
                onChange={(e) => update("priority", e.target.value)}
              >
                <option>Best recommendation</option>
                <option>Fastest option</option>
                <option>Most premium</option>
                <option>Family friendly</option>
                <option>Budget friendly</option>
                <option>Group friendly</option>
              </select>
            </div>

            <input
              style={fieldStyle}
              value={form.groupSize}
              onChange={(e) => update("groupSize", e.target.value)}
              placeholder="Group size"
            />

            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Tell us what you need."
              style={{
                ...fieldStyle,
                minHeight: 76,
                paddingTop: 10,
                resize: "vertical",
                lineHeight: 1.35,
              }}
            />

            <div style={{ display: "grid", gap: 6 }}>
              {selected.fields.slice(0, 3).map((field) => (
                <div
                  key={field}
                  style={{
                    border: "1px solid rgba(103,232,249,.12)",
                    borderRadius: 11,
                    padding: "7px 9px",
                    color: "#cffafe",
                    background: "rgba(103,232,249,.055)",
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Helpful: {field}
                </div>
              ))}
            </div>

            <button className="primary-action" type="submit" style={{ minHeight: 44 }}>
              Send request
            </button>
          </form>
        ) : (
          <div
            style={{
              border: "1px solid rgba(34,197,94,.25)",
              borderRadius: 18,
              background: "rgba(34,197,94,.10)",
              padding: 14,
            }}
          >
            <div style={{ fontSize: 28 }}>✅</div>
            <div
              style={{
                marginTop: 6,
                color: "#bbf7d0",
                fontWeight: 950,
                fontSize: 20,
                letterSpacing: "-.04em",
              }}
            >
              Request ready
            </div>

            <p style={{ color: "#dcfce7", fontSize: 13, lineHeight: 1.45 }}>
              This turns a guest need into a trackable local request.
            </p>

            <div
              style={{
                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 15,
                background: "rgba(2,6,23,.28)",
                padding: 12,
                color: "white",
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              <strong>Service:</strong> {selected.title}
              <br />
              <strong>Timing:</strong> {form.timing}
              <br />
              <strong>Priority:</strong> {form.priority}
              <br />
              <strong>Group:</strong> {form.groupSize || "Not provided"}
              <br />
              <strong>Guest:</strong> {form.name || "Guest"}
              <br />
              <strong>Phone:</strong> {form.phone || "Not provided"}
              <br />
              <strong>Notes:</strong> {form.notes || "No notes added"}
            </div>

            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <button className="primary-action" onClick={() => setSubmitted(false)}>
                Edit request
              </button>
              <button
                className="secondary-action"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    phone: "",
                    timing: selected.defaultTiming,
                    groupSize: "",
                    priority: "Best recommendation",
                    notes: selected.defaultNotes,
                  });
                }}
              >
                Start another
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          border: "1px solid rgba(255,255,255,.10)",
          borderRadius: 16,
          background: "rgba(255,255,255,.06)",
          padding: 11,
          color: "#cbd5e1",
          fontSize: 12,
          lineHeight: 1.4,
        }}
      >
        <strong style={{ color: "white" }}>What happens next:</strong>{" "}
        {selected.conciergePromise}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [bookingSeed, setBookingSeed] = useState({
    serviceId: "dinner",
    requestNotes: bookServices[0].defaultNotes,
  });

  function startBooking(serviceId = "dinner", source = {}) {
    const service = bookServices.find((item) => item.id === serviceId) || bookServices[0];

    setBookingSeed({
      serviceId: service.id,
      timing: source.timing || service.defaultTiming,
      priority: source.priority || "Best recommendation",
      requestNotes: source.requestNotes || service.defaultNotes,
      sourceId: source.id || "direct",
      createdAt: Date.now(),
    });

    setScreen("book");
  }

  return (
    <main className="page">
      <header className="demo-header">
        <div>
          <div className="brand">🏔️ Peak Concierge</div>
          <div className="brand-subtitle">Interactive guest experience preview</div>
        </div>

        <div className="header-note">Demo property: Wild Irishman 1074</div>
      </header>

      <section className="demo-stage">
        <div className="stage-copy">
          <div className="demo-pill">Host preview</div>
          <h1>See what your guests would experience.</h1>
          <p>
            Guests scan one QR code and get house info, local perks, dining help,
            trusted services, and concierge booking requests — all branded to the
            property.
          </p>
        </div>

        <Phone
          screen={screen}
          setScreen={setScreen}
          startBooking={startBooking}
          bookingSeed={bookingSeed}
        />

        <div className="side-card">
          <div className="side-label">Why hosts will want this</div>
          <ul>
            <li>Turns a long rental guide into a premium mobile guest experience.</li>
            <li>Answers repetitive questions before guests text the host.</li>
            <li>Helps guests book food, rides, groceries, ski rentals, and activities.</li>
            <li>Creates local partner revenue without adding host work.</li>
            <li>Makes the property feel more luxury from the moment guests arrive.</li>
            <li>Turns guest intent into trackable requests and vendor leads.</li>
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
