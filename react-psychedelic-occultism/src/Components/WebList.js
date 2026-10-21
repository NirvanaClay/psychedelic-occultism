import { useEffect, useState } from "react";
import { fetchWebs } from "../api/webs.js";
import { Link } from 'react-router-dom';


const nodeTypeMap = {
  Person: {
    endpoint: "people",
    displayField: "name",
  },
  Source: {
    endpoint: "sources",
    displayField: "title",
  },
  Quote: {
    endpoint: "quotes",
    displayField: "text",
  },
  Experience: {
    endpoint: "experiences",
    displayField: "title",
  },
  Technique: {
    endpoint: "techniques",
    displayField: "name",
  },
};

const WebList = () => {
  const [webs, setWebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWebs = async () => {
      try {
        const data = await fetchWebs();
        const updatedWebs = await fetchNodeDetailsForWebs(data);
        setWebs(updatedWebs);
      } catch (err) {
        console.error("Failed to load webs:", err);
        setError("Failed to load webs.");
      } finally {
        setLoading(false);
      }
    };

    loadWebs();
  }, []);

  const fetchNodeDetailsForWebs = async (webs) => {
    return Promise.all(
      webs.map(async (web) => {
        if (!web.nodes?.length) return web;

        const updatedNodes = await Promise.all(
          web.nodes.map(async (node) => {
            try {
              const nodeConfig = nodeTypeMap[node.refModel];

              if (!nodeConfig) {
                throw new Error(
                  `Unknown node model: ${node.refModel}`
                );
              }

              const response = await fetch(
                `http://localhost:3001/api/${nodeConfig.endpoint}/${node.refId}`
              );

              if (!response.ok) {
                throw new Error("Failed to fetch node details");
              }

              const nodeData = await response.json();

              return {
                ...node,
                data: nodeData,
              };
            } catch (error) {
              console.error(
                `Error fetching ${node.refModel} with ID ${node.refId}:`,
                error
              );

              return {
                ...node,
                data: {
                  error: "Failed to load data",
                },
              };
            }
          })
        );

        return {
          ...web,
          nodes: updatedNodes,
        };
      })
    );
  };

  console.log("webs are:")
  console.log(webs)

  if (loading) return <p>Loading webs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

return (
  <div>
    <h2>All Webs</h2>

    {webs.length === 0 ? (
      <p>No webs found.</p>
    ) : (
      <ul>
        {webs.map((web) => (
          <li key={web._id}>
            <Link to={`/webs/${web._id}`}>
              <strong>{web.title}</strong>
            </Link>

            {web.description && <p>{web.description}</p>}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default WebList;