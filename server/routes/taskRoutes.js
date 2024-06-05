import express from 'express';

const router = express.Router();

// Controllers
import { createTask, updateTask, listTasks, findTask, deleteTask } from '../controllers/taskController.js';

// Middlewares
import { requireSignIn } from '../middleware/authMiddleware.js';

router.post('/create-task', requireSignIn, createTask);
router.put('/update-task/:taskID', requireSignIn, updateTask);
router.get('/list-tasks', requireSignIn, listTasks);
router.get('/find-task/:slug', requireSignIn, findTask);
router.delete('/delete-task/:taskID', requireSignIn, deleteTask);

// Secret test
router.post('/secret', requireSignIn, (req, res) => {
    return res.status(200).json({message: 'Hello world'})
});

export default router; 