import Image from "next/image";
import ItemImgSlider from "@/components/pages/search-result/ItemImgSlider";
import SliderCustomItem from "@/components/common/SliderCustomItem";
import SearchItemDetails from "@/components/pages/search-result/SearchItemDetails";

interface Props {
  item: any;
  onClick: (value: any) => void;
}

export default function SearchSingleItem({ item, onClick }: Props) {


  // console.log("search single item ===>> ",item)
  return (
    <>
      <div className="search-single-item-wrap" onClick={() => onClick(item)}>
        <div className="search-single-item-slider-wrap">
          {/*<ItemImgSlider />*/}
          <SliderCustomItem images={item?.images} />
        </div>
        <div className="search-single-item-details-wrap">
          <SearchItemDetails detail={item} />
        </div>
      </div>
    </>
  );
}
