// src/pages/Landing.tsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import banner from '../assets/banner.jpeg';
import thankYouVideo from '../assets/videos/thank_you.mp4'; // Import the local video file

export default function Landing() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('registrations').insert([form]);
    if (error) {
      console.error(error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      {/* NAVBAR */}
      <header className="w-full bg-red-600 text-white px-6 md:px-12 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl md:text-2xl font-extrabold">🍕 Pizza Hut</h1>
        <nav className="space-x-4 md:space-x-6 text-sm md:text-base">
          <a href="/" className="text-white hover:underline">Home</a>
          <a href="/report" className="text-white hover:underline">Report</a>
          <a href="/photo" className="text-white hover:underline">Photo</a>
        </nav>
      </header>

      {/* HERO IMAGE */}
      <div
        className="w-full h-[220px] md:h-[350px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center px-2">
            Taste the Flavor 🍕
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
        {!submitted ? (
          <div className="bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl">
            <h3 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
              Register
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/70 focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base text-gray-800"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/70 focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base text-gray-800"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/70 focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base text-gray-800"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition text-sm md:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-xl text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              🎉 Thanks for registering!
            </h2>
            <div className="aspect-w-16 aspect-h-9 w-full rounded-lg shadow-md mb-4 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/d3hdMbtuNN0?autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a
              href={thankYouVideo}
              download="thank_you_video.mp4"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition text-sm md:text-base"
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}