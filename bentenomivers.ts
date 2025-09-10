import { LibraryItem } from "./models";

export class bentenomivers extends LibraryItem {
    private director: string;
    private duration: number;

    constructor(title: string, itemId: number, director: string, duration: number) {
        super(title, itemId);
        this.director = director;
        this.duration = duration;
    }

    getDetails(): string {
        return `bentenomivers: "${this.Title}" กำกับโดย ${this.director} (ความยาว: ${this.duration} นาที, ID: ${this.itemId})`;
    }

    get Id(): number {
        return this.itemId;
    }
}
