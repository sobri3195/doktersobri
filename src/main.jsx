import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import './styles.css';
import {Layout} from './components/layout/Layout';
import {Home} from './pages/Home';
import {Articles,ArticleDetail} from './pages/Articles';
import {Profile,Products,Research,Learning,LearningHub,MyPage,Simulator,Tools,Legal,Sitemap,NotFound} from './pages/Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {isStringArray,readStorage,writeStorage} from './utils/storage';

export const Store=React.createContext({});
function App(){
 const [theme,setTheme]=useState(()=>readStorage('dr-theme','light',x=>x==='light'||x==='dark'));
 const [bookmarks,setBookmarks]=useState(()=>readStorage('dr-bookmarks',[],isStringArray));
 const [toast,setToast]=useState(''); const loc=useLocation();
 useEffect(()=>{document.documentElement.dataset.theme=theme;writeStorage('dr-theme',theme)},[theme]);
 useEffect(()=>{writeStorage('dr-bookmarks',bookmarks)},[bookmarks]);
 useEffect(()=>{window.scrollTo(0,0)},[loc.pathname]);
 const notify=x=>{setToast(x);setTimeout(()=>setToast(''),2500)};
 return <Store.Provider value={{theme,setTheme,bookmarks,setBookmarks,notify}}><Layout>{toast&&<div className="toast" role="status">✓ {toast}</div>}<ErrorBoundary><Routes>
  <Route path="/" element={<Home/>}/><Route path="/profil" element={<Profile/>}/><Route path="/artikel" element={<Articles/>}/><Route path="/artikel/:slug" element={<ArticleDetail/>}/>
  <Route path="/tools" element={<Tools/>}/><Route path="/tools/:kind" element={<Tools/>}/><Route path="/research-lab" element={<Research/>}/><Route path="/simulator" element={<Simulator/>}/><Route path="/simulator/:kind" element={<Simulator/>}/>
  <Route path="/belajar" element={<LearningHub/>}/><Route path="/belajar/:kind" element={<Learning/>}/><Route path="/saya" element={<MyPage/>}/><Route path="/produk" element={<Products/>}/><Route path="/karya" element={<Products/>}/><Route path="/legal/:kind" element={<Legal/>}/><Route path="/sitemap" element={<Sitemap/>}/><Route path="*" element={<NotFound/>}/>
 </Routes></ErrorBoundary></Layout></Store.Provider>
}createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
