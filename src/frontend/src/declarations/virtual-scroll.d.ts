// Type declarations for react-window and react-virtualized-auto-sizer
declare module "react-window" {
  import type { CSSProperties, ComponentType, Ref } from "react";

  export interface ListChildComponentProps {
    index: number;
    style: CSSProperties;
    data: any;
  }

  export type ListRef = {
    element: HTMLElement | null;
    scrollTo(scrollOffset: number): void;
    scrollToItem(index: number, align?: string): void;
  };

  export function useListCallbackRef(): [ListRef | null, (ref: ListRef | null) => void];

  export interface ListProps {
    listRef?: (ref: ListRef | null) => void;
    style?: CSSProperties;
    rowCount: number;
    rowHeight: number;
    rowComponent: ComponentType<any>;
    rowProps?: any;
    overscanCount?: number;
    onScroll?: (info: { scrollOffset: number; scrollDirection: string }) => void;
    [key: string]: any;
  }

  export const List: ComponentType<ListProps>;
  export const FixedSizeList: ComponentType<any>;
  export const VariableSizeList: ComponentType<any>;
  export const FixedSizeGrid: ComponentType<any>;
  export const VariableSizeGrid: ComponentType<any>;
}

declare module "react-virtualized-auto-sizer" {
  import type { ComponentType, CSSProperties } from "react";

  export interface AutoSizerProps {
    children?: (size: { width: number; height: number }) => React.ReactNode;
    renderProp?: (size: { width: number; height: number }) => React.ReactNode;
    className?: string;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    nonce?: string;
    onResize?: (size: { width: number; height: number }) => void;
    style?: CSSProperties;
    [key: string]: any;
  }

  const AutoSizer: ComponentType<AutoSizerProps>;
  export default AutoSizer;
  export { AutoSizer };
}
