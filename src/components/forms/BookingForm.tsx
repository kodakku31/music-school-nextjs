import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// バリデーションスキーマ
const bookingSchema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '有効なメールアドレスを入力してください' }),
  phone: z.string().optional(),
  lessonId: z.string().min(1, { message: 'レッスンを選択してください' }),
  teacherId: z.string().min(1, { message: '講師を選択してください' }),
  date: z.string().min(1, { message: '日付を選択してください' }),
  time: z.string().min(1, { message: '時間を選択してください' }),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });
  
  // サンプルデータ
  const lessons = [
    { id: '1', title: 'ピアノレッスン' },
    { id: '2', title: 'バイオリンレッスン' },
    { id: '3', title: 'ギターレッスン' },
    { id: '4', title: 'ボーカルレッスン' },
    { id: '5', title: 'ドラムレッスン' },
  ];
  
  const teachers = [
    { id: '1', name: '山田 花子', lessons: ['1', '4'] },
    { id: '2', name: '鈴木 一郎', lessons: ['2'] },
    { id: '3', name: '田中 誠', lessons: ['3', '5'] },
    { id: '4', name: '佐藤 美咲', lessons: ['1', '4'] },
  ];
  
  // 時間枠
  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00'
  ];
  
  // フォーム送信処理
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // ここでSupabaseなどのバックエンドに送信する処理を実装
      console.log('送信データ:', data);
      
      // 送信成功時の処理
      setIsSuccess(true);
      reset();
      
      // 3秒後に成功メッセージをクリア
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('送信エラー:', err);
      setError('予約の送信中にエラーが発生しました。後でもう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 名前 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      {/* 電話番号 */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          電話番号
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
      
      {/* レッスン */}
      <div>
        <label htmlFor="lessonId" className="block text-sm font-medium text-gray-700 mb-1">
          レッスン <span className="text-red-500">*</span>
        </label>
        <select
          id="lessonId"
          {...register('lessonId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="">レッスンを選択してください</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
        {errors.lessonId && (
          <p className="mt-1 text-sm text-red-600">{errors.lessonId.message}</p>
        )}
      </div>
      
      {/* 講師 */}
      <div>
        <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-1">
          講師 <span className="text-red-500">*</span>
        </label>
        <select
          id="teacherId"
          {...register('teacherId')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="">講師を選択してください</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select>
        {errors.teacherId && (
          <p className="mt-1 text-sm text-red-600">{errors.teacherId.message}</p>
        )}
      </div>
      
      {/* 日付と時間 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            日付 <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            type="date"
            {...register('date')}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            時間 <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            {...register('time')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="">時間を選択してください</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
          )}
        </div>
      </div>
      
      {/* メッセージ */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          メッセージ
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="ご要望やご質問があればご記入ください"
        ></textarea>
      </div>
      
      {/* エラーメッセージ */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* 成功メッセージ */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
          予約リクエストを受け付けました。確認メールをお送りしましたのでご確認ください。
        </div>
      )}
      
      {/* 送信ボタン */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? '送信中...' : '予約を確定する'}
        </button>
      </div>
    </form>
  );
}
