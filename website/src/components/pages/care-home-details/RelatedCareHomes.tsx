import Image from 'next/image';
import RelatedCareItem from "@/components/common/RelatedCareItem";
import { useQuery } from 'react-query';
import { get } from '@/services/api/api';
import { API_GET_RELATED_CARE_HOME } from '@/services/api/endpoints';
import { useInView } from "react-intersection-observer";

export default function RelatedCareHomes({ careHomeId }) {

  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    error,
    data: relatedCareHome,
  } = useQuery({
    queryKey: ["relatedCareHome"],
    queryFn: () => get(`${API_GET_RELATED_CARE_HOME}/${careHomeId}`),
    enabled: inView,

  });


  const relatedCommunities = relatedCareHome?.data?.related_communities;
  return (
    <>
      <div className="related-care-homes-wrapper" ref={ref}>
        <h1 className="headline-large">Related Care Homes that Matches Your Preferences</h1>
        <div className="related-care-item-wrap">
          {
            relatedCommunities?.map(item => <RelatedCareItem key={item?.id} community={item} />)
          }

          {/* <RelatedCareItem />
          <RelatedCareItem /> */}
        </div>
      </div>
    </>
  );
}
