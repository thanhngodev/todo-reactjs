import TodoList from "./components/TodoList";
import { useCallback, useEffect, useState } from "react";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback((e) => {
    setTodoList([
      {
        id: v4(), 
        name: textInput, 
        isComplete: false,
      },
      ...todoList,
    ]);
      
    setTextInput("")
  }, [textInput, todoList]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList(
      prevState => 
        prevState.map( todo => 
          todo.id === id ? {...todo, isCompleted: true} : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Danh sách các việc cần làm</h3>
      <Textfield 
        name='add'
        placeholder='Thêm việc cần làm ...'
        elemAfterInput={
          <Button 
            isDisabled={!textInput}
            appearance='primary'
            onClick={onAddBtnClick}
          > Thêm </Button>
        }
        css={{padding: "2px 4px 2px"}}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}></TodoList>
      <Button 
        style={{
          marginTop: "5px", 
          borderRadius: "10px",
        }} 
        onClick={() => {setTodoList([])}}
      >
        reset todoList
      </Button>
    </>
  );
}

export default App;
