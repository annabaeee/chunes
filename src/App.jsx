import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar"
import { LoginPage } from './pages/login.jsx';
import { CallbackPage } from './pages/callback.jsx';
import { ProfilePage } from './pages/profile.jsx';
import { ProtectedRoute } from './components/protectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import { ApiProvider } from './hooks/useApi.jsx';
import { AlbumDetails } from './pages/albumDetails.jsx';
import { TrackDetails } from './pages/trackDetails.jsx';
import { ErrorPage } from './pages/error.jsx';
import { SearchResult } from './pages/search.jsx';
import { Reviews } from './pages/reviews.jsx';
import { NewReleases } from './pages/newReleases.jsx';
import { Recommended } from './pages/foryou.jsx';
import { TopTracks } from './pages/topTracks.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute><NewReleases /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
            <Route path="/tracks/:id" element={<TrackDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/for-you" element={<Recommended />} />
            <Route path="/top-tracks" element={<TopTracks />} />
            <Route path='/search' element={<SearchResult />}></Route>
            {/* <Route path="/rated" element={<Rated />} />
        <Route path="/new-releases" element={<TvShows />} />
        <Route path='/:type/:id' element={<DetailsPage />}></Route>
        <Route path='/search' element={<SearchResult />}></Route> */}
          </Routes>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
