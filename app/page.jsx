'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

import { trackEvent } from './analytics';

const images = {
  provenceHero: '/images/provence-hero.png',
  smartHero: '/images/smart-hero.png',
  provenceMain: '/images/provence-main.png',
  smartMain: '/images/smart-main.png',
  // 差し替え用：public/images/ に同名で画像を置くと反映されます
  giftBeef: '/images/gift-beef.png',
  giftTower: '/images/gift-tower.png',
  giftStarbucks: '/images/gift-starbucks.png',
  president: '/images/president.jpg',
};

const youtubeItems = [
  [
    '何十年経っても愛せる、南仏の住まい',
    '本物の素材がつくる心地よい暮らしをご紹介',
    '/images/youtube-provence.jpg',
    'https://youtu.be/sgWQRtHu3s4?si=PAOvXjxYdqrUQTOL',
  ],
  [
    '未来基準のスマートハウス',
    '太陽光・蓄電池・高性能住宅の魅力を徹底解説',
    '/images/youtube-smart.jpg',
    'https://youtu.be/Tr4HoUN_Kdw?si=40-3oxzaaujodDpf',
  ],
 [
  '家づくりで後悔しないために',
  '35年以上家づくりに携わる職人社長が本音で解説',
  '/images/youtube-plan.jpg',
  'https://youtu.be/ieevSo5tTWU?si=fAMczI4BRsLV2vxz',
],
];

const requestOptions = [
  'プロヴァンス見学', 'スマートハウス見学', '２棟まとめて見学',
  'まだ決めてない（資料請求のみ依頼したい）',
];

function ReserveForm({ selectedRequest }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const started = useRef(false);
  const sending = useRef(false);
  const panel = useRef(null);
  const [data, setData] = useState({
    name: '', furigana: '', email: '', phone: '', contactMethod: '', address: '',
    requestType: '', timing: '', statuses: [], area: '', landStatus: '',
    budget: '', gift: '', message: '', privacy: false, preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    if (selectedRequest && requestOptions.includes(selectedRequest.value)) {
      setData(prev => ({ ...prev, requestType: selectedRequest.value }));
      setStep(1);
    }
  }, [selectedRequest]);

  const startTracking = () => {
    if (!started.current) {
      started.current = true;
      trackEvent('reservation_form_start');
    }
  };
  const setField = (key, value) => setData(prev => ({ ...prev, [key]: value }));
  const moveTo = (nextStep) => {
    setError('');
    setStep(nextStep);
    requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const choice = (field, value) => (
    <label key={value} className={'vhChoice ' + (data[field] === value ? 'isSelected' : '')}>
      <input type="radio" name={field} value={value}
        checked={data[field] === value} onChange={() => setField(field, value)}
        required={field === 'requestType'} />
      <span>{value}</span>
    </label>
  );
  const input = (key, label, type, placeholder, autoComplete) => (
    <label className="vhField">
      <span>{label} <b>必須</b></span>
      <input type={type} name={key} value={data[key]} required
        autoComplete={autoComplete} placeholder={placeholder}
        onChange={e => setField(key, e.target.value)} />
    </label>
  );

  const submitForm = async (event) => {
    event.preventDefault();
    if (sending.current) return;
    if (step === 1) {
      if (!data.requestType || ![data.name, data.furigana, data.email, data.phone, data.address].every(value => value.trim())) {
        setError('ご希望の内容と必須項目をご入力ください。');
        return;
      }
      trackEvent('reservation_step_complete', { step_number: 1 });
      moveTo(2);
      return;
    }
    if (!data.timing || !data.landStatus || !data.privacy) {
      setError('ご予定時期・土地の状況を選び、個人情報の取り扱いをご確認ください。');
      return;
    }
    sending.current = true;
    setIsSending(true);
    setError('');
    trackEvent('reservation_submit_attempt');
    const body = new URLSearchParams();
    const entries = {
      'entry.1185507046': data.name.trim(),
      'entry.286628918': data.furigana.trim(),
      'entry.1453514585': data.email.trim(),
      'entry.1236133254': data.phone.trim(),
      'entry.1837995718': data.contactMethod,
      'entry.1025760241': data.address.trim(),
      'entry.1685769336': data.requestType,
      'entry.627008439': data.timing,
      'entry.135116182': data.area,
      'entry.1955319601': data.landStatus,
      'entry.780287589': data.budget,
      'entry.404848345': data.requestType !== requestOptions[3] ? data.gift : '',
      // Keep the existing Google Form schema. Date preferences arrive in the message field.
      'entry.2057376373': [
        data.requestType !== requestOptions[3] && data.preferredDate && '見学希望日：' + data.preferredDate,
        data.requestType !== requestOptions[3] && data.preferredTime && '希望時間帯：' + data.preferredTime,
        data.message,
      ].filter(Boolean).join('\n'),
    };
    Object.entries(entries).forEach(([key, value]) => body.append(key, value));
    data.statuses.forEach(value => body.append('entry.809008481', value));
    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe24qMYgvsVbR4KcUKKwAGV7vjB8FiZIwJTZ0SYJfrSHur1JQ/formResponse', {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      trackEvent('reservation_submit_unverified');
      setSubmitted(true);
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch {
      trackEvent('reservation_submit_error');
      setError('送信できませんでした。入力内容は残っています。再度お試しいただくか、048-584-7779へお電話ください。');
    } finally {
      sending.current = false;
      setIsSending(false);
    }
  };

  const isVisit = data.requestType && data.requestType !== requestOptions[3];
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
  if (submitted) return (
    <div className="vhFormCard vhComplete" ref={panel} role="status">
      <div className="vhCompleteIcon"><Check size={36} /></div>
      <p className="eyebrow">THANK YOU</p>
      <h2>お問い合わせありがとうございます</h2>
      <p>ご希望日時は、担当者との調整後に確定となります。</p>
      <p>担当者より、お電話またはメールでご連絡します。<br />
        連絡がない場合は、お手数ですがお電話でお問い合わせください。</p>
      <a className="outline" href="tel:0485847779">048-584-7779</a>
    </div>
  );

  return (
    <div className="vhFormCard" ref={panel}>
      <div className="vhFormIntro">
        <p className="eyebrow">RESERVATION</p>
        <h2>見学のお申し込み</h2>
        <p>入力は2ステップ。資料請求のみも承ります。</p>
      </div>
      <div className="vhSteps conversionSteps" aria-label={'全2ステップ中の' + step + 'ステップ目'}>
        {[['ご希望・ご連絡先', 1], ['確認・送信', 2]].map(([label, number]) => (
          <div key={number} className={'vhStep ' + (step === number ? 'isCurrent' : step > number ? 'isDone' : '')}>
            <span>{step > number ? <Check size={15} /> : number}</span><small>{label}</small>
          </div>
        ))}
      </div>
      <form className="vhStepForm" onSubmit={submitForm} onChange={startTracking}>
        {step === 1 ? (
          <section className="vhPanel">
            <div className="vhQuestion">
              <h3>まずは、気になる住まいを選択</h3>
              <div className="vhChoices">{requestOptions.map(value => choice('requestType', value))}</div>
            </div>
            {isVisit && <div className="visitPreference">
              <h4>見学のご希望日時 <small>任意・未定でもOK</small></h4>
              <div className="vhFieldGrid">
                <label className="vhField"><span>希望日</span>
                  <input name="preferredDate" type="date" min={today} value={data.preferredDate}
                    onInput={e => setField('preferredDate', e.currentTarget.value)}
                    onChange={e => setField('preferredDate', e.target.value)} />
                </label>
                <label className="vhField"><span>希望時間帯</span>
                  <select value={data.preferredTime} onChange={e => setField('preferredTime', e.target.value)}>
                    <option value="">未定・相談したい</option><option>午前</option><option>午後</option>
                  </select>
                </label>
              </div>
              <p>日時・見学場所は、担当者との調整後にご案内します。</p>
            </div>}
            <h3 className="contactSubheading">ご連絡先</h3>
            <p className="formHint">日時の調整・お問い合わせへの回答に使用します。</p>
            <div className="vhFieldGrid">
              {input('name', 'お名前', 'text', '例）山田 太郎', 'name')}
              {input('furigana', 'ふりがな', 'text', '例）やまだ たろう', 'off')}
              {input('email', 'メールアドレス', 'email', '例）example@gmail.com', 'email')}
              {input('phone', '電話番号', 'tel', '例）090-1234-5678', 'tel')}
              <label className="vhField vhSingle"><span>ご希望のご連絡手段</span>
                <select name="contactMethod" value={data.contactMethod} onChange={e => setField('contactMethod', e.target.value)}>
                  <option value="">選択してください</option><option>電話</option><option>メール</option>
                </select>
              </label>
              {input('address', '現在のお住まい（市区町村まで）', 'text', '例）埼玉県深谷市', 'address-level2')}
            </div>
          </section>
        ) : (
          <section className="vhPanel">
            <div className="vhPanelHead"><h3>あと少しでお申し込み完了です</h3><p>決まっていない項目は「まだ決めていない」をお選びください。</p></div>
            <div className="vhFieldGrid">
              <label className="vhField"><span>家づくりのご予定時期 <b>必須</b></span>
                <select required value={data.timing} onChange={e => setField('timing', e.target.value)}>
                  <option value="">選択してください</option>
                  {['半年以内', '1年以内', '2年以内', '3年以内', 'まだ決めていない'].map(value => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label className="vhField"><span>土地の状況 <b>必須</b></span>
                <select required value={data.landStatus} onChange={e => setField('landStatus', e.target.value)}>
                  <option value="">選択してください</option>
                  {['土地を持っている', '土地を探している', '建て替えを検討している', 'まだ決めていない'].map(value => <option key={value}>{value}</option>)}
                </select>
              </label>
            </div>
            <details className="optionalQuestions">
              <summary>ご相談をスムーズにする追加情報 <small>すべて任意</small></summary>
              <div className="vhQuestion"><h4>現在の家づくり状況（複数選択可）</h4><div className="vhChoices">
                {['情報収集中', '土地を探している', '土地を持っている', '住宅会社を比較している', '具体的な間取りを検討している', '資金計画を相談したい', '住宅ローンを相談したい'].map(value => (
                  <label key={value} className={'vhChoice ' + (data.statuses.includes(value) ? 'isSelected' : '')}>
                    <input type="checkbox" checked={data.statuses.includes(value)} onChange={() => setField('statuses', data.statuses.includes(value) ? data.statuses.filter(item => item !== value) : [...data.statuses, value])} /><span>{value}</span>
                  </label>
                ))}
              </div></div>
              <label className="vhField"><span>建築予定エリア</span><input value={data.area} onChange={e => setField('area', e.target.value)} placeholder="例）深谷市、熊谷市、寄居町周辺" /></label>
              <label className="vhField"><span>建物・土地を含めた総予算</span><select value={data.budget} onChange={e => setField('budget', e.target.value)}>
                <option value="">未選択</option>{['3,000万円〜4,000万円', '4,000万円〜5,000万円', '5,000万円以上', 'まだ決めていない'].map(value => <option key={value}>{value}</option>)}
              </select></label>
            </details>
            {isVisit && <div className="vhQuestion">
              <label className="vhField"><span>ご来場特典（任意）</span>
                <select name="gift" value={data.gift} onChange={e => setField('gift', e.target.value)} aria-describedby="gift-help gift-condition">
                  <option value="">選択してください（任意）</option>
                  {['松阪牛', 'towerカタログギフト', 'スターバックスチケット'].map(value => <option key={value}>{value}</option>)}
                </select>
              </label>
              <p className="formHint" id="gift-help">未選択でもお申し込みいただけます。</p>
              <p className="formHint" id="gift-condition">※ご来場特典は、Viehouseへ初めてご来場いただく方限定です。</p>
            </div>}
            <label className="vhField vhSingle"><span>ご質問・ご相談 <small>任意</small></span><textarea value={data.message} onChange={e => setField('message', e.target.value)} placeholder="見学で確かめたいこと、日時のご相談など、お気軽にどうぞ。" rows={3} /></label>
            <div className="vhSummary">
              {[['ご希望', data.requestType], ['希望日時', isVisit ? [data.preferredDate, data.preferredTime].filter(Boolean).join(' ') || '未定・相談したい' : '資料請求'],
                ['お名前', data.name], ['ふりがな', data.furigana], ['メール', data.email], ['電話番号', data.phone], ['ご希望のご連絡手段', data.contactMethod || '未選択'], ['ご来場特典', isVisit ? data.gift || '未選択' : '対象外（資料請求）'], ['お住まい', data.address]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
            <p className="formHint">入力内容は、お問い合わせへの回答・見学の調整のために使用します。</p>
            <label className="vhPrivacy"><input type="checkbox" required checked={data.privacy} onChange={e => setField('privacy', e.target.checked)} /><span>上記の個人情報の取り扱いに同意します。</span></label>
          </section>
        )}
        {error && <p className="formError" role="alert">{error}</p>}
        <div className="vhActions">
          {step > 1 && <button type="button" className="vhBack" disabled={isSending} onClick={() => moveTo(1)}><ChevronLeft size={18} />内容を修正</button>}
          <button type="submit" className="vhSubmit" disabled={isSending}>
            {isSending ? '送信中…' : step === 1 ? '確認画面へ進む' : 'この内容で申し込む'}<ChevronRight size={18} />
          </button>
        </div>
        <p className="formHint center">{step === 1 ? 'この時点では送信されません。' : '見学日時は、担当者との調整後に確定します。'}</p>
      </form>
    </div>
  );
}

export default function Page() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const selectFromCta = event => {
    const link = event.target instanceof Element ? event.target.closest('a[data-request]') : null;
    if (link) setSelectedRequest({ value: link.dataset.request, nonce: Date.now() });
  };
  return <div className="lp" onClickCapture={selectFromCta}>
    <header className="lpHeader"><a className="lpLogo" href="#top">Viehouse<span>暮らしを、もっと自分らしく。</span></a><a className="lpHeaderCta" href="#reserve">見学予約 <ChevronRight size={15}/></a></header>
    <main>
      <section className="lpHero" id="top">
        <img className="lpHeroImage" src={images.provenceHero} alt="Viehouse プロヴァンスのモデルハウス" fetchPriority="high"/>
        <div className="lpHeroContent"><p className="lpKicker">埼玉のモデルハウス見学</p><h1>写真のつづきを、<br/>この家で。</h1><p className="lpHeroText">素材のぬくもりも、暮らしやすさも。<br/>あなたの「好き」を、見つけに。</p><a className="lpButton" href="#reserve">モデルハウスを見学する <ChevronRight size={18}/></a><a className="lpHeroLink" href="#model">2つの住まいを見る ↓</a></div>
        <span className="lpHeroCaption">La Provence / 自然素材と暮らす家</span>
      </section>
      <div className="lpReassurance"><span>お子様連れOK</span><span>情報収集中でもOK</span><span>見学目安 60〜90分</span></div>
      <section className="lpSection" id="model">
        <div className="lpHeading"><p className="lpKicker">TWO WAYS TO LIVE</p><h2>どちらの暮らしに、<br className="lpMobileBreak"/>心が動く？</h2><p>異なる魅力を持つ、2つのモデルハウス。<br/>気になる1棟からでも、両方の見学でも。</p></div>
        <div className="lpHomes">
          <article className="lpHome"><div className="lpHomePhoto"><img src={images.provenceMain} alt="南仏風のプロヴァンスの住まい" loading="lazy"/><span>01 / LA PROVENCE</span></div><div className="lpHomeBody"><p className="lpKicker">プロヴァンス</p><h3>好きなものと、<br/>歳を重ねる家。</h3><p>漆喰のやわらかな表情。素足に心地よい無垢材。毎日触れる素材を、現地で確かめてください。</p><ul><li>漆喰・無垢材の質感</li><li>南仏風のデザイン</li><li>光の入り方と室内の雰囲気</li></ul><a className="lpHomeCta" href="#reserve" data-request="プロヴァンス見学">プロヴァンスを見学する <ChevronRight size={18}/></a></div></article>
          <article className="lpHome lpHomeSmart"><div className="lpHomePhoto"><img src={images.smartMain} alt="シンプルモダンなスマートハウス" loading="lazy"/><span>02 / SMART HOUSE</span></div><div className="lpHomeBody"><p className="lpKicker">スマートハウス</p><h3>これからの暮らしを、<br/>かしこく、心地よく。</h3><p>太陽光で電気をつくり、蓄電池にためて使う。設備の仕組みも、暮らしの動線も、まとめて見学。</p><ul><li>太陽光・蓄電池の仕組み</li><li>シンプルモダンなデザイン</li><li>間取りと毎日の生活動線</li></ul><a className="lpHomeCta" href="#reserve" data-request="スマートハウス見学">スマートハウスを見学する <ChevronRight size={18}/></a></div></article>
        </div>
        <div className="lpBoth"><div><h3>迷ったら、両方見てみよう。</h3><p>自分たちに合う住まいを、一緒に探せます。</p></div><a className="lpButton" href="#reserve" data-request="２棟まとめて見学">2棟の見学を相談する <ChevronRight size={18}/></a></div>
      </section>
      <section className="lpExperience"><div className="lpExperiencePhoto"><img src={images.provenceHero} alt="実際に見学できるプロヴァンスのモデルハウス" loading="lazy"/></div><div className="lpExperienceBody"><p className="lpKicker">COME & FEEL</p><h2>「わが家なら」を、<br/>想像する時間。</h2><div className="lpPoint"><span>01</span><div><h3>触れてわかる、素材の心地よさ。</h3><p>写真では伝わりきらない、床や壁の質感を体感。</p></div></div><div className="lpPoint"><span>02</span><div><h3>歩いてわかる、暮らしの動線。</h3><p>部屋の広さやキッチンからの見え方をチェック。</p></div></div><div className="lpPoint"><span>03</span><div><h3>話してわかる、家づくりの進め方。</h3><p>土地や予算のことも、決まっていない段階から相談できます。</p></div></div></div></section>
      <section className="lpSection lpVideos" id="youtube"><div className="lpHeading"><p className="lpKicker">BEFORE YOUR VISIT</p><h2>まずは動画で、家の中へ。</h2></div><div className="lpVideoGrid">{youtubeItems.slice(0,2).map(item=><a key={item[3]} className="lpVideo youtubeCard" href={item[3]} target="_blank" rel="noopener noreferrer"><div><img src={item[2]} alt={item[0]} loading="lazy"/><span>▶</span></div><h3>{item[0]} <ChevronRight size={16}/></h3><p>YouTubeでルームツアーを見る</p></a>)}</div></section>
      <section className="lpGift" aria-labelledby="lp-gift-title"><div className="lpGiftCopy"><p className="lpKicker">WEB予約・初回来場限定</p><h2 id="lp-gift-title">見学の楽しみに、<br/>選べる来場特典。</h2><p className="lpGiftPrice">5,000<span>円相当</span></p><p>松阪牛 ／ towerカタログギフト ／<br className="lpMobileBreak"/> スターバックスチケット</p></div><div className="lpGiftImages">{[[images.giftBeef,'松阪牛'],[images.giftTower,'towerカタログギフト'],[images.giftStarbucks,'スターバックスチケット']].map(([src,label])=><div key={src}><img src={src} alt={label} loading="lazy"/></div>)}</div><p className="lpGiftNote">※ご来場特典は、Viehouseへ初めてご来場いただく方限定です。<br/>特典は任意です。未選択でもお申し込みいただけます。</p></section>
      <section className="lpSection lpFaq" id="faq"><div className="lpHeading"><p className="lpKicker">QUESTIONS</p><h2>見学前の気になること。</h2></div>{[
        ['まだ建てるか決めていなくても大丈夫？','はい。情報収集中の方もお気軽にご見学ください。土地探しや予算の相談からでも大丈夫です。'],
        ['子どもと一緒に見学できますか？','お子様連れでもご見学いただけます。ご家族で暮らしをイメージしながらご覧ください。'],
        ['どのくらい時間がかかりますか？','見学の目安は60〜90分です。短時間をご希望の場合は、お申し込み時にご相談ください。'],
        ['見学場所や日時はどう決まりますか？','ご希望のモデルハウスと日時を伺い、担当者が調整します。見学場所の詳細は、その際にご案内します。'],
      ].map(([q,a])=><details key={q}><summary>{q}<span>＋</span></summary><p>{a}</p></details>)}</section>
      <section className="lpReservation" id="reserve"><div className="lpHeading"><p className="lpKicker">YOUR NEXT STEP</p><h2>まずは、見てみませんか。</h2><p>ご希望日時が未定でも大丈夫。<br/>担当者と相談しながら決められます。</p></div><ReserveForm selectedRequest={selectedRequest}/><p className="lpPhone">お電話でのご相談 <a href="tel:0485847779">048-584-7779</a><small>9:00〜19:00 ／ 定休日：不定期</small></p></section>
    </main>
    <footer className="lpFooter"><a className="lpLogo" href="#top">Viehouse</a><p>自分らしい暮らしを、いっしょに。</p><nav><a href="/company">会社案内</a><a href="https://www.youtube.com/@viehouse" target="_blank" rel="noopener noreferrer">YouTube</a><a href="#reserve">見学予約</a></nav><small>© Viehouse</small></footer>
    <div className="lpSticky"><a href="tel:0485847779">電話で相談</a><a href="#reserve">見学を予約する <ChevronRight size={17}/></a></div>
  </div>;
}
