import { useState } from "react";
import "./App.css";

function App() {
  // Lista de tarefas
  const [tasks, setTasks] = useState([
    { id: 1, text: "Estudar React", completed: false },
    { id: 2, text: "Fazer exercícios", completed: true },
    { id: 3, text: "Organizar o ambiente de trabalho", completed: false },
  ]);

  const [taskText, setTaskText] = useState(""); // Estado para o texto da nova tarefa

  // Função para lidar com o envio do formulário
  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") return; // Impede adição de tarefas vazias

    const newTask = {
      id: tasks.length + 1, // Gera um ID simples
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskText(""); // Limpa o campo de texto
  };

  // **Função para alternar o estado de "concluído"**
  const toggleTaskCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // **Função para excluir uma tarefa**
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              className={`task ${task.completed ? "completed" : ""}`}
              onClick={() => toggleTaskCompleted(task.id)}
            >
              {task.text}
            </span>
            <button
              className="remove-button"
              onClick={() => deleteTask(task.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
