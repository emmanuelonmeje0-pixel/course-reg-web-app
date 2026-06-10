import express from "express";
import fs from "fs";
import cors from "cors";


const port = 8000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000"
  ],

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
};

const checkIfHod = (id) => {
    /** 
     * get the user id from params
     * check if the user with the id exist in users db
     * check if the user is hod
     */

    const user = hods.find(u => u.id === id && u.isHod === true)

    if(!user) {
        return null;
    }

    if(!user.isHod) {
        return null;
    }

    return user
}

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
//all api's live here
//REST API
//CRUD 
//CREATE - POST - create record
//READ - GET - reads data either
// For single it's get-user/:id, and for multiple it's get-users
//UPDATE - PUT/PATCH -changing - update-user-profile/:id
//DELETE - DELETE - delete single delete-user/:id

const data = fs.readFileSync("./src/resources/students.json", "utf-8");  // reads the mock db. the json file
const users = JSON.parse(data);
const hod_data = fs.readFileSync("./src/resources/hod.json", "utf-8");  // reads the mock db. the json file
const hods = JSON.parse(hod_data);
const reg_data = fs.readFileSync("./src/resources/reg_courses.json", "utf-8");  // reads reg course  mock db. the json file
const reg_courses = JSON.parse(reg_data);

app.post("/sign-up", (req, res) => {
    const { firstName, lastName, email, password, userId } = req.body; // data coming from the client

    try {

        if(!email.includes('@')) {
            res.json({
                message: "email is not correct",
                status_code: 200
            });
        } 

            const exist = users.find((u) => u.email === email) // check if the email exist in the db
                if(exist){
                    res.json({
                        message: "user already exist",
                        status_code: 200 
                    })
                }
        
                const newId = users.length + 1;
        
                const userData = {
                    id: newId,
                    firstName,
                    lastName,
                    email,
                    password
                } // js object
        
                users.push(userData) // push the new data inside the users array
        
                const finalData = JSON.stringify(
                                    users, null, 
                                    newId
                                ) // stringifying or in plane eng changing all the data into a json string
        
                fs.writeFileSync( 
                    "./src/constant/students.json", 
                    finalData
                ) //this will
        
                res.json({
                    message: "Successfully signed up",
                    status_code: 201
                })
        
            } catch (error) {
                console.log(error)
                res.json({
                    message: "Something went wrong",
                    status_code: 500
                })
            } 
        })
        
        app.get("/profile/:id", (req, res) => {
            /** 
             * the api should return the user details
             */
            const id = req.params.id
        
            // number === string
            // 3 === "3" -  you can compare a string to a number
            // === will check value and type 
                    
            const user = users.find((u) => u.id == Number(id))
          
            if(!user) {
              return  res.json({
                    message: "User does not exist",
                    status_code: 404
                   
                })

            }

                const userData = {
                fn: user.firstName,
                ln: user.lastName,
                email: user.email,
                id: user.id,
                
                
              }
            res.json({
                message: "Successfully",
                status_code: 200,
                data: userData
            })
        
        });
    
app.post("/student-login", (req, res) => {
    //validation
    const {email, password} = req.body
    const user = users.find((u) => u.email == email)
    console.log(user)
  
    if(!user) { //if the user does not exist
        res.json({
            message: "Login details is invalid",
            status_code: 404
        })
    } else { // user exist
        res.json({
            message: "Successfully logged in",
            status_code: 200,
            data: {
                user_id: user.id.toString(), // 1 or 2 or 3 - "1"
                user_type: "student" //true or false as string
            },
        })
    }
    
})

app.post("/hod-login", (req, res) => {
    //validation
    const {email, password} = req.body
    const user = hods.find((u) => u.email == email)
  
    if(!user) { //if the user does not exist
        res.json({
            message: "Login details is invalid",
            status_code: 404
        })
    } else { // user exist
        res.json({
            message: "Successfully logged in",
            status_code: 200,
            data: {
                user_id: user.id.toString(), // 1 or 2 or 3 - "1"
                user_type: "hod" //true or false as string
            },
        })
    }
        
    })

const gradeScale = {
  'A': 5.0, //4.1 - 5.0 = 100 - 70
  'B': 4.0, //3.1 - 4.0 = 60 - 69
  'C': 3.0, //2.1 - 3.0 = 59 - 50
  'D': 2.0, //1.4 - 2.0 = 49 - 40
  'E': 1.0, //1.0 - 1.5 = 39 - 30
  'F': 0.0 // 0.0 - 0.9 = < 29
};

app.put("/update-score/:id", (req, res) => {
    const { student_id, session, semester, score, course_id } = req.body;
    const hodId = req.params.id
    const hod = checkIfHod(Number(hodId))

    const reg_course = reg_courses.find((c) => // get all the registered courses of the student
        c.student_id === student_id &&
        c.session === session &&
        c.semester === semester
    ) //[]

    // if() - return an error msg if course does not exist
    // registered courses not found for this student

    let course = reg_course.courses_offered.find((c) => c.course_id === course_id) // get the course that we want to change the score
  
    // if() - return an error msg if course does not exist
    // Course not found

    course.score = score;
    let scale = 0
    for(let v in gradeScale) {
        if(score >= 70) {
            scale = gradeScale['A']
        } else if(score >= 60) {
            scale = gradeScale['B']
        } else if(score >= 50) {
            scale = gradeScale['C']
        } else if(score >= 40) {
            scale = gradeScale['D']
        } else if(score >= 30) {
            scale = gradeScale['E']
        } else {
            scale = gradeScale['F']
        }
    }
    course.scale = scale;

    let total_quality_point = 0
    reg_course.courses_offered.map((course) => {
       const quality_point = course.credit_load * course.scale || 0
       total_quality_point += quality_point
    })
    reg_course.gpa = (total_quality_point/reg_course.total_credit_load).toFixed(2)

    const finalData = JSON.stringify(
        reg_courses, null
    )

    fs.writeFileSync( 
        "./src/resources/reg_courses.json", 
        finalData
    )

    res.json({
        message: "Successfully updated score",
        status_code: 200
    })

})

app.put("/cgpa-calculator/:hodId", (req, res) => {
    /**
     * BODMAS
     * GPA = sum(Course Grade Points X Course Credits) / sum(Total Course Credits)
     * CGP=score
     * credit=2
     * TCG=addition the credit load for the semester
     * 
     * 1. multiply the score by the credit "101: score * credit_load; 102: score * credit_load"
     * 2. sum all the no 1
     * 3. sum all credit load per semester
     */
    const { student_id } = req.body;
    const hodId = req.params.hodId
    const hod = checkIfHod(Number(hodId))

    const student_reg_courses = reg_courses.filter((c) => 
        c.student_id === student_id
    )

    const totalQualityPoints = student_reg_courses.reduce(
        (sum, semester) => sum + (semester.gpa * semester.total_credit_load), 0
    )

    const total_credit = student_reg_courses.reduce(
        (sum, semester) => sum + semester.total_credit_load, 0
    )
  
    const cgpa = totalQualityPoints / total_credit //cap it to 5.0
    const finalCgpa = cgpa > 5.0 ? 5.0 : cgpa

    res.json({
        message: "Successful",
        status_code: 200,
        data: cgpa.toFixed(2)
    })

})

app.get("/get-students/:id", (req, res) => {
    /**
     * get id from params
     * check if hod
     * use the user's dept field to fetch the students in the dept
     * return all the student of the dept
     */
     

    const id = req.params.id
    
    if(!id) {
        res.json({
            message: "Please provide user id."
        })
    }

    const hod = checkIfHod(Number(id))

    if(!hod) {
        res.json({
            message: "You are authorized"
        })
    }
      
    const students = users
        .filter(u => u.dept === hod.dept)
        .map(u => ({
            student_id: u.student_id,
            fn: u.firstName,
            ln: u.lastName,
            id: u.id,
            dept: u.dept,
            email: u.email
        }));

    res.json({
        message: 'Successful',
        data: students
    })

})
        
app.put('/get-reg-courses', (req, res) => {

    const { hodId, session, semester, student_id } = req.body

    if(!hodId) {
        res.json({
            message: "Please provide user id."
        })
    }

    const hod = checkIfHod(Number(hodId))

    if(!hod) {
        res.json({
            message: "You are authorized"
        })
    }

    const student = users.find(u => u.student_id === student_id);

    // assignment - if the student is not available
    const registered_courses = reg_courses.find(c => 
        c.student_id === student.student_id &&
        c.session === session &&
        c.semester === semester
    )

    // assignment - if the registered_courses is not available

    res.json({
        message: 'Successful',
        data: registered_courses
    })

})


app.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
})