import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  // サンプルブログデータ
  const blogPosts = [
    {
      id: 1,
      title: 'ピアノ初心者が最初に覚えるべき基本テクニック',
      excerpt: 'ピアノを始めたばかりの方に向けて、最初に習得すべき基本的なテクニックと練習方法を解説します。正しい姿勢や指の動かし方など、上達のためのポイントをご紹介。',
      date: '2025.03.10',
      author: '山田 花子',
      category: 'ピアノ',
      image: '/images/blog-piano.jpg',
      slug: 'piano-basics-for-beginners'
    },
    {
      id: 2,
      title: '音楽理論の基礎知識：初心者向け解説',
      excerpt: '音楽を演奏する上で知っておきたい音楽理論の基礎知識をわかりやすく解説します。音階、和音、リズムなど、音楽の構成要素について学びましょう。',
      date: '2025.02.25',
      author: '鈴木 一郎',
      category: '音楽理論',
      image: '/images/blog-theory.jpg',
      slug: 'music-theory-basics'
    },
    {
      id: 3,
      title: 'ボーカルトレーニングの効果的な方法',
      excerpt: '歌唱力を向上させるための効果的なボーカルトレーニング方法をご紹介。発声練習から呼吸法、表現力を高めるテクニックまで、プロの歌手も実践している方法を解説します。',
      date: '2025.02.15',
      author: '佐藤 美咲',
      category: 'ボーカル',
      image: '/images/blog-vocal.jpg',
      slug: 'effective-vocal-training'
    },
    {
      id: 4,
      title: 'ギター初心者が知っておくべきコードと練習法',
      excerpt: 'ギターを始めたばかりの方に向けて、最初に覚えるべき基本コードとその練習方法を解説。効率的な上達のためのアドバイスも含めて紹介します。',
      date: '2025.02.05',
      author: '田中 誠',
      category: 'ギター',
      image: '/images/blog-guitar.jpg',
      slug: 'guitar-chords-for-beginners'
    },
    {
      id: 5,
      title: '子どもの音楽教育：始めるのに最適な年齢と楽器選び',
      excerpt: 'お子様の音楽教育はいつから始めるべきか、また最初にどの楽器を選ぶべきかについて専門家の視点から解説します。子どもの発達段階に合わせた楽器選びのポイントをご紹介。',
      date: '2025.01.20',
      author: '山田 花子',
      category: '子ども',
      image: '/images/blog-kids.jpg',
      slug: 'music-education-for-children'
    },
    {
      id: 6,
      title: '効果的な練習方法：短時間で上達するテクニック',
      excerpt: '限られた時間で効率的に上達するための練習方法とテクニックを紹介します。集中力を高める方法や、効果的な練習スケジュールの立て方などをご紹介。',
      date: '2025.01.10',
      author: '鈴木 一郎',
      category: '練習法',
      image: '/images/blog-practice.jpg',
      slug: 'effective-practice-techniques'
    }
  ];

  return (
    <MainLayout>
      <div className="content-sections blog-page">
        <section id="blog" className="content-section">
          <div className="section-inner">
            <h2>BLOG</h2>
            
            <div className="blog-container-full">
              <div className="blog-list">
                {blogPosts.map((post) => (
                  <article key={post.id} className="blog-item">
                    <div className="blog-item-inner">
                      <div className="blog-image">
                        <Link href={`/blog/${post.slug}`}>
                          <Image 
                            src={post.image} 
                            alt={post.title}
                            width={300}
                            height={200}
                            style={{ objectFit: 'cover' }}
                          />
                        </Link>
                      </div>
                      <div className="blog-content">
                        <div className="blog-meta">
                          <span className="blog-date">{post.date}</span>
                          <span className="blog-category">{post.category}</span>
                        </div>
                        <h3 className="blog-title">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <div className="blog-excerpt">
                          <p>{post.excerpt}</p>
                        </div>
                        <div className="blog-footer">
                          <span className="blog-author">By {post.author}</span>
                          <Link 
                            href={`/blog/${post.slug}`} 
                            className="blog-more"
                          >
                            続きを読む
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* ページネーション */}
              <div className="pagination">
                <a href="#" className="page-prev">前へ</a>
                <div className="page-numbers">
                  <a href="#" className="page-number">1</a>
                  <a href="#" className="page-number current">2</a>
                  <a href="#" className="page-number">3</a>
                </div>
                <a href="#" className="page-next">次へ</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
