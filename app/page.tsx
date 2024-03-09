'use client'
import { useState } from "react";

export default function Home() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
  
    const handleSubmit = async (e : any) => {
      e.preventDefault();
  
      try {
        const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
        const { age } = await ageResponse.json();
        setAge(age);
  
        const genderResponse = await fetch(`https://api.genderize.io?name=${name}`);
        const { gender } = await genderResponse.json();
        setGender(gender);
  
        const countryResponse = await fetch(`https://api.nationalize.io?name=${name}`);
        const { country } = await countryResponse.json();
        if (country.length > 0) {
          setCountry(country[0].country_id);
        } else {
          setCountry('Unknown');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    return (
      <div className="
          min-h-screen
          bg-gradient-to-r
          from-purple-400
          to-indigo-700
          flex justify-center
          items-center"
        >
        <div className="
          bg-white
          bg-opacity-30 
          backdrop-filter 
          backdrop-blur-lg 
          rounded-lg 
          shadow-lg 
          p-8 
          max-w-md 
          w-full"
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="
                bg-gray-100 
                bg-opacity-30 
                backdrop-blur-md 
                rounded-lg 
                py-2 
                px-4 
                mb-4 
                w-full 
                focus:outline-none 
                focus:ring-2 
                focus:ring-purple-600 
                text-black"
              required
            />
            <button type="submit" className="
              bg-purple-600 
              text-white 
              py-2 
              px-4 
              rounded-lg 
              hover:bg-purple-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-purple-600
              ">
              Submit
            </button>
          </form>
          {age && (
            <div className="mt-6
              bg-white 
              bg-opacity-30 
              backdrop-filter 
              backdrop-blur-lg 
              rounded-lg p-4"
             >
              <div className="flex items-center mb-4">
                <img src="https://imgs.search.brave.com/x78Vg-qqPIvslXdhRWZIeEr7Zkteue57odvmFH_coE0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEy/ODQ4NDg2NC92ZWN0/b3IvdXNlci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9UVJq/QTc2d09oSnExeXdn/c255M29fbXdIQ1Jj/NHVCbW9ocUxaNGU1/MnJQOD0" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                <h1 className="text-2xl font-semibold text-gray-800">Profile Information</h1>
              </div>
              <p className="text-gray-800 font-semibold">Age: {age}</p>
              <p className="text-gray-800 font-semibold">Gender: {gender}</p>
              <p className="text-gray-800 font-semibold">Country: {country}</p>
            </div>
          )}
        </div>
      </div>
    );
}
