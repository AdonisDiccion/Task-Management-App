import Task from '../models/taskSchema.js';
import slugify from 'slugify';

// Create Task
export async function createTask(req, res) {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const assignedTo = req.user.userId

    console.log('User', req.user);

    // Check if task already exists
    const existingTask = await Task.findOne({ title });

    if (existingTask) {
      return res.json({ message: 'Task already exist' });
    }

    // Check if status is valid
    if (status && !['To Do', 'In Progress', 'Completed'].includes(status)) {
      return res.json({ message: 'Invalid status' });
    }

    // Check if priority is valid
    if (priority && !['High', 'Medium', 'Low'].includes(priority)) {
      return res.json({ message: 'Invalid priority' });
    }

    // Check if due_date is in the future
    if (due_date && new Date(due_date) < Date.now()) {
      return res.json({ message: 'Date should be in the future' });
    }

    // Create task
    const newTask = await Task.create({
      title,
      slug: slugify(title),
      description,
      status,
      priority,
      due_date,
      assignedTo,
    });

    // Populate assigned_to
    await newTask.populate('assignedTo');

    // Send response
    res.status(201).json(newTask);
  } catch (err) {
    console.error(`Error creating task: ${err}`);
    throw err;
  }
}


// Update Task
export async function updateTask (req,res) {
  try {
    const { title, description, status, priority, due_date, assignedTo } =  req.body;
    const { taskID } = req.params;

    // Check if task exist
    const task = await Task.findById(taskID);
    if (!task) { return res.json({ message: 'Task not found!' }) }

    // Update task
    const slug = slugify(title);
    const updateData = {title, slug, description, status, priority, due_date, assignedTo};
    const updatedTask = await Task.findByIdAndUpdate(taskID, updateData, {new : true});

    // Populate assignedTo
    await updatedTask.populate('assignedTo');

    // Send response
    res.status(200).json(updatedTask);

  } catch (err) {
    console.error(`Error updating task: ${err}`);
    throw err;
  }
}


// Find all tasks
export async function listTasks (req, res) {
  try {
    const assignedTo = req.user.userId;

    // Find tasks
    const tasks = await Task.find({assignedTo}).populate('assignedTo');

    // Check if tasks is found
    if (!tasks) { return res.json({ message: 'Tasks not found!' }) }

    // Send respons
    res.status(200).json(tasks);

  } catch (err) {
    console.error(`Error finding tasks: ${err}`)
    throw err;
  }
}

// Find task via slug
export async function findTask (req, res) {
  try{
    const { slug } = req.params;

    const task = await Task.findOne({slug}).populate('assignedTo');

    //Check if task is found
    if(!task) { return res.json({message: `Task ${slug} not found`}) };


    //Send response
     res.status(200).json(task);

  } catch (err) {
    console.error(`Error finding task: ${err}`);
    throw err;
  }
}


export async function deleteTask (req, res) {
  try {
    const { taskID } = req.params;

    const task = await Task.findByIdAndDelete(taskID).populate('assignedTo');

    if(!task) {
      res.json({message: 'Cant find this task'});
    }

    res.status(200).json(task)
  } catch (error) {
    console.error(`Error deleting task: ${err}`);
    throw err;
  }
}