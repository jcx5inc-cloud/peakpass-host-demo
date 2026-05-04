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

const suggestedQuestions = [
  "What is the Wi-Fi?",
  "What time is checkout?",
  "Where should 8 guys go tonight?",
  "What should we do if we don’t ski tomorrow?",
  "Can ski rentals be delivered before 8 AM?",
  "Can we book an in-home massage?",
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
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi — I’m your Peak Concierge. Ask me about the house, dinner, ski rentals, transportation, massage, or what to do tonight.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(customMessage) {
    const messageToSend = String(customMessage || input).trim();

    if (!messageToSend || isLoading) return;

    const userMessage = { role: "user", content: messageToSend };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/concierge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          history: messages,
          propertyId: "river-mountain-lodge-214",
        }),
      });

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.answer ||
            "Best move: I can help with house info, local recommendations, ski rentals, transportation, massage, or dinner plans.",
        },
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting right now, but I can still help with the basics: Wi-Fi is RiverMountain214, checkout is 10:00 AM, and ski rental delivery is the easiest move for groups and families.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="concierge-live">
      <div className="concierge-live-header">
        <div>
          <div className="eyebrow">Live concierge</div>
          <h3>Ask Peak Concierge</h3>
        </div>
        <div className="live-dot">
          <span />
          Online
        </div>
      </div>

      <div className="suggested-grid">
        {suggestedQuestions.map((question) => (
          <button
            key={question}
            onClick={() => sendMessage(question)}
            disabled={isLoading}
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
            {message.content}
          </div>
        ))}

        {isLoading && (
          <div className="chat-bubble chat-assistant typing">
            Peak Concierge is thinking…
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about dinner, Wi-Fi, ski rentals, massage..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
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
        <a href="mailto:hello@peakscreens.com">Request my property demo</a>
      </footer>
    </main>
  );
}
