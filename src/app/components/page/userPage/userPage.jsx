import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import InfoCard from "../../common/card/infoCard";
import QualitiesCard from "../../common/card/qualitiesCard";
import MeetingCards from "../../common/card/meetingCards";
import CommentsList from "../../ui/comments/commentsList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <InfoCard user={user} onClick={handleClick} />
                        <QualitiesCard user={user} />
                        <MeetingCards user={user} />
                    </div>
                    <div className="col-md-8">
                        <CommentsList userId={userId} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
