import { useState } from "react";
import useAllPublishers from "../../Hooks/useAllPublishers";

const Publisher = () => {

    const [publishers] = useAllPublishers();
    const [seeMore, setSeeMore] = useState(false)

    const handleSeeMore = () => {
        return setSeeMore(!seeMore);
    }

    return (
        <div>
           <div className="grid grid-cols-3 text-center place-items-center gap-4">
               {
                 seeMore ? publishers.map(
                    publisher => <div key={publisher._id} className="w-full">
                        <h2>{publisher.name}</h2>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={publisher.logo_url}/>
                            </div>
                        </div>
                    </div>
                    
                )  : publishers.slice(0,6).map(
                    publisher => <div key={publisher._id} className="w-full">
                        <h2>{publisher.name}</h2>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src={publisher.logo_url}/>
                            </div>
                        </div>
                    </div>
                    
                )
               }
         </div>
         {
            seeMore ? <div className="text-center mt-5">
            <button onClick={handleSeeMore} className="btn btn-secondary">See Less...</button>
        </div> : <div className="text-center mt-5">
                <button onClick={handleSeeMore} className="btn btn-secondary">See More...</button>
            </div>
         }
            
        </div>
    );
};

export default Publisher;