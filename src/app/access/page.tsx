import MainLayout from "@/components/layout/MainLayout";
import Image from "next/image";
import ImageSlider from "@/components/ui/ImageSlider";

export default function AccessPage() {
  // 施設写真データ
  const facilityImages = [
    {
      src: "/images/facility/studio1.jpg",
      alt: "スタジオA（ピアノ・声楽）",
      caption: "スタジオA（ピアノ・声楽）",
      blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnnGMbYjjMVvbxXF3cNvkVmCIgHWTsk9e+KCaf5P0UpQH/9k="
    },
    {
      src: "/images/facility/studio2.jpg",
      alt: "スタジオB（弦楽器・管楽器）",
      caption: "スタジオB（弦楽器・管楽器）",
      blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnnGMbYjjMVvbxXF3cNvkVmCIgHWTsk9e+KCaf5P0UpQH/9k="
    },
    {
      src: "/images/facility/lounge.jpg",
      alt: "待合スペース",
      caption: "待合スペース",
      blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnnGMbYjjMVvbxXF3cNvkVmCIgHWTsk9e+KCaf5P0UpQH/9k="
    },
    {
      src: "/images/facility/classroom.jpg",
      alt: "レッスンルーム",
      caption: "レッスンルーム",
      blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQIGAwAAAAAAAAAAAAABAgMABAUGERIhQVFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnnGMbYjjMVvbxXF3cNvkVmCIgHWTsk9e+KCaf5P0UpQH/9k="
    }
  ];

  return (
    <MainLayout>
      <div className="content-sections">
        <section id="access" className="content-section">
          <div className="section-inner">
            <h2>ACCESS</h2>
            
            <div className="access-content">
              <div className="access-info">
                <h3>アクセス情報</h3>
                <div className="info-block">
                  <dl>
                    <dt>住所</dt>
                    <dd>
                      〒150-0002<br />
                      東京都渋谷区渋谷3-1-1<br />
                      ミュージックビル5階
                    </dd>
                    
                    <dt>最寄り駅</dt>
                    <dd>渋谷駅 徒歩5分（JR・東京メトロ・東急・京王）</dd>
                    
                    <dt>営業時間</dt>
                    <dd>
                      平日: 10:00 - 21:00<br />
                      土日祝: 10:00 - 18:00
                    </dd>
                    
                    <dt>定休日</dt>
                    <dd>毎週月曜日、年末年始</dd>
                    
                    <dt>お問い合わせ</dt>
                    <dd>
                      TEL: 03-1234-5678<br />
                      Email: info@music-school.com
                    </dd>
                  </dl>
                </div>
              </div>
              
              <div className="access-map">
                <h3>アクセスマップ</h3>
                <div className="map-container">
                  {/* Google Mapsを埋め込む（実際の実装時に追加） */}
                  <div className="map-placeholder">
                    <p>Google Mapsが表示されます</p>
                    <p className="note">（実際の実装時にAPIキーを設定）</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="access-directions">
              <h3>アクセス方法</h3>
              <div className="directions-content">
                <div className="direction-item">
                  <h4>JR渋谷駅から</h4>
                  <p>ハチ公口を出て、スクランブル交差点を渡り、〇〇通りを直進。2つ目の交差点を右折し、100mほど進むとミュージックビルがあります。</p>
                </div>
                
                <div className="direction-item">
                  <h4>東京メトロ渋谷駅から</h4>
                  <p>A3出口を出て、〇〇通りを直進。1つ目の交差点を左折し、200mほど進むとミュージックビルがあります。</p>
                </div>
                
                <div className="direction-item">
                  <h4>お車でお越しの場合</h4>
                  <p>近隣のコインパーキングをご利用ください。当施設には専用駐車場はございません。</p>
                </div>
              </div>
            </div>
            
            <div className="access-gallery">
              <h3>施設写真</h3>
              <ImageSlider 
                images={facilityImages} 
                autoPlay={true}
                interval={6000}
                showControls={true}
                showDots={true}
              />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
