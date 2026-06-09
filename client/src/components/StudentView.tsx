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

type IProps = {
    student: StudentType;
    setSelectedCourse: React.Dispatch<React.SetStateAction<CourseType | null>>;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
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

export type CourseType = {
    course_id: number;
    course_title: string;
    score: null
}

export default function StudentView({student, setSelectedCourse, setOpenDialog}: IProps) {
    const [courseData, setCourseData] = useState<CourseDataType>();
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
                          onClick={() => {
                            setOpenDialog(true)
                            setSelectedCourse(course)
                          }}
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
        {/* <Dialog 
          open={openDialog}
          onOpenChange={() => setOpenDialog(false)}
        >
          <DialogContent className="fixed z-100">
            <div className="bg-white  p-6 rounded-lg shadow-xl max-w-md w-full ">
              <h3 className="text-lg font-bold mb-2  ">Course Information</h3>
              {selectedCourse && (
                <div className="space-y-2 my-4 mt-20">
                  <p className="-mt-10"><strong>Course ID:</strong> {selectedCourse.course_id}</p>
                  <p><strong>Course Title:</strong> {selectedCourse.course_title}</p>
                  <p><strong>Score:</strong></p>
                  <div className="-mt-8 ml-14">
                  <Input className="w-40 "
                    type="number"
                    value={score}
                    onChange={(e)=>setScore(Number(e.target.value))}
                  />
                  </div>
                </div>
              )}

                <div className="flex justify-center items-center gap-2 mt-4">
                  <Button 
                    onClick={() => setOpenDialog(false)}
                    className="px-4 py-2 text-sm text-black bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Confirm
                  </Button>
                </div>

            </div>
          </DialogContent>
        </Dialog> */}
      </div>    
        
    )
  }
