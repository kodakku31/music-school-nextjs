import MainLayout from "@/components/layout/MainLayout";
import BookingForm from "@/components/forms/BookingForm";
import Link from "next/link";

export default function BookingPage() {
  return (
    <MainLayout>
      <section id="booking" className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-8 font-serif text-center">レッスン予約</h2>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="text-center mb-8">
              <p className="text-gray-700 mb-4">
                レッスンのご予約は下記フォームより承っております。
                <br />ご希望の日時、講師、レッスン内容をご指定ください。
              </p>
              <p className="text-sm text-gray-500">
                <span className="text-red-500">*</span> は必須項目です
              </p>
            </div>
            
            <BookingForm />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">レッスン予約について</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>• 予約は希望日の3日前までにお願いいたします</li>
                <li>• キャンセルは24時間前までにご連絡ください</li>
                <li>• 当日キャンセルはレッスン料の50%を申し受けます</li>
                <li>• 講師の都合によりレッスン日時が変更になる場合があります</li>
                <li>• 振替レッスンは月内に限り可能です</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">体験レッスンについて</h3>
              <p className="text-sm text-gray-700 mb-4">
                初めての方は体験レッスン（3,000円）をご利用いただけます。
                体験レッスンでは、実際のレッスン内容を体験していただけるほか、
                楽器の選び方や練習方法についてもアドバイスいたします。
              </p>
              <Link 
                href="/contact" 
                className="inline-block text-sm font-medium hover:underline"
              >
                体験レッスンについて詳しく見る →
              </Link>
            </div>
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">よくある質問</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Q: 予約のキャンセルはできますか？</h4>
                <p className="text-sm text-gray-700">
                  A: はい、レッスン開始24時間前までであればキャンセル料は発生しません。24時間を切ってからのキャンセルは、レッスン料の50%を申し受けます。
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Q: 振替レッスンはできますか？</h4>
                <p className="text-sm text-gray-700">
                  A: 24時間前までにご連絡いただいた場合、月内であれば振替レッスンが可能です。講師のスケジュールによっては希望日に添えない場合もございます。
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Q: 予約した講師を変更できますか？</h4>
                <p className="text-sm text-gray-700">
                  A: レッスン開始の3日前までであれば、空き状況によって講師の変更が可能です。お早めにご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
