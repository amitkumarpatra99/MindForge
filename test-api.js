// const fetch = require('node-fetch'); // Built-in in Node 18+

async function testBackend() {
    const baseUrl = 'http://localhost:3000/api/notes';

    console.log('1. Creating a new note...');
    const createRes = await fetch(baseUrl, { method: 'POST' });
    const newNote = await createRes.json();
    console.log('Created:', newNote);

    if (!newNote.id) {
        console.error('FAILED: No ID returned');
        return;
    }

    console.log('2. Updating the note with tags and favorite...');
    const updateData = {
        title: 'Test Note',
        content: 'Testing backend',
        tags: ['test', 'backend'],
        isFavorite: true
    };

    const updateRes = await fetch(`${baseUrl}/${newNote.id}`, {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
    });
    const updatedNote = await updateRes.json();
    console.log('Updated:', updatedNote);

    if (!updatedNote.tags || !updatedNote.tags.includes('test') || !updatedNote.isFavorite) {
        console.error('FAILED: Tags or Favorite not saved');
    } else {
        console.log('SUCCESS: Tags and Favorite saved correctly');
    }

    console.log('3. Deleting the note...');
    await fetch(`${baseUrl}/${newNote.id}`, { method: 'DELETE' });
    console.log('Deleted');
}

testBackend();
