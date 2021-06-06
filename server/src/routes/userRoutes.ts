import * as express from 'express';
import {postUsers, getUser, updateUser} from '../controller/userCountroller'

const router: express.Router = express.Router();

// router.get('/', HelperService.errorCatch(getUsers));//raboti

router.get('/id', getUser);//raboti


router.post('/',postUsers);

// router.delete('/:id', HelperService.errorCatch(deleteUser));

router.put('/:id',updateUser);

export default router;