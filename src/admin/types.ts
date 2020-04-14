interface SortMeta {
    field: string;
    order: number;
}

interface FilterMetadata {
    value?: any;
    matchMode?: string;
}

export interface LazyLoadEvent {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    multiSortMeta?: SortMeta[];
    filters?: {[s: string]: FilterMetadata;};
    globalFilter?: any;
}