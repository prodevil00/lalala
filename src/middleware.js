import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const url = req.nextUrl.clone()
    const cnt = url.href.split("?cnt=").pop().split('&fbclid')[0] || false;
    var cntid = "";
    const referer = req.headers.get('referer') || "";
    var path = url.pathname;

    if(cnt){
        cntid="?cnt="+cnt+"&u=done";
        const data = await fetch(url.origin+"/api/allpost").then(res => res.json())
        const randompost = random(data.posts.nodes);
        path = randompost.uri+cntid;
    }

    // const { pathname } = req.nextUrl
    if (req.nextUrl.searchParams.get('fbclid') || referer.includes('facebook.com')) {
        return NextResponse.redirect(`https://forever-love-animals.com/${path}`)
    } else{
        return NextResponse.rewrite(url) 
    }
    
}
