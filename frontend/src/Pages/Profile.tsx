import { NavLink, useNavigate } from "react-router-dom"
import { Card } from "../Components/Card/Card"
import { useEffect, useState } from "react"
import axios from "axios";
import { AUTH_ENDPOINTS } from "../Services/apis";
import { logout } from "../Services/operations/auth";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loaders/Loader";
import { FaRegUserCircle } from "react-icons/fa";

interface User {
  fullname: string,
  username: string,
  email: string,
  notes: [],
  savednotes: [],
}

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>({
    fullname: "",
    username: "",
    email: "",
    notes: [],
    savednotes: [],
  });
  const navigate = useNavigate();
  const storedData = localStorage.getItem('isLoggedIn');
  const loggedInUser = storedData ? JSON.parse(storedData) : null;
  const [loading, setLoading] = useState(false);

  const getUser = async (token: string) => {
    setLoading(true);
    try {
      const response = await axios.get(AUTH_ENDPOINTS.USER_INFO_API, {
        headers: {
          'Authorization': `${token}`
        }
      })
      const data = response.data?.data;
      setUser({
        username: data.username,
        fullname: data.fullname,
        email: data.email,
        notes: data.posts,
        savednotes: data.bookmarks,
      });
    } catch (error) {
      console.log("Error in getting user info")
    }
    setLoading(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
    console.log("Fetching the user details....")
    getUser(token);
  }, [])

  return (
    <div className="sm:w-[80vw] mx-auto min-h-[80vh] px-4">
      <div className="flex items-center justify-between sm:w-[60vw] mx-auto  p-4">
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="text-7xl" />
          <div>
            <h1 className="text-xl sm:text-3xl font-bold">{loggedInUser?.fullname}</h1>
            <p className="text-gray-400">{loggedInUser?.username}</p>
            <div className="flex sm:hidden gap-2 text-sm">
              <button className="px-4 bg-yellow-500 py-1 rounded-full">Edit</button>
              <button
                onClick={() => logout(navigate, dispatch)}
                className="px-4 bg-red-500 py-1 rounded-full">Logout</button>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex gap-4 text-sm">
          <button className="px-4 bg-yellow-500 py-1 rounded-full">Edit</button>
          <button
            onClick={() => logout(navigate, dispatch)}
            className="px-4 bg-red-500 py-1 rounded-full">Logout</button>
        </div>

      </div>

      <NavLink to={"/createpost"} className="mt-6 rounded-lg border-[1px] h-[50px] flex justify-center items-center bg-black hover:bg-gray-800">
        <p>Create a new notes</p>
      </NavLink>

      {/* user info from db */}
      {
        loading ? <Loader /> : <div>
          <div className="my-2 text-xl sm:text-2xl font-bold flex justify-between items-center">
            <h2>My Notes</h2>
            <h2 className="text-sm ">Total Notes : {user?.notes?.length}</h2>
          </div>

          <div className="w-full">
            {
              user?.notes?.length > 0 ? <div className="grid md:grid-cols-2 gap-2">
                {
                  user.notes.map((post, ind) => {
                    return (
                      <Card key={ind} note={post} adminView={true} />
                    )
                  })
                }
              </div> : <div>
                <h1 className="text-3xl font-bold text-center ">No Post Found</h1>
              </div>
            }
          </div>

          <div className="my-2 text-xl sm:text-2xl font-bold flex justify-between items-center">
            <h2>Saved notes</h2>
            <h2 className="text-sm ">Total Notes : {user?.savednotes?.length}</h2>
          </div>
          <div>
            {
              user?.savednotes?.length > 0 ? <div className="grid sm:grid-cols-2 gap-2">
                {
                  user.savednotes.map((post, ind) => {
                    return (
                      <Card key={ind} post={post} adminView={false} />
                    )
                  })
                }
              </div> : <div>
                <h1 className="text-3xl font-bold text-center ">No Post Found</h1>
              </div>
            }
          </div>
        </div>
      }

    </div>
  )
}

export default Profile