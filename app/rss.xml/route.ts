import { NextResponse } from 'next/server';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://peka-vibecoding.vercel.app').replace(/\/$/, '');
  const siteName = 'PEKA - Ethical Hacker & Security Researcher';
  const siteDescription = '윤리적 해커 PEKA의 포트폴리오 사이트. 보안 연구, 취약점 분석, 버그 바운티 활동을 소개합니다.';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>${escapeXml(siteName)}</title>
      <link>${baseUrl}</link>
      <description>${escapeXml(siteDescription)}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}</guid>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

