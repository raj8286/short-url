import { useState } from 'react';
import api from '../utils/axios';
import { useAuth } from '../context/AuthContext'

const LeftHalf = () => {
  const { authUser } = useAuth()
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await api.post('/api/short', { longUrl });
      setShortUrl(res.data.fullShortUrl);
    } catch (e) {
      setShortUrl('');
      setError(e?.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center lg:text-left mx-4">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
        Generate Short URLs
      </h1>

      <div className="mb-6 space-y-2">
        <p className="text-lg md:text-xl text-gray-600">
          ShortURL is a URL shortening platform that takes a long URL and
          instantly converts it into a short URL. Try Now.
        </p>
        {!authUser && (
          <p className="text-lg md:text-xl text-gray-600">
            Login to store your URLs.
          </p>
        )}
      </div>

      {/* URL Input */}
      <div className="w-full max-w-md mx-auto lg:mx-0 mb-6">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Enter your URL"
          className="w-full px-5 py-3 text-base border border-accent/85 rounded-full font-mono outline-none hover:ring-2 hover:ring-accent transition duration-300 hover:cursor-pointer"
        />
      </div>

      {/* Short URL result */}
      {shortUrl && (
        <div className="w-full max-w-md mx-auto lg:mx-0 mb-6">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-5 py-3 text-base border border-primary rounded-full font-mono text-secondary hover:underline hover:ring-2 hover:ring-secondary transition duration-100"
            title={shortUrl}
          >
            {shortUrl}
          </a>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="w-full max-w-md mx-auto lg:mx-0 mb-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Generate Button */}
      <div className="mx-auto lg:mx-0">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition px-8 py-3 duration-300 shadow-md disabled:opacity-70 hover:cursor-pointer"
        >
        {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      
    </div>
  );
};

export default LeftHalf; 

