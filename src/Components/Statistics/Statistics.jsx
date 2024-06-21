import CountUp from 'react-countup';
import useAllUser from '../../Hooks/useAllUser'
import useAllNews from '../../Hooks/useAllNews';
import useAllPublishers from '../../Hooks/useAllPublishers';
const Statistics = () => {

    const [user] = useAllUser();
    const [allNews] = useAllNews();
    const [publisher] = useAllPublishers();

    return (
        <div className="stats shadow w-full">

            <div className="w-full stat place-items-center">
                <div className="stat-title">Users :</div>
                <div className="stat-value"><CountUp
                    start={0}
                    duration={10}
                    end={user.length}
                ></CountUp></div>
            </div>

            <div className="w-full stat place-items-center">
                <div className="stat-title">All News :</div>
                <div className="stat-value text-secondary"><CountUp
                    start={0}
                    duration={20}
                    end={allNews.length}
                ></CountUp></div>

            </div>

            <div className="w- full stat place-items-center">
                <div className="stat-title">Total Publishers</div>
                <div className="stat-value"><CountUp
                    start={0}
                    duration={20}
                    end={publisher.length}
                ></CountUp></div>
            </div>

        </div>
    );
};

export default Statistics;