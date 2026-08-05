import { useState, useEffect } from "react";
import { fetchWebs } from "../api/webs.js"; // Import API function

const WebList = () => {
  const [webs, setWebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWebs = async () => {
      try {
        const data = await fetchWebs(); // Fetch webs from API
        const updatedWebs = await fetchNodeDetailsForWebs(data);
        setWebs(updatedWebs);
      } catch (err) {
        setError("Failed to load webs.");
      }
      setLoading(false);
    };

    loadWebs();
  }, []);

  const endpointMap = {
  Person: "people",
  Book: "sources",
  Quote: "quotes",
  Experience: "experiences",
  Technique: "techniques",
  };

  // Function to fetch node details based on model type
  const fetchNodeDetailsForWebs = async (webs) => {
    const updatedWebs = await Promise.all(
      webs.map(async (web) => {
        if (!web.nodes || web.nodes.length === 0) return web;

        const updatedNodes = await Promise.all(
          web.nodes.map(async (node) => {
            try {
              // Special case for "Person" → "People"
              const endpoint =
                endpointMap[node.refModel] ??
                `${node.refModel.toLowerCase()}s`;
                // node.refModel.toLowerCase() === "person"
                //   ? "people"
                //   : node.refModel.toLowerCase() === "book"
                //   ? "sources"
                //   : `${node.refModel.toLowerCase()}s`;
        
              const response = await fetch(`http://localhost:3001/api/${endpoint}/${node.refId}`);
              if (!response.ok) throw new Error("Failed to fetch node details");
        
              const nodeData = await response.json();
              return { ...node, data: nodeData }; // Attach the actual data to the node
            } catch (error) {
              console.error(`Error fetching ${node.refModel} with ID ${node.refId}:`, error);
              return { ...node, data: { error: "Failed to load data" } };
            }
          })
        );
        

        return { ...web, nodes: updatedNodes };
      })
    );

    return updatedWebs;
  };

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
              <strong>{web.title}</strong>
              {web.description && <p>{web.description}</p>}
              
              {/* Display nodes if available */}
              {web.nodes && web.nodes.length > 0 ? (
                <ul>
                  {web.nodes.map((node, index) => (
                    <li key={index}>
                      <strong>Type:</strong> {node.refModel} <br />
                      {node.data && !node.data.error ? (
                        <>
                          <strong>Details:</strong>{" "}
                          {node.refModel === "Person"
                            ? node.data.name
                            : node.refModel === "Quote"
                            ? node.data.text
                            : node.refModel === "Book"
                            ? node.data.title
                            : node.refModel === "Experience"
                            ? node.data.title
                            : node.refModel === "Technique"
                            ? node.data.name
                            : JSON.stringify(node.data)} {/* Default to JSON for unknown models */}
                        </>
                      ) : (
                        <p style={{ color: "red" }}>Failed to load data</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No nodes in this web.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default WebList;
