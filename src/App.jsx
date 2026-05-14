import React from 'react';
import Card from './Card';
import TodoList from './TodoList';
import WeatherComponent from './WeatherComponent';

function App() {
  // 1. 個人資料定義
  const me = {
    name: "蔡維馨",
    title: "你好",
    avatar: "https://www.keaitupian.cn/cjpic/frombd/0/253/28190850/1664220321.jpg",
    bio: "",
    skills: ["畫畫", "睡覺", "發呆", "做意義不明的事"],
    email: "5b2g0007@stust.edu.tw"
  };


  // 2. 團隊成員資料 (補上空的 skills 與 bio 避免 Card.jsx 報錯)
  const userData = [
    { id: 1, name: "佐伯イッテツ", title: "迷因工程師", avatar: "https://yt3.googleusercontent.com/4qnmsfZZXzXPkwb2y3cpKoTssjpp6u8Ss9Jc42EGmTuH_xWAOi8fjHNV7ailW49aGWQoHF75QA=s160-c-k-c0x00ffffff-no-rj", skills: [], bio: "" },
    { id: 2, name: "宇佐美リト", title: "肌肉擔當", avatar: "https://yt3.googleusercontent.com/jkGfABx8MsuaknGO2_22QTUW-Pr8KDY0Mh2H178BQfxaJakeeHsYW8_7-pv1_SUkYwXK4kywr9Q=s160-c-k-c0x00ffffff-no-rj", skills: [], bio: "" },
    { id: 3, name: "緋八マナ", title: "搞笑擔當", avatar: "https://yt3.googleusercontent.com/k1aBj2y8MU03gU5RXhHDN_J7ou1otAfxWhqAUTfad04RYYirsErlS5OufFrhgnbRAY7H8aw8fw=s160-c-k-c0x00ffffff-no-rj", skills: [], bio: "" },
    { id: 4, name: "赤城ウェン", title: "唐揚げ專家", avatar: "https://yt3.googleusercontent.com/WqcOc1fDhtgE2A6eHrZiaOWwNbH7IbaX-nv-PDd1Gk4G41wwKpc0mXCcKIWq_64uLyaGiJsMHQ=s160-c-k-c0x00ffffff-no-rj", skills: [], bio: "" }
  ];


  // 3. 樣式定義 (修正 containerStyle 未定義的問題)
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px'
  };


  const pageStyle = {
    backgroundColor: '#efd9eb',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };


  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: 'center' }}>我的個人卡片</h1>
      <div style={containerStyle}>
        <Card data={me} />
      </div>


      <h1 style={{ textAlign: 'center' }}>團隊成員</h1>
      <div style={containerStyle}>
        {userData.map((user) => (
          <Card key={user.id} data={user} />
        ))}
      </div>


      <h1 style={{ textAlign: 'center' }}>待辦事項</h1>
      <div style={containerStyle}>
        <TodoList />
      </div>
      
      <h1 style={{ textAlign: 'center' }}>城市天氣查詢</h1>
      <div style={containerStyle}>
        <WeatherComponent />
      </div>
    </div>
  );
}


export default App;