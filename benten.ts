import { LibraryItem } from "./models";

export class benten extends LibraryItem {
    private issue: string;

    constructor(title: string, itemId: number, issue: string) {
        super(title, itemId);
        this.issue = issue;
    }

    getDetails(): string {
        return `benten: "${this.Title}" ฉบับ ${this.issue} (ID: ${this.itemId})`;
    }

    get Id(): number {
        return this.itemId;
    }
}
