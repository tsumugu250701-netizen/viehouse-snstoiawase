'use client';

import { Home, Route, Sun, MessageCircle, MapPin, ChevronRight, Star } from 'lucide-react';

const images = {
  provenceHero: '/images/provence-hero.png',
  smartHero: '/images/smart-hero.png',
  provenceMain: '/images/provence-main.png',
  smartMain: '/images/smart-main.png',
  // 差し替え用：public/images/ に同名で画像を置くと反映されます
  giftBeef: '/images/provence-hero.png',
  giftTower: '/images/smart-hero.png',
  giftStarbucks: '/images/smart-hero.png',
  president: '/images/smart-hero.png',
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
  ['南仏スタイルのかわいい家', '13坪 / 漆喰 / 無垢材', images.provenceHero],
  ['電気代0円を目指すスマートハウス', '33坪 / 太陽光 / 蓄電池', images.smartHero],
  ['家づくりで後悔しないために', '資金計画 / 間取り / 性能', images.provenceMain],
];

const voiceItems = [
  ['毎日帰るのが楽しみになる家になりました！', 'プロヴァンス / 埼玉県 K様', '面談やインテリアの相談も丁寧で、家づくりを心から楽しめました。'],
  ['電気代が本当に安くなって驚いています！', 'スマート / 埼玉県 H様', '太陽光や蓄電池の仕組みもわかりやすく、暮らしてからの安心感が違います。'],
  ['デザインも性能も妥協しなくてよかった！', 'プロヴァンス / 埼玉県 S様', '見た目のかわいさだけでなく、冬も快適に過ごせる住まいになりました。'],
];

function YoutubeCard({item}){return <article className="youtubeCard"><div className="youtubeImage"><img src={item[2]} alt={item[0]}/><span>▶</span></div><h3>{item[0]}</h3><p>{item[1]}</p></article>}
function VoiceCard({item}){return <article className="voiceCard"><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><h3>{item[0]}</h3><p className="voiceMeta">{item[1]}</p><p>{item[2]}</p></article>}


function Header(){return <header className="header"><div className="container nav"><div className="logo">Viehouse</div><nav><a href="#model">モデルハウス</a><a href="#youtube">YouTube</a><a href="#voice">お客様の声</a><a href="#faq">FAQ</a></nav><a className="navCta" href="#reserve">来場予約する</a></div></header>}
function HeroPanel({type,title,text,img,theme}){return <article className={`heroPanel ${theme}`}><img src={img} alt={title}/><div className="heroShade"/><div className="heroPanelText"><p>{type}</p><h2>{title}</h2><span>{text}</span><a href="#reserve">モデルハウスを予約する <ChevronRight size={16}/></a></div></article>}
function SectionTitle({eyebrow,title,text}){return <div className="sectionTitle"><p>{eyebrow}</p><h2>{title}</h2>{text&&<span>{text}</span>}</div>}
function Gift(){return <section className="giftBlock"><div><p className="eyebrow">WEB予約限定</p><h2>5,000<span>円相当</span></h2><h3>選べる来場特典プレゼント！</h3><p>松阪牛・towerカタログギフト・スターバックスチケットからお選びいただけます。</p></div><div className="giftCards"><article><img src={images.giftBeef}/><b>松阪牛</b></article><article><img src={images.giftTower}/><b>tower<br/>カタログギフト</b></article><article><img src={images.giftStarbucks}/><b>スターバックス<br/>チケット</b></article></div></section>}
export default function Page(){return <><Header/><main>
  <section className="hero"><div className="heroGrid"><HeroPanel theme="gold" type="PROVENCE" title="プロヴァンス" text="南仏のやさしい時間が流れる、自然素材の心地よい暮らし。" img={images.provenceHero}/><HeroPanel theme="blue" type="SMART" title="スマート" text="電気を自給自足する、未来の暮らしを体感できる住まい。" img={images.smartHero}/><div className="centerBadge"><strong>2棟同時<br/>見学OK</strong><small>どっち派？</small></div></div><div className="heroCopy"><p>見るだけで、家づくりが楽しくなる。</p><h1>2つの暮らしを<br/>見て、比べて、体感してください。</h1><span>プロヴァンスとスマートハウスの2棟モデルハウス見学受付中</span><a href="#reserve" className="mainCta">WEB予約限定・選べる5,000円相当の来場特典をご用意</a></div></section>

  <section className="container benefits"><h2>モデルハウス見学でできること</h2><div>{benefits.map(([Icon,t])=><article key={t}><Icon size={35}/><p>{t}</p></article>)}</div></section>

  <section className="container" id="model"><SectionTitle eyebrow="MODEL HOUSE" title="それぞれのモデルハウスの特徴"/><div className="modelGrid"><article className="modelCard"><div><p className="eyebrow">PROVENCE</p><h3>プロヴァンス</h3><ul><li>漆喰の塗り壁</li><li>無垢材の床・建具</li><li>海外から取り寄せたパーツ</li><li>経年変化を楽しむデザイン</li><li>自然素材の心地よい空間</li></ul></div><img src={images.provenceMain}/></article><article className="modelCard smart"><div><p className="eyebrow">SMART</p><h3>スマート</h3><ul><li>太陽光発電システム</li><li>大容量蓄電池</li><li>高断熱・高気密</li><li>光熱費を大幅に削減</li><li>災害時も安心の自立型住宅</li></ul></div><img src={images.smartMain}/></article></div><div className="doubleCta"><Home size={34}/><p>どちらか迷っている方は、<br/>2棟まとめて見学できます。</p><a href="#reserve">2棟まとめて見学予約する <ChevronRight size={16}/></a></div></section>

  <section className="container compare"><h2>2つの暮らしを比較してみました</h2><table><thead><tr><th></th><th>プロヴァンス</th><th>スマート</th></tr></thead><tbody>{comparison.map(r=><tr key={r[0]}><th>{r[0]}</th><td>◎ {r[1]}</td><td>○ {r[2]}</td></tr>)}</tbody></table></section>

  <section className="container youtubeSection" id="youtube"><SectionTitle eyebrow="YOUTUBE" title="YouTubeで家づくりをもっと身近に" text="ルームツアーや家づくりのコツを動画で確認できます。"/><div className="youtubeGrid">{youtubeItems.map(item=><YoutubeCard key={item[0]} item={item}/>)}</div><div className="center"><a className="outline" href="https://www.youtube.com/" target="_blank">Viehouse公式YouTubeチャンネルへ</a></div></section>

  <section className="container voiceSection" id="voice"><SectionTitle eyebrow="OWNER'S VOICE" title="お客様の声" text="実際にViehouseで建てられたお客様の声をご紹介します。"/><div className="voiceGrid">{voiceItems.map(item=><VoiceCard key={item[0]} item={item}/>)}</div></section>

  <section className="container message"><img src={images.president}/><div><p className="eyebrow">MESSAGE</p><h2>代表からのメッセージ</h2><p>家は、家族の未来をつくる場所。だからこそ、デザインも性能もどちらも大切にしたい。見た目の美しさだけでなく、高性能で安心して暮らせる住まいをご提案します。</p><b>代表取締役　福島 大輔</b></div></section>

  <section className="container faq" id="faq"><SectionTitle eyebrow="FAQ" title="よくあるご質問"/>{faqs.map(q=><details key={q}><summary>{q}</summary><p>はい、可能です。まだ具体的でない段階でもお気軽にご相談ください。</p></details>)}</section>

  <section className="container reserve" id="reserve"><Gift/><div className="formBox"><p className="eyebrow">RESERVE</p><h2>ご希望の日時でかんたんWEB予約</h2><p className="formNote">※Googleフォーム連携の場合は、下記フォーム部分を埋め込みURLに差し替えてください。</p><form><label>お名前<input placeholder="例）山田 太郎"/></label><label>ご希望日<select><option>希望日を選択</option></select></label><label>お電話番号<input placeholder="例）090-1234-5678"/></label><label>ご希望のモデルハウス<select><option>どちらでも可</option><option>プロヴァンス</option><option>スマート</option><option>2棟まとめて見学</option></select></label><label className="full">ご質問・ご相談など<textarea placeholder="ご要望があればご記入ください"/></label><button type="button">確認画面へ進む <ChevronRight size={18}/></button></form></div></section>

  <section className="bottom"><div className="container bottomInner"><h2>写真では伝わらない心地よさがあります。<br/>まずはモデルハウスでご体感ください。</h2><div><a className="goldBtn" href="#reserve">プロヴァンスを見学予約する</a><a className="blueBtn" href="#reserve">スマートを見学予約する</a></div><aside><p>お電話でのご予約・お問い合わせはこちら</p><strong>048-XXX-XXXX</strong><span>受付時間 / 9:00〜18:00　定休日 / 水曜日</span></aside></div></section>
</main><footer><div className="container footer"><div className="logo">Viehouse</div><nav><a>モデルハウス</a><a>YouTube</a><a>お客様の声</a><a>家づくりのこだわり</a><a>会社案内</a></nav><a className="outline" href="#reserve">来場予約はこちら</a></div></footer></>}

