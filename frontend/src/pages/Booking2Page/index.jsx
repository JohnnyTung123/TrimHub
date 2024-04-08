import * as React from "react";
import Header from "../NavigationBar";


function HairstyleCard({ imageSrc, title }) {
  return (
    <div className="flex flex-col text-3xl text-black max-md:mt-10">
      <img
        loading="lazy"
        src={imageSrc}
        alt={title}
        className="w-full border border-black border-solid aspect-[0.82]"
      />
      <div className="flex gap-3.5 self-center mt-5">
        <div className="grow">{title}</div>
        <button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b4e79dce3518054a4dab74544726274dde1c226ffe31323195e5427caba1c4?apiKey=545483bd823243d18143ce90026e7d25&"
          alt="Heart icon"
          className="shrink-0 w-5 aspect-[0.74] fill-black"
        />
        </button>
      </div>
    </div>
  );
}

function HairstyleDescription({ description, price }) {
  return (
    <div className="overflow-hidden relative flex-col items-start px-6 pt-3 pb-20 w-full text-3xl text-black border border-black border-solid fill-white fill-opacity-50 min-h-[182px] stroke-[1px] stroke-black max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/92d5cc37b382566ddd885d3028ea1a8bb18adebf7ae4f2dfaa40c7721a16279f?apiKey=545483bd823243d18143ce90026e7d25&"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      {price && <div>{price}</div>}
      <p>{description}</p>
    </div>
  );
}

function TimeSlots() {


  return (
    <div className="flex flex-col text-3xl whitespace-nowrap text-black text-opacity-70 max-md:mt-10 max-md:max-w-full">
      
      <div className="dropdown">
          <select>
            <option value="0">12:00 AM</option>
            <option value="1">1:00 AM</option>
            {/* Add more options for different times */}
          </select>
        </div>
    </div>
  );
}

function Booking2Page() {
  return (
    <div className="flex flex-col pb-20 bg-gray-200">
      <Header />
      <main className="flex flex-col px-14 mt-28 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">

            <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
              <HairstyleCard
                imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&"
                title="Short hair"
              />
            </div>
            
            <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <HairstyleDescription
                  price="Cut $100"
                  description="Some description"
                />
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
                      <input type="date" />
                    </div>
                    <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
                      <TimeSlots />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="self-end px-16 pt-2.5 pb-6 mt-24 text-4xl text-white rounded-xl border border-white border-solid bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pr-7 max-md:pl-8 max-md:mt-10">
          Book Now
        </button>
      </main>
    </div>
  );
}

export default Booking2Page;