import {
  CARD_USER_FORM_MESSAGE,
  ERROR_MESSAGE,
  INPUT_LENGTH,
} from '../../constants';
import CardInput from '../CardInput';
import CardInputContainer from '../CardInputContainer';
import Input from '../common/Input';
import FormErrorMessage from '../FormErrorMessage';

import styles from './style.module.css';

interface CardUserNameInputProps {
  userName: string;
  nameError: boolean;
  onNameChange: (value: string) => void;
}

export default function CardUserNameInput({
  userName,
  nameError,
  onNameChange,
}: CardUserNameInputProps) {
  const { title, subTitle, label, namePlaceholder } = CARD_USER_FORM_MESSAGE;

  const getErrorMessage = () => {
    if (!nameError) {
      return;
    }
    return ERROR_MESSAGE.userName;
  };

  return (
    <CardInputContainer title={title} subTitle={subTitle}>
      <CardInput label={label}>
        <div>
          <div className={styles.inputWrap}>
            <Input
              type="text"
              name="name"
              value={userName}
              maxLength={INPUT_LENGTH.CARD_USER}
              placeholder={namePlaceholder}
              isError={nameError}
              onChange={(event) => onNameChange(event.target.value)}
            />
          </div>
          <FormErrorMessage errorMessage={getErrorMessage()} />
        </div>
      </CardInput>
    </CardInputContainer>
  );
}
