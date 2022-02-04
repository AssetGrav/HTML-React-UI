import React from "react";
import PropTypes from "prop-types";
import SelectField from "../form/selectField";

const CommentsCard = ({ users, onChange, value, onClick, onChangeInput, disabled, valueContent }) => {
    const handleChange = ({ target }) => {
        onChangeInput({ name: target.name, value: target.value });
    };
    return (
        <form onSubmit={onClick}>
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                            <SelectField
                                defaultOption="Choose..."
                                options={users}
                                name="userId"
                                onChange={onChange}
                                value={value}
                            />
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Сообщение
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                name="content"
                                value={valueContent}
                                onChange={handleChange}
                            >
                            </textarea>
                        </div>
                        <div className="gap-2 d-md-flex justify-content-md-end">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                disabled={disabled}
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
CommentsCard.propTypes = {
    users: PropTypes.array,
    onChange: PropTypes.func,
    comments: PropTypes.array,
    value: PropTypes.string,
    onClick: PropTypes.func,
    valueContent: PropTypes.string,
    onChangeInput: PropTypes.func,
    disabled: PropTypes.bool
};

export default CommentsCard;
