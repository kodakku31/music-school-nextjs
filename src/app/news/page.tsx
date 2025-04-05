'use client';

import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import Pagination from "@/components/ui/Pagination";

// ニュース項目の型定義
interface NewsItem {
  id: number | string;
  date: string;
  title: string;
  link: string;
  isDummy?: boolean;
}

export default function NewsPage() {
  // サンプルニュースデータ
  const newsItems: NewsItem[] = [
    {
      id: 1,
      date: '2025.03.18',
      title: '一部商品 価格改定のお知らせ',
      link: '#',
    },
    {
      id: 2,
      date: '2025.02.17',
      title: '本日より、#9 COLOMBIAが発売です！',
      link: '#',
    },
    {
      id: 3,
      date: '2025.02.17',
      title: '#8 GEISHAブレンドが、本日より発売です！',
      link: '#',
    },
    {
      id: 4,
      date: '2024.12.02',
      title: '年末年始各店営業時間のお知らせ',
      link: '#',
    },
    {
      id: 5,
      date: '2024.11.26',
      title: 'クリスマスブレンドが好評発売中！',
      link: '#',
    },
    {
      id: 6,
      date: '2024.11.13',
      title: '天神店　価格改定のお知らせ',
      link: '#',
    },
    {
      id: 7,
      date: '2024.10.11',
      title: '神田店 価格改定のお知らせ',
      link: '#',
    },
    {
      id: 8,
      date: '2024.09.15',
      title: '新作ブレンド「秋の訪れ」発売開始',
      link: '#',
    },
    {
      id: 9,
      date: '2024.08.20',
      title: '夏季限定メニューは8月末まで！',
      link: '#',
    },
    {
      id: 10,
      date: '2024.07.05',
      title: '渋谷店 リニューアルオープンのお知らせ',
      link: '#',
    },
    {
      id: 11,
      date: '2024.06.10',
      title: '新宿店 臨時休業のお知らせ',
      link: '#',
    },
    {
      id: 12,
      date: '2024.05.22',
      title: '初夏のスペシャルブレンド発売',
      link: '#',
    }
  ];

  // ページネーション関連の状態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  // 現在のページに表示するニュース項目（常に5件表示）
  const getCurrentItems = (): NewsItem[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = newsItems.slice(startIndex, endIndex);
    
    // 5件に満たない場合はダミーアイテムで埋める
    const dummyItems: NewsItem[] = [];
    if (currentItems.length < itemsPerPage) {
      const dummyCount = itemsPerPage - currentItems.length;
      for (let i = 0; i < dummyCount; i++) {
        dummyItems.push({
          id: `dummy-${i}`,
          date: '',
          title: '',
          link: 'javascript:void(0)',
          isDummy: true
        });
      }
    }
    
    return [...currentItems, ...dummyItems];
  };

  // ページ変更ハンドラー
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // ページトップにスクロール
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <MainLayout>
      <div className="content-sections news-page">
        <section id="news" className="content-section">
          <div className="section-inner">
            <div className="simple-news-list">
              {getCurrentItems().map((item) => (
                <a 
                  href={item.link} 
                  key={item.id} 
                  className={`simple-news-item ${item.isDummy ? 'dummy-item' : ''}`}
                  style={{ visibility: item.isDummy ? 'hidden' : 'visible' }}
                >
                  <div className="simple-news-date">{item.date}</div>
                  <div className="simple-news-title">{item.title}</div>
                  <div className="simple-news-divider"></div>
                </a>
              ))}
            </div>
            
            {/* ページネーションコンポーネント */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
