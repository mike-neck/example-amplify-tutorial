import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from "aws-amplify";
import './App.css';
import {listTodos} from "./graphql/queries";
import {GraphQLResult} from "@aws-amplify/api-graphql";
import {createTodo} from "./graphql/mutations";
import { styles } from "./TodoStyles";
import {withAuthenticator} from "@aws-amplify/ui-react";

interface Item {
  name: string;
  description: string;
}

interface Todo extends Item {
  id: number;
  createdAt: number;
  updatedAt: number;
}

interface ApiResponse {
  listTodos: { items: Todo[] }
}

async function fetchTodos(): Promise<Todo[]> {
  try {
    const todoResponse = await (API.graphql(graphqlOperation(listTodos)) as Promise<GraphQLResult<ApiResponse>>);
    return todoResponse.data?.listTodos?.items ?? [];
  } catch (e) {
    const message = `error fetching todo list: ${e.message ?? "unknown error"}`
    console.log(message);
    return Promise.reject(message);
  }
}

async function addNewTodo(item: Item): Promise<void> {
  try {
    const requestTodo: Item = {...item};
    await API.graphql(graphqlOperation(createTodo, {input: requestTodo}));
  } catch (e) {
    const message = `error creating todo item[name: ${item.name}]: ${e.message ?? "unknown error"}`
    console.log(message);
    return Promise.reject(message);
  }
}

function canSendRequest(item: Item): boolean {
  return item.name.length !== 0 && item.description.length !== 0;
}

const TodoList: React.FC = () => {
  const brandNewTodo: Item = { name: "", description: "" };
  const [todoForm, setTodoForm] = useState(brandNewTodo);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  function setInput(key: "name" | "description", value: string) {
    setTodoForm({ ...todoForm, [key]: value });
  }

  useEffect(() => {
    (async () => {
      try {
        const todos = await fetchTodos();
        await setTodoList(todos);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(`${e}`);
      }
    })();
  });

  function addButtonClicked() {
    (async () => {
      try {
        if (canSendRequest(todoForm)) {
          await addNewTodo(todoForm);
          setTodoForm(brandNewTodo);
        } else {
          setErrorMessage("やること と 説明 を入力してや");
        }
      } catch (e) {
        setErrorMessage(`${e}`);
      }
    })();
  }

  return (
      <div style={styles.container}>
        <h2>Tutorial Todo List</h2>
        <p>{ errorMessage }</p>
        <label>やること</label>
        <input style={styles.input} value={todoForm.name} placeholder="やること" onChange={ e => setInput("name", e.target.value) }/>
        <br/>
        <label>説明</label>
        <input style={styles.input} value={todoForm.description} placeholder="説明" onChange={ e => setInput("description", e.target.value) }/>
        <br/>
        <button style={styles.button} onClick={addButtonClicked}>登録</button>
        <hr/>
        <ul>
        {
          todoList.map((todo: Todo) =>
            (<li key={todo.id} style={styles.todo}>
              <p style={styles.todoName}>{ todo.name }</p>
              <p style={styles.todoDescription}>{ todo.description }</p>
            </li>)
          )
        }
        </ul>
      </div>
  );
};

function App() {
  return (
      <TodoList/>
  );
}

export default withAuthenticator(App);
