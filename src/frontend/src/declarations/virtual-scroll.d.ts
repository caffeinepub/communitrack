declare module 'react-window' {
  import * as React from 'react';

  export interface ListProps {
    rowCount: number;
    rowHeight: number;
    rowComponent: React.ComponentType<any>;
    rowProps?: Record<string, unknown>;
    overscanCount?: number;
    style?: React.CSSProperties;
    outerRef?: React.Ref<HTMLDivElement>;
    [key: string]: unknown;
  }

  export class List extends React.Component<ListProps> {}

  export interface FixedSizeListProps {
    children: (props: { index: number; style: React.CSSProperties }) => React.ReactNode;
    height: number;
    itemCount: number;
    itemSize: number;
    width: number | string;
    overscanCount?: number;
    outerRef?: React.Ref<HTMLDivElement>;
    onScroll?: (info: { scrollOffset: number; scrollDirection: 'forward' | 'backward' }) => void;
    [key: string]: unknown;
  }

  export class FixedSizeList extends React.Component<FixedSizeListProps> {}
}

declare module 'react-virtualized-auto-sizer' {
  import * as React from 'react';

  export interface AutoSizerProps {
    children?: (size: { width: number; height: number }) => React.ReactNode;
    renderProp?: (size: { width: number | undefined; height: number | undefined }) => React.ReactNode;
    defaultWidth?: number;
    defaultHeight?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  export default class AutoSizer extends React.Component<AutoSizerProps> {}
  export { AutoSizer };
}
