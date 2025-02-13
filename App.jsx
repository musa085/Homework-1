import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [user, setUser] = useState({
    name: 'Ad Soyad',
    email: 'email@example.com',
    phone: '+1234567890',
    image: 'https://randomuser.me/api/portraits/men/1.jpg' // Default şəkil
  });

  const [loading, setLoading] = useState(false);

  const fetchRandomUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const randomUser = data.results[0];
      
      console.log('API Response:', randomUser); // Debug üçün

      setUser({
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        email: randomUser.email,
        phone: randomUser.phone,
        image: randomUser.picture.large || 'https://randomuser.me/api/portraits/men/1.jpg'
      });
    } catch (error) {
      console.error('İstifadəçi məlumatları əldə edilərkən xəta baş verdi:', error);
      // Xəta halında default şəkli göstər
      setUser(prevUser => ({
        ...prevUser,
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
    
      <div className="flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto">
            {loading ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-full"></div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <img
                    src={user.image}
                    alt="İstifadəçi Şəkli"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null; // Sonsuz döngünü əngəlləmək üçün
                      e.target.src = 'https://randomuser.me/api/portraits/men/1.jpg';
                    }}
                  />
                </div>
                <h2 className="text-xl font-bold text-center mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-center mb-2">
                  {user.email}
                </p>
                <p className="text-gray-600 text-center">
                  {user.phone}
                </p>
              </>
            )}
            <div className="mt-4 flex justify-center">
              <button
                onClick={fetchRandomUser}
                disabled={loading}
                className={`
                  bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                  py-2 px-4 rounded transition-colors duration-300
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {loading ? 'Yüklənir...' : 'Yeni İstifadəçi'}
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">Coin vermeyi unutmayin😄</p>
        </div>
      </div>
    </div>
  );
}

export default App;