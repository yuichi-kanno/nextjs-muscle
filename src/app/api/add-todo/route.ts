// // 使ってない
// import { sql } from '@vercel/postgres';
// import { NextResponse } from 'next/server';
 
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');
//   const text = searchParams.get('text');
//   const isCompletedParam = searchParams.get('isCompleted');
 
//   try {
//     if (!id || !text) throw new Error('Pet and owner names required');

//     const isCompleted = isCompletedParam === 'true';
//     await sql`INSERT INTO TODOS (ID, TEXT, isCompleted) VALUES (${id}, ${text}, ${isCompleted});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
 
//   const pets = await sql`SELECT * FROM TODOS;`;
//   return NextResponse.json({ pets }, { status: 200 });
// }
