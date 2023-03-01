import React from "react";
import PropTypes from 'prop-types';

import style from './Filter.module.css';

const Filter = ({ value, onChange }) => (
    <div className={style.filter}>
        <label className={style.labelFilter}>
            Filter contacts by name <input className={style.filterInput} type='text' value={value} onChange={onChange} />
        </label>
    </div>
);

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default Filter;
