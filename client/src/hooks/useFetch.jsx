import React,{useEffect, useState} from 'react'

const useFetch =(url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleData = (newData)=> setData([...data,newData])

  useEffect(() => {
    setLoading(true);
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> setData(data))
    .finally(()=> setLoading(false))
  }, [])
  

  return { data, loading, handleData}
}

export default useFetch