/**
 * ALL user-visible copy lives here (AGENTS.md rule). Strings marked CONFIRM are
 * carried over verbatim from the reference mockup or placeholder drafts that the
 * owner must approve before launch. Do not invent claims, prices or statistics.
 */

export const nav = {
  cta: "Join the wishlist",
} as const;

export const hero = {
  eyebrow: "AGENTIC CHAT ▪ COMING SOON",
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
  errorRateLimited: "Too many attempts. Try again in an hour.",
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

export const closing = {
  eyebrow: "WAITING FOR YOU",
} as const;

export const footer = {
  slogan: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  privacy: "Privacy",
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
