import SavedRelatedCareItem from "@/components/common/SavedRelatedCareItem";
import { get } from "@/services/api/api";
import { API_GET_SAVED_COMMUNITIES } from "@/services/api/endpoints";
import { useQuery } from "react-query";


export default function SavedCommunities() {

    const { isLoading, isError, error, data: savedCommunities } = useQuery({
        queryKey: ['savedUserCommunities'],
        queryFn: () => get(API_GET_SAVED_COMMUNITIES)
    });

    const favouriteCommunityArray = savedCommunities?.data?.saved_communities;

    return (
        <div className="saved-communities-wrapper">
            <h2 className="headline-large title-head">My Saved Communities</h2>
            <div className="recommended-communities">
                <div className="recommended-communities-items">
                    {
                        favouriteCommunityArray?.map(item => {
                            return <SavedRelatedCareItem
                                key={item?.id}
                                isVarified ={item?.is_verified}
                                images={item?.images}
                                community={item}
                            />
                        })
                    }
                    {/* <SavedRelatedCareItem />
                    <SavedRelatedCareItem />
                    <SavedRelatedCareItem />
                    <SavedRelatedCareItem /> */}
                </div>
            </div>
        </div>
    );
}
