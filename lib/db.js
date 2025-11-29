import fs from 'fs';
import path from 'path';

// Path to our JSON "database"
const dbPath = path.join(process.cwd(), 'data.json');

// Helper to read data
export function getNotes() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([])); // Create if missing
    return [];
  }
  const fileData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(fileData);
}

// Helper to write data
export function saveNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));
}