// Libraries
import React from 'react';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const HomePage: React.FC<Props> = (props) => {
  return (
    <div>
      Home Page
      <div className={'home-container'}>
        Container
      </div>
      <div className={'home-creators'}>
        Creator
      </div>
    </div>
  );
};

export default HomePage;