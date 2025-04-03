import { NextResponse } from 'next/server';
import axios from 'axios';
import Parser from 'rss-parser';

export async function GET() {
  try {
    const blogUrl = 'https://ameblo.jp/yamayumiji/rss.html';
    const response = await axios.get(blogUrl);
    const parser = new Parser();
    const feed = await parser.parseString(response.data);
    
    // 最新5件の記事を返す
    return NextResponse.json(feed.items.slice(0, 5));
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました', error);
    return NextResponse.json(
      { error: 'ブログ記事の取得に失敗しました' },
      { status: 500 }
    );
  }
}
