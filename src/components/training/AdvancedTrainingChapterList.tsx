import React, {useState, useEffect, useRef} from "react";
import {getCardLabel} from "./actionRegistry";
import {CARD_PREREQUISITES} from "./trainingPrerequisites";
import "./AdvancedTrainingChapterList.scss";

interface ChapterListProps {
  config: {
    sequentialChapters?: boolean;
    chapters: any[];
  };
  progress: {
    activeChapterId: string | null;
    completedChapterIds: string[];
    completedSubChapterIds: string[];
    globalObservedEvents?: string[];
  };
  onSelectChapter: (chapterId: string) => void;
}

const AdvancedTrainingChapterList: React.FC<ChapterListProps> = ({
  config,
  progress,
  onSelectChapter,
}) => {
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >(() => {
    // Auto-expand the active chapter
    const initial: Record<string, boolean> = {};
    if (progress.activeChapterId) {
      initial[progress.activeChapterId] = true;
    }
    return initial;
  });

  // Track recently completed chapters for animation
  const [recentlyCompleted, setRecentlyCompleted] = useState<Set<string>>(
    new Set(),
  );
  const prevCompletedRef = useRef<string[]>(progress.completedChapterIds);

  useEffect(() => {
    const prev = prevCompletedRef.current;
    const current = progress.completedChapterIds;
    const newlyCompleted = current.filter(id => !prev.includes(id));

    if (newlyCompleted.length > 0) {
      setRecentlyCompleted(s => {
        const next = new Set(s);
        newlyCompleted.forEach(id => next.add(id));
        return next;
      });

      // Clear animation after it plays
      const timeout = setTimeout(() => {
        setRecentlyCompleted(s => {
          const next = new Set(s);
          newlyCompleted.forEach(id => next.delete(id));
          return next;
        });
      }, 1500);

      prevCompletedRef.current = current;
      return () => clearTimeout(timeout);
    }

    prevCompletedRef.current = current;
  }, [progress.completedChapterIds]);

  const toggleExpand = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const isPrerequisiteLocked = (chapter: any) => {
    const prerequisites = CARD_PREREQUISITES[chapter.cardComponent] || [];
    if (prerequisites.length === 0) {
      return false;
    }
    const observed = progress.globalObservedEvents || [];
    return prerequisites.some((evt: string) => !observed.includes(evt));
  };

  const getChapterStatus = (chapter: any) => {
    if (progress.completedChapterIds.includes(chapter.id)) {
      return "complete";
    }
    if (progress.activeChapterId === chapter.id) {
      return "active";
    }
    return "pending";
  };

  const getSubChapterStatus = (subChapter: any) => {
    if (progress.completedSubChapterIds.includes(subChapter.id)) {
      return "complete";
    }
    return "pending";
  };

  const isChapterLocked = (idx: number) => {
    if (!config.sequentialChapters) {
      return false;
    }
    if (idx === 0) {
      return false;
    }
    const prevChapter = config.chapters[idx - 1];
    return !progress.completedChapterIds.includes(prevChapter.id);
  };

  return (
    <div className="advanced-training-chapter-list">
      <div className="chapter-list-header">
        <h4>Training Chapters</h4>
      </div>
      <div className="chapter-list-body">
        {config.chapters.map((chapter: any, idx: number) => {
          const status = getChapterStatus(chapter);
          const isExpanded = expandedChapters[chapter.id] || false;
          const locked = isChapterLocked(idx);
          const prereqLocked =
            !locked && status === "pending" && isPrerequisiteLocked(chapter);
          const isBlocked = locked || prereqLocked;
          const justCompleted = recentlyCompleted.has(chapter.id);

          return (
            <div
              key={chapter.id}
              className={`chapter-item ${status}${locked ? " locked" : ""}${
                prereqLocked ? " prereq-locked" : ""
              }${justCompleted ? " just-completed" : ""}`}
            >
              <div
                className="chapter-row"
                onClick={() => !isBlocked && toggleExpand(chapter.id)}
              >
                <span
                  className={`chapter-status-icon ${status}${
                    locked ? " locked" : ""
                  }${prereqLocked ? " prereq-locked" : ""}`}
                >
                  {locked ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </svg>
                  ) : prereqLocked ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                  ) : status === "complete" ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : status === "active" ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <span className="chapter-number">{idx + 1}</span>
                  )}
                </span>
                <div className="chapter-info">
                  <span className="chapter-name">{chapter.name}</span>
                  <span className="chapter-card">
                    {getCardLabel(chapter.cardComponent)}
                  </span>
                </div>
                {!isBlocked && (
                  <button
                    className="chapter-play-btn"
                    onClick={e => {
                      e.stopPropagation();
                      onSelectChapter(chapter.id);
                    }}
                    title="Go to this chapter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                )}
                {chapter.subChapters?.length > 0 && !isBlocked && (
                  <span
                    className={`chapter-expand ${isExpanded ? "expanded" : ""}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </span>
                )}
              </div>
              {isExpanded && !isBlocked && chapter.subChapters?.length > 0 && (
                <div className="sub-chapter-list">
                  {chapter.subChapters.map((sub: any) => {
                    const subStatus = getSubChapterStatus(sub);
                    return (
                      <div
                        key={sub.id}
                        className={`sub-chapter-row ${subStatus}`}
                      >
                        <span className={`sub-chapter-status ${subStatus}`}>
                          {subStatus === "complete" ? (
                            <svg
                              viewBox="0 0 24 24"
                              width="14"
                              height="14"
                              fill="currentColor"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          ) : (
                            <span className="sub-chapter-dot" />
                          )}
                        </span>
                        <span className="sub-chapter-name">{sub.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdvancedTrainingChapterList;
