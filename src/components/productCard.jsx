import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.products;

    return (
        <div className="w-[300px] h-[400px] shadow-2xl m-3 p-3 flex flex-col px=[10px] ">
            <img className="w-full h-[250px] object-cover" src={product.images[0]} />
            <h1 className="text-xl font-bold text-secondary">{product.name}</h1>
            {
                product.labelPrice > product.price ? (
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold line-through text-secondary">LKR.{product.labelPrice.toFixed(2)}</h1>
                        <h1 className="text-lg font-semibold text-accent">LKR.{product.price.toFixed(2)}</h1>
                    </div>
                ) : <h1 className="text-lg font-semibold text-accent">LKR.{product.price.toFixed(2)}</h1>
            }
            <p>{product.category}</p>
            <Link to={"/overview/"+product.productID} className="w-full h-[30px] mt-[5px] text-center rounded-lg border border-accent text-accent hover:bg-accent hover:text-white">View Product</Link>
            
        </div>
    );
}
