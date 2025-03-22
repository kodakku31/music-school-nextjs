import MainLayout from "@/components/layout/MainLayout";

export default function NewsPage() {
  // サンプルニュースデータ
  const newsItems = [
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
    }
  ];

  return (
    <MainLayout>
      <div className="content-sections news-page">
        <section id="news" className="content-section">
          <div className="section-inner">
            <div className="simple-news-list">
              {newsItems.map((item) => (
                <a href={item.link} key={item.id} className="simple-news-item">
                  <div className="simple-news-date">{item.date}</div>
                  <div className="simple-news-title">{item.title}</div>
                  <div className="simple-news-divider"></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
