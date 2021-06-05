import * as express from 'express';
import errorCatch from '../helpers/errorHandler'
import {getUsers, postUsers, deleteUser, updateUser} from '../controller/userCountroller'

const router: express.Router = express.Router();

router.get('/', errorCatch(getUsers));

router.post('/',errorCatch(postUsers));

router.delete('/:id', errorCatch(deleteUser));

router.put('/:id', errorCatch(updateUser));

export default router;