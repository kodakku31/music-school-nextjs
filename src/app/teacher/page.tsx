import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function TeacherPage() {
  // 講師データ
  const teachers = [
    {
      id: 1,
      name: '山田 花子',
      role: 'ピアノ講師',
      profile: '東京音楽大学ピアノ科卒業。国内外のコンクールで受賞経験を持つ。10年以上の指導経験があり、子どもから大人まで幅広い年齢層の生徒を指導。',
      education: [
        '東京音楽大学ピアノ科卒業',
        'ウィーン国立音楽大学マスタークラス修了'
      ],
      awards: [
        '全日本ピアノコンクール第3位（2018年）',
        '国際ショパンコンクール入賞（2015年）'
      ],
      experience: '指導歴：10年',
      speciality: '専門：クラシックピアノ、ジャズピアノ',
      courses: ['ピアノ入門コース', 'ピアノ基礎コース', 'ピアノ専門コース', 'ジャズピアノコース'],
      schedule: '火・水・金 14:00〜21:00、土・日 10:00〜18:00',
      skills: {
        classical: 95,
        jazz: 80,
        pop: 75,
        teaching: 90,
        theory: 85
      },
      message: '音楽の楽しさを一緒に発見しましょう。技術だけでなく、音楽を通じて表現する喜びを伝えたいと思っています。',
      longBio: '幼少期よりピアノを始め、10代で数々のコンクールに入賞。東京音楽大学ピアノ科を首席で卒業後、ウィーン国立音楽大学でさらに研鑽を積む。帰国後は演奏活動と並行して後進の指導にあたり、多くの生徒をコンクールや音楽大学への進学へと導いてきました。クラシックを中心に、ジャズやポピュラー音楽まで幅広いジャンルに対応し、生徒一人ひとりの個性や目標に合わせた指導を心がけています。',
      performances: [
        '東京オペラシティコンサートホール リサイタル（2022年）',
        'サントリーホール室内楽シリーズ出演（2021年）',
        '日本フィルハーモニー管弦楽団と共演（2019年）'
      ],
      image: '/images/teacher1.jpg',
      gallery: [
        '/images/teacher1-gallery1.jpg',
        '/images/teacher1-gallery2.jpg',
        '/images/teacher1-gallery3.jpg'
      ],
      slug: 'yamada-hanako'
    },
    {
      id: 2,
      name: '鈴木 一郎',
      role: 'バイオリン講師',
      profile: '桐朋学園大学音楽学部卒業。ヨーロッパで研鑽を積み、帰国後は演奏活動と並行して後進の指導にあたる。丁寧でわかりやすい指導が好評。',
      education: [
        '桐朋学園大学音楽学部弦楽科卒業',
        'ベルリン芸術大学研究科修了'
      ],
      awards: [
        '日本音楽コンクール第2位（2016年）',
        'パガニーニ国際コンクール入選（2014年）'
      ],
      experience: '指導歴：15年',
      speciality: '専門：クラシックバイオリン、室内楽',
      courses: ['バイオリン入門コース', 'バイオリン基礎コース', 'バイオリン専門コース', '室内楽コース'],
      schedule: '月・木・金 15:00〜20:00、土 10:00〜18:00',
      skills: {
        classical: 98,
        jazz: 60,
        pop: 70,
        teaching: 95,
        theory: 90
      },
      message: '基礎をしっかり身につけることで、どんな曲も自由に表現できるようになります。一緒に音楽の世界を広げていきましょう。',
      longBio: '4歳からバイオリンを始め、桐朋学園大学を経てベルリン芸術大学で研鑽を積む。ヨーロッパ各地でのリサイタルや室内楽の経験を持ち、帰国後は国内オーケストラとの共演や独奏会を行いながら、後進の指導にも力を入れている。特に基礎技術の習得に重点を置いた指導は、初心者から上級者まで幅広い生徒から支持されている。クラシック音楽の素晴らしさを伝えることをモットーに、音楽を通じて豊かな感性を育む指導を心がけている。',
      performances: [
        'サントリーホール リサイタル（2023年）',
        '東京交響楽団と共演（2022年）',
        'カルテット・コンサートツアー（2020年）'
      ],
      image: '/images/teacher2.jpg',
      gallery: [
        '/images/teacher2-gallery1.jpg',
        '/images/teacher2-gallery2.jpg',
        '/images/teacher2-gallery3.jpg'
      ],
      slug: 'suzuki-ichiro'
    },
    {
      id: 3,
      name: '佐藤 美咲',
      role: 'ボーカル講師',
      profile: '洗足学園音楽大学声楽科卒業。様々なジャンルの歌唱法に精通し、発声から表現力まで総合的に指導。プロのボーカリストとしても活躍中。',
      education: [
        '洗足学園音楽大学声楽科卒業',
        'ニューヨーク・ボーカルアカデミー修了'
      ],
      awards: [
        '日本ジャズボーカルコンテスト優勝（2019年）',
        'アジアシンガーコンペティション入賞（2017年）'
      ],
      experience: '指導歴：8年',
      speciality: '専門：ポップスボーカル、ジャズボーカル、声楽',
      courses: ['ボーカル入門コース', 'ボーカル基礎コース', 'ボーカル専門コース', 'ジャズボーカルコース'],
      schedule: '月・水・木 16:00〜21:00、土・日 11:00〜19:00',
      skills: {
        classical: 70,
        jazz: 95,
        pop: 90,
        teaching: 85,
        theory: 75
      },
      message: '歌は自分自身を表現する素晴らしい手段です。正しい発声法を身につけて、あなたの声の可能性を広げましょう。',
      longBio: '幼少期から合唱団で歌い、高校時代にジャズに魅了される。洗足学園音楽大学声楽科卒業後、ニューヨークに渡り、様々なスタイルの歌唱法を学ぶ。帰国後はジャズクラブやコンサートホールでの演奏活動を行いながら、ボーカル指導者としてのキャリアをスタート。クラシックの発声法をベースに、ジャズやポップスなど様々なジャンルに対応した指導を行っている。特に表現力と個性を引き出す指導には定評があり、プロを目指す生徒も多数指導している。',
      performances: [
        'ブルーノート東京 ライブ（2024年）',
        '全国ジャズフェスティバル出演（2023年）',
        'アルバム「Voice of Heart」リリース（2022年）'
      ],
      image: '/images/teacher3.jpg',
      gallery: [
        '/images/teacher3-gallery1.jpg',
        '/images/teacher3-gallery2.jpg',
        '/images/teacher3-gallery3.jpg'
      ],
      slug: 'sato-misaki'
    },
    {
      id: 4,
      name: '田中 誠',
      role: 'ギター講師',
      profile: '国内外のギターコンクールで入賞経験あり。クラシックからポップス、ジャズまで幅広いジャンルを演奏。初心者にも分かりやすい指導が特徴。',
      education: [
        '東京芸術大学音楽学部器楽科卒業',
        'スペイン・マドリッド王立音楽院留学'
      ],
      awards: [
        '日本ギターコンクール優勝（2017年）',
        'アジアギターフェスティバル金賞（2015年）'
      ],
      experience: '指導歴：12年',
      speciality: '専門：クラシックギター、アコースティックギター、エレキギター',
      courses: ['ギター入門コース', 'ギター基礎コース', 'ギター専門コース', 'バンド演奏コース'],
      schedule: '火・木・金 15:00〜21:00、土 10:00〜17:00',
      skills: {
        classical: 90,
        jazz: 85,
        pop: 95,
        teaching: 90,
        theory: 80
      },
      message: 'ギターは一生の友達になる楽器です。初心者の方も経験者の方も、それぞれのペースで楽しく上達できるようサポートします。',
      longBio: '10歳でギターを始め、クラシックギターからロック、ジャズまで幅広いジャンルを学ぶ。東京芸術大学卒業後、スペインに留学しフラメンコギターも習得。帰国後はソロ活動やバンド活動を行いながら、後進の指導にあたる。初心者からプロ志望の生徒まで、一人ひとりの目標に合わせた指導を行っている。特に、楽しみながら上達できる独自のメソッドには定評があり、挫折せずに続けられる指導を心がけている。また、作曲や編曲の指導も行い、創造性を育む教育にも力を入れている。',
      performances: [
        '全国ギターフェスティバル出演（2023年）',
        'ソロアルバム「Strings of Heart」リリース（2022年）',
        '日本ツアー「Guitar Journey」（2021年）'
      ],
      image: '/images/teacher4.jpg',
      gallery: [
        '/images/teacher4-gallery1.jpg',
        '/images/teacher4-gallery2.jpg',
        '/images/teacher4-gallery3.jpg'
      ],
      slug: 'tanaka-makoto'
    }
  ];

  return (
    <MainLayout>
      <div className="content-sections teacher-page">
        <section id="teacher-intro" className="content-section">
          <div className="section-inner">
            <h2>TEACHER</h2>
            <div className="teacher-intro">
              <p>
                当音楽教室の講師陣は、音楽大学出身のプロフェッショナルです。
                演奏活動と指導経験を持ち、一人ひとりの目標や個性に合わせたレッスンを提供します。
                初心者から上級者まで、丁寧な指導で音楽の楽しさを伝えます。
              </p>
            </div>
          </div>
        </section>
        
        <section id="teacher-list" className="content-section">
          <div className="section-inner">
            <div className="teacher-list">
              {teachers.map((teacher) => (
                <article key={teacher.id} className="teacher-item">
                  <div className="teacher-image">
                    <Image 
                      src={teacher.image} 
                      alt={teacher.name}
                      width={300}
                      height={400}
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="teacher-quick-info">
                      <div className="teacher-name">{teacher.name}</div>
                      <div className="teacher-role">{teacher.role}</div>
                    </div>
                  </div>
                  
                  <div className="teacher-content">
                    <div className="teacher-header">
                      <h3 className="teacher-name">{teacher.name}</h3>
                      <div className="teacher-role">{teacher.role}</div>
                    </div>
                    
                    <div className="teacher-profile">
                      <p>{teacher.profile}</p>
                    </div>
                    
                    <div className="teacher-details">
                      <div className="detail-item">
                        <h4>経歴</h4>
                        <ul>
                          {teacher.education.map((edu, index) => (
                            <li key={index}>{edu}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="detail-item">
                        <h4>受賞歴</h4>
                        <ul>
                          {teacher.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="detail-item">
                        <h4>専門分野</h4>
                        <p>{teacher.speciality}</p>
                      </div>
                      
                      <div className="detail-item">
                        <h4>担当コース</h4>
                        <div className="course-tags">
                          {teacher.courses.map((course, index) => (
                            <span key={index} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <h4>レッスン可能時間</h4>
                        <p>{teacher.schedule}</p>
                      </div>
                    </div>
                    
                    <div className="teacher-skills">
                      <h4>スキルレベル</h4>
                      <div className="skill-bars">
                        <div className="skill-bar">
                          <div className="skill-name">クラシック</div>
                          <div className="skill-level">
                            <div className="skill-fill" style={{ width: `${teacher.skills.classical}%` }}></div>
                          </div>
                          <div className="skill-percent">{teacher.skills.classical}%</div>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-name">ジャズ</div>
                          <div className="skill-level">
                            <div className="skill-fill" style={{ width: `${teacher.skills.jazz}%` }}></div>
                          </div>
                          <div className="skill-percent">{teacher.skills.jazz}%</div>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-name">ポップス</div>
                          <div className="skill-level">
                            <div className="skill-fill" style={{ width: `${teacher.skills.pop}%` }}></div>
                          </div>
                          <div className="skill-percent">{teacher.skills.pop}%</div>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-name">指導力</div>
                          <div className="skill-level">
                            <div className="skill-fill" style={{ width: `${teacher.skills.teaching}%` }}></div>
                          </div>
                          <div className="skill-percent">{teacher.skills.teaching}%</div>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-name">音楽理論</div>
                          <div className="skill-level">
                            <div className="skill-fill" style={{ width: `${teacher.skills.theory}%` }}></div>
                          </div>
                          <div className="skill-percent">{teacher.skills.theory}%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="teacher-message">
                      <h4>メッセージ</h4>
                      <p>{teacher.message}</p>
                    </div>
                    
                    <div className="teacher-actions">
                      <Link 
                        href={`/teacher/${teacher.slug}`} 
                        className="btn btn-primary"
                      >
                        詳細プロフィール
                      </Link>
                      <a href="#" className="btn btn-secondary">レッスン予約</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
