import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/button";
import { resetFilter, selectCategory } from "../../store/slices/filter.slice";

const options = [
  { category: "Drink", items: [
    { id: "Coffee", label: "Coffee" },
    { id: "Tea", label: "Tea" },
    { id: "Fruit", label: "Fruit" },
  ] },
  { category: "Food", items: [
    { id: "Noodles", label: "Noodles" },
    { id: "Fried", label: "Fried" },
    { id: "Snacks", label: "Snacks" },
  ] },
];

export default function ProductFilter() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.filter.selectedCategory);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      dispatch(resetFilter());
    } else {
      dispatch(selectCategory(category));
    }
  };

  return (
    <div className="flex flex-col w-full lg:w-[226px] bg-transparent rounded-[10px] border">
      <div className="flex justify-between items-center pb-6 pt-4 px-4">
        <p className="text-[32px] font-semibold">Filter</p>
        <div>
          <Button variant="primaryOutline" size="sm" onClick={() => dispatch(resetFilter())}>
            Reset
          </Button>
        </div>
      </div>
      <hr className="mx-4" />
      {options.map((section, index) => (
        <div key={index} className="flex flex-col gap-2 py-6 px-4">
          <p className="text-xl font-medium pb-2">{section.category}</p>
          <div className="flex md:flex-col gap-4">
            {section.items.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mr-4 mb-2">
                <input
                  id={option.id}
                  type="radio"
                  name="product"
                  className="hidden"
                  checked={selectedCategory === option.id}
                  onChange={() => handleCategorySelect(option.id)}
                />
                <label
                  htmlFor={option.id}
                  className="flex items-center cursor-pointer text-base md:text-xl"
                >
                  <span className="w-5 h-5 inline-block mr-2 text-sm md:text-base rounded-full border border-grey flex-no-shrink"></span>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}