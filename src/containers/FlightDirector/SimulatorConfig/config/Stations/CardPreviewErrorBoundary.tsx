import React from "react";

// Error boundary around the live card preview in the Record Actions modal.
// A card component can throw when rendered outside a real flight; this shows the
// error instead of crashing the modal, and reminds the FD they can still pick
// actions from the list.
class CardPreviewErrorBoundary extends React.Component<
  {children: React.ReactNode; cardName: string},
  {error: Error | null}
> {
  state = {error: null as Error | null};

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#f44336",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <p>Unable to render card preview for "{this.props.cardName}".</p>
          <p style={{fontSize: "12px", color: "#888", marginTop: "8px"}}>
            {this.state.error.message}
          </p>
          <p style={{fontSize: "12px", color: "#666", marginTop: "4px"}}>
            You can still select actions from the list on the right.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default CardPreviewErrorBoundary;
