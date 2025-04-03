import MainLayout from "@/components/layout/MainLayout";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import { LazyImage } from "@/components/ui/LazyImage";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout>
      {/* ファーストビューのロゴセクション */}
      <div className="first-view">
        <div className="main-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,40 C30,10 40,50 60,20 C80,50 90,10 100,40" stroke="black" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <h1 className="logo-title">MUSIC SCHOOL</h1>
        </div>
        {/* スクロールインジケーター */}
        <ScrollIndicator />
      </div>

      <div className="content-sections">
        {/* ストーリーセクション */}
        <section id="story" className="content-section">
          <div className="section-inner">
            <h2 className="section-title">私たちのストーリー</h2>
            
            <div className="story-container">
              <div className="story-image-main">
                <Image 
                  src="/images/story/piano-passion.jpg" 
                  alt="ピアノを弾く手のクローズアップ" 
                  width={800} 
                  height={533}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <div className="story-text">
                <h3 className="story-subtitle">音楽の喜びを伝えたい</h3>
                <p>
                  私たちの音楽教室は、2010年に創設者の佐藤美和子が「音楽の喜びをもっと多くの人に」という思いから始まりました。プロのピアニストとして活動する中で、技術だけを教える従来の教育に疑問を感じ、<strong>音楽を楽しむ心</strong>を大切にした教室を作りたいと考えたのです。
                </p>
                
                <div className="story-image-side">
                  <Image 
                    src="/images/story/piano-child.jpg" 
                    alt="ピアノを楽しむ子ども" 
                    width={400} 
                    height={267}
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <p>
                  当教室では、一人ひとりの個性や目標に合わせたカリキュラムを提供しています。初心者の方には基礎からじっくりと、経験者の方にはさらなる技術向上と表現力を磨くレッスンを行っています。何より大切にしているのは、<strong>音楽を通じた自己表現の喜び</strong>を感じていただくことです。
                </p>
                
                <h3 className="story-subtitle">音楽は人生を豊かにする</h3>
                <p>
                  ピアノを弾くことは、単に指を動かす技術ではありません。感情を表現し、物語を紡ぎ、時には自分自身と向き合う時間でもあります。私たちは生徒さん一人ひとりが、音楽を通じて<strong>心の豊かさ</strong>を育み、人生の喜びや悲しみをより深く感じられるようになることを願っています。
                </p>
                
                <div className="story-image-side right">
                  <Image 
                    src="/images/story/piano-teacher.jpg" 
                    alt="ピアノを教える講師" 
                    width={400} 
                    height={267}
                    className="rounded-lg shadow-md"
                  />
                </div>
                
                <p>
                  講師陣は、国内外の音楽大学を卒業した演奏家や教育者で構成されています。技術指導はもちろん、音楽の歴史や理論、そして何より<strong>音楽を愛する心</strong>を伝えることを大切にしています。年齢や経験を問わず、音楽を通じて新たな自分と出会える場所—それが私たちの教室です。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
