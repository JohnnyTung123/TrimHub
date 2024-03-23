import React, { useEffect, useState } from "react";

const SalonProfile = ({ user }) => {
  const [salonId, setSalonId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [salonImage, setSalonImage] = useState(null);
  const [newSalonImage, setNewSalonImage] = useState(null);

  const fetchSalonInfo = async () => {
    try {
      console.log(name);
      const response = await fetch(`http://localhost:8080/salon-info?name=${user.username}`);
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      const data = await response.json();
      setSalonId(data._id);
      setName(data.name);
      setAddress(data.address || "");
    } catch (err) {
      console.error(err);
    }

    try {
      console.log(name);
      const response = await fetch(`http://localhost:8080/salon-info/image?name=${user.username}`);
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      const data = await response.blob();
      setSalonImage(URL.createObjectURL(data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchSalonInfo();
  }, []);

  const changeSalonInfo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/salon-info/${salonId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
        }),
      });
      if (!response.ok) {
        throw Error("Cannot update data.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadSalonImage = async () => {
    const formData = new FormData();
    formData.append("salon-image", newSalonImage);

    try {
      const response = await fetch(`http://localhost:8080/salon-info/image/${salonId}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        throw Error("Cannot update data.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col self-center mx-auto w-[80vw]">
      <div className="flex gap-3 self-start px-5 text-3xl text-black max-md:flex-wrap">
        <div className="shrink-0 w-3.5 h-10 bg-green-700" />
        <div className="flex-auto self-start mt-3 border border-black border-solid max-md:max-w-full">
          Salon management - change information
        </div>
      </div>
      <div className="mt-8 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10">
              <img
                loading="lazy"
                src={salonImage}
                className="w-full border border-black border-solid aspect-[0.81]"
              />
              <input type="file" accept="image/*" onChange={(e) => setNewSalonImage(e.target.files[0])} />
              <div className="flex flex-col pr-12 pl-4 mt-8 max-md:pr-5">
                <div className="flex flex-col justify-center self-end max-w-full text-3xl text-white rounded-xl bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[282px]">
                  <button onClick={uploadSalonImage} className="justify-center px-6 py-4 rounded-xl border border-white border-solid bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
                    Upload new photo
                  </button>
                </div>
                <div className="self-start mt-8 text-4xl text-black">
                  Hairstyle:
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="py-px pl-2 border border-black border-solid bg-zinc-300 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch px-5 my-auto text-3xl text-black max-md:mt-10">
                      <div>Salon Name</div>
                      <div className="self-center mt-28 text-center max-md:mt-10">
                        Address
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[82%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow py-8 pr-14 pl-6 w-full text-3xl text-black bg-white border border-black border-solid max-md:px-5 max-md:mt-1.5 max-md:max-w-full">
                      <form onSubmit={changeSalonInfo}>
                        <div className="justify-center py-7 bg-white rounded-xl border border-black border-solid max-md:max-w-full">
                          <label>Salon Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="justify-center py-6 mt-12 bg-white rounded-xl border border-black border-solid max-md:mt-10 max-md:max-w-full">
                          <label>Address</label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <button type="submit">Change salon information</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center self-end mt-9 max-w-full text-3xl text-white rounded-xl bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[345px]">
                <div className="justify-center px-2.5 py-4 rounded-xl border border-white border-solid bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                  Change salon infromation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col self-center mt-7 w-full text-3xl text-white whitespace-nowrap max-w-[1093px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-9 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-7 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-8 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-8 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-8 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-7 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-7 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <img
              loading="lazy"
              srcSet="..."
              className="self-center border border-black border-solid aspect-[0.75] w-[150px]"
            />
            <div className="justify-center px-6 py-2 mt-7 rounded-xl border border-white border-solid bg-neutral-500 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5">
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonProfile;
