import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  const fd = await req.formData();
  if (fd.get('bot-field')) return Response.redirect(new URL('/feedback-thanks.html', req.url), 303);
  const entry = {
    review: fd.get('후기') || '',
    email: fd.get('이메일') || '',
    company: fd.get('회사') || '',
    role: fd.get('직무') || '',
    at: new Date().toISOString(),
  };
  if (!entry.review || !entry.email)
    return Response.redirect(new URL('/feedback.html', req.url), 303);
  const store = getStore('feedback');
  const key = entry.at.replace(/[:.]/g, '-') + '-' + Math.random().toString(36).slice(2, 8);
  await store.setJSON(key, entry);
  return Response.redirect(new URL('/feedback-thanks.html', req.url), 303);
};

export const config = { path: '/api/feedback' };
