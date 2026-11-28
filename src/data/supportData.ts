import {
  AlertCircle,
  BedDouble,
  CalendarCheck,
  Car,
  Compass,
  CreditCard,
  FileCheck2,
  Info,
  MessageSquare,
  Plane,
  Ticket,
} from "lucide-react";

export interface SupportFaqItem {
  question: string;
  answer: string;
}

export interface SupportTopicItem {
  slug: string;
  title: string;
  answer: string;
  faqs: SupportFaqItem[];
}

export interface SupportCategory {
  id: string;
  title: string;
  icon: typeof CalendarCheck;
  items: SupportTopicItem[];
}

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: "booking-modifications",
    title: "Booking & Modifications",
    icon: CalendarCheck,
    items: [
      {
        slug: "booking-change",
        title: "Booking change or reschedule",
        answer:
          "You can request a batch or date reschedule up to 15 days before your departure date, subject to availability on the upcoming Ladakh, Zanskar, or Spiti batch.",
        faqs: [
          {
            question: "Can I modify my booking?",
            answer:
              "After booking, modifications are subject to batch availability and operational feasibility. Requests made at least 15 days before departure are processed smoothly.\n\nFor assistance, please reach out to us at contact@storiesbyfoot.com, and our support team will guide you with the next steps.",
          },
          {
            question: "How can I change my travel date or batch?",
            answer:
              "Email contact@storiesbyfoot.com with your Booking ID and preferred new departure date. Once our team confirms seat and bike availability on the new batch, we will issue an updated confirmation.",
          },
        ],
      },
      {
        slug: "how-to-book",
        title: "How do I book a trip?",
        answer:
          "Browse our destinations, select a package, and complete the booking form. You'll receive a confirmation email once your booking is processed.",
        faqs: [
          {
            question: "How do I book a trip with Stories by Foot?",
            answer:
              "Visit the Destinations page, choose your preferred Ladakh, Zanskar, or Spiti package, select your riding option (Own Bike, Rental Dual/Solo, or Tempo Traveller), and complete the booking form.",
          },
          {
            question: "How much token amount is required to confirm my seat?",
            answer:
              "You can lock your batch seat with the booking token shown on the package page. The remaining balance is due 15 days prior to departure.",
          },
        ],
      },
      {
        slug: "booking-cancellation",
        title: "Can I cancel my booking?",
        answer:
          "Cancellation policies vary by package. Please check your booking confirmation or contact support for specific cancellation terms.",
        faqs: [
          {
            question: "What is the cancellation and refund policy?",
            answer:
              "Cancellations requested 30+ days before departure qualify for maximum refund or full credit toward a future batch. Cancellations closer to departure incur tiered retention charges as per your booking terms.",
          },
          {
            question: "How do I submit a cancellation request?",
            answer:
              "Write to contact@storiesbyfoot.com from your registered email address with your Booking ID and reason for cancellation.",
          },
        ],
      },
      {
        slug: "traveller-changes",
        title: "Traveller changes",
        answer:
          "Rider or pillion name swaps and emergency contact updates can be made free of charge up to 7 days prior to departure so your Inner Line Permits are issued accurately.",
        faqs: [
          {
            question: "Can I transfer my booking to another rider or friend?",
            answer:
              "Yes, traveller name transfers are permitted free of charge up to 7 days before departure, provided we receive the new traveller's ID and Driving Licence copy for permits.",
          },
          {
            question: "How do I update my emergency contact or ID details?",
            answer:
              "Reply to your booking confirmation email or contact support at contact@storiesbyfoot.com with the updated details.",
          },
        ],
      },
    ],
  },
  {
    id: "vouchers-tickets-driver",
    title: "Vouchers, Permits & Captain Details",
    icon: Ticket,
    items: [
      {
        slug: "captain-marshal-details",
        title: "Trip Captain & Marshal details",
        answer:
          "Your Trip Captain, backup mechanic, and WhatsApp group invite are shared 48 hours before the expedition start date.",
        faqs: [
          {
            question: "When will I receive my Trip Captain's contact details?",
            answer:
              "Your batch WhatsApp group and Trip Captain contact number are shared 48 hours prior to Day 1 arrival in Leh or Manali.",
          },
          {
            question: "Who handles bike handovers and route briefings?",
            answer:
              "Your Trip Captain and lead mechanic conduct a mandatory bike check, gear fitting, and route safety briefing on Day 1.",
          },
        ],
      },
      {
        slug: "voucher-booking-id",
        title: "Voucher and Booking ID issues",
        answer:
          "If you haven't received your booking voucher within 2 hours of payment, check your spam folder or email contact@storiesbyfoot.com with your payment reference.",
        faqs: [
          {
            question: "I paid the booking amount but didn't get my confirmation email",
            answer:
              "Please check your Promotions or Spam folder first. If it's not there within 2 hours, email your payment screenshot to contact@storiesbyfoot.com and we will resend your voucher.",
          },
        ],
      },
    ],
  },
  {
    id: "permits-documents-insurance",
    title: "Permits, ID & Insurance",
    icon: FileCheck2,
    items: [
      {
        slug: "inner-line-permit",
        title: "Inner Line Permit (ILP) & PAP",
        answer:
          "We arrange all Inner Line Permits for Nubra Valley, Pangong Lake, Tso Moriri, and Hanle. Carry 2 original government photo IDs and a valid Driving Licence for riders.",
        faqs: [
          {
            question: "Do I need to apply for Ladakh Inner Line Permits myself?",
            answer:
              "No. Stories by Foot arranges all Inner Line Permits (ILP) for Nubra Valley, Pangong, Tso Moriri, and Hanle for our group batches.",
          },
          {
            question: "Which documents must I carry on the trip?",
            answer:
              "Carry your original Aadhaar Card / Passport, 2 photocopies, and an original valid two-wheeler Driving Licence (mandatory for all riders).",
          },
        ],
      },
      {
        slug: "travel-insurance",
        title: "Travel Insurance Issues",
        answer:
          "We strongly recommend high-altitude travel & medical insurance covering evacuation above 14,000 ft for all Ladakh and Zanskar expeditions.",
        faqs: [
          {
            question: "Is travel insurance included in the package?",
            answer:
              "Personal travel and medical insurance is not included by default. We strongly advise purchasing adventure coverage that includes high-altitude riding above 14,000 ft.",
          },
        ],
      },
      {
        slug: "passport-foreign-nationals",
        title: "Passport & Foreign National queries",
        answer:
          "Foreign nationals require a Protected Area Permit (PAP) in groups of 2 or more along with valid Indian visa copies. Reach out at least 10 days before departure.",
        faqs: [
          {
            question: "Can foreign nationals join Ladakh and Zanskar bike trips?",
            answer:
              "Yes! Foreign nationals need a Protected Area Permit (PAP) issued in Leh (minimum 2 foreign nationals required for restricted circuits) and must share passport + visa copies 10 days in advance.",
          },
        ],
      },
    ],
  },
  {
    id: "payments-refunds-invoices",
    title: "Payments, Refunds & Invoices",
    icon: CreditCard,
    items: [
      {
        slug: "offers-discounts",
        title: "Offers, Discounts, or Gift Vouchers",
        answer:
          "Group discounts (4+ riders) and early-bird promo codes can be applied at checkout or via our trip advisor before paying your booking token.",
        faqs: [
          {
            question: "Do you offer group discounts for friends or riding clubs?",
            answer:
              "Yes, groups of 4 or more riders receive special group pricing. Contact our team before booking to get your custom group quote.",
          },
        ],
      },
      {
        slug: "invoice-gst",
        title: "Invoice & GST Document Requests",
        answer:
          "GST invoices are issued automatically after full payment. Share your company GSTIN with our support team if you need a corporate invoice.",
        faqs: [
          {
            question: "How do I get a GST invoice for my trip booking?",
            answer:
              "Email contact@storiesbyfoot.com with your Booking ID, company name, and GSTIN prior to final payment.",
          },
        ],
      },
      {
        slug: "token-balance-schedule",
        title: "Token Amount & Balance Schedule",
        answer:
          "Reserve your seat with a booking token; the remaining balance is due 15 days before the trip start date.",
        faqs: [
          {
            question: "When is the remaining trip balance due?",
            answer:
              "The balance amount must be cleared at least 15 days before your batch start date so we can finalize hotels, bikes, and permits.",
          },
        ],
      },
      {
        slug: "refund-timelines",
        title: "Refund timelines & status",
        answer:
          "Approved refunds are processed back to the original payment method within 7–10 business days.",
        faqs: [
          {
            question: "How long does a refund take to reflect in my bank account?",
            answer:
              "Once approved, refunds are initiated within 48 hours and credit to your original payment method within 7–10 business days.",
          },
        ],
      },
      {
        slug: "failed-payment",
        title: "Failed UPI or Card payment",
        answer:
          "If your amount was debited without confirmation, it is auto-reversed by your bank within 3–5 business days, or we can verify it manually via screenshot.",
        faqs: [
          {
            question: "Money was deducted but booking didn't confirm — what should I do?",
            answer:
              "Share the UPI/bank transaction ID with contact@storiesbyfoot.com. If it didn't settle with our gateway, your bank auto-refunds it within 3–5 business days.",
          },
        ],
      },
    ],
  },
  {
    id: "accommodation-issues",
    title: "Accommodation & Camps",
    icon: BedDouble,
    items: [
      {
        slug: "late-check-in",
        title: "Late check-in at Leh or Manali",
        answer:
          "Inform your Trip Captain in advance if your flight or bus arrives late so hotel reception keeps your room and dinner ready.",
        faqs: [
          {
            question: "What if I arrive late at the Leh or Manali hotel?",
            answer:
              "Just notify your Trip Captain on the batch WhatsApp group. Your room is reserved under your name and check-in is available 24/7.",
          },
        ],
      },
      {
        slug: "special-room-request",
        title: "Special Room or Bedding Request",
        answer:
          "Twin-sharing, double-bed, or triple-sharing preferences are noted during booking and accommodated based on property availability.",
        faqs: [
          {
            question: "Can couples or friends request a dedicated double or twin room?",
            answer:
              "Yes, mention your room-sharing preference in the booking notes or email us at least 10 days before departure.",
          },
        ],
      },
      {
        slug: "food-dietary",
        title: "Food or Dietary Concern",
        answer:
          "All expeditions include vegetarian/non-vegetarian MAP meals (breakfast & dinner). Let us know in advance for Jain or allergy-specific meals.",
        faqs: [
          {
            question: "Are Jain or special dietary meals available?",
            answer:
              "Yes, hotels in Leh, Nubra, and Manali can prepare Jain or allergy-friendly meals with advance notice.",
          },
        ],
      },
      {
        slug: "hot-water-amenities",
        title: "Hot Water & Camp Amenities",
        answer:
          "In remote camps like Pangong, Sarchu, and Padum, hot water is provided in buckets during morning hours due to high-altitude solar/power limits.",
        faqs: [
          {
            question: "Do camps at Pangong and Sarchu have attached washrooms and hot water?",
            answer:
              "Yes, all stays include attached washrooms. At high-altitude camps (Pangong/Sarchu), hot water is supplied in buckets during fixed morning hours.",
          },
        ],
      },
      {
        slug: "room-upgrade",
        title: "Room Upgrade Options",
        answer:
          "Single-occupancy room upgrades are available on request for an additional supplement prior to departure.",
        faqs: [
          {
            question: "Can I book a single-occupancy room?",
            answer:
              "Yes, single-room supplements can be added during booking or by contacting our team at least 10 days before the trip.",
          },
        ],
      },
    ],
  },
  {
    id: "flight-arrival-issues",
    title: "Flight & Arrival Issues",
    icon: Plane,
    items: [
      {
        slug: "leh-flight-delayed",
        title: "Leh Flight Cancelled or Delayed",
        answer:
          "Leh weather delays are common. Message our 24/7 trip desk immediately so we can adjust your airport pickup and acclimatization schedule.",
        faqs: [
          {
            question: "What happens if my morning flight to Leh is delayed or cancelled?",
            answer:
              "Inform your Trip Captain immediately with your revised flight number. Because Day 1 is an acclimatization rest day in Leh, most delays are easily absorbed.",
          },
        ],
      },
      {
        slug: "airport-pickup",
        title: "Airport Pickup & Drop timings",
        answer:
          "Standard group airport transfers are scheduled for morning Leh arrivals. Private pickups can be arranged on request for odd-hour flights.",
        faqs: [
          {
            question: "Is airport pickup included in the Leh-to-Leh package?",
            answer:
              "Yes, group airport pickup and drop from Kushok Bakula Rimpochee Airport (IXL), Leh is included on Day 1 and the final departure day.",
          },
        ],
      },
    ],
  },
  {
    id: "vehicle-bike-issues",
    title: "Bikes, Backup & Transfers",
    icon: Car,
    items: [
      {
        slug: "bike-mechanical-issues",
        title: "Royal Enfield Himalayan & Bike Issues",
        answer:
          "Our convoy travels with a dedicated mechanic and spare parts. Any mechanical issue on the road is fixed on-spot or swapped with a standby bike.",
        faqs: [
          {
            question: "What if my rental bike has a breakdown during the ride?",
            answer:
              "Our dedicated Royal Enfield mechanic rides with the convoy and carries essential spares (clutch plates, cables, tubes, spark plugs). Major faults are handled via standby bikes.",
          },
        ],
      },
      {
        slug: "backup-vehicle",
        title: "Backup Tempo Traveller / Cab issues",
        answer:
          "A backup vehicle accompanies every bike batch to carry your main luggage, oxygen cylinders, and tired riders if needed.",
        faqs: [
          {
            question: "Can I sit in the backup vehicle if I feel tired or unwell?",
            answer:
              "Yes, the backup vehicle always has spare seating for riders needing rest while our marshal rides or loads the motorcycle.",
          },
        ],
      },
      {
        slug: "security-deposit",
        title: "Security Deposit for Rental Bikes",
        answer:
          "A refundable bike security deposit (typically ₹10,000 per motorcycle) is collected at bike handover and refunded upon safe return.",
        faqs: [
          {
            question: "When is the bike security deposit refunded?",
            answer:
              "The refundable deposit is returned immediately after the final trip inspection when you hand back the motorcycle in Leh or Manali.",
          },
        ],
      },
    ],
  },
  {
    id: "riding-gear-packing",
    title: "Gear, Packing & Activities",
    icon: Compass,
    items: [
      {
        slug: "packing-list",
        title: "What should I bring on a trip?",
        answer:
          "A detailed packing list will be sent to you via email after booking confirmation. It varies based on the destination and type of trip.",
        faqs: [
          {
            question: "What essential layers and gear should I pack for Ladakh?",
            answer:
              "Pack thermal innerwear, fleece mid-layer, waterproof riding jacket/windcheater, waterproof gloves, UV sunglasses, sunscreen (SPF 50+), lip balm, and waterproof riding boots.",
          },
        ],
      },
      {
        slug: "riding-gear",
        title: "Riding Jacket, Knee Guards & Helmet",
        answer:
          "Standard riding gear (knee/elbow guards and helmet) is provided with bike packages. Bring your own snug-fit helmet and waterproof gloves if preferred.",
        faqs: [
          {
            question: "Are helmets and knee/elbow guards included?",
            answer:
              "Yes, helmet and knee/elbow guards are included for riders on rental packages. We still recommend bringing your own personal helmet for best fit.",
          },
        ],
      },
      {
        slug: "weather-pass-closure",
        title: "Weather or Pass Closure",
        answer:
          "If BRO closes a high pass like Khardung La or Baralacha La due to snowfall, our team reroutes safely via the best open alternate circuit.",
        faqs: [
          {
            question: "What happens if a high mountain pass closes due to snow or landslides?",
            answer:
              "Rider safety comes first. Our Trip Captain coordinates with local BRO updates and reroutes the convoy via safe alternate passes or adjusts the night halt.",
          },
        ],
      },
      {
        slug: "luggage-limit",
        title: "Luggage Weight & Bag Type",
        answer:
          "Pack in a soft rucksack or duffel bag (max 15 kg) instead of hard-shell trolley suitcases so it fits easily in the backup vehicle.",
        faqs: [
          {
            question: "Can I bring a hard-shell trolley suitcase?",
            answer:
              "Hard-shell suitcases are discouraged because they can crack on bumpy Himalayan roads and take extra space in the backup vehicle. Use a 50–60L soft duffel or rucksack.",
          },
        ],
      },
      {
        slug: "drone-rules",
        title: "Photography & Drone Rules",
        answer:
          "Drones are strictly prohibited near military zones and border areas in Ladakh, Pangong, and Hanle. Always check with your Trip Captain first.",
        faqs: [
          {
            question: "Can I fly a drone during the Ladakh or Zanskar trip?",
            answer:
              "Drones are strictly banned near military installations, Pangong, Hanle, and border roads. Only fly in permitted non-restricted zones after confirming with your Trip Captain.",
          },
        ],
      },
    ],
  },
  {
    id: "emergencies-safety",
    title: "Emergencies & Altitude Safety",
    icon: AlertCircle,
    items: [
      {
        slug: "ams-altitude-sickness",
        title: "AMS & Altitude Sickness",
        answer:
          "Every batch includes a mandatory Day 1 acclimatization rest in Leh, daily oximeter checks, portable oxygen cylinders, and first-aid kits.",
        faqs: [
          {
            question: "How does Stories by Foot handle AMS (Acute Mountain Sickness)?",
            answer:
              "We mandate a full Day 1 acclimatization rest in Leh, monitor SpO2 oxygen levels morning and evening, carry medical-grade oxygen cylinders in the backup vehicle, and follow gradual ascent profiles.",
          },
        ],
      },
      {
        slug: "lost-id-luggage",
        title: "Lost ID or Luggage",
        answer:
          "Report lost items immediately to your Trip Captain so we can coordinate with hotels, checkposts, and local authorities.",
        faqs: [
          {
            question: "What should I do if I misplace my ID or bag during the tour?",
            answer:
              "Alert your Trip Captain right away so we can contact the previous night's hotel or checkpost before the convoy moves too far ahead.",
          },
        ],
      },
      {
        slug: "breakdown-accident",
        title: "On-road Breakdown or Accident",
        answer:
          "Stay with the convoy; our Trip Captain and backup vehicle coordinate immediate medical support, bike recovery, and hospital transfers if required.",
        faqs: [
          {
            question: "What medical support is available during an emergency on the highway?",
            answer:
              "Our Trip Captains are trained in high-altitude first aid and carry trauma kits, oxygen, and satellite/local emergency contacts to reach the nearest army medical camp or hospital.",
          },
        ],
      },
      {
        slug: "medical-evacuation",
        title: "Medical Emergency Evacuation",
        answer:
          "In case of severe AMS or injury, our team arranges immediate descent to lower altitude or evacuation to SNM Hospital, Leh.",
        faqs: [
          {
            question: "How are severe medical emergencies handled in remote valleys?",
            answer:
              "Rapid descent is the #1 treatment for severe AMS. Our backup vehicle immediately transports the traveler to lower altitude or SNM Hospital in Leh.",
          },
        ],
      },
    ],
  },
  {
    id: "general-queries",
    title: "General Queries & Assistance",
    icon: Info,
    items: [
      {
        slug: "custom-group-trips",
        title: "New booking & Custom Group Trips",
        answer:
          "Planning a private friends, family, or corporate bike trip? Reach out via Contact Us with your preferred dates and group size for a custom itinerary.",
        faqs: [
          {
            question: "Can you organize a private custom trip for my group?",
            answer:
              "Yes! Share your dates, group size, and preferred circuit via our Contact page and our expedition planners will craft a private itinerary.",
          },
        ],
      },
      {
        slug: "solo-female-safety",
        title: "Solo Rider & Female Traveler Safety",
        answer:
          "Over 40% of our batch travelers join solo. Female travelers are paired with female roommates and supported by experienced Trip Captains throughout.",
        faqs: [
          {
            question: "Is it safe for solo female travelers to join group bike trips?",
            answer:
              "Absolutely. Many solo female riders join every batch. Female travelers get same-gender room pairing, verified stays, and full convoy support.",
          },
        ],
      },
      {
        slug: "mobile-network",
        title: "Mobile Network & Connectivity",
        answer:
          "Only postpaid SIMs (Airtel, Jio, BSNL) work in Ladakh and Zanskar. Prepaid SIMs from outside J&K/Ladakh do not get network.",
        faqs: [
          {
            question: "Which mobile SIM works in Ladakh and Zanskar?",
            answer:
              "Only postpaid SIM cards (Airtel, Jio, or BSNL) work in Ladakh. Prepaid SIMs issued outside J&K/Ladakh will have zero signal.",
          },
        ],
      },
      {
        slug: "itinerary-inclusions",
        title: "Itinerary Inclusions & Exclusions",
        answer:
          "Each destination package page lists exact inclusions (bike, fuel, stays, meals, permits, backup) and exclusions clearly before booking.",
        faqs: [
          {
            question: "Where can I check exact package inclusions and exclusions?",
            answer:
              "Open your selected package on the Destinations page and scroll to the Inclusions & Exclusions tab for the complete item-by-item breakdown.",
          },
        ],
      },
      {
        slug: "best-season",
        title: "Best Season to Visit Ladakh & Spiti",
        answer:
          "Late May to early October is ideal for Ladakh and Zanskar bike circuits; Spiti is accessible year-round with winter expeditions from November to March.",
        faqs: [
          {
            question: "When is the best month for a Ladakh bike trip?",
            answer:
              "June to September offers the best combination of open high passes, clear mountain views, and pleasant daytime riding temperatures.",
          },
        ],
      },
    ],
  },
  {
    id: "feedback-complaints",
    title: "Feedback & Complaints",
    icon: MessageSquare,
    items: [
      {
        slug: "raise-complaint",
        title: "Raise a Trip Complaint",
        answer:
          "If something didn't meet expectations during your trip, write to contact@storiesbyfoot.com with your Booking ID and our operations lead will respond within 24 hours.",
        faqs: [
          {
            question: "How do I escalate an issue from my recent trip?",
            answer:
              "Email contact@storiesbyfoot.com with your Booking ID and trip dates. Our operations manager reviews every escalation within 24 business hours.",
          },
        ],
      },
      {
        slug: "share-feedback",
        title: "Share Trip Feedback & Photos",
        answer:
          "We love hearing your road stories! Reply to your post-trip email or tag @storiesbyfoot to get featured in our traveler gallery.",
        faqs: [
          {
            question: "Where can I share my trip review and photos?",
            answer:
              "You can tag @storiesbyfoot on Instagram or email your favorite road photos to contact@storiesbyfoot.com.",
          },
        ],
      },
    ],
  },
];
