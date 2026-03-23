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
    intro:
      'The elders quorum advances God’s work of salvation and exaltation: live the gospel, care for those in need, share the gospel, and unite families.',
    officialLinks: hbLink('section 8 — Elders Quorum'),
    objectivesHeading: H.objectives,
    objectives: [
      'State the quorum’s purpose in one sentence from the General Handbook.',
      'Connect quorum teaching with home study and ministering.',
    ],
    briefHeading: H.brief,
    briefBody:
      'Priesthood meetings form elders who teach by example. The handbook explains how the quorum supports the bishop without duplicating his duties.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Doctrine and Covenants 107:85–87', text: '…the duty of the elders…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['One quorum lesson can inspire a family home evening somewhere in the ward.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Read the introduction to Handbook section 8.',
      'Note how your lesson can motivate ministering this week.',
      'Coordinate with the quorum presidency on a topic the ward needs.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['Which quorum member needs to be included more intentionally?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Suggest one quorum topic tied to a real ward need.',
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
    intro:
      'Primary teaches simple doctrine with joy; it is home centered and Church supported.',
    officialLinks: hbLink('section 12 — Primary'),
    objectivesHeading: H.objectives,
    objectives: [
      'Prepare short lessons with movement, music, and appropriate testimony.',
      'Engage parents with simple take-home challenges.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The General Handbook covers ages, singing time, and safety. Reverence is taught patiently, not by shouting.',
    scripturesHeading: H.scriptures,
    scriptures: [{ ref: 'Matthew 19:14', text: '…Suffer little children… to come unto me…' }],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['One simple object lesson can anchor doctrine in a child’s memory.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Read Handbook section 12: purposes and singing time.',
      'Pick a visual for your next doctrinal point.',
      'Prepare a short prayer or testimony children can echo in their own words.',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['How do I honor children’s limited attention spans?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Send parents a two-line invitation to review at home.',
  },
  'org-ss-1': {
    intro:
      'Sunday School strengthens conversion through scripture study and Spirit-led teaching.',
    officialLinks: hbLink('section 13 — Sunday School'),
    objectivesHeading: H.objectives,
    objectives: [
      'Explain how Sunday School supports home-centered study.',
      'Draft questions that open the scriptures, not only the printed manual.',
    ],
    briefHeading: H.brief,
    briefBody:
      'The General Handbook emphasizes respectful discussion and continual improvement. Teachers coordinate with ward leadership.',
    scripturesHeading: H.scriptures,
    scriptures: [
      {
        ref: 'Doctrine and Covenants 88:118',
        text: '…teach one another words of wisdom…',
      },
    ],
    didYouKnowHeading: H.didYouKnow,
    didYouKnow: ['Personal Come, Follow Me study is the foundation; class is a catalyst, not a substitute.'],
    practiceHeading: H.practice,
    practiceHint: H.practiceHint,
    practiceItems: [
      'Read Handbook section 13: purpose and responsibilities.',
      'Write five questions rooted in verses, not only in chatter.',
      'Plan a simple home follow-up (reading or application).',
    ],
    practiceDone: H.practiceDone,
    practicePending: H.practicePending,
    reflectionHeading: H.reflection,
    reflectionHint: H.reflectionHint,
    reflectionQuestions: ['What personal study habit do I model for adult learners?'],
    reflectionPlaceholder: H.reflectionPh,
    actionHeading: H.action,
    actionText: 'Turn one lecture block into paired scripture study.',
  },
};
