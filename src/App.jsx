import React, { useState } from "react";

const screens = {
  welcome: "Welcome",
  house: "House Info",
  tonight: "Tonight",
  perks: "Perks",
  concierge: "Ask Concierge",
  book: "Book Local",
};

const houseItems = [
  ["Wi-Fi", "RiverMountain214", "Password: PeakConcierge2026"],
  ["Parking", "Garage spot #42", "Display pass at all times"],
  ["Check-out", "10:00 AM", "Dishes started, trash out, balcony locked"],
  ["Emergency", "Host + building desk", "Urgent care, locksmith, snow removal"],
];

const perks = [
  [
    "❄️",
    "15% off ski rental delivery",
    "Summit Gear Drop",
    "Delivered before first chair",
  ],
  [
    "👨‍🍳",
    "Free champagne with private chef",
    "Alpine Table Co.",
    "Dinner in the unit, no cleanup",
  ],
  [
    "🚙",
    "$25 off airport transfer",
    "PeakRide Shuttle",
    "Denver airport to Breck",
  ],
  [
    "💆",
    "10% off in-home massage",
    "Altitude Recovery Spa",
    "Therapist comes to you",
  ],
];

const services = [
  ["Private Chef", "From $1,500", "Perfect for luxury nights in"],
  ["Ski Rental Delivery", "15% off", "Skis, boards, boots, helmets"],
  ["Airport Shuttle", "$25 off", "Private SUV or group transfer"],
  ["Grocery Stocking", "Custom quote", "Arrive to a full fridge"],
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
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
            <div className="eyebrow">River Mountain Lodge 214</div>
            <div className="phone-title">Your Breckenridge Concierge</div>
            <p>
              House info, local perks, live recommendations, and booking help
              for this stay.
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
          {screen === "tonight" && <TonightScreen />}
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
    ["house", "🏠", "House Info", "Wi-Fi, parking, checkout, and rules"],
    ["tonight", "✨", "Plan Tonight", "Live local recommendations"],
    ["perks", "⭐", "Guest Perks", "Exclusive local offers"],
    ["concierge", "💬", "Ask a Local", "Get instant trip help"],
  ];

  return (
    <div>
      <div className="welcome-card">
        <div className="welcome-icon">🏔️</div>
        <h3>Welcome to Breck.</h3>
        <p>
          This private guest concierge helps you settle in, plan the perfect
          night, and book trusted local services.
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

function TonightScreen() {
  const livePicks = [
    {
      time: "4:30 PM",
      title: "Golden-hour Main Street walk",
      detail: "Low effort, high reward before the snow moves in.",
      badge: "Best first move",
      icon: "🌄",
    },
    {
      time: "5:45 PM",
      title: "Après close to downtown",
      detail: "Stay walkable tonight. Roads get slower after dark.",
      badge: "Guest favorite",
      icon: "🍸",
    },
    {
      time: "6:30 PM",
      title: "Last-minute dinner opening",
      detail: "A group-friendly table is still realistic if booked early.",
      badge: "Limited",
      icon: "🍽️",
    },
    {
      time: "8:15 PM",
      title: "In-home massage window",
      detail: "One recovery slot open after dinner.",
      badge: "Premium add-on",
      icon: "💆",
    },
  ];

  return (
    <div className="tonight-premium">
      <div className="tonight-head">
        <div>
          <div className="eyebrow">Live today in Breckenridge</div>
          <h3>Tonight’s Best Moves</h3>
          <p>
            Weather-aware recommendations, local availability, and a simple plan
            guests can actually follow.
          </p>
        </div>

        <div className="weather-chip">
          <div>❄️</div>
          <span>Snow after 6</span>
        </div>
      </div>

      <div className="perfect-plan">
        <div className="plan-label">Perfect plan</div>
        <div className="plan-title">
          Stay walkable: après → early dinner → hot tub or massage.
        </div>
        <p>
          Peak Concierge keeps the night easy, local, and low-stress so guests
          do not waste time guessing or driving around.
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
        <button className="secondary-action">Build my night</button>
        <button className="primary-action">Book open slots</button>
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
          <button className="gradient-button">Claim perk</button>
        </div>
      ))}
    </div>
  );
}

function ConciergeScreen() {
  const answers = {
    "Where should 8 guys go tonight for dinner and drinks?": {
      title: "Group dinner + après plan",
      answer:
        "For 8 guys, keep it walkable and group-friendly. Start with après near Main Street, book an early casual dinner where a larger table is realistic, then move to a bar close enough that nobody needs to drive. Best move: dinner first, drinks second, shuttle only if you’re leaving downtown.",
      actions: ["Show group dinner spots", "Find après nearby"],
    },
    "What should we do if we don’t ski tomorrow?": {
      title: "No-ski mountain day",
      answer:
        "Make it feel like a real mountain day without touching a chairlift. Start with coffee and a Main Street walk, choose either snowmobiling or spa depending on the group’s energy, then finish with an early dinner or private chef back at the property. If the weather is rough, I’d keep everything walkable and indoor-heavy.",
      actions: ["Build no-ski itinerary", "Check spa openings"],
    },
    "Can rentals come before 8 AM?": {
      title: "Ski rental delivery",
      answer:
        "Yes — the easiest setup is ski rental delivery to the property the night before or early morning. Guests avoid the rental shop line, and families/groups can handle boots, helmets, skis, and boards in one order. I’d request delivery tonight so gear is ready before first chair.",
      actions: ["Request rental delivery", "Claim 15% off"],
    },
  };

  const questions = Object.keys(answers);
  const [question, setQuestion] = useState(questions[0]);
  const current = answers[question];

  return (
    <div className="stack">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => setQuestion(q)}
          className={cx(
            "question-card",
            q === question && "question-card-active"
          )}
        >
          {q}
        </button>
      ))}

      <div className="answer-card">
        <div className="small-muted">Guest asks:</div>
        <div className="answer-question">{question}</div>

        <div className="concierge-recommendation">
          <div className="concierge-label">Peak Concierge recommends</div>
          <div className="concierge-title">{current.title}</div>
          <p>{current.answer}</p>
        </div>

        <div className="two-buttons">
          <button className="secondary-action">{current.actions[0]}</button>
          <button className="primary-action">{current.actions[1]}</button>
        </div>
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
          <button className="gradient-button">Request booking</button>
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
          Sample property: River Mountain Lodge 214
        </div>
      </header>

      <section className="demo-stage">
        <div className="stage-copy">
          <div className="demo-pill">Host preview</div>
          <h1>See what your guests would experience.</h1>
          <p>
            This is a sample Peak Concierge guest experience. Guests scan one QR
            code and get house info, local perks, live recommendations, and
            booking help — all branded to the property.
          </p>
        </div>

        <Phone screen={screen} setScreen={setScreen} />

        <div className="side-card">
          <div className="side-label">Why hosts will want this</div>
          <ul>
            <li>
              Makes your rental feel instantly more premium the moment guests
              walk in.
            </li>
            <li>
              Turns scattered texts, binders, and house rules into one polished
              guest experience.
            </li>
            <li>
              Answers the repetitive questions hosts get every stay before
              guests ever need to ask.
            </li>
            <li>
              Gives guests live local guidance instead of a stale list of
              restaurant recommendations.
            </li>
            <li>
              Helps guests book trusted local services directly from the
              property experience.
            </li>
            <li>
              Creates a new way to add guest value without adding more work for
              the host.
            </li>
          </ul>
        </div>
      </section>

      <footer className="demo-footer">
        <div>
          <strong>Want this customized for your property?</strong>
          <span>No app. No hardware. No Airbnb account access.</span>
        </div>
        <a href="mailto:jimmy@peakscreens.com">
          Request my property demo
        </a>
      </footer>
    </main>
  );
}
