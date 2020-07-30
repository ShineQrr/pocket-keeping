type RootState = {
    dialogAddVisible: boolean;
    recordList: RecordItem[];
    createRecordError: Error | null;
    tagList: Tag[];
    currentTag?: Tag;
}

type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
};

type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    createItem: (name: string) => { code: number; message: string };// 1 表示成功 0表示name重复
    save: () => void;
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    remove: (id: string) => boolean;
}

// interface Window {
// }