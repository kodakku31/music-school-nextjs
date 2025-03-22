'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// バリデーションスキーマ
const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  contactType: z.enum(['general', 'lesson', 'trial', 'pricing', 'other'], {
    errorMap: () => ({ message: '問い合わせ種別を選択してください' }),
  }),
  preferredContact: z.enum(['email', 'phone', 'any'], {
    errorMap: () => ({ message: '希望連絡方法を選択してください' }),
  }),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
  policy: z.literal<boolean>(true, {
    errorMap: () => ({ message: 'プライバシーポリシーに同意する必要があります' }),
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      contactType: 'general',
      preferredContact: 'email',
      subject: '',
      message: '',
      policy: false as false, 
    },
    mode: 'onChange',
  });

  const contactType = watch('contactType');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = formStep === 0 
      ? ['name', 'email', 'phone', 'contactType', 'preferredContact']
      : ['subject', 'message', 'policy'];
    
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
      setFormStep(step => step + 1);
    }
  };

  const prevStep = () => {
    setFormStep(step => step - 1);
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      if (file) {
        formData.append('attachment', file);
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'お問い合わせの送信に失敗しました');
      }
      
      setIsSubmitted(true);
      reset();
      setFile(null);
      setFormStep(0);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('送信エラー:', err);
      setError(err instanceof Error ? err.message : '送信中にエラーが発生しました。後ほど再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubjectPlaceholder = () => {
    switch (contactType) {
      case 'lesson':
        return 'レッスンについての質問';
      case 'trial':
        return '体験レッスンの申し込み';
      case 'pricing':
        return '料金プランについて';
      case 'other':
        return 'その他のお問い合わせ';
      default:
        return '一般的なお問い合わせ';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-lg mb-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-3">お問い合わせありがとうございます</h3>
            <p className="mb-4">メッセージを受け付けました。担当者より折り返しご連絡いたします。</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              新しいお問い合わせ
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[0, 1].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 ${step < formStep ? 'text-green-600' : step === formStep ? 'text-black' : 'text-gray-400'}`}
                  >
                    <div className="relative flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          step < formStep
                            ? 'bg-green-100 border-green-600'
                            : step === formStep
                            ? 'bg-gray-100 border-black'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {step < formStep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span>{step + 1}</span>
                        )}
                      </div>
                      {step < 1 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            step < formStep ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        ></div>
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm font-medium">
                        {step === 0 ? '基本情報' : 'メッセージ'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                  {error}
                </div>
              )}
              
              {formStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="山田 花子"
                        {...register('name')}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="example@email.com"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      電話番号
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                      placeholder="03-1234-5678"
                      {...register('phone')}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      問い合わせ種別 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { value: 'general', label: '一般的なお問い合わせ' },
                        { value: 'lesson', label: 'レッスンについて' },
                        { value: 'trial', label: '体験レッスン申し込み' },
                        { value: 'pricing', label: '料金プランについて' },
                        { value: 'other', label: 'その他' },
                      ].map((option) => (
                        <div key={option.value} className="relative">
                          <input
                            type="radio"
                            id={`contactType-${option.value}`}
                            value={option.value}
                            className="peer sr-only"
                            {...register('contactType')}
                          />
                          <label
                            htmlFor={`contactType-${option.value}`}
                            className="flex p-3 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-2 peer-checked:ring-black peer-checked:border-transparent"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.contactType && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactType.message}</p>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      希望連絡方法 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'email', label: 'メール' },
                        { value: 'phone', label: '電話' },
                        { value: 'any', label: 'どちらでも可' },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            id={`preferredContact-${option.value}`}
                            value={option.value}
                            className="w-4 h-4 text-black focus:ring-black border-gray-300"
                            {...register('preferredContact')}
                          />
                          <label
                            htmlFor={`preferredContact-${option.value}`}
                            className="ml-2 block text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.preferredContact && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredContact.message}</p>
                    )}
                  </div>
                </motion.div>
              )}
              
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      件名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder={getSubjectPlaceholder()}
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      メッセージ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:outline-none ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="お問い合わせ内容をご記入ください"
                      {...register('message')}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      添付ファイル（任意）
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {file ? (
                          <div>
                            <p className="text-sm text-gray-700 mb-2">
                              {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </p>
                            <button
                              type="button"
                              onClick={removeFile}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              削除
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none"
                              >
                                <span>ファイルをアップロード</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileChange}
                                  ref={fileInputRef}
                                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />
                              </label>
                              <p className="pl-1">またはドラッグ＆ドロップ</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PDF, Word, JPG, PNG (最大 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="policy"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-black"
                        {...register('policy')}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="policy" className="font-medium text-gray-700">
                        プライバシーポリシーに同意します <span className="text-red-500">*</span>
                      </label>
                      {errors.policy && (
                        <p className="mt-1 text-sm text-red-600">{errors.policy.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="flex justify-between mt-8">
                {formStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    戻る
                  </button>
                )}
                
                {formStep === 0 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    次へ
                  </button>
                )}
                
                {formStep === 1 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-auto px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? '送信中...' : '送信する'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
