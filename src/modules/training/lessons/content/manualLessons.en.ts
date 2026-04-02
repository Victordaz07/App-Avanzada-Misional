/**
 * Lessons aligned with official manuals (original summaries + links).
 * EN: scripture references in standard English form.
 */

import type { TrainingLessonContent } from './trainingLessonContent.types';

const URL_TSW_EN =
  'https://www.churchofjesuschrist.org/study/manual/teaching-in-the-saviors-way-2022?lang=eng';
const URL_HB_EN = 'https://www.churchofjesuschrist.org/study/manual/general-handbook?lang=eng';

const H = {
  objectives: 'Lesson objectives',
  brief: 'Key ideas',
  scriptures: 'Scriptures to study',
  didYouKnow: 'Reflection',
  practice: 'Personal practice',
  practiceHint: 'Check each item when you have sincerely tried it this week.',
  practiceDone: 'Done',
  practicePending: 'Pending',
  reflection: 'Reflection',
  reflectionHint: 'Write honestly; you can clear this anytime.',
  reflectionPh: 'Your answer…',
  action: 'This week’s commitment',
} as const;

function tswLinks(): NonNullable<TrainingLessonContent['officialLinks']> {
  return [
    { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    { label: 'General Handbook — Teach the Gospel (section 17)', url: URL_HB_EN },
  ];
}

function hbLink(chapterHint: string): NonNullable<TrainingLessonContent['officialLinks']> {
  return [{ label: `General Handbook — ${chapterHint}`, url: URL_HB_EN }];
}

export const MANUAL_LESSONS_EN: Record<string, TrainingLessonContent> = {
  'tsw-1-1': {
    intro:
      'Every class or talk can draw people toward Christ when the teacher keeps that true north. This lesson summarizes the official manual’s focus; it does not replace it.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Define what it means to “teach about Christ” even when the topic feels practical or administrative.',
      'Choose one question or invitation that makes the Savior the center of your next lesson.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The manual *Teaching in the Savior’s Way* invites us to make Jesus Christ more than a preamble—He is the purpose: faith, repentance, covenants, and the Holy Ghost. The General Handbook links those principles to teaching at home and at church.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: '2 Nephi 25:26', text: '…we talk of Christ, we rejoice in Christ…' },
      { ref: 'John 17:3', text: '…this is life eternal, that they might know thee… and Jesus Christ…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: [
      'You can finish every item on a lesson outline and still miss the heart if Christ is not the hero of the story.',
      'Read part 1 in the official manual and note one phrase you want to remember.',
    ],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Write your next lesson title and one sentence: “What I want them to feel about Christ is…”',
      'Pick a short verse that ties the topic to His divinity or Atonement.',
      'Draft a question that invites faith in Him (not just opinion-sharing).',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Which topics are hardest for you to connect to Christ without forcing it?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText:
      'In your next prep, spend the first five minutes praying: “What does the Savior want these people to learn or feel?”',
  },
  'tsw-1-2': {
    intro:
      'Helping others “come unto Christ” is more than information—it invites trust, repentance, following the Spirit, and covenant endurance.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Recognize signs that a lesson builds faith in the Savior.',
      'Plan a simple, respectful invitation to repentance or personal study.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The Savior invited, testified, and made space for agency. The work of salvation and exaltation described in the General Handbook advances when we teach in ways that help people want to draw closer to Him.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Matthew 11:28–30', text: 'Come unto me… and ye shall find rest unto your souls.' },
      { ref: 'Moroni 10:32', text: 'Yea, come unto Christ, and be perfected in him…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: [
      'Pressure to “cover everything” can crowd out a clear invitation to change of heart.',
    ],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'List three common needs in your group (fear, fatigue, guilt) and how Christ responds with compassion.',
      'Write a brief closing invitation (prayer, home study, fast, sacrament).',
      'Ask whether your language respects moral agency.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['When did a class truly draw you closer to the Savior?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Include at least one explicit invitation to act in faith in Christ in your next teaching moment.',
  },
  'tsw-2-1': {
    intro:
      'Sincere love prepares the heart to hear the Spirit; without it, doctrine can feel cold.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Identify one concrete action that shows love before or after you teach.',
      'Avoid three tones that often quench the Spirit (sarcasm, comparison, shame).',
    ],
    briefHeading: H.brief,
    briefBody:
      'The manual presents love as motivation, not technique. The General Handbook connects that principle to edifying meetings and respect for each learner.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'John 13:34', text: '…love one another; as I have loved you…' },
      { ref: 'Moroni 8:26', text: '…persuade with love…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Love shows in how you receive “wrong” or silent answers.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Greet or thank someone from your class personally this week.',
      'Review a recent comment you made—did it sound condescending?',
      'Pray for a learner by name before you teach.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Which learner needs you to believe in them more than they believe in themselves?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Send a short note of encouragement to a class member (text or card).',
  },
  'tsw-2-2': {
    intro:
      'Teaching by the Spirit requires preparation, personal worthiness, and flexibility to follow impressions.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Separate “finishing the outline” from “being led by the Spirit.”',
      'Prepare plan A and a spiritual plan B (alternate question or emphasis).',
    ],
    briefHeading: H.brief,
    briefBody:
      'Doctrine and Covenants teaches that the Spirit speaks to mind and heart; the manual applies that to classroom and home. The General Handbook reminds leaders to support—not replace—the teacher’s inspiration.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Doctrine and Covenants 8:2', text: '…will tell you in your mind and in your heart…' },
      { ref: 'Doctrine and Covenants 50:13–14', text: '…teach one another the doctrine… by the Spirit…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Sometimes the Spirit shortens your lesson; other times you linger on one verse.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Reserve quiet prayer time before you teach.',
      'Write one question you could drop if the Spirit leads elsewhere.',
      'Ask someone to pray for you that day.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['When did the Savior redirect your lesson even though your plan changed?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Add a literal margin note in your outline: “Spirit / impression.”',
  },
  'tsw-2-3': {
    intro:
      'Gospel doctrine carries power; facts or opinions alone rarely change souls durably.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'State one clear doctrinal outcome for your next teaching block.',
      'Separate “interesting story” from “saving principle.”',
    ],
    briefHeading: H.brief,
    briefBody:
      'The manual invites us to teach truths emphasized by the President of the Church and the scriptures. The General Handbook warns against speculation.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Doctrine and Covenants 42:14', text: '…teach the principles of my gospel…' },
      { ref: '2 Timothy 3:16–17', text: '…scripture… for doctrine…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['One well-founded sentence can outweigh ten busy slides.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Choose a principle from Come, Follow Me or official curriculum and cite the source.',
      'Remove one embellishment that does not strengthen doctrine.',
      'Prepare a question that leads to scripture, not only opinion.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What doctrinal mix-up tends to confuse your group?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Write the central doctrine of your lesson in one sentence on a card.',
  },
  'tsw-2-4': {
    intro:
      'Ask, seek, knock: the Savior invited diligence; teachers design real participation.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Add at least one study or reflection task before or after class.',
      'Avoid having the teacher speak ninety percent of the time.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Diligent learning connects home and church. The General Handbook describes Sunday School and other meetings as support for personal and family study.',
    scripturesHeading: H.scriptures,
    scriptures: [
      { ref: 'Matthew 7:7–8', text: 'Ask, and it shall be given you; seek, and ye shall find…' },
      { ref: 'Doctrine and Covenants 88:118', text: '…seek learning, even by study…' },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Optional reading lists honor agency better than endless lecture.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Assign brief scripture reading for next week.',
      'Plan a two-minute pair or trio activity.',
      'Ask “What will you do differently?” not only “What did you learn?”',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What habit do I model for my learners?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Write a concrete assignment into your lesson closing.',
  },
  'tsw-3-1': {
    intro:
      'Children, youth, adults, converts, and families learn differently; charity adjusts methods without changing doctrine.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Choose a valid adaptation for your group (time, language, accessibility).',
      'Consult leaders when needs are sensitive.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Part 3 of the manual offers context-specific suggestions. The General Handbook addresses organizations and members with special needs.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Moroni 7:45', text: '…is patient and kind… seeketh not her own…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Asking a parent or assistant teacher “What helps?” prevents assumptions.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'List barriers (schedule, language, fatigue) in your group.',
      'Pick one simple fix (pauses, visuals, repetition).',
      'Coordinate with the presidency if pastoral care is needed.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Whom do I tend to overlook when I plan?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Make one small, measurable inclusion change in your next class.',
  },
  'tsw-3-2': {
    intro:
      'An outline is not a rigid script—it orders time, doctrinal outcomes, and Spirit-led moments.',
    officialLinks: [
      ...tswLinks(),
      { label: 'Lesson example in TSW manual (part 3)', url: URL_TSW_EN },
    ],
    objectivesHeading: H.objectives,
    objectives: [
      'Write objective, anchor verse, and closing question.',
      'Align each segment with a principle from part 2 of the manual.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The manual shows a sample lesson plan; use it as a template, not a copy. Ward leaders can clarify time and focus expectations.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrine and Covenants 88:77', text: '…teach one another the doctrine…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['If your outline is longer than one page, you may be talking too much.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Time your introduction (max 3–4 minutes).',
      'Write the single most important question of the class.',
      'Reserve space for brief testimony or music if appropriate.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Which part of class usually eats the Spirit’s time?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Complete a one-page outline for your next lesson.',
  },
  'tsw-3-3': {
    intro:
      'Growing as a teacher takes humility and data: what worked, what did not, and what you will change.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Use the manual’s self-assessment as a mirror, not a shame list.',
      'Ask a peer for specific feedback.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The manual’s self-review touches love, Spirit, doctrine, and diligent learning. Leaders support with pastoral interviews, not micromanagement.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Proverbs 15:22', text: '…in the multitude of counsellors…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['One improvement per month beats ten vague promises.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Rate 1–5 your spiritual preparation for your last class.',
      'Write one strength and one improvement with concrete evidence.',
      'Schedule when you will revisit the note.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What am I afraid someone will say if I ask for honest input?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Share your improvement focus with a trusted person and ask for one suggestion.',
  },
  'tsw-3-4': {
    intro:
      'Teacher council meetings strengthen—they are not for embarrassment: share ideas and pray for each other.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Bring a useful question (not only a report).',
      'Respect confidentiality and time.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The General Handbook and TSW manual describe purposes for these gatherings. Participate with meekness and gratitude.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Ephesians 4:11–12', text: '…for the perfecting of the saints…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Hearing another teacher for one minute can unlock more than a long theory talk.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Read the General Handbook section on teacher council meetings.',
      'Write a real pedagogical question (not gossip about a person).',
      'Offer support to a fellow teacher this week.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['How can I help the council feel safe?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Bring one concrete question to the next teacher council.',
  },
  'tsw-3-5': {
    intro:
      'Bishops, stake presidents, and organization presidents can guide, provide resources, and protect prep time.',
    officialLinks: tswLinks(),
    objectivesHeading: H.objectives,
    objectives: [
      'Know which leader to approach by topic (material, pastoral, building).',
      'Communicate needs early, not Saturday night.',
    ],
    briefHeading: H.brief,
    briefBody:
      'TSW includes guidance for leaders; the General Handbook divides responsibilities between ward and stake. Your calling does not leave you alone.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Mosiah 18:21', text: '…bear one another’s burdens…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Asking early honors leaders’ time and ministry.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Identify one official resource (app, video, article) you could use.',
      'If you need help, draft a brief, respectful message.',
      'Publicly thank a leader who helped you recently.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What resource am I missing, and who could help me get it?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Send one concrete support request to your direct leader this week.',
  },
  'org-eq-1': {
    layout: 'structured',
    intro:
      'Learn the purpose of the priesthood and how men can serve as disciples of Jesus Christ in their homes and communities.',
    overview:
      'This lesson teaches with doctrinal clarity the purpose of the elders quorum according to the General Handbook (section 8): to form disciples who minister, strengthen the home, serve with charity, and help prepare others for temple ordinances.\n\nEach section ends with a practical invitation so priesthood service becomes real discipleship this week.',
    officialLinks: [
      ...hbLink('section 8 — Elders Quorum'),
      { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    ],
    sections: [
      {
        id: 'priesthood',
        title: 'The priesthood',
        handbookRef:
          'General Handbook, section 8 — the elders quorum helps men use priesthood authority to bless people and families.',
        doctrine:
          'The priesthood is God’s authority and power delegated to man to act in His name for the salvation of His children.',
        explanation:
          'It is not a personal privilege, but a sacred responsibility to serve, bless, and guide.',
        example:
          'A worthy man uses the priesthood to bless his family, not to elevate himself above others.',
        application: [
          'Do I use the priesthood to serve, or only as a title?',
          'Am I living in a way that is worthy of that authority?',
        ],
        action:
          'Pray this week to better understand how to use the priesthood to bless someone.',
      },
      {
        id: 'ministering',
        title: 'Ministering as disciples',
        handbookRef:
          'General Handbook, section 8 — ministering is a central assignment of the elders quorum and is done with love and revelation.',
        doctrine:
          'Priesthood holders are responsible to minister as Jesus Christ did: with love, service, and revelation.',
        explanation:
          'Ministering is not a task; it is a way of living discipleship.',
        example:
          'A sincere message or visit can change someone’s life.',
        application: [
          'Do I know the real needs of the families I minister to?',
          'Am I truly present in their lives?',
        ],
        action:
          'Reach out to a family or brother this week with no agenda, only to serve.',
      },
      {
        id: 'home',
        title: 'Strengthen the home',
        handbookRef:
          'General Handbook, section 8 — priesthood leadership strengthens faith in the home and supports Christ-centered worship.',
        doctrine:
          'Priesthood men are responsible to strengthen their homes as centers of faith.',
        explanation: 'Spiritual leadership begins at home.',
        example:
          'A father who prays and studies the scriptures with his family builds a lasting spiritual atmosphere.',
        application: [
          'Am I guiding my home spiritually?',
          'What can I improve today?',
        ],
        action: 'Lead a family prayer or scripture study this week.',
      },
      {
        id: 'service',
        title: 'Service and self-reliance',
        handbookRef:
          'General Handbook, section 8 — the quorum helps care for those in need and promotes temporal and spiritual self-reliance.',
        doctrine:
          'The priesthood is exercised by serving and helping others become self-reliant.',
        explanation: 'Serving is central to discipleship.',
        example:
          'Helping someone find work or resolve a need is part of living the gospel.',
        application: [
          'Am I willing to serve without recognition?',
          'Whom can I help this week?',
        ],
        action: 'Do one concrete act of service this week.',
      },
      {
        id: 'temple',
        title: 'Spiritual preparation',
        handbookRef:
          'General Handbook, section 8 — quorum leaders and members help prepare people for temple covenants and ordinances.',
        doctrine:
          'Priesthood men help prepare others to receive temple ordinances.',
        explanation:
          'The temple is a central objective in the gospel path.',
        example:
          'A leader helps others progress spiritually toward the temple.',
        application: [
          'Am I moving forward toward the temple?',
          'Am I helping others do the same?',
        ],
        action: 'Make a personal plan to come closer to the temple.',
      },
    ],
  },
  'org-rs-1': {
    layout: 'structured',
    intro:
      'Learn Relief Society’s divine purpose and how to apply it in your life, your home, and Christlike service.',
    overview:
      'This lesson does not replace the General Handbook or Teaching in the Savior’s Way; it helps you live with intention what the Church already teaches: faith in Jesus Christ at the center, a strengthened home, and charitable service in harmony with priesthood keys.\n\nEach block ends with a concrete action. Read calmly, open the linked scriptures, and let the Spirit show you one real step for this week.',
    officialLinks: [
      ...hbLink('section 9 — Relief Society'),
      { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    ],
    scriptures: [
      { ref: 'Mosiah 18:8–9', text: '…bear one another’s burdens…' },
      { ref: '3 Nephi 18:21', text: '…pray in your families…' },
      { ref: 'Alma 34:38', text: '…not procrastinate the day of your preparation…' },
      { ref: 'Doctrine and Covenants 42:44–45', text: '…impart of your substance…' },
    ],
    sections: [
      {
        id: 'purpose',
        title: 'Divine purpose',
        handbookRef:
          'General Handbook, section 9 — Relief Society’s purpose tied to the work of salvation and exaltation and strengthening individuals and families.',
        doctrine:
          'Relief Society helps daughters of God prepare for eternal life through faith in Jesus Christ, strengthening the home, and serving others. Christ is the foundation: His Atonement, His gospel, and His example orient every purpose of the organization.',
        scriptures: [
          { ref: 'Moroni 10:32', text: '…come unto Christ, and be perfected in him…' },
          { ref: '2 Nephi 31:20', text: '…feasting upon the word of Christ…' },
        ],
        explanation:
          'It is not merely an auxiliary “for women.” It is a restored sisterhood with divine commission: build testimony and knowledge, care for those in need, strengthen unity and character, and work in harmony with priesthood leaders in the Lord’s work.',
        deepen:
          'When the General Handbook speaks of purpose, it points to lasting conversion, not isolated activities. Weekly meetings, service, and friendship matter when they draw us to the Savior and make us better able to bless real homes and people.\n\nAsk honestly whether your efforts in the Church are helping you trust Christ more, repent with joy, and serve with greater spiritual sensitivity.',
        keyPoints: [
          'Relief Society’s purpose is measured by faith in Christ, home, and charity—not social perfectionism.',
          'Presidencies and teachers work with keys the Lord has entrusted to priesthood leaders; collaboration is not competition.',
          'Sisterhood should be a refuge where doctrine is taught clearly and the “one” is cared for (Doctrine and Covenants 18:10), not a stage for comparison.',
        ],
        example:
          'A sister spends a few minutes each day reading the Book of Mormon and praying simply. Her children hear her speak of the Savior naturally. Without teaching a formal lesson, she is fulfilling the purpose of strengthening her home and her own conversion.',
        application: [
          'What concrete evidence do I have that I am growing in Christ—not just “showing up”?',
          'Does my home reflect faith, repentance, and charity, even in small steps?',
          'How can I align my personal goals with the stated purpose of the organization?',
        ],
        action:
          'Set aside at least 10 minutes a day, five days this week, for personal gospel study at home (scriptures or *Come, Follow Me*) and write down one phrase that draws you to Christ.',
      },
      {
        id: 'ministering',
        title: 'Ministering as Christ did',
        handbookRef:
          'General Handbook — member ministering and pastoral care within the ward (coordinate with the bishopric and organizations).',
        doctrine:
          'Ministering is caring for others as Jesus Christ would: with sincere love, intention, and revelation. The Savior saw people, not only problems; He listened, healed, forgave, and took practical steps directed by the Father.',
        scriptures: [
          { ref: 'John 13:34–35', text: '…as I have loved you…' },
          { ref: 'Mosiah 18:9', text: '…bear one another’s burdens…' },
        ],
        explanation:
          'Ministering is not a checklist of visits. It is a covenant of attention: learning names, circumstances, and hearts within healthy boundaries of confidentiality and respect. Sometimes service is a meal; sometimes a prayer on the porch; sometimes compassionate silence.',
        deepen:
          'Christ ministered as He saw the Father do (John 5:19). You can ask, “What does this sister need today?” Revelation often comes while you serve with intent—not while you postpone contact.\n\nAvoid “report mode”: authentic ministering rarely looks impressive on paper but can be sacred for the person who receives it.',
        keyPoints: [
          'Humble consistency beats sporadic heroism: small, frequent contacts build trust.',
          'Coordinate with the bishopric when ordinances, temporal assistance, or safeguarding are needed; do not carry alone what belongs to the whole flock.',
          'The line between love and gossip is discretion; ministering protects the other person’s dignity.',
        ],
        example:
          'A sister notices her ministering companion has been quiet in meetings. Instead of a generic text, she calls and listens for twenty minutes without preaching. At the end she offers a brief prayer. That afternoon the other sister feels seen.',
        application: [
          'Can I name something specific (not just “the ward”) about each sister I minister to?',
          'Do my contacts reflect Christlike love or task completion?',
          'Who should I reach toward this week with more intent and less hurry?',
        ],
        action:
          'Contact one assigned sister with no teaching agenda—only to listen and pray. If appropriate, bring a simple act of service (food, a walk, practical help).',
      },
      {
        id: 'covenants',
        title: 'Covenants and discipleship',
        handbookRef:
          'General Handbook and temple resources — life in covenant shapes identity, teaching, and service in Relief Society.',
        doctrine:
          'Sisters keep sacred covenants—baptism, gift of the Holy Ghost, priesthood as applicable, temple ordinances and sealings—that draw them to God and define their identity as disciples of Jesus Christ.',
        scriptures: [
          { ref: 'Mosiah 18:8–10', text: '…come into the fold of God…' },
          { ref: 'Doctrine and Covenants 64:10–11', text: '…forgive…' },
        ],
        explanation:
          'Covenants are not symbolic accessories: they are sacred obligations accepted before God. Honoring them shapes decisions about time, words, finances, purity, and priorities when no one is watching.',
        deepen:
          'Female discipleship in the Church is not an aesthetic lifestyle; it is daily surrender to the Lord Jesus Christ. The temple is not a side chapter: it is where you receive power to keep what you promised in the waters of baptism.\n\nWhen you teach, show that covenants are the “how” of Christian life, not only the “what” of doctrine.',
        keyPoints: [
          'Ongoing repentance is part of covenant faithfulness—not a sign of failure.',
          'The sacrament renews covenants; worthily partaking strengthens memory of the Savior.',
          'Temple promises require patience and obedience in small daily choices.',
        ],
        example:
          'Before accepting another Church commitment, a sister prays and checks whether the load will still let her honor family time and temple attendance. She says no to a good idea so she can say yes to what the Lord has asked in covenant.',
        application: [
          'Which recent choice reflected (or did not reflect) my covenants?',
          'Which part of my baptismal covenant needs strengthening: faith, repentance, testimony?',
          'How can I remember temple blessings respectfully during a busy week?',
        ],
        action:
          'Write in three sentences one concrete way you will honor your covenants this week (include a spiritual habit or a needed conversation, if applicable).',
      },
      {
        id: 'home',
        title: 'Strengthening the home',
        handbookRef:
          'General Handbook — home-centered, Church-supported gospel learning; Relief Society strengthens, not replaces, families.',
        doctrine:
          'The home is the center of gospel learning: there we learn to love, forgive, work, pray, and follow the Savior in daily choices. The Church provides doctrine and fellowship; the home is where most loyalties to Christ are practiced.',
        scriptures: [
          { ref: '3 Nephi 17:3', text: '…behold your little ones…' },
          { ref: 'Doctrine and Covenants 88:119', text: '…a house of order…' },
        ],
        explanation:
          'Relief Society meetings can inspire home study, but deep conversion happens midweek: tables, bedrooms, family texts, repentance, and laughter shared under the Spirit’s influence.',
        deepen:
          'Do not idealize a “perfect family” to discourage yourself. Strengthening the home includes single-member households, couples without children, single-parent families, and empty nests. In each case the question is: Is there room for Christ in conversation, calendar, and budget?\n\nRelief Society can be a bridge of resources and friendship without intruding on the home leadership the Lord has established.',
        keyPoints: [
          'Small rituals (a prayer as you leave, shared gratitude at dinner, a few verses) anchor the gospel in emotional memory.',
          'Home teaching of the gospel does not compete with Church programs; it gives them meaning.',
          'Asking forgiveness at home preaches the plan of salvation by example.',
        ],
        example:
          'An exhausted mother chooses three nights a week to power down screens ten minutes early to read one verse and ask, “Where did you see God’s hand today?” The change is not dramatic, but the spirit in the home softens.',
        application: [
          'What “spirit” do people feel when they enter my home: hurry, criticism, peace?',
          'What realistic spiritual practice can I sustain with my family—or with myself—this week?',
          'How can Relief Society support my home without replacing my responsibility?',
        ],
        action:
          'Establish a brief spiritual habit at home (prayer, one verse, *Come, Follow Me* with family, or visible personal study for children) at least three times this week.',
      },
      {
        id: 'selfReliance',
        title: 'Purposeful self-reliance',
        handbookRef:
          'General Handbook and self-reliance and charity resources — spiritual and temporal preparation to bless and be blessed with dignity.',
        doctrine:
          'God wants His daughters to grow in spiritual and temporal self-reliance: living faith, study and prayer habits, prudent health, wise finances, and skills that sustain the household and enable crisis service to others.',
        scriptures: [
          { ref: 'Doctrine and Covenants 38:30', text: '…prepared in all things…' },
          { ref: 'Proverbs 31:20', text: '…she stretcheth out her hand to the poor…' },
        ],
        explanation:
          'Self-reliance is not “doing everything alone” or refusing help out of pride. It is wisdom to align resources with the Lord’s priorities: family duties, service, and preparation for the unexpected.',
        deepen:
          'The Church offers principles and resources; conversion applies them with mercy toward yourself. Asking for help when there is real need is humility, not failure; refusing help out of prolonged shame can block the Savior’s design of bearing one another’s burdens.\n\nSpiritual self-reliance feeds temporal self-reliance: those who pray and study often make calmer decisions about money, health, and time.',
        keyPoints: [
          'A small emergency fund or savings habit can be an act of faith in the Lord’s provision.',
          'Caring for physical and mental health honors the body as a temple.',
          'Learning a useful skill (employment, home, language) expands your capacity to serve.',
        ],
        example:
          'Two sisters review a simple budget and set a minimum savings goal. A week later one can buy medicine without panic when her child is ill, and the other has margin to take food to an unemployed neighbor.',
        application: [
          'In which area (spiritual, physical, financial, emotional) am I most vulnerable?',
          'Do I depend on others too much because of poor boundaries, or struggle to ask for legitimate help?',
          'What small, measurable step can I take in the next seven days?',
        ],
        action:
          'Choose one simple goal and write it down: save a symbolic amount, walk three times, sleep one more hour, complete a self-reliance module, or seek pastoral guidance on debt. Take the first step before Sunday.',
      },
      {
        id: 'leadership',
        title: 'Leadership in the Savior’s way',
        handbookRef:
          'General Handbook — callings, presidencies, and teaching: lead by revelation and service, not by anxiety-driven administration.',
        doctrine:
          'Leadership in Relief Society is inspired service under the bishop’s direction and priesthood keys. Presidents, counselors, and teachers lead, teach, and shepherd through persuasion, long-suffering, and genuine love.',
        scriptures: [
          { ref: 'Doctrine and Covenants 121:41–42', text: '…without hypocrisy…' },
          { ref: 'Luke 22:26–27', text: '…let him be as he that doth serve…' },
        ],
        explanation:
          'Effective leaders coordinate, delegate, and trust; protect sisters’ time; simplify where possible; and prioritize doctrine and care over noisy programming. They listen before deciding and honor many voices in the class.',
        deepen:
          'Christ never confused authority with harshness. When a leader seeks revelation, the Spirit often suggests small adjustments: who needs a visit, which sister could teach, which topic eases the ward’s anxiety.\n\nIf you serve without a formal calling, the same principle applies in fellowship: influence by example and charity, not control.',
        keyPoints: [
          'Leadership revelation often comes as names, steps, and timing—not only “big ideas.”',
          'Protecting sisters’ dignity matters more than looking flawless on social media.',
          'Collaboration with priesthood leaders avoids duplication and unifies care for the flock.',
        ],
        example:
          'A president senses tension in a class. Instead of imposing a format, she invites a respected sister to share experience tied to a doctrinal principle and trims announcements to two minutes. The meeting feels warmer and more sisters participate.',
        application: [
          'Am I “leading” from fear of disorder or serving from love for the flock?',
          'Whom should I delegate to or consult this week?',
          'Which recent decision was more Christlike and human, and which was merely reactive?',
        ],
        action:
          'Pray by name for someone you serve (or someone you should draw near to) and within 48 hours act on the impression—a message, a short visit, a delegated task, or a humble conversation about a correction.',
      },
    ],
  },
  'org-aa-1': {
    intro:
      'Aaronic Priesthood quorums help young men make and keep sacred covenants and deepen conversion to Christ.',
    officialLinks: hbLink('section 10 — Aaronic Priesthood'),
    objectivesHeading: H.objectives,
    objectives: [
      'Connect activities and classes with the handbook purpose and motto.',
      'Involve parents and youth leaders as appropriate.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Teaching should be brief, clear, and worthy of the Spirit. Advisers work in unity with quorum presidencies.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrine and Covenants 13', text: '…keys of the ministering of angels…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Youth learn more when they participate than when they only hear long talks.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Read Handbook section 10: purpose and organization.',
      'Prepare a question a young man could answer from experience.',
      'Define a concrete role for a quorum leader in the lesson.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What signal do I send that I value youth voices?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Coordinate youth participation in the next quorum meeting.',
  },
  'org-yw-1': {
    intro:
      'Young Women strengthens faith in Christ, service, and preparation for Relief Society and the temple.',
    officialLinks: hbLink('section 11 — Young Women'),
    objectivesHeading: H.objectives,
    objectives: [
      'Align lessons with the handbook purpose.',
      'Protect dignity and balanced participation for each young woman.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Classes should feel safe. Adult leaders model respect and appropriate confidentiality.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: '1 Timothy 4:12', text: '…be thou an example of the believers…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Open questions work better than lectures when topics feel sensitive.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Review Handbook section 11: purpose and participation in God’s work.',
      'Plan a closing that invites action at home.',
      'Follow local standards for protection and two adults when required.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Which young woman needs us to listen more and talk less?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Include real youth participation in your plan.',
  },
  'org-pr-1': {
    layout: 'structured',
    promptVariant: 'primary',
    intro:
      'Learn how Primary helps children feel God’s love, learn the gospel, prepare for covenants, and follow Jesus Christ.',
    overview:
      'Primary is not an adult class with pictures. According to the General Handbook (section 12), it helps children know Heavenly Father’s love, Jesus Christ, the gospel, the Holy Ghost, the covenant path, and God’s work—in teaching that is simple, warm, and memorable.\n\nThe handbook also includes guidance on preparing for baptism and confirmation; think childhood and covenant path, not only “behave well.”',
    officialLinks: [
      ...hbLink('section 12 — Primary'),
      { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    ],
    sections: [
      {
        id: 'heavenly-father-love',
        title: 'God loves me',
        handbookRef: 'General Handbook, section 12 — feel Heavenly Father’s love and learn about His plan of happiness.',
        doctrine:
          'Primary helps children feel the love of their Heavenly Father and learn about His plan of happiness.',
        explanation:
          'God is your Heavenly Father. He knows you, loves you, and wants to help you. You are not alone. His plan was made to bless you and help you return to Him.',
        example:
          'A child can feel God’s love when they pray, hear a Church song, or feel peace when they choose the right.',
        application: [
          'Do I remember that I am a son or daughter of God?',
          'When have I felt God’s peace or love?',
          'What can I do to draw closer to Him?',
        ],
        action: 'This week, say a sincere prayer each day and thank Heavenly Father for one blessing.',
        prompts: {
          home: 'What could your family do to remember more often that God loves you?',
          service: 'How can you show love to someone at home this week?',
          leadersOrParents:
            'What helps a child feel God’s love more: a long class or one clear, simple spiritual moment?',
        },
      },
      {
        id: 'learn-of-christ',
        title: 'Jesus Christ is my Savior',
        handbookRef: 'General Handbook, section 12 — learn about Jesus Christ and His role in Heavenly Father’s plan.',
        doctrine:
          'Primary helps children learn about Jesus Christ and His role in Heavenly Father’s plan.',
        explanation:
          'Jesus Christ loves us, teaches us the way, and helps us repent and return to Heavenly Father. He is our Savior and our perfect example.',
        example:
          'When a child chooses to tell the truth, ask forgiveness, or be kind, they are trying to follow Jesus Christ.',
        application: [
          'What did Jesus do that I can copy?',
          'How can I be more like Him?',
          'What would Jesus do if He were with me today?',
        ],
        action:
          'Choose one thing this week to be more like Jesus: tell the truth, share, obey, or help someone.',
        prompts: {
          home: 'What story about Jesus Christ could you read together as a family this week?',
          service: 'Who could you help the way Jesus would?',
          leadersOrParents: 'How can a Primary class teach more clearly who Jesus Christ is?',
        },
      },
      {
        id: 'live-the-gospel',
        title: 'I can live the gospel',
        handbookRef: 'General Handbook, section 12 — learn and live the gospel of Jesus Christ.',
        doctrine: 'Primary helps children learn and live the gospel of Jesus Christ.',
        explanation:
          'The gospel is not only something we hear at church. It is something we live at home, at school, and with friends.',
        example:
          'A child lives the gospel when they obey, share, forgive, are reverent, or choose the right even when it is hard.',
        application: [
          'Am I choosing the right?',
          'How do I treat my family and friends?',
          'What can I improve this week?',
        ],
        action: 'This week, do one good thing without being asked.',
        prompts: {
          home: 'What small habit could help your family live the gospel better?',
          service: 'Who needs your help or kindness today?',
          leadersOrParents: 'How can we teach the gospel to children in a simple, real way?',
        },
      },
      {
        id: 'holy-ghost',
        title: 'The Holy Ghost can help me',
        handbookRef:
          'General Handbook, section 12 — feel and recognize the influence of the Holy Ghost and act on it.',
        doctrine:
          'Primary helps children feel and recognize the influence of the Holy Ghost and act according to it.',
        explanation:
          'The Holy Ghost can bring peace, comfort, warning, and guidance. Sometimes He speaks to our hearts with calm, good feelings.',
        example:
          'A child may feel they should say sorry, be kind, or stop doing something wrong. That can be help from the Spirit.',
        application: [
          'Do I feel peace when I do what is right?',
          'Do I notice calm, good feelings?',
          'What do I do when I feel I should do good?',
        ],
        action: 'This week, when you feel a good desire to do something right, do it soon.',
        prompts: {
          home: 'What at home helps us feel the Spirit more?',
          service: 'How can the Spirit help you notice someone who is sad or alone?',
          leadersOrParents:
            'How do we teach children about the Spirit without making it confusing or overly mystical?',
        },
      },
      {
        id: 'covenant-path',
        title: 'I prepare for covenants',
        handbookRef:
          'General Handbook, section 12 — prepare for sacred covenants, make them, and keep them (including guidance on preparing for baptism and confirmation).',
        doctrine:
          'Primary helps children prepare for sacred covenants, make them, and keep them.',
        explanation:
          'One important covenant is baptism. When a person is baptized, they promise to follow Jesus Christ. Later, the sacrament helps us remember and renew that covenant.',
        example:
          'A child who learns about baptism, the sacrament, and repentance is preparing to follow Jesus more seriously.',
        application: [
          'Do I understand why baptism matters?',
          'What does it mean to follow Jesus Christ?',
          'How can I prepare better to make and keep covenants?',
        ],
        action: 'This week, talk with your parents or leaders about baptism, the sacrament, or covenants.',
        prompts: {
          home: 'What could your family talk about regarding baptism and the sacrament?',
          service: 'How can you show each day that you want to follow Jesus Christ?',
          leadersOrParents: 'How can Primary class better prepare children for the covenant path?',
        },
      },
      {
        id: 'work-of-god',
        title: 'I can help in God’s work',
        handbookRef: 'General Handbook, section 12 — participate in God’s work of salvation and exaltation.',
        doctrine:
          'Primary helps children participate in God’s work of salvation and exaltation.',
        explanation:
          'Children can help the Lord’s work too. They can love, invite, serve, share testimony, and help others feel God’s love.',
        example:
          'A child helps God’s work when they invite a friend, comfort someone, share a scripture, or lovingly help at home.',
        application: [
          'Who can I help this week?',
          'How can I share kindness or faith with someone?',
          'What small service can I do?',
        ],
        action:
          'This week, do one small act of service for someone at home, at church, or at school.',
        prompts: {
          home: 'What small service could you do together as a family?',
          service: 'Who needs encouragement, help, or friendship today?',
          leadersOrParents:
            'How can Primary teach children that they are part of the Lord’s work too?',
        },
      },
    ],
  },
  'org-ss-1': {
    layout: 'structured',
    intro:
      'Learn how to study the scriptures and the gospel of Jesus Christ in a way that changes your daily life and strengthens your home.',
    overview:
      'According to the General Handbook (section 13), Sunday School exists to teach the gospel of Jesus Christ, strengthen faith in Him, support home-centered learning, and help people live doctrine—with the scriptures and the words of the prophets as the foundation.\n\nIt is not a class to collect facts or summarize Come, Follow Me. It is a bridge: from truth to life, from understanding to obedience, from class to home.',
    officialLinks: [
      ...hbLink('section 13 — Sunday School'),
      { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    ],
    sections: [
      {
        id: 'christ-centered-learning',
        title: 'Jesus Christ is the center of learning',
        handbookRef:
          'General Handbook, section 13 — teach the gospel of Jesus Christ and strengthen faith in Him.',
        doctrine: 'The purpose of gospel learning is to come unto Jesus Christ and follow Him.',
        explanation:
          'Studying the gospel is not collecting knowledge. It is changing the heart, strengthening faith, and drawing closer to Jesus Christ.',
        example:
          'Someone may know many scripture stories, but they change when they choose to apply them in life.',
        application: [
          'Am I learning about Christ or coming closer to Him?',
          'Is my study changing me?',
          'Am I applying what I learn?',
        ],
        action:
          'Choose one teaching of Jesus Christ this week and apply it consciously in your daily life.',
        prompts: {
          home: 'How can you make Jesus Christ the center of study in your home?',
          service: 'How can you help someone draw closer to Christ?',
          council: 'What helps a class truly teach coming unto Christ?',
        },
      },
      {
        id: 'scriptures-and-prophets',
        title: 'The scriptures and the prophets',
        handbookRef:
          'General Handbook, section 13 — the gospel is taught through the scriptures and the words of living prophets.',
        doctrine:
          'The gospel is taught through the scriptures and the words of living prophets.',
        explanation:
          'God speaks to His children through the scriptures and the prophets. Studying them with real intent brings guidance, clarity, and spiritual direction.',
        example:
          'A verse can answer a personal question when studied with faith and prayer.',
        application: [
          'Am I studying the scriptures with intent or by routine?',
          'Do I seek real answers in them?',
          'Do I listen to and apply the prophets?',
        ],
        action:
          'Read a passage of scripture this week with a question in mind and write what you learn.',
        prompts: {
          home: 'How could your family study the scriptures in a more meaningful way?',
          service: 'Can you share a scripture with someone who needs it?',
          council: 'What makes scripture study truly powerful?',
        },
      },
      {
        id: 'home-centered-learning',
        title: 'Home-centered learning',
        handbookRef:
          'General Handbook, section 13 — gospel learning is home centered and Church supported.',
        doctrine: 'Gospel learning is home centered and Church supported.',
        explanation:
          'Sunday class does not replace personal or family study. It supports it. Real growth happens in daily life.',
        example:
          'A family that studies together builds a stronger spiritual foundation than attending meetings alone.',
        application: [
          'Am I studying the gospel at home?',
          'Does my home have spiritual moments?',
          'What can I improve in my spiritual routine?',
        ],
        action: 'Set a fixed time this week to study the gospel in your home.',
        prompts: {
          home: 'What small habit could strengthen family study?',
          service: 'How could you invite someone to study the gospel with you?',
          council: 'How can the Church better support learning in the home?',
        },
      },
      {
        id: 'teach-by-the-spirit',
        title: 'Learn and teach by the Spirit',
        handbookRef:
          'General Handbook, section 13 — the Holy Ghost teaches and confirms truth in gospel learning.',
        doctrine:
          'True learning happens when the Holy Ghost teaches and confirms truth.',
        explanation:
          'The Holy Ghost is the true teacher. Without Him, learning is only information. With Him, learning changes lives.',
        example:
          'A spiritual impression during class can be more powerful than the whole lesson.',
        application: [
          'Do I seek to feel the Spirit as I learn?',
          'Do I prepare my heart before I study?',
          'Am I attentive to spiritual impressions?',
        ],
        action: 'Before you study this week, pray to learn by the Spirit.',
        prompts: {
          home: 'What in your home invites the Spirit?',
          service: 'How can you help others feel the Spirit?',
          council: 'What helps a class have the Spirit present?',
        },
      },
      {
        id: 'live-the-doctrine',
        title: 'Live the doctrine',
        handbookRef:
          'General Handbook, section 13 — the gospel changes lives; faith grows as we live doctrine.',
        doctrine: 'The purpose of the gospel is to change people’s lives, not only to inform them.',
        explanation:
          'Doctrine becomes power when it is lived. Faith grows when we act.',
        example:
          'Someone who applies what they learn develops more faith than someone who only listens.',
        application: [
          'Am I living what I learn?',
          'What principle should I apply today?',
          'What should I change in my life?',
        ],
        action: 'Choose a gospel principle and put it into practice today.',
        prompts: {
          home: 'How can you apply together what you learn as a family?',
          service: 'How can you bless someone by living the gospel?',
          council: 'What is the difference between learning doctrine and living it?',
        },
      },
      {
        id: 'discussion-and-council',
        title: 'Learn in council and participation',
        handbookRef:
          'General Handbook, section 13 — respectful discussion and participation strengthen learning.',
        doctrine:
          'Gospel learning grows when people participate, share, and learn together.',
        explanation:
          'The best classes are not monologues. They are Spirit-led conversations where everyone can learn.',
        example:
          'A shared experience or testimony can teach more than a long explanation.',
        application: [
          'Do I participate in class or only listen?',
          'Am I willing to share?',
          'Do I respect and learn from others?',
        ],
        action: 'Share an idea or testimony in your next class.',
        prompts: {
          home: 'How can you have spiritual conversations at home?',
          service: 'Whom could you listen to more carefully?',
          council: 'How can everyone participate without pressure?',
        },
      },
    ],
  },
  'lead-1': {
    layout: 'structured',
    promptVariant: 'leadership',
    intro:
      'Learn how leadership in the Church is exercised through revelation, love, council, and sacred responsibility—to bless people and strengthen the Lord’s work.',
    overview:
      'This lesson does not replace the General Handbook. It turns a leader’s heart toward the Savior, priesthood keys, Spirit-led council, and the care of real souls.\n\nIt is written for bishoprics, ward council, organization presidencies, and those preparing to serve—with a sober, pastoral tone rather than an administrative or corporate one.',
    officialLinks: [
      ...hbLink('Bishopric, ward council, and the work of salvation and exaltation'),
      { label: 'Teaching in the Savior’s Way (2022 manual)', url: URL_TSW_EN },
    ],
    sections: [
      {
        id: 'christ-centered-leadership',
        title: 'Leadership in the Church belongs to Jesus Christ',
        handbookRef:
          'General Handbook — Jesus Christ leads His Church; leaders serve in His name with humility.',
        doctrine:
          'Leadership in the Church is not about personal power, but about serving under Jesus Christ’s direction to bless God’s children.',
        explanation:
          'In the Church, a leader does not exist to be admired or to impose a personal style. A leader exists to represent the Lord humbly, care for real people, and help God’s work move forward according to His will.',
        example:
          'A leader who listens patiently, prays before deciding, and thinks first about others’ spiritual welfare is acting more as Christ’s servant than as a mere administrator.',
        application: [
          'Do I see my calling as service or as status?',
          'Do my decisions reflect the character of Jesus Christ?',
          'Am I more focused on people or on looking good?',
        ],
        action:
          'Pray this week to see your calling as sacred stewardship, not as a routine function.',
        prompts: {
          home: 'How could your way of leading bless your family more clearly?',
          service: 'Whom do you need to serve with more patience and compassion?',
          council: 'What changes in a council when everyone remembers that Jesus Christ is the true leader?',
        },
      },
      {
        id: 'keys-and-stewardship',
        title: 'Keys, authority, and stewardship',
        handbookRef:
          'General Handbook — the bishop holds priesthood keys to direct the Lord’s work in the ward; each leader serves within a stewardship.',
        doctrine:
          'The bishop holds the priesthood keys to direct the Lord’s work in the ward, and leaders serve within specific stewardships to bless people.',
        explanation:
          'Not everyone carries the same responsibility, but everyone serves under divine order. Keys bring direction; stewardship brings responsibility. A faithful leader honors the Lord’s order, avoids overstepping others’ duties, and serves with clarity and reverence.',
        example:
          'An organization leader who coordinates with the bishopric and stays within a stewardship strengthens unity; one who acts alone can create confusion even with good intentions.',
        application: [
          'Do I understand my stewardship clearly?',
          'Do I honor priesthood order and coordination with other leaders?',
          'Am I serving humbly within the limits of my calling?',
        ],
        action:
          'Review your calling this week and define clearly what you are personally responsible to care for.',
        prompts: {
          home: 'What does the Lord’s order teach you about responsibility in your home?',
          service: 'How can you serve with greater clarity without exceeding your stewardship?',
          council: 'What problems appear when leaders do not understand their responsibilities?',
        },
      },
      {
        id: 'bishopric-and-care',
        title: 'Care for people with love',
        handbookRef:
          'General Handbook — the bishopric cares for ward members with love and helps them become true disciples of Jesus Christ.',
        doctrine:
          'The bishopric cares for ward members with love and helps them become true disciples of Jesus Christ.',
        explanation:
          'Local leadership does not exist to sustain an empty structure. It exists to care for souls. That includes strengthening faith, helping with repentance, supporting families, meeting needs, and drawing people to the Savior.',
        example:
          'A bishopric that knows families, listens to their burdens, and acts with inspired love exercises real leadership—even without fanfare or seeking recognition.',
        application: [
          'Am I seeing people or only tasks?',
          'Do I know the real needs of those I serve?',
          'Am I helping others come unto Christ or only keeping programs running?',
        ],
        action:
          'Think of one specific person or family this week, pray for them, and take one concrete action to care for them better.',
        prompts: {
          home: 'How can you reflect that same care in your own family?',
          service: 'Who needs to be heard and cared for with more love?',
          council: 'How can a council focus more on people and less on reports?',
        },
      },
      {
        id: 'council-and-revelation',
        title: 'Counsel together in council through revelation',
        handbookRef:
          'General Handbook — leaders counsel together to strengthen spiritual life and unity, seeking the Spirit’s guidance.',
        doctrine:
          'Leaders counsel together to strengthen spiritual life and unity, seeking inspiration and participation guided by the Spirit.',
        explanation:
          'Ward council should not be a cold meeting of announcements. It should be a sacred place where inspired leaders unite perspectives, consider people and families, and seek the Lord’s will together.',
        example:
          'When a council stops talking only about activities and begins talking about specific people, spiritual obstacles, and how to help with love, it becomes truly useful.',
        application: [
          'Do I participate in council with spiritual preparation?',
          'Do I listen humbly or only wait for my turn to speak?',
          'Am I helping council be revelatory rather than heavy?',
        ],
        action:
          'Come to your next meeting having prayed about one specific person or need that should be considered.',
        prompts: {
          home: 'How can you apply the principle of counseling together within your home?',
          service: 'Who might be blessed by a better council meeting?',
          council: 'What habits help a council have more revelation and less routine?',
        },
      },
      {
        id: 'work-of-salvation',
        title: 'Coordinate the work of salvation and exaltation',
        handbookRef:
          'General Handbook — ward council helps coordinate the work of salvation and exaltation in unity.',
        doctrine:
          'Ward council helps coordinate the work of salvation and exaltation, including living the gospel, caring for those in need, inviting all to receive the gospel, and uniting families for eternity.',
        explanation:
          'True leadership does not only react to problems. It also advances the Lord’s work in an orderly, united, covenant-centered way. Leaders should see the whole ward without losing sight of each soul.',
        example:
          'When the bishopric, Relief Society, elders quorum, and other leaders coordinate real effort instead of working in isolation, the ward begins to bless its members more fully.',
        application: [
          'Am I seeing the Lord’s work as a whole or only my area?',
          'Am I united with other leaders?',
          'Do my efforts help people move toward Christ and His ordinances?',
        ],
        action:
          'Identify one concrete way to coordinate better with another leader this week to bless one person or family.',
        prompts: {
          home: 'How could the work of salvation begin more clearly in your home?',
          service: 'What ward need requires collaboration, not only individual effort?',
          council: 'Which part of the work of salvation and exaltation is receiving less attention right now?',
        },
      },
      {
        id: 'ministering-and-strengthening',
        title: 'Ministering, conversion, and new or returning members',
        handbookRef:
          'General Handbook — the bishopric coordinates with the elders quorum and Relief Society presidents to share the gospel and strengthen new and returning members.',
        doctrine:
          'The bishopric coordinates with the elders quorum president and Relief Society president in efforts to share the gospel and strengthen new members and those who are returning.',
        explanation:
          'A strong unit does more than hold meetings; it walks with people through their journey of faith. That takes intentional ministering, loving follow-up, and real coordination among leaders.',
        example:
          'When a new member receives friendship, teaching, support, and opportunities to belong, the experience changes completely. The same is true for someone returning step by step.',
        application: [
          'Are we strengthening new people or only welcoming them once?',
          'Is someone trying to return who needs real attention?',
          'Are we coordinating ministering and follow-up well?',
        ],
        action:
          'Think of one person who is new or returning and define one concrete next step to help them feel sustained and strengthened.',
        prompts: {
          home: 'How could your family help someone feel welcome at church?',
          service: 'Whom could you include, accompany, or encourage this week?',
          council: 'What should improve in how the ward strengthens new and returning members?',
        },
      },
      {
        id: 'humility-and-accountability',
        title: 'Humility, integrity, and spiritual accountability',
        handbookRef:
          'The scriptures and General Handbook — the Lord’s servant should be meek, worthy, and accountable to God.',
        doctrine:
          'A leader of the Lord serves with humility, seeks revelation, acts with integrity, and answers to God for how he or she cares for His people.',
        explanation:
          'Holding a calling is not enough. A faithful leader examines himself or herself, repents, corrects course, and avoids hardness, pride, favoritism, disorder, or apathy. Spiritual authority rests on personal righteousness and dependence on the Lord.',
        example:
          'A leader who admits a mistake, asks forgiveness, and changes how he or she serves shows more spiritual maturity than one who always needs to look strong.',
        application: [
          'Is there pride, hardness, or routine in how I lead?',
          'Am I seeking the Lord sincerely in my calling?',
          'What should I correct to serve with greater integrity?',
        ],
        action:
          'This week, do an honest self-assessment of your service and write one specific change you need to make before the Lord.',
        prompts: {
          home: 'What is spiritual leadership teaching you about your character at home?',
          service: 'Whom do you need to treat with more humility or patience?',
          council: 'How can a council foster humility, accountability, and trust?',
        },
      },
    ],
  },
};
