import prisma from "@/utils/db/mainDb";


const Post=async(req:Request)=>{
try {
    const {name}= await req.json();
    const res=await prisma.user.findFirst({
        where:{
            name:name
        }
    })
     

} catch (error) {
    
}
}