import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProductPage() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [alternativeName, setAlternativeName] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [category, setCategory] = useState("Cream");
    const [stock, setStock] = useState("");

    const navigate = useNavigate();

    async function addProduct() {
        const token=localStorage.getItem('token')

        if(token===null){
            navigate('/login')
            return
        }
        const promises=[];

        for(let i=0;i<images.length;i++){
            
            promises[i]= mediaUpload(images[i])
        }
        try{
            const urls= await Promise.all(promises);
            const alternativeNames = alternativeName.split(",");

            const product={
                productID:productId,
                name:name,
                alternativeNames:alternativeNames,
                description:description,
                images:urls,
                price:price,
                labelPrice:labeledPrice,
                category:category,
                stock:stock
            }

            await axios.post(import.meta.env.VITE_API_URL+ "/api/product",product,{headers:{
                Authorization : "Bearer "+token
            }
        })
        toast.success("Product Added Successfully");
        navigate("/admin/products")

        }catch{
            toast.error("An Error Occurred");

        }
        
        
    }



    return (
        <div className="w-full min-h-full bg-primary flex justify-center items-start px-6 py-10">

            <div className="w-full max-w-[800px] bg-white rounded-3xl shadow-xl border border-accent/20 p-10">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-secondary text-center mb-8">
                    Add New Product
                </h2>

                {/* Form */}
                <div className="flex flex-col gap-6">

                    {/* Product ID */}
                    <div>
                        <label className="label">Product ID</label>
                        <input
                            className="input"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                        />
                        <p className="hint">Unique product identifier</p>
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="label">Product Name</label>
                        <input
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Alternative Name */}
                    <div>
                        <label className="label">Alternative Name</label>
                        <input
                            className="input"
                            value={alternativeName}
                            onChange={(e) => setAlternativeName(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">Description</label>
                        <textarea
                            className="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="label">Product Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                            className="file-input"
                        />

                        {/* Image Preview (Visual Only) */}
                        <div className="flex gap-3 mt-3 flex-wrap">
                            {Array.from(images).map((img, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(img)}
                                    className="w-20 h-20 object-cover rounded-lg border"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Prices */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Price</label>
                            <input
                                type="number"
                                className="input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="label">Labelled Price</label>
                            <input
                                type="number"
                                className="input"
                                value={labeledPrice}
                                onChange={(e) => setLabeledPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label">Category</label>
                        <select
                            className="input bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Cream">Cream</option>
                            <option value="Lotion">Lotion</option>
                            <option value="Serum">Serum</option>
                        </select>
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="label">Stock Quantity</label>
                        <input
                            type="number"
                            className="input"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button onClick={addProduct}
                        className="
                            w-full mt-4 py-3 rounded-xl
                            bg-accent text-white font-semibold
                            hover:opacity-90 transition
                            shadow-md
                        "
                    >
                        Add Product
                    </button>
                    <button onClick={()=>{
                        navigate("/admin/products")
                    }}
                        className="
                            w-full mt-4 py-3 rounded-xl
                            bg-accent text-white font-semibold
                            hover:opacity-90 transition
                            shadow-md
                        "
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}
