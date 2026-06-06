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
        <div className="flex flex-col">
            <span>First name: {student.fn}</span>
            <span>Last Name: {student.ln}</span>
            <span className="text-3xl font-semibold">Session: {courseData?.session} - Semester: {courseData?.semester}</span>
            <span className="text-5xl font-bold">Current GPA: {courseData?.gpa || "0.00"}</span>
        
            <div>
                {
                    !courseData?.courses_offered
                        ? (
                            <span>Student is yet to register their courses</span>
                        ) : (
                            <Table>
                                <TableCaption>Student Table.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Course ID</TableHead>
                                        <TableHead>Course Title</TableHead>
                                        <TableHead className="text-right">Course Score</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courseData?.courses_offered?.map((course) => (
                                        <TableRow key={course.course_id}>
                                            <TableCell className="font-medium">{course.course_id}</TableCell>
                                            <TableCell>{course.course_title}</TableCell>
                                            <TableCell className="text-right">{course.score || 0}</TableCell>
                                            <TableCell>
                                            <Button
                                                className='bg-black/80 hover:bg-black/50'
                                                onClick={()=> {
                                                    // setOpen(true)
                                                }}
                                            >
                                                View
                                            </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )
                }
            </div>
        </div>
    )
}
