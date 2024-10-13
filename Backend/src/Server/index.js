import express from 'express';
import dotenv from 'dotenv';
import sequelizeConnector from '../Utils/DbConnector/sequelize';
import appMiddleware from '../Middleware';
import { getEnv } from '../Utils/envConfig';
const bodyParser = require('body-parser');
var path = require('path')
dotenv.config({ debug: true, path: './src/_settings.env' });
const app = express();
const multer = require('multer');

const PORT = getEnv('apiServerPort');

const handle404 = (req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Invalid API Endpoint' });
};

const handle500 = (err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: 'Something went wrong' });
};


// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });


app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {

    if (req.file) {

      res.send({
        filename: req.file.filename,
        status: true,
        message: "File Uploaded!",
      });
    } else {
      res.status(400).send({
        status: false,
        data: "File Not Found :(",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/user/v1/upload', upload.single('attachment'), async (req, res) => {


  try {
    let attachmentPath = '';


    if (req.file) {
      attachmentPath = req.file.path;
      res.send({
        filename: req.file.filename,
        status: true,
        message: "File Uploaded!",
      });
    } else {
      res.status(400).send({
        status: false,
        data: "File Not Found :(",
      });
    }


  } catch (err) {
    console.error('Error occurred while adding report:', err);
    res.status(500).json({
      success: false,
      message: 'Error occurred while adding report',
      details: err.message
    });
  }
});



app.use(bodyParser.urlencoded({ extended: true }));


app.get('/request', (req, res) => {
  res.send(`
      <html>
          <body>
              <h1>Delete PregTrack Account Request</h1>
              <form action="/delete-request" method="post">
                  <label for="mobileNumber">Mobile Number:</label>
                  <input type="text" id="mobileNumber" name="mobileNumber" required>
                  <button type="submit">Submit Request</button>
              </form>
          </body>
      </html>
  `);
});

app.post('/delete-request', (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  // Handle the delete request logic here
  console.log(`Delete request received for mobile number: ${mobileNumber}`);

  // Send response back to the user
  res.send(`
      <html>
          <body>
              <h1>Request Submitted</h1>
              <p>Your request to delete the account associated with mobile number ${mobileNumber} has been received.</p>
          </body>
      </html>
  `);
});


const initServer = (handlers) => {
  app.set('serverStarted', false);
  app.set('dbConnected', false);
  app.use(appMiddleware);

  sequelizeConnector((status, msg) => {
    if (status === 'SUCCESS') {
      app.set('dbConnected', true);
    } else app.set('dbConnected', false);
  });

  handlers.forEach((handler) => {
    app.use(handler.path, handler.router);
  });

  app.use('/static/images', express.static(path.join(__dirname, '../../images')));

  try {
    app.use(handle404);
    app.use(handle500);
    app.listen(PORT, () => {
      console.log('Server started on port ' + PORT + '...!');
    });
  } catch (e) {
    console.log('Error occurred while starting API server', e);
  }
  app.set('serverStarted', true);

  process.on('SIGINT', () => {
    console.log('SIGINT: Terminating API server...');
    process.exit(1);
  });
  app.on('close', () => {
    console.log('Server has closed');
  });

  return app;
};

export default initServer;
