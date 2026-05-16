import React, { useCallback, useRef } from 'react';

type Props = {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    scrollAmount?: number;
};

const arrowButtonStyle: React.CSSProperties = {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.4)',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    lineHeight: 1,
    flexShrink: 0,
    width: '100%',
    userSelect: 'none',
};

export const ScrollableList: React.FC<Props> = ({ children, style, className, scrollAmount = 250 }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollUp = useCallback(() => {
        containerRef.current?.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }, [scrollAmount]);

    const scrollDown = useCallback(() => {
        containerRef.current?.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }, [scrollAmount]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', gap: '4px' }}>
            <button style={arrowButtonStyle} onClick={scrollUp}>▲</button>
            <div
                ref={containerRef}
                style={{ ...style, overflow: 'auto', touchAction: 'pan-y', flex: 1 }}
                className={className}
            >
                {children}
            </div>
            <button style={arrowButtonStyle} onClick={scrollDown}>▼</button>
        </div>
    );
};
