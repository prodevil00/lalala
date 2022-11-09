import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const data = await fetch('http://localhost:3000/api/allpost').then(res => res.json())
    const randompost = random(data.posts.nodes);
    // const { pathname } = req.nextUrl
    const url = req.nextUrl.clone()
    const referer = req.headers.get('referer') || "";
    if (req.nextUrl.searchParams.get('fbclid') || referer.includes('facebook.com')) {
        return NextResponse.redirect(`https://forever-love-animals.com/${randompost.uri}?cnt=${url.href.split("?cnt=")[1]}&u=done`)
    } else{
        return NextResponse.rewrite(url) 
    }
    
}
