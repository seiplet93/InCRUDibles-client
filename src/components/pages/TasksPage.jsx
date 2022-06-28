import axios from "axios";
import ProfileForm from "../ProfileForm";
import { useState } from "react";
import Task from "../Task";

export default function TasksPage({
  initialForm,
  tasks,
  setTasks,
  profiles,
  currentProfile,
}) {
  const [form, setForm] = useState({ completed: false, initialForm });
  const handleSubmit = (e, form, setForm) => {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token,
      },
    };
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api-v1/tasks`, form, options)
      .then((response) => {
        console.log(response.data.tasks);
        setTasks(response.data.tasks);
        setForm({ description: "", completed: false });
      })

      .catch(console.warn);
  };

  const taskList = tasks.map((task, idx) => {
    return (
      <ul>
        <Task
          key={`task${task._id}`}
          task={task}
          currentProfile={currentProfile}
          profiles={profiles}
          setTasks={setTasks}
        />
      </ul>
    );
  });

  return (
    <div>
      <h1 className="text-6xl">Task Page</h1>

      <form onSubmit={(e) => handleSubmit(e, form, setForm)}>
        <label htmlFor="description">Task Description: </label>
        <input
          type="text"
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label htmlFor="completed"></label>
        <input
          type="hidden"
          id="completed"
          value={form.completed}
          onChange={(e) => setForm({ ...form, completed: e.target.value })}
        />
        <label htmlFor="account"></label>
        {/* <input type="hidden" id="account" value={account.name} /> */}
        <label htmlFor="profile"></label>
        <input
          type="hidden"
          id="profile"
          value={profiles.name}
          onChange={(e) => setForm({ ...form, profile: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>
      {taskList}
    </div>
  );
}
