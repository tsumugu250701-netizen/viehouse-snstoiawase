import {
  Home,
  Heart,
  ShieldCheck,
  Leaf,
  ChevronRight,
} from 'lucide-react';

const companyInfo = [
  ['会社名', '株式会社 Vie house'],
  ['代表者', '代表取締役　福島 徹'],
  ['所在地', '埼玉県大里郡寄居町大字用土3119'],
  ['電話番号', '048-584-7779'],
  ['営業時間', '9:00〜19:00'],
  ['定休日', '不定期'],
  ['事業内容', '注文住宅の設計・施工、住宅リフォーム、土地探し'],
];

const values = [
  {
    icon: Home,
    title: '長く愛される家',
    text: '流行だけを追うのではなく、10年後、20年後も家族に愛される住まいをつくります。',
  },
  {
    icon: Leaf,
    title: '本物の自然素材',
    text: '漆喰や無垢材など、時間とともに味わいを増す本物の素材を大切にしています。',
  },
  {
    icon: ShieldCheck,
    title: '性能と安心',
    text: 'デザインだけでなく、断熱・気密・耐震・省エネ性能にも妥協しません。',
  },
  {
    icon: Heart,
    title: '家族に寄り添う',
    text: '暮らし方や将来まで丁寧に伺い、ご家族に合った住まいをご提案します。',
  },
];

export default function CompanyPage() {
  return (
    <>
      <header className="companyHeader">
        <div className="container companyNav">
          <a className="logo" href="/">
            Viehouse
          </a>

          <a className="companyBack" href="/">
            トップページへ戻る
          </a>
        </div>
      </header>

      <main>
        <section className="companyHero">
          <div className="container">
            <p className="eyebrow">COMPANY</p>
            <h1>会社案内</h1>
           <p>
  何十年経っても、<br />
  この家でよかったと思える住まいを。
</p>
          </div>
        </section>

        <section className="container companyMessage">
          <div>
            <p className="eyebrow">MESSAGE</p>
            <h2>
              家族とともに、
              <br />
              歳を重ねていく家を。
            </h2>

            <p>
              私たちは、家を建てた瞬間だけ美しい住まいではなく、
              時間とともに味わいが増し、家族の思い出が積み重なっていく
              住まいをつくりたいと考えています。
            </p>

            <p>
              漆喰や無垢材などの自然素材、快適に暮らすための住宅性能、
              そして一人ひとりの暮らしに合わせた設計。
            </p>

            <p>
              デザインと性能、どちらも妥協せず、
              何十年先も愛される家づくりをお手伝いします。
            </p>

            <strong>代表取締役　福島 徹</strong>
          </div>

          <img
            src="/images/president.jpg"
            alt="Viehouse代表 福島徹"
          />
        </section>

        <section className="companyValues">
          <div className="container">
            <div className="sectionTitle">
              <p>OUR VALUES</p>
              <h2>Viehouseが大切にしていること</h2>
            </div>

            <div className="companyValueGrid">
              {values.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon size={34} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container companyProfile">
          <div className="sectionTitle">
            <p>PROFILE</p>
            <h2>会社概要</h2>
          </div>

          <dl>
            {companyInfo.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="companyCta">
          <div className="container">
            <p className="eyebrow">MODEL HOUSE</p>
            <h2>Viehouseの家を、実際にご体感ください。</h2>
            <p>
              写真だけでは伝わらない素材の質感や空間の心地よさを、
              モデルハウスでご覧いただけます。
            </p>

            <a href="/#reserve">
              モデルハウス見学を申し込む
              <ChevronRight size={18} />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
