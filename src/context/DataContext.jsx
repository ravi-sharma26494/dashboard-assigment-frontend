import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //------------------------FOR DEVELOPMENT MODE----------------------------------------------------//
        // uncomment below for local testing environment
        //keep track of port and api endpoint used here
        // const response = await axios.get("http://localhost:5000/api/getdata");
        //------------------------FOR DEVELOPMENT MODE----------------------------------------------------//

        //------------------------FOR PRODUCTION MODE----------------------------------------------------//

        // For production:
        const response = await axios.get(
          "https://netweave-api.onrender.com/api/getdata"
        );
        //------------------------FOR PRODUCTION MODE----------------------------------------------------//

        if (response) {
          const jsonData = await response.data;
          setAppData(jsonData);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ appData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
