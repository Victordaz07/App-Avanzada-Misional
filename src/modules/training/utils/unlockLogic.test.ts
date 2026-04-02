import { describe, it, expect } from "vitest";
import { isTrackUnlocked, isPathUnlocked, type UnlockContext } from "./unlockLogic";
import { paths, tracksById, lessonsById, getLessonsForNode } from "../data/trainingPaths";

function makeCtx(overrides?: Partial<UnlockContext>) {
  const base: UnlockContext = {
    stage: "covenanted",
    completedLessons: {},
    paths,
    tracksById,
    lessonsById,
  };
  return { ...base, ...overrides };
}

describe("unlockLogic – no regression", () => {
  it("includes ward leadership lesson lead-1 in lessonsById (track must not list empty)", () => {
    expect(lessonsById["lead-1"]).toBeDefined();
    expect(getLessonsForNode("lead-bishopric-council").map((l) => l.id)).toEqual(["lead-1"]);
  });

  it("blocks Melchizedek if one Aaronic lesson is incomplete", () => {
    const ctx = makeCtx({
      completedLessons: {
        // Core completed
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 100 },

        // Aaronic almost completed (one at 99%)
        "deacon-1": { completedAt: "x", percent: 100 },
        "deacon-2": { completedAt: "x", percent: 99 }, // not completed
        "teacher-1": { completedAt: "x", percent: 100 },
        "teacher-2": { completedAt: "x", percent: 100 },
        "priest-1": { completedAt: "x", percent: 100 },
        "priest-2": { completedAt: "x", percent: 100 },
      },
    });

    expect(isTrackUnlocked("melchizedek-elder", ctx)).toBe(false);
  });

  it("unlocks Melchizedek when Core + all Aaronic lessons are 100%", () => {
    const ctx = makeCtx({
      completedLessons: {
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 100 },

        "deacon-1": { completedAt: "x", percent: 100 },
        "deacon-2": { completedAt: "x", percent: 100 },
        "teacher-1": { completedAt: "x", percent: 100 },
        "teacher-2": { completedAt: "x", percent: 100 },
        "priest-1": { completedAt: "x", percent: 100 },
        "priest-2": { completedAt: "x", percent: 100 },
      },
    });

    expect(isTrackUnlocked("melchizedek-elder", ctx)).toBe(true);
  });

  it("returns false for any path when stage !== covenanted", () => {
    const ctx = makeCtx({ stage: "seeking" });
    expect(isPathUnlocked("core-foundations", ctx)).toBe(false);
  });

  it("locks ward leadership until Core Foundations is 100% complete", () => {
    const ctx = makeCtx({
      completedLessons: {
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 99 },
      },
    });
    expect(isPathUnlocked("ward-leadership", ctx)).toBe(false);
    expect(isTrackUnlocked("lead-bishopric-council", ctx)).toBe(false);
  });

  it("unlocks ward leadership when Core Foundations is complete", () => {
    const ctx = makeCtx({
      completedLessons: {
        "core-1": { completedAt: "x", percent: 100 },
        "core-2": { completedAt: "x", percent: 100 },
        "core-3": { completedAt: "x", percent: 100 },
        "core-4": { completedAt: "x", percent: 100 },
      },
    });
    expect(isPathUnlocked("ward-leadership", ctx)).toBe(true);
    expect(isTrackUnlocked("lead-bishopric-council", ctx)).toBe(true);
  });
});
