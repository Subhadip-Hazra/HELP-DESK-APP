import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";


const Card = ({ data }) => {
    // console.log(data);
    const { _id, issueTitle,issueType,issueStatus,priorityType,userLocation,issueDate} = data;
    return (
        <div>
            <section className="card">
                <Link to={`/issues/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
                    <div className="card-details">
                        <h4 className="text-primary mb-1">{issueTitle}</h4>
                        <h3 className="text-lg font-semibold mb-2">{issueType}</h3>

                        <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                            <span className="flex items-center gap-2"><FiMapPin /> {userLocation}</span>
                            <span className="flex items-center gap-2"><FiClock /> {priorityType}</span>
                            <span className="flex items-center gap-2"><FiCalendar /> {issueDate}</span>
                        </div>
                        <p className="text-base text-primary/70 flex items-center gap-3"> <GrStatusGood />{issueStatus}</p>
                    </div>
                </Link>
            </section>
        </div>
    );
};

export default Card;
