// src/pages/Report.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Report() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [csv, setCsv] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('registrations').select('*')
      if (error) {
        console.error(error)
        return
      }
      setRegistrations(data)

      // Create CSV string for download button
      const header = 'Name,Email,Phone,Created At\n'
      const rows = data
        .map((u: any) => `${u.name},${u.email},${u.phone},${u.created_at}`)
        .join('\n')
      setCsv(header + rows)
    }
    fetchData()
  }, [])

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'registrations.csv'
    a.click()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* NAVBAR */}
      <header className="w-full bg-red-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-extrabold">🍕 Pizza Hut</h1>
        <nav className="space-x-6">
          <a href="/" className="text-white hover:underline">Home</a>
          <a href="/report" className="text-white hover:underline">Report</a>
        </nav>
      </header>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl w-[90%] md:w-[600px]">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Registered Users Report
          </h2>

          <button
            onClick={downloadCSV}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Download CSV
          </button>
          <div className="mt-6 bg-white/70 border border-gray-200 p-4 rounded-lg max-h-[300px] overflow-auto text-sm">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left text-gray-800">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Registered At</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {registrations.map((user, index) => (
                  <tr key={user.id || index} className="border-t border-gray-300">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}