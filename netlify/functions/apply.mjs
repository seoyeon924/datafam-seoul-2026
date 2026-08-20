import { getStore } from '@netlify/blobs';

const TOKEN_CHARS = 'abcdefghijkmnpqrstuvwxyz23456789';
function makeToken() {
  let t = '';
  for (let i = 0; i < 12; i++) t += TOKEN_CHARS[Math.floor(Math.random() * TOKEN_CHARS.length)];
  return t;
}

export default async (req) => {
  const url = new URL(req.url);

  // 다운로드 페이지에서 토큰 확인
  if (req.method === 'GET') {
    const t = (url.searchParams.get('t') || '').replace(/[^a-z0-9]/g, '');
    const json = (d, s = 200) =>
      new Response(JSON.stringify(d), { status: s, headers: { 'content-type': 'application/json' } });
    if (!t) return json({ ok: false }, 400);
    const store = getStore('apply');
    const found = await store.get('token/' + t);
    return json({ ok: !!found });
  }

  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const fd = await req.formData();
  if (fd.get('bot-field')) return Response.redirect(new URL('/apply.html', req.url), 303);

  const entry = {
    review: (fd.get('후기') || '').toString().trim(),
    role: (fd.get('직무') || '').toString().trim(),
    company: (fd.get('회사') || '').toString().trim(),
    consent: fd.get('동의') === 'on',
    at: new Date().toISOString(),
  };

  if (!entry.review || !entry.role || !entry.company || !entry.consent)
    return Response.redirect(new URL('/apply.html?e=1', req.url), 303);

  const token = makeToken();
  const store = getStore('apply');
  const key = entry.at.replace(/[:.]/g, '-') + '-' + token;
  await store.setJSON('entry/' + key, { ...entry, token });
  await store.setJSON('token/' + token, { at: entry.at });

  return Response.redirect(new URL('/kit.html?t=' + token, req.url), 303);
};

export const config = { path: '/api/apply' };
