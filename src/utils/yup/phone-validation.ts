import { mixed } from 'yup';

import { MAX_TEL_SIZE } from '../../components/phone-input';
import { NumberFormatValues } from 'react-number-format';

const phoneValidationSchema = () =>
  mixed<NumberFormatValues>()
    .defined()
    .test(
      'phoneIsRequired',
      'Телефон обязателен!',
      values => typeof values.value !== 'undefined',
    )
    .test(
      'phoneIsFilled',
      'Телефон должен быть заполнен полностью!',
      values => {
        const { value, formattedValue } = values;

        return value?.length === MAX_TEL_SIZE;
      },
    );

export default phoneValidationSchema;
