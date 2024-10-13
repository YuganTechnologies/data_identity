import express from 'express';
import passport from 'passport';
import Controller from '../Controllers/UserControllerV1';


const router = express.Router();


router.post('/login', Controller.userLogin);
router.post('/register', Controller.Register);

router.use(passport.authenticate('jwt', { session: false }));
router.post('/create-student', Controller.addstudent);
router.post('/update-student', Controller.updatestudent);
router.post('/get-student', Controller.getstudent);
router.post('/getall-student', Controller.getallstudent);
router.post('/get-editstudent', Controller.getEditstudent);
router.post('/add-missing-id', Controller.addmissingid);



export default router;
