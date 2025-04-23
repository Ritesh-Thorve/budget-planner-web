import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { fetchLanguage, i18LangSelector } from "../slices/i18nReducer";
import _ from "lodash";
import { languages } from "../config";

const LangSelector = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector(i18LangSelector);
  const [selectedLang, setSelectedLang] = useState('en');

  // Change language in i18n when Redux language changes
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  // Update language via Redux and persist to localStorage
  const changeLanguage = (event) => {
    const selected = event.target.value;
    dispatch(fetchLanguage(selected));
    setSelectedLang(selected);
  };

  return (
    <FormControl variant="standard" sx={{ m: 2, minWidth: 100, margin: "0px 16px 0px 0px" }}>
      <Select
        value={!_.isNull(language) ? language : selectedLang}
        onChange={changeLanguage}
      >
        {languages.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LangSelector;
