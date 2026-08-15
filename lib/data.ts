import { supabaseServer } from './supabase/server';
export type Topic = { id:string; title:string; slug:string; status:'not_started'|'in_progress'|'completed'; parent_id:string|null; order_index:number };
export const starterTopics: Topic[] = [
  {id:'conic-sections',title:'Conic Sections',slug:'conic-sections',status:'not_started',parent_id:null,order_index:1},
  {id:'circles',title:'Circles',slug:'circles',status:'not_started',parent_id:'conic-sections',order_index:2},
  {id:'parabolas',title:'Parabolas',slug:'parabolas',status:'not_started',parent_id:'conic-sections',order_index:3},
  {id:'ellipses',title:'Ellipses',slug:'ellipses',status:'not_started',parent_id:'conic-sections',order_index:4},
  {id:'hyperbolas',title:'Hyperbolas',slug:'hyperbolas',status:'not_started',parent_id:'conic-sections',order_index:5},
  {id:'sequences-series',title:'Sequences & Series',slug:'sequences-series',status:'not_started',parent_id:null,order_index:6},
  {id:'induction',title:'Induction',slug:'induction',status:'not_started',parent_id:null,order_index:7},
  {id:'combination',title:'Combination',slug:'combination',status:'not_started',parent_id:null,order_index:8},
];
export async function getTopics():Promise<Topic[]> { const db=supabaseServer(); if(!db) return starterTopics; const {data}=await db.from('topics').select('id,title,slug,status,parent_id,order_index').order('order_index'); return data?.length ? data as Topic[] : starterTopics; }
export const members=['Marah','Weia','Krystel','Krieshanta','Raven'];
