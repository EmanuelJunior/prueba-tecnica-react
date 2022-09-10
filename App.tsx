import * as React from 'react';
import './css/style.css';

interface Phrases {
  fact: string;
}

export default function App() {
  const defaultImg =
    'https://www.purina-latam.com/sites/g/files/auxxlc391/files/styles/social_share_large/public/purina-10-datos-curiosos-sobre-los-gatos.png?itok=88pMyzkl';

  const [phrase, setPhrase] = React.useState<string>('');
  const [imgGiphy, setImgGiphy] = React.useState<string>('');

  React.useEffect(() => {
    (async function () {
      const { fact }: Phrases = await fetch('https://catfact.ninja/fact')
        .then((res) => res.json())
        .then((data) => data);

      const threeWords = fact.split(' ', 3);
      const transformPhrase = threeWords.join(' ');
      setPhrase(transformPhrase || '');
    })();
  }, []);

  React.useEffect(() => {
    (async function () {
      if (phrase.length > 1) {
        const { data } = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=dCGyNtLdxAHEwTW0rFDOlZfPBu4J7z86&q=${phrase}&limit=1`
        )
          .then((res) => res.json())
          .then((data) => data);

        const imgUrl = data[0].images.original.url;
        setImgGiphy(imgUrl);
      }
    })();
  }, [phrase]);

  return (
    <div className="container">
      <img
        src={imgGiphy || defaultImg}
        title="img-api-giphy"
        width="400"
        height="300"
      />
      <h1>{phrase || 'Loading...'}</h1>
    </div>
  );
}
