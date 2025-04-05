"use client";

import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// アコーディオンコンポーネント
const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button 
        className={`accordion-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default function LessonPage() {
  return (
    <MainLayout>
      <div className="content-sections lesson-page">
        <section id="lesson-intro" className="content-section">
          <div className="section-inner">
            <h2>LESSON</h2>
            <div className="lesson-intro">
              <h3>音楽スペースHoihoi コース案内</h3>
              <p>
                音楽スペースHoihoiでは、お子さまの年齢や目的に合わせた多彩なコースをご用意しております。音楽の楽しさを感じながら、豊かな感性と創造力を育むレッスンを行っています。
              </p>
            </div>
          </div>
        </section>

        <section id="lesson-courses" className="content-section">
          <div className="section-inner">
            <h3 className="section-title">コース一覧</h3>
            
            <div className="lesson-list">
              <article className="lesson-item">
                <div className="lesson-image">
                  <Image 
                    src="/images/piano.jpg" 
                    alt="ピアノコース"
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">ピアノコース</h3>
                  <div className="lesson-description">
                    <p>対象年齢: 3歳～</p>
                    <p>お月謝: ¥4,400/月2回、¥6,600/月3回</p>
                    <p>レッスン時間: 30分間</p>
                    <p>担当講師: 山本ゆみ・友永恭子・山本小梅</p>
                  </div>
                  
                  <Accordion title="コース詳細を見る">
                    <div className="lesson-features">
                      <p>初心者の方やお子様のピアノとの出会いを大切に、一人一人の生徒さんの気持ち、心に寄り添った指導を心掛けています。</p>
                      <p>ピアノはとても美しい響きを奏でてくれる楽器です！ワクワクするリズムや豊かなハーモニーで自分の大好きな世界を表現することができます。個性あふれる自分のイメージを大切にしながら一歩一歩基礎を学び、感性豊かな演奏を目指して一緒に楽しくレッスンをしていきましょう！</p>
                      <p>ソルフェージュを取り入れたレッスンを行います。楽譜を読み書きする力、音楽を楽しむための基礎力をまずは身につけることが大切です。読譜ができるようになれば、いくらでも自分の好きな曲が弾けるようになります。とってもステキなことですね。</p>
                      <p>１人１人が持っている、音楽を表現したい気持ちを大切にしています。豊かな感性を養いましょう。そして、弾きたい意欲。それが何より大事です。「ピアノの練習しなさい！」と言われて弾くのではなく、弾きたいから弾く！それが本来自然なことです。音楽ってそういうものです。</p>
                      <p>一生涯の喜びや楽しみの一つとして、ピアノと付き合っていけますように・・そんな願いを込めてレッスンしています。</p>
                      <div className="lesson-links">
                        <Link href="/blog?tag=piano" className="lesson-link">♪ピアノレッスン風景記事一覧はこちら♪</Link>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </article>

              <article className="lesson-item">
                <div className="lesson-image">
                  <Image 
                    src="/images/piano-intro.jpg" 
                    alt="リトミックを取り入れたピアノ導入コース"
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">リトミックを取り入れたピアノ導入コース</h3>
                  <div className="lesson-description">
                    <p>対象年齢: 3歳児～就学前のお子さま</p>
                    <p>お月謝: ¥4,400/月2回（土曜日のみ）、¥6,600/月3回</p>
                    <p>レッスン時間: 40分間（25分間のリトミックグループレッスン+15分間のピアノ個人レッスン）</p>
                    <p>定員: 4名</p>
                  </div>
                  
                  <Accordion title="コース詳細を見る">
                    <div className="lesson-features">
                      <p>リトミックを通してリズム感や音感を養いながら、実際に鍵盤にも触れ、少しづつピアノの導入も進めていきます。リトミックを取り入れたリズム遊びやソルフェージュはお友だちと楽しく触れ合いながら、少人数のグループレッスンにて行います。</p>
                      <p>ピアノレッスンは生徒様の個性に合わせて、きめ細かく指導する個人レッスンにて行います。</p>
                      <div className="lesson-links">
                        <Link href="/blog?tag=rhythmic-piano" className="lesson-link">♪園児さんのリトミックレッスン記事一覧はこちら♪</Link>
                        <Link href="/contact?course=rhythmic-piano" className="lesson-link">♪リトミックを取り入れたピアノ導入コース体験レッスンのお申し込みはこちらから♪</Link>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </article>

              <article className="lesson-item">
                <div className="lesson-image">
                  <Image 
                    src="/images/rhythmic.jpg" 
                    alt="リトミッククラス"
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">リトミッククラス</h3>
                  <div className="lesson-description">
                    <p>対象年齢: 1歳児～</p>
                    <p>レッスン時間: 50分間</p>
                    <p>お月謝:</p>
                    <ul>
                      <li>step1: ¥3,000/月2回</li>
                      <li>step2: ¥4,500/月3回</li>
                      <li>年少クラス: ¥3,500/月2回</li>
                      <li>年中クラス: ¥3,500/月2回</li>
                      <li>年長クラス: ¥3,500/月2回</li>
                      <li>小学生クラス: ¥2,000/1レッスン</li>
                    </ul>
                    <p className="plan-note">※step1,2クラスのみ別途チャイルド会費660円</p>
                    <p className="plan-note">※小学生クラスはピアノコースと併用の場合¥1,500/1レッスン</p>
                  </div>
                  
                  <Accordion title="リトミックについて詳しく見る">
                    <div className="lesson-features">
                      <h4>リトミックってなあに？</h4>
                      <p>リトミックは、スイスの作曲家、音楽教育家であるエミール・ジャック＝ダルクローズ（1865～1950）が考案した"心と身体を育む教育法"です。</p>
                      <p>音楽やリズムに合わせて身体運動をすることによって、音楽を聴く力、リズム感などの音楽的能力や表現力を養うだけでなく、想像力や創造性、注意力、集中力、思考力などを引き出す音楽教育です。</p>
                      <p>子どもたちにとってはあくまでも"♪楽しい音楽遊び♪"。音楽の楽しさを身体いっぱいで味わいながら、子どもたちの持っているあらゆる能力を引き出すための教育です。これから受けるであろうあらゆる教育を充分に吸収し、それらを足がかりに大きく育つための基礎造りのお手伝いをさせていただきます。</p>
                      <div className="lesson-links">
                        <Link href="/blog?tag=rhythmic" className="lesson-link">♪リトミックレッスン風景記事一覧はこちら♪</Link>
                        <Link href="/contact?course=rhythmic" className="lesson-link">♪リトミックコース体験レッスンのお申し込みはこちらから♪</Link>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </article>

              <article className="lesson-item">
                <div className="lesson-image">
                  <Image 
                    src="/images/rhythmic-individual.jpg" 
                    alt="リトミック個人レッスン"
                    width={800}
                    height={450}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">リトミック個人レッスン</h3>
                  <div className="lesson-description">
                    <p>お月謝:</p>
                    <ul>
                      <li>ワンレッスン（30分）: ¥2,800</li>
                      <li>月2回（30分）: ¥5,000</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        
        <section id="trial-form" className="content-section">
          <div className="section-inner">
            <h3 className="section-title">体験レッスン申し込み</h3>
            
            <div className="trial-form-container">
              <p className="trial-form-intro">
                各コースの体験レッスンを受け付けております。以下のフォームからお申し込みください。
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
                    <option value="piano">ピアノコース</option>
                    <option value="rhythmic-piano">リトミックを取り入れたピアノ導入コース</option>
                    <option value="rhythmic">リトミッククラス</option>
                    <option value="rhythmic-individual">リトミック個人レッスン</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="child_age">お子様の年齢</label>
                    <input type="text" id="child_age" name="child_age" placeholder="例：3歳5ヶ月" />
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
