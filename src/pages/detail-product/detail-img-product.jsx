export default function DetailImgProdut( {product} ) {
  return (
    <div className="bg-[#F4F4F4] w-[381px] h-[381px] md:w-[481px] md:h-[481px] flex items-center rounded-[20px]">
      <img src={product.productImgUrl} alt={product.productName}  className="transition-transform transform hover:scale-110"/>
    </div>
  )
}