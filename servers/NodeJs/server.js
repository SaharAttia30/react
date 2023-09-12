const { spawn } = require("child_process");
const http = require('http');
const formidable = require('formidable');

async function runTest(imagePath) {
    // console.log("inside function11!!");
    const pyProg = spawn('python', ['try.py', imagePath]);
    const output = [];
    pyProg.stdout.on('data', (data) => {
        // console.log("inside function11" + data);
        output.push(data);
    });
    pyProg.stderr.on('data', (err) => {
        console.error("Error: " + err);
    });
    await new Promise((resolve) => {
        pyProg.on('close', (code) => {
            // console.log(`Python process exited with code ${code}`);
            const results = output.join("");
            resolve({ success: true, results });
        });
    });
    // console.log("python call ends");
    const results = output.join("");
    // console.log("inside function22" + results);
    return results;
}

const server = http.createServer((req, res) => {
    var imagePath;
    var result21 = '';
    // req.on('data', data => {
    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Error parsing form data');
            return;
        }
        imagePath = await files.image.filepath;
        // console.log(imagePath);
        // console.log("file " + imagePath);
        result21 = await runTest(imagePath);
        // console.log("outside " + result21);
        // console.log("end " + result21);
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
        res.write("res");
        res.end(result21);
    });
    // });
    // req.on('end', async () => {
    //     console.log("file " + imagePath);
    //     result21 = await runTest(imagePath);
    //     console.log("outside " + result21);
    //     console.log("end " + result21);
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //     res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
    //     res.write("res");
    //     res.end(result21);
    // });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});

// const express = require("express");
// 
// const fs = require("fs");
// const multer = require("multer");

// const app = express();

// // Set up multer middleware to handle file uploads
// const upload = multer({ dest: "uploads/" });

// // Define a route to handle image uploads and predictions
// app.post("/", upload.single("image"), (req, res) => {
//   // Get the image path from the req.file object
//   const imagePath = req.file.path;

//   // Define a promise to wait for the child process to finish
//   const runPythonScript = new Promise((resolve, reject) => {
//     // Spawn a child process to run the Python script
//     const pythonProcess = spawn("python", ["try.py", imagePath]);

//     let data = "";

//     // Listen for the output of the Python script
//     pythonProcess.stdout.on("data", (chunk) => {
//       data += chunk;
//     });

//     // Listen for any errors from the Python script
//     pythonProcess.stderr.on("data", (err) => {
//       reject(err);
//     });

//     // Listen for the exit event of the Python script
//     pythonProcess.on("exit", (code) => {
//       if (code !== 0) {
//         reject(new Error(`Python script exited with code ${code}`));
//       } else {
//         resolve(data);
//       }
//     });
//   });

//   // Wait for the promise to resolve and send the response back to the client
//   runPythonScript
//     .then((prediction) => {
//       console.log(prediction);
//       res.json({ prediction });
//     })
//     .catch((err) => {
//       console.error(`Error: ${err}`);
//       res.status(500).json({ error: "An error occurred" });
//     });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });




// let { PythonShell } = require('python-shell');
// var options = {
//     mode: 'text',
//     pythonPath: 'C:\\Users\\sahar\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: 'E:\\school\\year3\\B\\mobile\\project\\server\\nodejs\\Model_With_NodeJs_server',
//     args: ['value1', 'value2', 'value3']
// };

// async function runTest(imagePath) {
    
//     const { success, err = '', results } = await new Promise((resolve, reject) => {
//         PythonShell.run('image_processing.py', options, function (err, results) {
//             if (err) {
//                 reject({ success: false, err });
//             }
//             resolve({ success: true, results });
//         });
//     });
//     console.log("python call ends");
//     if (!success) {
//         console.log("Test Error: " + err);
//         return;
//     }
//     return (results);
// }
// const { spawn } = require('child_process');

// let { PythonShell } = require('python-shell');

// var options = {
//     mode: 'text',
//     pythonPath: 'C:\\Users\\sahar\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: 'E:\\school\\year3\\B\\mobile\\project\\server\\nodejs\\Model_With_NodeJs_server',
//     args: ['value1', 'value2', 'value3']
// };
// async function runTest(imagePath) {
//     const { success, err = '', results } = await new Promise(async (resolve, reject) => {
//         console.log("inside function11!!");
//         const pyProg = spawn('python', ['image_processing.py', imagePath]);
//         pyProg.stdout.on('data', (results) => {
//             console.log("inside function11" + results);
//             resolve({ success: true, results });
//         });
//         pyProg.stderr.on('data', (err) => {
//             reject({ success: false, err });
//         });

//     });
//     console.log("python call ends");
//     if (!success) {
//         console.log("Test Error: " + err);
//         return;
//     }
//     console.log("inside function22" + results);
//     return (results);
// } return falseeee