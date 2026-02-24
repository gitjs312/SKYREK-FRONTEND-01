export default function ProductCard(props) {
    return(
        <div>
            <h2>{props.name}</h2>
            <img src={props.image}/>
            <p>Price : {props.price}</p>
            <button>Buy now</button>
        </div>
            
    )
}