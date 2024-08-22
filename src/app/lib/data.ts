// // 使ってない
// import { unstable_noStore as noStore } from 'next/cache';
// import { sql } from '@vercel/postgres';

// export async function fetchTodos() {
//   // Add noStore() here to prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   noStore();

//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql`SELECT * FROM TODOS`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }