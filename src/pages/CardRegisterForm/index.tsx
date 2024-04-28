import { useNavigate } from 'react-router-dom';

import {
  CardBack,
  CardCompanyInput,
  CardExpirationPeriodInput,
  CardFront,
  CardNumbersInput,
  CVCInput,
  PasswordInput,
  UserNameInput,
} from '../../components';
import Button from '../../components/common/Button';
import { INPUT_LENGTH } from '../../constants';
import {
  useCardCompanyInput,
  useCardExpirationPeriodInput,
  useCardNumbersInput,
  useCVCInput,
  usePasswordInput,
  useUserNameInput,
} from '../../hooks/cardForm';

import styles from './style.module.css';

function CardRegisterForm() {
  const navigate = useNavigate();

  const { numbers, numberErrors, isCardNumbersAllFilled, handleNumberChange } =
    useCardNumbersInput(INPUT_LENGTH.cardNumber, 4);

  const {
    cardCompany,
    cardCompanyError,
    handleCardCompanyChange,
    handleBlurCardCompanySelect,
  } = useCardCompanyInput();

  const { period, periodErrors, isPeriodAllFilled, handlePeriodChange } =
    useCardExpirationPeriodInput(INPUT_LENGTH.cardExpiration);

  const {
    CVCNumber,
    CVCNumberError,
    isCVCNumberFilled,
    showCardBack,
    handleCVCNumberChange,
    handleShowCardBack,
  } = useCVCInput(INPUT_LENGTH.cardCVC);

  const {
    userName,
    nameError,
    isUserNameFilled,
    handleNameChange,
    handleNameInputEnter,
  } = useUserNameInput();

  const { password, passwordError, handlePasswordChange } = usePasswordInput(
    INPUT_LENGTH.cardPassword,
  );

  const errors = [
    ...numberErrors,
    ...Object.values(periodErrors),
    nameError,
    cardCompanyError,
    CVCNumberError,
    passwordError,
  ];

  const inputs = [numbers, period, userName, cardCompany, CVCNumber, password];

  const isError = errors.some((error) => error === true);
  const isBlank = inputs.some((input) => input === '');
  
  const handleConfirmButtonClick = () => {
    navigate('/card-register-success', {
      state: { cardNumber: numbers[0], cardCompany },
    });
  };

  return (
    <div className="inner">
      {showCardBack ? (
        <CardBack CVCNumber={CVCNumber} />
      ) : (
        <CardFront
          cardNumbers={numbers}
          period={period}
          userName={userName}
          cardCompany={cardCompany}
        />
      )}
      <form className="form-container">
        <fieldset>
          {isCVCNumberFilled && (
            <PasswordInput
              password={password}
              passwordError={passwordError}
              onPasswordChange={handlePasswordChange}
            />
          )}
          {isUserNameFilled && (
            <CVCInput
              CVCNumber={CVCNumber}
              CVCNumberError={CVCNumberError}
              onCVCNumberChange={handleCVCNumberChange}
              onFocus={handleShowCardBack}
              onBlur={handleShowCardBack}
            />
          )}
          {isPeriodAllFilled && (
            <UserNameInput
              userName={userName}
              nameError={nameError}
              onNameChange={handleNameChange}
              onNameInputEnter={handleNameInputEnter}
            />
          )}
          {cardCompany && (
            <CardExpirationPeriodInput
              period={period}
              periodErrors={periodErrors}
              onPeriodChange={handlePeriodChange}
            />
          )}
          {isCardNumbersAllFilled && (
            <CardCompanyInput
              cardCompanyError={cardCompanyError}
              onCardCompanyChange={handleCardCompanyChange}
              onBlurCardCompanySelect={handleBlurCardCompanySelect}
            />
          )}
          <CardNumbersInput
            numbers={numbers}
            numberErrors={numberErrors}
            onNumberChange={handleNumberChange}
          />
        </fieldset>
        {!isError && !isBlank && (
          <div className={styles.confirmButton}>
            <Button onClick={handleConfirmButtonClick}>확인</Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CardRegisterForm;