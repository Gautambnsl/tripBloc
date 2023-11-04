import './cryptoList.css';

const CryptoList = () => {
  const cryptos = [
    {
      name: 'Bitcoin',
      logo: 'https://www.xceltrip.com/_next/static/media/btc.3a780532.png',
    },
    {
      name: 'Ethereum',
      logo: 'https://www.xceltrip.com/_next/static/media/eth.5782d477.png',
    },
    {
      name: 'XRP',
      logo: 'https://www.xceltrip.com/_next/static/media/xld.be41b014.png',
    },
    {
      name: 'Litecoin',
      logo: 'https://www.xceltrip.com/_next/static/media/xlab.1fc14e12.png',
    },
    {
      name: 'Bitcoin Cash',
      logo: 'https://www.xceltrip.com/_next/static/media/usdt.1ca58c50.png',
    },
    {
      name: 'Shiba Inu',
      logo: 'https://www.xceltrip.com/_next/static/media/shibainu.9a0d64ab.png',
    },
    {
      name: 'Binance Coin',
      logo: 'https://www.xceltrip.com/_next/static/media/bnb.c9ad93cc.png',
    },
    {
      name: 'USD Coin',
      logo: 'https://www.xceltrip.com/_next/static/media/xdc.96864f9d.png',
    },
    {
      name: 'Binance USD',
      logo: 'https://www.xceltrip.com/_next/static/media/ltc.a53c9877.png',
    },
    {
      name: 'Polygon',
      logo: 'https://www.xceltrip.com/_next/static/media/matic.0e11ecca.png',
    },
  ];
  return (
    <div className="crypto">
      <h1 className="cryptoTitle">Travel With Crypto</h1>
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
