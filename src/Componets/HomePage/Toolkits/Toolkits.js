import React, { useEffect, useState } from "react";
import ToolCard from "./ToolCard";

const Toolkits = () => {
   const [tools, setTools] = useState([]);

   useEffect(() => {
      fetch("https://woodie-manufacturer-server-production.up.railway.app/allTools", {
         method: "GET",
         headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => setTools(data));
   }, []);

   return (
      <section className="md:px-20 md:py-20 py-16 px-5 lg:mb-16 mb-5 text-secondary">
         <h1 className="text-center lg:text-5xl text-4xl pb-10 font-bold">
            Get Our <span className="text-primary">Tools</span>
         </h1>
         <div className="grid lg:grid-cols-3 grid-cols-1 place-items-center gap-10">
            {tools.slice(0, 6).map((tool, i) => (
               <ToolCard key={i} tool={tool}></ToolCard>
            ))}
         </div>
      </section>
   );
};

export default Toolkits;
