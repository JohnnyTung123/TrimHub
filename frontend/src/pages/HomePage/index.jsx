import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./HomePage.css";

const API_URL = "http://localhost:8080";

const HomePage = () => {
  const backgroundImage = './img/background.png';
  const { user } = useUser();
  const navigate = useNavigate();

  // const [searchQuery, setSearchQuery] = useState('');
  const [hotSalons, setHotSalons] = useState([]);
  const [newHairstyles, setNewHairstyles] = useState([]);
  const [followingHairstyles, setFollowingHairstyles] = useState([]);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await fetch(`${API_URL}/salon-info/all`);
        if (!response.ok) {
          throw new Error("Error fetching hairstyles");
        }
        const salons = await response.json();
        console.log(salons);

        salons.sort((a, b) => {
          const likeA = a.reaction.filter((r) => r.response === "like").length;
          const disLikeA = a.reaction.filter((r) => r.response === "dislike").length;
          const likeB = b.reaction.filter((r) => r.response === "like").length;
          const disLikeB = b.reaction.filter((r) => r.response === "dislike").length;
          return (likeB - disLikeB) - (likeA - disLikeA);
        });
        setHotSalons(salons.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHairstyles = async () => {
      try {
        const response = await fetch(`${API_URL}/hairstyle`);
        if (!response.ok) {
          throw new Error("Error fetching hairstyles");
        }
        const hairstyles = await response.json();
        console.log(hairstyles);

        hairstyles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNewHairstyles(hairstyles.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalons();
    fetchHairstyles();
  }, []);

  useEffect(() => {
    const fetchFollowingHairstyles = async () => {
      console.log("Going to fetch user following salon's hairstyles");
      try {
        const response = await fetch(`${API_URL}/user/followed-salons/${user._id}`);
        if (!response.ok) {
          throw new Error("Error fetching user follow salons");
        }
        const followSalons = await response.json();
        console.log(followSalons);

        const fetchHairstylesRequests = followSalons.map(async (salon) => {
          const response = await fetch(`${API_URL}/hairstyle?salonId=${salon._id}`);
          return await response.json()
        })
        const hairstyles = await Promise.all(fetchHairstylesRequests);
        console.log("Following Hairstyles:", hairstyles);
        setFollowingHairstyles([].concat(...hairstyles));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFollowingHairstyles();
  }, [user]);

  // const handleSearch = () => {
  //   // Perform search logic with the searchQuery
  //   console.log(`Searching for: ${searchQuery}`);
  // };

  // const handleChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div>
          <h1 className="text-5xl font-bold">Open a new character of your life</h1>
          <div className="flex items-center justify-center m-2">
            {/*<input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="What haircut or salon you want today?"
              className="text-xl placeholder:text-sm mr-2 p-2"
            />
            <button
              onClick={handleSearch}
              className="bg-green-700 text-white"
            >
              Search
            </button>*/}
            <button
              onClick={() => navigate("/search")}
              className="bg-green-700 text-white"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 flex min-h-screen h-full bg-gray-200">
        <div className="w-1/2 flex flex-col items-center gap-4 mr-2">
          <h2 className="text-xl font-bold">Hot Salons</h2>
          <div className="grid grid-cols-3 gap-4">
            {hotSalons.map((salon) => (
              <div key={salon._id} className="flex flex-col items-center gap-2">
                <img
                  src={`${API_URL}/salon-info/image?salonId=${salon._id}`}
                  alt={`salon ${salon._id}`}
                  onClick={() => navigate(`salon/${salon._id}`)}
                  className="h-64 object-cover cursor-pointer"
                />
                <p>{salon.salonname}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-4 ml-2">
          <h2 className="text-xl font-bold">New Hairstyles</h2>
          <div className="grid grid-cols-3 gap-4">
            {newHairstyles.map((hairstyle) => (
              <div key={hairstyle._id} className="flex flex-col items-center gap-2">
                <img
                  src={`${API_URL}/hairstyle/${hairstyle._id}`}
                  alt={`Hairstyle ${hairstyle._id}`}
                  onClick={() => navigate(`salon/${hairstyle.salon._id}`)}
                  className="h-64 object-cover cursor-pointer"
                />
                <p>{hairstyle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {user && (
        <div className="p-4 flex min-h-screen h-full bg-gray-200">
          <div className="flex flex-col items-center gap-4 ml-2">
            <h2 className="text-xl font-bold">Following Salon's Hairstyles</h2>
            <div className="grid grid-cols-6 gap-4">
              {followingHairstyles.map((hairstyle) => (
                <div key={hairstyle._id} className="flex flex-col items-center gap-2">
                  <img
                    src={`${API_URL}/hairstyle/${hairstyle._id}`}
                    alt={`Hairstyle ${hairstyle._id}`}
                    onClick={() => navigate(`salon/${hairstyle.salon._id}`)}
                    className="h-64 object-cover cursor-pointer"
                  />
                  <p>{hairstyle.salon.salonname}</p>
                  <p>{hairstyle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
