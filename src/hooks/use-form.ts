import {useState} from 'react';
import {TFormChangeHandler} from '../utils/types';

export default function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleFormChange: TFormChangeHandler = (evt) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  return {formData, handleFormChange};
}
