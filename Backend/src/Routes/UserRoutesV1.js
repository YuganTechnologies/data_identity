import express from 'express';
import passport from 'passport';
import Controller from '../Controllers/UserControllerV1';


const router = express.Router();


router.post('/login', Controller.userLogin);
router.post('/register', Controller.Register);

router.use(passport.authenticate('jwt', { session: false }));
router.post('/create-student', Controller.addstudent);


export default router;
