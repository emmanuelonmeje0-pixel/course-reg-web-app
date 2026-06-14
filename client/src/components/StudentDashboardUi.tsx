import { Button } from './ui/Button';
import React, {  useEffect, useState } from 'react'
 
import { IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "./ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"


import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  IconUser,
  IconId,
  IconEye,
  IconSchool,
  IconTrophy,
  IconBook,
  IconStar

} from "@tabler/icons-react";
import DrawerUi from "./DrawerUi";
import StudentView, { type CourseDataType, type CourseType } from './StudentView';
import { Dialog, DialogContent } from './ui/dialog';
import { Input } from './ui/input';
import { Trash } from 'lucide-react';
import NewCourses from './NewCourses';

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]
      const chartConfig = {
        visitors: {
          label: "Visitors",
   },
        desktop: {
          label: "Failing",
          color: "var(--chart-1)",
  },
        mobile: {
          label: "Passing",
          color: "var(--chart-2)",
  },
} satisfies ChartConfig

export type StudentType = {
 student_id:string;
 fn:string;
 ln:string;
 id: number;
 dept?:string;
 email:string;
}

export type UserType = {
 student_id:string;
 fn:string;
 ln:string;
 id: number;
 email:string;
 dept: string;
}

type Props = {
    user?: UserType
}

export default function StudentDashboardUi({user}: Props) {
    const currYear = new Date().getFullYear()
    const [timeRange, setTimeRange] = React.useState("90d")
    const [open, setOpen] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [selectedCourse, setSelectedCourse] = useState<CourseType | null>(null);
    const [score, setScore] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [courseData, setCourseData] = useState<CourseDataType>();
    const [cgpa, setCgpa] = useState<string>("0.00");
    const [selectedYear, setSelectedYear] = useState<string>(currYear.toString())
    const [selectedSemester, setSelectedSemester] = useState<string>("first")
  
    const years = Array.from(
        {length: 5},
        (_, i) => currYear - i
    )

    const filteredData = chartData.filter((item) => {
      const date = new Date(item.date)
      const referenceDate = new Date("2024-06-30")
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      } else if (timeRange === "7d") {
        daysToSubtract = 7
      }
      const startDate = new Date(referenceDate)
      startDate.setDate(startDate.getDate() - daysToSubtract)
      return date >= startDate
    })
  
    const userId = sessionStorage.getItem("user_id")

    const handleCloseDialog = () => {
      setOpenDialog(false)
    }

    // const handleUpdateScore = () => {
    //   setIsLoading(true)
    //   fetch(`http://localhost:8000/update-score/${userId}`,{
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       student_id: student?.student_id,
    //       session: courseData?.session, 
    //       semester: courseData?.semester, 
    //       score: score, 
    //       course_id: selectedCourse?.course_id
    //     })
    //   })
    //     .then((res)=> {
    //       if(res.status !== 200) {
    //         setIsLoading(false)
    //         console.log("Something went wrong")
    //       }

    //       return console.log("successful")
    //     })
    //     .then(()=> {
    //       handleCloseDialog()
    //       handleFetchCourses()
    //       getCGPA()
    //       setIsLoading(false)
    //     })
    //     .catch((err) => {
    //       setIsLoading(false)
    //       console.log(err)
    //     })
    // }

    

    const getCGPA = () => {
      if(!user?.student_id || !userId) return;
      
      const payload = {
        student_id: user?.student_id
      }
  
      fetch(`http://localhost:8000/cgpa-calculator/${userId}`, {
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
            setCgpa(data.data)
          })
          .catch((err) => console.log(err))
    }

    // useEffect(() => {
    //   const handleSetScore = () => {
    //     setScore(selectedCourse?.score || 0)
    //   }
    //   handleSetScore()
    // },[selectedCourse]);

    const handleFetchCourses = () => {
        console.log('got here 1')
        if(!user?.student_id) return;
        console.log('got here 2')
        const payload = {
            student_id: user.student_id,
            semester: selectedSemester,
            session: selectedYear
        }
        console.log('got here 3')
        fetch(`http://localhost:8000/get-reg-student-courses`, {
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
            setCourseData(data.data)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        if(!user?.student_id) return;
        handleFetchCourses()
    //   getCGPA()
    },[user?.student_id, selectedSemester, selectedYear]);
 
    return(
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ml-110 mt-5 w-[calc(100%-28rem)]">
           {/* CGPA */}
  <Card className="shadow-sm border-0 rounded-2xl w-100">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription>Current CGPA</CardDescription>
        <CardTitle className="text-4xl font-bold text-slate-800">
          4.43
        </CardTitle>
      </div>

      <div className="bg-blue-100 p-3 rounded-xl">
        <IconSchool
          size={28}
          className="text-blue-700"
        />
      </div>
    </CardHeader>

    <CardContent>
      <Badge className="bg-green-100 text-green-700">
        <IconTrendingUp size={14} />
        +12.5%
      </Badge>

      <p className="font-semibold mt-4">
        Excellent Performance
      </p>

      <p className="text-muted-foreground text-sm">
        Academic Performance Remains Strong
      </p>
    </CardContent>
  </Card><br></br>

  {/* Highest CGPA */}
  <Card className="shadow-sm border-0 rounded-2xl w-100 ml-20">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription>
          Highest CGPA In Department
        </CardDescription>

        <CardTitle className="text-4xl font-bold">
          4.71
        </CardTitle>
      </div>

      <div className="bg-orange-100 p-3 rounded-xl">
        <IconTrophy
          size={28}
          className="text-orange-600"
        />
      </div>
    </CardHeader>

    <CardContent>
      <Badge className="bg-red-100 text-red-700">
        -20%
      </Badge>

      <p className="font-semibold mt-4">
        Department Record
      </p>

      <p className="text-muted-foreground text-sm">
        Current Departmental Record
      </p>
    </CardContent>
  </Card><br></br>

  {/* Best Course */}
  <Card className="shadow-sm border-0 rounded-2xl w-100 ">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription>
          Highest Course Score
        </CardDescription>

        <CardTitle className="text-4xl font-bold">
          80
        </CardTitle>
      </div>

      <div className="bg-green-100 p-3 rounded-xl">
        <IconBook
          size={28}
          className="text-green-600"
        />
      </div>
    </CardHeader>

    <CardContent>
      <Badge className="bg-green-100 text-green-700">
        +12.5%
      </Badge>

      <p className="font-semibold mt-4">
        CSC402 Programming Languages
      </p>

      <p className="text-muted-foreground text-sm">
        Excellent Understanding
      </p>
    </CardContent>
  </Card>

  {/* Highest Score */}
  <Card className="shadow-sm border-0 rounded-2xl w-100 ml-66">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardDescription>
          Highest Score For Course
        </CardDescription>

        <CardTitle className="text-4xl font-bold">
          89
        </CardTitle>
      </div>

      <div className="bg-purple-100 p-3 rounded-xl">
        <IconStar
          size={28}
          className="text-purple-600"
        />
      </div>
    </CardHeader>

    <CardContent>
      <Badge className="bg-green-100 text-green-700">
        +4.5%
      </Badge>

      <p className="font-semibold mt-4">
        Steady Performance Increase
      </p>

      <p className="text-muted-foreground text-sm">
        Class Performance Remains Competitive
      </p>
    </CardContent>
  </Card>
  </div>

            
            <div>
                <Card className="pt-0 w-220 mt-8 ml-110">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardTitle>Area Chart - Interactive</CardTitle>
                            <CardDescription>
                                Showing total visitors for the last 3 months
                            </CardDescription>
                        </div>
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger
                                className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                                aria-label="Select a value"
                            >
                                <SelectValue placeholder="Last 3 months" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                <SelectItem value="90d" className="rounded-lg">
                                    25/26
                                </SelectItem>
                                <SelectItem value="30d" className="rounded-lg">
                                    24/25
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    23/24
                                </SelectItem>
                                <SelectItem value="7d" className="rounded-lg">
                                    22/23
                                </SelectItem>
                        </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                      config={chartConfig}
                      className="aspect-auto h-[250px] w-full"
                    >
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              }}
                              indicator="dot"
                            />
                          }
                        />
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              
            
            
            </div>
              
            
          <div className="w-180 mt-5 ml-110">

            <Button className='bg-green-700 text-white'
                onClick={()=>setOpen(true)}
            >
                Add Course
            </Button>

            <div
                className='flex justify-center items-start gap-2 flex-col'
            >
                <span>Table filter</span>
                <div className='flex items-center gap-3'>
                    <Select
                        value={selectedYear}
                        onValueChange={setSelectedYear}
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
            
            { !courseData?.courses_offered?.length
                ? (
                    <span>No record at this time</span>
                ) : (
                  <Table>
                    <TableCaption>Courses Table.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                            <div className="flex items-center gap-2">
                              <IconUser size={16}/>
                              Course Title
                            </div>
                        </TableHead>
                          <TableHead>
                            <div className="flex items-center gap-2">
                              <IconUser size={16}/>
                              Course Code
                            </div>
                          </TableHead>
                          <TableHead className="text-right ">
                            
                            Score
                            </TableHead>
                            <TableHead className="text-right ">
                            
                            Credit Load
                            </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      
                      { courseData.courses_offered.map((course) => (
                        
                          <TableRow key={course.course_id}>
                            <TableCell className="font-medium">{course.course_title}</TableCell>
                            <TableCell>{course.course_id}</TableCell>
                            <TableCell className="text-right">{course.score}</TableCell>
                            <TableCell className="text-right">{3}</TableCell>
                            <TableCell>
                              <Button
                                className=' bg-blue-900
                                  hover:bg-blue-800
                                  rounded-xl'
                                   
                                onClick={()=> {
                                  setOpenDialog(true)
                                }}
                                
                              >
                                <Trash size={18}/>
                                Delete Course
                              </Button>
                            </TableCell>
                          </TableRow>
                          
                      ))}
                    </TableBody>
                </Table>
                
                )
            }
            
        </div>

        <Dialog 
            open={open}
            onOpenChange={()=>setOpen(false)}
        >
            <DialogContent className="">
                <div className="p-6 max-w-md w-full flex flex-col justify-center items-center">
                    <h3 className="text-lg font-bold mb-2  ">Register Your Course</h3>
                    <NewCourses 
                        user={user} 
                        setOpen={setOpen}
                        handleFetchAllCourses={handleFetchCourses}
                    />
                </div>
            </DialogContent>
        </Dialog>

        <Dialog 
            open={openDialog}
            onOpenChange={handleCloseDialog}
        >
            <DialogContent className="z-2000">
                <div className="p-6 max-w-md w-full flex justify-center items-center">
                    <h3 className="text-lg font-bold mb-2  ">Are you sure you want to delete this course</h3>
                    {/* have a button here */}
                </div>
            </DialogContent>
        </Dialog>

        
     </div>
    )
}


