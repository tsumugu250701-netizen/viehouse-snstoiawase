'use client';

import { useEffect, useRef, useState } from 'react';
import { Home, Route, Sun, MessageCircle, MapPin, ChevronRight, ChevronLeft, Star, Check } from 'lucide-react';

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

const benefits = [
  [Home, '建物のデザインや\n素材を体感できる'],
  [Route, '間取りや動線を\n実際に確認できる'],
  [Sun, '光熱費や性能の\n仕組みがわかる'],
  [MessageCircle, '家づくりの進め方を\n相談できる'],
  [MapPin, '土地探しのことも\n相談できる'],
];

const comparison = [
  ['デザイン性', '南仏風のデザイン', 'シンプルモダン'],
  ['自然素材', '漆喰・無垢材など', '一部自然素材'],
  ['見学での注目点', '漆喰・無垢材の質感', '太陽光・蓄電池の仕組み'],
  ['暮らしの楽しみ', '素材とともに歳を重ねる', '電気をつくり、ためて使う'],
  ['相談したいこと', '素材やパーツの選び方', '設備と光熱費の考え方'],
  ['現地で確かめる', '光の入り方・素材の肌触り', '住み心地・設備の使い方'],
];

const faqs = [
  'まだ建てるか決めていなくても見学できますか？',
  '子ども連れでも見学できますか？',
  '土地を探している段階でも相談できますか？',
  '両方のモデルハウスを見学できますか？',
  '営業されませんか？',
  '見学の所要時間はどれくらいですか？',
];

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

const voiceItems = [
  [
    'モデルハウスを見て「ここに住みたい」と思えました。',
    'プロヴァンス / 埼玉県 H様',
    'モデルハウスで体感した漆喰や無垢材の心地よさが決め手でした。完成した今も毎日帰るのが楽しみです。',
    '/images/voice1.jpg'
  ],
  [
    '電気代を気にしない暮らしが実現しました。',
    'スマートハウス / 埼玉県 M様',
    '太陽光と蓄電池のおかげで安心感があり、電気代を気にせず快適に暮らせています。',
    '/images/voice2.jpg'
  ],
  [
    '自然素材の温もりに毎日癒されています。',
    'プロヴァンス / 埼玉県 I様',
    '無垢材や漆喰の優しい空間と、家族が自然と集まる間取りがお気に入りです。',
    '/images/voice3.jpg'
  ],
];

function YoutubeCard({ item }) {
  return (
    <a
      className="youtubeCard"
      href={item[3]}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="youtubeImage">
        <img src={item[2]} alt={item[0]} loading="lazy" />
        <span>▶</span>
      </div>

      <h3>{item[0]}</h3>
      <p>{item[1]}</p>
    </a>
  );
}
function VoiceCard({ item }) {
  return (
    <article className="voiceCard">

      <div className="voiceImage">
        <img src={item[3]} alt={item[0]} loading="lazy" />
      </div>

      <div className="voiceContent">

        <div className="stars">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>

        <h3>{item[0]}</h3>

        <p className="voiceMeta">
          {item[1]}
        </p>

        <p className="voiceText">
          {item[2]}
        </p>

      </div>

    </article>
  );
}


function Header() {
  return (
    <header className="header">
      <div className="container nav">
        <a className="logo" href="/#top">Viehouse</a>
        <nav>
          <a href="/#top">モデルハウス</a>
          <a href="/#youtube">YouTube</a>
          <a href="/#voice">お客様の声</a>
          <a href="/#model">家づくりのこだわり</a>
          <a href="/company">会社案内</a>
        </nav>
        <a className="navCta" href="/#reserve">来場予約する</a>
      </div>
    </header>
  );
}

function HeroPanel({type,title,text,img,theme}){return <article className={`heroPanel ${theme}`}><img src={img} alt={title}/><div className="heroShade"/><div className="heroPanelText"><p>{type}</p><h2>{title}</h2><span>{text}</span><a href="#reserve" data-request={title === "プロヴァンス" ? "プロヴァンス見学" : "スマートハウス見学"}>この住まいを見学する <ChevronRight size={16}/></a></div></article>}
function SectionTitle({eyebrow,title,text}){return <div className="sectionTitle"><p>{eyebrow}</p><h2>{title}</h2>{text&&<span>{text}</span>}</div>}
function Gift(){return <section className="giftBlock"><div><p className="eyebrow">WEB予約限定</p><h2>5,000<span>円相当</span></h2><h3>選べる来場特典プレゼント！</h3><p>松阪牛・towerカタログギフト・スターバックスチケットからお選びいただけます。</p><p className="formHint">※ご来場特典は、Viehouseへ初めてご来場いただく方限定です。</p></div><div className="giftCards"><article><img src={images.giftBeef} alt="松阪牛の来場特典イメージ" loading="lazy"/><b>松阪牛</b></article><article><img src={images.giftTower} alt="towerカタログギフトのイメージ" loading="lazy"/><b>tower<br/>カタログギフト</b></article><article><img src={images.giftStarbucks} alt="スターバックスチケットのイメージ" loading="lazy"/><b>スターバックス<br/>チケット</b></article></div></section>}

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
        <h2>見学のご希望をお聞かせください</h2>
        <p>情報収集の段階でも、お子様連れでも。<br />見学先を迷っている方は、2棟まとめてご相談いただけます。</p>
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
  return (
    <div onClickCapture={selectFromCta}>
      <Header />
      <main>
        <section className="hero" id="top">
          <div className="heroCopy">
  <p>埼玉で、自分たちらしい家づくりを。</p>

  <h1 className="heroTitle">
  <span>好きな雰囲気も、暮らしやすさも。</span>
  <span>2つの住まいで確かめよう。</span>
</h1>

<p className="heroSub">
  プロヴァンスとスマートハウス
  <br className="spOnly" />
  のモデルハウスを比較見学。<br />写真では分からない素材の質感や、間取りの広がりを体感できます。
</p>

<a href="#reserve" className="mainCta">
  <span>情報収集の段階でもお気軽に</span>
  <span>見学を申し込む <ChevronRight size={18} /></span>
</a>
<p className="heroReassurance">お子様連れOK ／ 見学目安60〜90分<br />WEB予約限定・選べる5,000円相当の来場特典</p>
<p className="formHint">※ご来場特典は、Viehouseへ初めてご来場いただく方限定です。</p>
</div>

  <div className="heroGrid">
    <HeroPanel
      theme="gold"
      type="PROVENCE"
      title="プロヴァンス"
      text="南仏のやさしい時間が流れる、自然素材の心地よい暮らし。"
      img={images.provenceHero}
    />

    <HeroPanel
      theme="blue"
      type="SMARTHOUSE"
      title="スマートハウス"
      text="電気を自給自足する、未来の暮らしを体感できる住まい。"
      img={images.smartHero}
    />

    <div className="centerBadge">
      <strong>
        2棟同時<br />見学OK
      </strong>
      <small>比較できます</small>
    </div>
  </div>
</section>

  <section className="container benefits"><h2>モデルハウス見学でできること</h2><div>{benefits.map(([Icon,t])=><article key={t}><Icon size={35}/><p>{t}</p></article>)}</div></section>

  <section className="container" id="model"><SectionTitle eyebrow="MODEL HOUSE" title="それぞれのモデルハウスの特徴"/><div className="modelGrid"><article className="modelCard"><div><p className="eyebrow">PROVENCE</p><h3>プロヴァンス</h3><ul><li>漆喰の塗り壁</li><li>無垢材の床・建具</li><li>海外から取り寄せたパーツ</li><li>経年変化を楽しむデザイン</li><li>自然素材の心地よい空間</li></ul></div><img src={images.provenceMain} alt="プロヴァンスの外観" loading="lazy"/></article><article className="modelCard smart"><div><p className="eyebrow">SMARTHOUSE</p><h3>スマートハウス</h3><ul><li>太陽光発電システム</li><li>大容量蓄電池</li><li>高断熱・高気密</li><li>電気をつくり、ためて使う暮らし</li><li>停電への備えも相談できる</li></ul></div><img src={images.smartMain} alt="スマートハウスの外観" loading="lazy"/></article></div><div className="doubleCta"><Home size={34}/><p>どちらか迷っている方は、<br/>2棟まとめて見学できます。</p><a href="#reserve" data-request="２棟まとめて見学">2棟まとめて見学を申し込む <ChevronRight size={16}/></a></div></section>

  <section className="container compare"><h2>あなたが確かめたいのは、どんな暮らし？</h2><table><thead><tr><th scope="col">比較ポイント</th><th scope="col">プロヴァンス</th><th scope="col">スマートハウス</th></tr></thead><tbody>{comparison.map(r=><tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table></section>

  <section className="container visitGuide" aria-labelledby="visit-guide-title">
    <p className="eyebrow">YOUR VISIT</p><h2 id="visit-guide-title">見学を、家づくりの最初の一歩に。</h2>
    <div className="visitGuideGrid">
      <article><span>01</span><h3>素材の心地よさを確かめる</h3><p>写真で気になった漆喰や無垢材。質感や光の入り方を、実際の空間で体感してください。</p></article>
      <article><span>02</span><h3>家族の動きをイメージする</h3><p>キッチンからの見え方、部屋の広さ、日々の動線。自分たちの暮らしに重ねて比べられます。</p></article>
      <article><span>03</span><h3>予算も土地も、まとめて相談</h3><p>「何から始めればいい？」「予算はどのくらい？」。まだ決まっていないこともご相談ください。</p></article>
    </div>
    <div className="visitPractical"><p><strong>見学目安：60〜90分</strong><br />短時間での見学もご相談ください。お子様連れでもご見学いただけます。</p><p>ご希望を送信 → 担当者と日時を調整 → ご見学<br /><small>見学場所の詳細は、ご希望のモデルハウスに合わせてご案内します。</small></p></div>
    <a className="outline" href="#reserve">見学の希望を相談する <ChevronRight size={16} /></a>
  </section>

  <section className="container youtubeSection" id="youtube"><SectionTitle eyebrow="YOUTUBE" title="YouTubeで家づくりをもっと身近に" text="ルームツアーや家づくりのコツを動画で確認できます。"/><div className="youtubeGrid">{youtubeItems.map(item=><YoutubeCard key={item[0]} item={item}/>)}</div><div className="center"><a className="outline" href="https://www.youtube.com/@viehouse" target="_blank">Viehouse公式YouTubeチャンネルへ</a></div></section>

  <section className="container voiceSection" id="voice"><SectionTitle eyebrow="OWNER'S VOICE" title="お客様の声" text="実際にViehouseで建てられたお客様の声をご紹介します。"/><div className="voiceGrid">{voiceItems.map(item=><VoiceCard key={item[0]} item={item}/>)}</div></section>

  <section className="container message"><img src={images.president} alt="Viehouse代表 福島徹" loading="lazy"/><div><p className="eyebrow">MESSAGE</p><h2>代表からのメッセージ</h2><p>20年前まで、私も日本の家は世界最高水準だと思っていました。

しかし海外を訪れたとき、100年以上大切に住み継がれる家と、その家を誇りに思う人々の暮らしに出会いました。

住まいには、建てた後の暮らしまで見据えた家づくりが必要です。

「流行でつくり、古くなれば建て替える。」

そんな家づくりではなく、何十年経っても愛され、家族とともに歳を重ねていく住まいをつくりたい。

その想いからViehouseは生まれました。

私たちは漆喰や無垢材など、本物の素材を大切にし、デザインだけでなく性能や健康にもこだわりながら、一棟一棟丁寧に家づくりをしています。

家は建てた日が完成ではありません。

10年後、20年後、30年後も「この家でよかった」と思っていただける住まいを、これからも皆さまと一緒につくっていきます。</p><b>代表取締役　福島 徹</b></div></section>

<section className="container faq" id="faq">
  <SectionTitle eyebrow="FAQ" title="よくあるご質問" />

  <details>
    <summary>まだ建てるか決めていなくても見学できますか？</summary>
    <p>
      はい、もちろん可能です。情報収集の段階でもお気軽にご来場ください。
      実際の建物を見ながら、家づくりの進め方をご案内します。
    </p>
  </details>

  <details>
    <summary>子ども連れでも見学できますか？</summary>
    <p>
      はい、お子様連れでもご見学いただけます。
      ご家族皆さまで、実際の暮らしをイメージしながらご覧ください。
    </p>
  </details>

  <details>
    <summary>土地を探している段階でも相談できますか？</summary>
    <p>
      はい、土地探しからご相談いただけます。
      ご希望のエリアやご予算を伺い、建物とのバランスも含めてご提案します。
    </p>
  </details>

  <details>
    <summary>見学にはどのくらい時間がかかりますか？</summary>
    <p>
      目安は60分から90分程度です。
      ご都合に合わせて、短時間でのご見学にも対応いたします。
    </p>
  </details>

  <details>
    <summary>予算や住宅ローンの相談だけでも大丈夫ですか？</summary>
    <p>
      はい、大丈夫です。
      建築費の目安や月々の返済額、土地を含めた総予算についても分かりやすくご説明します。
    </p>
  </details>
</section>

  <section className="container reserve" id="reserve">
    <Gift />
    <ReserveForm selectedRequest={selectedRequest} />
  </section>

  <section className="bottom"><div className="container bottomInner"><h2>写真では伝わらない心地よさがあります。<br/>まずはモデルハウスでご体感ください。</h2><div><a className="goldBtn" href="#reserve" data-request="プロヴァンス見学">プロヴァンスを見学予約する</a><a className="blueBtn" href="#reserve" data-request="スマートハウス見学">スマートハウスを見学予約する</a></div><aside><p>お電話でのご予約・お問い合わせはこちら</p><strong><a href="tel:0485847779">048-584-7779</a></strong><span>受付時間 / 9:00〜19:00　定休日 / 不定期</span></aside></div></section>
</main>

      <div className="mobileReserve"><a href="tel:0485847779">電話で相談</a><a href="#reserve">見学を申し込む <ChevronRight size={17} /></a></div>
      <footer>
        <div className="container footer">
          <a className="logo" href="/#top">Viehouse</a>
          <nav>
            <a href="/#top">モデルハウス</a>
            <a href="/#youtube">YouTube</a>
            <a href="/#voice">お客様の声</a>
            <a href="/#model">家づくりのこだわり</a>
            <a href="/company">会社案内</a>
          </nav>
          <a className="outline" href="/#reserve">来場予約はこちら</a>
        </div>
      </footer>
    </div>
  );
}
