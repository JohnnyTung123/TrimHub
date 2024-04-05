import * as React from "react";

function BookingPage() {
  return (
    <div className="flex flex-col pb-20 bg-gray-200">
      <div className="flex justify-center items-center px-16 py-8 mt-1 w-full text-black whitespace-nowrap bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 w-full max-w-[1228px] max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto text-8xl max-md:text-4xl">TrimHub</div>
          <div className="flex gap-5 self-start mt-3 text-5xl max-md:flex-wrap max-md:text-4xl">
            <div className="flex flex-auto gap-5 max-md:text-4xl">
              <div className="grow self-start max-md:text-4xl">Man</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5e3238fe9a027dc82bcfd461bc9b0d67f72fe23c89e24fe6ddb01bad620b9d3?apiKey=545483bd823243d18143ce90026e7d25&"
                className="shrink-0 w-0.5 border border-black border-solid aspect-[0.04] stroke-[1px] stroke-black"
              />
              <div className="flex-auto self-start max-md:text-4xl">Woman</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5e3238fe9a027dc82bcfd461bc9b0d67f72fe23c89e24fe6ddb01bad620b9d3?apiKey=545483bd823243d18143ce90026e7d25&"
                className="shrink-0 w-0.5 border border-black border-solid aspect-[0.04] stroke-[1px] stroke-black"
              />
            </div>
            <div className="flex flex-auto gap-1.5 items-center my-auto max-md:text-4xl">
              <div className="grow self-stretch my-auto max-md:text-4xl">
                &lt;username&gt;
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ddc75ce3416bbfd8a921512467b324c789b0d853e25cb81bf1cd10d27261fdd2?apiKey=545483bd823243d18143ce90026e7d25&"
                className="shrink-0 self-stretch aspect-square w-[42px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2430be4dbe0b9fe750e92ca7b0eba7ab99db0b2961e1afb9ab29c1ba52cfb514?apiKey=545483bd823243d18143ce90026e7d25&"
                className="shrink-0 self-stretch my-auto border-black border-solid aspect-[1.08] border-[3px] stroke-[3px] stroke-black w-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-14 mt-28 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col text-3xl text-black max-md:mt-10">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f085d179297750323ac3362c7e383ed13d1228d8eb5a3d095b8ba33b79ad3975?apiKey=545483bd823243d18143ce90026e7d25&"
                  className="w-full border border-black border-solid aspect-[0.82]"
                />
                <div className="flex gap-3.5 self-center mt-5">
                  <div className="grow">Short hair </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b4e79dce3518054a4dab74544726274dde1c226ffe31323195e5427caba1c4?apiKey=545483bd823243d18143ce90026e7d25&"
                    className="shrink-0 w-5 aspect-[0.74] fill-black"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="overflow-hidden relative flex-col items-start px-6 pt-3 pb-20 w-full text-3xl text-black border border-black border-solid fill-white fill-opacity-50 min-h-[182px] stroke-[1px] stroke-black max-md:px-5 max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/92d5cc37b382566ddd885d3028ea1a8bb18adebf7ae4f2dfaa40c7721a16279f?apiKey=545483bd823243d18143ce90026e7d25&"
                    className="object-cover absolute inset-0 size-full"
                  />
                  Cut $100 <br />
                  Some description{" "}
                </div>
                <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[45%] max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2763753efc38082925a39192ce0c6b0fc3649bc51138559a756ce03e25b5dff3?apiKey=545483bd823243d18143ce90026e7d25&"
                        className="grow w-full aspect-[0.96] max-md:mt-10"
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col text-3xl whitespace-nowrap text-black text-opacity-70 max-md:mt-10 max-md:max-w-full">
                        <div className="flex overflow-hidden relative flex-col gap-5 items-start self-center py-5 pr-20 w-full border border-black border-solid fill-white fill-opacity-50 min-h-[58px] stroke-[1px] stroke-black max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/65d5c6deaf262cc70dd5993169fbe73e785619396246c04264a6d22dba453779?apiKey=545483bd823243d18143ce90026e7d25&"
                            className="object-cover absolute inset-0 size-full"
                          />
                          <div className="relative">Time</div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba48dd7f1c704fee406045215078a38af7d347dafb0677820ddcbff8c39f44d0?apiKey=545483bd823243d18143ce90026e7d25&"
                            className="shrink-0 mt-1.5 aspect-[1.79] fill-black w-[25px]"
                          />
                        </div>
                        <div className="justify-end pt-2 pb-4 bg-white rounded-sm border-r border-b border-l border-solid border-neutral-400 max-md:max-w-full">
                          18:00
                          <br />
                          18:30
                          <br />
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end px-16 pt-2.5 pb-6 mt-24 text-4xl text-white rounded-xl border border-white border-solid bg-green-700 bg-opacity-80 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:pr-7 max-md:pl-8 max-md:mt-10">
          Book Now
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
