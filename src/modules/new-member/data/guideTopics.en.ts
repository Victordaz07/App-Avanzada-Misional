import type {
  GuideAudioPlaceholder,
  GuideImagePlaceholder,
  GuideTopic,
} from './guideTopics.types';

function image(placeholder: GuideImagePlaceholder): GuideImagePlaceholder {
  return placeholder;
}

function audio(placeholder: GuideAudioPlaceholder): GuideAudioPlaceholder {
  return placeholder;
}

export const guideTopicsEn: GuideTopic[] = [
  {
    id: 'sacrament-meeting',
    title: 'Sacrament Meeting',
    subtitle: 'The heart of Sunday worship',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Sunday worship',
      title: 'Sacrament meeting with reverence',
      summary:
        'A calm overview of what happens in sacrament meeting, why the sacrament is central, and how to participate in a spirit of faith.',
      scriptIntent:
        'Explain the order of a typical sacrament meeting, emphasize the sacrament as the sacred focal point, invite quiet preparation and gratitude, and encourage listening to the Holy Ghost during hymns, prayers, and messages.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'What happens in sacrament meeting',
        content:
          'Sacrament meeting is the chief worship service of The Church of Jesus Christ of Latter-day Saints. Members gather to sing hymns, pray together, hear messages grounded in the scriptures, and—above all—partake of the sacrament in remembrance of the Savior.\n\nThis meeting is not entertainment; it is covenant renewal in community. When we worship “in spirit and in truth,” we turn our hearts to Jesus Christ and invite His Spirit to teach us (see John 4:24). Come ready to feel, not only to observe.',
        imagePlaceholder: image({
          label: 'Sacrament meeting overview',
          title: 'Congregation in a chapel during sacrament meeting',
          prompt:
            'Photorealistic, reverent interior of a modest LDS chapel: members seated in rows, soft light through windows, simple pulpit and sacrament table with white cloth, diverse families, peaceful atmosphere, no identifiable faces, editorial documentary style',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'The sacrament ordinance',
        content:
          'The sacrament is administered by those who hold priesthood keys and authority in the ward. The bread and water are blessed and passed to the congregation as emblems of the Savior’s body and blood. As we partake worthily, we witness unto the Father that we are willing to take upon us the name of His Son, always remember Him, and keep His commandments—promises the Lord Himself has placed at the center of this ordinance (see Doctrine and Covenants 20:77, 79).\n\nThe Savior first instituted the ordinance with bread and wine at the Last Supper. In the restored Church today, water is used according to modern revelation, which teaches that what matters most is that we partake with an eye single to God’s glory, remembering Christ’s body and blood (see Doctrine and Covenants 27:2). The sacrament prayers themselves are found in Moroni 4–5 and also in Doctrine and Covenants 20:77, 79.\n\nPartaking of the sacrament is deeply personal. It is a weekly invitation to repent, to lay down distraction, and to be spiritually nourished by the grace of Christ. If you are still learning what worthiness means for you, keep meeting with your bishop and rely on the Savior’s mercy as you move forward.',
      },
      {
        title: 'How to participate',
        content:
          'Arrive early enough to quiet your mind before the meeting begins. Sing the hymns as prayer. Listen to speakers as if the Lord might speak to you through their words—because He often does.\n\nAs you hear the sacrament prayers, think about why disciples long for the companionship of the Holy Ghost. The promised Spirit is not an ornament of worship; He is the divine companion who testifies of Christ, sanctifies repentance, and strengthens covenant discipleship.\n\nYou may be invited to offer prayers or share a message in time. Those assignments are not performances; they are acts of faith offered on behalf of the ward family. Whether you speak or simply listen, your reverent participation blesses the body of Christ.',
        imagePlaceholder: image({
          label: 'Sacrament trays',
          title: 'Bread and water passed with care',
          prompt:
            'Close, respectful depiction of sacrament trays being reverently passed along a row in a chapel, shallow depth of field, warm muted tones, no recognizable individuals, emphasis on sacred simplicity',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
    ],
    reflectionPrompt:
      'What do you feel when you partake of the sacrament? How does it help you remember the Savior?',
  },
  {
    id: 'come-follow-me',
    title: 'Come, Follow Me',
    subtitle: 'Scripture study at home and at church',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Home and chapel',
      title: 'Come, Follow Me as a weekly rhythm',
      summary:
        'How the worldwide Come, Follow Me resource unifies study at home with Sunday learning, and why small, consistent effort matters.',
      scriptIntent:
        'Describe the purpose of Come, Follow Me, connect home study with Sunday classes, mention the Gospel Library app as a practical aid, and encourage realistic habits rather than perfection.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'A unified study program',
        content:
          'Come, Follow Me is the Church’s resource for learning the scriptures as disciples of Jesus Christ. Each year, individuals and families are invited to study the same books of scripture on a shared schedule so that the Spirit can teach the same truths across households and across the world.\n\nUnity in study does not mean everyone has the same questions or experiences. It means we are walking the same covenant path and turning to the same standard works for revelation. Over time, patterns emerge—faith, repentance, covenant belonging, and Christ’s redeeming love.',
      },
      {
        title: 'Sunday School and other classes',
        content:
          'After sacrament meeting, adults and youth typically attend classes where the weekly Come, Follow Me material is discussed. These settings are meant to be edifying conversations guided by the scriptures and the teachings of latter-day prophets—not debates for cleverness, but discipleship in community.\n\nRelief Society and elders quorum meetings also strengthen covenant men and women through doctrine, service, and mutual encouragement. Children learn in Primary in age-appropriate ways. Each organization supports the same aim: to help us hear the Savior’s voice and follow Him.',
        imagePlaceholder: image({
          label: 'Sunday class discussion',
          title: 'Adults studying the scriptures together',
          prompt:
            'Warm, candid photograph of a small group in a church classroom with open scriptures on tables, facilitator at whiteboard with simple outline, diverse adults, respectful and focused mood, natural light, no legible text',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Studying at home',
        content:
          'The strength of Come, Follow Me is not measured only by what happens on Sunday. Short, sincere study during the week changes how you hear the hymns, how you pray, and how you notice God’s hand in ordinary moments.\n\nIf you can only give a few minutes, give them consistently. Read a verse slowly. Write one sentence of gratitude. Ask one question and carry it with you through the day. The Lord honors faith expressed in small but honest steps.',
      },
    ],
    reflectionPrompt: 'What scripture or principle from your recent study has touched your heart?',
  },
  {
    id: 'ministering',
    title: 'Ministering',
    subtitle: 'Caring for one another as Christ would',
    category: 'worship',
    audioPlaceholder: audio({
      eyebrow: 'Covenant care',
      title: 'Ministering as discipleship',
      summary:
        'The doctrinal basis for ministering, what assignments look like in real life, and how love and spiritual sensitivity replace checklist religion.',
      scriptIntent:
        'Teach ministering as Christlike watchcare—not a program to perform—emphasize friendship, prayer, simple service, coordination with leaders when needs are serious, and patience for newcomers learning their part.',
      status: 'draft',
      durationLabel: '7–9 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'What is ministering?',
        content:
          'Ministering is how we fulfill the Lord’s command to love one another as He has loved us (see John 13:34–35). Rather than reducing care to a schedule of visits, the Church invites members to seek heaven’s help in knowing what a specific person or family needs—and then doing it with sincerity.\n\nYou will be assigned ministering brothers or sisters who are asked to pray for you, reach out, and stand ready to help. Some contacts will feel natural quickly; others may take time. The goal is not social pressure; the goal is belonging, dignity, and practical compassion rooted in Christ.',
        imagePlaceholder: image({
          label: 'Simple outreach',
          title: 'A caring conversation on the porch',
          prompt:
            'Tender, realistic scene of two neighbors talking kindly at a front door, one holding a small container of food, late afternoon light, suburban setting, diverse individuals, calm and hopeful mood, documentary photography style',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
      {
        title: 'You will also minister to others',
        content:
          'As you grow in the ward, you will likely be asked to minister to others. That assignment is not a measure of your social confidence; it is an invitation to represent the Savior in small, faithful ways.\n\nMinistering can include a text, a note, attendance at a child’s activity, help with a move, or simply remembering a birthday. When needs are heavy—illness, grief, financial strain—ministering companions coordinate with ward leaders so support is organized, respectful, and sustained.',
      },
      {
        title: 'No pressure, just love',
        content:
          'Ministering is evaluated by heaven more than by outward metrics. Leaders may occasionally check in to offer support, but the heart of ministering is spiritual sensitivity, not reporting for its own sake.\n\nIf you feel overwhelmed, be honest with your leaders. If you feel alone, let someone know. The covenant path is not meant to be walked in isolation. Ministering exists so that burdens can be shared and joy can be multiplied.',
      },
    ],
    reflectionPrompt:
      'How have you felt the care of others in your life? How might you share that care with someone else?',
  },
  {
    id: 'personal-prayer',
    title: 'Personal Prayer',
    subtitle: 'Your direct line to Heavenly Father',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Daily discipleship',
      title: 'Prayer with faith and humility',
      summary:
        'How sincere prayer expresses faith in Heavenly Father, patterns that help beginners, and recognizing answers that come in multiple ways.',
      scriptIntent:
        'Encourage heartfelt prayer morning and night and throughout the day, review basic elements (address God, give thanks, ask, close in Christ’s name), and teach patience with God’s timing and methods.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'calm',
    }),
    sections: [
      {
        title: 'Prayer is a conversation',
        content:
          'Prayer is one of the primary ways we exercise faith in Jesus Christ. Through prayer we express gratitude, confess need, seek forgiveness, and ask for guidance in the work of salvation and exaltation.\n\nHeavenly Father knows you personally. He hears sincere prayer offered in the name of His Son. You do not need elegant language; you need honesty, humility, and a willingness to align your will with His over time.',
      },
      {
        title: 'How to pray',
        content:
          'A simple pattern many Latter-day Saints follow is to address our Father in Heaven, give thanks, ask for what we need for ourselves and others, and close in the name of Jesus Christ. This pattern reflects both reverence and relationship.\n\nPray aloud when you can; pray silently when you must. Pray alone and pray with family. As you pray, remember that faith includes accepting “no” or “not yet” as often as it receives an immediate “yes.”',
        imagePlaceholder: image({
          label: 'Quiet prayer',
          title: 'Kneeling in prayer at home',
          prompt:
            'Softly lit interior: person kneeling beside a bed in humble prayer, hands folded, peaceful expression suggested without clear facial detail, simple bedroom, gentle morning light, contemplative mood',
          aspectRatio: '1:1',
          placement: 'before',
        }),
      },
      {
        title: 'Listening for answers',
        content:
          'Answers to prayer often come through the Holy Ghost as peace, clarity, or a quiet prompting to act. Answers also come through the scriptures, through counsel from leaders, through the kindness of others, and through circumstances that unfold as we move forward with faith.\n\nIf answers feel delayed, do not confuse delay with absence. Continue doing what you already know is right—keeping commandments, attending sacrament meeting, serving—and trust that God will guide you line upon line.',
      },
    ],
    reflectionPrompt:
      'When have you felt that Heavenly Father heard your prayers? What helps you feel close to Him?',
  },
  {
    id: 'scripture-study',
    title: 'Scripture Study',
    subtitle: "Hearing God's voice through His word",
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Standard works',
      title: 'Scripture study that changes the heart',
      summary:
        'Why Latter-day Saints cherish the Bible and other scripture, habits that sustain daily study, and the unique witness of the Book of Mormon.',
      scriptIntent:
        'Teach scripture as revelation, encourage consistency over volume, introduce the standard works as a unified witness of Christ, and invite use of Gospel Library tools without replacing personal pondering.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Why study the scriptures?',
        content:
          'The scriptures are the written word of God given through prophets. They teach doctrine plainly, invite us to come unto Christ, and provide a firm foundation when emotions or opinions fluctuate.\n\nStudying the scriptures is not merely academic. The Holy Ghost can take truths you read and plant them in the heart, turning information into conversion. That is why Nephi taught that we should “feast upon the words of Christ,” not merely sample them (see 2 Nephi 32:3).',
      },
      {
        title: 'Building a habit',
        content:
          'Begin where you are. A few verses pondered with real attention can do more than chapters skimmed in haste. Choose a consistent time and place, and keep a simple notebook or digital note for impressions and questions.\n\nIf you miss a day, begin again without shame. Consistency is built by returning, not by perfect streaks. The Savior’s grace sustains the honest effort of disciples who are still learning.',
      },
      {
        title: 'The standard works',
        content:
          'Latter-day Saints study the Bible, the Book of Mormon, the Doctrine and Covenants, and the Pearl of Great Price. Together, these testify of Jesus Christ and restore plain and precious truths for our time.\n\nThe Book of Mormon is powerful because it was given by God to bring souls to Christ. Its central purpose is not controversy but conversion. As you read, pay attention to how it clarifies the Savior’s mercy, the doctrine of Christ, and the reality of His Atonement.',
        imagePlaceholder: image({
          label: 'Scriptures open',
          title: 'Standard works on a simple table',
          prompt:
            'Still life photograph of a worn set of LDS scriptures (quad) open beside a small journal and pen, warm lamp light, shallow depth of field, cozy study atmosphere, no readable text on pages',
          aspectRatio: '16:9',
          placement: 'after',
        }),
      },
    ],
    reflectionPrompt:
      "What scripture has recently spoken to your heart? How do you feel when you study God's word?",
  },
  {
    id: 'sabbath-day',
    title: 'The Sabbath Day',
    subtitle: 'A day of rest and renewal',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'The Lord’s day',
      title: 'Honoring the Sabbath with joy',
      summary:
        'The Sabbath as a sign of covenant love, worship in the Lord’s house, and practical choices that protect rest, family, and spiritual focus.',
      scriptIntent:
        'Ground the Sabbath in God’s law and latter-day prophetic teaching, emphasize joy and worship rather than mere restriction, connect sacrament attendance and family time, and encourage members to seek bishopric counsel for honest questions.',
      status: 'draft',
      durationLabel: '7–9 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'A gift from God',
        content:
          'From the creation of the earth, God has blessed the Sabbath as a holy day. For Israel it became a sign of the covenant; for disciples of Jesus Christ it remains a weekly opportunity to turn our hearts from ordinary labor toward worship, renewal, and love at home.\n\nThe Sabbath is not God’s burden—it is His invitation. When we receive it with faith, our hearts can feel what Isaiah described: the Sabbath as a delight, not merely a duty (see Isaiah 58:13–14).',
        imagePlaceholder: image({
          label: 'Chapel steeple morning',
          title: 'Walking toward Sunday worship',
          prompt:
            'Serene early morning scene: simple meetinghouse exterior with modest spire, family walking toward doors, soft sky, hopeful atmosphere, realistic photographic style, diverse family silhouettes',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'How to keep the Sabbath',
        content:
          'Latter-day Saints gather for sacrament meeting, seek to worship in spirit and truth, and set aside the day for spiritual refreshment and family connection. Many members also use Sunday for rest from employment, for gospel study, for ministering, and for quiet acts of compassion.\n\nSpecific applications vary by circumstance, stage of life, and culture. What matters is a sincere effort to honor the Lord, keep covenants, and avoid turning the Sabbath into “our own way” of endless distraction or recreation that crowds out the Spirit.',
      },
      {
        title: 'Finding your rhythm',
        content:
          'Families often grow into the Sabbath over time. Young children, demanding jobs, and caregiving responsibilities can make the day feel imperfect. God sees your desire and your sacrifice.\n\nChoose one or two Sabbath habits you can sustain—family prayer, scripture time, a walk while talking about the Savior—and build from there. The point is not comparison with another family’s schedule; the point is drawing nearer to Christ together.',
      },
    ],
    reflectionPrompt:
      'What activities help you feel the Spirit on the Sabbath? How can you make Sunday a day of renewal?',
  },
  {
    id: 'tithing-offerings',
    title: 'Tithing & Offerings',
    subtitle: 'Trusting God with our resources',
    category: 'covenant-living',
    audioPlaceholder: audio({
      eyebrow: 'Stewardship',
      title: 'Tithing, faith, and consecrated giving',
      summary:
        'The biblical principle of tithing in modern covenant life, blessings that follow faith, and additional offerings that express charity.',
      scriptIntent:
        'Explain tithing as ten percent of income as understood in Church handbooks, teach faith without promising prosperity as a formula, mention fast offerings and humanitarian giving, and encourage confidential discussion with bishop for hardship.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'What is tithing?',
        content:
          'Tithing is the Lord’s law for His people in our day: members contribute ten percent of income to the Church to support the Lord’s work worldwide. These sacred funds help build and maintain temples and meetinghouses, sustain missionary efforts, support education and family history resources, and bless the poor and needy through Church welfare channels.\n\nPaying tithing is an expression of faith that God is the source of all we have and that His kingdom deserves our first and honest fruits, not what remains by accident.',
      },
      {
        title: 'A principle of faith',
        content:
          'The Lord promises that He will “open … the windows of heaven” and “rebuke the devourer” for those who obey the law of tithing (see Malachi 3:10–11). Blessings may be spiritual, temporal, or both; they are received according to God’s wisdom and timing, not our personal timetable.\n\nIf tithing feels difficult, talk with your bishop in confidence. The Lord knows your heart and your circumstances. He blesses the faithful who obey, and He ministers to those who struggle with sincere intent.',
      },
      {
        title: 'Other offerings',
        content:
          'In addition to tithing, members may contribute fast offerings—typically associated with fasting two consecutive meals each month—to care for those in need. Other donation categories support missionary work, humanitarian relief, temple construction, and more.\n\nAll giving should be voluntary, cheerful, and between the giver and the Lord. The Savior cares about our motives. When we give, we learn to love as He loves—practically, generously, and without seeking praise.',
        imagePlaceholder: image({
          label: 'Donation envelope',
          title: 'Offering prepared with prayer',
          prompt:
            'Simple, respectful still life: donation envelope on kitchen table beside scriptures, soft light, symbolic of consecration and faith, no legible text, calm mood',
          aspectRatio: '4:5',
          placement: 'after',
        }),
      },
    ],
    reflectionPrompt:
      'How do you feel about trusting God with your resources? What blessings have you noticed from giving?',
  },
  {
    id: 'confirmation-gift',
    title: 'Your Confirmation',
    subtitle: 'The gift of the Holy Ghost',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'After baptism',
      title: 'The Holy Ghost as companion',
      summary:
        'What occurs in confirmation, the gift of the Holy Ghost compared with occasional spiritual influence, and how we live to retain His presence.',
      scriptIntent:
        'Describe confirmation as receiving the Holy Ghost by the laying on of hands, teach the gift as constant companionship when we are faithful, reference still, small impressions, and encourage repentance and sacrament as means of renewal.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'What happened at confirmation',
        content:
          'Following baptism by immersion, a member with priesthood authority laid hands upon your head and confirmed you a member of The Church of Jesus Christ of Latter-day Saints. In that same ordinance, you were commanded to receive the Holy Ghost.\n\nThis gift is different from the Light of Christ given to all people or the occasional influence of the Spirit many feel before baptism. The gift of the Holy Ghost, received worthily, can be your constant companion—teaching truth, comforting the brokenhearted, and sanctifying your discipleship.',
      },
      {
        title: 'Living worthy of the Spirit',
        content:
          'The Holy Ghost speaks with a voice that is still and small. He does not force; He invites. To hear Him, we keep commandments, repent quickly, forgive others, and make space in our lives for worship and service.\n\nWhen we sin willfully or ignore repeated promptings, we dull our spiritual sensitivity. That is not hopeless—it is a call to repent and return. The sacrament weekly renewal is one of the Lord’s chief mercies for those who stumble and rise again.',
        imagePlaceholder: image({
          label: 'Hands on head',
          title: 'Ordinance of laying on of hands',
          prompt:
            'Reverent, non-identifiable depiction of priesthood hands gently placed on a person’s head during confirmation, soft focus background of baptismal font area, sacred and peaceful mood, cinematic lighting, respectful composition',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Recognizing the Spirit',
        content:
          'The Holy Ghost often communicates through peace, love for God and others, clarity about what to do next, and quiet warnings when something is wrong. Feelings alone are not the only measure; the Spirit always aligns with truth revealed in the scriptures and taught by living prophets.\n\nOver time, you learn His voice the way you learn any trusted relationship—through experience, humility, and obedience. Trust the impressions that invite you toward Christ; reject anything that excuses sin or breeds contempt.',
      },
    ],
    reflectionPrompt: 'How have you felt the Holy Ghost in your life since your confirmation?',
  },
  {
    id: 'renewing-covenants',
    title: 'Renewing Covenants',
    subtitle: 'The sacrament as weekly renewal',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'Each Sunday',
      title: 'Sacrament prayers and covenant renewal',
      summary:
        'How weekly sacrament relates to baptismal covenants, what we promise and what we receive, and preparing inwardly before partaking.',
      scriptIntent:
        'Teach from the sacrament prayers in Doctrine and Covenants 20 and 3 Nephi 18, emphasize remembrance of Christ and taking His name upon us, invite repentance and spiritual preparation, avoid treating the ordinance casually.',
      status: 'draft',
      durationLabel: '7–9 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'Why we take the sacrament weekly',
        content:
          'Baptism is the gate; the sacrament is the path. Each worthy partaking renews the covenant you made at baptism: to take upon yourself the name of Jesus Christ, to remember Him always, and to keep His commandments. In return, the Lord renews the promise that His Spirit will be with you.\n\nThose sacred commitments are spoken plainly in the prayers offered on the bread and water. When you listen as if hearing them for the first time, the Spirit can deepen your gratitude and sharpen your resolve.',
      },
      {
        title: 'Preparing your heart',
        content:
          'The sacrament is most blessed when we approach it with humility and honesty. During the week, note where you fell short and where you saw the Lord’s mercy. Bring those realities to Him—not to wallow in shame, but to access forgiveness and strength.\n\nIf you are not sure you should partake, talk with your bishop. Worthiness matters because the sacrament is sacred, and the Savior’s Atonement makes repentance real.',
        imagePlaceholder: image({
          label: 'Quiet chapel bench',
          title: 'Personal reflection before the sacrament',
          prompt:
            'Interior chapel scene: empty bench in foreground, sacrament table softly lit in background, profound stillness, muted colors, reverent atmosphere, no people visible',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'A sacred moment',
        content:
          'When the sacrament is blessed and passed, set aside phones and wandering thoughts as best you can. Let hymns and prayers lead you toward the Savior. Picture His ministry, His suffering, His empty tomb, and His living guidance through prophets today.\n\nIn that quiet, Christ offers renewal. You leave sacrament meeting not because you are finished, but because you are strengthened to keep walking the covenant path until next week calls you back to His table.',
      },
    ],
    reflectionPrompt: 'What do you think about during the sacrament? How does it help you feel renewed?',
  },
  {
    id: 'temple-preparation',
    title: 'Temple Preparation',
    subtitle: 'Looking forward to sacred ordinances',
    category: 'ordinances',
    audioPlaceholder: audio({
      eyebrow: 'Holiness to the Lord',
      title: 'Preparing for the house of the Lord',
      summary:
        'What temples are, how members prepare for a temple recommend interview, and patient spiritual growth without rushing sacred milestones.',
      scriptIntent:
        'Define the temple as the house of the Lord and place of sacred ordinances, explain recommend interviews as faith and worthiness conversations with bishop and stake president, reference continuing adjustment of readiness under local leaders, avoid sensational detail of temple ceremonies.',
      status: 'draft',
      durationLabel: '8–10 min',
      voiceStyle: 'teaching',
    }),
    sections: [
      {
        title: 'The temple is a house of God',
        content:
          'Temples are holy structures where the Lord’s authorized servants administer ordinances of salvation and exaltation for the living and the dead. In the temple, members make sacred covenants with God and receive instruction that helps us center our lives on Jesus Christ.\n\nBecause the temple is sacred, some experiences are not discussed casually outside those walls. What you can know now is plain: the temple points to Christ, to covenant fidelity, and to the family bonds God wants to extend through eternity.',
        imagePlaceholder: image({
          label: 'Temple exterior',
          title: 'House of the Lord at twilight',
          prompt:
            'Photorealistic exterior of a modern Latter-day Saint temple at golden hour, clean architecture, manicured grounds, peaceful sky, reverent mood, no people, wide angle',
          aspectRatio: '16:9',
          placement: 'before',
        }),
      },
      {
        title: 'Preparing to enter',
        content:
          'New members grow in understanding and faith before receiving temple blessings such as receiving the endowment. Local leaders help individuals assess readiness through pastoral interviews focused on testimony, moral worthiness, and sustained commitment to gospel habits—not perfection, but honest discipleship.\n\nPreparation includes regular sacrament attendance, meaningful personal and family scripture study, tithing, service, and moral integrity. It also includes patience. The Lord’s timetable honors both mercy and maturing faith.',
      },
      {
        title: 'Temple recommend',
        content:
          'To enter the temple for your own ordinances, you will need a current temple recommend after interviews with your bishop and stake president. Those interviews are sacred opportunities to confirm faith in Heavenly Father, Jesus Christ, and the restored Church; to review commitments such as honesty, chastity, and loyalty to God’s commandments; and to discuss any concerns in a spirit of help and hope.\n\nHolding a recommend is both a privilege and a responsibility. It signifies that you are striving to live the standards that allow the Spirit to accompany you in the Lord’s house.',
      },
    ],
    reflectionPrompt:
      'What do you look forward to about attending the temple? How are you preparing spiritually?',
  },
  {
    id: 'finding-friends',
    title: 'Finding Friends',
    subtitle: 'Building relationships in your ward',
    category: 'belonging',
    audioPlaceholder: audio({
      eyebrow: 'Zion in miniature',
      title: 'Belonging in the ward family',
      summary:
        'Why wards are communities of covenant, practical ways to connect, and patience while the Spirit weaves genuine friendships.',
      scriptIntent:
        'Normalize the awkwardness of being new, encourage consistent attendance and simple introductions, mention ward activities and service opportunities, and ground belonging in Christ rather than popularity.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'warm',
    }),
    sections: [
      {
        title: 'Your ward family',
        content:
          'A ward is more than a congregation listed on a roster. It is a community of imperfect Saints who covenant to bear one another’s burdens, mourn with those who mourn, and stand as witnesses of God in all seasons (see Mosiah 18:8–10).\n\nFriendship in the Church is not guaranteed by automatic chemistry. It often grows through shared worship, shared service, and shared time. Be patient with others—and with yourself—as relationships deepen gradually.',
      },
      {
        title: 'Ways to connect',
        content:
          'Simple steps matter: learn names, greet someone new each week, accept invitations when you can, and volunteer for practical needs such as cleaning the meetinghouse or helping with an activity.\n\nMany wards host gatherings, service projects, and classes that build fellowship beyond Sunday morning. Saying yes, even when nervous, often becomes the doorway to belonging.',
        imagePlaceholder: image({
          label: 'Fellowship gathering',
          title: 'Ward members visiting after an activity',
          prompt:
            'Warm outdoor scene after a church social: people talking in small groups on lawn, string lights beginning to glow, diverse ages, candid friendly atmosphere, documentary style',
          aspectRatio: '16:9',
          placement: 'after',
        }),
      },
      {
        title: 'Be patient with yourself',
        content:
          'Feeling like an outsider does not mean you are failing. Many longtime members remember years when they wondered if they fit. Covenant belonging is deeper than mood—keep showing up, keep praying, keep extending simple kindness.\n\nThe Lord knows how to place people in your path: a ministering friend, a mentor in gospel study, a child’s teacher who becomes a trusted ally. Trust the process of gathering Israel in your own corner of the vineyard.',
      },
    ],
    reflectionPrompt: 'Who in your ward has made you feel welcome? How can you reach out to others?',
  },
  {
    id: 'asking-for-help',
    title: 'Asking for Help',
    subtitle: "You don't have to do this alone",
    category: 'belonging',
    audioPlaceholder: audio({
      eyebrow: 'Strength in humility',
      title: 'Seeking help as an act of faith',
      summary:
        'Why disciples ask for support, appropriate roles of bishops and ministering friends, and resources for temporal and emotional needs.',
      scriptIntent:
        'Normalize asking for help, describe bishop as a spiritual shepherd not a therapist for every issue, encourage ministering routes and professional care when needed, reference confidentiality and Church welfare principles with care.',
      status: 'draft',
      durationLabel: '6–8 min',
      voiceStyle: 'calm',
    }),
    sections: [
      {
        title: "It's okay to need help",
        content:
          'The gospel does not teach self-sufficiency apart from God. We are commanded to love, serve, and carry one another’s burdens within the limits the Lord sets (see Galatians 6:2). Asking for help can be an act of humility that opens the way for the Lord’s mercy through other people.\n\nSpiritual struggle, emotional pain, and temporal need are part of mortality. They are not evidence that you are less faithful. They are invitations to reach toward Christ and His Church.',
      },
      {
        title: 'Who to talk to',
        content:
          'Your bishop holds priesthood keys to help shepherd the ward spiritually and temporally. He can counsel with you on worthiness, repentance, and many life challenges, and he can connect you with appropriate Church resources.\n\nMinistering brothers and sisters are also part of your safety net—friends who can listen, pray, and sometimes assist with practical needs. Relief Society and elders quorum presidencies help coordinate care so support is organized and respectful.',
        imagePlaceholder: image({
          label: 'Pastoral conversation',
          title: 'Speaking with a leader after church',
          prompt:
            'Discreet, respectful scene in a small church office or foyer: two people seated across a table in conversation, open scriptures, calm body language, soft light, diverse individuals, professional candid photography',
          aspectRatio: '4:5',
          placement: 'before',
        }),
      },
      {
        title: 'Temporal and emotional support',
        content:
          'When financial hardship arises, bishops may help members access Church welfare principles that preserve dignity, encourage self-reliance where possible, and provide temporary assistance according to need.\n\nFor emotional or mental health concerns, professional counseling may be appropriate; many members combine competent care with faith, prayer, and priesthood blessings where desired. If you are in crisis, seek immediate help from local emergency services or crisis hotlines in your area.\n\nYou are not meant to carry every burden alone. The body of Christ exists, in part, so that help can be offered and received in the Savior’s name.',
      },
    ],
    reflectionPrompt:
      "Is there something you've been hesitant to ask for help with? Who might you reach out to?",
  },
];
