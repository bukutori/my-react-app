import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherComponent = () => {
  const [city, setCity] = useState('Taipei'); // 使用者輸入的城市
  const [query, setQuery] = useState('Taipei'); // 真正發送請求的城市
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // API 呼叫邏輯
  useEffect(() => {
    const fetchWeather = async () => {
      // 若 query 為空則不執行
      if (!query) return;


      setLoading(true);
      setError(null);


      try {
        // 這裡使用 OpenWeather 範例 API (請記得替換成你的 API Key)
        // 註冊網址：https://openweathermap.org/api
        const API_KEY = '4b8eddb448f5e3433ada06855a4bbbfe'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
        
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        // 處理常見錯誤 (如 404 找不到城市)
        if (err.response && err.response.status === 404) {
          setError('找不到該城市，請重新輸入。');
        } else {
          setError('發生連線錯誤，請稍後再試。');
        }
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };


    fetchWeather();
  }, [query]); // 當 query 改變時，觸發 useEffect


  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(city); // 點擊按鈕後才更新 query，觸發 API 請求
  };


  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial' }}>
      {/* 搜尋列 */}
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="輸入城市名稱 (如: Tokyo)"
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>
          搜尋
        </button>
      </form>


      <hr style={{ margin: '20px 0' }} />


      {/* 狀態渲染：Loading */}
      {loading && <p>正在努力抓取天氣資料...</p>}


      {/* 狀態渲染：Error */}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}


      {/* 狀態渲染：Data */}
      {weather && !loading && (
        <div style={{ background: '#f0f8ff', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>天氣狀況：{weather.weather[0].description}</p>
          <p>濕度：{weather.main.humidity}% | 風速：{weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};


export default WeatherComponent;