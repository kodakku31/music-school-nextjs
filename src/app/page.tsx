import MainLayout from "@/components/layout/MainLayout";
import ScrollIndicator from "@/components/home/ScrollIndicator";

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
            <h2>STORY</h2>
            <p>
              当音楽教室は、2005年に創業者の山田太郎によって設立されました。山田は若い頃からクラシック音楽に情熱を持ち、東京音楽大学を卒業後、ヨーロッパで10年間研鑽を積みました。帰国後、日本の音楽教育に新しい風を吹き込むべく、この教室を開設しました。
            </p>
            <p>
              私たちは、「音楽を通じて人生を豊かに」という理念のもと、初心者から上級者まで、年齢を問わず、一人ひとりの目標や個性に合わせたレッスンを提供しています。技術だけでなく、音楽の楽しさや感動を伝えることを大切にしています。
            </p>
            <p>
              教室は、最新の設備を整えた防音スタジオを完備し、グランドピアノやアップライトピアノ、電子ピアノ、ドラムセット、ギターアンプなど、様々な楽器を用意しています。また、録音設備も整っており、生徒さんの演奏を録音して上達の過程を確認することもできます。
            </p>
            <p>
              講師陣は、国内外の音楽大学を卒業した一流の演奏家や教育者で構成されており、それぞれの専門分野で高い技術と豊かな経験を持っています。生徒一人ひとりの個性や目標に合わせた指導を心がけ、音楽の技術だけでなく、音楽を愛する心も育てています。
            </p>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
