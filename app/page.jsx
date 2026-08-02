'use client';

import { useState } from 'react';
import { Home, Route, Sun, MessageCircle, MapPin, ChevronRight, ChevronLeft, Star, Check } from 'lucide-react';

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
  ['断熱性能', '高断熱仕様', '最高等級の断熱性能'],
  ['光熱費削減', '省エネ設計', '太陽光＋蓄電池で0円も可'],
  ['太陽光・蓄電池', 'オプション対応', '標準搭載'],
  ['将来性', '経年変化を楽しめる', '災害時にも安心'],
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
    '南仏スタイルのかわいい家',
    '13坪 / 漆喰 / 無垢材',
    '/images/youtube-provence.jpg',
    'https://youtu.be/sgWQRtHu3s4?si=PAOvXjxYdqrUQTOL',
  ],
  [
    '電気代0円を目指すスマートハウス',
    '33坪 / 太陽光 / 蓄電池',
    '/images/youtube-smart.jpg',
    'https://youtu.be/Tr4HoUN_Kdw?si=40-3oxzaaujodDpf',
  ],
  [
    '家づくりで後悔しないために',
    '資金計画 / 間取り / 性能',
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
        <img src={item[2]} alt={item[0]} />
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
        <img src={item[3]} alt={item[0]} />
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


function Header(){return <header className="header"><div className="container nav"><div className="logo">Viehouse</div><nav><a href="#model">モデルハウス</a><a href="#youtube">YouTube</a><a href="#voice">お客様の声</a><a href="#faq">FAQ</a></nav><a className="navCta" href="#reserve">来場予約する</a></div></header>}
function HeroPanel({type,title,text,img,theme}){return <article className={`heroPanel ${theme}`}><img src={img} alt={title}/><div className="heroShade"/><div className="heroPanelText"><p>{type}</p><h2>{title}</h2><span>{text}</span><a href="#reserve">モデルハウスを予約する <ChevronRight size={16}/></a></div></article>}
function SectionTitle({eyebrow,title,text}){return <div className="sectionTitle"><p>{eyebrow}</p><h2>{title}</h2>{text&&<span>{text}</span>}</div>}
function Gift(){return <section className="giftBlock"><div><p className="eyebrow">WEB予約限定</p><h2>5,000<span>円相当</span></h2><h3>選べる来場特典プレゼント！</h3><p>松阪牛・towerカタログギフト・スターバックスチケットからお選びいただけます。</p></div><div className="giftCards"><article><img src={images.giftBeef}/><b>松阪牛</b></article><article><img src={images.giftTower}/><b>tower<br/>カタログギフト</b></article><article><img src={images.giftStarbucks}/><b>スターバックス<br/>チケット</b></article></div></section>}

function ReserveForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    name: '',
    furigana: '',
    email: '',
    phone: '',
    address: '',
    requestType: '',
    timing: '',
    statuses: [],
    area: '',
    landStatus: '',
    budget: '',
    gift: '',
    message: '',
    privacy: false,
  });

  const setField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleStatus = (value) => {
    setData((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(value)
        ? prev.statuses.filter((item) => item !== value)
        : [...prev.statuses, value],
    }));
  };

  const goTop = () => {
    document.getElementById('reserve')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const next = () => {
    if (
      step === 1 &&
      (!data.name || !data.furigana || !data.email || !data.phone || !data.address)
    ) {
      alert('必須項目を入力してください。');
      return;
    }

    if (step === 2 && (!data.requestType || !data.timing)) {
      alert('必須項目を選択してください。');
      return;
    }

    if (step === 3 && !data.landStatus) {
      alert('土地の状況を選択してください。');
      return;
    }

setStep((prev) => Math.min(prev + 1, 4));
  };

const back = () => {
  setStep((prev) => Math.max(prev - 1, 1));
};

  const submitForm = (event) => {
    if (!data.privacy) {
      event.preventDefault();
      alert('個人情報の取り扱いに同意してください。');
      return;
    }

    setTimeout(() => {
      setSubmitted(true);
      goTop();
    }, 700);
  };

  const choice = (field, value) => (
    <label className={`vhChoice ${data[field] === value ? 'isSelected' : ''}`}>
      <input
        type="radio"
        checked={data[field] === value}
        onChange={() => setField(field, value)}
      />
      <span>{value}</span>
    </label>
  );

  if (submitted) {
    return (
      <div className="vhFormCard vhComplete">
        <div className="vhCompleteIcon"><Check size={36} /></div>
        <p className="eyebrow">THANK YOU</p>
        <h2>お問い合わせありがとうございます</h2>
        <p>
          内容を確認後、Viehouse担当者よりお電話またはメールにてご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <div className="vhFormCard">
      <div className="vhFormIntro">
        <p className="eyebrow">CONTACT</p>
        <h2>モデルハウス見学・資料請求</h2>
        <p>入力は約2分。4つのステップで簡単にお申し込みいただけます。</p>
      </div>

      <div className="vhSteps">
        {[
          ['お客様情報', 1],
          ['ご希望内容', 2],
          ['家づくり', 3],
          ['確認・送信', 4],
        ].map(([label, number]) => (
          <div
            key={number}
            className={`vhStep ${step === number ? 'isCurrent' : ''} ${
              step > number ? 'isDone' : ''
            }`}
          >
            <span>{step > number ? <Check size={15} /> : number}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      <iframe
        name="google-form-submit"
        title="Googleフォーム送信用"
        className="vhHiddenFrame"
      />

      <form
        className="vhStepForm"
        action="https://docs.google.com/forms/d/e/1FAIpQLSe24qMYgvsVbR4KcUKKwAGV7vjB8FiZIwJTZ0SYJfrSHur1JQ/formResponse"
        method="POST"
        target="google-form-submit"
        onSubmit={submitForm}
      >
        <input type="hidden" name="entry.1185507046" value={data.name} />
        <input type="hidden" name="entry.286628918" value={data.furigana} />
        <input type="hidden" name="entry.1453514585" value={data.email} />
        <input type="hidden" name="entry.1236133254" value={data.phone} />
        <input type="hidden" name="entry.1025760241" value={data.address} />
        <input type="hidden" name="entry.1685769336" value={data.requestType} />
        <input type="hidden" name="entry.627008439" value={data.timing} />
        {data.statuses.map((status) => (
          <input
            key={status}
            type="hidden"
            name="entry.809008481"
            value={status}
          />
        ))}
        <input type="hidden" name="entry.135116182" value={data.area} />
        <input type="hidden" name="entry.1955319601" value={data.landStatus} />
        <input type="hidden" name="entry.780287589" value={data.budget} />
        <input type="hidden" name="entry.404848345" value={data.gift} />
        <input type="hidden" name="entry.2057376373" value={data.message} />

        {step === 1 && (
          <section className="vhPanel">
            <div className="vhPanelHead">
              <span>STEP 01</span>
              <h3>お客様情報を入力してください</h3>
              <p>担当者からのご連絡に必要な情報です。</p>
            </div>

            <div className="vhFieldGrid">
              <label className="vhField">
                <span>お名前 <b>必須</b></span>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setField('name', e.target.value)}
                  placeholder="例）山田 太郎"
                />
              </label>

              <label className="vhField">
                <span>ふりがな <b>必須</b></span>
                <input
                  type="text"
                  value={data.furigana}
                  onChange={(e) => setField('furigana', e.target.value)}
                  placeholder="例）やまだ たろう"
                />
              </label>

              <label className="vhField">
                <span>メールアドレス <b>必須</b></span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="例）example@gmail.com"
                />
              </label>

              <label className="vhField">
                <span>電話番号 <b>必須</b></span>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="例）090-1234-5678"
                />
              </label>

              <label className="vhField vhFull">
                <span>現在のお住まい <b>必須</b></span>
                <small>市区町村までで結構です。</small>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => setField('address', e.target.value)}
                  placeholder="例）埼玉県深谷市"
                />
              </label>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="vhPanel">
            <div className="vhPanelHead">
              <span>STEP 02</span>
              <h3>ご希望の内容を教えてください</h3>
              <p>現在決まっている範囲でお選びください。</p>
            </div>

            <div className="vhQuestion">
              <h4>ご希望の内容 <b>必須</b></h4>
              <div className="vhChoices">
                {[
                  'プロヴァンス見学',
                  'スマートハウス見学',
                  '２棟まとめて見学',
                  'まだ決めてない（資料請求のみ依頼したい）',
                ].map((value) => choice('requestType', value))}
              </div>
            </div>

            <div className="vhQuestion">
              <h4>家づくりのご予定時期 <b>必須</b></h4>
              <div className="vhChoices vhChoices3">
                {[
                  '半年以内',
                  '1年以内',
                  '2年以内',
                  '3年以内',
                  'まだ決めていない',
                ].map((value) => choice('timing', value))}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="vhPanel">
            <div className="vhPanelHead">
              <span>STEP 03</span>
              <h3>家づくりについて教えてください</h3>
              <p>未定の項目は空欄でも問題ありません。</p>
            </div>

            <div className="vhQuestion">
              <h4>現在の家づくり状況</h4>
              <p>当てはまるものをすべてお選びください。</p>
              <div className="vhChoices">
                {[
                  '情報収集中',
                  '土地を探している',
                  '土地を持っている',
                  '住宅会社を比較している',
                  '具体的な間取りを検討している',
                  '資金計画を相談したい',
                  '住宅ローンを相談したい',
                ].map((value) => (
                  <label
                    key={value}
                    className={`vhChoice ${
                      data.statuses.includes(value) ? 'isSelected' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={data.statuses.includes(value)}
                      onChange={() => toggleStatus(value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="vhField vhSingle">
              <span>建築予定エリア</span>
              <input
                type="text"
                value={data.area}
                onChange={(e) => setField('area', e.target.value)}
                placeholder="例）深谷市、熊谷市、寄居町周辺"
              />
            </label>

            <div className="vhQuestion">
              <h4>土地の状況 <b>必須</b></h4>
              <div className="vhChoices vhChoices2">
                {[
                  '土地を持っている',
                  '土地を探している',
                  '建て替えを検討している',
                  'まだ決めていない',
                ].map((value) => choice('landStatus', value))}
              </div>
            </div>

            <div className="vhQuestion">
              <h4>建物・土地を含めた総予算</h4>
              <div className="vhChoices vhChoices2">
                {[
                  '3,000万円〜4,000万円',
                  '4,000万円〜5,000万円',
                  '5,000万円以上',
                  'まだ決めていない',
                ].map((value) => choice('budget', value))}
              </div>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="vhPanel">
            <div className="vhPanelHead">
              <span>STEP 04</span>
              <h3>内容を確認して送信してください</h3>
              <p>最後に来場特典とご相談内容をご入力ください。</p>
            </div>

            <div className="vhQuestion">
              <h4>来場特典のご希望</h4>
              <div className="vhChoices vhChoices3">
                {[
                  '松阪牛',
                  'towerカタログギフト',
                  'スターバックスチケット',
                ].map((value) => choice('gift', value))}
              </div>
            </div>

            <label className="vhField vhSingle">
              <span>ご質問・ご相談</span>
              <textarea
                value={data.message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="間取り、土地探し、住宅ローン、性能など、気になることをご記入ください。"
                rows={6}
              />
            </label>

            <div className="vhSummary">
              <div><span>お名前</span><strong>{data.name}</strong></div>
              <div><span>ご希望</span><strong>{data.requestType}</strong></div>
              <div><span>予定時期</span><strong>{data.timing}</strong></div>
              <div><span>建築予定エリア</span><strong>{data.area || '未入力'}</strong></div>
            </div>

            <label className="vhPrivacy">
              <input
                type="checkbox"
                checked={data.privacy}
                onChange={(e) => setField('privacy', e.target.checked)}
              />
              <span>個人情報の取り扱いに同意します。</span>
            </label>
          </section>
        )}

        <div className="vhActions">
          {step > 1 && (
            <button type="button" className="vhBack" onClick={back}>
              <ChevronLeft size={18} />
              戻る
            </button>
          )}

          {step < 4 ? (
            <button type="button" className="vhNext" onClick={next}>
              次へ進む
              <ChevronRight size={18} />
            </button>
          ) : (
            <button type="submit" className="vhSubmit">
              この内容で送信する
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Page(){return <><Header/><main>
  <section className="hero">
  <div className="heroCopy">
    <p>見るだけで、家づくりが楽しくなる。</p>
<h1 className="heroTitle">
  <span>2つの暮らしを見て、</span>
  <span>比べて、体感してください。</span>
</h1>
    <span>
      プロヴァンスとスマートハウスの2棟モデルハウス見学受付中
    </span>
    <a href="#reserve" className="mainCta">
      WEB予約限定・選べる5,000円相当の来場特典をご用意
    </a>
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

  <section className="container" id="model"><SectionTitle eyebrow="MODEL HOUSE" title="それぞれのモデルハウスの特徴"/><div className="modelGrid"><article className="modelCard"><div><p className="eyebrow">PROVENCE</p><h3>プロヴァンス</h3><ul><li>漆喰の塗り壁</li><li>無垢材の床・建具</li><li>海外から取り寄せたパーツ</li><li>経年変化を楽しむデザイン</li><li>自然素材の心地よい空間</li></ul></div><img src={images.provenceMain}/></article><article className="modelCard smart"><div><p className="eyebrow">SMARTHOUSE</p><h3>スマートハウス</h3><ul><li>太陽光発電システム</li><li>大容量蓄電池</li><li>高断熱・高気密</li><li>光熱費を大幅に削減</li><li>災害時も安心の自立型住宅</li></ul></div><img src={images.smartMain}/></article></div><div className="doubleCta"><Home size={34}/><p>どちらか迷っている方は、<br/>2棟まとめて見学できます。</p><a href="#reserve">2棟まとめて見学予約する <ChevronRight size={16}/></a></div></section>

  <section className="container compare"><h2>2つの暮らしを比較してみました</h2><table><thead><tr><th></th><th>プロヴァンス</th><th>スマートハウス</th></tr></thead><tbody>{comparison.map(r=><tr key={r[0]}><th>{r[0]}</th><td>◎ {r[1]}</td><td>○ {r[2]}</td></tr>)}</tbody></table></section>

  <section className="container youtubeSection" id="youtube"><SectionTitle eyebrow="YOUTUBE" title="YouTubeで家づくりをもっと身近に" text="ルームツアーや家づくりのコツを動画で確認できます。"/><div className="youtubeGrid">{youtubeItems.map(item=><YoutubeCard key={item[0]} item={item}/>)}</div><div className="center"><a className="outline" href="https://www.youtube.com/@viehouse" target="_blank">Viehouse公式YouTubeチャンネルへ</a></div></section>

  <section className="container voiceSection" id="voice"><SectionTitle eyebrow="OWNER'S VOICE" title="お客様の声" text="実際にViehouseで建てられたお客様の声をご紹介します。"/><div className="voiceGrid">{voiceItems.map(item=><VoiceCard key={item[0]} item={item}/>)}</div></section>

  <section className="container message"><img src={images.president}/><div><p className="eyebrow">MESSAGE</p><h2>代表からのメッセージ</h2><p>20年前まで、私も日本の家は世界最高水準だと思っていました。

しかし海外を訪れたとき、100年以上大切に住み継がれる家と、その家を誇りに思う人々の暮らしに出会いました。

一方、日本では家の寿命は約30年と言われています。

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
    <ReserveForm />
  </section>

  <section className="bottom"><div className="container bottomInner"><h2>写真では伝わらない心地よさがあります。<br/>まずはモデルハウスでご体感ください。</h2><div><a className="goldBtn" href="#reserve">プロヴァンスを見学予約する</a><a className="blueBtn" href="#reserve">スマートハウスを見学予約する</a></div><aside><p>お電話でのご予約・お問い合わせはこちら</p><strong>048-584-7779</strong><span>受付時間 / 9:00〜19:00　定休日 / 不定期</span></aside></div></section>
</main><footer><div className="container footer"><div className="logo">Viehouse</div><nav><a>モデルハウス</a><a>YouTube</a><a>お客様の声</a><a>家づくりのこだわり</a><a>会社案内</a></nav><a className="outline" href="#reserve">来場予約はこちら</a></div></footer></>}
