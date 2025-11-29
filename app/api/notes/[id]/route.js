import { NextResponse } from 'next/server';
import { getNotes, saveNotes } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    console.log(`[API] PUT /api/notes/${id}`, body);

    const notes = getNotes();
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      console.error(`[API] Note not found: ${id}`);
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Update only the fields sent, ensuring we don't lose existing data
    notes[index] = {
      ...notes[index],
      ...body,
      updatedAt: new Date().toISOString()
    };
    saveNotes(notes);
    console.log(`[API] Note updated: ${id}`);

    return NextResponse.json(notes[index]);
  } catch (error) {
    console.error(`[API] Error in PUT:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log(`[API] DELETE /api/notes/${id}`);

    let notes = getNotes();
    notes = notes.filter((n) => n.id !== id);
    saveNotes(notes);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[API] Error in DELETE:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}