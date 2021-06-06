import * as express from 'express';
import HelperService from '../services/helperService'
import {getUsers, postUsers, deleteUser, updateUser} from '../controller/userCountroller'

const router: express.Router = express.Router();

router.get('/', HelperService.errorCatch(getUsers));

router.post('/',HelperService.errorCatch(postUsers));

router.delete('/:id', HelperService.errorCatch(deleteUser));

router.put('/:id',HelperService.errorCatch(updateUser));

export default router;