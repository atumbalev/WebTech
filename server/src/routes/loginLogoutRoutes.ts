import {Router} from 'express'

//helpers
import auth from '../helpers/auth';
import validateUserForLogin from '../helpers/validateUserForLogin';
import errorCatch from '../helpers/errorHandler'

//controller & routes
import {login, logout} from '../controller/loginLogoutController'
import projectRoutes from '../routes/projectRoutes'

const router: Router = Router();

//login-------
router.post('/login', validateUserForLogin, auth, errorCatch(login));

router.post('/logout', errorCatch(logout));


//projects
router.use('/projects', projectRoutes);

export default router;