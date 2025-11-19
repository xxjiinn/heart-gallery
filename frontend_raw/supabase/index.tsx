import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Upload heart memory
app.post('/make-server-c90918de/memories', async (c) => {
  try {
    const { imageData, message } = await c.req.json();

    if (!imageData || !message) {
      console.log('Missing imageData or message');
      return c.json({ error: 'Image and message are required' }, 400);
    }

    // Store memory with base64 image data directly in KV store
    const memoryId = `memory:${Date.now()}`;
    const memory = {
      id: memoryId,
      imageUrl: imageData, // Store base64 directly
      message,
      createdAt: Date.now(),
    };

    await kv.set(memoryId, memory);
    console.log(`Memory saved: ${memoryId}`);

    return c.json(memory);
  } catch (error) {
    console.error('Error creating memory:', error);
    return c.json({ error: `Failed to create memory: ${error.message}` }, 500);
  }
});

// Get all memories
app.get('/make-server-c90918de/memories', async (c) => {
  try {
    console.log('Fetching memories...');
    const memories = await kv.getByPrefix('memory:');
    
    // Sort by createdAt descending
    const sortedMemories = memories.sort((a, b) => b.createdAt - a.createdAt);
    
    console.log(`Found ${sortedMemories.length} memories`);
    return c.json(sortedMemories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    return c.json({ error: `Failed to fetch memories: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);