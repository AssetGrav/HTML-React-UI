import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import Comment from "./comment";
import api from "../../../api";
import _ from "lodash";
import CommentsCard from "../../common/card/commentsCard";

const CommentsList = ({ userId }) => {
    const [users, setUsers] = useState();
    const [data, setData] = useState({
        content: "",
        pageId: userId,
        userId: ""
    });
    const [comments, setComments] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.comments.fetchAll().then((data) => setComments(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        api.comments.fetchCommentsForUser(target.value).then((data) => setComments(data));
    };
    const handleDelete = (target) => {
        api.comments.remove(target.target.getAttribute("name")).then((data) =>
            setComments(comments.filter((item) => item._id !== data ? item : null)));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите имя пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Напишите сообшение"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleComment = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        api.comments.add(data).then((data) => setComments([data]));
        setData({
            content: "",
            pageId: "",
            userId: "",
            _id: "",
            created_at: ""
        });
    };
    console.log("after", data);
    const sortedComments = _.orderBy(comments, ["_id", "userId", "pageId", "content", "created_at"], ["asc"]);
    console.log(sortedComments);
    return (
        <>
            <CommentsCard
                users={users}
                onChangeInput={handleChange}
                onChange={handleChange}
                onClick={handleComment}
                comments={comments}
                value={data.userId}
                valueContent={data.content}
                disabled={!isValid}
            />
            <Comment
                users={users}
                comments={sortedComments}
                onClick={handleDelete}
            />
        </>
    );
};
CommentsList.propTypes = {
    userId: PropTypes.string.isRequired
};

export default CommentsList;
