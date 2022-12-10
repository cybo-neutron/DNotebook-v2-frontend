export type Note = {
    id:string
    title: string,
    description: string,
    user_id: string,
    onSelectNote?: (id: string) => void,
    
}

export type SidebarNoteProps = Note & {
    isActive: boolean;
    onSelectNote: (id: string) => void;
};
