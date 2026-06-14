import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input";
import { Button } from "./ui/Button";
import type { UserType } from "./StudentDashboardUi";

type Props = {
    user?: UserType,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleFetchAllCourses: ()=>void
}

export default function NewCourses({user, setOpen, handleFetchAllCourses}: Props) {
    const currYear = new Date().getFullYear()
    const [courses, setCourses] = useState([]);
    const [selectedCourseCode, setSelectedCourseCode] = useState("")
    const [selectedCourse, setSelectedCourse] = useState<any>(null)
    const [selectedYear, setSelectedYear] = useState<string>(currYear.toString())
    const [selectedSemester, setSelectedSemester] = useState<string>("first")
      
    const years = Array.from(
        {length: 4},
        (_, i) => currYear - i
    )

    const handleFetchCourses = () => {
        const payload = {
            dept: "comp",
            semester: selectedSemester,
            session: selectedYear
        }
  
        fetch(`http://localhost:8000/get-courses-by-session`, {
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
        .then((data)=> {
          setCourses(data.data)
        })
        .catch((err) => console.log(err))
    }

    const handleRegisterCourse = async () => {
        const payload = {
            student_id: user?.student_id,
            dept: user?.dept,
            course_id: selectedCourse?.course_id,
            course_title: selectedCourse?.course_title,
            credit_load: selectedCourse?.credit_load,
            semester: selectedSemester,
            session: selectedYear
        };

        try {
            const res = await fetch("http://localhost:8000/register-course", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                console.log(data.message || "Something went wrong");
                return;
            }

            setOpen(false);

            handleFetchAllCourses();

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleFetchCourses()
    },[selectedYear, selectedSemester]);

    return (
        <div className="flex flex-col gap-4">
            <div
                className='flex justify-center items-start gap-2 flex-col'
            >
                <span>Select session and semester</span>
                <div className='flex items-center gap-3'>
                    <Select
                        value={selectedYear}
                        onValueChange={(v)=>{
                            setSelectedCourseCode("")
                            setSelectedCourse(null)
                            setSelectedYear(v)
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                { years.map((year) => (
                                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        value={selectedSemester}
                        onValueChange={setSelectedSemester}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="first">First Semester</SelectItem>
                            <SelectItem value="second">Second Semester</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Select
                value={selectedCourseCode}
                onValueChange={(value) => {
                    setSelectedCourseCode(value)

                    const course = courses.find(
                        (c: any) => c.course_id === value
                    );
                    setSelectedCourse(course)
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        { courses.map((course, index) => (
                            <SelectItem className="text-black"
                                key={index} 
                                value={course.course_id}
                            >{course.course_id}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="flex flex-col gap-1">
                <Input
                    value={selectedCourse?.course_id || ""}
                    placeholder="Course Name"
                    readOnly
                />
                <Input
                    value={selectedCourse?.course_title || ""}
                    placeholder="Course Title"
                    readOnly
                />
                <Input
                    value={selectedCourse?.credit_load || ""}
                    placeholder="Course Load"
                    readOnly
                />
            </div>

            <div className="flex gap-3 items-center justify-center">
                <Button className="bg-green-600"
                    onClick={handleRegisterCourse}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}
