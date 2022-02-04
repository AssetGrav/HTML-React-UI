import React from "react";
import PropTypes from "prop-types";
import { convertData } from "../../../utils/convertData";

const Comment = ({ comments, users, onClick }) => {
    console.log("comment", comments);
    const findUserName = (users, id) => {
        const [arr] = users.filter((user) => id === user._id ? user : "");
        return arr;
    };
    if (comments && users) {
        return (
            <>
                {comments.map((data) =>
                    <div key={data._id} className="card mb-2">
                        <div className="card-body ">
                            <h2>Comments</h2>
                            <hr />
                            <div className="bg-light card-body  mb-3">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-start ">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="65"
                                            height="65"
                                        />
                                            <div className="flex-grow-1 flex-shrink-1">
                                                <div className="mb-4">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-1 ">
                                                            {findUserName(users, data.userId).name + "  "}
                                                            <span className="small">
                                                                {convertData(data.created_at)}
                                                            </span>
                                                        </p>
                                                        <button
                                                            className="btn btn-sm text-primary d-flex align-items-center"
                                                            onClick={onClick}
                                                            value={data._id}
                                                        >
                                                            <i
                                                                className="bi bi-x-lg" name={data._id}
                                                            >
                                                            </i>
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">{data.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    } else {
        return null;
    };
};
Comment.propTypes = {
    comments: PropTypes.array,
    users: PropTypes.array,
    onClick: PropTypes.func
};

export default Comment;
