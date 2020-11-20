export interface Files {
    isSelected: boolean;
    name: string;
    value: string;
}

export interface Folder {
    folderName: string;
    isRoot: boolean;
    files: Array<Files>;
    folders: Folder[];
    isSelected: boolean;
}
