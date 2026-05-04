import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PROPERTY_CONTEXT = `
Property:
Wild Irishman 1074, also referred to as Wild Irishman 1074 (924061).
Address: 373 Wild Irishman Road, Unit 1074, Keystone, CO 80435.
Community: Wild Irishman Condominiums in Keystone, Colorado.
Managed by: Mountain Vacation Lodging (MVL).

Core arrival details:
- Check-in time: after 4:00 PM unless otherwise approved.
- Checkout time: by 10:00 AM unless otherwise approved.
- Guests should review/save arrival instructions before arriving because some mountain areas may have poor cell service.
- Winter driving: 4WD/AWD is not strictly required to access the property, but it is strongly recommended in winter weather and for mountain pass travel.
- Best GPS address: 373 Wild Irishman Road, Unit 1074, Keystone, CO 80435.
- Arrival directions: Enter Wild Irishman, drive past the pool, and take a right into the parking lot.
- Parking lot coordinates: 39.6042444,-105.9733106.
- After parking, follow the sidewalk left into the building labeled "Raven."
- The unit is on the ground floor, 2nd door on the left.

Guest access:
- Door code: not included in the guide. This unit uses a smart lock that provides unique codes specific to each reservation.
- If a guest asks for the door code, tell them the reservation holder should check the original Vacation Rental Guide link sent by text/email on arrival day, or contact MVL.
- Smart lock instruction: after entering the code, lift the door handle UP to open the door.
- Backup key: there is a lock box mounted next to the front door for emergency lockouts only. Guests must call MVL if locked out.
- Amenity key: Red Keystone Key Card.
- Ski locker: #1074. The ski locker key is located in the unit.

Wi-Fi:
- Network: Wildirishman1074
- Password: wildirishman1074
- Speed: 1200 Mbps

Parking:
- Parking is available for 2 vehicles maximum.
- There are no designated parking spaces. Parking is first come, first served.
- Guests may park in any open spot.
- Parking passes are required and must be displayed at all times.
- Parking passes may be located on the kitchen counter, hanging near the door, or on top of the fridge.
- If guests cannot find parking passes, they should contact MVL guest services unless after hours.
- Temporary fallback: place a temporary pass on the dashboard with unit number, dates of stay, and phone number.
- Extra cars can park overnight at the Peru Lift Lot for a nightly fee.
- Trailers and RVs are not permitted.
- Parking passes must be returned at departure to avoid replacement fees.
- Snow removal is provided by the HOA when it snows more than a few inches. Guests may need to move vehicles within 24 hours for plowing.

Transportation:
- Summit Stage is the free Summit County bus system.
- Nearest bus stop: in front of Wild Irishman Condominiums on the Yellow Route.
- The bus provides access to Keystone slopes, River Run base area, Mountain House, restaurants, and resort amenities.
- Summit Stage generally operates 8 AM to 6 PM, with on-call service from 6 PM to 10 PM. Phone: 970-496-4200.
- Airport shuttle options between Keystone and Denver International Airport include Summit Express, Epic Mountain Express / Colorado Mountain Express, Fresh Tracks Transportation, and Peak 1 Express.
- Uber/Lyft may be limited, especially depending on season, day, and time.
- If driving to ski, parking options include Mountain House parking lot off the Peru Lift or the main lot at River Run Base.

House rules:
- No parties or large gatherings.
- Quiet hours begin after 10 PM.
- Community quiet hours: 10 PM to 6 AM.
- No smoking of any kind inside or outside the unit, including tobacco, marijuana, vapor devices, incense, and candles.
- Smoking is not permitted on balconies, common areas, or in units. Designated smoking areas only where permitted.
- No pets are permitted in the home or on the premises, except bona fide service animals as required by law and disclosed properly.
- Emotional support animals are not service animals and are not allowed unless the property is pet-friendly, which this property is not.
- Guests should remove shoes/boots when entering the unit.
- Guests should be respectful of neighbors.

Heating/cooling:
- Heated baseboard flooring throughout the unit.
- Keep personal items and equipment at least 5 to 6 inches away from baseboard heaters.
- Each room has its own thermostat.
- Start heat slowly, then increase if needed.
- No air conditioning.
- Ceiling fans in the master bedroom and portable fans in bedrooms.
- In summer, close and lock all windows/doors when leaving.
- Wood-burning fireplace in the main area.
- Before using fireplace, open the flue.
- Do not leave fire unattended.
- Use built-in fireplace screens/doors.
- Close the flue after embers are completely cooled.

Amenities:
- Community amenities: heated pool, hot tub, sauna, gas grills, picnic area, fire pit, clubhouse with lounge and restrooms.
- Amenities are located in the middle of the Wild Irishman property.
- Amenity access requires the Red Keystone Key Card located in the unit.
- Amenity hours: generally 10 AM to 10 PM, but dates/hours may vary seasonally or due to maintenance.
- Pool is typically open year-round and heated through winter.
- If the amenity key card is missing, notify MVL.
- Return amenity key card where found to avoid replacement fees.
- Private amenity: Peloton exercise bike.

Kitchen:
- Standard drip coffee maker. Guests provide their own coffee and filters.
- Kitchen items include 2 crockpots, Ninja blender, food processor, air fryer, pots, pans, baking sheets, and dish set for 8+ people.
- Special supplies may include salt, pepper, sugar, coffee filters, spices, dish soap, paper towels, toiletries, laundry detergent, and hair dryers under each bathroom sink, but these are not guaranteed.
- Starter supplies are provided, but guests may need to purchase more if they run out. Delivery of additional starter supplies may be possible for a $50 fee when available.

Laundry/linens:
- Linens are provided.
- Daily housekeeping is not included.
- Additional housekeeping may be available if requested at least 7 days before arrival.
- Private washer/dryer in the unit.
- Community coin-operated laundry is also available.
- Do not overload machines.
- Empty lint trap before and after drying.
- Laundry soap and fabric softener are provided by owner.

Sleeping / family items:
- Pack and play in the back guest bedroom.
- Blow-up mattress and sheets.
- Booster seat.
- Multiple workstations with monitors.

Entertainment:
- Cable is provided.
- YouTube TV and NFL Sunday Ticket are provided.
- Each bedroom has a TV and remote.
- Guests may sign into their own streaming accounts, but should sign out before departure.
- Alexa devices are located in the kitchen and master bedroom.
- Games, books, and vinyl for the record player are provided.

Trash / recycling:
- Trash and recycling can attract wildlife.
- Do not leave food, trash, or recycling outside, in the open, or in cars.
- Trash/recycling facility is the large trash building at the front of Wild Irishman property.
- Amenity key card is required to access trash/recycling facility.
- If unable to access, leave trash in the unit for cleaners.
- Do not leave trash outside overnight.
- Do not leave trash next to or on top of bins if full.

Ski gear:
- Remove shoes and boots when entering.
- Ski locker #1074 is provided.
- Ski locker key is located in the unit.
- Do not bring skis/snowboards into the unit.

Safety:
- Smoke and carbon monoxide detectors are located throughout the unit.
- If alarms sound due to fire/CO, vacate through a clear/direct exit.
- If alarms are triggered by cooking smoke or shower steam, open exterior doors/windows briefly, then close and lock them.
- Do not unplug or tamper with alarms.
- Breaker box is on the wall in the entryway.
- High altitude tips: drink plenty of water, avoid alcohol/coffee during first 24–48 hours if affected, start ski days early, rest as needed.
- Wildlife: moose, elk, bears, foxes, skunks, porcupines, and mountain lions may be in the area. Never approach or feed wildlife. Do not leave food in cars. Lock car doors.
- Fireworks are not allowed.
- Monitor fire restrictions during summer/fall.
- For medical emergencies, call 911.

Local Keystone activities:
- Skiing and snowboarding at Keystone Resort.
- Night skiing at Keystone.
- Snow tubing at Adventure Point.
- Ice skating at Keystone Lake or Dercum Square.
- Scenic gondola rides.
- Mountain biking at Keystone Bike Park.
- Hiking, including Loveland Pass Loop and Keystone Gulch Trail.
- Keystone Ranch Golf Course.
- Horseback riding and wagon/sleigh rides.
- Keystone festivals such as Bluegrass and Beer, Bacon and Bourbon, food/wine events.
- Fly fishing near Snake River and nearby streams.

Owner local restaurant recommendations:
- Ski Tip Lodge: fine dining in a cozy historic setting, rotating seasonal four-course menu.
- Keystone Ranch Restaurant: rustic elegance, Colorado cuisine, wild game, wine list.
- Snake River Saloon and Steakhouse: rustic/cozy, steaks, seafood, classic American dishes.
- No Where Pizza: laid-back pizza spot.
- Bighorn Bistro & Bar: American/Colorado-inspired menu, breakfast through upscale dinner.
- Haywood Cafe: breakfast, sandwiches, burgers, salads, omelets, pancakes.

Partnered/local discounts:
- Airport & local transportation: Epic Mountain Express.
- Lift tickets.
- Ski/snowboard rentals: Base Mountain Sports.
- Ski/snowboard rentals: Elite Ski Delivery.
- Home services and grocery delivery: Summit Home Services & Breckenridge Grocery.

Checkout/departure:
- Checkout is by 10:00 AM.
- Late checkout requests must be made within 48 hours of departure.
- Late checkout is not guaranteed and may not be approved when another check-in is same day.
- General departure tasks:
  - Dispose of all trash/garbage/recycling.
  - Turn off lights, electronics, appliances, fireplace, oven, range, etc.
  - Set thermostats to 60 in winter or 70 in spring/summer/fall.
  - Place remotes in their associated room in plain sight.
  - Log out of personal streaming services.
  - Ventilate before departure if pungent foods were prepared, then close/lock all windows and doors.
  - Return key cards, extra keys, parking passes where found.
  - Take all belongings.
  - Load/run dishwasher night before or morning of departure.
  - Clean/dry/put away pots, pans, large dishes.
  - Remove all perishable/opened items from fridge.
  - Leave towels/washcloths/hand towels in bathrooms or one bathroom.
  - Leave used beds unmade. If stripping sheets/pillowcases, leave in a pile on beds.
- MVL is not responsible for items left behind.

Contacts:
- Mountain Vacation Lodging / MVL guest services.
- Phone: 970-825-0480.
- Email: 918cf994-4003-4e87-bbd2-5d667c804049@chat.akia.com
- MVL operates 7 days a week with seasonal hours.
- Peak season hours: 8 AM–8 PM.
- Shoulder season hours: 8 AM–5 PM.
- After-hours emergency vacation rental issues are handled by an after-hours agent.
- Emergency: call 911.
- Local authorities: 311.
`;

function buildSystemPrompt() {
  return `
You are Peak Concierge, a premium local concierge for guests staying at Wild Irishman 1074 in Keystone, Colorado.

Your job:
1. Answer property questions using the provided property information.
2. Give practical Keystone and Summit County recommendations.
3. Help guests plan their stay.
4. Suggest trusted local partners when relevant.
5. Keep answers concise, specific, premium, and useful.

Tone:
- Warm, confident, local, premium.
- Do not sound like a generic chatbot.
- Give the clear answer first.
- Keep answers short enough for a mobile guest experience.
- When useful, include a "Best move" recommendation.
- When a request could become a booking, suggest the relevant local partner and a clear next step.

Important rules:
- Do not invent door codes, lockbox codes, emergency details, or missing property-specific info.
- The door code is not provided in this context. If guests ask for it, explain that this unit uses a smart lock and the reservation holder should check the original Vacation Rental Guide link or contact MVL.
- Do not reveal or guess lockbox codes.
- If the guest is locked out, tell them to contact MVL at 970-825-0480.
- If the guest asks about an emergency or urgent medical/safety issue, tell them to call 911 immediately.
- If unsure about a property-specific detail, say you can connect them with MVL.
- Do not overpromise live availability. Say "I can help request availability" or "I can help start the request."
- Featured partners should feel helpful, not like ads.
- Keep responses concise unless the guest asks for detail.

Context:
${PROPERTY_CONTEXT}
`;
}

function getFallbackAnswer(message) {
  const lower = String(message || "").toLowerCase();

  if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet")) {
    return "The Wi-Fi network is Wildirishman1074 and the password is wildirishman1074.";
  }

  if (lower.includes("checkout") || lower.includes("check out")) {
    return "Checkout is by 10:00 AM. Before leaving, take out trash, load/run the dishwasher, turn off lights/electronics/appliances/fireplace, set thermostats to 60 in winter or 70 in warmer seasons, close and lock all doors/windows, return parking passes and key cards where found, and take all belongings.";
  }

  if (lower.includes("check in") || lower.includes("check-in")) {
    return "Check-in is after 4:00 PM unless early check-in was approved. The unit is at 373 Wild Irishman Road, Unit 1074, Keystone. After parking, follow the sidewalk left into the Raven building; the unit is on the ground floor, 2nd door on the left.";
  }

  if (lower.includes("door code") || lower.includes("lock") || lower.includes("code")) {
    return "This unit uses a smart lock with a reservation-specific code. The reservation holder should check the original Vacation Rental Guide link sent by text/email on arrival day. After entering the code, lift the handle UP to open the door. If you are locked out, call MVL at 970-825-0480.";
  }

  if (lower.includes("parking") || lower.includes("park")) {
    return "Parking is available for 2 vehicles max and is first come, first served. Parking passes are required and must be displayed at all times. Passes are usually on the kitchen counter, hanging near the door, or on top of the fridge.";
  }

  if (lower.includes("trash") || lower.includes("garbage") || lower.includes("recycling")) {
    return "Trash/recycling is in the large trash building at the front of the Wild Irishman property. You’ll need the red Keystone amenity key card to access it. Do not leave trash outside overnight because of wildlife.";
  }

  if (lower.includes("ski locker") || lower.includes("skis") || lower.includes("snowboard")) {
    return "Use ski locker #1074. The ski locker key is located in the unit. Please do not bring skis or snowboards into the condo.";
  }

  if (lower.includes("hot tub") || lower.includes("pool") || lower.includes("sauna")) {
    return "Community amenities include a heated pool, hot tub, sauna, grills, picnic area, fire pit, and clubhouse. They’re in the middle of the Wild Irishman property and require the red Keystone amenity key card. Typical hours are 10 AM–10 PM, though they can vary.";
  }

  if (lower.includes("restaurant") || lower.includes("dinner") || lower.includes("eat")) {
    return "Best local dinner picks: Ski Tip Lodge for a special fine-dining night, Keystone Ranch for rustic Colorado cuisine, Snake River Saloon for steakhouse comfort, No Where Pizza for casual pizza, and Bighorn Bistro for a polished but easy option.";
  }

  if (lower.includes("ski rental") || lower.includes("rentals")) {
    return "Best move: use ski rental delivery so you can avoid the shop line. The guide mentions Base Mountain Sports and Elite Ski Delivery as ski/snowboard rental options.";
  }

  if (lower.includes("shuttle") || lower.includes("airport") || lower.includes("transport")) {
    return "Airport shuttle options between DIA and Keystone include Summit Express, Epic Mountain Express, Fresh Tracks Transportation, and Peak 1 Express. Rideshare can be limited in Keystone, especially depending on season and time.";
  }

  if (lower.includes("bus") || lower.includes("summit stage")) {
    return "The free Summit Stage bus stops in front of Wild Irishman on the Yellow Route. It connects to Keystone areas like River Run, Mountain House, restaurants, and ski access. The on-call service number is 970-496-4200.";
  }

  return "Best move: I can help with Wi-Fi, parking, check-in, checkout, amenities, ski access, restaurants, transportation, ski rentals, and Keystone activity ideas.";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        answer:
          "Peak Concierge is not fully connected yet. The site owner needs to add the OpenAI API key in Vercel.",
      });
    }

    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const recentHistory = Array.isArray(history)
      ? history.slice(-8).map((item) => ({
          role: item.role === "assistant" ? "assistant" : "user",
          content: String(item.content || "").slice(0, 1000),
        }))
      : [];

    const input = [
      {
        role: "system",
        content: buildSystemPrompt(),
      },
      ...recentHistory,
      {
        role: "user",
        content: message,
      },
    ];

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input,
      temperature: 0.35,
      max_output_tokens: 500,
    });

    const answer = response.output_text || getFallbackAnswer(message);

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Peak Concierge API error:", error);

    return res.status(200).json({
      answer: getFallbackAnswer(req.body?.message),
      fallback: true,
    });
  }
}
