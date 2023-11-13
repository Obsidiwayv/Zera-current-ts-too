export interface ChannelData {
    id?: number;
    guid: string;
    welcome: string;
    leave: string;
}

export interface ChannelDataChangableNullable {
    welcome?: string;
    leave?: string;
    guid: string;
}