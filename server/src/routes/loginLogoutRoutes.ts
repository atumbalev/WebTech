import {Router} from 'express'

//helpers
import HelperService from '../services/helperService';

//controller & routes
import {login, logout} from '../controller/loginLogoutController'
import projectRoutes from '../routes/projectRoutes'

const router: Router = Router();

//login-------
router.post('/login', HelperService.validateUserForLogin, HelperService.auth, HelperService.errorCatch(login));

router.post('/logout', HelperService.errorCatch(logout));


//projects
router.use('/projects', projectRoutes);

export default router;