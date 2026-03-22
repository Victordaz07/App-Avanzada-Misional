export interface GuideImagePlaceholder {
  label: string;
  title: string;
  prompt: string;
  aspectRatio?: '16:9' | '4:5' | '1:1';
  placement?: 'before' | 'after';
}

export interface GuideAudioPlaceholder {
  eyebrow: string;
  title: string;
  summary: string;
  scriptIntent: string;
  status: string;
  durationLabel?: string;
  voiceStyle?: 'calm' | 'warm' | 'teaching';
}

export interface GuideSection {
  title: string;
  content: string;
  imagePlaceholder?: GuideImagePlaceholder;
}

export interface GuideTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'worship' | 'covenant-living' | 'ordinances' | 'belonging';
  sections: GuideSection[];
  reflectionPrompt: string;
  audioPlaceholder?: GuideAudioPlaceholder;
}

export type GuideCategory = GuideTopic['category'];
