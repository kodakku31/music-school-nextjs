import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// サンプルブログデータ
const blogPosts = [
  {
    id: 1,
    title: 'ピアノ初心者が最初に覚えるべき基本テクニック',
    excerpt: 'ピアノを始めたばかりの方に向けて、最初に習得すべき基本的なテクニックと練習方法を解説します。正しい姿勢や指の動かし方など、上達のためのポイントをご紹介。',
    content: `
      # ピアノ初心者が最初に覚えるべき基本テクニック

      ピアノを始めたばかりの方にとって、最初の一歩は非常に重要です。正しい基礎を身につけることで、その後の上達が格段に早くなります。この記事では、ピアノ初心者が最初に習得すべき基本的なテクニックと練習方法を解説します。

      ## 正しい姿勢

      ピアノを弾く際の姿勢は非常に重要です。背筋を伸ばし、肩の力を抜いた状態で座りましょう。椅子の高さは、肘が鍵盤と同じ高さになるように調整します。足はしっかりと床につけ、安定した姿勢を保ちましょう。

      ## 指の形と動かし方

      ピアノを弾く際の指の形は、丸みを帯びた形が理想的です。指先で鍵盤を押さえるようにし、手首や腕に余計な力が入らないように注意しましょう。初めのうちは、各指を独立して動かす練習を行うことが大切です。

      ## 基本的な指のトレーニング

      1. **指のウォームアップ**: 各指を順番に動かす練習から始めましょう。
      2. **ハノン練習**: 初心者向けのハノン練習は、指の独立性を高めるのに効果的です。
      3. **スケール練習**: ハ長調から始めて、徐々に他の調も練習していきましょう。

      ## リズム感を養う

      メトロノームを使った練習は、安定したリズム感を養うのに役立ちます。最初は遅いテンポから始め、徐々に速度を上げていきましょう。

      ## 初心者におすすめの練習曲

      - バイエル：初心者の定番教材で、基礎をしっかり学べます。
      - ブルグミュラー：25の練習曲は、技術と表現力を同時に養えます。
      - バッハ：インベンションは、両手の独立性を高めるのに最適です。

      ## 日々の練習のコツ

      - 短時間でも毎日続けることが大切です。
      - 集中して練習する時間を確保しましょう。
      - 難しい部分は、ゆっくりと丁寧に練習しましょう。
      - 楽しみながら練習することも重要です。

      ピアノは継続的な練習が必要な楽器ですが、正しい方法で練習することで着実に上達していきます。基礎をしっかりと身につけ、音楽を楽しみながら練習を続けていきましょう。
    `,
    date: '2025.03.10',
    author: '山田 花子',
    authorRole: 'ピアノ講師',
    category: 'ピアノ',
    image: '/images/blog-piano.jpg',
    slug: 'piano-basics-for-beginners'
  },
  {
    id: 2,
    title: '音楽理論の基礎知識：初心者向け解説',
    excerpt: '音楽を演奏する上で知っておきたい音楽理論の基礎知識をわかりやすく解説します。音階、和音、リズムなど、音楽の構成要素について学びましょう。',
    content: `
      # 音楽理論の基礎知識：初心者向け解説

      音楽理論は難しそうに感じるかもしれませんが、基本的な概念を理解することで、演奏や作曲の幅が広がります。この記事では、初心者の方でも理解しやすいように、音楽理論の基礎知識をわかりやすく解説します。

      ## 音階（スケール）について

      音階は音楽の基本となる音の並びです。最も基本的なのは「長音階（メジャースケール）」と「短音階（マイナースケール）」です。

      **長音階（ハ長調の例）**: ド・レ・ミ・ファ・ソ・ラ・シ・ド
      **短音階（イ短調の例）**: ラ・シ・ド・レ・ミ・ファ・ソ・ラ

      ## 和音（コード）の基礎

      和音は複数の音を同時に鳴らしたものです。基本的な和音には以下のようなものがあります。

      - **長三和音（メジャーコード）**: 明るい響きの和音
      - **短三和音（マイナーコード）**: 暗めの響きの和音
      - **増三和音（オーギュメントコード）**: 緊張感のある響き
      - **減三和音（ディミニッシュコード）**: 不安定な響き

      ## リズムと拍子

      音楽におけるリズムは、音の長さと強弱のパターンです。拍子は音楽の基本的な単位を示します。

      - **4/4拍子**: 1小節に4拍あり、最も一般的な拍子
      - **3/4拍子**: ワルツなどで使われる3拍子
      - **6/8拍子**: 6つの8分音符で構成される拍子

      ## 音程

      音程は2つの音の間隔を表します。基本的な音程には以下のようなものがあります。

      - **完全1度**: 同じ音
      - **長2度**: 全音1つ分の間隔
      - **長3度**: 全音2つ分の間隔
      - **完全5度**: 全音3つと半音1つ分の間隔
      - **完全8度（オクターブ）**: 同じ音名で高さが異なる音の間隔

      ## 調性（キー）

      調性は音楽の「中心となる音」を示します。例えば、ハ長調はドを中心とした長音階の曲です。調号（♯や♭の数）によって調性が決まります。

      ## 楽譜の読み方

      - **五線**: 音の高さを表す5本の横線
      - **音符**: 音の長さと高さを表す記号
      - **休符**: 音を出さない時間を表す記号
      - **拍子記号**: 1小節あたりの拍数を示す記号

      ## 音楽理論を学ぶメリット

      音楽理論を理解することで、以下のようなメリットがあります。

      1. 楽譜の読み書きがスムーズになる
      2. 曲の構造を理解しやすくなる
      3. 即興演奏やアレンジの幅が広がる
      4. 作曲の基礎が身につく

      音楽理論は一度に全てを理解しようとせず、演奏しながら少しずつ学んでいくことをおすすめします。基礎的な知識を身につけることで、音楽をより深く楽しむことができるようになります。
    `,
    date: '2025.02.25',
    author: '鈴木 一郎',
    authorRole: 'バイオリン講師',
    category: '音楽理論',
    image: '/images/blog-theory.jpg',
    slug: 'music-theory-basics'
  }
];

// 関連記事を取得する関数
function getRelatedPosts(currentSlug: string, category: string) {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  // 記事データを取得
  const post = blogPosts.find(post => post.slug === params.slug);
  
  // 記事が見つからない場合は404ページを表示
  if (!post) {
    notFound();
  }
  
  // 関連記事を取得
  const relatedPosts = getRelatedPosts(post.slug, post.category);
  
  // Markdownコンテンツを段落に分割
  const paragraphs = post.content
    .trim()
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <MainLayout>
      <article className="mb-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-block mb-8 text-sm hover:underline">
            ← ブログ一覧に戻る
          </Link>
          
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>{post.date}</span>
              <span className="mx-2">|</span>
              <span>{post.category}</span>
            </div>
            <h1 className="text-3xl font-medium mb-6">{post.title}</h1>
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 w-full mb-8">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          
          <div className="prose max-w-none">
            {paragraphs.map((paragraph, index) => {
              // 見出しの処理
              if (paragraph.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-medium mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
              } else if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-medium mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
              } else if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-medium mt-5 mb-2">{paragraph.replace('### ', '')}</h3>;
              }
              
              // リストの処理
              else if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map(item => item.replace('- ', ''));
                return (
                  <ul key={index} className="list-disc pl-5 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="mb-1">{item}</li>
                    ))}
                  </ul>
                );
              } else if (paragraph.match(/^\d+\. /)) {
                const items = paragraph.split('\n');
                return (
                  <ol key={index} className="list-decimal pl-5 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="mb-1">{item.replace(/^\d+\. /, '')}</li>
                    ))}
                  </ol>
                );
              }
              
              // 通常の段落
              else {
                return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
              }
            })}
          </div>
          
          {/* シェアボタン */}
          <div className="flex items-center justify-center space-x-4 my-12 border-t border-b border-gray-100 py-6">
            <span className="text-sm text-gray-500">この記事をシェア：</span>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
          </div>
          
          {/* 関連記事 */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-medium mb-6">関連記事</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-medium mb-2 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500">{relatedPost.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </MainLayout>
  );
}
