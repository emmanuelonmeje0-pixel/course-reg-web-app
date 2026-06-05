import { useEffect, useLayoutEffect, useState } from 'react'
import Student from './StudentPage';
import Admin from './AdminPage';

export default function DashBoard() {
    const [type, setType] = useState<string>("student")
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    // const [error, setErr] = useState(false)

    /**
     * fn, ln, pass, email
     * 
     */

    useEffect(() => {
        const profile = async () => {
            try {
                setIsLoading(true)
                const user_id = sessionStorage.getItem("user_id")
                const response = await fetch(`http://localhost:8000/profile/${user_id}`, { method: "GET" })
                const data = await response.json()
                setUser(data.data);

            return data;
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
            
        }

        profile()
    },[]);
    console.log(user,"user_data")

    useLayoutEffect(() => {
        const check = () => {
            console.log("user_data")
            const user_type = sessionStorage.getItem("user_type")
            setType(user_type as string)
        }

        check()
    },[])

    return (
        <div>
            {
                type === "hod" 
                    ? (<Admin isLoading={isLoading} user={user} />) 
                    : (<Student isLoading={isLoading} user={user} />)
            }
        </div>
    )
}