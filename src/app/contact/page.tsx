import MainLayout from "@/components/layout/MainLayout";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="content-sections">
        <section id="contact" className="content-section">
          <div className="section-inner">
            <h2>CONTACT</h2>
            
            <div className="contact-intro">
              <p>
                音楽教室へのお問い合わせは、下記フォームよりお気軽にご連絡ください。
                <br />体験レッスンのお申し込みも受け付けております。
              </p>
              <p className="required-note">
                <span className="required-mark">*</span> は必須項目です
              </p>
            </div>
            
            <div className="contact-form-container">
              <ContactForm />
            </div>
            
            <div className="contact-info">
              <div className="contact-info-item">
                <h3>お電話でのお問い合わせ</h3>
                <p className="contact-description">
                  お電話でのお問い合わせも受け付けております。
                </p>
                <p className="contact-tel">03-1234-5678</p>
                <p className="contact-hours">
                  受付時間: 平日 10:00〜18:00
                </p>
              </div>
              
              <div className="contact-info-item">
                <h3>メールでのお問い合わせ</h3>
                <p className="contact-description">
                  以下のメールアドレスでも直接お問い合わせいただけます。
                </p>
                <p className="contact-email">info@music-school.com</p>
                <p className="contact-hours">
                  24時間受付・お返事は営業時間内となります
                </p>
              </div>
            </div>
            
            <div className="faq-section">
              <h3>よくあるご質問</h3>
              <div className="faq-list">
                <div className="faq-item">
                  <h4>Q: 体験レッスンはありますか？</h4>
                  <div className="faq-answer">
                    <p>
                      A: はい、初回は3,000円で体験レッスンをご利用いただけます。お気軽にお申し込みください。
                    </p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <h4>Q: 楽器は持参する必要がありますか？</h4>
                  <div className="faq-answer">
                    <p>
                      A: ピアノレッスンは教室のピアノをご利用いただけます。その他の楽器は基本的にご持参いただきますが、一部レンタルも可能です。
                    </p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <h4>Q: 何歳から受講できますか？</h4>
                  <div className="faq-answer">
                    <p>
                      A: 4歳からのお子様から大人の方まで、幅広い年齢の方が受講されています。年齢に合わせたカリキュラムをご用意しています。
                    </p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <h4>Q: レッスンの振替はできますか？</h4>
                  <div className="faq-answer">
                    <p>
                      A: 前日までにご連絡いただければ、月内で1回まで振替レッスンが可能です。空き状況によりご希望に添えない場合もございます。
                    </p>
                  </div>
                </div>
                
                <div className="faq-item">
                  <h4>Q: 発表会はありますか？</h4>
                  <div className="faq-answer">
                    <p>
                      A: 年に2回（春と冬）に発表会を開催しています。参加は任意ですが、目標を持って練習する良い機会となりますので、ぜひご参加ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
