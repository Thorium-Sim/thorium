import React, {useState, useEffect, useRef} from "react";
import {getCardLabel} from "./actionRegistry";
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
  };
  onSelectChapter: (chapterId: string) => void;
  onClose: () => void;
}

const AdvancedTrainingChapterList: React.FC<ChapterListProps> = ({
  config,
  progress,
  onSelectChapter,
  onClose,
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

  const getChapterStatus = (chapter: any) => {
    if (progress.completedChapterIds.includes(chapter.id)) return "complete";
    if (progress.activeChapterId === chapter.id) return "active";
    return "pending";
  };

  const getSubChapterStatus = (subChapter: any) => {
    if (progress.completedSubChapterIds.includes(subChapter.id))
      return "complete";
    return "pending";
  };

  const isChapterLocked = (idx: number) => {
    if (!config.sequentialChapters) return false;
    if (idx === 0) return false;
    const prevChapter = config.chapters[idx - 1];
    return !progress.completedChapterIds.includes(prevChapter.id);
  };

  return (
    <div className="advanced-training-chapter-list">
      <div className="chapter-list-header">
        <h4>Training Chapters</h4>
        <button className="chapter-list-close" onClick={onClose}>
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
      <div className="chapter-list-body">
        {config.chapters.map((chapter: any, idx: number) => {
          const status = getChapterStatus(chapter);
          const isExpanded = expandedChapters[chapter.id] || false;
          const locked = isChapterLocked(idx);
          const justCompleted = recentlyCompleted.has(chapter.id);

          return (
            <div
              key={chapter.id}
              className={`chapter-item ${status}${locked ? " locked" : ""}${justCompleted ? " just-completed" : ""}`}
            >
              <div
                className="chapter-row"
                onClick={() => !locked && toggleExpand(chapter.id)}
              >
                <span className={`chapter-status-icon ${status}${locked ? " locked" : ""}`}>
                  {locked ? (
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="currentColor"
                    >
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
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
                {!locked && (
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
                {chapter.subChapters?.length > 0 && !locked && (
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
              {isExpanded && !locked && chapter.subChapters?.length > 0 && (
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
