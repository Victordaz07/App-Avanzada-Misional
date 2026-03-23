/**
 * Investigator Lessons Data - English (EN)
 * PME+ Core Lessons v2.0 - English Translation
 */

import type { Lesson } from './lessons';

// ===============================
// INVESTIGATOR CORE (PME) — v2.0 (English)
// ===============================

const restorationOverview: Lesson = {
  id: 'restoration-overview',
  title: 'The Message of the Restoration',
  subtitle: 'Stage: Investigator · 20–25 min',
  description:
    'Understand why a restoration was needed, what happened in the First Vision, why the Book of Mormon is evidence, and how to receive confirmation through the Spirit.',
  icon: '🕊️',
  estimatedMinutes: 25,

  introParagraph:
    'The Restoration answers a decisive question: "Does God still speak today?"\n\nThe answer is yes. And He doesn\'t just speak: He guides, calls prophets, restores truths, and returns authority. The Restoration is not "another religion"; it is the return of the Gospel of Jesus Christ with His Church, His ordinances, and His priesthood.',

  sections: [
    {
      id: 'ro-1',
      title: 'God is the same… and so is His pattern',
      content:
        'From the beginning, God has guided His children through prophets. This is not a modern invention; it is a spiritual pattern.\n\nWhen God does a great work, He first reveals His will to His servants. This brings clarity, unity, and protection against confusion.\n\n👉 If God loves His children today as He did before, it is reasonable to expect living guidance, not just ancient history.',
      scriptureRef: 'Amos 3:7',
    },
    {
      id: 'ro-2',
      title: 'The apostasy: loss of light, authority, and order',
      content:
        'After the death of the New Testament apostles, the Gospel continued on earth, but over time profound changes occurred.\n\nTruths were lost, teachings were altered, and above all, priesthood authority to act in God\'s name was lost.\n\nThis doesn\'t mean God abandoned His children. It means humanity drifted away, and God allowed a period of spiritual darkness.\n\n👉 For the Gospel to return complete, it had to be restored, not "patched."',
      scriptureRef: '2 Thessalonians 2:3',
    },
    {
      id: 'ro-3',
      title: 'The First Vision: God answered',
      content:
        'Joseph Smith was a young man with a sincere question: "Which church is true?"\n\nHe didn\'t rely on tradition or social pressure. He went directly to God.\n\nGod the Father and His Son Jesus Christ appeared to him. This confirms two enormous truths:\n\n1) God exists and is real.\n2) He answers those who seek Him sincerely.\n\n👉 The Restoration begins with an honest prayer.',
      scriptureRef: 'Joseph Smith—History 1:17',
    },
    {
      id: 'ro-4',
      title: 'God invites us to ask (and promises to answer)',
      content:
        'God doesn\'t always answer with dramatic signs. He usually answers through the Holy Ghost.\n\nThe biblical invitation is simple: if you lack wisdom, ask. God gives generously.\n\nThe key is not "being perfect," but being sincere.\n\n👉 The Lord works with the willing heart, not with pride.',
      scriptureRef: 'James 1:5',
    },
    {
      id: 'ro-5',
      title: 'The Book of Mormon: living evidence of the Restoration',
      content:
        'The Book of Mormon is not an "extra" book. It is evidence.\n\nIf the Book of Mormon is true, then:\n- Joseph Smith was a prophet.\n- The Restoration is real.\n- Jesus Christ continues to guide His work.\n\nMoroni teaches a clear pattern: read, remember God\'s mercy, and ask the Father in the name of Christ.\n\n👉 God promises that the Holy Ghost can confirm the truth "of all things."',
      scriptureRef: 'Moroni 10:4–5',
    },
    {
      id: 'ro-6',
      title: 'Priesthood authority: God calls, one doesn\'t self-appoint',
      content:
        'In the Restoration, it\'s not just about good intentions.\n\nOrdinances (like baptism) require authority. In the scriptures, the priesthood isn\'t taken upon oneself: it is received by calling and ordination.\n\n👉 This protects the Church from disorder and ensures that ordinances are valid before God.',
      scriptureRef: 'Hebrews 5:4',
    },
    {
      id: 'ro-7',
      title: 'What this means for you (today)',
      content:
        'The Restoration is not just history. It is an invitation.\n\nIt means that:\n- You can talk to God and receive personal guidance.\n- You can draw closer to Christ through real ordinances.\n- You can belong to a Church organized by Christ.\n- You can build faith based on revelation, not rumors.\n\n👉 In summary: you\'re not condemned to live guessing.',
      scriptureRef: 'Acts 3:19–21',
    },
  ],

  featuredScriptureId: 'js-history-1-17',

  reflectionQuestions: [
    'If God loves His children, why would a restoration make sense instead of "many versions" of the Gospel?',
    'What impacts you most about the First Vision: that God answered, or that He answered an ordinary young man?',
    'If God confirmed to you that the Book of Mormon is true, what would change in your real life?',
    'What kind of answer would you be willing to accept as an answer from the Holy Ghost (peace, clarity, conviction, desire to do good)?',
    'What is preventing you from asking God sincerely: fear, pride, wounds, past experiences, distraction?',
  ],

  reflectionPrompt:
    'Write what you think and feel about this phrase: "God still speaks and can answer me." Then write a prayer (in your own words) asking God for guidance and confirmation.',

  finalMessage:
    'The Restoration is hopeful news: God has not withdrawn from the world. He continues to work.\n\nYou don\'t have to figure it all out today. Just take the next honest step: read, pray, and listen. God knows how to speak to a sincere heart.',

  recommendedNext: 'plan-of-salvation',
};

const planOfSalvation: Lesson = {
  id: 'plan-of-salvation',
  title: 'The Plan of Salvation',
  subtitle: 'Stage: Investigator · 25–30 min',
  description:
    'Understand where we come from, why we are here, where we are going, and how Jesus Christ makes it possible to return to God with hope and purpose.',
  icon: '🧭',
  estimatedMinutes: 30,

  introParagraph:
    'Many people live with deep questions: "Why do I exist?", "What is the meaning of pain?", "What happens when we die?"\n\nThe Plan of Salvation answers with clarity and hope: your life is not an accident, your pain is not useless, and your future is not closed. God has a plan centered on Jesus Christ for your progress and eternal happiness.',

  sections: [
    {
      id: 'pos-1',
      title: 'God has a work and a glory',
      content:
        'The plan doesn\'t start with you: it starts with the Father\'s heart.\n\nGod doesn\'t seek control; He seeks your growth. His purpose is to bring you to immortality and eternal life.\n\n👉 If you understand this, it changes how you interpret life: you\'re not a product of chaos; you\'re a child in process.',
      scriptureRef: 'Moses 1:39',
    },
    {
      id: 'pos-2',
      title: 'Pre-mortal life: identity and purpose before birth',
      content:
        'Before coming to earth, we lived with God as His spirit children. There we learned, were known, and loved.\n\nEarth is not the beginning of your story; it\'s a crucial chapter.\n\n👉 This explains why we feel hunger for purpose and truth: we come from a real place.',
      scriptureRef: 'Jeremiah 1:5',
    },
    {
      id: 'pos-3',
      title: 'Mortal life: the body, agency, and trials',
      content:
        'We come to earth to receive a body, learn to choose good, and become more like Christ.\n\nTrials don\'t prove that God doesn\'t love you; many times they prove that God is shaping you.\n\n👉 Without agency there is no real growth. God doesn\'t manufacture robots; He raises children.',
      scriptureRef: '2 Nephi 2:25–27',
    },
    {
      id: 'pos-4',
      title: 'The Fall: it wasn\'t the end, it was the door',
      content:
        'The Fall didn\'t ruin the plan; it opened the experience.\n\nBecause of it there exists: mortal life, families, learning, and the need for a Savior.\n\n👉 The Gospel doesn\'t teach hopelessness because of the Fall; it teaches purpose and redemption.',
      scriptureRef: 'Genesis 3:6–7',
    },
    {
      id: 'pos-5',
      title: 'Jesus Christ: the center of the plan',
      content:
        'The plan has a center: Jesus Christ.\n\nHe overcomes death through resurrection and overcomes sin through the Atonement.\n\nThis means God doesn\'t just give you commandments: He gives you a real Savior to lift you when you fall.',
      scriptureRef: 'John 3:16',
    },
    {
      id: 'pos-6',
      title: 'What happens when we die?',
      content:
        'Death is not the end. The spirit continues to live.\n\nGod is just and merciful: no one is left "out" for not having understood everything in time. He provides a plan of justice, teaching, and opportunity according to His wisdom.\n\n👉 Death doesn\'t cancel God\'s love or the purpose of your life.',
      scriptureRef: 'John 14:2',
    },
    {
      id: 'pos-7',
      title: 'Resurrection and judgment: hope with responsibility',
      content:
        'Everyone will be resurrected by Jesus Christ. Then we will be judged by our works and desires.\n\nIt\'s not a judgment to humiliate, but to place you in the degree of glory you\'re willing to receive.\n\n👉 God is not unjust: He rewards the light we embrace.',
      scriptureRef: '1 Corinthians 15:20–22',
    },
  ],

  featuredScriptureId: 'moses-1-39',

  reflectionQuestions: [
    'What changes in your life if you accept that you\'re not an accident, but a child of God with purpose?',
    'Which part of the plan gives you the most hope: forgiveness, resurrection, or the idea of eternal progress?',
    'How does your view of pain change if you understand that mortal life is a school, not a sentence?',
    'What "big question" would you like to ask God about your life and your future?',
    'If God has a plan, what would be a small but real "next step" toward Him this week?',
  ],

  reflectionPrompt:
    'Write: (1) where you believe you come from spiritually, (2) why you believe you\'re here, and (3) what hope it gives you to know that death is not the end. End with a simple prayer asking for understanding.',

  finalMessage:
    'The Plan of Salvation doesn\'t promise an easy life. It promises a life with meaning.\n\nGod didn\'t bring you here to lose you. He brought you here so you can learn, change, and return home with more light.',

  recommendedNext: 'gospel-of-jesus-christ',
};

const gospelOfJesusChrist: Lesson = {
  id: 'gospel-of-jesus-christ',
  title: 'The Gospel of Jesus Christ',
  subtitle: 'Stage: Investigator · 25–30 min',
  description:
    'Learn the practical path to come to Christ: faith, repentance, baptism, the gift of the Holy Ghost, and enduring to the end.',
  icon: '✨',
  estimatedMinutes: 30,

  introParagraph:
    'The Gospel of Jesus Christ is not just religious information: it is a path of transformation.\n\nGod doesn\'t just want you to believe something; He wants you to become someone new in Christ. That change happens through clear steps that the Lord Himself established.',

  sections: [
    {
      id: 'goc-1',
      title: 'Faith in Jesus Christ',
      content:
        'Faith is not denying reality: it is trusting Christ enough to act.\n\nFaith grows when you do small things with sincerity: read, pray, obey what you already understand.\n\n👉 Faith begins as a desire… and strengthens with decisions.',
      scriptureRef: 'Alma 32:21',
    },
    {
      id: 'goc-2',
      title: 'Repentance: real change, not punishment',
      content:
        'Repenting is not "paying" for sinning. It is returning to God.\n\nIt involves: recognizing, feeling godly sorrow, abandoning sin, confessing when appropriate, repairing when possible, and moving forward in Christ.\n\n👉 Repentance is evidence of hope, not defeat.',
      scriptureRef: 'Doctrine and Covenants 58:42–43',
    },
    {
      id: 'goc-3',
      title: 'Baptism by immersion',
      content:
        'Baptism is an ordinance of entry to the covenant path. It symbolizes: dying to the old self, being born to a new life.\n\nIt is a public and sacred declaration: "I want to follow Christ."',
      scriptureRef: 'Mark 16:16',
    },
    {
      id: 'goc-4',
      title: 'The gift of the Holy Ghost',
      content:
        'After baptism, the Lord offers the gift of the Holy Ghost through the laying on of hands.\n\nThe Holy Ghost guides, comforts, testifies, and sanctifies. He doesn\'t eliminate all problems, but He changes you inside to face them with power.',
      scriptureRef: 'Acts 8:17',
    },
    {
      id: 'goc-5',
      title: 'Endure to the end',
      content:
        'Following Christ is not an event; it\'s a lifestyle.\n\nEnduring includes: continuing in prayer, scriptures, Sacrament, service, and constant repentance.\n\n👉 God doesn\'t expect instant perfection. He expects humble consistency.',
      scriptureRef: '2 Nephi 31:20',
    },
    {
      id: 'goc-6',
      title: 'Why does this path work?',
      content:
        'Because it\'s not a "human" path: it\'s Christ\'s path.\n\nGod works with you step by step. Each principle brings you closer to Him and strengthens your spiritual identity.',
      scriptureRef: 'John 14:6',
    },
  ],

  featuredScriptureId: 'john-14-6',

  reflectionQuestions: [
    'What\'s the difference between "believing in Christ" and "following Christ"?',
    'Which part of repentance is hardest for you: recognizing, abandoning, repairing, or forgiving yourself?',
    'If you were baptized, what would you be declaring to God and to yourself?',
    'What habits would help you endure more consistently (without falling into toxic guilt)?',
    'What small step of faith can you take this week to draw closer to Christ?',
  ],

  reflectionPrompt:
    'Write your personal "map" toward Christ: (1) what you believe today, (2) what you need to change, (3) what you\'d like to ask God for strength. Then write a prayer asking for help to take the next step.',

  finalMessage:
    'Christ didn\'t come to complicate your life with rules. He came to rescue you and lift you up.\n\nThe Gospel is not a ladder to show off: it\'s a path to heal.',

  recommendedNext: 'commandments',
};

const commandments: Lesson = {
  id: 'commandments',
  title: 'The Commandments',
  subtitle: 'Stage: Investigator · 25–35 min',
  description:
    'Understand that commandments are an expression of love, protection, and spiritual power; and how living them brings freedom, peace, and revelation.',
  icon: '🧱',
  estimatedMinutes: 35,

  introParagraph:
    'Many people see commandments as limits. God sees them as protection.\n\nThe commandments are not a "remote control" to govern you; they are the path for your life to be freer, cleaner, and stronger. Obedience is not perfection: it is sincere loyalty to Christ.',

  sections: [
    {
      id: 'cmd-1',
      title: 'The why of commandments',
      content:
        'God doesn\'t give commandments to humiliate, but to elevate.\n\nA loving father warns his child about what destroys. God does the same, but with eternal vision.\n\n👉 Commandments are signs on the path: they prevent you from straying from purpose.',
      scriptureRef: 'John 14:15',
    },
    {
      id: 'cmd-2',
      title: 'Prayer and Scriptures: daily connection',
      content:
        'Prayer is not a ritual: it is relationship.\n\nScriptures are not "ancient text": they are spiritual food. Together, prayer and scriptures create sensitivity to the Spirit.\n\n👉 If you want guidance, you need an open channel.',
      scriptureRef: 'Matthew 7:7',
    },
    {
      id: 'cmd-3',
      title: 'The Law of Chastity: dignity and power',
      content:
        'Chastity protects what is sacred: your body, your mind, and your capacity to love.\n\nGod is not "against pleasure"; He is against what enslaves, distorts, and destroys.\n\n👉 Purity is not shame: it is power.',
      scriptureRef: '1 Corinthians 6:19–20',
    },
    {
      id: 'cmd-4',
      title: 'The Word of Wisdom: self-mastery and clarity',
      content:
        'God wants a people who are strong, healthy, and spiritually sensitive.\n\nThis commandment develops self-mastery, protects your body, and increases mental clarity.\n\n👉 It\'s not a health fad: it\'s spiritual discipline.',
      scriptureRef: 'Doctrine and Covenants 89:18–21',
    },
    {
      id: 'cmd-5',
      title: 'Tithing: practical faith',
      content:
        'Tithing doesn\'t buy blessings. It is a declaration of trust: "God comes first."\n\nThe Lord promises to open the windows of heaven, not always as extra money, but as provision, peace, and direction.',
      scriptureRef: 'Malachi 3:10',
    },
    {
      id: 'cmd-6',
      title: 'The Sabbath day: renewing the soul',
      content:
        'God established a day to set ourselves apart from the common and remind ourselves of the eternal.\n\nKeeping the Sabbath strengthens faith, family, and inner peace.\n\n👉 Without spiritual rest, the soul dries up.',
      scriptureRef: 'Exodus 20:8–11',
    },
  ],

  featuredScriptureId: 'john-14-15',

  reflectionQuestions: [
    'Which commandment is hard for you to understand and why?',
    'Which commandment, if you lived it better, would give you more immediate peace?',
    'What "modern slaveries" have you seen that harm people (addictions, pride, resentment, pornography, consumerism)?',
    'How does obedience change when you see it as love and not as pressure?',
    'What specific habit do you want to improve this week with God\'s help?',
  ],

  reflectionPrompt:
    'Write a short list: (1) a commandment you already live well, (2) one you want to improve, (3) a spiritual reason why it\'s worth it. End with a prayer asking for strength and clarity.',

  finalMessage:
    'The commandments are not a cage; they are a path.\n\nObedience doesn\'t take away your identity: it gives it back. And when you fall, Christ doesn\'t crush you; He lifts you up.',

  recommendedNext: 'laws-and-ordinances',
};

const lawsAndOrdinances: Lesson = {
  id: 'laws-and-ordinances',
  title: 'Laws, Ordinances, and Covenants',
  subtitle: 'Stage: Investigator · 30–40 min',
  description:
    'Understand why God uses ordinances and covenants, what baptism and confirmation mean, and how the Sacrament renews the covenant with Christ.',
  icon: '🕯️',
  estimatedMinutes: 40,

  introParagraph:
    'God doesn\'t just give ideas: He establishes covenants.\n\nA covenant is a serious and sacred relationship. It is not "social religion"; it is real union with Christ. That\'s why ordinances exist: they are visible acts that God uses to seal invisible promises.',

  sections: [
    {
      id: 'loc-1',
      title: 'What is a covenant?',
      content:
        'A covenant is a mutual promise between God and a person.\n\nGod promises power, forgiveness, guidance, and eternal life. We promise to follow Christ and keep His commandments.\n\n👉 The covenant gives you identity: you no longer walk alone; you walk with Christ.',
      scriptureRef: 'Mosiah 18:8–10',
    },
    {
      id: 'loc-2',
      title: 'What is an ordinance?',
      content:
        'An ordinance is a sacred act with authority.\n\nGod uses ordinances to mark real stages on the Gospel path (like baptism or the Sacrament).\n\n👉 It\'s not religious theater: it\'s obedience with promise.',
      scriptureRef: 'John 3:5',
    },
    {
      id: 'loc-3',
      title: 'Baptism: entry to the covenant path',
      content:
        'Baptism is an essential ordinance. It symbolizes cleansing, a new beginning, and belonging to the Lord\'s people.\n\nIt is done by immersion because it represents burial and resurrection to a new life.',
      scriptureRef: 'Romans 6:4',
    },
    {
      id: 'loc-4',
      title: 'Confirmation: receiving the Holy Ghost',
      content:
        'After baptism, the gift of the Holy Ghost is conferred through the laying on of hands.\n\nThis brings more constant companionship and clearer guidance on the Gospel path.',
      scriptureRef: 'Acts 8:17',
    },
    {
      id: 'loc-5',
      title: 'The Sacrament: renewing covenants',
      content:
        'The Sacrament is a weekly reminder of the Savior.\n\nWe renew the covenant to take His name upon us, always remember Him, and keep His commandments.\n\n👉 And God promises: "they may always have His Spirit to be with them."',
      scriptureRef: 'Doctrine and Covenants 20:77',
    },
    {
      id: 'loc-6',
      title: 'Authority and order: God does things correctly',
      content:
        'Ordinances require priesthood authority.\n\nThis is not elitism; it is order. God is a God of order, not confusion.\n\n👉 Authority protects the validity of ordinances.',
      scriptureRef: 'Hebrews 5:4',
    },
    {
      id: 'loc-7',
      title: 'What all this means for you',
      content:
        'God doesn\'t just ask you to "believe something." He invites you to enter a real relationship.\n\nThe Gospel becomes more than emotion: it becomes covenant, direction, and power.\n\n👉 When you make covenants, your faith stops being theory.',
      scriptureRef: '3 Nephi 18:11',
    },
  ],

  featuredScriptureId: 'dc-20-77',

  reflectionQuestions: [
    'What\'s the difference between "attending a church" and "making a covenant with God"?',
    'What gives you more peace: knowing that God forgives, or knowing that God guides?',
    'What fears come to you when you think about baptism and committing to Christ?',
    'How would your week change if you took the Sacrament really thinking about the Savior?',
    'What promise would you like to make to God sincerely (even if small) this week?',
  ],

  reflectionPrompt:
    'Write what it means to you to make a covenant with God. Then write a prayer expressing your desire (or your doubts) about being baptized and following Christ more seriously.',

  finalMessage:
    'God works through covenants because He loves with purpose.\n\nWhen you take that step, you don\'t become perfect: you become committed. And Christ sustains the committed.',

  recommendedNext: undefined,
};

// ===============================
// PME+ CORE LESSONS ARRAY (English)
// ===============================
export const coreLessonsEn: Lesson[] = [
  restorationOverview,
  planOfSalvation,
  gospelOfJesusChrist,
  commandments,
  lawsAndOrdinances,
];

// ===============================
// LIBRARY LESSONS (Non-Core) - English
// ===============================
export const libraryLessonsEn: Lesson[] = [
  {
    id: 'heavenly-father',
    title: 'God Is Our Heavenly Father',
    subtitle: 'Stage: Investigator · 15–20 min',
    description:
      'Help the investigator understand who God is, who they are before God, and how that truth changes daily life.',
    icon: '👑',
    estimatedMinutes: 20,
    introParagraph:
      'One of the deepest human questions is: "Who am I… and why am I here?" The answer of the Gospel begins with a simple but transforming truth: God is not a distant or impersonal being. He is our Heavenly Father. This teaching does not only define God; it redefines your worth, your purpose, and your destiny.',
    sections: [
      {
        id: 'hf-1',
        title: 'Who is God?',
        content:
          'God is a real, living, conscious Being. He is not abstract energy or a faceless force.\n\nIn the restored Gospel we learn that: God has a glorified, perfected body. He possesses all knowledge, all power, and all goodness. He governs with justice but acts with love.\n\nGod does not create on a whim or rule by fear. His work and His glory are clear: "For behold, this is my work and my glory—to bring to pass the immortality and eternal life of man." (Moses 1:39)\n\n👉 That means your eternal welfare is His personal work.',
        scriptureRef: 'Moses 1:39',
      },
      {
        id: 'hf-2',
        title: 'God is a Father, not only a Creator',
        content:
          'Many people believe in God but do not feel like sons or daughters of God. The difference is huge.\n\nIf God were only a creator: we might admire Him, fear Him, or obey Him from a distance. But if God is our Father: He knows us individually, cares about our struggles, desires our real happiness—not only outward obedience.\n\nJesus Christ taught us to pray, "Our Father which art in heaven…" (Matthew 6:9) He did not say "Our Creator" or "Supreme Being." He said Father.\n\n👉 That implies closeness, relationship, and personal love.',
        scriptureRef: 'Matthew 6:9',
      },
      {
        id: 'hf-3',
        title: 'Your eternal identity',
        content:
          'If God is your Father, then you are not an accident, a mistake, or a coincidence.\n\nBefore birth: you lived as a spirit, learned, and were known by God. In this life: you receive a body, face trials, and build character. After this life: you will continue to live, grow, and draw nearer to God.\n\nThat means: your worth does not depend on your achievements; your mistakes do not define your eternal identity; your life has divine purpose even when you do not understand everything.',
      },
      {
        id: 'hf-4',
        title: 'Where is God when we suffer?',
        content:
          'One of the most honest questions is: "If God is my Father, why does He allow pain?"\n\nThe Gospel does not teach that God prevents all suffering. It teaches that God walks with us through it. As a loving Father: He allows trials that strengthen us, respects our agency, and even uses pain to teach us.\n\nGod does not delight in suffering, but He is never indifferent to it. Jesus Christ Himself suffered deeply so He could understand and help us.',
      },
      {
        id: 'hf-5',
        title: 'How this truth changes your daily life',
        content:
          'Believing God is your Father changes:\n\n🔹 How you see yourself — You are not defined only by your mistakes. You understand you have divine dignity.\n\n🔹 How you face decisions — You seek His guidance. You trust that He wants what is best for you.\n\n🔹 How you pray — You speak with confidence. You speak honestly. You know someone is listening.\n\n🔹 How you treat others — You recognize that everyone is a child of God. You grow in compassion and patience.',
      },
    ],
    featuredScriptureId: '1-john-3-1',
    reflectionQuestions: [
      'What is the difference between believing in God and feeling like a son or daughter of God?',
      'How would your life change if you really trusted that God knows you by name?',
      'When have you felt you were not alone, even without understanding why?',
      'What parts of your life would you like to trust more to a loving Father?',
    ],
    reflectionPrompt:
      'What does it mean to me to believe God is my Heavenly Father, and how do I want that truth to shape my daily choices? Write honestly. Do not look for fancy words; look for true words.',
    finalMessage:
      'It does not matter where you come from. It does not matter how many times you have failed. It does not matter how far away you feel. If God is your Father, then: your story is not over, your worth is intact, your life has hope. Walk at your own pace. Explore calmly. God is not in a hurry with you.',
    recommendedNext: 'jesus-christ',
  },
  {
    id: 'jesus-christ',
    title: 'Jesus Christ: Our Savior and Redeemer',
    subtitle: 'Stage: Investigator · 20–25 min',
    description:
      'Help the investigator know who Jesus Christ is, why He is central to God’s plan, and how His life and sacrifice matter in their life today.',
    icon: '🌟',
    estimatedMinutes: 25,
    introParagraph:
      'Throughout history, millions have spoken of Jesus Christ. Some see Him as a great teacher. Others, as a moral prophet. Others, as an inspiring figure from the past. But the restored Gospel testifies of something deeper: Jesus Christ did not only teach the way. He IS the way. Knowing Jesus Christ is not only learning about Him; it is beginning a relationship that changes life.',
    sections: [
      {
        id: 'jc-1',
        title: 'Who is Jesus Christ, really?',
        content:
          'Jesus Christ is: The Only Begotten Son of God the Father in the flesh. Jehovah of the Old Testament. The Creator, under the direction of the Father. The Savior and Redeemer of all mankind.\n\nBefore He was born in Bethlehem, Jesus Christ already existed. He lived with God the Father in premortal life and accepted a sacred mission: to come to earth, live without sin, and offer Himself for all of us.\n\nThat means His life was not a historical accident but the fulfillment of an eternal plan.',
      },
      {
        id: 'jc-2',
        title: 'Why did we need a Savior?',
        content:
          'Every human being faces two inevitable realities: Physical death. Sin and weakness.\n\nOn our own: we cannot overcome death, we cannot erase our faults, we cannot fully heal the wounds of the soul.\n\nGod, as a loving Father, prepared a solution: Jesus Christ. Jesus Christ came to do for us what we could not do alone.',
      },
      {
        id: 'jc-3',
        title: 'The Atonement of Jesus Christ',
        content:
          'The Atonement is the central act of the Gospel. It includes: His suffering in Gethsemane, His death on the cross, His glorious resurrection.\n\nIn Gethsemane, Jesus Christ took upon Himself: our sins, our guilt, our pains, our sorrows, our sicknesses of soul. Nothing you have lived is beyond His understanding.\n\nThe Atonement does not only cleanse sin; it heals, strengthens, and restores.',
      },
      {
        id: 'jc-4',
        title: 'The Resurrection: hope for everyone',
        content:
          'Jesus Christ overcame death. Because of His resurrection: everyone will be resurrected, every physical separation will end, death is not the end.\n\nResurrection is an unconditional gift to all mankind. That means: you will live again, your body will be restored, death does not have the last word.',
      },
      {
        id: 'jc-5',
        title: 'What does it mean to follow Jesus Christ today?',
        content:
          'Following Jesus Christ does not mean being perfect. It means learning, changing, and trusting.\n\nFollowing Christ includes: repenting when we fail, forgiving when it hurts, loving when it is hard, continuing when we are tired.\n\nJesus Christ does not ask us to carry everything alone. He walks ahead of us, beside us, and within us through His Spirit.',
      },
      {
        id: 'jc-6',
        title: 'Jesus Christ and your daily life',
        content:
          '🔹 When you feel guilty — He offers real forgiveness, not eternal shame.\n\n🔹 When you feel broken — He offers healing, not only judgment.\n\n🔹 When you feel alone — He promises constant companionship.\n\n🔹 When you do not know what to do — He is the perfect example to follow.\n\nJesus Christ does not only save at the end of life; He sustains us during life.',
      },
    ],
    featuredScriptureId: 'john-3-16',
    reflectionQuestions: [
      'What ideas did I have about Jesus Christ before studying this lesson?',
      'Why do you think God allowed His Son to suffer for us?',
      'In what areas of your life do you need Christ’s healing power more?',
      'What does it mean for you to "follow Jesus Christ" in practical terms?',
    ],
    reflectionPrompt:
      'What does Jesus Christ mean to me today, and how do I want to draw nearer to Him in daily life? Write without fear. Jesus Christ knows your heart even before you put it into words.',
    finalMessage:
      'Jesus Christ did not come to create a cold religion. He came to offer life, light, and hope. It does not matter how far away you feel. It does not matter how many times you have failed. If you take one step toward Him, He will take many toward you.',
    recommendedNext: 'holy-ghost',
  },
];

// Combined lessons array for English
export const lessonsEn: Lesson[] = [
  ...coreLessonsEn,
  ...libraryLessonsEn,
];
