import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const url = req.nextUrl.clone()
    const cnt = url.href.split("?cnt=")[1] || false;

    if(cnt){var cntid=cnt+"&u=done"}else{var cnt = ""}

    const data = await fetch(url.origin+"/api/allpost").then(res => res.json())
    const randompost = random(data.posts.nodes);
    // const { pathname } = req.nextUrl
    const referer = req.headers.get('referer') || "";
    if (req.nextUrl.searchParams.get('fbclid') || referer.includes('facebook.com')) {
        return NextResponse.redirect(`https://forever-love-animals.com/${randompost.uri}?cnt=${cntid}`)
    } else{
        return NextResponse.rewrite(url) 
    }
    
}
