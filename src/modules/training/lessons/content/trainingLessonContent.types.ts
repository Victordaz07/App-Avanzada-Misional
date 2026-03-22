export interface TrainingLessonScripture {
  ref: string;
  text: string;
}

/** Contenido estructurado para lecciones del módulo Training (ES/EN). */
export interface TrainingLessonContent {
  intro: string;
  objectivesHeading: string;
  objectives: string[];
  briefHeading: string;
  briefBody: string;
  scripturesHeading: string;
  scriptures: TrainingLessonScripture[];
  didYouKnowHeading: string;
  didYouKnow: string[];
  practiceHeading: string;
  practiceHint: string;
  practiceItems: string[];
  practiceDone: string;
  practicePending: string;
  reflectionHeading: string;
  reflectionHint: string;
  reflectionQuestions: string[];
  reflectionPlaceholder: string;
  actionHeading: string;
  actionText: string;
}
