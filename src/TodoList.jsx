import { useState } from 'react';

function TodoList() {
    // 1. 狀態管理
    const [todos, setTodos] = useState([
        { id: 1, text: '學習 useState', completed: true },
        { id: 2, text: '學習 useEffect', completed: false },
    ]);
    const [inputValue, setInputValue] = useState('');

    // 2. 事件處理：新增項目
    const handleAddTodo = () => {
        if (inputValue.trim() === '') return; // 防止輸入空白

        const newTodo = {
            id: Date.now(), // 使用時間戳記作為唯一 ID
            text: inputValue,
            completed: false,
        };

        setTodos([...todos, newTodo]); // 使用展開運算子更新陣列 (不可變性)
        setInputValue(''); // 清空輸入框
    };


    // 3. 事件處理：切換完成狀態
    const toggleTodo = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };


    // 4. 事件處理：刪除項目 (Currying 練習)
    const deleteTodo = (id) => () => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };


    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>

            {/* 輸入區域 */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="想做什麼？"
                />
                <button onClick={handleAddTodo}>新增</button>
            </div>


            {/* 列表渲染 */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px',
                            borderBottom: '1px solid #eee',
                            backgroundColor: todo.completed ? '#f9f9f9' : 'white',
                        }}
                    >
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                cursor: 'pointer',
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? 'gray' : 'black',
                            }}
                        >
                            {todo.text}
                        </span>

                        {/* 條件渲染：顯示刪除按鈕 */}
                        <button onClick={deleteTodo(todo.id)}>刪除</button>
                    </li>
                ))}
            </ul>


            {/* 條件渲染：統計未完成數量 */}
            <p>
                還有 {todos.filter(t => !t.completed).length} 件事沒做
            </p>
        </div>
    );
}

export default TodoList;