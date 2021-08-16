import { useState, useEffect } from 'react';

const useLoader = (fetchRequest, localData, isProd = false) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(localData)

  useEffect(() => {
    // If we are in production env
    if (isProd) {
      setIsLoading(true);
      fetchRequest().then((data) => {
        setData(data)
      })
        .catch((err) => console.warn("Could not fetch live data from API"))
        .finally(() => setIsLoading(false))
    }
  }, [isProd, fetchRequest])


  return [isLoading, data];
}

export default useLoader;