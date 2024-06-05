import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal2 from "../components/Modal2";
import { MdOutlineRemove, MdOutlineEdit, MdAdd } from "react-icons/md";

export default function HomePage() {
  // Add State For Get Tasks
  const [tasks, setTasks] = useState([]);
  // Add State For Updating Task
  const [selectedTask, setSelectedTask] = useState(null);
  // Add taskSave
  const [updatingTask, setUpdatingTask] = useState({
    uTitle: "",
    uDescription: "",
    uStatus: "",
    uPriority: "",
    uDue_date: "",
  });
  const [deleteSelectedTask, setDeleteSelectedTask] = useState(null);

  // destructure updating task
  const { uTitle, uDescription, uStatus, uPriority, uDue_date } = updatingTask;

  // Initial state
  const initialTaskState = {
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
    due_date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  };
  // Add State For Creating Task
  const [newTask, setNewTask] = useState(initialTaskState);

  const { title, description, status, priority, due_date } = newTask;

  // input change for create
  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  }

  // input change for update
  function handleUpdateInputChange(e) {
    const { name, value } = e.target;
    setUpdatingTask({ ...updatingTask, [name]: value });
  }

  // Add State Create For Modal
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // Add State Update For Modal
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  // Add useEffect
  useEffect(() => {
    loadTasks();
  }, []);

  // Add Fetching Of Task
  async function loadTasks() {
    try {
      const { data } = await axios.get("/list-tasks");
      setTasks(data);
      console.log(data);

      if (data?.error) {
        console.log(data?.error);
      } else {
        console.log("success");
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Create Task Function
  async function createTask(task) {
    try {
      const { data } = await axios.post("/create-task", {
        ...newTask,
      });

      console.log("data:", data);

      if (data?.message) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success(`${data.title} Created`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        loadTasks();
        setIsCreateModalVisible(false);
        setNewTask(initialTaskState);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Update Task function
  async function updateTask() {
    try {
      const { data } = await axios.put(`/update-task/${selectedTask._id}`,{
        title: uTitle,
        description: uDescription,
        status: uStatus,
        priority: uPriority,
        due_date: uDue_date
      });

      console.log(data);

      if (data?.message) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success(`${data.title} updated`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setSelectedTask(null);
        setIsUpdateModalVisible(false);
        loadTasks();   
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Delete Task
  async function deleteTask(){
    try {
      const { data } = await axios.delete(`/delete-task/${deleteSelectedTask}`)
      console.log(data)

      if (data?.message) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.success(`${data.title} deleted`, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        loadTasks();
        setSelectedTask(null);
        setDeleteSelectedTask(null);
        setIsDeleteModalVisible(false);              
      }
    } catch (err) {
      console.error(err);
    }
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const inputStyle = "bg-[#23313e] rounded-full p-1 px-4 text-xs w-full";

  return (
    
    <>
    {tasks.length === 0 ? (
      <div
      onClick={() => setIsCreateModalVisible(true)}
      className="flex items-center justify-center rounded-md border-4 cursor-pointer bg-none opacity-50 hover:opacity-100 py-16 px-28"
    >
      <MdAdd className="text-white-500 text-[100px] font-bold bg-green-500 border-2 border-green-500 rounded-full hover:text-white hover:border-green-500 cursor-pointer" />
    </div>
    ): (
      <div>
        <div className="text-white font-JetBrains font-bold grid grid-cols-4 gap-5 h-[500px] overflow-hidden overflow-y-scroll p-2 border-[2.5px] rounded-md">
          {tasks.map((t) => (
            <div
              key={t._id}
              className="border-4 border-[#161515] w-[400px] bg-[#2b2839] rounded-md shadow-2xl"
            >
              <div className="border-b-4 border-[#161515] bg-[#e3e3e3] py-1 px-2 flex items-center gap-1">
                <MdOutlineRemove
                  onClick={() => {setIsDeleteModalVisible(true) ;setSelectedTask(t); setDeleteSelectedTask(t._id)}}
                  className="text-red-500 font-bold bg-red-500 border-2 border-red-500 rounded-full hover:text-white hover:border-red-500 cursor-pointer" />
                <MdOutlineEdit
                  onClick={() => {
                    setIsUpdateModalVisible(true);
                    setSelectedTask(t);
                    setUpdatingTask({
                      uTitle: t.title,
                      uDescription: t.description,
                      uStatus: t.status,
                      uPriority: t.priority,
                      uDue_date: new Date(t.due_date).toISOString().split("T")[0],
                    });
                  }}
                  className="text-blue-500 font-bold bg-blue-500 border-2 border-blue-500 rounded-full hover:text-white hover:border-blue-500 cursor-pointer"
                />
              </div>
              <div className="py-1 px-2">
                <div className="flex">
                  <span className="flex-1">TITLE:</span> <span>{t.title}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">DESCRIPTION:</span>{" "}
                  <span>{t.description}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">STATUS:</span>{" "}
                  <span>{t.status}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">PRIORITY:</span>{" "}
                  <span>{t.priority}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">DUE-DATE:</span>{" "}
                  <span>
                    {new Date(t.due_date).toLocaleDateString("en-US", options)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setIsCreateModalVisible(true)}
            className="flex items-center justify-center rounded-md border-4 cursor-pointer bg-none opacity-50 hover:opacity-100"
          >
            <MdAdd className="text-white-500 text-[100px] font-bold bg-green-500 border-2 border-green-500 rounded-full hover:text-white hover:border-green-500 cursor-pointer" />
          </div>
        </div>
      </div>
    )}
      

      {/* CREATE MODAL */}
      <Modal2
        title={"CREATE TASK"}
        proceedBtn={"CREATE"}
        proceedFunction={createTask}
        abortBtn={"CANCEL"}
        abortFunction={() => setIsCreateModalVisible(false)}
        visible={isCreateModalVisible}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 my-6">
          <input
            className={inputStyle}
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="title"
            onChange={handleInputChange}
          />
          <input
            className={inputStyle}
            type="text"
            name="description"
            id="description"
            value={description}
            placeholder="description"
            onChange={handleInputChange}
          />
          <select
            className={inputStyle}
            name="status"
            id="status"
            value={status}
            onChange={handleInputChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            className={inputStyle}
            name="priority"
            id="priority"
            value={priority}
            onChange={handleInputChange}
          >
            <option value="">- select -</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            className={inputStyle}
            type="date"
            name="due_date"
            id="due_date"
            value={due_date}
            onChange={handleInputChange}
          />
        </form>
      </Modal2>

      {/* UPDATE MODAL */}
      <Modal2
        title={`UPDATE { ${selectedTask?.title} }`}
        proceedBtn={"UPDATE"}
        proceedFunction={updateTask}
        abortBtn={"CANCEL"}
        abortFunction={() => setIsUpdateModalVisible(false)}
        visible={isUpdateModalVisible}
      >
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4 my-6">
          <input
            className={inputStyle}
            type="text"
            name="uTitle"
            id="uTitle"
            value={uTitle}
            placeholder="title"
            onChange={handleUpdateInputChange}
          />
          <input
            className={inputStyle}
            type="text"
            name="uDescription"
            id="uDescription"
            value={uDescription}
            placeholder="description"
            onChange={handleUpdateInputChange}
          />
          <select
            className={inputStyle}
            name="uStatus"
            id="uStatus"
            value={uStatus}
            onChange={handleUpdateInputChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            className={inputStyle}
            name="uPriority"
            id="uPriority"
            value={uPriority}
            onChange={handleUpdateInputChange}
          >
            <option value="">- select -</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            className={inputStyle}
            type="date"
            name="uDue_date"
            id="uDue_date"
            value={uDue_date}
            onChange={handleInputChange}
          />
        </form>
      </Modal2>

      {/* DELETE MODAL */}
      <Modal2
        title={`DELETE { ${selectedTask?.title} }`}
        proceedBtn={"DELETE"}
        proceedFunction={deleteTask}
        abortBtn={"CANCEL"}
        abortFunction={() => setIsDeleteModalVisible(false)}
        visible={isDeleteModalVisible}
      >

      </Modal2>
    </>
  );
}
