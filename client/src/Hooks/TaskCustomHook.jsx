import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const INITIAL_TASK_STATE = {
  title: "",
  description: "",
  status: "To Do",
  priority: "Low",
  due_date: new Date().toISOString().split("T")[0],
};

export default function TaskCustomHook() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteSelectedTask, setDeleteSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState(INITIAL_TASK_STATE);
  const [updatingTask, setUpdatingTask] = useState(INITIAL_TASK_STATE);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  
  const TOAST_OPTIONS = {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  };

  async function loadTasks () {
    try {
      const LIST_TASK_URL = '/list-tasks'
      const { data } = await axios.get(LIST_TASK_URL);
      setTasks(data);
      if (data?.error) {
        console.error(data.error);
      } else {
        console.log("Tasks loaded successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function createTask (tasks) {
    try {
      const CREATE_TASK_URL = '/create-task'
      const { data } = await axios.post(CREATE_TASK_URL, newTask);
      if (data?.message) {
        toast.error(data.message, TOAST_OPTIONS);
      } else {
        toast.success(`${data.title} Created`, TOAST_OPTIONS);
        loadTasks();
        setIsCreateModalVisible(false);
        setNewTask(INITIAL_TASK_STATE);
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function updateTask () {
    try {
      const UPDATE_TASK_URL = '/update-task'
      const { data } = await axios.put(`${UPDATE_TASK_URL}/${selectedTask._id}`, updatingTask);
      if (data?.message) {
        toast.error(data.message, TOAST_OPTIONS);
      } else {
        toast.success(`${data.title} updated`, TOAST_OPTIONS);
        setSelectedTask(null);
        setIsUpdateModalVisible(false);
        loadTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function deleteTask () {
    try {
      const DELETE_TASK_URL = '/delete-task'
      const { data } = await axios.delete(`${DELETE_TASK_URL}/${deleteSelectedTask}`);
      if (data?.message) {
        toast.error(data.message, TOAST_OPTIONS);
      } else {
        toast.success(`${data.title} deleted`, TOAST_OPTIONS);
        loadTasks();
        setSelectedTask(null);
        setDeleteSelectedTask(null);
        setIsDeleteModalVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  function handleInputChange (e) {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  function handleUpdateInputChange (e) {
    const { name, value } = e.target;
    setUpdatingTask({ ...updatingTask, [name]: value });
  };

  return {
    tasks,
    selectedTask,
    setSelectedTask,
    deleteSelectedTask,
    setDeleteSelectedTask,
    newTask,
    setNewTask,
    updatingTask,
    setUpdatingTask,
    isCreateModalVisible,
    setIsCreateModalVisible,
    isUpdateModalVisible,
    setIsUpdateModalVisible,
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    createTask,
    updateTask,
    deleteTask,
    handleInputChange,
    handleUpdateInputChange,
  };
}
