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
  ["Wi-Fi", "RiverMountain214", "Password: PeakPass2026"],
  ["Parking", "Garage spot #42", "Display pass at all times"],
  ["Check-out", "10:00 AM", "Dishes started, trash out, balcony locked"],
  ["Emergency", "Host + building desk", "Urgent care, locksmith, snow removal"],
];

const perks = [
  ["❄️", "15% off ski rental delivery", "Summit Gear Drop", "Delivered before first chair"],
  ["👨‍🍳", "Free champagne with private chef", "Alpine Table Co.", "Dinner in the unit, no cleanup"],
  ["🚙", "$25 off airport transfer", "PeakRide Shuttle", "Denver airport to Breck"],
  ["💆", "10% off in-home massage", "Altitude Recovery Spa", "Therapist comes to you"],
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

function Card({ children, dark = false, className = "" }) {
  return (
    <div className={cx("card", dark ? "card-dark" : "", className)}>
      {children}
    </div>
  );
}

function Button({ children, active = false, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={cx("button", active ? "button-active" : "", className)}
    >
      {children}
    </button>
  );
}

function Label({ children }) {
  return <div className="label">{children}</div>;
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
                className={cx("phone-tab", screen === key ? "phone-tab-active" : "")}
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
    ["house", "🏠", "House Info"],
    ["tonight", "✨", "Plan Tonight"],
    ["perks", "⭐", "Guest Perks"],
    ["concierge", "💬", "Ask a Local"],
  ];

  return (
    <div>
      <div className="glass-panel">
        <div className="big-icon">🏔️</div>
        <h3>Welcome to Breck.</h3>
        <p>Choose what you need and PeakPass will guide the rest.</p>
      </div>

      <div className="quick-grid">
        {quickLinks.map(([key, icon, title]) => (
          <button key={key} onClick={() => setScreen(key)} className="quick-card">
            <div className="quick-icon">{icon}</div>
            <div>{title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HouseScreen() {
  return (
    <div className="stack">
      <div className="info-banner">
        <div className="eyebrow cyan">Replaces the binder</div>
        <h3>Everything guests ask for.</h3>
      </div>

      {houseItems.map(([title, main, sub]) => (
        <div key={title} className="list-card">
          <div className="muted-title">{title}</div>
          <div className="list-main">{main}</div>
          <div className="list-sub">{sub}</div>
        </div>
      ))}
    </div>
  );
}

function TonightScreen() {
  const moves = [
    "Snow starts after 6 PM — stay walkable tonight.",
    "Best move: early dinner, après nearby, hot tub after 8.",
    "One massage slot and one private chef slot still open.",
  ];

  return (
    <div className="feature-panel">
      <div className="eyebrow cyan">Tonight’s Best Moves</div>
      <h3>Live recommendations, not a static guide.</h3>

      <div className="stack">
        {moves.map((move, index) => (
          <div key={move} className="move-card">
            <strong>{index + 1}.</strong> {move}
          </div>
        ))}
      </div>

      <div className="perk-highlight">
        Featured perk: 15% off ski rental delivery tomorrow morning.
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
          <button className="gradient-cta">Claim perk</button>
        </div>
      ))}
    </div>
  );
}

function ConciergeScreen() {
  const questions = [
    "Where should 8 guys go tonight for dinner and drinks?",
    "What should we do if we don’t ski tomorrow?",
    "Can rentals come before 8 AM?",
  ];

  const [question, setQuestion] = useState(questions[0]);

  return (
    <div className="stack">
      {questions.map((q) => (
        <button key={q} onClick={() => setQuestion(q)} className="question-card">
          {q}
        </button>
      ))}

      <div className="answer-card">
        <div className="small-muted">Guest asks:</div>
        <div className="answer-question">{question}</div>
        <p>
          Best move: stay walkable, avoid driving, and use a vetted local
          partner. I can show options, book directly, or text the partner now.
        </p>

        <div className="two-buttons">
          <button className="secondary-action">Show options</button>
          <button className="primary-action">Book now</button>
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
          <button className="gradient-cta">Request booking</button>
        </div>
      ))}
    </div>
  );
}

function HostPanel({ screen }) {
  const data = {
    welcome: [
      "First impression",
      "Guests immediately see a premium, organized experience instead of a binder or scattered messages.",
    ],
    house: [
      "Fewer repetitive questions",
      "Wi-Fi, parking, check-out, trash, rules, and emergency info are always one tap away.",
    ],
    tonight: [
      "Feels alive",
      "Live local suggestions make the guide useful throughout the stay, not just at check-in.",
    ],
    perks: [
      "Perks, not ads",
      "Vetted partner offers feel like hospitality upgrades while creating revenue potential.",
    ],
    concierge: [
      "Local intelligence",
      "Guest questions turn into helpful answers and trackable partner leads.",
    ],
    book: [
      "Booking layer",
      "Private chef, rentals, shuttle, massage, and groceries become one-tap guest services.",
    ],
  }[screen];

  return (
    <div className="host-panel">
      <Card dark>
        <div className="eyebrow cyan">What the host sees</div>
        <h2>{data[0]}</h2>
        <p>{data[1]}</p>
      </Card>

      <Card>
        <div className="eyebrow cyan">In-property placement</div>

        <div className="qr-card">
          <div className="qr-block">▣</div>
          <div className="qr-title">Your Breckenridge Concierge</div>
          <p>
            Scan for Wi-Fi, house info, local perks, dinner ideas, ski rentals,
            transportation, and tonight’s best moves.
          </p>
          <div className="link-badge">peakpassconcierge.com/rml214</div>
        </div>
      </Card>
    </div>
  );
}

function HostDashboard() {
  const metrics = [
    ["87", "guest opens"],
    ["142", "section views"],
    ["18", "perk clicks"],
    ["4", "partner inquiries"],
  ];

  const topSections = ["Top section: Wi-Fi", "Second: Check-out", "Third: Ski rentals"];

  return (
    <Card className="dashboard">
      <div className="dashboard-head">
        <div>
          <div className="eyebrow cyan">Sample monthly host report</div>
          <h2>Your rental’s guest engagement</h2>
        </div>
        <button className="top-cta">Send me this report monthly</button>
      </div>

      <div className="metric-grid">
        {metrics.map(([number, label]) => (
          <div key={label} className="metric-card">
            <div>{number}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="section-grid">
        {topSections.map((item) => (
          <div key={item} className="section-card">{item}</div>
        ))}
      </div>
    </Card>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");

  return (
    <main className="page">
      <div className="shell">
        <header className="header">
          <div>
            <div className="brand">🏔️ PeakPass Concierge</div>
            <div className="brand-subtitle">
              Clickable host demo: what your guests would experience
            </div>
          </div>
          <button className="top-cta">Claim founding host setup</button>
        </header>

        <section className="hero-grid">
          <div>
            <Label>See your property on PeakPass</Label>
            <h1>Turn your rental into a private guest concierge.</h1>
            <p className="hero-copy">
              This demo shows exactly what a host gets: a beautiful guest
              experience, an in-home QR card, local perks, booking help, and a
              monthly engagement report.
            </p>

            <div className="nav-buttons">
              {Object.entries(screens).map(([key, label]) => (
                <Button
                  key={key}
                  active={screen === key}
                  onClick={() => setScreen(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <Phone screen={screen} setScreen={setScreen} />

          <HostPanel screen={screen} />
        </section>

        <HostDashboard />

        <section className="final-cta">
          <div className="eyebrow cyan">Founding host offer</div>
          <h2>We’ll build this exact experience for your property.</h2>
          <p>
            No app. No hardware required. No Airbnb account access. No ugly ads.
            First 25 founding properties get free setup.
          </p>
          <div className="cta-row">
            <button className="top-cta">Get my property demo</button>
            <button className="secondary-wide">See host promise</button>
          </div>
        </section>
      </div>
    </main>
  );
}
