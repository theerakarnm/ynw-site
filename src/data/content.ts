/**
 * ALL user-visible copy lives here (AGENTS.md rule). Strings marked CONFIRM are
 * carried over verbatim from the reference mockup or placeholder drafts that the
 * owner must approve before launch. Do not invent claims, prices or statistics.
 */

export const nav = {
  cta: "Join the wishlist",
  // /support nav: in-page anchors (reference Main.dc.html nav) + BMC CTA.
  supportLinks: [
    { href: "#tiers", label: "Tiers" },
    { href: "#how", label: "How to donate" },
    { href: "#faq", label: "FAQ" },
  ],
  supportCta: "Support YNW",
} as const;

export const hero = {
  eyebrow: "AGENTIC CHAT ▪ COMING SOON",
  supportCta: "Support the founding round",
  titleLines: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  lead: "One chat app for your life, your team and your business. Your AI agents plan, use tools and reply for you, and you decide what they can do alone.",
} as const;

export const wishlistForm = {
  emailLabel: "Email",
  emailPlaceholder: "you@company.com",
  submit: "Join the wishlist",
  submitting: "Joining",
  note: "Launch updates only. Unsubscribe anytime.",
  privacyLink: "Privacy",
  successLine: "On the wishlist",
  successQuestion: "What will you use first?",
  chips: ["Customer chat", "Team workspace", "Personal and communities"],
  honeypotLabel: "Company",
  // Added per the marketing-worker contract; not present in the mockup. CONFIRM wording.
  consentLabel: "Send me occasional launch updates by email.",
  consentRequired: "Please tick the consent box so we can email you.",
  errorInvalid: "Enter a valid email, like you@company.com.",
  errorConsent: "Please tick the consent box so we can email you.",
  errorTurnstile: "Quick check failed. Reload the page and try again.",
  errorRateLimited: "Too many attempts. Try again in a minute.",
  errorNetwork: "Could not save your email. Try again in a minute.",
  errorGeneric: "Could not save your email. Try again in a minute.",
  noscript: "JavaScript is off. Email us and we will add you to the wishlist manually.",
  turnstileLabel: "Spam check", // visually hidden heading for the widget region
} as const;

export const rail = {
  label: "Run progress",
  steps: ["Avatars", "Agents", "Backstage", "Approvals", "Receipts", "Workspace", "Wishlist"],
} as const;

export const ticker = {
  label: "Capabilities",
  items: [
    "AVATARS",
    "BACKSTAGE",
    "APPROVALS",
    "MULTI-AGENT",
    "TOOL CALLING",
    "SHARED WORKSPACES",
    "MCP CONNECTORS",
    "RUN RECEIPTS",
  ],
} as const;

export const scenes = [
  { id: "avatars", num: "01", label: "Avatars", title: "One you. Every role.", lead: "Give each role its own avatar, with its own contacts, knowledge, permissions and agent. A person or an agent can hold the seat, and the conversation never breaks.", caption: "Product concept. Interface and data are illustrative." },
  { id: "agents", num: "02", label: "Agents", title: "Agents that finish the job", lead: "Ask once. The agent plans the steps, calls your tools, hands off to other agents and reports back.", caption: "Product concept. Interface and data are illustrative." },
  { id: "backstage", num: "03", label: "Backstage", title: "Every chat has a backstage.", lead: "Your team and your agents talk, summarize and draft on a private layer beside the conversation. The other side sees only what you send.", caption: "Product concept. Interface and data are illustrative." },
  { id: "approvals", num: "04", label: "Approvals", title: "Nothing important goes out without you.", lead: "You set what each agent may do alone. Anything above that line pauses for your approval.", caption: "Product concept. Interface and data are illustrative." },
  { id: "receipts", num: "05", label: "Receipts", title: "Bring your own agents. Keep the receipts.", lead: "Connect the agents and tools you already use through MCP. Every action records who asked, what it used and who approved it.", caption: "Product concept. Interface and data are illustrative." },
  { id: "workspace", num: "06", label: "Workspace", title: "Friends, teams and communities in one network.", lead: "Agents join with a role, like any other member.", caption: "Product concept. Interface and data are illustrative." },
  { id: "wishlist", num: "07", label: "Wishlist", title: "The last step needs you.", lead: "Join the wishlist and get an email when early access opens.", caption: "" },
] as const;

export const avatarsDemo = {
  originLabel: "You",
  seats: [
    { index: "A", name: "Personal", occupant: "You", occupantInitial: "Y" },
    { index: "B", name: "Business Admin", occupant: "You", occupantInitial: "Y" },
    { index: "C", name: "Community host", occupant: "You", occupantInitial: "Y" },
  ],
  seatList: ["Contacts", "Knowledge", "Permissions", "Agent"],
  swap: [
    { initial: "Y", label: "You", cls: "occ-you" },
    { initial: "B", label: "Agent", cls: "occ-agent", agent: true },
    { initial: "M", label: "Mali", cls: "occ-mali" },
  ],
  threadEyebrow: "Business Admin ▪ Nok",
  threadAuthor: "Nok",
  threadMessage: "สนใจ 20 ชิ้น มีส่วนลดไหมคะ",
} as const;

export const agentsDemo = {
  nokAuthor: "Nok",
  nokMessage: "สนใจ 20 ชิ้น มีส่วนลดไหมคะ",
  agentName: "Business Admin",
  thinking: "Searching 2 sources",
  handoff: "Business Admin → Finance agent",
  planTitle: "Plan ▪ 3 steps",
  steps: ["Check stock", "Read price policy", "Draft quote"],
  tools: [
    { name: 'stock.lookup({ sku: "A-20" })', output: "120 in stock ▪ 0.4s", icon: "database" },
    { name: 'docs.search({ q: "discount policy" })', output: "Over 5% needs approval ▪ 0.9s", icon: "file" },
  ],
  statusRunning: "Running",
  statusDone: "Done",
} as const;

export const backstageDemo = {
  frontWorkLabel: "FRONTSTAGE ▪ NOK SEES THIS",
  frontWorkAuthor: "Nok",
  frontWorkMessage: "สนใจ 20 ชิ้น มีส่วนลดไหมคะ",
  frontHomeLabel: "FRONTSTAGE",
  frontHomeLine: "Family group ▪ 200 unread",
  backWorkLabel: "BACKSTAGE ▪ ONLY YOUR TEAM SEES THIS",
  backHomeLabel: "BACKSTAGE",
  backHomeLine: "Dinner moved to Saturday 18:00. Mom asks who brings dessert.",
  summary: { author: "Business Admin", agent: true, body: "Nok asks for 20 units at a discount. Repeat customer, 3 past orders." },
  mali: { author: "Mali", body: "Offer 8%." },
  draft: { author: "Business Admin", agent: true, body: "ได้เลยค่ะ 20 ชิ้น ลดให้ 8% รวม ฿4,600 ค่ะ" },
} as const;

export const approvalsDemo = {
  nokAuthor: "Nok",
  nokMessage: "สนใจ 20 ชิ้น มีส่วนลดไหมคะ",
  headEyebrow: "APPROVAL REQUIRED",
  headMeta: "Business Admin ▪ 14:36",
  body: "Send this quote to Nok. 8% is above your 5% discount limit.",
  code: 'quote.send({ to: "Nok", units: 20, discount: 0.08, total: "฿4,600" })',
  deny: "Deny",
  approve: "Approve",
  approved: "Approved by you ▪ 14:37",
  denied: "Denied by you ▪ 14:37. Nothing was sent.",
  sent: { author: "Business Admin", body: "ได้เลยค่ะ 20 ชิ้น ลดให้ 8% รวม ฿4,600 ค่ะ" },
  ladderEyebrowless: true,
  ladder: [
    { name: "Suggest", desc: "Drafts it. You send it.", eg: "complaints" },
    { name: "Approve", desc: "Waits for your approval.", eg: "discounts, quotes" },
    { name: "Undo window", desc: "Sends after 5 minutes unless you cancel.", eg: "appointment confirmations" },
    { name: "Auto", desc: "Replies on its own within policy.", eg: "opening hours, address" },
    { name: "Never", desc: "Blocked, whoever asks.", eg: "money transfers, customer data" },
  ],
  ask: { author: "Business Admin", body: "48 of your last 50 price replies went out unedited. Want me to send these myself?" },
} as const;

export const receiptsDemo = {
  diagramLabel: "Your agents connect through MCP to the workspace. Tools by category: web, shell, data and files.",
  diagramBoxes: ["Your agents", "MCP", "Workspace"],
  diagramCats: ["web", "shell", "data", "files"],
  receipt: [
    { dt: "ACTION", dd: "quote.send" },
    { dt: "REQUESTED BY", dd: "Nok, via Business Admin" },
    { dt: "USED", dd: "price-policy.md, stock.lookup" },
    { dt: "APPROVED BY", dd: "you ▪ 14:37" },
  ],
} as const;

export const workspaceDemo = {
  node: { initial: "B", badge: "Business Admin" },
  cards: [
    { index: "A", name: "Everyday", body: "Add by QR. Stickers, cards and mini apps in chat." },
    { index: "B", name: "Work", body: "Channels, threads, search, permissions and audit logs." },
    { index: "C", name: "Community", body: "Servers, roles, drop-in voice rooms and a bot directory." },
    { index: "D", name: "Your customers", body: "No install needed. They reach your avatar through LINE Official Account or a web link." },
  ],
} as const;

/**
 * /support - founding round page. Copy is a verbatim port of the reference
 * mockup (_reference/support-round/Main.dc.html). Bracket placeholders
 * ([RAISED], [GOAL], [N], [BETA DATE]) are the designer's data slots; each is
 * marked CONFIRM and must be filled by the owner before the page is announced.
 */
export const support = {
  nav: {
    tiers: "Tiers",
    how: "How to donate",
    faq: "FAQ",
  },
  hero: {
    eyebrowNum: "00",
    eyebrow: "Founding round",
    title: "Help us build YNW.",
    titleSub: "Join early, at any level.",
    lead: "YNW is one chat app for your everyday chats, your team and your business, with AI agents that plan, use tools and reply for you. We are a small team building it in the open. If you would like to support the beta, you can buy us a coffee or a few. If not, the free wishlist is a great way to follow along.",
    primaryCta: "Buy us a coffee",
    secondaryCta: "How to donate",
  },
  funding: {
    eyebrow: "Founding round",
    badge: "Open",
    raised: "$[RAISED]", // CONFIRM: live total raised (e.g. "$120")
    raisedLabel: "raised toward $[GOAL] for the beta", // CONFIRM: real goal once set
    raisedPct: 0, // CONFIRM: 0-100; lights meter segments in 5% steps
    backersLabel: "[N] backers so far", // CONFIRM: backer count
    coffeeLabel: "1 coffee = $5",
    meterLabel: "0% of goal raised",
  },
  tiers: {
    eyebrowNum: "01",
    eyebrow: "Tiers",
    title: "Thank-you gifts for early backers",
    lead: "Any amount helps. If you would like something back, here is what each level comes with. Every tier includes the one before it, and every price is a one-time payment in US dollars.",
    youLabel: "For you",
    teamsLabel: "For shops and teams",
    oneTime: "one-time",
    list: [
      {
        index: "01",
        badge: "1 coffee",
        name: "Supporter",
        price: "$5",
        blurb: "A small thank-you, and a say in what we build next.",
        items: [
          "Your name on the Founding supporters wall, only if you opt in",
          "Supporter badge on your YNW profile",
          "Monthly behind-the-scenes update",
          "A vote on what we build next",
        ],
        cta: "Choose Supporter",
      },
      {
        index: "02",
        badge: "3 coffees · First 300",
        name: "Early Bird",
        price: "$15",
        blurb: "Start using YNW on the first day of the beta.",
        plusLine: "Everything in Supporter, plus",
        items: [
          "Beta access without waiting",
          "3 months of the paid plan",
          "1 extra avatar seat",
        ],
        cta: "Choose Early Bird",
      },
      {
        index: "03",
        badge: "8 coffees",
        name: "Founder",
        price: "$40",
        blurb: "A full year of YNW, and a founder price you keep.",
        plusLine: "Everything in Early Bird, plus",
        highlight: true,
        items: [
          "12 months of the paid plan",
          "Founder price locked while you stay subscribed",
          "3 avatar seats",
          "Monthly bonus agent credits",
          "Private founder group on LINE",
        ],
        cta: "Choose Founder",
      },
      {
        index: "04",
        badge: "25 coffees",
        name: "Business Founder",
        price: "$125",
        blurb: "An agent that answers your customers, set up together with you.",
        items: [
          "12 months of the Business plan",
          "5 team seats",
          "1:1 setup session to connect your LINE OA",
          "1 agent built from your price list and FAQ",
          "Priority support",
        ],
        cta: "Choose Business Founder",
      },
      {
        index: "05",
        badge: "100+ coffees · 10-20 partners",
        name: "Founding Partner",
        price: "$500+",
        blurb: "Shape YNW with us and connect it to your own systems.",
        plusLine: "Everything in Business Founder, plus",
        items: [
          "Co-design calls with the founder",
          "Your logo in the Founding partners section",
          "1 custom MCP connector to your own system",
          "An optional case study",
        ],
        cta: "Choose Founding Partner",
      },
    ],
  },
  wishlistStrip: {
    eyebrowNum: "00",
    eyebrow: "Wishlist · Free",
    title: "Just want to follow along? The wishlist is free.",
    lead: "Launch email, a place in the queue, and a referral link to move up. You need it to donate too, so it is a good place to start.",
    cta: "Join the wishlist",
  },
  how: {
    eyebrowNum: "02",
    eyebrow: "How to donate",
    title: "Four steps on Buy Me a Coffee",
    lead: "We match your donation to you by email, so the email you type on Buy Me a Coffee has to be the same one you used on the wishlist.",
    steps: [
      { title: "Join the wishlist", body: "Sign up with your email. Skip this if you are already on it." },
      { title: "Pick the number of coffees", body: "Open Buy Me a Coffee and enter the coffees for your tier. 1 coffee is $5, so Founder is 8 coffees." },
      { title: "Put your wishlist email in Name", body: 'Type your wishlist email in the Name field, and the tier name in the message. Tick "Make this message private" so your email is not shown publicly.', highlight: true },
      { title: "Pay, and you are done", body: "We confirm by email within [N] days. Your perks start when the beta opens on [BETA DATE]." }, // CONFIRM: N + beta date
    ],
    example: {
      caption: "Example · What to type",
      coffeesLabel: "Coffees",
      coffeeCounts: ["1", "3", "8"],
      coffeeHighlighted: 2,
      nameLabel: "Name or @yoursocial",
      nameValue: "you@example.com",
      nameHint: "The same email you used on the wishlist",
      messageLabel: "Message",
      messageValue: "Founder",
      messageHint: "The tier you chose",
      privateLabel: "Make this message private",
      totalLabel: "Total",
      totalValue: "$40",
    },
  },
  faq: {
    eyebrowNum: "03",
    eyebrow: "FAQ",
    title: "Good to know",
    items: [
      { q: "Is this a donation or a pre-order?", a: "A bit of both. You support the beta now, and the gifts for your tier arrive when YNW opens to backers." },
      { q: "Why put my email in the Name field?", a: "It is how we find you on the wishlist and turn on your perks. Mark the message private so only we can see it." },
      { q: "Will my name be public?", a: "Only if you opt in. The Founding supporters wall is opt-in for every tier." },
      { q: "When does the beta open?", a: "[BETA DATE]. Early Bird and higher get in first, without waiting in the queue." }, // CONFIRM: beta date
    ],
  },
  closing: {
    eyebrow: "Your Next Wave",
    title: "Thanks for being here early.",
    lead: "Whether you donate or just join the wishlist, it helps.",
    cta: "Buy us a coffee",
  },
} as const;

export const closing = {
  eyebrow: "WAITING FOR YOU",
} as const;

export const footer = {
  slogan: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  supportTitle: "Support YNW",
  linksTitle: "Links",
  // hash targets resolve to same-page anchors on /support, /support/#... elsewhere.
  supportLinks: [
    { hash: "tiers", label: "Tiers" },
    { hash: "how", label: "How to donate" },
    { hash: "faq", label: "FAQ" },
  ],
  bmc: "Buy Me a Coffee",
  wishlist: "Wishlist",
  privacy: "Privacy",
  copyright: "© 2026 Eukron team",
  payments: "Payments by Buy Me a Coffee · Prices in USD",
  mark: "YNW",
} as const;

export const thanks = {
  eyebrow: "WAITING FOR YOU",
  title: "You are on the wishlist.",
  lead: "Confirm your email if you have not yet - your spot and referral link are live.",
  positionLabel: "Wishlist position",
  referralLabel: "Your referral link",
  referralHint: "Every friend who joins through your link moves you up.",
  copy: "Copy",
  copied: "Copied",
  profileTitle: "Tell us what to build first",
  profileLead: "Two fields, fully optional. Skip if you prefer.",
  nameLabel: "Name",
  namePlaceholder: "How should we address you?",
  roleLabel: "Role",
  rolePlaceholder: "Pick a role",
  roles: ["Founder", "Operator", "Community host", "Developer", "Other"],
  useCaseLabel: "What do you need?",
  useCasePlaceholder: "One or two sentences is plenty.",
  save: "Save answers",
  saving: "Saving",
  skip: "Skip for now",
  saved: "Saved. See you at launch.",
  saveError: "Could not save right now. You can skip and finish later.",
} as const;

export const unsubscribed = {
  eyebrow: "UNSUBSCRIBED",
  title: "You are off the list.",
  lead: "No more launch emails. If you change your mind, the wishlist is still there.",
  back: "Back to YNW",
} as const;

export const notFound = {
  code: "404 ▪ PAGE NOT FOUND",
  title: "This wave does not exist.",
  lead: "The page moved or never shipped. The homepage is the only shore right now.",
  back: "Back to the homepage",
} as const;

/**
 * Privacy page copy. PLACEHOLDER - CONFIRM with the owner before launch.
 * Structure follows what the wishlist form actually collects (email, consent,
 * attribution, Turnstile) and what the marketing worker stores.
 */
export const privacy = {
  eyebrow: "PRIVACY",
  title: "Privacy",
  updated: "Last updated ▪ 2026-11-03",
  lead: "What we collect on this page, why, and how to leave.",
  sections: [
    {
      h: "What we collect",
      p: [
        "When you join the wishlist we store your email address, the consent you gave, and basic anti-abuse data (a spam-check token and a honeypot field).",
        "If you arrived through a campaign link we also keep the click context: utm parameters, the referrer, the landing path and the ad click ids (fbclid, gclid, ttclid). This is first-party data, kept in a first-party cookie for 30 days, first touch wins.",
      ],
    },
    {
      h: "What we do with it",
      p: [
        "We use your email to send launch updates and your wishlist confirmation. The referral code in your link tells us who invited whom so early access can roll out in order.",
        "Event pings (for example that a form was started) carry no cookies beyond the attribution cookie and are skipped when your browser sends Do Not Track.",
      ],
    },
    {
      h: "What we never do",
      p: [
        "We do not sell your data, we do not run third-party ad trackers on this page, and we do not send marketing email without your consent.",
      ],
    },
    {
      h: "Leaving",
      p: [
        "Every email contains an unsubscribe link. One click, confirmed on this site, no questions asked.",
      ],
    },
    {
      h: "Contact",
      p: [
        "Questions about your data: privacy@ynw.example", // CONFIRM: real contact address
      ],
    },
  ],
} as const;
