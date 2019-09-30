import React from 'react';

export default ({ input, id, label, meta: { error, touched } }) => {
  return (
    <div className="row">
      <div className="input-field ">
        <label for={id} className="active">
          {label}
        </label>
        <input {...input} id={id} />
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: 'red' }}
        >
          {touched && error}
        </span>
      </div>
    </div>
  );
};
