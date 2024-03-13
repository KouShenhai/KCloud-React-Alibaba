
import React,{ Suspense }  from 'react'
import {routers} from '@/configs/routers';
import {useRoutes } from "react-router-dom";





export default function App() {
  const element = useRoutes(routers);
  return (
    <div style={{height:'100%',width:'100%'}}>
         <Suspense fallback={<div>loading...</div>}>
          {element}
        
         </Suspense>
      </div>
  )
}


