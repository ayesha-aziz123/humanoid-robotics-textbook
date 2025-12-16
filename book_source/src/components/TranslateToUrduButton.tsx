import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

type TranslateToUrduButtonProps = {
  className?: string;
};

const TranslateToUrduButton: React.FC<TranslateToUrduButtonProps> = ({ className }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to convert English path to Urdu path
  const getUrduPath = (): string => {
    // If we're already on a UR path, return the English version
    if (currentPath.startsWith('/ur/')) {
      return currentPath.replace(/^\/ur\//, '/');
    }
    // Otherwise, return the UR version
    return `/ur${currentPath}`;
  };

  // Check if we're currently on the Urdu version
  const isUrduVersion = currentPath.startsWith('/ur/');

  // Get the appropriate path and label
  const targetPath = getUrduPath();
  const buttonLabel = isUrduVersion
    ? <Translate id="theme.TranslateToEnglishButton.label" description="The label for the translate to English button">انگریزی میں تبدیل کریں</Translate>
    : <Translate id="theme.TranslateToUrduButton.label" description="The label for the translate to Urdu button">اردو میں تبدیل کریں</Translate>;

  return (
    <div className={`translate-button-container ${className || ''}`}>
      <Link
        to={targetPath}
        className={`button button--secondary button--lg ${isUrduVersion ? 'button--primary' : ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '1rem 0'
        }}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default TranslateToUrduButton;