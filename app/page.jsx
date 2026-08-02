'use client';

import { Home, Route, Sun, MessageCircle, MapPin, ChevronRight, Star } from 'lucide-react';

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

  <div className="formBox">
    <p className="eyebrow">CONTACT</p>

    <h2>モデルハウス見学・資料請求のお申し込み</h2>

    <p className="formLead">
      下記フォームより必要事項をご入力ください。
      見学をご希望の場合は、内容を確認後に担当者よりご連絡し、
      見学日時を調整させていただきます。
    </p>

    <p className="formNotice">
      ※フォームの送信時点では、見学予約は確定しておりません。
    </p>

    {/* Googleフォームへの送信先を画面に表示させないためのiframe */}
    <iframe
      name="google-form-submit"
      title="Googleフォーム送信用"
      className="hiddenFormFrame"
    />

    <form
      className="reserveForm"
      action="https://docs.google.com/forms/d/e/1FAIpQLSe24qMYgvsVbR4KcUKKwAGV7vjB8FiZIwJTZ0SYJfrSHur1JQ/formResponse"
      method="POST"
      target="google-form-submit"
      onSubmit={(event) => {
        const form = event.currentTarget;

        setTimeout(() => {
          form.reset();

          alert(
            'お問い合わせありがとうございます。内容を確認後、Viehouse担当者よりご連絡いたします。'
          );
        }, 700);
      }}
    >
      <label>
        <span className="formLabel">
          お名前
          <span className="required">必須</span>
        </span>

        <input
          type="text"
          name="entry.1185507046"
          placeholder="例）山田 太郎"
          autoComplete="name"
          required
        />
      </label>

      <label>
        <span className="formLabel">
          ふりがな
          <span className="required">必須</span>
        </span>

        <input
          type="text"
          name="entry.286628918"
          placeholder="例）やまだ たろう"
          required
        />
      </label>

      <label>
        <span className="formLabel">
          メールアドレス
          <span className="required">必須</span>
        </span>

        <input
          type="email"
          name="entry.1453514585"
          placeholder="例）example@gmail.com"
          autoComplete="email"
          required
        />
      </label>

      <label>
        <span className="formLabel">
          電話番号
          <span className="required">必須</span>
        </span>

        <input
          type="tel"
          name="entry.1236133254"
          placeholder="例）090-1234-5678"
          autoComplete="tel"
          required
        />
      </label>

      <label className="full">
        <span className="formLabel">
          現在のお住まい
          <span className="required">必須</span>
        </span>

        <small>市区町村までで結構です。</small>

        <input
          type="text"
          name="entry.1025760241"
          placeholder="例）埼玉県深谷市"
          autoComplete="address-level2"
          required
        />
      </label>

      <fieldset className="full">
        <legend>
          ご希望の内容
          <span className="required">必須</span>
        </legend>

        <div className="formChoices">
          {[
            'プロヴァンス見学',
            'スマートハウス見学',
            '２棟まとめて見学',
            'まだ決めてない（資料請求のみ依頼したい）',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="radio"
                name="entry.1685769336"
                value={value}
                required
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="full">
        <legend>
          家づくりのご予定時期
          <span className="required">必須</span>
        </legend>

        <div className="formChoices">
          {[
            '半年以内',
            '1年以内',
            '2年以内',
            '3年以内',
            'まだ決めていない',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="radio"
                name="entry.627008439"
                value={value}
                required
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="full">
        <legend>現在の家づくり状況</legend>

        <p className="fieldDescription">
          当てはまるものをすべてお選びください。
        </p>

        <div className="formChoices">
          {[
            '情報収集中',
            '土地を探している',
            '土地を持っている',
            '住宅会社を比較している',
            '具体的な間取りを検討している',
            '資金計画を相談したい',
            '住宅ローンを相談したい',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="checkbox"
                name="entry.809008481"
                value={value}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="full">
        <span className="formLabel">建築予定エリア</span>

        <small>
          検討している市区町村やエリアをご入力ください。
        </small>

        <input
          type="text"
          name="entry.135116182"
          placeholder="例）深谷市、熊谷市、寄居町周辺"
        />
      </label>

      <fieldset className="full">
        <legend>
          土地の状況
          <span className="required">必須</span>
        </legend>

        <div className="formChoices">
          {[
            '土地を持っている',
            '土地を探している',
            '建て替えを検討している',
            'まだ決めていない',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="radio"
                name="entry.1955319601"
                value={value}
                required
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="full">
        <legend>ご予算</legend>

        <p className="fieldDescription">
          建物・土地を含めた総予算の目安を教えてください。
        </p>

        <div className="formChoices">
          {[
            '3,000万円〜4,000万円',
            '4,000万円〜5,000万円',
            '5,000万円以上',
            'まだ決めていない',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="radio"
                name="entry.780287589"
                value={value}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="full">
        <legend>来場特典のご希望</legend>

        <div className="formChoices">
          {[
            '松阪牛',
            'towerカタログギフト',
            'スターバックスチケット',
          ].map((value) => (
            <label className="choice" key={value}>
              <input
                type="radio"
                name="entry.404848345"
                value={value}
              />
              <span>{value}</span>
            </label>
          ))}
        </div>

        <p className="fieldDescription giftCondition">
          ※来場特典には適用条件がございます。詳しくは担当者よりご案内いたします。
        </p>
      </fieldset>

      <label className="full">
        <span className="formLabel">ご質問・ご相談</span>

        <textarea
          name="entry.2057376373"
          placeholder="間取り、土地探し、住宅ローン、性能など、気になることをご記入ください。"
          rows={6}
        />
      </label>

      <label className="privacyCheck full">
        <input type="checkbox" required />

        <span>
          個人情報の取り扱いに同意して送信します。
        </span>
      </label>

      <button type="submit" className="reserveSubmit">
        入力内容を送信する
        <ChevronRight size={18} />
      </button>

      <p className="submitNote full">
        送信後、Viehouse担当者よりお電話またはメールにてご連絡いたします。
      </p>
    </form>
  </div>
</section>

  <section className="bottom"><div className="container bottomInner"><h2>写真では伝わらない心地よさがあります。<br/>まずはモデルハウスでご体感ください。</h2><div><a className="goldBtn" href="#reserve">プロヴァンスを見学予約する</a><a className="blueBtn" href="#reserve">スマートハウスを見学予約する</a></div><aside><p>お電話でのご予約・お問い合わせはこちら</p><strong>048-584-7779</strong><span>受付時間 / 9:00〜19:00　定休日 / 不定期</span></aside></div></section>
</main><footer><div className="container footer"><div className="logo">Viehouse</div><nav><a>モデルハウス</a><a>YouTube</a><a>お客様の声</a><a>家づくりのこだわり</a><a>会社案内</a></nav><a className="outline" href="#reserve">来場予約はこちら</a></div></footer></>}

