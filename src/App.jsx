import { useState } from "react";
import "./App.css";

// Carrega as tarefas do Local Storage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

function App() {
  // Usa o Local Storage para carregar as tarefas ao iniciar
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage);

  const [taskText, setTaskText] = useState(""); // Estado para o texto da nova tarefa

  // Função para salvar as tarefas no Local Storage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Função para lidar com o envio do formulário (adicionar uma nova tarefa)
  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskText.trim() === "") return; // Impede adição de tarefas vazias

    const newTask = {
      id: tasks.length + 1, // Gera um ID simples
      text: taskText,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask]; // Adiciona a nova tarefa na lista
    setTasks(updatedTasks); // Atualiza o estado
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
    setTaskText(""); // Limpa o campo de texto
  };

  // Função para alternar o estado de "concluído"
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Atualiza o estado
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
  };

  // Função para excluir uma tarefa
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks); // Atualiza o estado
    saveTasksToLocalStorage(updatedTasks); // Salva no Local Storage
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
