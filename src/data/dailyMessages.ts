export type DailyMessageId =
  | "comfortBurdened"
  | "seekWisdom"
  | "peaceThroughPrayer";

export const DAILY_MESSAGE_IDS: DailyMessageId[] = [
  "comfortBurdened",
  "seekWisdom",
  "peaceThroughPrayer"
];

export type DailyMessageRole = "investigator" | "member";

interface RoleDailyMessagesMap {
  [role: string]: DailyMessageId[];
}

// Daily messages by role
export const ROLE_DAILY_MESSAGES: RoleDailyMessagesMap = {
  investigator: DAILY_MESSAGE_IDS,
  member: DAILY_MESSAGE_IDS,
};

