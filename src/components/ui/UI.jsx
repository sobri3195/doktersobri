import React from 'react';import {Link} from 'react-router-dom';import * as Icons from 'lucide-react';
export function Icon({name='Activity',size=20}){let C=Icons[name]||Icons.Activity;return <C size={size}/>}
export function Button({children,to,variant='primary',...p}){let cls=`btn ${variant}`;return to?<Link className={cls} to={to} {...p}>{children}</Link>:<button className={cls} {...p}>{children}</button>}
export function Card({children,className=''}){return <div className={`card ${className}`}>{children}</div>}
export function Badge({children,tone=''}){return <span className={`badge ${tone}`}>{children}</span>}
export function PageHead({eyebrow,title,desc}){return <header className="page-head wrap"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></header>}
export function Empty({text='Belum ada data yang sesuai.'}){return <div className="empty"><Icons.Inbox/><b>{text}</b><span>Coba ubah pencarian atau filter Anda.</span></div>}
export function Progress({value}){return <div className="progress"><i style={{width:`${value}%`}}/></div>}
export function Breadcrumb({current}){return <div className="crumb"><Link to="/">Beranda</Link><Icons.ChevronRight size={14}/><span>{current}</span></div>}
export function Modal({open,onClose,children}){if(!open)return null;return <div className="modal-bg" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" onMouseDown={e=>e.stopPropagation()}><button className="modal-x" onClick={onClose} aria-label="Tutup">×</button>{children}</div></div>}
