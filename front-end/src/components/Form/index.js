import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.scss';

const Form = () => {
  const [setData] = useState(null);

  const getData = () => {
    try {
      axios.get('http://locallhost:3000').then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
        }
      });
    } catch (err) {
      console.log(`Issue with GET call: ${err}`);
    }
  };

  useEffect(() => {
    getData();
  }, [setData]);

  return (
    <form className='App-form'>
      <label>
        Name:
        <input type='text' name='name' />
      </label>
      <label>
        Reps:
        <input type='text' name='reps' />
      </label>
      <label>
        Weight:
        <input type='text' name='weight' />
      </label>
      <label>
        Unit:
        <input type='text' name='unit' />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default Form;
