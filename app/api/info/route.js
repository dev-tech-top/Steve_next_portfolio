import { NextResponse } from 'next/server';
import { Client } from 'pg';

const connectionString = process.env.NEON_DATABASE_URL; // Set this in your .env file

export async function POST(req) {
    // Parse visitor info from request body (sent by frontend)
    const clientInfo = await req.json();
    // Parse additional info from request headers
    const headers = req.headers;
    const ip = headers.get('x-forwarded-for')?.split(',')[0] || headers.get('x-real-ip') || 'unknown';
    const userAgent = headers.get('user-agent') || clientInfo.userAgent || 'unknown';
    const timestamp = new Date().toISOString();
    // Combine all info
    const visitorInfo = {
        ...clientInfo,
        ip,
        userAgent,
        serverTimestamp: timestamp
    };
    // Log the combined info to the server console
    console.log('Visitor Info (POST /api/info):', visitorInfo);
    // You can also store this info in a file or database here if needed

    // Connect to Neon and insert visitor info
    const client = new Client({ connectionString });
    try {
        await client.connect();
        await client.query(
            `CREATE TABLE IF NOT EXISTS visitor_info (
                id SERIAL PRIMARY KEY,
                ip TEXT,
                user_agent TEXT,
                language TEXT,
                platform TEXT,
                client_timestamp TEXT,
                server_timestamp TEXT
            );`
        );
        await client.query(
            `INSERT INTO visitor_info (ip, user_agent, language, platform, client_timestamp, server_timestamp)
             VALUES ($1, $2, $3, $4, $5, $6);`,
            [
                visitorInfo.ip,
                visitorInfo.userAgent,
                visitorInfo.language || null,
                visitorInfo.platform || null,
                visitorInfo.timestamp || null,
                visitorInfo.serverTimestamp
            ]
        );
        await client.end();
        return NextResponse.json({ status: 'ok', saved: visitorInfo });
    } catch (err) {
        console.error('Failed to save visitor info to Neon:', err);
        await client.end();
        return NextResponse.json({ status: 'error', error: err.message });
    }
}

export async function GET(req) {
    // Optionally, allow GET to return a message or status
    const client = new Client({ connectionString });
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM visitor_info ORDER BY id DESC LIMIT 100;');
        await client.end();
        return NextResponse.json({ status: 'ok', visitors: result.rows });
    } catch (err) {
        console.error('Failed to fetch visitor info from Neon:', err);
        await client.end();
        return NextResponse.json({ status: 'error', error: err.message });
    }
}
