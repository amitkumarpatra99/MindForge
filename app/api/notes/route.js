import { NextResponse } from 'next/server';
import { getNotes, saveNotes } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

export async function GET() {
  const notes = getNotes();
  return NextResponse.json(notes);
}

export async function POST() {
  const notes = getNotes();

  const newNote = {
    id: uuidv4(),
    title: 'Untitled Note',
    content: '',
    tags: [],
    isFavorite: false,
    updatedAt: new Date().toISOString(),
  };

  notes.unshift(newNote);
  saveNotes(notes);

  return NextResponse.json(newNote, { status: 201 });
}