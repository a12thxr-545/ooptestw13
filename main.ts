import { LibraryItem, Book, LibraryMember } from "./models";
import { bentenomivers } from "./bentenomivers";
import { benten } from "./benten";
import { footballdvd } from "./footballdvd";

const libraryItems: LibraryItem[] = [
  new Book("TS Basics", 101, "Somchai"),
  new Book("Algorithms", 102, "Kamol"),
  new benten("bentenison", 301, "Sep 2025"),
  new bentenomivers("bentenisonfuture", 201, "Christopher Nolan", 148),
  new footballdvd("videofootball", 555, "pep morgan", 666),
];

const members: LibraryMember[] = [];

function showItems() {
  console.log("\n📚 รายการสิ่งของทั้งหมด:");
  libraryItems.forEach((item) =>
    console.log(`- ${item.getDetails()} [${item.isAvailable() ? "ว่าง" : "ถูกยืม"}]`)
  );
}

function showMembers() {
  if (members.length === 0) {
    console.log("ยังไม่มีสมาชิกในระบบ");
    return;
  }
  console.log("\n👤 รายชื่อสมาชิก:");
  members.forEach(m => console.log(`- ${m.MemberName} (ID: ${m.MemberId})`));
}

function addMember() {
  const idStr = prompt("กรอกรหัสสมาชิก: ");
  const name = prompt("กรอกชื่อสมาชิก: ");
  if (idStr === null || name === null) {
    console.log("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }
  const member = new LibraryMember(name, Number(idStr));
  members.push(member);
  console.log(`✅ เพิ่มสมาชิก ${name} เรียบร้อย`);
}

function borrowItem() {
  const memberIdStr = prompt("กรอกรหัสสมาชิก: ");
  const member = members.find(m => m.MemberId === Number(memberIdStr));
  if (!member) {
    console.log("❌ ไม่พบสมาชิกรหัสนี้");
    return;
  }

  const itemIdStr = prompt("กรอกรหัสสิ่งของที่ต้องการยืม: ");
  const item = libraryItems.find(i => (i as any).itemId === Number(itemIdStr));
  if (!item) {
    console.log("❌ ไม่พบสิ่งของรหัสนี้");
    return;
  }

  console.log(member.borrowItem(item));
}

function returnItem() {
  const memberIdStr = prompt("กรอกรหัสสมาชิก: ");
  const member = members.find(m => m.MemberId === Number(memberIdStr));
  if (!member) {
    console.log("❌ ไม่พบสมาชิกรหัสนี้");
    return;
  }

  const itemIdStr = prompt("กรอกรหัสสิ่งของที่ต้องการคืน: ");
  const itemId = Number(itemIdStr);

  console.log(member.returnItem(itemId));
}

function main() {
  while (true) {
    console.log(`
===== ระบบห้องสมุด (ดำซาอุ) =====
1. แสดงรายการสิ่งของ
2. เพิ่มสมาชิก
3. แสดงสมาชิก
4. ยืมสิ่งของ
5. คืนสิ่งของ
0. ออกจากโปรแกรม
`);
    const choice = prompt("เลือกเมนู: ");
    switch (choice) {
      case "1": showItems(); break;
      case "2": addMember(); break;
      case "3": showMembers(); break;
      case "4": borrowItem(); break;
      case "5": returnItem(); break;
      case "0": return;
      default: console.log("กรุณาเลือกเมนูที่ถูกต้อง");
    }
  }
}

main();
