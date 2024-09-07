'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'
import Link from 'next/link'
import FinalOrderForm from './FinalOrderForm'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ListOrdered, Truck } from 'lucide-react'
type User = {
    name: string;
    signature: string;
  };

export interface DataProps{
    data:{
        jobOrder: string|undefined;
        name: string|undefined;
        phone: string|undefined;
        address: string|undefined;
        page: string|undefined;
        admin: string|undefined;
        products: string|undefined;
        total: string|undefined;
        date: string|undefined;  
        signature: string|undefined;  
    }
       signature: string | undefined;
    }

   
const FinalOrderDialog = ({data,signature}:DataProps) => {

    const [open,setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {

        if(!open){
            const currentJobOrder = localStorage.getItem('jobOrder')
            localStorage.setItem('currentjobOrder',currentJobOrder ?? '')
            router.replace('/dashboard')
    
        }
        
        
    }, [open, router, data.jobOrder])
   
  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
    <DialogTrigger asChild>
      <Button   variant={"secondary"} asChild>
        <Link
          href={{
            pathname: "/dashboard",
            query: {
                jobOrder: data.jobOrder,
                name: data.name,
                phone: data.phone,
                address: data.address,
                page:data.page,
                admin: data.admin,
                products: data.products,
                total: data.total,
                date: data.date,
                signature:data.signature,
            },
          }}
        >
        <Truck className='w-4 mr-2'/>  Final Order
        </Link>
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <DialogDescription>
          Fill in the extra details for the final order.
        </DialogDescription>
      </DialogHeader>
      <FinalOrderForm />
    </DialogContent>
  </Dialog>
  )
}

export default FinalOrderDialog