// Tableau Public API 프록시 · 공개 API만 사용 · 인증 없음
const BASE = 'https://public.tableau.com';

async function get(path) {
  const r = await fetch(BASE + path, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`upstream ${r.status}`);
  return r.json();
}

export default async (req) => {
  const url = new URL(req.url);
  const action = url.searchParams.get('action') || 'profile';
  const user = (url.searchParams.get('user') || '.83057946').replace(/[^\w.\-]/g, '');
  const json = (d) =>
    new Response(JSON.stringify(d), {
      headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*',
                 'cache-control': 'public, max-age=300' },
    });

  try {
    if (action === 'profile') {
      const p = await get(`/profile/api/${user}`);
      return json({
        name: p.name, title: p.title, org: p.organization, bio: p.bio,
        followers: p.totalNumberOfFollowers, following: p.totalNumberOfFollowing,
        vizCount: p.visibleWorkbookCount, since: p.createdAt,
      });
    }
    if (action === 'workbooks') {
      const n = Math.min(Number(url.searchParams.get('count') || 8), 24);
      const d = await get(`/public/apis/workbooks?profileName=${user}&count=${n}&start=0&visibility=NON_HIDDEN`);
      return json({
        items: (d.contents || []).map((w) => ({
          title: w.title, views: w.viewCount, favorites: w.numberOfFavorites,
          repo: w.workbookRepoUrl, sheet: w.defaultViewName,
          url: `${BASE}/app/profile/${user}/viz/${w.workbookRepoUrl}/${w.defaultViewName}`,
        })),
      });
    }
    return json({ error: 'unknown action' });
  } catch (e) {
    return json({ error: String(e.message || e) });
  }
};

export const config = { path: '/api/tpublic' };
