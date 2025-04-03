import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function LessonPage() {
  // レッスンデータ
  const lessons = [
    {
      id: 1,
      title: 'ピアノレッスン',
      description: 'クラシックから現代音楽まで、幅広いジャンルに対応したピアノレッスンです。初心者から上級者まで、一人ひとりのレベルに合わせた指導を行います。',
      features: [
        '基礎的な演奏技術の習得',
        '音楽理論の学習',
        '様々な時代・スタイルの楽曲演奏',
        '即興演奏・作曲の基礎',
      ],
      plans: [
        { name: '入門コース', frequency: '月2回', duration: '30分/回', price: '8,000円/月' },
        { name: '基礎コース', frequency: '週1回', duration: '45分/回', price: '12,000円/月' },
        { name: '専門コース', frequency: '週1回', duration: '60分/回', price: '16,000円/月' },
      ],
      schedule: '火・水・金 14:00〜21:00、土・日 10:00〜18:00',
      teachers: ['山田 花子', '佐藤 美咲'],
      image: '/images/piano.jpg',
      courseImage: '/images/course-piano.jpg',
    },
    {
      id: 2,
      title: 'バイオリンレッスン',
      description: '正しい姿勢と基礎から丁寧に指導します。音色の美しさを追求し、表現力豊かな演奏を目指します。',
      features: [
        '正しい姿勢と持ち方',
        'ボーイングの基本テクニック',
        '音程とイントネーションの習得',
        'アンサンブル演奏の経験',
      ],
      plans: [
        { name: '入門コース', frequency: '月2回', duration: '30分/回', price: '9,000円/月' },
        { name: '基礎コース', frequency: '週1回', duration: '45分/回', price: '15,000円/月' },
        { name: '専門コース', frequency: '週1回', duration: '60分/回', price: '20,000円/月' },
      ],
      schedule: '月・木・金 15:00〜20:00、土 10:00〜18:00',
      teachers: ['鈴木 一郎', '田中 誠'],
      image: '/images/violin.jpg',
      courseImage: '/images/course-violin.jpg',
    }
  ];

  return (
    <MainLayout>
      <div className="content-sections lesson-page">
        <section id="lesson-intro" className="content-section">
          <div className="section-inner">
            <h2>LESSON</h2>
            <div className="lesson-intro">
              <p>
                当音楽教室では、一人ひとりの目標や個性に合わせたレッスンを提供しています。
                初心者から上級者まで、幅広いレベルに対応し、音楽の楽しさを体験していただけます。
                経験豊かな講師陣が丁寧に指導いたしますので、安心してレッスンを受けていただけます。
              </p>
            </div>
          </div>
        </section>

        <section id="lesson-courses" className="content-section">
          <div className="section-inner">
            <h3 className="section-title">コース一覧</h3>
            
            <div className="lesson-list">
              {lessons.map((lesson) => (
                <article key={lesson.id} className="lesson-item">
                  <div className="lesson-image">
                    <Image 
                      src={lesson.image} 
                      alt={lesson.title}
                      width={800}
                      height={450}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="lesson-content">
                    <h3 className="lesson-title">{lesson.title}</h3>
                    <div className="lesson-description">
                      <p>{lesson.description}</p>
                    </div>
                    <div className="lesson-features">
                      <h4>レッスン内容</h4>
                      <ul>
                        {lesson.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="lesson-plans">
                      <h4>料金プラン</h4>
                      <div className="plan-cards">
                        {lesson.plans.map((plan, index) => (
                          <div key={index} className="plan-card">
                            <div className="plan-name">{plan.name}</div>
                            <div className="plan-details">
                              <div className="plan-frequency">{plan.frequency}</div>
                              <div className="plan-duration">{plan.duration}</div>
                            </div>
                            <div className="plan-price">{plan.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lesson-schedule">
                      <h4>レッスン可能時間</h4>
                      <p>{lesson.schedule}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        <section id="lesson-info" className="content-section">
          <div className="section-inner">
            <h3 className="section-title">レッスンについて</h3>
            
            <div className="lesson-info">
              <h4>レッスンの流れ</h4>
              <ol className="lesson-flow">
                <li>
                  <span className="flow-number">1</span>
                  <div className="flow-content">
                    <h5>体験レッスン</h5>
                    <p>まずは体験レッスン（3,000円/回）で、レッスンの雰囲気や講師との相性を確認していただけます。</p>
                  </div>
                </li>
                <li>
                  <span className="flow-number">2</span>
                  <div className="flow-content">
                    <h5>入会手続き</h5>
                    <p>体験レッスン後、入会をご希望の場合は入会金（10,000円）と初月のレッスン料をお支払いいただきます。</p>
                  </div>
                </li>
                <li>
                  <span className="flow-number">3</span>
                  <div className="flow-content">
                    <h5>レッスン開始</h5>
                    <p>ご希望のコースとスケジュールに合わせて、定期的なレッスンを開始します。</p>
                  </div>
                </li>
                <li>
                  <span className="flow-number">4</span>
                  <div className="flow-content">
                    <h5>発表会・イベント</h5>
                    <p>年2回の発表会や季節のイベントに参加できます（参加は任意です）。</p>
                  </div>
                </li>
              </ol>
              
              <h4>注意事項</h4>
              <ul className="lesson-notes">
                <li>レッスンのキャンセルは、前日までにご連絡ください。当日キャンセルの場合は振替レッスンができない場合があります。</li>
                <li>月謝は毎月27日までに翌月分をお支払いください。</li>
                <li>長期休会をご希望の場合は、1ヶ月前までにご連絡ください。</li>
                <li>楽器の貸し出しも行っておりますので、お気軽にご相談ください（一部有料）。</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section id="trial-form" className="content-section">
          <div className="section-inner">
            <h3 className="section-title">体験レッスン申し込み</h3>
            
            <div className="trial-form-container">
              <p className="trial-form-intro">
                体験レッスンは3,000円で受け付けております。以下のフォームからお申し込みください。
                担当者より折り返しご連絡いたします。
              </p>
              
              <form className="trial-form">
                <div className="form-group">
                  <label htmlFor="name">お名前 <span className="required-mark">*</span></label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">メールアドレス <span className="required-mark">*</span></label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">電話番号 <span className="required-mark">*</span></label>
                    <input type="tel" id="phone" name="phone" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="course">希望コース <span className="required-mark">*</span></label>
                  <select id="course" name="course" required>
                    <option value="">選択してください</option>
                    {lessons.map((lesson) => (
                      <option key={lesson.id} value={lesson.title}>{lesson.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="experience">経験レベル</label>
                    <select id="experience" name="experience">
                      <option value="beginner">初心者</option>
                      <option value="intermediate">中級者</option>
                      <option value="advanced">上級者</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="preferred_date">希望日時</label>
                    <input type="text" id="preferred_date" name="preferred_date" placeholder="例：平日夕方、土曜午前中など" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">メッセージ（質問・ご要望など）</label>
                  <textarea id="message" name="message" rows={4}></textarea>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">申し込む</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
