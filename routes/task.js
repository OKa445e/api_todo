import express from 'express';
import { newTask,getMyTask, updateTask, deleteTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';


const router = express.Router();


router.post("/new",isAuthenticated,newTask);


router.get("/my",isAuthenticated,getMyTask);

router.put("/:id",isAuthenticated,updateTask)
router.delete("/:id",isAuthenticated,deleteTask);




export default router;