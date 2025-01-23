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

    // Criando um objeto para representar a nova tarefa
    const newTask = {
      id: tasks.length + 1, // Gera um ID simples
      text: taskText, // O texto digitado pelo usuário
      completed: false, // Novas tarefas começam como pendentes
    };

    // Atualiza o estado da lista de tarefas
    setTasks([...tasks, newTask]); // Adiciona a nova tarefa à lista
    setTaskText(""); // Limpa o campo de texto
  };

  return (
    <>
      <div>
        <h1>Task Tracker</h1>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Nova tarefa"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)} // Atualiza o estado ao digitar
          />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text} - {task.completed ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
