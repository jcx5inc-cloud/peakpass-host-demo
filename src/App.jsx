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

function TonightScreen() {
  const moves = [
    "Snow starts after 6 PM — stay walkable tonight.",
    "Best move: early dinner, après nearby, hot tub after 8.",
    "One massage slot and one private chef slot still open.",
  ];

  return (
    <div className="feature-panel">
      <div className="eyebrow">Tonight’s Best Moves</div>
      <h3>Live recommendations, not a static guide.</h3>

      <div className="stack">
        {moves.map((move, index) => (
          <div key={move} className="move-card">
            <strong>{index + 1}.</strong> {move}
          </div>
        ))}
      </div>

      <button className="premium-cta">
        Claim 15% off ski rental delivery
      </button>
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
  const questions = [
    "Where should 8 guys go tonight for dinner and drinks?",
    "What should we do if we don’t ski tomorrow?",
    "Can rentals come before 8 AM?",
  ];

  const [question, setQuestion] = useState(questions[0]);

  return (
    <div className="stack">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => setQuestion(q)}
          className="question-card"
        >
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
          <div className="brand">🏔️ PeakPass Concierge</div>
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
            This is a sample PeakPass guest concierge. Guests scan one QR code
            and get house info, local perks, live recommendations, and booking
            help — all branded to the property.
          </p>
        </div>

        <Phone screen={screen} setScreen={setScreen} />

        <div className="side-card">
          <div className="side-label">What this replaces</div>
          <ul>
            <li>Printed binders</li>
            <li>Repeated Wi-Fi questions</li>
            <li>Long check-in messages</li>
            <li>Random local recommendations</li>
            <li>Untracked guest service requests</li>
          </ul>
        </div>
      </section>

      <footer className="demo-footer">
        <div>
          <strong>Want this customized for your property?</strong>
          <span>No app. No hardware. No Airbnb account access.</span>
        </div>
        <a href="mailto:hello@peakpassconcierge.com">
          Request my property demo
        </a>
      </footer>
    </main>
  );
}
