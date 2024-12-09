import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import './PhoneInput.css';
import { FaPhone } from 'react-icons/fa';
import { getExampleNumber } from 'libphonenumber-js';

const PhoneInputComponent = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (phoneNumber) => {
    setValue(phoneNumber);
    if (phoneNumber) {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      if (parsedPhoneNumber && parsedPhoneNumber.country) {
        const country = parsedPhoneNumber.country;
        const exampleNumber = getExampleNumber(country);
        const maxLength = exampleNumber ? exampleNumber.nationalNumber.length : 15;

        if (phoneNumber.length > maxLength) {
          phoneNumber = phoneNumber.slice(0, maxLength);
          setValue(phoneNumber);
        }

        if (!isValidPhoneNumber(phoneNumber)) {
          setError('Invalid phone number');
        } else {
          setError('');
        }
      }
    } else {
      setError('');
    }
  };

  return (
    <div className="phone-input">
      <label htmlFor="phone" className="phone-input__label">Phone Number</label>
      <div style={{ position: 'relative' }}>
        <PhoneInput
          id="phone"
          className="phone-input__field"
          placeholder="Enter phone number"
          value={value}
          onChange={handleChange}
          defaultCountry="RU"
          international
          withCountryCallingCode
        />
        <FaPhone className="phone-input__icon" />
      </div>
      {error && <div className="phone-input__error">{error}</div>}
    </div>
  );
};

export default PhoneInputComponent;