// src/pages/Photo.tsx
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { supabase } from '../supabaseClient';

export default function Photo() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'image/png') {
      alert('Please select a PNG image file.');
      return;
    }
    
    setLoading(true);
    setPublicUrl(null);
    setImage(null);

    // Create a unique file path
    const filePath = `qr-images/${Date.now()}-${file.name}`;

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('qr-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert('Error uploading file. Please try again.');
      setLoading(false);
      return;
    }

    // Get the public URL for the uploaded file and append the download parameter
    const { data: publicURLData } = supabase.storage
      .from('qr-images')
      .getPublicUrl(filePath, {
        download: true, // This is the key change to force download
      });

    if (publicURLData) {
      setPublicUrl(publicURLData.publicUrl);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">
      {/* NAVBAR */}
      <header className="w-full bg-red-600 text-white px-6 md:px-12 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-xl md:text-2xl font-extrabold">📷 Photo Uploader</h1>
        <nav className="space-x-4 md:space-x-6 text-sm md:text-base">
          <a href="/" className="text-white hover:underline">Home</a>
          <a href="/photo" className="text-white hover:underline">Photo</a>
        </nav>
      </header>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 w-full">
        <div className="bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
            Upload a Photo
          </h2>

          <input
            type="file"
            accept=".png"
            onChange={handleFileChange}
            disabled={loading}
            className="mb-6 w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 disabled:opacity-50"
          />

          {loading && (
            <p className="mt-8 text-gray-600 font-semibold">
              Uploading... Please wait.
            </p>
          )}

          {publicUrl && !loading && (
            <div className="mt-8 flex flex-col items-center">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                Scan to Download
              </h3>
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <QRCodeCanvas value={publicUrl} size={256} />
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Scan this QR code with your phone to download the image.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}