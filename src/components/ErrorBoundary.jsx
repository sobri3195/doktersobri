import React from 'react';

export class ErrorBoundary extends React.Component{
 state={failed:false};
 static getDerivedStateFromError(){return{failed:true}}
 componentDidCatch(error,info){console.error('Modul gagal dimuat',error,info)}
 render(){
  if(this.state.failed)return <section className="module-error" role="alert"><h2>Modul tidak dapat dimuat</h2><p>Data Anda tetap aman. Muat ulang halaman atau kembali ke beranda untuk melanjutkan.</p><button className="btn" onClick={()=>location.reload()}>Muat ulang</button></section>;
  return this.props.children;
 }
}
