import React, { useEffect, useState } from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const GridLayout = () => {
    const GRID_COLS = 12;
    const ROW_HEIGHT = 40;
    const CELL_MARGIN = 5;

    const layout = [
        { i: '1', x: 0, y: 0, w: 2, h: 2 },
        { i: '2', x: 4, y: 0, w: 2, h: 3 },
        { i: '3', x: 4, y: 0, w: 2, h: 2 },
        { i: '4', x: 0, y: 2, w: 3, h: 2 },
        { i: '5', x: 1, y: 2, w: 1, h: 2 },
        { i: '6', x: 6, y: 2, w: 2, h: 2 }
    ];

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const { width: GRID_WIDTH, height: GRID_HEIGHT } = screenSize;

    const renderBackgroundGrid = () => {
        const rows = Math.floor(GRID_HEIGHT / (ROW_HEIGHT + CELL_MARGIN));
        const cellWidth = (GRID_WIDTH - (GRID_COLS + 1) * CELL_MARGIN) / GRID_COLS;
        const gridCells = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < GRID_COLS; x++) {
                gridCells.push(
                    <div
                        key={`${x}-${y}`}
                        style={{
                            position: 'absolute',
                            left: CELL_MARGIN + x * (cellWidth + CELL_MARGIN),
                            top: CELL_MARGIN + y * (ROW_HEIGHT + CELL_MARGIN),
                            width: cellWidth,
                            height: ROW_HEIGHT,
                            border: '1px dashed rgba(0,0,0,0.2)',
                            boxSizing: 'border-box',
                        }}
                    />
                );
            }
            console.log('grid cells:', gridCells);
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
                margin={[CELL_MARGIN, CELL_MARGIN]}
                containerPadding={[CELL_MARGIN, CELL_MARGIN]}
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