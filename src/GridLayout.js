import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayout = () => {
    const GRID_COLS = 12;
    const ROW_HEIGHT = 30;
    const GRID_WIDTH = 1200;
    const GRID_HEIGHT = 600;

    const layout = [
        { i: '1', x: 0, y: 0, w: 2, h: 2 },
        { i: '2', x: 4, y: 0, w: 4, h: 3 },
        { i: '2', x: 4, y: 0, w: 4, h: 3 },
        { i: '3', x: 0, y: 2, w: 3, h: 2 },
        { i: '4', x: 3, y: 2, w: 3, h: 2 },
        { i: '5', x: 6, y: 2, w: 3, h: 2 }
    ];

    const renderBackgroundGrid = () => {
        const rows = Math.floor(GRID_HEIGHT / ROW_HEIGHT);
        const cellWidth = GRID_WIDTH / GRID_COLS;
        const gridCells = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < GRID_COLS; x++) {
                gridCells.push(
                    <div
                        key={`${x}-${y}`}
                        style={{
                            position: 'absolute',
                            left: x * cellWidth,
                            top: y * ROW_HEIGHT,
                            width: cellWidth,
                            height: ROW_HEIGHT,
                            border: '1px dashed rgba(0,0,0,0.2)',
                            boxSizing: 'border-box',
                        }}
                    />
                );
            }
        }

        return (
            <div
                style={{
                    position: 'absolute',
                    width: GRID_WIDTH,
                    top: 0,
                    left: 0,
                    height: GRID_HEIGHT,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                {gridCells}
            </div>
        );
    };

    return (
        <div
            style={{
                position: 'relative',
                width: GRID_WIDTH,
                height: GRID_HEIGHT,
                margin: '0 auto',
                border: '1px solid #ccc',
                overflow: 'hidden',
            }}
        >
            {renderBackgroundGrid()}

            <ReactGridLayout
                className="layout"
                layout={layout}
                cols={GRID_COLS}
                rowHeight={ROW_HEIGHT}
                width={GRID_WIDTH}
                containerPadding={[0, 0]}
                margin={[0, 0]}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: GRID_WIDTH,
                    height: GRID_HEIGHT,
                    zIndex: 1,
                }}
                isResizable
                isDraggable
            >
                {layout.map(item => (
                    <div key={item.i} style={{ background: '#e0e0e0', border: '1px solid #999' }}>{item.i}</div>
                ))}
            </ReactGridLayout>
        </div>
    );

}

export default GridLayout