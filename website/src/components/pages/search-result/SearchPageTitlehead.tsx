import { useRouter } from "next/router";
import React from "react";

export default function SearchPageTitlehead({ }) {

  const route = useRouter();
  const query: any = route.query;

  const { care_type, city } = query;

  const setSearchPage = ( ) => {

    if(care_type && city ){

      return `Best ${care_type} Facilities in ${city}` 

    }else if( care_type ){

      return `Best ${care_type} Facilities`

    }else if (city) {

      return `Best Care Communities in ${city}`

    }else{

      return "Best Care Communities"

    }

  }

  const searchPageTitle = setSearchPage();


  return (
    <>
      <div className="search-page-title-wrapper">
        <h1 className="search-item-page-title">{searchPageTitle}</h1>
        {/*<p className="search-item-page-sub-title">Based on your responses we have picked a this list of care homes that perfectly matched with your custom preferences. You’ll find custom <span>match scoring numbers</span> with each home.</p>*/}
      </div>
    </>
  );
}
