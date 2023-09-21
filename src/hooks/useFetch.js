import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reRender, setRerender] = useState(true);
    const abortController = new AbortController();
    const controller = abortController
     
 useEffect( () => {

     fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((json) => {
          setData(json)
        })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Cancelled request");
        } else {
          setError(error);
        }
      })
      .finally(() =>{
        setLoading(false)
      });
      return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError("Cancelled Request");
    }
  }

  return { data, loading, error, setRerender ,handleCancelRequest };
}