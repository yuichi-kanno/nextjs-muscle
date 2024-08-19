import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE TODOS (ID SERIAL PRIMARY KEY,
        Text VARCHAR(255),
        isCompleted BOOLEAN DEFAULT FALSE);`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}