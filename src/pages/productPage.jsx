import axios from "axios";
import { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export function ProductPage() {

    const[products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL + "/api/product").then(
                (response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            ).catch(
                (error) => {
                    console.log(error);
                    setIsLoading(false);
                    toast.error("Error loading products");
                }
            )
        }
    },[isLoading])

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
            {
                isLoading? <Loader/>
                :<div className="w-full h-full flex flex-row flex-wrap justify-center">
                    {
                        products.map((items)=>{
                            return(
                                <ProductCard key={items.productID} products={items} />
                            )
                        })
                    }

                </div>
            }
        </div>
    )
}