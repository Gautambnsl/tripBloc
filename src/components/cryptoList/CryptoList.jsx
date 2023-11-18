import './cryptoList.css';

const CryptoList = () => {
  const cryptos = [
    {
      name: 'Polygon zkEVM',
      logo: 'https://www.xceltrip.com/_next/static/media/matic.0e11ecca.png',
    },
    {
      name: 'zksync',
      logo: 'https://metaschool.so/_next/static/media/unknown-logo.7eda54b1.webp',
    },
    {
      name: 'Scroll',
      logo: 'https://metaschool.so/_next/static/media/unknown-logo.7eda54b1.webp',
    },
    {
      name: 'Arbitrum',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg',
    },
    {
      name: 'Chiliz',
      logo: 'https://metaschool.so/_next/static/media/unknown-logo.7eda54b1.webp',
    },
    {
      name: 'Base',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_base.jpg',
    },
    {
      name: 'Celo',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_celo.jpg',
    },
    {
      name: 'Neon',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_neon.jpg',
    },
    {
      name: 'Mantle',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_mantle.jpg',
    },
    {
      name: 'Linea',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
    },
    {
      name: 'WorldCoin',
      logo: 'https://worldcoin.org/icons/logo-small.svg',
    },
    {
      name: 'Lens Protocol',
      logo: 'https://raw.githubusercontent.com/lens-protocol/brand-kit/074e865b5da4b2b80133915b15e82f9ba1f02881/01%20Logo/SVG/Icon-Black.svg',
    },
    {
      name: 'Unlimit',
      logo: 'https://www.unlimit.com/wp-content/themes/unlimint/assets/images/logo_white.svg',
    },
    {
      name: 'UMA',
      logo: 'https://dynamic-assets.coinbase.com/b8b3766b7258165a2ccbb94ef0ca866d9c0a32e5c5a2de17857f617af2147b0ddad2d6515a5c6e5f35ef6a0c2a1e13e382d9755cdc313f5a63ec381e4111bc38/asset_icons/a3067c1067816be8a36697fad879f799afb71e44541aa49837b1a56f98b63ce8.png',
    },
    {
      name: 'API3',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7737.png',
    },
    {
      name: 'Push Protocol',
      logo: 'https://push.org/assets/docs/PushLogoTextDark.svg',
    },
    {
      name: 'Waku Protocol',
      logo: 'https://waku.org/theme/image/logo.svg',
    },
  ];
  return (
    <div className="crypto">
      <h1 className="cryptoTitle">Sponsor's</h1>
      <span className="cryptoDesc">
        Easily Pay for your bookings using your favourite cryptocurrencies
      </span>
      <div className="crypto-logos">
        {cryptos.map((crypto) => (
          <div key={crypto.name} className="crypto-logo">
            <img src={crypto.logo} alt={crypto.name} title={crypto.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
