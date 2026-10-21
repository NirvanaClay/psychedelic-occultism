import { useEffect, useState } from "react";
import { fetchWebById } from "../api/webs.js";
import { Link, useParams } from 'react-router-dom';

import '../Styles/web.css';


const Web = () => {
  const { id } = useParams();

  const [web, setWeb] = useState(null);

  useEffect(() => {
    const loadWeb = async () => {
      const data = await fetchWebById(id);
      console.log('Fetched web:', data);
      setWeb(data);
    };

    loadWeb();
  }, [id]);

  if (!web) {
    return <p>Loading web...</p>;
  }

  return (

    <div id='web'>
      <h1>{web.title}</h1>
      <p>{web.description}</p>

      <div className="web-nodes">
        {web.nodes.map((node) => {
          const item = node.refId;

          switch (node.refModel) {
            case 'Person':
              return (
                <div
                  key={`${node.refModel}-${item._id}`}
                  className="web-node"
                >
                  <Link to={`/people/${item.slug}`}>
                    <h3>{item.name}</h3>
                  </Link>

                  {item.image && (
                    <img src={item.image} alt={item.name} />
                  )}

                  <p>{item.bio}</p>
                </div>
              );

            case 'Source':
              return (
                <div
                  key={`${node.refModel}-${item._id}`}
                  className="web-node"
                >
                  <Link to={`/sources/${item._id}`}>
                    <h3>{item.title}</h3>
                  </Link>

                  {item.image && (
                    <img src={item.image} alt={item.title} />
                  )}

                  <p>{item.description}</p>
                </div>
              );

            case 'Quote':
              return (
                <div
                  key={`${node.refModel}-${item._id}`}
                  className="web-node"
                >
                  <blockquote>{item.text}</blockquote>
                </div>
              );

            case 'Spirituality':
              return (
                <div
                  key={`${node.refModel}-${item._id}`}
                  className="web-node"
                >
                  <Link to={`/spirituality/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>

                  <p>{item.defaultDescription}</p>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Web;