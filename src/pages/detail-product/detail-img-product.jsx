export default function DetailImgProdut( {product} ) {
  return (
    <div className="bg-[#F4F4F4] w-[350px] h-[350px] md:w-[481px] md:h-[481px] flex items-center rounded-[20px]">
      <img src={product.productImgUrl} alt={product.productName}  className="transition-transform transform hover:scale-110"/>
    </div>
  )
}