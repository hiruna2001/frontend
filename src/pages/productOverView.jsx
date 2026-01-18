import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart, loadCart } from "../utils/cart";


export default function ProductOverView() {
    const params = useParams();
    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/product/" + params.id).then(
            (response) => {
                setProduct(response.data);
                setStatus("success");

            }).catch(
                () => {
                    toast.error("Error loading product");
                    setStatus("error");
                }
            )
    }
        , [])

    return (
        <div className="w-full h-[calc(100vh-100px)] text-secondary">
            {
                status == "loading" && <Loader />
            }
            {
                status == "success" && (<div className="w-full h-full flex ">
                    <div className="w-[50%]  h-full flex justify-center items-center">
                        <ImageSlider images={product.images} />

                    </div>
                    <div className="w-[50%] h-full flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-center">{product.name}
                            {
                                product.alternativeNames.map(
                                    (name, index) => {
                                        return (
                                            <span key={index} className="text-xl font-normal">{" | " + name}</span>
                                        )
                                    }
                                )
                            }
                        </h1>
                        <p className="mt-[30px] text-justify">{product.description}</p>
                        <p>Category: {product.category}</p>
                        {
                            product.labelPrice > product.price && <div className="flex items-center gap-3">
                                <h1 className="text-lg font-semibold line-through text-secondary">LKR.{product.labelPrice.toFixed(2)}</h1>
                                <h1 className="text-lg font-semibold text-accent">LKR.{product.price.toFixed(2)}</h1>
                            </div>
                        }
                        <div className="w-[90%] h-[40px] flex gap-4 mt-[60px]">
                            <button className="w-full h-[40px] mt-[5px] text-center rounded-lg border border-accent text-accent hover:bg-accent hover:text-white"
                            onClick={()=>{
                                addToCart(product,1)
                                toast.success("Added to cart")
                            }}>Add to cart</button>
                            <Link to="/checkout" state={[{
                                productID: product.productID,
                                name: product.name,
                                price: product.price,
                                labelPrice: product.labelPrice,
                                image: product.images[0],
                                quantity: 1
                            }

                            ]} className="w-full h-[40px] mt-[5px] text-center rounded-lg border border-accent text-accent hover:bg-accent hover:text-white"
                            onClick={()=>{
                                console.log(loadCart())
                            }}>Buy Now</Link>
                        </div>


                    </div>



                </div>)
            }
            {
                status == "error" && <h1>Error loading product</h1>
            }

        </div>
    )
}