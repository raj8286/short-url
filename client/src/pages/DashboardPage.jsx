import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const SHORT_BASE =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : window.location.origin

const DashboardPage = () => {
  const { authUser } = useAuth()
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await api.get('/api/urls')
        setUrls(res.data)
      } catch (error) {
        console.error('Error fetching URLs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUrls()
  }, [])

  const handleDelete = async (shortUrl) => {
    try {
      await api.delete(`/api/urls/${shortUrl}`)
      setUrls((prev) => prev.filter((url) => url.shortUrl !== shortUrl))
    } catch (error) {
      console.error('Error deleting URL:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>
  }

  return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-dark">
            Welcome, <span className="text-accent">{authUser?.fullName}</span>
          </h1>
          <p className="text-lg text-gray-600 my-6">Your shortened URLs</p>
        </div>

        {urls.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-600">
              No URLs yet. Click{' '}
              <Link to="/" className="text-accent underline font-medium">
                here
              </Link>{' '}
            to generate.
          </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Short URL</th>
                  <th className="px-6 py-3 text-left">Long URL</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-center">Clicks</th>
                  <th className="px-6 py-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {urls.map((url) => {
                  const fullShort = `${SHORT_BASE}/s/${url.shortUrl}`
                  return (
                    <tr key={url._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <a
                          href={fullShort}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={fullShort}
                          className="font-mono text-secondary hover:underline"
                        >
                          {fullShort}
                        </a>
                      </td>
                      <td className="px-6 py-3 max-w-[420px]">
                        <a
                          href={url.longUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={url.longUrl}
                          className="block truncate hover:underline font-mono text-accent"
                        >
                          {url.longUrl}
                        </a>
                      </td>
                      <td className="px-6 py-3">
                        {new Date(url.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-center ">{url.clicks}</td>
                      <td className="px-6 py-3 text-center ">
                      <button
                        onClick={() => handleDelete(url.shortUrl)}
                        className="hover:opacity-80 cursor-pointer"
                        aria-label="Delete"
                        title="Delete"
                      >
                        <img src="/delete.png" alt="" aria-hidden="true" className="w-6 h-6 pointer-events-none inline-block" />
                      </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
  )
}

export default DashboardPage