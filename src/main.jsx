import React,{useCallback,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,useLocation} from 'react-router-dom';
import './styles.css';
import {Layout} from './components/layout/Layout';
import {Home} from './pages/Home';
import {Articles,ArticleDetail} from './pages/Articles';
import {Profile,Products,Research,Learning,LearningHub,MyPage,Simulator,Tools,Legal,Sitemap,NotFound} from './pages/Pages';
import {ErrorBoundary} from './components/ErrorBoundary';
import {QuestionBank} from './pages/QuestionBank';
import {isStringArray,readStorage,writeStorage} from './utils/storage';

export const Store=React.createContext({});
function App(){
 const [theme,setTheme]=useState(()=>readStorage('dr-theme','light',x=>x==='light'||x==='dark'));
 const [bookmarks,setBookmarks]=useState(()=>readStorage('dr-bookmarks',[],isStringArray));
 const [toast,setToast]=useState(''); const loc=useLocation();const toastTimer=useRef();
 useEffect(()=>{document.documentElement.dataset.theme=theme;writeStorage('dr-theme',theme)},[theme]);
 useEffect(()=>{writeStorage('dr-bookmarks',bookmarks)},[bookmarks]);
 useEffect(()=>{window.scrollTo(0,0)},[loc.pathname]);
 useEffect(()=>{const titles={'/':'Beranda','/profil':'Profil','/artikel':'Artikel','/tools':'Tools','/simulator':'Simulator','/belajar':'Pusat Belajar','/saya':'Saya','/produk':'Produk Digital','/research-lab':'Research Lab','/sitemap':'Sitemap'};const section=titles[loc.pathname]||(loc.pathname.startsWith('/artikel/')?'Artikel':loc.pathname.startsWith('/belajar/')?'Pusat Belajar':loc.pathname.startsWith('/tools/')?'Tools':loc.pathname.startsWith('/simulator/')?'Simulator':loc.pathname.startsWith('/legal/')?'Legal & Trust':'Halaman tidak ditemukan');document.title=`${section} — drsobri.id`},[loc.pathname]);
 useEffect(()=>()=>clearTimeout(toastTimer.current),[]);
 const notify=useCallback(message=>{clearTimeout(toastTimer.current);setToast(message);toastTimer.current=setTimeout(()=>setToast(''),2500)},[]);
 return <Store.Provider value={{theme,setTheme,bookmarks,setBookmarks,notify}}><Layout>{toast&&<div className="toast" role="status">✓ {toast}</div>}<ErrorBoundary><Routes>
  <Route path="/" element={<Home/>}/><Route path="/profil" element={<Profile/>}/><Route path="/artikel" element={<Articles/>}/><Route path="/artikel/:slug" element={<ArticleDetail/>}/>
  <Route path="/tools" element={<Tools/>}/><Route path="/tools/:kind" element={<Tools/>}/><Route path="/research-lab" element={<Research/>}/><Route path="/simulator" element={<Simulator/>}/><Route path="/simulator/:kind" element={<Simulator/>}/>
  <Route path="/belajar" element={<LearningHub/>}/><Route path="/belajar/bank-soal" element={<QuestionBank/>}/><Route path="/belajar/:kind" element={<Learning/>}/><Route path="/saya" element={<MyPage/>}/><Route path="/produk" element={<Products/>}/><Route path="/karya" element={<Products/>}/><Route path="/legal/:kind" element={<Legal/>}/><Route path="/sitemap" element={<Sitemap/>}/><Route path="*" element={<NotFound/>}/>
 </Routes></ErrorBoundary></Layout></Store.Provider>
}createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
