import { Router } from 'express'
import projectRoutes from '../routes/projectRoutes';
import { register, login, updateInfo, getInfo } from '../controller/userController'
const router: Router = Router();

router.post('/register', register); //raboti
router.post('/login', login);//raboti
//router.post('/logout', logout);

router.put('/update', updateInfo)
router.get('/:email/personalInfo', getInfo)

//projects
router.use('/projects', projectRoutes);

export default router;