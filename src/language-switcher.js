import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  function changeLanguage(e) {
    i18n.changeLanguage(e.target.value);
  }

  return(
    <div  >
       <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto bg-dark-text-secondary">
              <span className="me-3 py-2 text-dark bg-dark-text-secondary" >
                <select className="form-select form-select-sm language-switcher bg-dark-text-secondary" onClick={changeLanguage}>
                    <option  value="en">{t('en')}</option>
                    <option  value="lt">{t('lt')}</option>
                </select>
              </span>
            </nav>
    </div>
  )
}

export default LanguageSwitcher;