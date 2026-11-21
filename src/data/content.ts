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
  eyebrow: "CHAT APP WITH AN ASSISTANT ▪ COMING SOON",
  supportCta: "Support the founding round",
  titleLines: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  lead: "A chat app for your life, your team and your business. Add friends by QR code, send stickers, and call your own Assistant in any chat. You decide what it can do alone.",
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
  errorRateLimited: "Too many attempts. Try again in an hour.",
  errorNetwork: "Could not save your email. Try again in a minute.",
  errorGeneric: "Could not save your email. Try again in a minute.",
  noscript: "JavaScript is off. Email us and we will add you to the wishlist manually.",
  turnstileLabel: "Spam check", // visually hidden heading for the widget region
} as const;

export const rail = {
  label: "Run progress",
  steps: ["Chat", "Assistant", "Accounts", "Approval Modes", "Workflows", "Agent relay", "Developers", "Planned", "Wishlist"],
} as const;

export const ticker = {
  label: "Capabilities",
  items: ["ASSISTANT", "ACCOUNTS", "APPROVAL MODES", "WORKFLOWS", "AGENT RELAY", "STICKERS", "MCP"],
} as const;

export const scenes = [
  {
    id: "chat", num: "01", label: "Chat", phone: true,
    title: "A chat app first.",
    lead: "Add a friend by QR code. Talk one to one or in a group. Send stickers.",
    steps: ["Scan a QR code to add a friend", "Say hello one to one", "Start a group", "Send a sticker"],
    replay: "Replay Chat scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "assistant", num: "02", label: "Assistant", phone: true,
    title: "200 unread. One line to catch up.",
    lead: "Mention your Assistant in any chat. It reads what you can already see, tells you what changed, and drafts your reply. Only you see the answer.",
    steps: [
      "The family group keeps moving while you work.",
      "You type @Assistant in the chat.",
      "It reads the messages and finds what was decided.",
      "You get a summary and a reply ready to send.",
    ],
    receipt: "Summarised 200 messages from Family group. 1 reply is ready to send.",
    replay: "Replay Assistant scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "accounts", num: "03", label: "Accounts", phone: true,
    title: "One you. Several Accounts.",
    lead: "You sign in once as one User. You can own several Accounts, for example Personal, a shop and a team. Other people cannot see that they belong to one User.",
    steps: [
      "Personal, Shop and Team are equal Accounts.",
      "Each Account has its own contacts.",
      "Each Account has its own Assistant permissions.",
      "The free plan includes up to 3 Accounts.", // CONFIRM: limit from product-v1
    ],
    replay: "Replay Accounts scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "approval-modes", num: "04", label: "Approval Modes", phone: true,
    title: "You decide what it does alone.",
    lead: "Pick how much your Assistant may do without asking. New Accounts start on Auto.",
    replay: "Replay Approval Modes scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "workflows", num: "05", label: "Workflows", phone: true,
    title: "Say it once. It runs every time.",
    lead: "Describe a routine in plain language. The Assistant turns it into visible steps once. You confirm, and it runs on schedule. Confirming never removes the actions that always ask.",
    steps: [
      "You type the routine.",
      "The Assistant compiles it into blocks.",
      "You confirm the steps.",
      "The Workflow runs. A model is called only in AI steps.",
    ],
    receipt: "Ran Friday 17:00. Actor: Workflow.",
    replay: "Replay Workflows scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "relay", num: "06", label: "Agent relay", phone: true,
    title: "One message. Two chats.",
    lead: "Ask your Assistant to carry a message from one chat to another. The receipt shows which Account it used and who asked.",
    steps: [
      "Nok sends an order in the shop chat.",
      "You ask @Assistant to send it to the team as a PDF.",
      "The Assistant creates order-0142.pdf.",
      "It posts the file in the Shop team group.",
    ],
    receipt: "Account: Baan Khanom | Actor: Assistant | Asked by: Mali",
    replay: "Replay Agent relay scene",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "developers", num: "07", label: "Developers", phone: true,
    title: "Connect your own system.",
    lead: "Your server can operate one of your Accounts over HTTP, like a chat platform API. The HTTP API is planned. MCP is part of v1.",
    receipt: "Account: Baan Khanom | Actor: Integration (order-sync)",
    receiptTag: "Planned",
    replay: "Run request",
    replayText: "Run request",
    caption: "Product concept. Interface and data are illustrative.",
  },
  {
    id: "planned", num: "08", label: "Planned",
    title: "Planned, not promised for v1.",
    lead: "These are on the list. None has a date.",
    caption: "Product concept. Interface and data are illustrative.",
  },
  { id: "wishlist", num: "09", label: "Wishlist", title: "The last step needs you.", lead: "Join the wishlist and get an email when early access opens.", caption: "" },
] as const;

export const phone = {
  composer: "Message",
  // Sticker bubbles carry this label: the pack comes from the official YNW Account.
  stickerLabel: "YNW",
} as const;

export const chatDemo = {
  start: { initials: "+", name: "Add friend", sub: "Scan a QR code" },
  friend: { initials: "ม", name: "Mali", sub: "Friend" },
  group: { initials: "ทริป", name: "Weekend trip", sub: "3 members" },
  qrLabel: "Mali's QR code",
  added: "You added Mali by QR code",
  hello: "Hi Mali",
  reply: { who: "Mali", initial: "ม", text: "สวัสดี ยินดีที่ได้รู้จัก" },
  groupStarted: "You started the group Weekend trip",
  groupMessages: [
    { who: "Mali", initial: "ม", text: "เสาร์นี้ไปทะเลกันไหม" },
    { who: "You", initial: "", text: "ไปสิ", me: true },
    { who: "Ploy", initial: "พ", text: "Count me in" },
  ],
} as const;

export const assistantDemo = {
  header: { initials: "ครอบ", name: "Family group", sub: "8 members" },
  messages: [
    { who: "แม่", initial: "ม", text: "เย็นนี้ใครว่างบ้าง" },
    { who: "พลอย", initial: "พ", text: "เลื่อนเป็นวันเสาร์ได้ไหม" },
    { who: "พ่อ", initial: "พ", text: "เสาร์ได้ 6 โมงเย็น" },
    { who: "ยาย", initial: "ย", sticker: true },
    { who: "พลอย", initial: "พ", text: "จองโต๊ะที่บ้านยายเลยนะ" },
    { who: "น้า", initial: "น", text: "ส่งรูปมา 12 รูป" },
    { who: "แม่", initial: "ม", text: "แล้วใครเอาขนมไป" },
  ],
  mention: "@Assistant",
  ask: " สรุปให้หน่อย",
  private: "Visible only to you",
  notice: "An Assistant is used in this chat. Only the person who asked sees its answer.",
  panelWorking: "Assistant is working",
  panelDone: "Assistant",
  only: "Only you",
  trail: ["Read 200 messages", "Found 2 decisions, 1 question", "Drafted a reply"],
  summary: [
    "Dinner moved to Saturday 18:00 at Grandma's house.",
    "Ploy books the table. Dad brings the car.",
    "Mom asks who brings dessert. No one has answered.",
  ],
  send: 'Send "I\'ll bring dessert"',
  edit: "Edit",
} as const;

export const accountsDemo = {
  switcherHint: "Switch Account",
  accounts: [
    {
      id: "personal", kind: "Personal", initials: "พิ", name: "Pim", assistant: "Assistant: Ask",
      contacts: [
        { initial: "ม", name: "Mali", line: "ไปเที่ยวกันไหม", lang: "th" },
        { initial: "พ", name: "Ploy", line: "See you Sunday", lang: "en" },
        { initial: "แ", name: "แม่", line: "กินข้าวหรือยัง", lang: "th" },
      ],
    },
    {
      id: "shop", kind: "Shop", initials: "บข", name: "Baan Khanom", assistant: "Assistant: Auto",
      contacts: [
        { initial: "น", name: "Nok", line: "สั่งเค้ก 2 กล่อง", lang: "th" },
        { initial: "L", name: "Lamyai Farm", line: "Delivery is on Thursday", lang: "en" },
        { initial: "S", name: "Shop team", line: "Packing today", lang: "en" },
      ],
    },
    {
      id: "team", kind: "Team", initials: "LT", name: "Lamyai Team", assistant: "Assistant: Ask",
      contacts: [
        { initial: "A", name: "Arm", line: "Review is ready", lang: "en" },
        { initial: "B", name: "Beer", line: "Moved the call to 10:00", lang: "en" },
        { initial: "D", name: "Design group", line: "New logo options", lang: "en" },
      ],
    },
  ],
  active: "team",
  sub: "Account",
} as const;

export const approvalDemo = {
  header: { initials: "ม", name: "Mali", sub: "Friend" },
  modesLabel: "Approval Mode",
  modes: [
    { id: "allow", name: "Allow", text: "The Assistant acts at once. The reply to Mali is sent." },
    { id: "auto", name: "Auto", text: "A Decision Model checks each action. The routine reply is sent after the check." },
    { id: "ask", name: "Ask", text: "The Assistant waits for you. The reply to Mali waits for your approval." },
  ],
  defaultMode: "auto",
  incoming: "เจอกันวันศุกร์ได้ไหม",
  action: "Reply to Mali",
  reply: "Friday works",
  sent: "Sent by Assistant",
  checked: "Decision Model checked: routine reply",
  askTitle: "Assistant asks",
  askBody: "Reply to Mali: Friday works",
  waiting: "Waiting for you",
  approve: "Approve",
  deny: "Deny",
  payment: "Pay a 1,200 baht invoice",
  alwaysAskTag: "Always Ask",
  alwaysAskTitle: "Always Ask, in every mode",
  alwaysAsk: [
    "Spending money, such as the 1,200 baht invoice",
    "Deleting external data",
    "Contacting an Account with no prior conversation",
    "Moving data between Accounts",
  ],
} as const;

export const workflowsDemo = {
  header: { initials: "บข", name: "Baan Khanom", sub: "Assistant on" },
  mention: "@Assistant",
  ask: " Every Friday 17:00 send the team the week's orders as a PDF",
  panelTitle: "Workflow: Weekly orders",
  blocks: [
    { kind: "Trigger", text: "Every Friday 17:00" },
    { kind: "Step", text: "Collect the week's orders" },
    { kind: "AI step", text: "Write the summary", ai: true },
    { kind: "Output", text: "PDF to Team group" },
  ],
  confirm: "Confirm",
  on: "Workflow on",
  note: "A model is called only in AI steps.",
  run: "Ran Friday 17:00. Actor: Workflow.",
} as const;

export const relayDemo = {
  header: { initials: "บข", name: "Baan Khanom", sub: "Shop Account" },
  order: { who: "Nok", initial: "น", text: "สั่งเค้ก 2 กล่อง รับวันเสาร์" },
  mention: "@Assistant",
  ask: " send this to the team as a PDF",
  panelTitle: "Relay",
  from: "Baan Khanom chat",
  to: "Shop team group",
  file: "order-0142.pdf",
  delivered: "Posted in Shop team group",
  sys: "Assistant sent order-0142.pdf to Shop team",
} as const;

export const developersDemo = {
  header: { initials: "บข", name: "Baan Khanom", sub: "Operated by an integration" },
  codeLabel: "HTTP API",
  tag: "Planned",
  illustrative: "Illustrative request",
  request: [
    "POST /accounts/baan-khanom/messages",
    "Authorization: Bearer <integration-token>",
    "",
    '{ "chat": "Shop team",',
    '  "text": "Order 0142 received" }',
  ],
  response: "202 Accepted",
  codeAria: "Illustrative HTTP request",
  bubble: "Order 0142 received",
  panelTitle: "Integration (order-sync)",
  panelNote: "Planned. Operates this Account.",
  notesTitle: "MCP, part of v1",
  notes: [
    { name: "MCP out", text: "Add Connections and set Grants per Account. Tool calls follow the Approval Mode." },
    { name: "MCP in", text: "An external AI client, such as Claude or ChatGPT, connects to one Account with OAuth." },
  ],
} as const;

export const planned = {
  tag: "Planned",
  items: [
    { name: "Workspaces", text: "Shared spaces and channels for teams." },
    { name: "Guest links", text: "Let someone join a chat without an Account." }, // CONFIRM: not in product-v1
    { name: "LINE OA bridging", text: "Connect a LINE Official Account, Messenger or web chat." },
    { name: "Voice calls", text: "Voice and video calls." },
    { name: "Developer API", text: "An HTTP API so your server can operate one of your Accounts." },
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
  lead: "Your spot and referral link are live.",
  positionLabel: "Wishlist position",
  referralLabel: "Your referral link",
  referralHint: "Every friend who joins through your link moves you up.",
  copy: "Copy",
  copied: "Copied",
  profileTitle: "Tell us what to build first",
  profileLead: "Three fields, all optional. Skip if you prefer.",
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
