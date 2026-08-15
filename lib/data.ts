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
export type FeedPost={id:string;caption:string;created_at:string;author_id:string;topic_id:string|null;profiles:{name:string;avatar_url:string|null}|null;topics:{title:string;slug:string}|null;post_media:{id:string;media_type:string;storage_path:string|null;external_url:string|null;caption:string|null}[];comments:{id:string}[];reactions:{id:string;reaction_type:string}[]};
export async function getFeedPosts():Promise<FeedPost[]>{const db=supabaseServer();if(!db)return [];const {data}=await db.from('posts').select('id,caption,created_at,author_id,topic_id,profiles(name,avatar_url),topics(title,slug),post_media(id,media_type,storage_path,external_url,caption),comments(id),reactions(id,reaction_type)').eq('status','published').order('created_at',{ascending:false});return (data??[]) as unknown as FeedPost[];}
export const members=['Marah','Weia','Krystel','Krieshanta','Raven'];
