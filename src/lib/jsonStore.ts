import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Lightweight file-based JSON persistence.
 *
 * The project has no database, so collections are stored as JSON files under
 * a `data/` directory at the project root. This keeps news and feedback
 * durable across requests and restarts without adding a dependency.
 */

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureFile(file: string): Promise<string> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, file);
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
  return filePath;
}

export async function readCollection<T>(file: string): Promise<T[]> {
  const filePath = await ensureFile(file);
  const raw = await fs.readFile(filePath, 'utf-8');
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export async function writeCollection<T>(
  file: string,
  items: T[],
): Promise<void> {
  const filePath = await ensureFile(file);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf-8');
}
