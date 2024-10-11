import { Card } from "@/components/ui/card"
export default function ComicPanels({generation}:{
    generation: any
}){
   return  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
   {generation.comics && generation.comics[0].panels.map((panel: any, index: any) => (
       <Card key={index} className="overflow-hidden border-4 border-black">
           <div className="aspect-square relative">
               <img
                   src={panel?.assetUrl || '/placeholder.svg?height=300&width=300&text=Panel ' + (index + 1)}
                   alt={`Comic panel ${index + 1}`}
                   className="object-cover w-full h-full"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-2">
                   <p className="text-sm font-comic text-center">{panel?.caption}</p>
               </div>
           </div>
       </Card>
   ))}
</div>
}