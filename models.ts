// Interface สำหรับสิ่งที่สามารถยืมได้
export interface Borrowable {
    isAvailable(): boolean;
    borrow(): string;
    returnItem(): string;
}

// Abstract class สำหรับสิ่งของในห้องสมุด
export abstract class LibraryItem implements Borrowable {
    private title: string;
    protected itemId: number;
    private available: boolean;

    constructor(title: string, itemId: number) {
        this.title = title;
        this.itemId = itemId;
        this.available = true;
    }

    get Title(): string {
        return this.title;
    }

    isAvailable(): boolean {
        return this.available;
    }

    borrow(): string {
        if (!this.available) return `"${this.title}" ไม่พร้อมให้ยืม`;
        this.available = false;
        return `คุณได้ยืม "${this.title}" สำเร็จ ✅`;
    }

    returnItem(): string {
        if (this.available) return `"${this.title}" ยังไม่ได้ถูกยืม`;
        this.available = true;
        return `คุณได้คืน "${this.title}" สำเร็จ ✅`;
    }

    abstract getDetails(): string;
}

// Book subclass
export class Book extends LibraryItem {
    private author: string;

    constructor(title: string, itemId: number, author: string) {
        super(title, itemId);
        this.author = author;
    }

    getDetails(): string {
        return `หนังสือ: "${this.Title}" โดย ${this.author} (ID: ${this.itemId})`;
    }

    get Id(): number {
        return this.itemId;
    }
}

// Library Member
export class LibraryMember {
    private memberName: string;
    private memberId: number;
    private borrowedItems: LibraryItem[];

    constructor(name: string, id: number) {
        this.memberName = name;
        this.memberId = id;
        this.borrowedItems = [];
    }

    get MemberName(): string {
        return this.memberName;
    }

    get MemberId(): number {
        return this.memberId;
    }

    borrowItem(item: LibraryItem): string {
        if (!item.isAvailable()) return `"${item.Title}" ไม่พร้อมให้ยืม`;
        const msg = item.borrow();
        this.borrowedItems.push(item);
        return msg;
    }

    returnItem(itemId: number): string {
        const index = this.borrowedItems.findIndex(it => (it as any).itemId === itemId);
        if (index === -1) return `ไม่พบสิ่งของที่สมาชิกยืม ID: ${itemId}`;
        const item = this.borrowedItems[index];
        const msg = item.returnItem();
        this.borrowedItems.splice(index, 1);
        return msg;
    }

    listBorrowedItems(): string[] {
        if (this.borrowedItems.length === 0) return [`${this.memberName} ยังไม่ได้ยืมสิ่งของ`];
        return this.borrowedItems.map(it => it.getDetails());
    }
}
