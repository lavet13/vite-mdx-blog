import { mixed } from 'yup';

import { NumberFormatValues } from 'react-number-format';

const innValidationSchema = () =>
  mixed<NumberFormatValues>()
    .defined()
    .test('isInnFilled', 'ИНН должен быть заполнен полностью!', values => {
      const { value } = values;

      return value?.length >= 10;
    });

export default innValidationSchema;
