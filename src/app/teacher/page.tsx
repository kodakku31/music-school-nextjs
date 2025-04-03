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
      role: 'チェロ講師',
      profile: '国立音楽大学チェロ科卒業。ヨーロッパでの研修経験を持ち、オーケストラでの演奏活動も行う。温かく丁寧な指導で初心者にも安心。',
      education: [
        '国立音楽大学チェロ科卒業',
        'プラハ音楽アカデミー研修'
      ],
      awards: [
        '日本クラシック音楽コンクール入賞（2019年）',
        '国際チェロコンクール特別賞（2017年）'
      ],
      experience: '指導歴：8年',
      speciality: '専門：クラシックチェロ、室内楽',
      courses: ['チェロ入門コース', 'チェロ基礎コース', 'チェロ専門コース', 'アンサンブルコース'],
      schedule: '月・水・土 13:00〜20:00、日 10:00〜17:00',
      skills: {
        classical: 90,
        jazz: 70,
        pop: 75,
        teaching: 95,
        theory: 85
      },
      message: 'チェロの豊かな音色と表現力を一緒に探求しましょう。音楽を通じて感性を磨き、心を豊かにする時間を大切にしています。',
      longBio: '5歳からチェロを始め、国立音楽大学を首席で卒業後、プラハで研鑽を積む。帰国後は国内オーケストラでの演奏活動と並行して後進の指導にあたる。特に初心者への指導に定評があり、楽器の持ち方から音色作りまで丁寧に指導。チェロの魅力を伝えることに情熱を持ち、生徒一人ひとりの個性を大切にした指導を心がけている。',
      performances: [
        'N響定期演奏会出演（2022年）',
        '室内楽リサイタル（2021年）',
        '国際音楽祭出演（2020年）'
      ],
      image: '/images/teacher3.jpg',
      gallery: [
        '/images/teacher3-gallery1.jpg',
        '/images/teacher3-gallery2.jpg',
        '/images/teacher3-gallery3.jpg'
      ],
      slug: 'sato-misaki'
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
                      width={800}
                      height={450}
                      style={{ objectFit: 'cover' }}
                    />
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
                        <h4>レッスン可能時間</h4>
                        <p>{teacher.schedule}</p>
                      </div>
                      
                      <div className="detail-item">
                        <h4>メッセージ</h4>
                        <p>{teacher.message}</p>
                      </div>
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
