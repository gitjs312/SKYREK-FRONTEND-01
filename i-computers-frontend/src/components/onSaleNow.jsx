import ProductCard from "./productCard";

export default function OnSaleNow(){
    return(
        <div>
            <h1>on sale now</h1>
            <ProductCard
                name="laptop"
                image="https://picsum.photos/id/237/200/300"
                price="$100" 
            />
      

            <ProductCard 
                name="car"
                image="https://picsum.photos/id/870/200/300?grayscale&blur=2"
                price="$250"
            />
        </div>
    )
}