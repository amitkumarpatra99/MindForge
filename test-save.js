// const fetch = require('node-fetch'); // Built-in in Node 18+

async function testSave() {
    const baseUrl = 'http://localhost:3000/api/notes';

    // 1. Create Note
    console.log('Creating note...');
    const createRes = await fetch(baseUrl, { method: 'POST' });
    const note = await createRes.json();
    console.log('Created:', note.id);

    // 2. Update Note
    console.log('Updating note...');
    const updateData = {
        title: 'Updated Title',
        content: 'Updated Content',
        tags: ['updated'],
        isFavorite: true
    };

    const updateRes = await fetch(`${baseUrl}/${note.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
    });
    const updatedNote = await updateRes.json();
    console.log('Updated Response:', updatedNote);

    // 3. Verify Persistence (GET)
    console.log('Verifying persistence...');
    const getRes = await fetch(baseUrl);
    const allNotes = await getRes.json();
    const persistedNote = allNotes.find(n => n.id === note.id);

    if (persistedNote.title === 'Updated Title') {
        console.log('SUCCESS: Note saved correctly.');
    } else {
        console.error('FAILED: Note did not save correctly.', persistedNote);
    }
}

testSave();
