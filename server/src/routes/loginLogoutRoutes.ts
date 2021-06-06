import {Router} from 'express'

//helpers
import HelperService from '../services/helperService';

//controller & routes
import {login, logout, register} from '../controller/loginLogoutController';
import projectRoutes from '../routes/projectRoutes';
import UserService from '../services/userService';

const router: Router = Router();

//login-------
router.post('/login', HelperService.validateUserForLogin, HelperService.auth, login); 

router.post('/register', HelperService.validateUserForLogin, register); 

router.post('/logout', logout);


//projects
router.use('/projects', projectRoutes);

export default router;