import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [dataf, setData] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get("http://localhost:8080/");
        setData(response.data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getdata();
  }, []);

  return (
    <div>
      {dataf.map((item, index) => (
        <div key={index}>
          <p>{item.age}</p>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
