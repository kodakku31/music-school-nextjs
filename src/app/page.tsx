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
            
            <div className="story-container">
              <div className="story-text">
                <h3 className="story-subtitle">音楽の喜びを一生の宝物に</h3>
                <p>
                  音楽スペースHoihoiでは、「ピアノを弾く技術」だけでなく「音楽を心から楽しむ力」を育てます。ゆみ先生が大切にしているのは、お子さまが「ピアノが好き」という気持ちを持ち続けられる環境づくり。幼い頃に「練習しなさい」と言われて仕方なく取り組む経験が、後に「ピアノ嫌い」につながることをご存知ですか？
                </p>
                
                <div className="story-image-main">
                  <Image 
                    src="/images/story/piano-passion.jpg" 
                    alt="ピアノを弾く手のクローズアップ" 
                    width={800} 
                    height={533}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <p>
                  当教室では、基礎をしっかり身につける「受け身のレッスン」と、「弾きたい曲」に挑戦する「主体的なレッスン」をバランスよく組み合わせています。お子さまが「この曲をこんな風に弾きたい！」と思った時こそ、自ら練習に向かう最高の瞬間です。
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
                  楽譜が読めるようになる速さも、指の上達も、それぞれのお子さまで異なります。比較するのではなく、その子自身の変化に目を向け、温かく見守ることが大切です。まずは音楽を「聴く耳」と「感じる心」を育て、それから読譜力や技術を高めていく—この順序が、生涯にわたって音楽を楽しめる秘訣です。
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
                  ピアノを通じて、お子さまの中に眠る音楽の才能と感性を一緒に育んでいきませんか？音楽スペースHoihoiは、お子さま一人ひとりの個性と成長を大切にする教室です。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
