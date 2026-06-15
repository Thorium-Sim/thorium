import React from "react";
import {Button} from "helpers/reactstrap";
import Views from "components/views/index";
import {ChapterEditor} from "./ChapterEditor";

/**
 * In-flight help chapters are tied to a card component and reached mid-flight
 * via the question-mark help widget (rather than the normal sequential flow).
 * Unlike regular chapters, they may target ANY card component — including cards
 * not currently on this station — so an FD can pre-author help for a card or
 * system added later in the flight. The card picker is therefore built from the
 * full set of known card views, not just the station's cards.
 */

interface InFlightChaptersSectionProps {
  chapters: any[];
  stationCards: any[];
  expandedChapter: string | null;
  onToggleExpand: (chapterId: string) => void;
  onAdd: () => void;
  onRemove: (chapterId: string) => void;
  onUpdate: (chapterId: string, updates: any) => void;
  onAddSubChapter: (chapterId: string) => void;
  onRemoveSubChapter: (chapterId: string, subId: string) => void;
  onUpdateSubChapter: (chapterId: string, subId: string, updates: any) => void;
  onStartRecording: (chapterId: string, subId: string) => void;
  onSetMediaPicker: (chapterId: string) => void;
}

// Mirrors CardsTable's view list: every known card component, minus the ones
// that aren't selectable as a station card.
function buildCardOptions(
  stationCards: any[],
): {value: string; label: string}[] {
  const onStation = new Set(
    (stationCards || []).map((c: any) => c.component).filter(Boolean),
  );
  return Object.keys(Views)
    .filter(v => v !== "Offline" && v !== "Login" && v !== "Viewscreen")
    .sort()
    .map(component => ({
      value: component,
      // ✅ marks components already present on this station (same cue as the
      // Add-Card picker), while still allowing off-station components.
      label: `${onStation.has(component) ? "✅ " : ""}${component}`,
    }));
}

const InFlightChaptersSection: React.FC<InFlightChaptersSectionProps> = ({
  chapters,
  stationCards,
  expandedChapter,
  onToggleExpand,
  onAdd,
  onRemove,
  onUpdate,
  onAddSubChapter,
  onRemoveSubChapter,
  onUpdateSubChapter,
  onStartRecording,
  onSetMediaPicker,
}) => {
  const cardOptions = React.useMemo(
    () => buildCardOptions(stationCards),
    [stationCards],
  );

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "12px",
        borderTop: "1px solid rgba(128,222,234,0.25)",
        paddingTop: "12px",
      }}
    >
      <div style={{fontWeight: 600, marginBottom: "4px"}}>
        In-Flight Help Chapters
      </div>
      <div style={{fontSize: "12px", color: "#90a4ae", marginBottom: "8px"}}>
        Reached mid-flight by pressing the help (question-mark) widget while on
        the chapter&apos;s card. Excluded from the normal sequence and from the
        overall progress bar. Can target any card, including ones not on this
        station.
      </div>

      {chapters.map((chapter: any, idx: number) => (
        <ChapterEditor
          key={chapter.id}
          chapter={chapter}
          index={idx}
          label={`⚑ ${chapter.name}`}
          stationCards={stationCards}
          cardOptions={cardOptions}
          isExpanded={expandedChapter === chapter.id}
          onToggleExpand={() => onToggleExpand(chapter.id)}
          onUpdate={updates => onUpdate(chapter.id, updates)}
          onRemove={() => onRemove(chapter.id)}
          onAddSubChapter={() => onAddSubChapter(chapter.id)}
          onRemoveSubChapter={subId => onRemoveSubChapter(chapter.id, subId)}
          onUpdateSubChapter={(subId, updates) =>
            onUpdateSubChapter(chapter.id, subId, updates)
          }
          onStartRecording={subId => onStartRecording(chapter.id, subId)}
          onSetMediaPicker={() => onSetMediaPicker(chapter.id)}
        />
      ))}

      <Button size="sm" color="info" outline onClick={onAdd}>
        + Add In-Flight Help Chapter
      </Button>
    </div>
  );
};

export default InFlightChaptersSection;
