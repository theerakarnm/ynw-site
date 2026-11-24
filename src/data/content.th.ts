/**
 * Thai copy. Mirrors src/data/content.ts export for export, key for key; src/data/copy.ts fails the
 * type check when the shapes drift. These terms intentionally stay English inside Thai text: Assistant,
 * Account(s), User, Workflow(s), MCP, Actor, QR, HTTP, API, Approval Mode (Allow / Auto / Ask),
 * Decision Model, Connection(s), Grant(s), Integration, Always Ask, Planned, YNW, LINE, LINE OA,
 * OAuth, PDF, Claude, ChatGPT, Buy Me a Coffee, the tier names and the Y-N-W slogan lines.
 * Quoted chat lines that were already Thai in the English file are unchanged.
 */

// Page-level SEO copy. Titles are final strings (brand name included) so a locale can swap them whole.
export const meta = {
  home: {
    title: "YNW - แอปแชตที่มี AI Assistant เป็นของคุณเอง",
    description:
      "แอปแชตที่มี AI Assistant เป็นของคุณเอง เพิ่มเพื่อนด้วย QR code ส่งสติกเกอร์ แล้วให้ Assistant สรุปให้ทัน และร่างคำตอบให้ คุณเป็นคนกำหนดว่ามันทำอะไรเองได้บ้าง",
    ogImageAlt: "YNW - แอปแชตที่มี AI Assistant คลื่นจุดไฟ LED สีส้มเรียงเป็นรูปคลื่นใต้โลโก้ตัวอักษร YNW",
    // CONFIRM: target keywords are derived from the reference copy, not owner-supplied.
    keywords: [
      "แอปแชต AI",
      "AI Assistant ในแชต",
      "สรุปแชตกลุ่ม",
      "แอปแชตมีสติกเกอร์",
      "แอปแชตหลาย Account",
      "Workflow ในแชต",
      "แอปแชต MCP",
    ],
  },
  support: {
    title: "สนับสนุน YNW - รอบผู้ก่อตั้ง",
    description:
      "ร่วมสร้าง YNW กับเรา เข้าร่วมรอบผู้ก่อตั้งได้ทุกระดับ มีของขอบคุณสำหรับผู้สนับสนุนยุคแรก ตั้งแต่กาแฟแก้วเดียวไปจนถึงพาร์ตเนอร์ผู้ก่อตั้ง",
  },
  privacy: {
    title: "ความเป็นส่วนตัว - YNW",
    description: "หน้ารายชื่อรอใช้งานของ YNW เก็บข้อมูลอะไร เพราะอะไร และยกเลิกการรับอีเมลได้อย่างไร",
  },
  terms: {
    title: "ข้อกำหนดการใช้งาน - YNW",
    description: "ข้อกำหนดการใช้ YNW ได้แก่ ผู้ให้บริการ สิ่งที่ใช้ได้ฟรี วิธีที่ Assistant ทำงาน ลิงก์สำหรับแขก และการรายงาน",
  },
  thanks: { title: "คุณอยู่ในรายชื่อรอใช้งานแล้ว - YNW" },
  unsubscribed: { title: "ยกเลิกการรับอีเมลแล้ว - YNW" },
  notFound: { title: "ไม่มีคลื่นลูกนี้ - 404" },
} as const;

// Accessible names and the language switch. {language} is filled with a language name.
export const a11y = {
  skipLink: "ข้ามไปยังเนื้อหา",
  navLabel: "เมนูหลัก",
  homeLabel: "หน้าแรก YNW",
  fundingLabel: "ความคืบหน้าของเงินสนับสนุน",
  language: {
    switchToLabel: "เปลี่ยนภาษาเป็น {language}",
    // Each label names the language the switch goes to, shown on the other language's page.
    labels: { en: "EN", th: "ไทย" },
    names: { en: "English", th: "ไทย" },
    currentLabel: "ภาษาปัจจุบัน: {language}",
  },
} as const;

export const sceneUi = {
  replay: "เล่นซ้ำ",
} as const;

export const nav = {
  cta: "ลงชื่อรอใช้งาน",
  // /support nav: in-page anchors (reference Main.dc.html nav) + BMC CTA.
  supportLinks: [
    { href: "#tiers", label: "ระดับการสนับสนุน" },
    { href: "#how", label: "วิธีสนับสนุน" },
    { href: "#faq", label: "คำถามที่พบบ่อย" },
  ],
  supportCta: "สนับสนุน YNW",
} as const;

export const hero = {
  eyebrow: "แอปแชตที่มี Assistant ▪ เร็ว ๆ นี้",
  supportCta: "สนับสนุนรอบผู้ก่อตั้ง",
  titleLines: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  lead: "แอปแชตสำหรับชีวิต ทีม และธุรกิจของคุณ เพิ่มเพื่อนด้วย QR code ส่งสติกเกอร์ และเรียก Assistant ของคุณเองในแชตไหนก็ได้ คุณกำหนดเองว่ามันทำอะไรได้เองบ้าง",
} as const;

export const wishlistForm = {
  emailLabel: "อีเมล",
  emailPlaceholder: "you@company.com",
  submit: "ลงชื่อรอใช้งาน",
  submitting: "กำลังลงชื่อ",
  note: "ส่งเฉพาะข่าวการเปิดตัว ยกเลิกได้ทุกเมื่อ",
  privacyLink: "ความเป็นส่วนตัว",
  successLine: "ลงชื่อรอใช้งานแล้ว",
  successQuestion: "คุณจะใช้อะไรเป็นอย่างแรก?",
  chips: ["แชตกับลูกค้า", "พื้นที่ทำงานของทีม", "ส่วนตัวและชุมชน"],
  honeypotLabel: "บริษัท",
  // Added per the marketing-worker contract; not present in the mockup. CONFIRM wording.
  consentLabel: "ส่งข่าวการเปิดตัวให้ฉันทางอีเมลเป็นครั้งคราว",
  consentRequired: "โปรดติ๊กช่องยินยอม เพื่อให้เราส่งอีเมลถึงคุณได้",
  errorInvalid: "กรอกอีเมลให้ถูกต้อง เช่น you@company.com",
  errorConsent: "โปรดติ๊กช่องยินยอม เพื่อให้เราส่งอีเมลถึงคุณได้",
  errorTurnstile: "การตรวจสอบด่วนไม่ผ่าน โหลดหน้าใหม่แล้วลองอีกครั้ง",
  errorRateLimited: "ลองหลายครั้งเกินไป ลองใหม่ในอีกหนึ่งชั่วโมง",
  errorNetwork: "บันทึกอีเมลของคุณไม่ได้ ลองใหม่ในอีกสักครู่",
  errorGeneric: "บันทึกอีเมลของคุณไม่ได้ ลองใหม่ในอีกสักครู่",
  noscript: "JavaScript ถูกปิดอยู่ ส่งอีเมลหาเรา แล้วเราจะเพิ่มคุณเข้ารายชื่อรอใช้งานให้เอง",
  turnstileLabel: "ตรวจสอบสแปม", // visually hidden heading for the widget region
} as const;

export const rail = {
  label: "ความคืบหน้า",
  steps: ["แชต", "Assistant", "Accounts", "Approval Modes", "Workflows", "ส่งต่อข้อความ", "นักพัฒนา", "Planned", "รายชื่อรอใช้งาน"],
} as const;

export const ticker = {
  label: "ความสามารถ",
  items: ["ASSISTANT", "ACCOUNTS", "APPROVAL MODES", "WORKFLOWS", "ส่งต่อข้อความ", "สติกเกอร์", "MCP"],
} as const;

export const scenes = [
  {
    id: "chat", num: "01", label: "แชต", layout: "full",
    title: "เริ่มจากแอปแชต",
    lead: "เพิ่มเพื่อนด้วย QR code คุยตัวต่อตัวหรือในกลุ่ม และส่งสติกเกอร์ได้",
    steps: ["สแกน QR code เพื่อเพิ่มเพื่อน", "ทักทายตัวต่อตัว", "เริ่มกลุ่ม", "ส่งสติกเกอร์"],
    replay: "เล่นฉากแชตซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "assistant", num: "02", label: "Assistant", layout: "copy-left",
    title: "ยังไม่ได้อ่าน 200 ข้อความ สรุปให้เหลือบรรทัดเดียว",
    lead: "เรียก Assistant ของคุณในแชตไหนก็ได้ มันอ่านสิ่งที่คุณเห็นอยู่แล้ว บอกว่ามีอะไรเปลี่ยนไป และร่างคำตอบให้ คำตอบมีแค่คุณที่เห็น",
    steps: [
      "แชตกลุ่มครอบครัวเดินต่อไปขณะที่คุณทำงาน",
      "คุณพิมพ์ @Assistant ในแชต",
      "มันอ่านข้อความและหาว่าตกลงอะไรกันไว้",
      "คุณได้สรุปและคำตอบที่พร้อมส่ง",
    ],
    receipt: "สรุป 200 ข้อความจากกลุ่มครอบครัวแล้ว มีคำตอบ 1 ข้อความที่พร้อมส่ง",
    replay: "เล่นฉาก Assistant ซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "accounts", num: "03", label: "Accounts", layout: "copy-right",
    title: "คุณคนเดียว มีหลาย Account",
    lead: "คุณลงชื่อเข้าใช้ครั้งเดียวในฐานะ User คนเดียว และเป็นเจ้าของได้หลาย Account เช่น ส่วนตัว ร้านค้า และทีม คนอื่นมองไม่เห็นว่า Account เหล่านั้นเป็นของ User คนเดียวกัน",
    steps: [
      "Personal, Shop และ Team เป็น Account ที่เท่ากัน",
      "แต่ละ Account มีรายชื่อผู้ติดต่อของตัวเอง",
      "แต่ละ Account มีสิทธิ์ของ Assistant เป็นของตัวเอง",
      "แพ็กเกจฟรีมีได้สูงสุด 3 Accounts", // CONFIRM: limit from product-v1
    ],
    replay: "เล่นฉาก Accounts ซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "approval-modes", num: "04", label: "Approval Modes", layout: "full",
    title: "คุณกำหนดว่ามันทำอะไรเองได้",
    lead: "เลือกว่า Assistant ของคุณทำอะไรได้มากแค่ไหนโดยไม่ต้องถาม Account ใหม่เริ่มที่ Auto",
    replay: "เล่นฉาก Approval Modes ซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "workflows", num: "05", label: "Workflows", layout: "copy-left",
    title: "บอกครั้งเดียว แล้วมันทำให้ทุกครั้ง",
    lead: "อธิบายงานประจำด้วยภาษาธรรมดา Assistant จะแปลงเป็นขั้นตอนที่มองเห็นได้หนึ่งครั้ง คุณยืนยัน แล้วมันจะทำงานตามเวลาที่ตั้งไว้ การยืนยันไม่ได้ทำให้การกระทำที่ต้องถามเสมอหายไป",
    steps: [
      "คุณพิมพ์งานประจำ",
      "Assistant แปลงเป็นบล็อก",
      "คุณยืนยันขั้นตอน",
      "Workflow ทำงาน โดยเรียกใช้โมเดลเฉพาะในขั้นตอน AI",
    ],
    replay: "เล่นฉาก Workflows ซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "relay", num: "06", label: "ส่งต่อข้อความ", layout: "copy-right",
    title: "หนึ่งข้อความ สองแชต",
    lead: "ให้ Assistant ของคุณพาข้อความจากแชตหนึ่งไปอีกแชตหนึ่ง ใบเสร็จจะแสดงว่าใช้ Account ไหนและใครเป็นคนสั่ง",
    steps: [
      "Nok ส่งออเดอร์ในแชตร้านค้า",
      "คุณสั่ง @Assistant ให้ส่งให้ทีมเป็น PDF",
      "Assistant สร้างไฟล์ order-0142.pdf",
      "แล้วโพสต์ไฟล์ในกลุ่มทีมร้าน",
    ],
    replay: "เล่นฉากส่งต่อข้อความซ้ำ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "developers", num: "07", label: "นักพัฒนา", layout: "full",
    title: "เชื่อมต่อระบบของคุณเอง",
    lead: "เซิร์ฟเวอร์ของคุณใช้งาน Account ของคุณได้ผ่าน HTTP เหมือน API ของแพลตฟอร์มแชต HTTP API อยู่ในแผน ส่วน MCP เป็นส่วนหนึ่งของ v1",
    receipt: "Account: Baan Khanom | Actor: Integration (order-sync)",
    receiptTag: "Planned",
    replay: "ส่งคำขอ",
    replayText: "ส่งคำขอ",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  {
    id: "planned", num: "08", label: "Planned",
    title: "Planned ยังไม่ได้สัญญาว่าจะมีใน v1",
    lead: "สิ่งเหล่านี้อยู่ในรายการ แต่ยังไม่มีกำหนดวัน",
    caption: "แนวคิดผลิตภัณฑ์ หน้าจอและข้อมูลเป็นเพียงตัวอย่าง",
  },
  { id: "wishlist", num: "09", label: "รายชื่อรอใช้งาน", title: "ขั้นสุดท้ายต้องมีคุณ", lead: "ลงชื่อรอใช้งาน แล้วรับอีเมลเมื่อเปิดให้ทดลองใช้ก่อนใคร", caption: "" },
] as const;

// Sticker bubbles carry this label: the pack comes from the official YNW Account.
export const stickerLabel = "YNW";

// Avatar initials are Latin on purpose: Thai marks such as ม read like "u" in a 28px circle.
export const chatDemo = {
  qr: { title: "เพิ่มเพื่อน", hint: "สแกน QR code", label: "QR code ของ Mali" },
  friend: { name: "Mali", sub: "เพื่อน" },
  added: "คุณเพิ่ม Mali ด้วย QR code",
  hello: "หวัดดี Mali",
  reply: { who: "Mali", initial: "M", text: "สวัสดี ยินดีที่ได้รู้จัก" },
  group: { name: "ทริปสุดสัปดาห์", sub: "สมาชิก 3 คน" },
  groupStarted: "คุณสร้างกลุ่มทริปสุดสัปดาห์",
  groupMessages: [
    { who: "Mali", initial: "M", text: "เสาร์นี้ไปทะเลกันไหม" },
    { who: "คุณ", initial: "Y", text: "ไปสิ", me: true },
    { who: "Ploy", initial: "P", text: "นับฉันด้วย" },
  ],
} as const;

export const assistantDemo = {
  stream: { name: "กลุ่มครอบครัว", sub: "สมาชิก 8 คน" },
  unread: "ยังไม่ได้อ่าน", // same word as the scene title
  messages: [
    { who: "แม่", initial: "M", text: "เย็นนี้ใครว่างบ้าง" },
    { who: "พลอย", initial: "P", text: "เลื่อนเป็นวันเสาร์ได้ไหม" },
    { who: "พ่อ", initial: "D", text: "เสาร์ได้ 6 โมงเย็น" },
    { who: "ยาย", initial: "G", sticker: true },
    { who: "พลอย", initial: "P", text: "จองโต๊ะที่บ้านยายเลยนะ" },
    { who: "น้า", initial: "A", text: "ส่งรูปมา 12 รูป" },
    { who: "แม่", initial: "M", text: "แล้วใครเอาขนมไป" },
  ],
  mention: "@Assistant",
  ask: " สรุปให้หน่อย",
  notice: "มีการใช้ Assistant ในแชตนี้ เฉพาะคนที่ถามเท่านั้นที่เห็นคำตอบ",
  panelWorking: "Assistant กำลังทำงาน",
  panelDone: "Assistant",
  private: "เห็นได้เฉพาะคุณ",
  trail: ["อ่าน 200 ข้อความแล้ว", "พบ 2 การตัดสินใจ และ 1 คำถาม", "ร่างคำตอบแล้ว"],
  summary: [
    "มื้อเย็นเลื่อนเป็นวันเสาร์ 18:00 ที่บ้านยาย",
    "พลอยจองโต๊ะ พ่อเอารถไป",
    "แม่ถามว่าใครเอาขนมไป ยังไม่มีใครตอบ",
  ],
  send: 'ส่ง "เดี๋ยวเอาขนมไปเอง"',
  edit: "แก้ไข",
} as const;

export const accountsDemo = {
  switcherHint: "สลับ Account",
  compare: {
    caption: "เปรียบเทียบ Accounts",
    contacts: "ผู้ติดต่อ",
    assistant: "โหมด Assistant",
    // source: ynw GLOSSARY.md "Workflow" and ADR 0015 (a Workflow belongs to one Account)
    workflows: "Workflows",
    none: "ยังไม่มี",
  },
  accounts: [
    {
      id: "personal", kind: "Personal", name: "Pim", assistant: "Assistant: Ask", mode: "Ask", workflows: [],
      contacts: [
        { name: "Mali", lang: "en" },
        { name: "Ploy", lang: "en" },
        { name: "แม่", lang: "th" },
      ],
    },
    {
      id: "shop", kind: "Shop", name: "Baan Khanom", assistant: "Assistant: Auto", mode: "Auto", workflows: ["ออเดอร์ประจำสัปดาห์"],
      contacts: [
        { name: "Nok", lang: "en" },
        { name: "Lamyai Farm", lang: "en" },
        { name: "ทีมร้าน", lang: "th" },
      ],
    },
    {
      id: "team", kind: "Team", name: "Lamyai Team", assistant: "Assistant: Ask", mode: "Ask", workflows: [],
      contacts: [
        { name: "Arm", lang: "en" },
        { name: "Beer", lang: "en" },
        { name: "กลุ่มดีไซน์", lang: "th" },
      ],
    },
  ],
  active: "team",
} as const;

export const approvalDemo = {
  modesLabel: "Approval Mode",
  modes: [
    { id: "allow", name: "Allow", text: "Assistant ลงมือทำทันที คำตอบถึง Mali ถูกส่งไปแล้ว" },
    { id: "auto", name: "Auto", text: "Decision Model ตรวจทุกการกระทำ คำตอบทั่วไปจะถูกส่งหลังตรวจเสร็จ" },
    { id: "ask", name: "Ask", text: "Assistant รอคุณ คำตอบถึง Mali รอให้คุณอนุมัติ" },
  ],
  defaultMode: "auto",
  lanes: { alone: "ทำเองได้", ask: "ถามคุณก่อน" },
  /** `alone` lists the modes in which the action runs without asking (ADR 0009). */
  actions: [
    {
      id: "reply",
      title: "ตอบ Mali",
      context: "เจอกันวันศุกร์ได้ไหม",
      body: "วันศุกร์ได้",
      alone: ["allow", "auto"],
      states: { allow: "Assistant ส่งแล้ว", auto: "Decision Model ตรวจแล้ว: คำตอบทั่วไป", ask: "Assistant ถามคุณ" },
    },
    {
      id: "tool",
      title: "เรียกใช้เครื่องมือ",
      body: "เรียกใช้เครื่องมือผ่าน Connection", // source: ADR 0011, "Tool calls follow the Approval Mode"
      alone: ["allow"],
      // source: ADR 0009, Auto falls back to Ask when the Decision Model's confidence is below the threshold
      states: { allow: "Assistant ทำเสร็จแล้ว", auto: "Decision Model ไม่แน่ใจ", ask: "Assistant ถามคุณ" },
    },
  ],
  approve: "อนุมัติ",
  deny: "ปฏิเสธ",
  waiting: "รอคุณอยู่",
  payment: "จ่ายใบแจ้งหนี้ 1,200 บาท",
  alwaysAskTag: "Always Ask",
  alwaysAskTitle: "Always Ask ในทุกโหมด",
  alwaysAsk: [
    "การใช้จ่ายเงิน เช่น ใบแจ้งหนี้ 1,200 บาท",
    "การลบข้อมูลภายนอก",
    "การติดต่อ Account ที่ไม่เคยคุยกันมาก่อน",
    "การย้ายข้อมูลระหว่าง Accounts",
  ],
} as const;

export const workflowsDemo = {
  panelTitle: "Workflow: ออเดอร์ประจำสัปดาห์",
  /** The routine as one sentence. Each phrase is underlined in the colour of the block it becomes. */
  sentence: [
    { text: "ทุกวันศุกร์ 17:00", tone: "trigger" },
    { text: " " },
    { text: "รวบรวมออเดอร์ของสัปดาห์", tone: "step" },
    { text: " " },
    { text: "เขียนสรุป", tone: "ai" },
    { text: " แล้ว " },
    { text: "ส่ง PDF ไปที่กลุ่มทีม", tone: "output" },
    { text: "" },
  ], // source: same routine as the blocks below (product-v1 Workflows, ADR 0015)
  blocks: [
    { tone: "trigger", kind: "ทริกเกอร์", text: "ทุกวันศุกร์ 17:00" },
    { tone: "step", kind: "ขั้นตอน", text: "รวบรวมออเดอร์ของสัปดาห์" },
    { tone: "ai", kind: "ขั้นตอน AI", text: "เขียนสรุป" },
    { tone: "output", kind: "ผลลัพธ์", text: "PDF ไปกลุ่มทีม" },
  ],
  confirm: "ยืนยัน",
  on: "Workflow เปิดอยู่",
  lastRun: "รันล่าสุด", // UI label, no claim
  run: "รันเมื่อวันศุกร์ 17:00 Actor: Workflow",
  note: "เรียกใช้โมเดลเฉพาะในขั้นตอน AI",
} as const;

export const relayDemo = {
  groupLabel: "ส่งต่อ",
  from: "แชต Baan Khanom",
  to: "กลุ่มทีมร้าน",
  order: { who: "Nok", initial: "N", text: "สั่งเค้ก 2 กล่อง รับวันเสาร์" },
  assistant: { who: "Assistant", initial: "A" }, // source: Actor: Assistant in the receipt below
  mention: "@Assistant",
  ask: " ส่งอันนี้ให้ทีมเป็น PDF",
  file: "order-0142.pdf",
  delivered: "โพสต์ในกลุ่มทีมร้านแล้ว",
  sys: "Assistant ส่ง order-0142.pdf ไปที่ทีมร้านแล้ว",
  receiptTitle: "ใบเสร็จ",
  receipt: [
    { key: "Account", value: "Baan Khanom" },
    { key: "Actor", value: "Assistant", actor: true },
    { key: "ขอโดย", value: "Mali" },
  ],
} as const;

export const developersDemo = {
  header: { initials: "B", name: "Baan Khanom", sub: "ใช้งานผ่าน Integration" },
  actorLabel: "Actor", // source: GLOSSARY.md (Actor)
  codeLabel: "HTTP API",
  tag: "Planned",
  illustrative: "ตัวอย่างคำขอ",
  request: [
    "POST /accounts/baan-khanom/messages",
    "Authorization: Bearer <integration-token>",
    "",
    '{ "chat": "ทีมร้าน",',
    '  "text": "ได้รับออเดอร์ 0142 แล้ว" }',
  ],
  response: "202 Accepted",
  codeAria: "ตัวอย่างคำขอ HTTP",
  bubble: "ได้รับออเดอร์ 0142 แล้ว",
  panelTitle: "Integration (order-sync)",
  panelNote: "Planned ใช้งาน Account นี้",
  notesTitle: "MCP เป็นส่วนหนึ่งของ v1",
  notes: [
    { name: "MCP out", text: "เพิ่ม Connections และตั้ง Grants ต่อ Account การเรียกใช้เครื่องมือเป็นไปตาม Approval Mode" },
    { name: "MCP in", text: "AI client ภายนอก เช่น Claude หรือ ChatGPT เชื่อมต่อกับ Account หนึ่งผ่าน OAuth" },
  ],
} as const;

export const planned = {
  tag: "Planned",
  items: [
    { name: "Workspaces", text: "พื้นที่และช่องทางร่วมกันสำหรับทีม" },
    { name: "ลิงก์เชิญแขก", text: "ให้ใครสักคนเข้าร่วมแชตได้โดยไม่ต้องมี Account" }, // CONFIRM: not in product-v1
    { name: "เชื่อม LINE OA", text: "เชื่อมต่อ LINE Official Account, Messenger หรือเว็บแชต" },
    { name: "โทรด้วยเสียง", text: "โทรด้วยเสียงและวิดีโอ" },
    { name: "Developer API", text: "HTTP API ให้เซิร์ฟเวอร์ของคุณใช้งาน Account ของคุณได้" },
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
    tiers: "ระดับการสนับสนุน",
    how: "วิธีสนับสนุน",
    faq: "คำถามที่พบบ่อย",
  },
  hero: {
    eyebrowNum: "00",
    eyebrow: "รอบผู้ก่อตั้ง",
    title: "ร่วมสร้าง YNW กับเรา",
    titleSub: "ร่วมตั้งแต่เนิ่น ๆ ในระดับไหนก็ได้",
    lead: "YNW คือแอปแชตเดียวสำหรับแชตในชีวิตประจำวัน ทีม และธุรกิจของคุณ พร้อม AI agent ที่วางแผน ใช้เครื่องมือ และตอบแทนคุณ เราเป็นทีมเล็ก ๆ ที่สร้างมันแบบเปิดเผย ถ้าอยากสนับสนุนช่วงเบต้า เลี้ยงกาแฟเราหนึ่งแก้วหรือหลายแก้วได้เลย ถ้ายังไม่สะดวก รายชื่อรอใช้งานแบบฟรีก็เป็นวิธีที่ดีในการติดตามความคืบหน้า",
    primaryCta: "เลี้ยงกาแฟเรา",
    secondaryCta: "วิธีสนับสนุน",
  },
  funding: {
    eyebrow: "รอบผู้ก่อตั้ง",
    badge: "เปิดอยู่",
    raised: "$[RAISED]", // CONFIRM: live total raised (e.g. "$120")
    raisedLabel: "ระดมได้จากเป้าหมาย $[GOAL] สำหรับเบต้า", // CONFIRM: real goal once set
    raisedPct: 0, // CONFIRM: 0-100; lights meter segments in 5% steps
    backersLabel: "ตอนนี้มีผู้สนับสนุน [N] คน", // CONFIRM: backer count
    coffeeLabel: "กาแฟ 1 แก้ว = $5",
    meterLabel: "ระดมได้ 0% ของเป้าหมาย",
  },
  tiers: {
    eyebrowNum: "01",
    eyebrow: "ระดับการสนับสนุน",
    title: "ของขอบคุณสำหรับผู้สนับสนุนยุคแรก",
    lead: "จำนวนเท่าไรก็ช่วยได้ ถ้าอยากได้อะไรกลับไป นี่คือสิ่งที่แต่ละระดับมีให้ ทุกระดับรวมสิ่งที่ระดับก่อนหน้ามีให้ และทุกราคาเป็นการจ่ายครั้งเดียวเป็นดอลลาร์สหรัฐ",
    youLabel: "สำหรับคุณ",
    teamsLabel: "สำหรับร้านค้าและทีม",
    oneTime: "จ่ายครั้งเดียว",
    list: [
      {
        index: "01",
        badge: "กาแฟ 1 แก้ว",
        name: "Supporter",
        price: "$5",
        blurb: "คำขอบคุณเล็ก ๆ และสิทธิ์มีเสียงว่าเราควรสร้างอะไรต่อ",
        items: [
          "ชื่อของคุณบนกำแพงผู้สนับสนุนรุ่นแรก เฉพาะเมื่อคุณเลือกเปิดเผย",
          "ป้าย Supporter บนโปรไฟล์ YNW ของคุณ",
          "อัปเดตเบื้องหลังการพัฒนาทุกเดือน",
          "สิทธิ์โหวตว่าเราควรสร้างอะไรต่อ",
        ],
        cta: "เลือก Supporter",
      },
      {
        index: "02",
        badge: "กาแฟ 3 แก้ว · 300 คนแรก",
        name: "Early Bird",
        price: "$15",
        blurb: "เริ่มใช้ YNW ได้ตั้งแต่วันแรกของเบต้า",
        plusLine: "ทุกอย่างใน Supporter และเพิ่ม",
        items: [
          "เข้าใช้เบต้าได้เลยโดยไม่ต้องรอ",
          "แพ็กเกจแบบชำระเงิน 3 เดือน",
          "ที่นั่งอวาตาร์เพิ่ม 1 ที่",
        ],
        cta: "เลือก Early Bird",
      },
      {
        index: "03",
        badge: "กาแฟ 8 แก้ว",
        name: "Founder",
        price: "$40",
        blurb: "ใช้ YNW ได้เต็มปี และได้ราคา Founder ที่คงไว้ให้คุณ",
        plusLine: "ทุกอย่างใน Early Bird และเพิ่ม",
        highlight: true,
        items: [
          "แพ็กเกจแบบชำระเงิน 12 เดือน",
          "ล็อกราคา Founder ไว้ตราบที่คุณยังสมัครอยู่",
          "ที่นั่งอวาตาร์ 3 ที่",
          "เครดิต agent โบนัสทุกเดือน",
          "กลุ่มส่วนตัวของ Founder ใน LINE",
        ],
        cta: "เลือก Founder",
      },
      {
        index: "04",
        badge: "กาแฟ 25 แก้ว",
        name: "Business Founder",
        price: "$125",
        blurb: "agent ที่ตอบลูกค้าของคุณ ตั้งค่าร่วมกับคุณ",
        items: [
          "แพ็กเกจ Business 12 เดือน",
          "ที่นั่งสำหรับทีม 5 ที่",
          "เซสชันตั้งค่าตัวต่อตัวเพื่อเชื่อมต่อ LINE OA ของคุณ",
          "agent 1 ตัวที่สร้างจากรายการราคาและคำถามที่พบบ่อยของคุณ",
          "การสนับสนุนแบบเร่งด่วน",
        ],
        cta: "เลือก Business Founder",
      },
      {
        index: "05",
        badge: "กาแฟ 100+ แก้ว · พาร์ตเนอร์ 10-20 ราย",
        name: "Founding Partner",
        price: "$500+",
        blurb: "ร่วมกำหนดทิศทาง YNW กับเรา และเชื่อมต่อกับระบบของคุณเอง",
        plusLine: "ทุกอย่างใน Business Founder และเพิ่ม",
        items: [
          "การคุยออกแบบร่วมกับผู้ก่อตั้ง",
          "โลโก้ของคุณในส่วนพาร์ตเนอร์ผู้ก่อตั้ง",
          "MCP connector แบบกำหนดเอง 1 ตัวเพื่อเชื่อมกับระบบของคุณ",
          "กรณีศึกษาแบบไม่บังคับ",
        ],
        cta: "เลือก Founding Partner",
      },
    ],
  },
  wishlistStrip: {
    eyebrowNum: "00",
    eyebrow: "รายชื่อรอใช้งาน · ฟรี",
    title: "แค่อยากติดตามความคืบหน้า? รายชื่อรอใช้งานฟรี",
    lead: "ได้รับอีเมลเปิดตัว ได้ลำดับในคิว และลิงก์แนะนำเพื่อนเพื่อขยับขึ้น คุณต้องลงชื่อก่อนจึงจะสนับสนุนได้ด้วย จึงเป็นจุดเริ่มต้นที่ดี",
    cta: "ลงชื่อรอใช้งาน",
  },
  how: {
    eyebrowNum: "02",
    eyebrow: "วิธีสนับสนุน",
    title: "สี่ขั้นตอนบน Buy Me a Coffee",
    lead: "เราจับคู่การสนับสนุนของคุณจากอีเมล ดังนั้นอีเมลที่คุณกรอกบน Buy Me a Coffee ต้องเป็นอีเมลเดียวกับที่ใช้ลงชื่อรอใช้งาน",
    steps: [
      { title: "ลงชื่อรอใช้งาน", body: "สมัครด้วยอีเมลของคุณ ข้ามขั้นตอนนี้ได้ถ้าคุณอยู่ในรายชื่อแล้ว" },
      { title: "เลือกจำนวนแก้วกาแฟ", body: "เปิด Buy Me a Coffee แล้วใส่จำนวนกาแฟตามระดับของคุณ กาแฟ 1 แก้วคือ $5 ดังนั้น Founder คือ 8 แก้ว" },
      { title: "ใส่อีเมลที่ใช้ลงชื่อไว้ในช่อง Name", body: 'พิมพ์อีเมลที่ใช้ลงชื่อรอใช้งานในช่อง Name และพิมพ์ชื่อระดับในช่อง Message ติ๊ก "Make this message private" เพื่อไม่ให้อีเมลของคุณแสดงต่อสาธารณะ', highlight: true },
      { title: "ชำระเงิน แล้วเสร็จเรียบร้อย", body: "เราจะยืนยันทางอีเมลภายใน [N] วัน สิทธิ์ของคุณเริ่มเมื่อเบต้าเปิดในวันที่ [BETA DATE]" }, // CONFIRM: N + beta date
    ],
    example: {
      caption: "ตัวอย่าง · สิ่งที่ต้องพิมพ์",
      coffeesLabel: "Coffees",
      coffeeCounts: ["1", "3", "8"],
      coffeeHighlighted: 2,
      nameLabel: "Name or @yoursocial",
      nameValue: "you@example.com",
      nameHint: "อีเมลเดียวกับที่ใช้ลงชื่อรอใช้งาน",
      messageLabel: "Message",
      messageValue: "Founder",
      messageHint: "ระดับที่คุณเลือก",
      privateLabel: "Make this message private",
      totalLabel: "Total",
      totalValue: "$40",
    },
  },
  faq: {
    eyebrowNum: "03",
    eyebrow: "คำถามที่พบบ่อย",
    title: "ควรรู้ไว้",
    items: [
      { q: "นี่คือการบริจาคหรือการสั่งจองล่วงหน้า?", a: "เป็นทั้งสองอย่างเล็กน้อย คุณสนับสนุนเบต้าตั้งแต่ตอนนี้ และของขอบคุณตามระดับของคุณจะมาถึงเมื่อ YNW เปิดให้ผู้สนับสนุน" },
      { q: "ทำไมต้องใส่อีเมลในช่อง Name?", a: "เป็นวิธีที่เราใช้หาคุณในรายชื่อรอใช้งานและเปิดสิทธิ์ให้คุณ ตั้งข้อความเป็นส่วนตัวเพื่อให้เราเท่านั้นที่เห็น" },
      { q: "ชื่อของฉันจะเปิดเผยต่อสาธารณะไหม?", a: "เฉพาะเมื่อคุณเลือกเปิดเผย กำแพงผู้สนับสนุนรุ่นแรกเป็นแบบเลือกเข้าร่วมในทุกระดับ" },
      { q: "เบต้าเปิดเมื่อไร?", a: "[BETA DATE] Early Bird ขึ้นไปได้เข้าก่อน โดยไม่ต้องรอในคิว" }, // CONFIRM: beta date
    ],
  },
  closing: {
    eyebrow: "Your Next Wave",
    title: "ขอบคุณที่มาอยู่กับเราตั้งแต่ต้น",
    lead: "ไม่ว่าคุณจะสนับสนุนหรือแค่ลงชื่อรอใช้งาน ก็ช่วยเราได้",
    cta: "เลี้ยงกาแฟเรา",
  },
} as const;

export const closing = {
  eyebrow: "รอคุณอยู่",
} as const;

export const footer = {
  slogan: ["Your Next Wave.", "Your New World.", "Your Network Workspace."],
  supportTitle: "สนับสนุน YNW",
  linksTitle: "ลิงก์",
  // hash targets resolve to same-page anchors on /support, /support/#... elsewhere.
  supportLinks: [
    { hash: "tiers", label: "ระดับการสนับสนุน" },
    { hash: "how", label: "วิธีสนับสนุน" },
    { hash: "faq", label: "คำถามที่พบบ่อย" },
  ],
  bmc: "Buy Me a Coffee",
  wishlist: "รายชื่อรอใช้งาน",
  privacy: "ความเป็นส่วนตัว",
  terms: "ข้อกำหนด",
  copyright: "© 2026 ทีม Eukron",
  payments: "ชำระเงินผ่าน Buy Me a Coffee · ราคาเป็น USD",
  mark: "YNW",
} as const;

export const thanks = {
  eyebrow: "รอคุณอยู่",
  title: "คุณอยู่ในรายชื่อรอใช้งานแล้ว",
  lead: "ลำดับของคุณและลิงก์แนะนำเพื่อนพร้อมใช้งานแล้ว",
  positionLabel: "ลำดับในรายชื่อรอใช้งาน",
  referralLabel: "ลิงก์แนะนำเพื่อนของคุณ",
  referralHint: "เพื่อนทุกคนที่เข้าร่วมผ่านลิงก์ของคุณจะช่วยให้คุณขยับขึ้น",
  copy: "คัดลอก",
  copied: "คัดลอกแล้ว",
  profileTitle: "บอกเราว่าควรสร้างอะไรก่อน",
  profileLead: "สามช่อง ไม่บังคับทั้งหมด ข้ามได้ถ้าไม่สะดวก",
  nameLabel: "ชื่อ",
  namePlaceholder: "ให้เราเรียกคุณว่าอะไร?",
  roleLabel: "บทบาท",
  rolePlaceholder: "เลือกบทบาท",
  roles: ["ผู้ก่อตั้ง", "ผู้ดูแลงาน", "ผู้ดูแลชุมชน", "นักพัฒนา", "อื่น ๆ"],
  useCaseLabel: "คุณต้องการอะไร?",
  useCasePlaceholder: "หนึ่งหรือสองประโยคก็เพียงพอ",
  save: "บันทึกคำตอบ",
  saving: "กำลังบันทึก",
  skip: "ข้ามไปก่อน",
  saved: "บันทึกแล้ว เจอกันตอนเปิดตัว",
  saveError: "บันทึกไม่ได้ในตอนนี้ คุณข้ามไปก่อนแล้วกลับมาทำให้เสร็จทีหลังได้",
} as const;

export const unsubscribed = {
  eyebrow: "ยกเลิกการรับอีเมลแล้ว",
  title: "คุณออกจากรายชื่อแล้ว",
  lead: "จะไม่มีอีเมลเปิดตัวส่งถึงคุณอีก ถ้าเปลี่ยนใจ รายชื่อรอใช้งานยังอยู่ตรงนี้",
  back: "กลับไปที่ YNW",
} as const;

export const notFound = {
  code: "404 ▪ ไม่พบหน้านี้",
  title: "ไม่มีคลื่นลูกนี้",
  lead: "หน้านี้ย้ายไปแล้วหรือไม่เคยเปิดตัว ตอนนี้หน้าแรกคือฝั่งเดียวที่มี",
  back: "กลับไปหน้าแรก",
} as const;

/**
 * Privacy page copy. PLACEHOLDER - CONFIRM with the owner before launch.
 * Structure follows what the wishlist form actually collects (email, consent,
 * attribution, Turnstile) and what the marketing worker stores.
 */
export const privacy = {
  eyebrow: "ความเป็นส่วนตัว",
  title: "ความเป็นส่วนตัว",
  updated: "อัปเดตล่าสุด ▪ 2026-11-03",
  lead: "เราเก็บอะไรบนหน้านี้ เพราะอะไร และออกจากรายชื่อได้อย่างไร",
  sections: [
    {
      h: "สิ่งที่เราเก็บ",
      p: [
        "เมื่อคุณลงชื่อรอใช้งาน เราจะเก็บอีเมลของคุณ การยินยอมที่คุณให้ไว้ และข้อมูลพื้นฐานเพื่อป้องกันการใช้งานในทางที่ผิด (โทเค็นตรวจสอบสแปมและช่อง honeypot)",
        "หากคุณมาจากลิงก์แคมเปญ เรายังเก็บบริบทของการคลิกด้วย ได้แก่ พารามิเตอร์ utm, referrer, landing path และรหัสการคลิกโฆษณา (fbclid, gclid, ttclid) เป็นข้อมูล first-party เก็บไว้ในคุกกี้ first-party เป็นเวลา 30 วัน โดยยึดการเข้าชมครั้งแรกเป็นหลัก",
      ],
    },
    {
      h: "เราใช้ข้อมูลนี้ทำอะไร",
      p: [
        "เราใช้อีเมลของคุณเพื่อส่งข่าวการเปิดตัวและยืนยันการลงชื่อรอใช้งานของคุณ รหัสแนะนำเพื่อนในลิงก์ของคุณบอกเราว่าใครชวนใคร เพื่อให้เปิดให้เข้าใช้ก่อนตามลำดับ",
        "สัญญาณเหตุการณ์ (เช่น มีการเริ่มกรอกแบบฟอร์ม) ไม่มีคุกกี้นอกจากคุกกี้ attribution และจะถูกข้ามเมื่อเบราว์เซอร์ของคุณส่ง Do Not Track",
      ],
    },
    {
      h: "สิ่งที่เราไม่ทำเด็ดขาด",
      p: [
        "เราไม่ขายข้อมูลของคุณ ไม่ใช้ตัวติดตามโฆษณาของบุคคลที่สามบนหน้านี้ และไม่ส่งอีเมลการตลาดโดยที่คุณไม่ยินยอม",
      ],
    },
    {
      h: "การออกจากรายชื่อ",
      p: [
        "ทุกอีเมลมีลิงก์ยกเลิกการรับ คลิกเดียว ยืนยันบนเว็บไซต์นี้ ไม่มีการถามเหตุผล",
      ],
    },
    {
      h: "ติดต่อ",
      p: [
        "คำถามเกี่ยวกับข้อมูลของคุณ: privacy@ynw.example", // CONFIRM: real contact address
      ],
    },
  ],
} as const;

/**
 * Terms page copy. DRAFT - CONFIRM with the owner before launch.
 * States only product facts; legal terms (liability, law, retention) are not set.
 */
export const terms = {
  eyebrow: "ข้อกำหนด",
  title: "ข้อกำหนดการใช้งาน",
  updated: "อัปเดตล่าสุด ▪ 2026-11-24",
  lead: "นี่คือข้อกำหนดการใช้ YNW ด้านล่างสรุปว่าใครเป็นผู้ให้บริการ บริการมีอะไรบ้าง Assistant ทำงานอย่างไร ลิงก์สำหรับแขกทำงานอย่างไร และรายงานปัญหาได้อย่างไร",
  sections: [
    {
      // CONFIRM: registered entity name, registration number and address are not set.
      h: "ผู้ให้บริการ YNW",
      p: ["YNW ดำเนินงานโดย Eukron Team"],
    },
    {
      h: "บริการ",
      p: [
        "แชตใช้ได้ฟรี ส่วน AI ใช้ได้ฟรีภายในโควตารายวัน โดยใช้โมเดลที่ต้นทุนต่ำกว่า",
        "Premium ให้โควตาที่มากขึ้น โมเดลที่แรงขึ้น และเพิ่มจำนวน Account ได้มากขึ้น",
        "คุณยังนำ AI ของคุณเองมาใช้กับ YNW ได้ผ่าน MCP ขาเข้า",
      ],
    },
    {
      h: "Assistant ของคุณ",
      p: [
        "User แต่ละคนมี Assistant หนึ่งตัว คุณเลือก Approval Mode ได้ทั้งแยกตาม Account และแยกตามประเภทของการกระทำ ได้แก่ Allow, Auto หรือ Ask Account ใหม่จะเริ่มที่ Auto",
        "การกระทำบางอย่างจะอยู่ที่ Ask เป็นอย่างน้อยเสมอ ได้แก่ การใช้จ่ายเงิน การลบข้อมูลภายนอก การติดต่อ Account ที่ยังไม่เคยคุยด้วย และการย้ายข้อมูลระหว่าง Account นอกจากนี้ ในโหมด Auto Assistant จะถามเมื่อ Decision Model ไม่แน่ใจหรือใช้งานไม่ได้",
        "Assistant อ่านได้เฉพาะสิ่งที่ Account นั้นมองเห็นอยู่แล้ว และใช้เฉพาะ Account Memory ของ Account นั้น",
      ],
    },
    {
      // CONFIRM: guest links are specified but not confirmed as shipped; check before launch.
      h: "ลิงก์สำหรับแขก",
      p: [
        "โฮสต์แชร์ลิงก์ของการสนทนาได้ แขกพิมพ์ชื่อที่แสดงและรหัสผ่านที่โฮสต์ให้ไว้ แล้วเข้าร่วมได้เพียงการสนทนานั้น โดยแสดงเป็นแขก",
        "แขกไม่มีแชตอื่น เพื่อน การค้นหา Assistant หรือห้องเสียง",
        "โฮสต์เลือกให้ต้องอนุมัติก่อนเข้าร่วม จำกัดจำนวนแขกของลิงก์นั้น เพิกถอนลิงก์ หรือนำแขกออกได้ การเพิกถอนลิงก์จะหยุดการเข้าร่วมใหม่ ส่วนคนที่อยู่ในการสนทนาแล้วจะยังอยู่ต่อ",
        "เบราว์เซอร์เดิมกลับเข้ามาได้นานสูงสุด 30 วันนับจากการใช้งานครั้งล่าสุด",
        "แขกสมัครด้วย Apple, Google หรือ LINE เพื่อเก็บการสนทนานั้นไว้เป็น Account เต็มรูปแบบได้ หากมี User อยู่แล้ว การสนทนาจะถูกผูกเข้ากับ User นั้นก็ต่อเมื่อ User ยืนยันเท่านั้น",
      ],
    },
    {
      // CONFIRM: no prohibited-acts list or penalties are defined yet.
      h: "การใช้งานที่เหมาะสมและการรายงาน",
      p: [
        "คุณบล็อก Account ได้ และรายงานข้อความหรือ Account ได้ ทีมของเรามีคิวสำหรับตรวจสอบรายงาน",
        "เนื้อหาที่ AI เขียนจะผ่านตัวกรองตรวจสอบก่อนส่ง",
      ],
    },
    {
      // CONFIRM: deletion process and data retention are not specified.
      h: "การลบ Account",
      p: ["ขั้นตอนการลบ Account ยังไม่ได้กำหนด"],
    },
  ],
} as const;

/**
 * The only copy client scripts read. The layout serialises this into #i18n; scripts never import
 * copy by name. {name} placeholders are filled by format() in src/lib/i18n.ts.
 */
export const clientStrings = {
  form: {
    errorInvalid: wishlistForm.errorInvalid,
    errorConsent: wishlistForm.errorConsent,
    errorTurnstile: wishlistForm.errorTurnstile,
    errorRateLimited: wishlistForm.errorRateLimited,
    errorNetwork: wishlistForm.errorNetwork,
  },
  thanks: {
    copy: thanks.copy,
    copied: thanks.copied,
    saved: thanks.saved,
    saveError: thanks.saveError,
  },
  // Scene timelines are sized by the demo copy, so the scripts read it from #i18n instead of importing it.
  demo: {
    developersRequest: developersDemo.request,
    workflowsConfirm: workflowsDemo.confirm,
    workflowsOn: workflowsDemo.on,
    assistantMessages: assistantDemo.messages,
    assistantTrail: assistantDemo.trail,
    assistantSummary: assistantDemo.summary,
  },
  rail: {
    running: "กำลังรันขั้นที่ {n} จาก {total}",
    complete: "รันเสร็จแล้ว ▪ ใช้เวลา {duration}",
    durationMinutes: "{m} นาที {s} วินาที",
    durationSeconds: "{s} วินาที",
  },
} as const;
