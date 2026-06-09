import { useEffect, useState } from "react";
import type { StudentType } from "./AdminDashboardUi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { Button } from "./ui/Button";
import { AppDialog } from "./AppDialog";
import { Dialog } from "./ui/dialog";
import { Input } from "./ui/input";

type IProps = {
    student: StudentType;
}

type CourseDataType = {
    student_id: string;
    dept: string;
    session: string;
    semester: string;
    courses_offered: CourseType[];
    total_course: number,
    gpa: null
}

type CourseType = {
    course_id: number;
    course_title: string;
    score: null
}

export default function StudentView({student}: IProps) {
    const [courseData, setCourseData] = useState<CourseDataType>();
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

    const userId = sessionStorage.getItem("user_id")

    useEffect(() => {
        const payload = {
            student_id: student.student_id,
            semester: "first",
            session: "2023",
            hodId: userId
        }

        fetch(`http://localhost:8000/get-reg-courses`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(payload)
        })
            .then((res)=> {
            if(res.status !== 200) {
                console.log("Something went wrong")
            }

            return res.json() 
            })
            .then((data)=> setCourseData(data.data))
            .catch((err) => console.log(err))
    },[student, userId]);

    return (
        
  <div className="p-6 space-y-6">
    {/* Header */}
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        🎓
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          {student.fn} {student.ln}
        </h1>
        <p className="text-gray-500">Student</p>
      </div>
    </div>

    {/* Student Details */}
    <div className="bg-white rounded-xl shadow p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm">First Name</p>
          <h3 className="font-semibold">{student.fn}</h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Last Name</p>
          <h3 className="font-semibold">{student.ln}</h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Session</p>
          <h3 className="font-semibold">
            {courseData?.session || "N/A"}
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Semester</p>
          <h3 className="font-semibold">
            {courseData?.semester || "N/A"}
          </h3>
        </div>
      </div>
    </div>

    {/* GPA Card */}
    <div className="bg-gradient-to-r from-indigo-900 to-blue-700 rounded-xl p-6 text-white">
      <p className="text-blue-200">Academic Overview</p>

      <h2 className="text-xl font-semibold mt-2">
        Current GPA
      </h2>

      <div className="text-6xl font-bold mt-4">
        {courseData?.gpa || "0.00"}
      </div>
    </div>

    {/* Courses */}
    {!courseData?.courses_offered?.length ? (
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold">
          Not Registered Yet
        </h3>

        <p className="text-gray-500 mt-2">
          Student is yet to register any courses.
        </p>
      </div>
    ) : (
      <Table>
        <TableCaption>Registered Courses</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Course ID</TableHead>
            <TableHead>Course Title</TableHead>
            <TableHead className="text-right">
              Score
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courseData.courses_offered.map((course) => (
            <TableRow key={course.course_id}>
              <TableCell>{course.course_id}</TableCell>
              <TableCell>{course.course_title}</TableCell>
              <TableCell className="text-right">
                {course.score || 0}
              </TableCell>
              {/* 2. NEW: Action button cell placed right next to the score */}
      <TableCell className="text-right">
        <Button 
          onClick={() => setSelectedCourse(course)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Manage
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>
    )
  }
{/* 3. NEW: The Dialogue box that opens when selectedCourse is set */}
<Dialog 
open={!!selectedCourse}
onOpenChange={() => 
   setSelectedCourse(null)}
>
{selectedCourse && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center -mt-50 ">
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-xl max-w-md w-full border border-zinc-200 dark:border-zinc-800 -mt-20">
      <h3 className="text-lg font-bold mb-2  ">Course Information</h3>
      
      <div className="space-y-2 my-4 mt-20">
        <p className="-mt-10"><strong>ID:</strong> {selectedCourse.course_id}</p>
        <p><strong>Title:</strong> {selectedCourse.course_title}</p>
        <p><strong>score:</strong></p>
        <div className="-mt-8 ml-14">
        <Input className="w-10"
         
        >
        </Input>
        </div>
      </div>
</div>


  <div className="flex justify-end gap-2 mt-27  -ml-80 ">
        <Button 
          onClick={() => setSelectedCourse(null)}
          className="px-4 py-2 text-sm text-black bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded"
        >
          Cancel
        </Button>
        <Button 
          onClick={() => {
            
            setSelectedCourse(null);
          }}
          className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Confirm
        </Button>
      </div>
    </div>
  
)}
</Dialog>

          
        
        
  
      
  
</div>    
  
    )
  }
