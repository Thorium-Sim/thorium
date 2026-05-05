import React, {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {useAdvancedTraining} from "./useAdvancedTraining";
import AdvancedTrainingChapterList from "./AdvancedTrainingChapterList";
import AdvancedTrainingMediaViewer from "./AdvancedTrainingMediaViewer";
import {getActionLabel} from "./actionRegistry";
import "./AdvancedTrainingBorder.scss";

interface AdvancedTrainingBorderProps {
  clientId: string;
  simulatorId: string;
  advancedTrainingConfig: any;
  children: React.ReactNode;
}

// Collect every sub-chapter across all chapter types for progress calculation
function getAllSubChapters(config: any): any[] {
  const subs: any[] = [];
  if (config.loginChapter?.subChapters) {
    subs.push(...config.loginChapter.subChapters);
  }
  for (const ch of config.chapters || []) {
    if (ch.subChapters) subs.push(...ch.subChapters);
  }
  if (config.completionChapter?.subChapters) {
    subs.push(...config.completionChapter.subChapters);
  }
  return subs;
}

interface Toast {
  id: string;
  message: string;
  type: "action" | "subChapter" | "chapter";
}

const TOAST_DURATION: Record<Toast["type"], number> = {
  action: 1500,
  subChapter: 2500,
  chapter: 3500,
};

const AdvancedTrainingBorder: React.FC<AdvancedTrainingBorderProps> = ({
  clientId,
  simulatorId,
  advancedTrainingConfig,
  children,
}) => {
  const {
    progress,
    config,
    isInAdvancedTraining,
    recordAction,
    setActiveChapter,
    toggleMediaViewer,
    toggleChapterList,
    stopTraining,
  } = useAdvancedTraining({
    clientId,
    simulatorId,
    advancedTrainingConfig,
  });

  // ── Toast notification state ──
  const [toasts, setToasts] = useState<Toast[]>([]);
  const addToast = (message: string, type: Toast["type"]) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, {id, message, type}]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, TOAST_DURATION[type]);
  };

  // Stable refs so the document listener never needs to re-register
  const recordActionRef = useRef(recordAction);
  recordActionRef.current = recordAction;
  const isActiveRef = useRef(isInAdvancedTraining);
  isActiveRef.current = isInAdvancedTraining;

  // Capture clicks on card elements via the document (capture phase) so the
  // overlay's pointer-events:none doesn't prevent recording. Clicks on training
  // UI itself are skipped by checking the overlay root class.
  useEffect(() => {
    if (!isInAdvancedTraining) return;

    const handleDocumentClick = (e: MouseEvent) => {
      if (!isActiveRef.current) return;
      const target = e.target as HTMLElement;

      // Skip clicks on training UI elements
      if (target.closest(".advanced-training-overlay")) return;

      const interactive = target.closest(
        "button, a, [role='button'], input, select, .btn",
      ) as HTMLElement | null;
      const el = interactive || target;

      const tag = el.tagName.toLowerCase();
      if (
        ["div", "span", "col", "row", "container", "section"].includes(tag) &&
        !interactive
      ) {
        return;
      }

      const text =
        el.textContent?.trim().replace(/\s+/g, " ").substring(0, 60) ||
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        "";

      if (!text) return;

      recordActionRef.current(`click:${text}`, {
        text,
        tag,
        className: el.className
          ? String(el.className).split(" ").filter(Boolean).slice(0, 3).join(" ")
          : null,
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [isInAdvancedTraining]);

  // Auto-open chapter list briefly when the active chapter changes
  const prevChapterIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (!progress) return;
    const prevId = prevChapterIdRef.current;
    const currentId = progress.activeChapterId;
    prevChapterIdRef.current = currentId;

    if (prevId && currentId && prevId !== currentId && !progress.chapterListOpen) {
      toggleChapterList(true);
      const timeout = setTimeout(() => toggleChapterList(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [progress?.activeChapterId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Feature 3: Detect new observed actions → toast ──
  const prevObservedRef = useRef<Record<string, string[]>>({});
  useEffect(() => {
    if (!progress) return;
    const prev = prevObservedRef.current;
    const current = progress.observedActions || {};

    for (const subId of Object.keys(current)) {
      const prevActions = prev[subId] || [];
      const currentActions = current[subId] || [];
      for (const action of currentActions) {
        if (!prevActions.includes(action)) {
          addToast(getActionLabel(action), "action");
        }
      }
    }

    prevObservedRef.current = current;
  }, [progress?.observedActions]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Feature 2: Detect sub-chapter & chapter completions → toast ──
  const prevCompletedSubsRef = useRef<string[]>([]);
  const prevCompletedChaptersRef = useRef<string[]>([]);
  useEffect(() => {
    if (!progress || !config) return;

    // Sub-chapter completions
    const prevSubs = prevCompletedSubsRef.current;
    const currentSubs = progress.completedSubChapterIds || [];
    for (const subId of currentSubs) {
      if (!prevSubs.includes(subId)) {
        // Find sub-chapter name
        const allSubs = getAllSubChapters(config);
        const sub = allSubs.find((s: any) => s.id === subId);
        if (sub) {
          addToast(`${sub.name}`, "subChapter");
        }
      }
    }
    prevCompletedSubsRef.current = currentSubs;

    // Chapter completions
    const prevChapters = prevCompletedChaptersRef.current;
    const currentChapters = progress.completedChapterIds || [];
    for (const chId of currentChapters) {
      if (!prevChapters.includes(chId)) {
        const ch =
          config.chapters?.find((c: any) => c.id === chId) ||
          (config.loginChapter?.id === chId ? config.loginChapter : null) ||
          (config.completionChapter?.id === chId
            ? config.completionChapter
            : null);
        if (ch) {
          addToast(`Chapter Complete: ${ch.name}`, "chapter");
        }
      }
    }
    prevCompletedChaptersRef.current = currentChapters;
  }, [progress?.completedSubChapterIds, progress?.completedChapterIds]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isInAdvancedTraining || !config || !progress) {
    return <>{children}</>;
  }

  const activeChapter =
    config.chapters.find((c: any) => c.id === progress.activeChapterId) ||
    (config.loginChapter?.id === progress.activeChapterId
      ? config.loginChapter
      : null) ||
    (config.completionChapter?.id === progress.activeChapterId
      ? config.completionChapter
      : null);

  // ── Feature 1: Hints — pending actions for the active sub-chapter ──
  const activeSubChapter = activeChapter?.subChapters?.find(
    (sc: any) => sc.id === progress.activeSubChapterId,
  );
  const observedForSub =
    progress.observedActions?.[progress.activeSubChapterId || ""] || [];
  const pendingActions = (activeSubChapter?.requiredActions || []).filter(
    (ra: any) => !observedForSub.includes(ra.eventName),
  );
  const completedActions = (activeSubChapter?.requiredActions || []).filter(
    (ra: any) => observedForSub.includes(ra.eventName),
  );

  // ── Feature 4: Overall progress ──
  const allSubChapters = getAllSubChapters(config);
  const totalSubs = allSubChapters.length;
  const completedSubs = (progress.completedSubChapterIds || []).length;
  const progressPercent = totalSubs > 0 ? Math.round((completedSubs / totalSubs) * 100) : 0;

  return (
    <>
      {children}

      {createPortal(
        <div className="advanced-training-isolation">
          <div className="advanced-training-overlay">
            {/* ── Top bar ── */}
            <div className="advanced-training-top-bar">
              <div className="advanced-training-controls">
                <button
                  className={`advanced-training-btn ${
                    progress.chapterListOpen ? "active" : ""
                  }`}
                  onClick={() => toggleChapterList(!progress.chapterListOpen)}
                  title="Training Chapters"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                  </svg>
                </button>
                <button
                  className={`advanced-training-btn ${
                    progress.mediaViewerOpen ? "active" : ""
                  }`}
                  onClick={() => toggleMediaViewer(!progress.mediaViewerOpen)}
                  title="Media Viewer"
                  disabled={!activeChapter?.mediaAsset}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Chapter name + progress bar */}
              <div className="advanced-training-status">
                {activeChapter ? (
                  <span className="advanced-training-chapter-name">
                    {activeChapter.name}
                  </span>
                ) : (
                  <span>Training Complete</span>
                )}
                {totalSubs > 0 && (
                  <div className="advanced-training-progress-bar">
                    <div
                      className={`advanced-training-progress-fill${
                        progressPercent >= 100 ? " complete" : ""
                      }`}
                      style={{width: `${progressPercent}%`}}
                    />
                  </div>
                )}
              </div>

              <button
                className="advanced-training-btn advanced-training-close"
                onClick={stopTraining}
                title="Exit Training"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* ── Hint bar — shows pending actions for the active sub-chapter ── */}
            {activeSubChapter && (activeSubChapter.requiredActions?.length > 0) && (
              <div className="advanced-training-hint-bar">
                {activeSubChapter.name && (
                  <span className="hint-task-name">{activeSubChapter.name}</span>
                )}
                <div className="hint-actions">
                  {completedActions.map((ra: any) => (
                    <span key={ra.id} className="hint-action done">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {getActionLabel(ra.eventName, activeChapter?.cardComponent)}
                    </span>
                  ))}
                  {pendingActions.map((ra: any) => (
                    <span key={ra.id} className="hint-action pending">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                        <circle cx="12" cy="12" r="5" />
                      </svg>
                      {getActionLabel(ra.eventName, activeChapter?.cardComponent)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── Body: sidebar + passthrough ── */}
            <div className="advanced-training-overlay-body">
              <div
                className={`advanced-training-sidebar${
                  progress.chapterListOpen ? " open" : ""
                }`}
              >
                <AdvancedTrainingChapterList
                  config={config}
                  progress={progress}
                  onSelectChapter={setActiveChapter}
                  onClose={() => toggleChapterList(false)}
                />
              </div>

              <div className="advanced-training-passthrough" />
            </div>

            {/* ── Media viewer ── */}
            {progress.mediaViewerOpen && activeChapter?.mediaAsset && (
              <AdvancedTrainingMediaViewer
                key={progress.activeChapterId || "media"}
                src={`/assets${activeChapter.mediaAsset}`}
                onClose={() => toggleMediaViewer(false)}
                size={activeChapter.mediaSize || "small"}
                position={activeChapter.mediaPosition || "bottom-right"}
              />
            )}

            {/* ── Toast notifications ── */}
            {toasts.length > 0 && (
              <div className="advanced-training-toasts">
                {toasts.map(toast => (
                  <div key={toast.id} className={`training-toast ${toast.type}`}>
                    {toast.type === "action" && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                    {toast.type === "subChapter" && (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                    {toast.type === "chapter" && (
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94.85-3.66-2.83-2.45 3.74-.32L12 7.82l1.46 3.14 3.74.32-2.83 2.45.85 3.66z" />
                      </svg>
                    )}
                    <span>{toast.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default AdvancedTrainingBorder;
