"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Parser from 'rss-parser';
import { motion } from 'framer-motion';

type BlogPost = {
  title: string;
  link: string;
  pubDate: string;
  content?: string;
  contentSnippet?: string;
};

const AmebloFeed = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // APIルートを使用してRSSフィードを取得
        const response = await axios.get('/api/blog-feed');
        setPosts(response.data);
        setError('');
      } catch (error) {
        console.error('ブログ記事の取得に失敗しました', error);
        setError('ブログ記事の取得に失敗しました。しばらくしてから再度お試しください。');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // コンテンツの一部を表示する関数（HTMLタグを除去）
  const getContentSnippet = (content?: string) => {
    if (!content) return '';
    // HTMLタグを除去
    const plainText = content.replace(/<[^>]*>/g, '');
    // 最初の100文字を返す
    return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
  };

  return (
    <section className="ameblo-feed" id="blog">
      <header>
        <h2 className="section-title">BLOG</h2>
        <p className="blog-description">
          <a 
            href="https://ameblo.jp/yamayumiji/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="blog-link"
          >
            Amebloブログ
          </a>
          から最新の記事を表示しています
        </p>
      </header>

      {loading && (
        <div className="blog-loading">
          <p>ブログ記事を読み込み中...</p>
        </div>
      )}

      {error && (
        <div className="blog-error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="blog-no-posts">
          <p>ブログ記事がありません</p>
        </div>
      )}

      <div className="blog-posts">
        {posts.map((post, index) => (
          <motion.div
            key={index}
            className="blog-post"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="post-title">
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {post.title}
              </a>
            </h3>
            <p className="post-date">{formatDate(post.pubDate)}</p>
            {post.contentSnippet && (
              <p className="post-snippet">{getContentSnippet(post.contentSnippet)}</p>
            )}
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="read-more"
            >
              続きを読む &rarr;
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AmebloFeed;
